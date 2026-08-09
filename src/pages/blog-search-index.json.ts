import type { APIRoute } from 'astro';
import { getBlogPosts, getVisibleBlogPosts } from '../lib/blog';

export const GET: APIRoute = async () => {
  const articles = getVisibleBlogPosts(await getBlogPosts(), false)
    .sort((a, b) => (b.data.updatedAt || b.data.publishedAt).valueOf() - (a.data.updatedAt || a.data.publishedAt).valueOf())
    .map((post) => ({
      title: post.data.title,
      dek: post.data.dek,
      category: post.data.category,
      categorySlug: post.data.categorySlug,
      tags: post.data.tags,
      author: post.data.authorName,
      cover: post.data.cover,
      coverAlt: post.data.coverAlt,
      href: `/blog/${post.id}/`,
      readingTime: post.data.readingTime,
    }));
  return new Response(JSON.stringify(articles), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
};
