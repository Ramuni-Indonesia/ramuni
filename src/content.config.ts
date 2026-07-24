import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dek: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.string(),
    categorySlug: z.string(),
    tags: z.array(z.string()).default([]),
    authorName: z.string(),
    authorSlug: z.string(),
    reviewerName: z.string().optional(),
    reviewerSlug: z.string().optional(),
    reviewStatus: z.enum(['draft-template', 'needs-review', 'reviewed']).default('draft-template'),
    editorialStatus: z.string(),
    readingTime: z.string(),
    takeaways: z.array(z.string()).min(3).max(5),
    sources: z.array(z.object({
      title: z.string(),
      publisher: z.string(),
      url: z.url().optional(),
      accessedAt: z.coerce.date().optional(),
      note: z.string(),
    })).default([]),
    disclaimer: z.string().optional(),
    updateSummary: z.string(),
    related: z.array(z.string()).default([]),
    ctaType: z.enum(['early-access', 'demo', 'product']).default('early-access'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

export const collections = { blog };
