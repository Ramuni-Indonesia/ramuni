import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export class ProviderRequestError extends Error {
  constructor(message, code = 'invalid_request', statusCode = 400) { super(message); this.code = code; this.statusCode = statusCode; }
}
export const sha256 = (value) => createHash('sha256').update(value).digest('hex');
export const signBody = (secret, timestamp, body) => createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
export function verifySignedBody({ secret, timestamp, signature, body, nowMs = Date.now(), toleranceSeconds = 300 }) {
  if (!/^\d{10}$/.test(timestamp) || Math.abs(Math.floor(nowMs / 1000) - Number(timestamp)) > toleranceSeconds) throw new ProviderRequestError('Expired timestamp', 'expired_request', 401);
  if (!/^[a-f0-9]{64}$/i.test(signature)) throw new ProviderRequestError('Invalid signature', 'invalid_signature', 401);
  const expected = Buffer.from(signBody(secret, timestamp, body), 'hex');
  const actual = Buffer.from(signature, 'hex');
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new ProviderRequestError('Invalid signature', 'invalid_signature', 401);
}
const required = (value, name, max = 512) => {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw new ProviderRequestError(`${name} is invalid`);
  return value.trim();
};
const route = (value) => {
  const path = required(value, 'route', 2048);
  if (!path.startsWith('/') || path.includes('?') || path.includes('#') || path.includes('\\') || path.includes('//')) throw new ProviderRequestError('route is invalid');
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
};
export function parseProviderEvent(body, idempotencyKey, cmsBaseUrl) {
  let value;
  try { value = JSON.parse(body); } catch { throw new ProviderRequestError('Invalid JSON'); }
  const eventId = required(value?.eventId, 'eventId', 256);
  if (idempotencyKey !== eventId) throw new ProviderRequestError('Idempotency mismatch', 'idempotency_mismatch', 409);
  const snapshotId = required(value.snapshotId, 'snapshotId', 256);
  const revisionHash = required(value.revisionHash, 'revisionHash', 64).toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(revisionHash)) throw new ProviderRequestError('revisionHash is invalid');
  const operation = value.operation ?? 'publish';
  if (!['publish', 'unpublish'].includes(operation)) throw new ProviderRequestError('operation is invalid');
  if (!Array.isArray(value.routes) || value.routes.length < 1 || value.routes.length > 100) throw new ProviderRequestError('routes are invalid');
  const callback = new URL(required(value.callbackUrl, 'callbackUrl', 2048));
  const expected = new URL(cmsBaseUrl);
  if (callback.origin !== expected.origin || callback.pathname !== '/v1/cms/webhooks/website-build' || callback.search || callback.hash) throw new ProviderRequestError('callbackUrl is invalid');
  return { eventId, snapshotId, revisionHash, operation, routes: [...new Set(value.routes.map(route))], callbackUrl: callback.toString() };
}
