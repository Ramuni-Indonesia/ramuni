export const PUBLIC_ENVIRONMENTS = Object.freeze(['local', 'preview', 'staging', 'production']);

/**
 * Resolve the public deployment policy from an env-like object.
 * Indexing is intentionally fail-closed: only an explicitly enabled production
 * build may emit indexable pages or sitemap entries.
 *
 * @param {Record<string, string | boolean | undefined>} env
 */
export function resolvePublicEnvironment(env = {}) {
  const requestedEnvironment = String(env.PUBLIC_DEPLOY_ENV || '').trim().toLowerCase();
  const name = PUBLIC_ENVIRONMENTS.includes(requestedEnvironment)
    ? requestedEnvironment
    : 'local';
  const indexingRequested = String(env.PUBLIC_INDEXING_ENABLED || '').toLowerCase() === 'true';

  return Object.freeze({
    name,
    isProduction: name === 'production',
    indexingEnabled: name === 'production' && indexingRequested,
  });
}
