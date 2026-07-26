import type { CollectionQuery, GatewayBuildContext, MarketingContentGateway, PublishedPage, PublishedRedirect, PublishedRoute, RouteQuery } from './types';
import { normalizeCanonicalPath } from './normalization';

export class LocalContentGateway implements MarketingContentGateway {
  constructor(private readonly pages: PublishedPage[], private readonly redirects: PublishedRedirect[] = [], private readonly locale = 'id-ID') {}

  async listRoutes(input: RouteQuery = {}): Promise<PublishedRoute[]> {
    const locale = input.locale ?? this.locale;
    return this.pages.filter((page) => page.locale === locale).flatMap((page) => page.routes.map((path) => ({
      path: normalizeCanonicalPath(path), canonicalPath: page.canonicalPath, contentType: page.contentType,
      locale: page.locale, publishedRevisionId: page.publishedRevisionId, payloadHash: page.payloadHash,
    })));
  }

  async getPage<TPayload = Record<string, unknown>>(path: string, input: RouteQuery = {}): Promise<PublishedPage<TPayload> | null> {
    const locale = input.locale ?? this.locale;
    const canonicalPath = normalizeCanonicalPath(path);
    return (this.pages.find((page) => page.locale === locale && page.routes.includes(canonicalPath)) as PublishedPage<TPayload> | undefined) ?? null;
  }

  async listCollection<TPayload = Record<string, unknown>>(type: string, input: CollectionQuery = {}): Promise<Array<PublishedPage<TPayload>>> {
    const locale = input.locale ?? this.locale;
    const limit = Math.min(Math.max(input.limit ?? 100, 1), 1000);
    return this.pages.filter((page) => page.locale === locale && page.contentType === type).slice(0, limit) as Array<PublishedPage<TPayload>>;
  }

  async getRedirects(input: RouteQuery = {}): Promise<PublishedRedirect[]> {
    const locale = input.locale ?? this.locale;
    return this.redirects.filter((redirect) => redirect.locale === locale);
  }

  getBuildContext(): GatewayBuildContext { return { source: 'local', locale: this.locale }; }
}
