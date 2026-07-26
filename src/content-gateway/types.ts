export type ContentSourceMode = 'local' | 'cms-active' | 'cms-candidate';

export type PublishedRoute = {
  path: string;
  canonicalPath: string;
  contentType: string;
  locale: string;
  publishedRevisionId: string;
  payloadHash: string;
};

export type PublishedPage<TPayload = Record<string, unknown>> = {
  id: string;
  snapshotId: string;
  contentType: string;
  schemaVersion: string;
  locale: string;
  canonicalPath: string;
  routes: string[];
  publishedRevisionId: string;
  contentVersion: string;
  publishedAt?: string;
  updatedAt?: string;
  payloadHash: string;
  payload: TPayload;
};

export type PublishedRedirect = {
  sourcePath: string;
  destinationPath: string;
  statusCode: number;
  locale: string;
};

export type RouteQuery = { locale?: string };
export type CollectionQuery = RouteQuery & { limit?: number };

export type GatewayBuildContext = {
  source: ContentSourceMode;
  locale: string;
  migrationFallback?: 'local';
  candidate?: {
    eventId: string;
    snapshotId: string;
    revisionHash: string;
    operation: 'publish' | 'unpublish';
    routes: string[];
  };
};

export interface MarketingContentGateway {
  listRoutes(input?: RouteQuery): Promise<PublishedRoute[]>;
  getPage<TPayload = Record<string, unknown>>(path: string, input?: RouteQuery): Promise<PublishedPage<TPayload> | null>;
  listCollection<TPayload = Record<string, unknown>>(type: string, input?: CollectionQuery): Promise<Array<PublishedPage<TPayload>>>;
  getRedirects(input?: RouteQuery): Promise<PublishedRedirect[]>;
  getBuildContext(): GatewayBuildContext;
}

export type ProviderCandidate<TPayload = Record<string, unknown>> = PublishedPage<TPayload> & {
  eventId: string;
  operation: 'publish' | 'unpublish';
  activationState: 'candidate';
};
