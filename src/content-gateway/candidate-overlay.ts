import { createHash } from 'node:crypto';
import type { GatewayBuildContext, MarketingContentGateway, PublishedPage, PublishedRedirect, PublishedRoute, ProviderCandidate } from './types';
import { normalizeCanonicalPath } from './normalization';

type Expectation = { eventId: string; snapshotId: string; revisionHash: string };

export function verifyProviderCandidate(candidate: ProviderCandidate, expected: Expectation): void {
  if (candidate.eventId !== expected.eventId) throw new Error('Candidate event ID does not match the provider event');
  if (candidate.id !== expected.snapshotId) throw new Error('Candidate snapshot ID does not match the provider event');
  if (candidate.payloadHash !== expected.revisionHash) throw new Error('Candidate revision hash does not match the provider event');
  if (createHash('sha256').update(JSON.stringify(candidate.payload)).digest('hex') !== candidate.payloadHash) {
    throw new Error('Candidate payload hash verification failed');
  }
}

export class CandidateOverlayGateway implements MarketingContentGateway {
  private readonly routes: Set<string>;
  constructor(private readonly active: MarketingContentGateway, private readonly candidate: ProviderCandidate, private readonly expected: Expectation) {
    verifyProviderCandidate(candidate, expected);
    this.routes = new Set(candidate.routes.map(normalizeCanonicalPath));
    if (!this.routes.size) throw new Error('Candidate has no affected routes');
  }

  async listRoutes(input = {}): Promise<PublishedRoute[]> {
    const retained = (await this.active.listRoutes(input)).filter((route) => !this.routes.has(normalizeCanonicalPath(route.path)));
    if (this.candidate.operation === 'unpublish') return retained;
    return [...retained, ...this.candidate.routes.map((path) => ({
      path: normalizeCanonicalPath(path), canonicalPath: this.candidate.canonicalPath,
      contentType: this.candidate.contentType, locale: this.candidate.locale,
      publishedRevisionId: this.candidate.publishedRevisionId, payloadHash: this.candidate.payloadHash,
    }))];
  }

  async getPage<TPayload = Record<string, unknown>>(path: string, input = {}): Promise<PublishedPage<TPayload> | null> {
    if (!this.routes.has(normalizeCanonicalPath(path))) return this.active.getPage<TPayload>(path, input);
    return this.candidate.operation === 'unpublish' ? null : this.candidate as PublishedPage<TPayload>;
  }

  async listCollection<TPayload = Record<string, unknown>>(type: string, input = {}): Promise<Array<PublishedPage<TPayload>>> {
    const active = await this.active.listCollection<TPayload>(type, input);
    if (type !== this.candidate.contentType) return active;
    const retained = active.filter((item) => item.id !== this.candidate.id && item.canonicalPath !== this.candidate.canonicalPath);
    return this.candidate.operation === 'unpublish' ? retained : [...retained, this.candidate as PublishedPage<TPayload>];
  }

  getRedirects(input = {}): Promise<PublishedRedirect[]> { return this.active.getRedirects(input); }
  getBuildContext(): GatewayBuildContext {
    const base = this.active.getBuildContext();
    return { source: 'cms-candidate', locale: this.candidate.locale, migrationFallback: base.migrationFallback, candidate: {
      eventId: this.candidate.eventId, snapshotId: this.expected.snapshotId, revisionHash: this.candidate.payloadHash,
      operation: this.candidate.operation, routes: [...this.routes],
    } };
  }
}
