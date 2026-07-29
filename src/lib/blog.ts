import { getCollection, type CollectionEntry } from 'astro:content';
import { createConfiguredContentGateway } from '../content-gateway/configured';
import { LocalContentGateway } from '../content-gateway/local';
import type { PublishedPage } from '../content-gateway/types';
import { editorialPeople } from '../data/editorialPeople';

type LocalBlogPost = CollectionEntry<'blog'>;
type BlogData = LocalBlogPost['data'];

export type ArticleBodyBlock =
  | { type: 'heading'; depth: 2 | 3; text: string; slug: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string; attribution?: string };

export type BlogPost = {
  id: string;
  data: BlogData;
  source: 'local' | 'cms';
  snapshotId?: string;
  localEntry?: LocalBlogPost;
  bodyBlocks?: ArticleBodyBlock[];
};

type CmsArticlePayload = Partial<BlogData> & {
  slug?: unknown;
  bodyBlocks?: unknown;
  body_blocks?: unknown;
};

const REVIEW_STATUSES = new Set(['draft-template', 'needs-review', 'reviewed']);
const CTA_TYPES = new Set(['early-access', 'demo', 'product']);
const ARTICLE_SCHEMA_VERSION = '1';

function requiredText(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`CMS article ${field} must be a non-empty string`);
  return value.trim();
}

function optionalText(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function requiredSlug(value: unknown, field: string): string {
  const slug = requiredText(value, field);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`CMS article ${field} must be a lowercase kebab-case slug`);
  return slug;
}

function textArray(value: unknown, field: string, minimum = 0): string[] {
  if (!Array.isArray(value)) throw new Error(`CMS article ${field} must be an array`);
  const items = value.map((item, index) => requiredText(item, `${field}[${index}]`));
  if (items.length < minimum) throw new Error(`CMS article ${field} must contain at least ${minimum} items`);
  return items;
}

function dateValue(value: unknown, field: string, optional = false): Date | undefined {
  if (optional && (value == null || value === '')) return undefined;
  const parsed = new Date(requiredText(value, field));
  if (Number.isNaN(parsed.valueOf())) throw new Error(`CMS article ${field} must be an ISO date`);
  return parsed;
}

function cmsMediaUrl(value: unknown, field: string): string {
  const url = new URL(requiredText(value, field));
  if (url.protocol !== 'https:') throw new Error(`CMS article ${field} must use HTTPS`);
  return url.toString();
}

function slugifyHeading(text: string): string {
  return text.toLocaleLowerCase('id-ID').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function parseBodyBlocks(value: unknown): ArticleBodyBlock[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error('CMS article bodyBlocks must be a non-empty array');
  const headingSlugs = new Set<string>();
  return value.map((raw, index) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error(`CMS article bodyBlocks[${index}] must be an object`);
    const block = raw as Record<string, unknown>;
    const type = requiredText(block.type, `bodyBlocks[${index}].type`);
    if (type === 'heading') {
      const depth = Number(block.depth);
      if (depth !== 2 && depth !== 3) throw new Error(`CMS article bodyBlocks[${index}].depth must be 2 or 3`);
      const text = requiredText(block.text, `bodyBlocks[${index}].text`);
      const slug = optionalText(block.slug) || slugifyHeading(text);
      if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`CMS article bodyBlocks[${index}].slug must be a lowercase kebab-case slug`);
      if (headingSlugs.has(slug)) throw new Error(`CMS article bodyBlocks contains duplicate heading slug: ${slug}`);
      headingSlugs.add(slug);
      return { type, depth, text, slug };
    }
    if (type === 'paragraph') return { type, text: requiredText(block.text, `bodyBlocks[${index}].text`) };
    if (type === 'list') return { type, ordered: block.ordered === true, items: textArray(block.items, `bodyBlocks[${index}].items`, 1) };
    if (type === 'quote') return { type, text: requiredText(block.text, `bodyBlocks[${index}].text`), attribution: optionalText(block.attribution) };
    throw new Error(`CMS article bodyBlocks[${index}] uses unsupported type: ${type}`);
  });
}

