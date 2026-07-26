import http from 'node:http';
import { fetchCandidate } from './candidate-client.mjs';
import { runCandidateBuild } from './build-runner.mjs';
import { parseProviderEvent, ProviderRequestError, sha256, signBody, verifySignedBody } from './security.mjs';

async function body(request, limit) {
  const chunks = []; let size = 0;
  for await (const chunk of request) { size += chunk.length; if (size > limit) throw new ProviderRequestError('Body too large', 'body_too_large', 413); chunks.push(chunk); }
  return Buffer.concat(chunks).toString('utf8');
}
function json(response, status, value) { response.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' }); response.end(JSON.stringify(value)); }
function safeErrorCode(error) {
  if (!(error instanceof Error)) return 'build_failed';
  const message = error.message;
  const exact = new Set([
    'candidate_too_large', 'candidate_binding_mismatch', 'candidate_operation_mismatch', 'candidate_routes_mismatch',
    'candidate_payload_hash_mismatch', 'candidate_route_did_not_render_exact_snapshot', 'unpublished_route_still_rendered',
    'public_candidate_route_verification_failed', 'public_unpublish_route_verification_failed',
  ]);
  if (exact.has(message)) return message;
  const classified = /^(candidate_http_\d{3}|(?:git_worktree_(?:add|remove)|npm_ci|content_gateway_test|astro_build|site_audit|dependency_audit)_(?:timeout|exit_\d+))(?::|$)/.exec(message)?.[1];
  return classified || 'build_failed';
}

export function createProviderService({ config, store, fetchImpl = fetch, buildRunner = runCandidateBuild }) {
  let stopped = false; let running = false;
  const server = http.createServer(async (request, response) => {
    try {
      if (request.method === 'GET' && request.url === '/healthz') return json(response, 200, { ok: true, queue: store.counts() });
      if (request.method === 'OPTIONS' && request.url === '/api/cms/revalidate') {
        response.writeHead(204, { allow: 'POST, OPTIONS', 'cache-control': 'no-store' });
        return response.end();
      }
      if (request.method !== 'POST' || request.url !== '/api/cms/revalidate') return json(response, 404, { error: 'not_found' });
      const raw = await body(request, config.maxBodyBytes);
      verifySignedBody({ secret: config.sharedSecret, timestamp: request.headers['x-ramuni-timestamp'] || '', signature: request.headers['x-ramuni-signature'] || '', body: raw, toleranceSeconds: config.replayWindowSeconds });
      const event = parseProviderEvent(raw, request.headers['idempotency-key'] || '', config.cmsBaseUrl);
      const accepted = store.accept(event, sha256(raw), Date.now());
      if (accepted.conflict) return json(response, 409, { error: 'event_conflict' });
      json(response, accepted.duplicate ? 200 : 202, { accepted: true, duplicate: accepted.duplicate, eventId: event.eventId });
    } catch (error) {
      const status = error instanceof ProviderRequestError ? error.statusCode : 500;
      json(response, status, { error: error instanceof ProviderRequestError ? error.code : 'internal_error' });
    }
  });

  async function tick() {
    if (stopped || running) return;
    running = true;
    try {
      const event = store.claim();
      if (event) {
        let callback;
        try {
          const candidate = await fetchCandidate(config, event, fetchImpl);
          const result = await buildRunner(config, event, candidate);
          callback = { eventId: event.eventId, status: 'success', providerBuildId: result.providerBuildId, artifactUrl: result.artifactUrl };
        } catch (error) {
          const errorCode = safeErrorCode(error);
          callback = { eventId: event.eventId, status: 'failed', providerBuildId: `failed-${Date.now()}`, errorCode };
        }
        store.finishBuild(event.eventId, JSON.stringify(callback), callback.errorCode || null);
      }
      const pending = store.nextCallback();
      if (pending?.callbackBody) {
        const timestamp = String(Math.floor(Date.now() / 1000));
        try {
          const response = await fetchImpl(pending.callbackUrl, { method: 'POST', headers: { 'content-type': 'application/json', 'x-ramuni-timestamp': timestamp, 'x-ramuni-signature': signBody(config.sharedSecret, timestamp, pending.callbackBody) }, body: pending.callbackBody, redirect: 'error', signal: AbortSignal.timeout(config.fetchTimeoutMs) });
          if (!response.ok) throw new Error(`callback_http_${response.status}`);
          store.callbackDelivered(pending.eventId, JSON.parse(pending.callbackBody).status === 'success');
        } catch (error) {
          const attempts = pending.callbackAttempts + 1;
          const dead = config.callbackMaxAttempts > 0 && attempts >= config.callbackMaxAttempts;
          store.callbackRetry(pending.eventId, error instanceof Error ? error.message.slice(0, 120) : 'callback_failed', Math.min(300000, 1000 * 2 ** Math.min(attempts, 8)), dead);
        }
      }
    } finally { running = false; }
  }
  const timer = setInterval(tick, config.pollIntervalMs); timer.unref();
  return { server, tick, async stop() { stopped = true; clearInterval(timer); await new Promise((resolve) => server.close(resolve)); } };
}
