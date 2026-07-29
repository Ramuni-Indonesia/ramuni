import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { chmod, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import http from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';

const workspace = await mkdtemp(path.join(tmpdir(), 'ramuni-article-candidate-render-'));
const candidatePath = path.join(workspace, 'candidate.json');
const tokenPath = path.join(workspace, 'delivery-token');
const slug = 'cms-adapter-acceptance';
const payload = {
  slug,
  title: 'Artikel dari kandidat CMS',
  description: 'Acceptance render artikel RAMUNI melalui CMS adapter.',
  dek: 'Artikel ini membuktikan kandidat CMS dirender melalui adapter yang sama dengan arsip dan halaman detail blog.',
  cover: 'https://assets-staging.ramuni.id/og-default.png',
  coverAlt: 'Visual acceptance test artikel kandidat CMS RAMUNI',
  publishedAt: '2026-07-29T00:00:00.000Z',
  category: 'Operasional Bisnis',
  categorySlug: 'operasional-bisnis',
  tags: ['CMS', 'RAMUNI'],
  authorName: 'Tim Editorial RAMUNI',
  authorSlug: 'tim-editorial-ramuni',
  reviewStatus: 'needs-review',
  editorialStatus: 'Acceptance test kandidat CMS',
  readingTime: '2 menit',
  takeaways: ['Artikel berasal dari kandidat CMS.', 'Body dirender sebagai blok bertipe.', 'Snapshot exact terlihat pada route artikel.'],
  sources: [],
  updateSummary: 'Acceptance test awal.',
  related: [],
  ctaType: 'product',
  featured: false,
  draft: false,
  noindex: true,
  bodyBlocks: [
    { type: 'heading', depth: 2, text: 'Bukti adapter CMS', slug: 'bukti-adapter-cms' },
    { type: 'paragraph', text: 'Konten ini dirender dari payload kandidat CMS tanpa menyisipkan HTML arbitrer.' },
    { type: 'list', ordered: false, items: ['Gateway membaca kandidat.', 'Parser memvalidasi payload.', 'Route membawa snapshot exact.'] },
  ],
};
const payloadHash = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
const candidate = {
  id: 'article-42',
  snapshot_id: 'event-article-render-0001',
  content_type: 'articles',
  schema_version: '1',
  locale: 'id-ID',
  canonical_path: `/blog/${slug}/`,
  routes: [`/blog/${slug}/`],
  published_revision_id: 'revision-article-render-1',
  content_version: '1',
  payload_hash: payloadHash,
  payload,
  event_id: 'event-article-render-0001',
  operation: 'publish',
  activation_state: 'candidate',
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
        RAMUNI_CONTENT_SOURCE: 'cms-candidate',
        RAMUNI_CMS_MIGRATION_FALLBACK: 'local',
        RAMUNI_CMS_BASE_URL: `http://127.0.0.1:${port}`,
        RAMUNI_CMS_DELIVERY_TOKEN_FILE: tokenPath,
        RAMUNI_CMS_CANDIDATE_FILE: candidatePath,
        RAMUNI_CMS_EVENT_ID: candidate.event_id,
        RAMUNI_CMS_SNAPSHOT_ID: candidate.id,
        RAMUNI_CMS_REVISION_HASH: candidate.payload_hash,
      },
    });
    child.once('error', reject);
    child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`article candidate build exited ${code}`)));
  });

  const rendered = await readFile(`dist/blog/${slug}/index.html`, 'utf8');
  assert.match(rendered, /data-cms-snapshot="article-42"/);
  assert.match(rendered, /Artikel dari kandidat CMS/);
  assert.match(rendered, /Bukti adapter CMS/);
  assert.match(rendered, /Konten ini dirender dari payload kandidat CMS/);
  await readFile('dist/blog/index.html');
  await readFile('dist/blog/kategori/operasional-bisnis/index.html');
  console.log(JSON.stringify({
    ok: true,
    exactSnapshot: candidate.id,
    candidateRoute: `/blog/${slug}/`,
    relatedBlogSurfacesPreserved: 2,
  }));
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(workspace, { recursive: true, force: true });
}
