import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src/content/blog');
const visualDir = path.join(root, 'public/website-original/blog/generated/article-visuals');
const componentPath = path.join(root, 'src/components/blog/ArticleContextVisual.astro');
const routePath = path.join(root, 'src/pages/blog/[...slug].astro');
const productArticleId = 'ai-business-companion-umkm';

const articleIds = fs.readdirSync(blogDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.slice(0, -3))
  .sort();

if (articleIds.length === 0) {
  throw new Error('No blog articles found');
}

if (!articleIds.includes(productArticleId)) {
  throw new Error(`Product article is missing: ${productArticleId}`);
}

const generatedIds = articleIds.filter((id) => id !== productArticleId);
const dashboardCovers = articleIds.filter((id) => {
  const source = fs.readFileSync(path.join(blogDir, `${id}.md`), 'utf8');
  return id !== productArticleId && /^cover:\s*["'].*\/(?:dashboards|product-screens)\//m.test(source);
});

if (dashboardCovers.length > 0) {
  throw new Error(`Non-product articles still use dashboard covers: ${dashboardCovers.join(', ')}`);
}

// Article covers are the reviewed canonical visuals. Generated derivatives
// are optional and must not be inferred from an article id: doing so caused
// valid articles to reference 404 files in production. Verify every cover
// from frontmatter instead; the route passes it to ArticleContextVisual.
const frontmatter = new Map(articleIds.map((id) => {
  const source = fs.readFileSync(path.join(blogDir, `${id}.md`), 'utf8');
  const cover = source.match(/^cover:\s*["']([^"']+)["']/m)?.[1];
  return [id, cover];
}));
const missingCovers = articleIds.filter((id) => {
  const cover = frontmatter.get(id);
  if (!cover || !cover.startsWith('/')) return true;
  const file = path.join(root, 'public', cover.replace(/^\//, ''));
  return !fs.existsSync(file) || fs.statSync(file).size < 1000;
});
if (missingCovers.length > 0) throw new Error(`Missing or empty reviewed article covers: ${missingCovers.join(', ')}`);

const component = fs.readFileSync(componentPath, 'utf8');
const route = fs.readFileSync(routePath, 'utf8');

if (!component.includes("articleId === 'ai-business-companion-umkm'")) {
  throw new Error('Product dashboard exception is not explicit in ArticleContextVisual');
}

if (!component.includes('articleCover')) {
  throw new Error('Reviewed article cover fallback is missing from ArticleContextVisual');
}

if (!route.includes('articleTitle={post.data.title}') || !route.includes('articleDescription={post.data.description}')) {
  throw new Error('Article metadata is not passed to the visual component');
}

console.log(`Article visual audit passed: ${generatedIds.length} reviewed article covers + 1 product dashboard exception.`);
