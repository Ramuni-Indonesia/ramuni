import type { PublishedPage, PublishedRedirect, PublishedRoute, ProviderCandidate } from './types';

type JsonRecord = Record<string, unknown>;

export function normalizeCanonicalPath(input: string): string {
  const value = input.trim();
  if (!value.startsWith('/') || value.includes('?') || value.includes('#') || value.includes('\\')) {
    throw new Error(`Invalid canonical path: ${input}`);
  }
  const collapsed = value.replace(/\/{2,}/g, '/');
  return collapsed === '/' ? '/' : collapsed.replace(/\/+$/, '') + '/';
}

function record(value: unknown, label: string): JsonRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value as JsonRecord;
}

function text(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a non-empty string`);
  return value;
}

function optionalText(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function routeArray(value: unknown, canonicalPath: string): string[] {
  const routes = Array.isArray(value) ? value.map((item) => normalizeCanonicalPath(text(item, 'route'))) : [];
  return routes.length ? [...new Set(routes)] : [canonicalPath];
}

export function parsePublishedRoute(value: unknown): PublishedRoute {
  const item = record(value, 'delivery route');
  return {
    path: normalizeCanonicalPath(text(item.path, 'delivery route path')),
    canonicalPath: normalizeCanonicalPath(text(item.canonical_path, 'delivery canonical path')),
    contentType: text(item.content_type, 'delivery content type'),
    locale: text(item.locale, 'delivery locale'),
    publishedRevisionId: text(item.published_revision_id, 'published revision id'),
    payloadHash: text(item.payload_hash, 'delivery payload hash'),
  };
}

export function parsePublishedPage<TPayload = Record<string, unknown>>(value: unknown): PublishedPage<TPayload> {
  const item = record(value, 'delivery record');
  const canonicalPath = normalizeCanonicalPath(text(item.canonical_path, 'delivery canonical path'));
  return {
    id: String(item.id ?? ''),
    snapshotId: text(item.snapshot_id, 'delivery snapshot id'),
    contentType: text(item.content_type, 'delivery content type'),
    schemaVersion: text(item.schema_version, 'delivery schema version'),
    locale: text(item.locale, 'delivery locale'),
    canonicalPath,
    routes: routeArray(item.routes, canonicalPath),
    publishedRevisionId: text(item.published_revision_id, 'published revision id'),
    contentVersion: text(item.content_version, 'content version'),
    publishedAt: optionalText(item.published_at),
    updatedAt: optionalText(item.updated_at),
    payloadHash: text(item.payload_hash, 'delivery payload hash'),
    payload: record(item.payload, 'delivery payload') as TPayload,
  };
}

export function parsePublishedRedirect(value: unknown): PublishedRedirect {
  const item = record(value, 'delivery redirect');
  const statusCode = Number(item.status_code);
  if (![301, 302, 307, 308].includes(statusCode)) throw new Error('Unsupported redirect status code');
  return {
    sourcePath: normalizeCanonicalPath(text(item.source_path, 'redirect source path')),
    destinationPath: normalizeCanonicalPath(text(item.destination_path, 'redirect destination path')),
    statusCode,
    locale: text(item.locale, 'redirect locale'),
  };
}

export function parseProviderCandidate<TPayload = Record<string, unknown>>(value: unknown): ProviderCandidate<TPayload> {
  const item = record(value, 'provider candidate');
  const page = parsePublishedPage<TPayload>(item);
  const operation = text(item.operation, 'candidate operation');
  if (operation !== 'publish' && operation !== 'unpublish') throw new Error('Unsupported candidate operation');
  if (item.activation_state !== 'candidate') throw new Error('Provider record is not an activatable candidate');
  return { ...page, eventId: text(item.event_id, 'candidate event id'), operation, activationState: 'candidate' };
}