function parseSources(value: unknown): BlogData['sources'] {
  if (value == null) return [];
  if (!Array.isArray(value)) throw new Error('CMS article sources must be an array');
  return value.map((raw, index) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error(`CMS article sources[${index}] must be an object`);
    const source = raw as Record<string, unknown>;
    const accessedAt = dateValue(source.accessedAt ?? source.accessed_at, `sources[${index}].accessedAt`, true);
    const url = optionalText(source.url);
    if (url) {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') throw new Error(`CMS article sources[${index}].url must use HTTPS`);
    }
    return { title: requiredText(source.title, `sources[${index}].title`), publisher: requiredText(source.publisher, `sources[${index}].publisher`), url, accessedAt, note: requiredText(source.note, `sources[${index}].note`) };
  });
}

function parseCmsArticle(page: PublishedPage<CmsArticlePayload>): BlogPost {
  if (page.contentType !== 'articles') throw new Error(`Unexpected CMS article content type: ${page.contentType}`);
  if (page.schemaVersion !== ARTICLE_SCHEMA_VERSION) throw new Error(`Unsupported CMS article schema version: ${page.schemaVersion}`);
  const payload = page.payload;
  const slug = optionalText(payload.slug) || page.canonicalPath.match(/^\/blog\/([^/]+)\/$/)?.[1];
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`CMS article ${page.id} has an invalid blog slug`);
  if (page.canonicalPath !== `/blog/${slug}/`) throw new Error(`CMS article ${slug} canonical path does not match its slug`);
  const reviewStatus = requiredText(payload.reviewStatus, 'reviewStatus');
  const ctaType = requiredText(payload.ctaType, 'ctaType');
  if (!REVIEW_STATUSES.has(reviewStatus)) throw new Error(`CMS article ${slug} has an invalid reviewStatus`);
  if (!CTA_TYPES.has(ctaType)) throw new Error(`CMS article ${slug} has an invalid ctaType`);
  const takeaways = textArray(payload.takeaways, 'takeaways', 3);
  if (takeaways.length > 5) throw new Error(`CMS article ${slug} takeaways must contain at most 5 items`);
  const data = {
    title: requiredText(payload.title, 'title'), description: requiredText(payload.description, 'description'), dek: requiredText(payload.dek, 'dek'),
    cover: cmsMediaUrl(payload.cover, 'cover'), coverAlt: requiredText(payload.coverAlt, 'coverAlt'), publishedAt: dateValue(payload.publishedAt, 'publishedAt')!,
    updatedAt: dateValue(payload.updatedAt, 'updatedAt', true), category: requiredText(payload.category, 'category'), categorySlug: requiredSlug(payload.categorySlug, 'categorySlug'),
    tags: payload.tags == null ? [] : textArray(payload.tags, 'tags'), authorName: requiredText(payload.authorName, 'authorName'), authorSlug: requiredSlug(payload.authorSlug, 'authorSlug'),
    reviewerName: optionalText(payload.reviewerName), reviewerSlug: payload.reviewerSlug == null ? undefined : requiredSlug(payload.reviewerSlug, 'reviewerSlug'), reviewStatus: reviewStatus as BlogData['reviewStatus'],
    editorialStatus: requiredText(payload.editorialStatus, 'editorialStatus'), readingTime: requiredText(payload.readingTime, 'readingTime'), takeaways,
    sources: parseSources(payload.sources), disclaimer: optionalText(payload.disclaimer), updateSummary: requiredText(payload.updateSummary, 'updateSummary'),
    related: payload.related == null ? [] : textArray(payload.related, 'related'), ctaType: ctaType as BlogData['ctaType'], featured: payload.featured === true,
    draft: payload.draft === true, noindex: payload.noindex !== false,
  } satisfies BlogData;
  const authorProfile = editorialPeople.find((person) => person.slug === data.authorSlug);
  if (!authorProfile || authorProfile.name !== data.authorName) {
    throw new Error(`CMS article ${slug} author does not match a published editorial profile`);
  }
  if (data.reviewerSlug || data.reviewerName) {
    const reviewerProfile = editorialPeople.find((person) => person.slug === data.reviewerSlug);
    if (!reviewerProfile || reviewerProfile.name !== data.reviewerName) {
      throw new Error(`CMS article ${slug} reviewer does not match a published editorial profile`);
    }
  }
  if (!data.draft && !data.noindex && data.reviewStatus === 'reviewed' && (!data.reviewerName || !data.reviewerSlug)) {
    throw new Error(`Indexable CMS article ${slug} must include an approved reviewer`);
  }
  if (!data.draft && !data.noindex && data.reviewerSlug === data.authorSlug) {
    throw new Error(`Indexable CMS article ${slug} must use a reviewer distinct from its author`);
  }
  return { id: slug, data, source: 'cms', snapshotId: page.id, bodyBlocks: parseBodyBlocks(payload.bodyBlocks ?? payload.body_blocks) };
}

