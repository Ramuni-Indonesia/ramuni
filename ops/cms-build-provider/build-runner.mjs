import { spawn } from 'node:child_process';
import { cp, lstat, mkdir, readFile, readdir, readlink, rename, rm, symlink, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

function run(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { ...options, stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    let timedOut = false;
    const timeoutMs = Number(options?.timeoutMs || 0);
    const timer = timeoutMs > 0 ? setTimeout(() => {
      timedOut = true;
      child.kill('SIGTERM');
      setTimeout(() => child.kill('SIGKILL'), 5000).unref();
    }, timeoutMs) : null;
    timer?.unref();
    child.stderr.on('data', (chunk) => { stderr = (stderr + chunk).slice(-8000); });
    child.stdout.resume();
    child.once('error', (error) => { if (timer) clearTimeout(timer); reject(error); });
    child.once('exit', (code) => {
      if (timer) clearTimeout(timer);
      if (timedOut) reject(new Error(`${command}_timeout`));
      else if (code === 0) resolve();
      else reject(new Error(`${command}_exit_${code}:${stderr.replace(/[\r\n]+/g, ' ').slice(-1000)}`));
    });
  });
}

async function artifactDigest(root) {
  const files = [];
  async function walk(dir) { for (const entry of await readdir(dir, { withFileTypes: true })) { const path = join(dir, entry.name); if (entry.isDirectory()) await walk(path); else files.push(path); } }
  await walk(root); files.sort(); const digest = createHash('sha256');
  for (const file of files) digest.update(file.slice(root.length)).update(await readFile(file));
  return digest.digest('hex');
}

function outputPath(dist, route) { return route === '/' ? join(dist, 'index.html') : join(dist, route.replace(/^\//, ''), 'index.html'); }
async function pruneReleases(releaseRoot, keep) {
  const releasesRoot = join(releaseRoot, 'releases');
  let entries;
  try { entries = await readdir(releasesRoot, { withFileTypes: true }); } catch (error) { if (error?.code === 'ENOENT') return; throw error; }
  const releases = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort().reverse();
  await Promise.all(releases.slice(keep).map((name) => rm(join(releasesRoot, name), { recursive: true, force: true })));
}

export async function runCandidateBuild(config, event, candidate) {
  const safeId = createHash('sha256').update(event.eventId).digest('hex').slice(0, 20);
  const workRoot = join(config.stateRoot, 'work', safeId);
  const checkout = join(workRoot, 'checkout');
  const candidateFile = join(workRoot, 'candidate.json');
  const tokenFile = join(workRoot, 'delivery-token');
  const buildHome = join(workRoot, 'home');
  const buildId = `${new Date().toISOString().replace(/[-:.]/g, '').replace('Z', 'Z')}-${config.marketingSha.slice(0, 12)}-${safeId}`;
  const releaseDir = join(config.releaseRoot, 'releases', buildId);
  await mkdir(buildHome, { recursive: true, mode: 0o750 });
  await writeFile(candidateFile, JSON.stringify(candidate), { mode: 0o600 });
  await writeFile(tokenFile, config.deliveryToken, { mode: 0o600 });
  try {
    await run('git', ['-C', config.repository, 'worktree', 'add', '--detach', checkout, config.marketingSha], { env: process.env, timeoutMs: config.commandTimeoutMs });
    const buildEnv = {
      PATH: process.env.PATH, HOME: buildHome, NPM_CONFIG_CACHE: join(buildHome, '.npm'), ...config.publicBuildEnv,
      PUBLIC_DEPLOY_ENV: config.publicBuildEnv.PUBLIC_DEPLOY_ENV || 'staging',
      PUBLIC_INDEXING_ENABLED: 'false',
      RAMUNI_CONTENT_SOURCE: 'cms-candidate', RAMUNI_CMS_MIGRATION_FALLBACK: 'local',
      RAMUNI_CMS_BASE_URL: config.cmsBaseUrl, RAMUNI_CMS_DELIVERY_TOKEN_FILE: tokenFile,
      RAMUNI_CMS_CANDIDATE_FILE: candidateFile, RAMUNI_CMS_EVENT_ID: event.eventId,
      RAMUNI_CMS_SNAPSHOT_ID: event.snapshotId, RAMUNI_CMS_REVISION_HASH: event.revisionHash,
    };
    await run('npm', ['ci', '--force'], { cwd: checkout, env: buildEnv, timeoutMs: config.commandTimeoutMs });
    await run('npm', ['run', 'test:content-gateway'], { cwd: checkout, env: buildEnv, timeoutMs: config.commandTimeoutMs });
    await run('npm', ['run', 'build'], { cwd: checkout, env: buildEnv, timeoutMs: config.commandTimeoutMs });
    await run('npm', ['run', 'audit'], { cwd: checkout, env: buildEnv, timeoutMs: config.commandTimeoutMs });
    await run('npm', ['audit', '--audit-level=high'], { cwd: checkout, env: buildEnv, timeoutMs: config.commandTimeoutMs });
    const dist = join(checkout, 'dist');
    for (const route of event.routes) {
      const path = outputPath(dist, route);
      if (event.operation === 'publish') {
        const html = await readFile(path, 'utf8');
        if (!html.includes(`data-cms-snapshot=\"${event.snapshotId}\"`) && !html.includes(`data-cms-snapshot='${event.snapshotId}'`)) throw new Error('candidate_route_did_not_render_exact_snapshot');
      } else {
        try { await lstat(path); throw new Error('unpublished_route_still_rendered'); } catch (error) { if (error?.code !== 'ENOENT') throw error; }
      }
    }
    const digest = await artifactDigest(dist);
    await mkdir(join(config.releaseRoot, 'releases'), { recursive: true, mode: 0o755 });
    await cp(dist, releaseDir, { recursive: true, errorOnExist: true });
    await writeFile(join(releaseDir, 'RELEASE'), `release=${buildId}\nsha=${config.marketingSha}\nartifact_sha256=${digest}\ncms_event=${event.eventId}\ncms_snapshot=${event.snapshotId}\n`, { mode: 0o644 });
    const current = join(config.releaseRoot, 'current');
    let previousTarget = null;
    try { previousTarget = await readlink(current); } catch (error) { if (error?.code !== 'ENOENT') throw error; }
    const next = join(config.releaseRoot, 'current.provider-next');
    await rm(next, { force: true }); await symlink(releaseDir, next); await rename(next, current);
    try {
      for (const route of event.routes) {
        const url = new URL(route, config.publicBaseUrl);
        url.searchParams.set('cms_provider_event', event.eventId);
        const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000), headers: { 'cache-control': 'no-cache' } });
        if (event.operation === 'publish') {
          if (response.status !== 200 || !(await response.text()).includes(`data-cms-snapshot=\"${event.snapshotId}\"`)) throw new Error('public_candidate_route_verification_failed');
        } else if (response.status !== 404) throw new Error('public_unpublish_route_verification_failed');
      }
    } catch (error) {
      if (previousTarget) {
        const rollback = join(config.releaseRoot, 'current.provider-rollback');
        await rm(rollback, { force: true }); await symlink(previousTarget, rollback); await rename(rollback, current);
      }
      throw error;
    }
    await pruneReleases(config.releaseRoot, config.releaseRetention || 8);
    return { providerBuildId: buildId, artifactDigest: digest, artifactUrl: `https://staging.ramuni.id/?release=${encodeURIComponent(buildId)}` };
  } finally {
    await run('git', ['-C', config.repository, 'worktree', 'remove', '--force', checkout], { env: process.env }).catch(() => undefined);
    await rm(workRoot, { recursive: true, force: true });
  }
}
