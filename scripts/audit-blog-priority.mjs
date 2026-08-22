import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const matrixPath = path.join(root, 'docs', 'blog-priority-matrix.md');
const allowed = new Set(['P0', 'P1', 'P2']);
const files = fs.readdirSync(blogDir).filter((file) => /\.(md|mdx)$/.test(file)).sort();
const records = files.map((file) => {
  const slug = file.replace(/\.(md|mdx)$/, '');
  const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const frontmatter = raw.split('---')[1];
  if (!frontmatter) throw new Error(`Missing frontmatter: ${file}`);
  const priority = frontmatter.match(/^deliveryPriority:\s*["']?(P[012])["']?\s*$/m)?.[1];
  if (!allowed.has(priority)) throw new Error(`${slug}: deliveryPriority must be P0, P1, or P2`);
  return { slug, priority };
});

const matrix = fs.readFileSync(matrixPath, 'utf8');
const matrixRows = [...matrix.matchAll(/^\| (P[012]) \| \/blog\/([^/]+)\//gm)].map((match) => ({ priority: match[1], slug: match[2] }));
const expected = new Map(records.map((record) => [record.slug, record.priority]));
const seen = new Map();
for (const row of matrixRows) {
  if (seen.has(row.slug)) throw new Error(`Duplicate matrix row: ${row.slug}`);
  seen.set(row.slug, row.priority);
  if (!expected.has(row.slug)) throw new Error(`Matrix contains unknown article: ${row.slug}`);
  if (expected.get(row.slug) !== row.priority) throw new Error(`Priority mismatch for ${row.slug}: frontmatter ${expected.get(row.slug)}, matrix ${row.priority}`);
}
const missing = records.filter((record) => !seen.has(record.slug)).map((record) => record.slug);
if (missing.length) throw new Error(`Articles missing from matrix: ${missing.join(', ')}`);

const counts = records.reduce((result, record) => ({ ...result, [record.priority]: result[record.priority] + 1 }), { P0: 0, P1: 0, P2: 0 });
console.log(`Blog priority audit passed: ${records.length} articles; P0=${counts.P0}, P1=${counts.P1}, P2=${counts.P2}.`);
