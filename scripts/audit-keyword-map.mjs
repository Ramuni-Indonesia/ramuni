import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const csvPath = path.join(root, 'outputs', 'ramuni-keyword-plan-5000.csv');
const blogDirectory = path.join(root, 'src', 'content', 'blog');

if (!fs.existsSync(csvPath)) {
  throw new Error(`Keyword map missing: ${path.relative(root, csvPath)}`);
}

const lines = fs.readFileSync(csvPath, 'utf8').trim().split(/\r?\n/);
const header = lines.shift();
const expectedHeader = '"keyword","keyword_group_id","topic","existing_target_url"';
if (!header?.startsWith(expectedHeader)) {
  throw new Error('Keyword map header does not contain the required target URL column.');
}

const targets = new Map();
for (const line of lines) {
  const cells = [...line.matchAll(/"((?:[^"]|"")*)"/g)].map((match) => match[1].replaceAll('""', '"'));
  const [keyword, groupId, , target] = cells;
  if (!keyword || !groupId || !target?.startsWith('/blog/')) {
    throw new Error(`Invalid keyword map row: ${line}`);
  }
  targets.set(groupId, (targets.get(groupId) || []).concat({ keyword, target }));
}

if (lines.length !== 5000 || targets.size !== 100) {
  throw new Error(`Expected 5,000 keywords in 100 groups; found ${lines.length} keywords in ${targets.size} groups.`);
}

for (const [groupId, rows] of targets) {
  if (rows.length !== 50) throw new Error(`${groupId} has ${rows.length} keywords; expected 50.`);
  const distinctTargets = new Set(rows.map((row) => row.target));
  if (distinctTargets.size !== 1) throw new Error(`${groupId} maps to more than one target URL.`);
  const slug = rows[0].target.split('/').filter(Boolean).at(-1);
  if (!fs.existsSync(path.join(blogDirectory, `${slug}.md`))) {
    throw new Error(`${groupId} maps to missing article ${rows[0].target}.`);
  }
}

console.log(`Verified ${lines.length} keywords across ${targets.size} groups; every group maps to one existing blog URL.`);