function localPublishedPage(post: LocalBlogPost): PublishedPage<CmsArticlePayload> {
  return {
    id: post.id, snapshotId: 'local-migration-fixture', contentType: 'articles', schemaVersion: ARTICLE_SCHEMA_VERSION, locale: 'id-ID',
    canonicalPath: `/blog/${post.id}/`, routes: [`/blog/${post.id}/`], publishedRevisionId: `local:${post.id}`, contentVersion: 'local',
    publishedAt: post.data.publishedAt.toISOString(), updatedAt: post.data.updatedAt?.toISOString(), payloadHash: `local:${post.id}`, payload: post.data,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const localPosts = await getCollection('blog');
  const source = process.env.RAMUNI_CONTENT_SOURCE?.trim() || 'local';
  if (source === 'local') return localPosts.map((post) => ({ id: post.id, data: post.data, source: 'local', localEntry: post }));
  const localBySlug = new Map(localPosts.map((post) => [post.id, post]));
  const gateway = await createConfiguredContentGateway({ local: new LocalContentGateway(localPosts.map(localPublishedPage)) });
  const records = await gateway.listCollection<CmsArticlePayload>('articles', { limit: 1000 });
  return records.map((record) => {
    const local = localBySlug.get(record.canonicalPath.match(/^\/blog\/([^/]+)\/$/)?.[1] || '');
    if (record.snapshotId === 'local-migration-fixture' && local) return { id: local.id, data: local.data, source: 'local', localEntry: local };
    return parseCmsArticle(record);
  });
}

export const getArticleHeadings = (post: BlogPost) => post.bodyBlocks?.flatMap((block) => block.type === 'heading' ? [{ depth: block.depth, slug: block.slug, text: block.text }] : []) || [];

export const BLOG_PAGE_SIZE = 6;
export const BLOG_CATEGORY_INDEXABLE_ARTICLE_MINIMUM = 3;

export const sortBlogPosts = (posts: BlogPost[]): BlogPost[] => [...posts].sort((a, b) => {
  const dateDifference = b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
  return dateDifference || a.id.localeCompare(b.id, 'id-ID');
});

export const getVisibleBlogPosts = (posts: BlogPost[], includeEditorialPreview = true): BlogPost[] =>
  sortBlogPosts(posts.filter((post) => (!post.data.draft && (includeEditorialPreview || isIndexableReviewedPost(post)))));

export const isIndexableReviewedPost = (post: BlogPost): boolean => !post.data.draft && !post.data.noindex && post.data.reviewStatus === 'reviewed';
export const isBlogCategoryIndexable = (posts: BlogPost[]): boolean => posts.filter(isIndexableReviewedPost).length >= BLOG_CATEGORY_INDEXABLE_ARTICLE_MINIMUM;

export type BlogPagination = { items: BlogPost[]; currentPage: number; totalPages: number; totalItems: number; startPosition: number };
export const paginateBlogPosts = (posts: BlogPost[], requestedPage: number, pageSize = BLOG_PAGE_SIZE): BlogPagination => {
  const totalItems = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const offset = (currentPage - 1) * pageSize;
  return { items: posts.slice(offset, offset + pageSize), currentPage, totalPages, totalItems, startPosition: offset + 1 };
};
export const getBlogPageHref = (page: number): string => page <= 1 ? '/blog/' : `/blog/page/${page}/`;
export const getBlogPageTitle = (page: number): string => page <= 1 ? 'Blog Bisnis UMKM' : `Artikel Bisnis UMKM - Halaman ${page}`;
