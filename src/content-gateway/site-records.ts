import { createHash } from 'node:crypto';
import { products, type Product } from '../data/site';
import { productDetails, type ProductDetail } from '../data/productDetails';
import { solutionDetails, type SolutionDetail } from '../data/solutionDetails';
import { createConfiguredContentGateway } from './configured';
import { LocalContentGateway } from './local';
import type { MarketingContentGateway, PublishedPage } from './types';

type CmsDocument = {
  slug?: string;
  title?: string;
  canonicalPath?: string;
  hero?: { eyebrow?: string; title?: string; description?: string };
  seo?: { title?: string; description?: string; canonical?: string };
  blocks?: Array<Record<string, unknown>>;
};

export type ProductPagePayload = { product: Product; detail: ProductDetail };
export type ProductRouteModel = ProductPagePayload & { seo?: { title?: string; description?: string }; cmsSnapshotId?: string };
export type SolutionPagePayload = { solution: SolutionDetail };
export type SolutionRouteModel = SolutionPagePayload & { cmsSnapshotId?: string };

function hash(payload: Record<string, unknown>): string { return createHash('sha256').update(JSON.stringify(payload)).digest('hex'); }
function localPage<T extends Record<string, unknown>>(contentType: string, slug: string, canonicalPath: string, payload: T): PublishedPage<T> {
  return { id: `local:${contentType}:${slug}`, snapshotId: `local:${contentType}:${slug}`, contentType, schemaVersion: '1', locale: 'id-ID', canonicalPath,
    routes: [canonicalPath], publishedRevisionId: `local:${contentType}:${slug}:revision`, contentVersion: 'local', payloadHash: hash(payload), payload };
}

export function localProductPages(): Array<PublishedPage<ProductPagePayload>> {
  return products.map((product) => {
    const detail = productDetails[product.slug];
    if (!detail) throw new Error(`Product detail content is missing for ${product.slug}`);
    return localPage('product-pages', product.slug, `/produk/${product.slug}/`, { product, detail });
  });
}
export function localSolutionPages(): Array<PublishedPage<SolutionPagePayload>> {
  return solutionDetails.map((solution) => localPage('solution-pages', solution.slug, `/solusi/${solution.slug}/`, { solution }));
}
export function createLocalMarketingContentGateway(): LocalContentGateway { return new LocalContentGateway([...localProductPages(), ...localSolutionPages()]); }
export async function createMarketingContentGateway(): Promise<MarketingContentGateway> { return createConfiguredContentGateway({ local: createLocalMarketingContentGateway() }); }

function cmsDocument(page: PublishedPage): CmsDocument | null {
  const payload = page.payload as Record<string, unknown>;
  return payload.product || payload.solution ? null : payload as CmsDocument;
}

export function productRouteModelFromPage(page: PublishedPage): ProductRouteModel {
  const local = page.payload as Partial<ProductPagePayload>;
  if (local.product?.slug && local.detail?.heroLead) return { product: local.product, detail: local.detail };
  const document = cmsDocument(page);
  const slug = document?.slug;
  if (!slug || page.canonicalPath !== `/produk/${slug}/`) throw new Error(`Invalid CMS product identity for ${page.canonicalPath}`);
  const baselineProduct = products.find((item) => item.slug === slug);
  const baselineDetail = productDetails[slug];
  if (!baselineProduct || !baselineDetail) throw new Error(`CMS product ${slug} has no typed local migration baseline`);
  if (!document?.hero?.title || !document.hero.description || !document.title) throw new Error(`CMS product ${slug} is missing required hero fields`);
  return {
    product: { ...baselineProduct, title: document.title, summary: document.hero.description },
    detail: { ...baselineDetail, audience: document.hero.eyebrow || baselineDetail.audience, heroLead: document.hero.description },
    seo: document.seo,
    cmsSnapshotId: page.id,
  };
}

export function solutionRouteModelFromPage(page: PublishedPage): SolutionRouteModel {
  const local = page.payload as Partial<SolutionPagePayload>;
  if (local.solution?.slug && local.solution.heroTitle) return { solution: local.solution };
  const document = cmsDocument(page);
  const slug = document?.slug;
  if (!slug || page.canonicalPath !== `/solusi/${slug}/`) throw new Error(`Invalid CMS solution identity for ${page.canonicalPath}`);
  const baseline = solutionDetails.find((item) => item.slug === slug);
  if (!baseline) throw new Error(`CMS solution ${slug} has no typed local migration baseline`);
  if (!document?.hero?.title || !document.hero.description || !document.title) throw new Error(`CMS solution ${slug} is missing required hero fields`);
  return { solution: { ...baseline, title: document.title, eyebrow: document.hero.eyebrow || baseline.eyebrow, heroTitle: document.hero.title,
    heroText: document.hero.description, metaDescription: document.seo?.description || document.hero.description }, cmsSnapshotId: page.id };
}

export async function listProductRouteModels(gateway?: MarketingContentGateway): Promise<ProductRouteModel[]> {
  const source = gateway ?? await createMarketingContentGateway();
  return (await source.listCollection('product-pages')).map(productRouteModelFromPage);
}
export async function listSolutionRouteModels(gateway?: MarketingContentGateway): Promise<SolutionRouteModel[]> {
  const source = gateway ?? await createMarketingContentGateway();
  return (await source.listCollection('solution-pages')).map(solutionRouteModelFromPage);
}
