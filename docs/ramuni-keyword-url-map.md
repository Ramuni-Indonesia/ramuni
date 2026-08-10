# RAMUNI keyword-to-URL map

`outputs/ramuni-keyword-plan-5000.csv` is the working map for the 5,000-query plan. It contains 100 keyword groups with 50 semantic variants each. Every row is assigned to an existing, indexable RAMUNI URL; it is not a publishing queue for 5,000 new pages.

## Operating rule

1. Keep one primary URL per search intent. A keyword variant belongs in the title, headings, body copy, FAQ, image alt text when relevant, and internal-anchor vocabulary only when it reads naturally.
2. Do not create another post merely because a variant exists in the CSV. A new URL requires a distinct intent, evidence from Search Console or a keyword tool, and a documented canonical target.
3. Use the CSV columns `recommended_solution_url` and `recommended_product_url` to create a natural path from an informational article to the relevant solution and commercial page.
4. Treat `P1` rows as the first editorial batch; update the target article, then validate its canonical, title, description, H1, schema, internal links, and indexability before progressing.

## Intent contract

| URL type | Job | Example |
| --- | --- | --- |
| Blog article | Explain a problem or method | `/blog/cara-menghitung-hpp-produk/` |
| Calculator or template | Help the reader complete a task | `/kalkulator/hpp/`, `/template/hpp-produk/` |
| Solution page | Relate the business problem to RAMUNI's workflow | `/solusi/pantau-laba-dan-arus-kas/` |
| Product page | Explain the product capability and lead next step | `/produk/keuangan/` |

## Quality gate for each mapped article

- One descriptive H1 and a title/description that match the article's intent.
- A compact explanation, a worked example or decision table where useful, and only relevant FAQ entries.
- Contextual links to a calculator, template, related article, solution, and product when each genuinely advances the reader.
- No keyword repetition solely to influence rankings; no duplicate or near-duplicate URL for a wording variant.
- Correct canonical, `index, follow`, structured data, image alternative text, and sitemap inclusion.

The map is a planning asset. Query volume, live SERP intent, and page performance must be checked before prioritising a refresh or creating a truly distinct new page.
