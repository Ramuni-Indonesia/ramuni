import type { CollectionQuery, GatewayBuildContext, MarketingContentGateway, PublishedPage, PublishedRedirect, PublishedRoute, RouteQuery } from './types';
import { normalizeCanonicalPath, parsePublishedPage, parsePublishedRedirect, parsePublishedRoute } from './normalization';

type Options = { baseUrl: string; token: string; locale?: string; timeoutMs?: number; fetchImpl?: typeof fetch };
type ListResponse = { items?: unknown[]; next_cursor?: unknown };

export class CmsDeliveryGateway implements MarketingContentGateway {
  private readonly baseUrl: URL;
  private readonly locale: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: Options) {
    if (!options.token.trim()) throw new Error('CMS delivery token is required');
    this.baseUrl = new URL(options.baseUrl);
    if (!['https:', 'http:'].includes(this.baseUrl.protocol)) throw new Error('CMS delivery base URL must use HTTP(S)');
    this.locale = options.locale ?? 'id-ID';
    this.timeoutMs = Math.min(Math.max(options.timeoutMs ?? 15_000, 1_000), 60_000);
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  private async request(pathname: string): Promise<unknown> {
    const response = await this.fetchImpl(new URL(pathname, this.baseUrl), {
      headers: { authorization: `Bearer ${this.options.token}`, accept: 'application/json' },
      redirect: 'error', signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`CMS delivery request failed with HTTP ${response.status}`);
    return response.json();
  }

  async listRoutes(input: RouteQuery = {}): Promise<PublishedRoute[]> {
    const locale = input.locale ?? this.locale;
    const result = await this.request(`/v1/cms/delivery/routes?locale=${encodeURIComponent(locale)}`) as ListResponse;
    if (!Array.isArray(result?.items)) throw new Error('CMS routes response is invalid');
    return result.items.map(parsePublishedRoute);
  }

  async getPage<TPayload = Record<string, unknown>>(path: string, input: RouteQuery = {}): Promise<PublishedPage<TPayload> | null> {
    const locale = input.locale ?? this.locale;
    const canonicalPath = normalizeCanonicalPath(path);
    const result = await this.request(`/v1/cms/delivery/content${canonicalPath}?locale=${encodeURIComponent(locale)}`);
    return result == null ? null : parsePublishedPage<TPayload>(result);
  }

  async listCollection<TPayload = Record<string, unknown>>(type: string, input: CollectionQuery = {}): Promise<Array<PublishedPage<TPayload>>> {
    if (!/^[a-z][a-z0-9-]{0,63}$/.test(type)) throw new Error('Invalid CMS collection type');
    const locale = input.locale ?? this.locale;
    const requestedLimit = Math.min(Math.max(input.limit ?? 1000, 1), 1000);
    const items: Array<PublishedPage<TPayload>> = [];
    let cursor: string | undefined;
    for (let page = 0; page < 20 && items.length < requestedLimit; page += 1) {
      const query = new URLSearchParams({ locale, limit: String(Math.min(100, requestedLimit - items.length)) });
      if (cursor) query.set('cursor', cursor);
      const result = await this.request(`/v1/cms/delivery/collection/${type}?${query}`) as ListResponse;
      if (!Array.isArray(result?.items)) throw new Error('CMS collection response is invalid');
      items.push(...result.items.map((entry) => parsePublishedPage<TPayload>(entry)));
      if (typeof result.next_cursor !== 'string' || !result.next_cursor) return items;
      if (result.next_cursor === cursor) throw new Error('CMS collection cursor did not advance');
      cursor = result.next_cursor;
    }
    if (items.length < requestedLimit && cursor) throw new Error('CMS collection pagination exceeded the safety limit');
    return items.slice(0, requestedLimit);
  }

  async getRedirects(input: RouteQuery = {}): Promise<PublishedRedirect[]> {
    const locale = input.locale ?? this.locale;
    const result = await this.request(`/v1/cms/delivery/redirects?locale=${encodeURIComponent(locale)}`) as ListResponse;
    if (!Array.isArray(result?.items)) throw new Error('CMS redirects response is invalid');
    return result.items.map(parsePublishedRedirect);
  }

  getBuildContext(): GatewayBuildContext { return { source: 'cms-active', locale: this.locale }; }
}
