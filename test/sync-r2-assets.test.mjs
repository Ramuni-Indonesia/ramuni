import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import test from 'node:test';

const repositoryRoot = path.resolve(import.meta.dirname, '..');

test('uploads matching video objects again when their remote MIME type is wrong', async (context) => {
  const temporaryDirectory = await mkdtemp(path.join(tmpdir(), 'ramuni-r2-sync-'));
  context.after(() => rm(temporaryDirectory, { recursive: true, force: true }));

  const sourceDirectory = path.join(temporaryDirectory, 'public');
  await mkdir(sourceDirectory);
  const assets = new Map([
    ['/ramuni/mascot.webm', { body: Buffer.from('webm-video'), remoteType: 'application/octet-stream' }],
    ['/ramuni/dashboard.mp4', { body: Buffer.from('mp4-video'), remoteType: 'video/mp4' }],
  ]);
  await Promise.all([...assets.entries()].map(([key, asset]) =>
    writeFile(path.join(sourceDirectory, path.basename(key)), asset.body)));

  const requests = [];
  const server = createServer((request, response) => {
    const asset = assets.get(request.url);
    requests.push({ method: request.method, url: request.url, contentType: request.headers['content-type'] });
    if (!asset) {
      response.writeHead(404).end();
      return;
    }
    if (request.method === 'HEAD') {
      response.writeHead(200, {
        etag: `"${createHash('md5').update(asset.body).digest('hex')}"`,
        'x-amz-meta-sha256': createHash('sha256').update(asset.body).digest('hex'),
        'content-type': asset.remoteType,
      }).end();
      return;
    }
    response.writeHead(200).end();
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  context.after(() => new Promise((resolve) => server.close(resolve)));

  const { port } = server.address();
  const result = await runSync(sourceDirectory, `http://127.0.0.1:${port}`);

  assert.equal(result.code, 0, result.stderr);
  assert.match(result.stdout, /upload mascot\.webm/);
  assert.match(result.stdout, /skip dashboard\.mp4/);
  assert.match(result.stdout, /1 uploaded, 1 unchanged, 2 total/);
  assert.deepEqual(
    requests.filter((request) => request.method === 'PUT'),
    [{ method: 'PUT', url: '/ramuni/mascot.webm', contentType: 'video/webm' }],
  );
});

function runSync(sourceDirectory, endpoint) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/sync-r2-assets.mjs', '--source', sourceDirectory], {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        R2_ACCESS_KEY_ID: 'test-access-key',
        R2_SECRET_ACCESS_KEY: 'test-secret-key',
        R2_ENDPOINT_URL: endpoint,
        R2_BUCKET: 'ramuni',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.once('error', reject);
    child.once('close', (code) => resolve({ code, stdout, stderr }));
  });
}
