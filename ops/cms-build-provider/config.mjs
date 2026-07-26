import { readFileSync, statSync } from 'node:fs';
import { isIP } from 'node:net';
import { resolve } from 'node:path';
const required = (env, name) => { const value = env[name]?.trim(); if (!value) throw new Error(`${name} is required`); return value; };
const absolute = (env, name, fallback) => { const value = required({ [name]: env[name]?.trim() || fallback }, name); if (resolve(value) !== value) throw new Error(`${name} must be absolute`); return value; };
const secretFile = (env, name) => { const path = absolute(env, name); const info = statSync(path); if (!info.isFile() || (info.mode & 0o077) !== 0) throw new Error(`${name} must be a protected file`); const value = readFileSync(path, 'utf8').trim(); if (value.length < 32) throw new Error(`${name} is invalid`); return { path, value }; };
const integer = (env, name, fallback, min, max) => { const value = Number(env[name]?.trim() || fallback); if (!Number.isInteger(value) || value < min || value > max) throw new Error(`${name} is invalid`); return value; };
export function loadConfig(env = process.env) {
  if (Number(process.versions.node.split('.')[0]) < 22) throw new Error('Node 22 or newer is required');
  const bindHost = env.RAMUNI_PROVIDER_BIND_HOST?.trim() || '127.0.0.1';
  if (!['127.0.0.1', '::1'].includes(bindHost) || !isIP(bindHost)) throw new Error('Provider must bind to loopback');
  const marketingSha = required(env, 'RAMUNI_PROVIDER_MARKETING_SHA').toLowerCase();
  if (!/^[a-f0-9]{40}$/.test(marketingSha)) throw new Error('RAMUNI_PROVIDER_MARKETING_SHA must be a full SHA');
  const cmsBaseUrl = new URL(required(env, 'RAMUNI_PROVIDER_CMS_BASE_URL'));
  if (cmsBaseUrl.protocol !== 'https:' && !(env.NODE_ENV === 'test' && cmsBaseUrl.hostname === '127.0.0.1')) throw new Error('CMS base URL must use HTTPS');
  const publicBaseUrl = new URL(env.RAMUNI_PROVIDER_PUBLIC_BASE_URL?.trim() || 'https://staging.ramuni.id');
  if (publicBaseUrl.protocol !== 'https:') throw new Error('Provider public base URL must use HTTPS');
  const deliveryToken = secretFile(env, 'RAMUNI_PROVIDER_CMS_DELIVERY_TOKEN_FILE');
  const sharedSecret = secretFile(env, 'RAMUNI_PROVIDER_SHARED_HMAC_SECRET_FILE');
  return {
    bindHost, port: integer(env, 'RAMUNI_PROVIDER_PORT', 4330, 1, 65535), marketingSha,
    databasePath: absolute(env, 'RAMUNI_PROVIDER_DATABASE_PATH', '/var/lib/ramuni-cms-build-provider/inbox.sqlite'),
    stateRoot: absolute(env, 'RAMUNI_PROVIDER_STATE_ROOT', '/var/lib/ramuni-cms-build-provider'),
    repository: absolute(env, 'RAMUNI_PROVIDER_MARKETING_REPOSITORY', '/home/meetsin/internal/ramuni-source'),
    releaseRoot: absolute(env, 'RAMUNI_PROVIDER_RELEASE_ROOT', '/var/www/ramuni-staging'),
    cmsBaseUrl: cmsBaseUrl.toString(), publicBaseUrl: publicBaseUrl.toString(), deliveryToken: deliveryToken.value,
    deliveryTokenPath: deliveryToken.path, sharedSecret: sharedSecret.value,
    replayWindowSeconds: integer(env, 'RAMUNI_PROVIDER_REPLAY_WINDOW_SECONDS', 300, 30, 3600),
    maxBodyBytes: integer(env, 'RAMUNI_PROVIDER_MAX_BODY_BYTES', 65536, 1024, 1048576),
    pollIntervalMs: integer(env, 'RAMUNI_PROVIDER_POLL_INTERVAL_MS', 1000, 100, 60000),
    fetchTimeoutMs: integer(env, 'RAMUNI_PROVIDER_FETCH_TIMEOUT_MS', 15000, 1000, 60000),
    commandTimeoutMs: integer(env, 'RAMUNI_PROVIDER_COMMAND_TIMEOUT_MS', 1200000, 60000, 7200000),
    releaseRetention: integer(env, 'RAMUNI_PROVIDER_RELEASE_RETENTION', 8, 2, 100),
    callbackMaxAttempts: integer(env, 'RAMUNI_PROVIDER_CALLBACK_MAX_ATTEMPTS', 0, 0, 1000),
    publicBuildEnv: Object.fromEntries(Object.entries(env).filter(([key, value]) => key.startsWith('PUBLIC_') && typeof value === 'string')),
  };
}
