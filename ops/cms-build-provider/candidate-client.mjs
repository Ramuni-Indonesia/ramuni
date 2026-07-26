import { sha256 } from './security.mjs';
function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).filter(([, child]) => child !== undefined).sort(([left], [right]) => left.localeCompare(right)).map(([name, child]) => [name, canonicalize(child)]));
}
export function contentApprovalHash(document) {
  const material = { ...document };
  for (const field of ['id', 'approvedVersionHash', 'approvedBy', 'approvedAt', 'updatedBy', 'workflowState', 'publishAt', 'unpublishAt', 'createdAt', 'updatedAt', '_status']) delete material[field];
  return sha256(JSON.stringify(canonicalize(material)));
}
export async function fetchCandidate(config, event, fetchImpl = fetch) {
  const url = new URL(`/v1/cms/delivery/candidates/${encodeURIComponent(event.snapshotId)}`, config.cmsBaseUrl);
  url.searchParams.set('event_id', event.eventId); url.searchParams.set('revision_hash', event.revisionHash);
  const response = await fetchImpl(url, { headers: { authorization: `Bearer ${config.deliveryToken}`, accept: 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(config.fetchTimeoutMs) });
  if (!response.ok) throw new Error(`candidate_http_${response.status}`);
  const text = await response.text(); if (Buffer.byteLength(text) > 6 * 1024 * 1024) throw new Error('candidate_too_large');
  const candidate = JSON.parse(text);
  if (String(candidate.id) !== event.snapshotId || candidate.event_id !== event.eventId || candidate.payload_hash !== event.revisionHash || candidate.activation_state !== 'candidate') throw new Error('candidate_binding_mismatch');
  if ((candidate.operation || 'publish') !== event.operation) throw new Error('candidate_operation_mismatch');
  const candidateRoutes = [...new Set((candidate.routes || []).map((route) => route === '/' ? '/' : `${String(route).replace(/\/+$/, '')}/`))].sort();
  if (JSON.stringify(candidateRoutes) !== JSON.stringify([...event.routes].sort())) throw new Error('candidate_routes_mismatch');
  if (sha256(JSON.stringify(candidate.payload)) !== candidate.payload_hash) {
    const approvedHash = candidate.payload?.approvedVersionHash;
    if (!/^[a-f0-9]{64}$/.test(String(approvedHash || '')) || contentApprovalHash(candidate.payload) !== approvedHash) throw new Error('candidate_payload_hash_mismatch');
  }
  return candidate;
}
