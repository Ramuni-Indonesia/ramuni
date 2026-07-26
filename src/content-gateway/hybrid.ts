import type { GatewayBuildContext, MarketingContentGateway, PublishedPage, PublishedRedirect, PublishedRoute } from './types';
import { normalizeCanonicalPath } from './normalization';

export class HybridContentGateway implements MarketingContentGateway {
  constructor(private readonly local: MarketingContentGateway, private readonly cms: MarketingContentGateway, private readonly locale = 'id-ID') {}

  async listRoutes(input = {}): Promise<PublishedRoute[]> {
    const merged = new Map((await this.local.listRoutes(input)).map((route) => [normalizeCanonicalPath(route.path), route]));
    for (const route of await this.cms.listRoutes(input)) merged.set(normalizeCanonicalPath(route.path), route);
    return [...merged.values()];
  }

  async getPage<TPayload = Record<string, unknown>>(path: string, input = {}): Promise<PublishedPage<TPayload> | null> {
    return (await this.cms.getPage<TPayload>(path, input)) ?? this.local.getPage<TPayload>(path, input);
  }

  async listCollection<TPayload = Record<string, unknown>>(type: string, input = {}): Promise<Array<PublishedPage<TPayload>>> {
    const merged = new Map((await this.local.listCollection<TPayload>(type, input)).map((page) => [page.canonicalPath, page]));
    for (const page of await this.cms.listCollection<TPayload>(type, input)) merged.set(page.canonicalPath, page);
    return [...merged.values()];
  }

  async getRedirects(input = {}): Promise<PublishedRedirect[]> {
    const merged = new Map((await this.local.getRedirects(input)).map((redirect) => [redirect.sourcePath, redirect]));
    for (const redirect of await this.cms.getRedirects(input)) merged.set(redirect.sourcePath, redirect);
    return [...merged.values()];
  }

  getBuildContext(): GatewayBuildContext { return { source: 'cms-active', locale: this.locale, migrationFallback: 'local' }; }
}
