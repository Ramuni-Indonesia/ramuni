import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const workspace = await mkdtemp(path.join(tmpdir(), 'ramuni-content-gateway-'));
const outfile = path.join(workspace, 'gateway.mjs');
const hash = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

try {
  await build({ entryPoints: ['src/content-gateway/index.ts'], outfile, bundle: true, platform: 'node', format: 'esm', target: 'node22' });
  const gateway = await import(pathToFileURL(outfile));
  const localPayload = { product: { slug: 'asisten-ai', title: 'Lokal', summary: 'Ringkasan lokal' }, detail: { heroLead: 'Lokal' } };
  const unrelatedPayload = { product: { slug: 'inventori', title: 'Inventori', summary: 'Tetap lokal' }, detail: { heroLead: 'Tetap lokal' } };
  const local = new gateway.LocalContentGateway([
    { id: 'local-1', snapshotId: 'local-1', contentType: 'product-pages', schemaVersion: '1', locale: 'id-ID', canonicalPath: '/produk/asisten-ai/', routes: ['/produk/asisten-ai/'], publishedRevisionId: 'local-r1', contentVersion: 'local', payloadHash: hash(localPayload), payload: localPayload },
    { id: 'local-2', snapshotId: 'local-2', contentType: 'product-pages', schemaVersion: '1', locale: 'id-ID', canonicalPath: '/produk/inventori/', routes: ['/produk/inventori/'], publishedRevisionId: 'local-r2', contentVersion: 'local', payloadHash: hash(unrelatedPayload), payload: unrelatedPayload },
  ], [{ sourcePath: '/produk/lama/', destinationPath: '/produk/asisten-ai/', statusCode: 301, locale: 'id-ID' }]);

  const activePayload = { slug: 'asisten-ai', title: 'CMS aktif', canonicalPath: '/produk/asisten-ai/', hero: { title: 'CMS aktif', description: 'Aktif' } };
  const active = new gateway.LocalContentGateway([
    { id: 'cms-1', snapshotId: 'cms-1', contentType: 'product-pages', schemaVersion: '1', locale: 'id-ID', canonicalPath: '/produk/asisten-ai/', routes: ['/produk/asisten-ai/'], publishedRevisionId: 'cms-r1', contentVersion: '1', payloadHash: hash(activePayload), payload: activePayload },
  ]);
  const hybrid = new gateway.HybridContentGateway(local, active);
  assert.equal((await hybrid.listCollection('product-pages')).length, 2);
  assert.equal((await hybrid.getPage('/produk/asisten-ai/')).payload.title, 'CMS aktif');
  assert.equal((await hybrid.getPage('/produk/inventori/')).payload.product.title, 'Inventori');

  const candidatePayload = { slug: 'asisten-ai', title: 'CMS kandidat', canonicalPath: '/produk/asisten-ai/', hero: { title: 'Kandidat', description: 'Deskripsi kandidat' } };
  const candidateHash = hash(candidatePayload);
  const candidateRecord = { id: '42', snapshot_id: 'event-1', content_type: 'product-pages', schema_version: '1', locale: 'id-ID', canonical_path: '/produk/asisten-ai/', routes: ['/produk/asisten-ai/'], published_revision_id: 'r2', content_version: '2', payload_hash: candidateHash, payload: candidatePayload, event_id: 'event-1', operation: 'publish', activation_state: 'candidate' };
  const candidate = gateway.parseProviderCandidate(candidateRecord);
  const overlay = new gateway.CandidateOverlayGateway(hybrid, candidate, { eventId: 'event-1', snapshotId: '42', revisionHash: candidateHash });
  const collection = await overlay.listCollection('product-pages');
  assert.equal(collection.length, 2, 'candidate must not remove unrelated local migration routes');
  assert.equal((await overlay.getPage('/produk/asisten-ai/')).payload.title, 'CMS kandidat');
  assert.equal((await overlay.getPage('/produk/inventori/')).payload.product.title, 'Inventori');
  assert.equal(overlay.getBuildContext().migrationFallback, 'local');

  const unpublish = gateway.parseProviderCandidate({ ...candidateRecord, id: '43', event_id: 'event-2', operation: 'unpublish' });
  const removal = new gateway.CandidateOverlayGateway(hybrid, unpublish, { eventId: 'event-2', snapshotId: '43', revisionHash: candidateHash });
  assert.equal((await removal.listCollection('product-pages')).length, 1);
  assert.equal(await removal.getPage('/produk/asisten-ai/'), null);
  assert.equal((await removal.getPage('/produk/inventori/')).payload.product.title, 'Inventori');
  assert.equal((await overlay.getRedirects()).length, 1);
  assert.throws(() => new gateway.CandidateOverlayGateway(hybrid, candidate, { eventId: 'bad', snapshotId: '42', revisionHash: candidateHash }), /event ID/);
  console.log(JSON.stringify({ ok: true, checks: 12, modes: ['local', 'hybrid', 'cms-candidate-publish', 'cms-candidate-unpublish'] }));
} finally {
  await rm(workspace, { recursive: true, force: true });
}
