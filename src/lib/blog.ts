import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const BLOG_PAGE_SIZE = 6;
export const BLOG_CATEGORY_INDEXABLE_ARTICLE_MINIMUM = 3;

export const sortBlogPosts = (posts: BlogPost[]): BlogPost[] => [...posts].sort((a, b) => {
  const dateDifference = b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
  return dateDifference || a.id.localeCompare(b.id, 'id-ID');
});

export const getVisibleBlogPosts = (posts: BlogPost[], includeEditorialPreview = true): BlogPost[] =>
  sortBlogPosts(posts.filter((post) => (
    !post.data.draft
    && (includeEditorialPreview || isIndexableReviewedPost(post))
  )));

export const isIndexableReviewedPost = (post: BlogPost): boolean =>
  !post.data.draft && !post.data.noindex && post.data.reviewStatus === 'reviewed';

export const isBlogCategoryIndexable = (posts: BlogPost[]): boolean =>
  posts.filter(isIndexableReviewedPost).length >= BLOG_CATEGORY_INDEXABLE_ARTICLE_MINIMUM;

export type BlogPagination = {
  items: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startPosition: number;
};

export const paginateBlogPosts = (
  posts: BlogPost[],
  requestedPage: number,
  pageSize = BLOG_PAGE_SIZE,
): BlogPagination => {
  const totalItems = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const offset = (currentPage - 1) * pageSize;

  return {
    items: posts.slice(offset, offset + pageSize),
    currentPage,
    totalPages,
    totalItems,
    startPosition: offset + 1,
  };
};

export const getBlogPageHref = (page: number): string =>
  page <= 1 ? '/blog/' : `/blog/page/${page}/`;

export const getBlogPageTitle = (page: number): string =>
  page <= 1 ? 'Blog Bisnis UMKM' : `Artikel Bisnis UMKM - Halaman ${page}`;
