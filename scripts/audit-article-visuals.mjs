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

if (articleIds.length !== 107) {
  throw new Error(`Expected 107 blog articles, found ${articleIds.length}`);
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

const missing = generatedIds.filter((id) => {
  const file = path.join(visualDir, `${id}.webp`);
  return !fs.existsSync(file) || fs.statSync(file).size < 1000;
});

if (missing.length > 0) {
  throw new Error(`Missing or empty generated article visuals: ${missing.join(', ')}`);
}

const unexpected = fs.readdirSync(visualDir)
  .filter((file) => file.endsWith('.webp'))
  .map((file) => file.slice(0, -5))
  .filter((id) => !generatedIds.includes(id));

if (unexpected.length > 0) {
  throw new Error(`Unexpected article visual files: ${unexpected.join(', ')}`);
}

const component = fs.readFileSync(componentPath, 'utf8');
const route = fs.readFileSync(routePath, 'utf8');

if (!component.includes("articleId === 'ai-business-companion-umkm'")) {
  throw new Error('Product dashboard exception is not explicit in ArticleContextVisual');
}

if (!component.includes('/website-original/blog/generated/article-visuals/${articleId}.webp')) {
  throw new Error('Generated visual fallback path is missing from ArticleContextVisual');
}

if (!route.includes('articleTitle={post.data.title}') || !route.includes('articleDescription={post.data.description}')) {
  throw new Error('Article metadata is not passed to the visual component');
}

console.log(`Article visual audit passed: ${generatedIds.length} generated visuals + 1 product dashboard exception.`);
