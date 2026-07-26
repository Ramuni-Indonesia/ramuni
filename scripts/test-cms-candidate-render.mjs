import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { chmod, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import http from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';

const workspace = await mkdtemp(path.join(tmpdir(), 'ramuni-candidate-render-'));
const candidatePath = path.join(workspace, 'candidate.json');
const tokenPath = path.join(workspace, 'delivery-token');
const payload = {
  slug: 'asisten-ai', title: 'Asisten AI dari CMS', canonicalPath: '/produk/asisten-ai/',
  hero: { eyebrow: 'Snapshot CMS terverifikasi', title: 'Asisten AI dari snapshot CMS', description: 'Hero ini dirender dari kandidat CMS yang terikat pada revisi exact.' },
  seo: { title: 'Asisten AI Kandidat CMS | RAMUNI', description: 'Acceptance render kandidat CMS.', canonical: '/produk/asisten-ai/' },
};
const payloadHash = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
const candidate = {
  id: '42', snapshot_id: 'event-render-0001', content_type: 'product-pages', schema_version: '1', locale: 'id-ID',
  canonical_path: '/produk/asisten-ai/', routes: ['/produk/asisten-ai/'], published_revision_id: 'revision-render-1', content_version: '1',
  payload_hash: payloadHash, payload, event_id: 'event-render-0001', operation: 'publish', activation_state: 'candidate',
};

await writeFile(candidatePath, JSON.stringify(candidate), { mode: 0o600 });
await writeFile(tokenPath, 'test-delivery-token-not-a-production-secret', { mode: 0o600 });
await chmod(tokenPath, 0o600);

const server = http.createServer((request, response) => {
  assert.equal(request.headers.authorization, 'Bearer test-delivery-token-not-a-production-secret');
  response.writeHead(200, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ items: [], next_cursor: null }));
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

try {
  await new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        RAMUNI_CONTENT_SOURCE: 'cms-candidate', RAMUNI_CMS_MIGRATION_FALLBACK: 'local',
        RAMUNI_CMS_BASE_URL: `http://127.0.0.1:${port}`, RAMUNI_CMS_DELIVERY_TOKEN_FILE: tokenPath,
        RAMUNI_CMS_CANDIDATE_FILE: candidatePath, RAMUNI_CMS_EVENT_ID: candidate.event_id,
        RAMUNI_CMS_SNAPSHOT_ID: candidate.id, RAMUNI_CMS_REVISION_HASH: candidate.payload_hash,
      },
    });
    child.once('error', reject); child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`candidate build exited ${code}`)));
  });
  const rendered = await readFile('dist/produk/asisten-ai/index.html', 'utf8');
  assert.match(rendered, /data-cms-snapshot="42"/);
  assert.match(rendered, /Asisten AI dari CMS/);
  assert.match(rendered, /Snapshot CMS terverifikasi/);
  await readFile('dist/produk/inventori/index.html');
  await readFile('dist/solusi/kelola-stok/index.html');
  console.log(JSON.stringify({ ok: true, exactSnapshot: '42', candidateRoute: '/produk/asisten-ai/', unrelatedRoutesPreserved: 2 }));
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(workspace, { recursive: true, force: true });
}
