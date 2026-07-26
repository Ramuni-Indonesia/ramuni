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

export function createProviderService({ config, store, fetchImpl = fetch, buildRunner = runCandidateBuild }) {
  let stopped = false; let running = false;
  const server = http.createServer(async (request, response) => {
    try {
      if (request.method === 'GET' && request.url === '/healthz') return json(response, 200, { ok: true, queue: store.counts() });
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
          callback = { eventId: event.eventId, status: 'failed', providerBuildId: `failed-${Date.now()}` };
        }
        store.finishBuild(event.eventId, JSON.stringify(callback));
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
