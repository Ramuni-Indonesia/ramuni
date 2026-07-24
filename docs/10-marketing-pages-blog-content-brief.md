# RAMUNI Marketing Pages, Blog, and Campaign Landing Page Content Brief

**Audience:** Product owner, marketing lead, content strategist, SEO specialist, designer, frontend developer, CMS developer, QA, and analytics engineer  
**Status:** Implementation brief  
**Version:** 1.0  
**Date:** 25 July 2026  
**Primary references:** [01-srs.md](01-srs.md), [02-backlog.md](02-backlog.md), [03-architecture-database-security.md](03-architecture-database-security.md), [04-implementation-code-plan.md](04-implementation-code-plan.md), [05-marketing-blog-plan.md](05-marketing-blog-plan.md), [06-product-manual-plan.md](06-product-manual-plan.md), [08-marketing-website-blog-developer-handover.md](08-marketing-website-blog-developer-handover.md), [09-full-product-capability-map.md](09-full-product-capability-map.md), [10-full-product-backlog-catalog.md](10-full-product-backlog-catalog.md), [11-full-product-coverage-audit.md](11-full-product-coverage-audit.md), [12-product-development-execution-plan.md](12-product-development-execution-plan.md), [13-final-brand-implementation-brief.md](13-final-brand-implementation-brief.md)

**Authority split:** This document is the source of truth for page-content architecture, navigation content, page sections, blog/editorial entities, resources, help-center content, and campaign landing-page content. Document 08 remains the source of truth for technical SEO, analytics, consent, ads-readiness, form security, environment behavior, QA, and developer delivery artifacts. Document 13 is the source of truth for the final visual identity, approved assets, logo usage, colors, typography, favicon mapping, and brand implementation QA.

## 1. Purpose

This document defines every major public page RAMUNI needs, why each page exists, what sections it contains, what each section must communicate, which CTA it uses, how it links to other pages, whether it is intended for SEO or paid traffic, and which CMS fields and analytics events support it.

This document does not finalize page composition, spacing, illustration style, or responsive visual design, and it is not permission to invent product claims. However, the core identity is already final: all implementations must use the **Lipat Arah** logo system, approved color tokens, Plus Jakarta Sans, and approved favicon/media exports defined in [13-final-brand-implementation-brief.md](13-final-brand-implementation-brief.md). Developers must implement the content structure, reusable section components, metadata fields, CMS relationships, tracking hooks, and page states described here. Copy may be refined later without changing the information architecture.

The CMS `theme`, logo/media picker, shared header/footer, blog, help center, social-card renderer, and campaign components must reference approved brand tokens and asset IDs. Editors and campaign teams may choose an approved variant appropriate to its background, but may not upload a replacement identity, recolor the mark, or invent a different visual brand for SEO pages, paid landing pages, blog graphics, Google Ads, Meta Ads, or Instagram creatives.

## 2. Positioning and content guardrails

RAMUNI is positioned as an **AI Business Companion for Indonesian MSMEs**, not a complex ERP and not a generic chatbot.

Core message:

> **Understand your business. Know your next step.**

Core explanation:

> RAMUNI brings together sales, inventory, expenses, and customer data, then turns it into understandable insights and recommendations so business owners know what is happening, why it is happening, and what action deserves attention.

Content guardrails:

- Do not claim that RAMUNI guarantees higher revenue, profit, retention, or inventory accuracy.
- Do not display customer logos, quotes, ratings, usage numbers, awards, integration availability, or security certifications without verifiable evidence and written approval.
- Do not imply that AI autonomously changes prices, sends messages, purchases stock, edits transactions, or makes financial decisions.
- Clearly distinguish `Available`, `Private Beta`, `Coming Soon`, `Concept Preview`, and `Unavailable`.
- Planning coverage, backlog priority, release horizon, and availability are separate. `P0` does not mean public `Available`; `R0` and `R1` do not mean sellable; public marketing may sell only a capability with approved release evidence.
- If a page mixes available and future features, each feature group must carry its own status label, backlog IDs, release horizon, and evidence reference.
- Examples must use fictional/sample businesses and synthetic data.
- Finance content must distinguish revenue, gross profit, operating profit, and cash flow.
- Product screenshots must match an implemented or approved prototype state.
- Primary language is plain Indonesian business language. Avoid unexplained analytics, accounting, and AI jargon.

## 3. Global content contract

Every reusable page section must support these fields where applicable:

| Field | Purpose |
|---|---|
| `eyebrow` | Short context label above heading |
| `heading` | Clear benefit, problem, or question |
| `body` | One concise explanation; no unsupported claims |
| `bullets` | Three to five scannable points |
| `primaryCta` | One primary action with URL and analytics ID |
| `secondaryCta` | Optional lower-priority action |
| `media` | Screenshot, illustration, photo, video, or interactive demo |
| `mediaAlt` | Accessible factual description |
| `proofItems` | Approved source, metric, quote, or trust item |
| `statusLabel` | One of `Available`, `Private Beta`, `Coming Soon`, `Concept Preview`, `Unavailable` |
| `deliveryPriority` | P0-P4 planning priority; never a public availability claim by itself |
| `releaseHorizon` | R0-R5 release horizon or explicit `TBD` until approved |
| `commercialEdition` | Starter, Growth, Pro, Enterprise, Partner, or `Unapproved` until packaging is final |
| `backlogIds` | Related requirement/story IDs from SRS and backlog catalog |
| `releaseEvidenceId` | Verified implementation, screenshot, test, or product-owner approval reference |
| `availabilityApprovedBy` | Product/legal/content owner and verification date for the public claim |
| `theme` | Approved design-system token only |
| `analyticsId` | Stable identifier independent from visible copy |

Global section rules:

- A section advances one argument only.
- Heading remains understandable without the paragraph below it.
- Primary and secondary CTAs must not compete visually.
- Every claim has an internal source or approval owner.
- A decorative image cannot replace explanatory content.
- Important copy and links render in initial HTML.
- Reusable sections must allow CMS ordering while page templates retain required section constraints.

## 4. SEO page versus paid-ad landing page

SEO pages and ad landing pages may share components, but they are not automatically the same page.

| Dimension | SEO/product page | Paid-ad landing page |
|---|---|---|
| Primary job | Satisfy search intent and build durable authority | Convert one campaign audience into one action |
| Audience | Mixed awareness and multiple entry points | Known audience, promise, creative, and campaign |
| Navigation | Full header, breadcrumbs where relevant, full footer | Minimal header; logo plus optional trust/contact link; reduced footer |
| Content breadth | Comprehensive topic coverage | Only content required to complete the campaign argument |
| Primary CTA | May support trial, demo, pricing, and related learning | One primary CTA repeated at decision points |
| Internal links | Rich contextual links to product, solution, industry, blog | Limited links that do not leak attention from conversion path |
| Keyword targeting | One primary search intent plus related subtopics | Message match with ad headline and audience pain |
| Indexing | Index if canonical, useful, unique, and approved | Index only if it also provides durable unique search value; otherwise noindex |
| Testing | Titles, content depth, snippets, CTA | Hero, offer, proof, form, CTA, objection order |
| URL | Stable semantic URL | `/lp/[campaign-or-offer]` or approved evergreen URL |

Decision rule:

1. Use an existing SEO/product page for ads only when the query intent, headline promise, CTA, and page content already match the campaign.
2. Create a dedicated landing page when the campaign uses a specific audience, offer, lead magnet, or promise that the general page does not support.
3. Do not duplicate an SEO page into multiple thin indexed landing pages. Dedicated campaign variants default to noindex and canonicalize according to the SEO decision documented for that campaign.

## 5. Header navigation brief

### 5.1 Desktop header

Left to right:

1. RAMUNI logo linked to `/`.
2. `Produk` mega-menu.
3. `Solusi` mega-menu.
4. `Harga` linked to `/harga`.
5. `Sumber Daya` mega-menu.
6. `Tentang` linked to `/tentang`.
7. `Masuk` linked to `/masuk`.
8. Primary CTA is resolved from launch state; it must not be hard-coded as `Coba Gratis` before an open trial exists.

Global CTA resolver:

| Launch state | Primary CTA | Destination |
|---|---|---|
| Private Beta / waitlist | `Daftar Early Access` | `/early-access` |
| Invite only | `Minta Undangan` | Approved request route |
| Open trial | `Coba Gratis` | Product-owned `/daftar` |
| Paid GA | `Pilih Paket` or `Coba Gratis` | `/harga` or product-owned `/daftar` |
| Concept preview only | `Lihat Preview` | `/demo` or approved preview route |

The same resolver controls desktop header, mobile menu, homepage, product pages, pricing, demo, and campaign landing pages.

Header requirements:

- Sticky behavior may activate after scrolling, but it must not cover anchored headings.
- Current section is visually indicated.
- Keyboard navigation, focus state, Escape close, arrow-key support, and screen-reader labels are required.
- Mega-menu maximum is four columns.
- Menu opens intentionally; avoid accidental hover-only interaction.
- Mobile and desktop links use the same route source of truth.

### 5.2 Produk mega-menu

Column 1 — Intelligence:

- Asisten AI — “Tanyakan kondisi bisnis dengan jawaban berbasis data.”
- Dashboard Bisnis — “Lihat kesimpulan penting sebelum membuka detail.”
- Laporan & Insight — “Terima rangkuman harian dan mingguan.”

Column 2 — Operasional:

- Katalog Produk — “Kelola kategori, unit, SKU, harga, dan HPP sesuai status fitur.”
- Penjualan — “Catat transaksi dan pahami perubahan omzet.”
- Inventori — “Pantau mutasi, stok minimum, dan kebutuhan restock.”
- Keuangan — “Pantau pengeluaran, laba, dan arus kas.”
- Pelanggan — “Pahami riwayat pembelian dan repeat customer.”

Column 3 — Ecosystem:

- Integrasi — “Lihat opsi impor dan integrasi berdasarkan status ketersediaan.”
- Semua Produk — link to `/produk`.

Column 4 — CTA panel:

- Short message: “Mulai dari data usaha yang sudah Anda miliki.”
- Primary: `Coba Gratis`.
- Secondary: `Lihat Demo`.

### 5.3 Solusi mega-menu

Column 1 — Business outcomes:

- Naikkan Omzet.
- Kelola Stok.
- Pantau Laba dan Arus Kas.
- Pahami Pelanggan.
- Laporan Bisnis Otomatis.

Column 2 — By industry:

- Retail.
- F&B.
- Distributor.
- Reseller Online.
- Jasa.
- Manufaktur Kecil.

Column 3 — By role:

- Pemilik Usaha.
- Admin Toko.
- Kasir.
- Supervisor.

Column 4 — CTA panel:

- Link to `/solusi`, `/industri`, and `/untuk` hubs.
- CTA `Temukan Solusi untuk Usaha Anda`.

### 5.4 Sumber Daya mega-menu

Column 1 — Learn:

- Blog.
- Panduan.
- Kamus Bisnis.

Column 2 — Use:

- Template.
- Kalkulator Laba.
- Kalkulator HPP.
- Kalkulator Reorder Stok.

Column 3 — Product help:

- Bantuan.
- Keamanan.
- Status.

Column 4 — Featured content:

- One CMS-selected featured article, guide, or calculator.
- Label the content type and reading time.

### 5.5 Mobile navigation

- Logo, menu button, and primary CTA remain visible.
- Accordion groups: Produk, Solusi, Sumber Daya.
- Accordions preserve the same hierarchy as desktop.
- Menu traps focus while open and closes on route change.
- Primary CTA from the global CTA resolver appears at both top and bottom of the menu.
- `Masuk` is visually secondary to the resolved primary CTA.

## 6. Footer brief

Footer content:

1. Brand block: logo, one-line positioning, short trust statement, social links when official.
2. Product: product hub and published product families from the capability registry, with `Semua Produk` as the overflow path.
3. Solutions: solution, industry, and role hubs.
4. Resources: blog, guides, templates, calculators, glossary, help.
5. Company: about, contact, security, status.
6. Legal: privacy, terms, cookie policy, data processing.
7. Account: login and signup.
8. Bottom bar: copyright, language `Indonesia`, consent settings link, and system status indicator when available.

Footer rules:

- Do not list pages that are not published.
- Social icons require accessible labels and official URLs.
- Consent settings must reopen the consent manager.
- Contact details must match legal and business records.
- Footer navigation is centrally configured in CMS/settings, not duplicated per page.

## 7. Global page components

Required reusable components:

- Announcement bar.
- Breadcrumbs.
- Hero variants: product, solution, industry, role, editorial, campaign.
- CTA group.
- Screenshot/product-demo frame.
- Problem cards.
- Benefit list.
- Workflow steps.
- Feature-detail rows.
- Example insight block with source and sample-data label.
- Industry/role selector.
- Trust/security strip.
- Pricing preview.
- FAQ accordion with visible HTML content.
- Related content rail.
- Contextual CTA block.
- Lead form.
- Author/reviewer byline.
- Source list.
- Last-updated notice.
- Status badge: Available/Beta/Soon/Preview.
- Empty, loading, error, and unavailable states.

## 8. Homepage `/`

**Audience:** Cold and returning visitors from direct, organic, referrals, social, and broad campaigns.  
**Primary goal:** Explain RAMUNI in five seconds and move qualified visitors to signup or demo.  
**Primary CTA:** `Coba Gratis`.  
**Secondary CTA:** `Lihat Demo`.

Section order:

### H01 — Announcement bar

- Purpose: communicate private beta, early access, or a verified product update.
- Content: one sentence, status label, destination link.
- Do not use rotating promotional messages.

### H02 — Hero

- Eyebrow: `AI Business Companion untuk UMKM Indonesia`.
- H1: `Pahami bisnis Anda. Tahu langkah berikutnya.`
- Body: explain that sales, inventory, expenses, and customer data become understandable insight and recommendations.
- Primary CTA: value from the global CTA resolver; never imply an open trial when the current state is beta, invite-only, or preview.
- Secondary CTA: `Lihat Demo`.
- Media: approved dashboard or insight sample; label as sample when synthetic.
- Supporting microcopy: trial/beta expectation, no credit card only if true, and data safety statement only if verified.

### H03 — Problem recognition

- Heading: “Data ada, tetapi keputusan masih terasa seperti menebak?”
- Cover five pains: revenue changes, stock shortage/overstock, unclear profit, inactive customers, manual reports.
- Each pain links to the relevant solution page.

### H04 — Example AI answer

- Question: “Kenapa omzet saya turun minggu ini?”
- Answer anatomy: conclusion, primary reason, evidence period, affected product/category, recommended next check.
- Label data as sample.
- Explain that deterministic calculations provide numbers and AI explains them.
- P0 implementation is a static or deterministic sample-question selector; it must not accept arbitrary free text.
- If an interactive sandbox is later approved, limit it to allowed sample questions and synthetic data, provide loading, timeout, unavailable, and retry states, and never send PII or tenant data from the browser to an AI provider.
- The public demo must display its capability status and evidence version; a concept preview cannot be presented as a live product function.

### H05 — Data-to-decision workflow

- Steps: Data → Calculation → Insight → Recommendation → Human Decision.
- Explain what RAMUNI does and what remains controlled by the owner.
- Link to Asisten AI and Dashboard pages.

### H06 — Insight-first dashboard

- Show one prioritized insight before detailed metrics.
- Explain period comparison, freshness, and evidence.
- Include empty-data and insufficient-data expectations.
- CTA: `Lihat Cara Dashboard Bekerja`.

### H07 — Product module overview

- Cards: Asisten AI, Dashboard, Penjualan, Inventori, Keuangan, Pelanggan, Laporan, Integrasi.
- Each card contains outcome, one example, availability status, and link.
- Avoid repeating generic “more efficient” copy.

### H08 — Use cases by business problem

- Use-case paths: understand revenue, prevent stock issues, monitor profit/cash, identify repeat customers, automate reporting.
- Each use case contains a real question the owner might ask.

### H09 — Industry selector

- Industry cards: Retail, F&B, Distributor, Reseller Online, Jasa, Manufaktur Kecil.
- Each card names one distinctive operational challenge.
- Link to dedicated industry page.

### H10 — How to start

- Step 1: create a business workspace.
- Step 2: add/import products and transactions.
- Step 3: view the first valid insight.
- Step 4: ask a question and inspect evidence.
- State prerequisites and realistic time-to-value without unsupported promises.

### H11 — Daily insight and weekly report

- Explain what the daily insight prioritizes.
- Explain what the weekly report summarizes.
- Show a sample notification/report preview.
- Clarify delivery channels that are actually available.

### H12 — Security and data trust

- Explain tenant separation, role permissions, read-only AI behavior, evidence/citations, and auditability at a high level.
- Do not claim certification not obtained.
- CTA: `Pelajari Keamanan RAMUNI`.

### H13 — Pricing preview

- Show plans only after pricing is approved.
- Before approval, use `Paket sedang divalidasi` and invite early access/demo.
- Link to `/harga`.

### H14 — FAQ

Minimum questions:

1. Apa itu RAMUNI?
2. Apakah RAMUNI menggantikan aplikasi kasir atau akuntansi?
3. Data apa yang dibutuhkan?
4. Bagaimana RAMUNI menghasilkan insight?
5. Apakah AI dapat mengubah data usaha?
6. Apakah RAMUNI cocok untuk usaha saya?
7. Bagaimana keamanan data dijaga?
8. Bagaimana cara mencoba RAMUNI?

### H15 — Final CTA

- Restate the outcome, not the feature list.
- Primary: `Coba Gratis` or `Daftar Early Access` according to launch status.
- Secondary: `Konsultasi via WhatsApp` only if the channel is staffed and consent-compliant.

## 9. Product hub `/produk`

**Goal:** Help visitors understand the product system and choose the module relevant to their problem.

Sections:

1. Hero: RAMUNI as one connected business companion, not eight disconnected tools.
2. Product system map: business records → calculations → insights → reports.
3. Intelligence modules: AI Assistant, Dashboard, Reports.
4. Operational modules: Sales, Inventory, Finance, Customers.
5. Integration layer with explicit availability statuses.
6. Shared capabilities: permissions, audit, import/export, evidence, notifications.
7. Choose-by-problem navigator.
8. Choose-by-role navigator.
9. Security note.
10. Product FAQ.
11. CTA to demo/trial.

## 10. Product detail page template

Applies to all `/produk/[slug]` pages.

Required section order:

1. Breadcrumb.
2. Outcome hero: who it helps, what outcome it supports, primary CTA, approved media.
3. Problem context: three concrete situations before using RAMUNI.
4. Example output: screenshot or sample result with explanation.
5. Benefit explanation: feature → meaning → business decision.
6. Workflow: input, calculation/process, output, user action.
7. Feature details: only available/approved capabilities.
8. Evidence, permissions, and safety behavior.
9. Role relevance: owner, manager, admin, cashier as applicable.
10. Industry examples.
11. Related modules.
12. FAQ.
13. Final CTA.

Product-specific content focus:

| Page | Primary question | Must explain | Must not imply |
|---|---|---|---|
| `/produk/asisten-ai` | “Apa yang bisa saya tanyakan tentang bisnis?” | Grounded answers, evidence, period, confidence, read-only behavior | Generic web answers or autonomous actions |
| `/produk/dashboard-bisnis` | “Apa yang perlu saya perhatikan hari ini?” | Prioritized insight, metrics, comparison, freshness | Perfect forecast or unexplained score |
| `/produk/katalog-produk` | “Bagaimana data produk dan harga disiapkan?” | P0 category, unit, product, SKU, price, HPP, minimum stock, archive; label barcode, variants, bundles, lots, serials, and price lists separately by availability | All advanced catalog functions are available together |
| `/produk/penjualan` | “Apa yang mendorong perubahan omzet?” | Transaction capture, product/category trends, payment status | Full enterprise POS unless implemented |
| `/produk/inventori` | “Stok mana yang perlu ditindaklanjuti?” | Movement ledger, current balance, minimum stock, adjustment history | Editable arbitrary stock number or procurement automation |
| `/produk/keuangan` | “Apakah usaha menghasilkan laba dan cash yang sehat?” | Expenses, revenue, profit definitions, cash summary | Tax/accounting advice or full double-entry suite unless implemented |
| `/produk/pelanggan` | “Siapa yang membeli dan kembali?” | Purchase history, repeat status, basic segments, privacy | Automated outreach without consent |
| `/produk/laporan-insight` | “Bagaimana saya menutup hari dan minggu?” | Daily insight, weekly report, period, export, notification status | Delivery channel not yet available |
| `/produk/integrasi` | “Dari mana data dapat masuk?” | Global availability label plus a separate direct/aggregator/import/manual integration method | Logo wall suggesting live integrations |

Every row above is a content target, not proof of current availability. The rendered page must query the capability-truth registry and suppress or relabel any section without current release evidence.

## 11. Solution hub `/solusi`

Sections:

1. Hero: choose a business problem, not a software module.
2. Pain-cluster overview.
3. Five solution cards with symptom, consequence, and desired outcome.
4. How RAMUNI combines modules for each solution.
5. Decision examples using synthetic data.
6. Industry cross-links.
7. FAQ about suitability and setup.
8. CTA to demo or trial.

## 12. Solution detail page template

Required section order:

1. Breadcrumb.
2. Problem-led hero and one CTA.
3. “Apakah ini terjadi di usaha Anda?” symptom checklist.
4. Business impact without exaggerated fear.
5. Why current manual methods fall short.
6. RAMUNI workflow combining relevant modules.
7. Example insight with synthetic data and evidence.
8. Recommended user action; human remains in control.
9. Relevant product modules.
10. Industry examples.
11. Implementation/onboarding expectations.
12. Objection-handling FAQ.
13. Final CTA.

Solution-specific focus:

| Page | Core symptoms | Modules | Content outcome |
|---|---|---|---|
| `/solusi/naikkan-omzet` | Revenue decline, weak products/days, lost sales | Sales, Dashboard, AI, Customers | Identify patterns and next investigation; no guaranteed increase |
| `/solusi/kelola-stok` | Stockouts, overstock, unexplained variance | Inventory, Sales, Reports | Prioritize restock and inspect movement evidence |
| `/solusi/pantau-laba-dan-arus-kas` | High revenue but unclear profit/cash | Finance, Sales, Dashboard | Understand definitions, costs, and period movement |
| `/solusi/pahami-pelanggan` | Low repeat rate, scattered history | Customers, Sales, AI | Identify repeat behavior and segments without unauthorized outreach |
| `/solusi/laporan-bisnis-otomatis` | Manual weekly recap, inconsistent numbers | Reports, Dashboard, Notifications | Produce consistent period summaries from the same metric contract |

## 13. Industry hub `/industri`

**Goal:** Help businesses self-select by operating model and understand that RAMUNI adapts examples and workflows without creating separate products.

Sections:

1. Hero: different industries face different data and operational rhythms.
2. Industry selector with one distinctive challenge per industry.
3. Comparison overview: transaction pattern, stock behavior, customer pattern, finance concern.
4. Common problems shared across industries.
5. Shared RAMUNI modules.
6. Industry guide and template collection.
7. Suitability FAQ.
8. CTA: `Pilih Industri Anda` or `Konsultasikan Kebutuhan`.

## 14. Industry detail page template

Required section order:

1. Breadcrumb.
2. Industry-specific outcome hero.
3. “Cocok untuk” and explicit current-fit boundaries.
4. Typical daily workflow.
5. Distinctive operational pains.
6. Data RAMUNI needs from this industry.
7. Modules supporting the workflow.
8. Example dashboard metrics and AI questions.
9. Synthetic scenario/day-in-the-life.
10. Role collaboration.
11. Import/template/onboarding requirements.
12. Security, privacy, or compliance note where relevant.
13. Verified customer story only when approved; hide component otherwise.
14. Related solution/product/resource links.
15. FAQ.
16. Demo/trial/WhatsApp CTA.

Industry-specific content focus:

The first sellable vertical remains a product-owner decision. Until approved, industry pages outside the chosen vertical must be educational, `Concept Preview`, or deferred; they cannot claim proven product fit, implementation support, customer results, or vertical-specific availability.

| Page | Must discuss | Example questions | Current-fit warning |
|---|---|---|---|
| `/industri/retail` | SKU variety, fast sales, stockout, cashier/owner roles | “Produk mana yang hampir habis tetapi tetap laris?” | Do not imply advanced multi-warehouse unless available |
| `/industri/fnb` | Menu items, ingredients/stock, sales time, waste context | “Menu apa yang turun minggu ini?” | Do not imply recipe-level costing if not implemented |
| `/industri/distributor` | Larger orders, product movement, repeat buyers, receivables context | “Pelanggan mana yang biasanya memesan ulang?” | Do not imply full supplier/PO/credit control until available |
| `/industri/reseller-online` | Channel records, product margin, repeat customers | “Produk mana yang menghasilkan margin terbaik?” | Do not claim live marketplace integration before release |
| `/industri/jasa` | Service revenue, expenses, customers, project/context limits | “Layanan mana yang paling konsisten menghasilkan pendapatan?” | Clarify RAMUNI is not a project-management suite |
| `/industri/manufaktur-kecil` | Finished goods, material awareness, expenses, production context | “Produk mana yang membutuhkan perhatian stok?” | Do not imply MRP/BOM/production planning unless implemented |

## 15. Role hub `/untuk`

Sections:

1. Hero: one source of business understanding for the whole team.
2. Role selector.
3. Responsibility-to-feature map.
4. Collaboration and permission flow.
5. Visibility differences between roles.
6. AI access and data boundaries.
7. Related industry/product links.
8. CTA.

## 16. Role detail page template

Required section order:

1. Breadcrumb.
2. Role-specific hero.
3. Daily responsibilities and decisions.
4. Common friction before RAMUNI.
5. First screen/dashboard priorities.
6. Primary workflows.
7. Permission table: view, create, edit, approve, export, billing.
8. Relevant alerts, reports, and AI questions.
9. Collaboration with other roles.
10. Success indicators the role monitors.
11. Relevant help articles.
12. FAQ.
13. CTA appropriate to role.

Role-specific direction:

| Page | Primary value | CTA rule |
|---|---|---|
| `/untuk/pemilik-usaha` | Business health, cross-module insight, team control, billing | Trial/demo allowed |
| `/untuk/admin-toko` | Accurate records, products, customers, transactions, expenses | Trial/demo or share with owner |
| `/untuk/kasir` | Fast, permitted sales workflow and clear recovery guidance | Do not push purchase; direct to help or owner |
| `/untuk/supervisor` | Operational monitoring, exceptions, reports without billing control | Demo or share with owner |

Deferred role routes, activated only after persona research and capability evidence: `/untuk/staf-gudang`, `/untuk/tim-keuangan`, `/untuk/marketing-crm`, `/untuk/manajer-operasional`, and `/untuk/akuntan`. Enterprise-only roles such as approver, enterprise admin, and developer partner remain help/manual personas until a commercial route has validated demand.

## 17. Pricing page `/harga`

**Primary goal:** Help visitors select a plan or request a qualified offer without hiding limits.  
**Primary CTA:** `Coba Gratis` or `Minta Penawaran`, depending on approved pricing state.

Sections:

1. Hero: explain how pricing aligns with business size and usage.
2. Billing frequency control only if annual/monthly billing is available.
3. Plan cards: audience, price, users, outlets, transactions, storage, AI quota, core capabilities, support, CTA.
   Each card resolves to an approved plan version, entitlement IDs, meter/quota definitions, effective date, capability evidence, and launch state. Starter/Growth/Pro/Enterprise names remain internal hypotheses until product owner approval.
4. Recommended-plan rationale; do not label a plan “Most Popular” without evidence.
5. Full feature comparison with accessible table behavior.
6. AI quota explanation and what happens when the limit is reached.
7. Limits: users, outlets, transactions, exports, storage, integrations.
8. Add-ons, overage, tax, payment method, invoice terms.
9. Trial, onboarding, migration, setup, and data-import expectations.
10. Upgrade, downgrade, cancellation, refund, and data-retention behavior.
11. Enterprise/partner qualification path.
12. Security and support summary.
13. Pricing FAQ.
14. Final CTA.
15. Visible pricing version/effective date.

Pricing states:

- If pricing is not approved, do not render price values or `Offer` schema.
- Use `Harga sedang divalidasi` with early-access/demo qualification.
- If only selected beta users receive pricing, clearly state eligibility and process.

## 18. Demo page `/demo`

**Primary goal:** Set expectations and collect a qualified demo request.  
**Primary CTA:** `Jadwalkan Demo`.

Sections:

1. Hero: who the demo is for and what decision it helps.
2. Demo agenda: duration, modules, sample data, Q&A.
3. Product preview: verified screenshots/video with sample-data label.
4. “What you will leave with”: clear understanding, fit assessment, next step; no guaranteed outcome.
5. Qualification form with minimum necessary fields.
6. Privacy and consent explanation.
7. Scheduling or response-time expectation that operations can meet.
8. Preparation checklist: industry, outlet count, current data source, main problem.
9. FAQ: cost, duration, recording, prerequisites, trial relationship.
10. Alternative CTA: trial or staffed WhatsApp channel.
11. Success state and `/terima-kasih/demo` noindex route.

## 19. Contact page `/kontak`

Sections:

1. Hero: choose the right contact path.
2. Intent cards: Sales/Demo, Product Support, Partnership, Privacy/Data Request, Security Report.
3. Dynamic form based on intent; collect only necessary information.
4. Operating hours and response expectation.
5. Official WhatsApp, email, and address only when active and approved.
6. Existing-customer support link to `/bantuan`.
7. Privacy/consent notice.
8. Contact FAQ.
9. Success/error state.

Contact rules:

- No PII in URL parameters, analytics, or pixels.
- Security and privacy reports must route to restricted destinations.
- Product support must not be mixed into an unowned sales inbox.

## 20. Security page `/keamanan`

Sections:

1. Trust-focused hero without unearned certifications.
2. Security principles.
3. Tenant/data isolation.
4. Encryption in transit and at rest only if implemented and verified.
5. Identity, sessions, MFA, and RBAC.
6. Approval, audit, and AI safety.
7. Backup, recovery, availability, and incident process.
8. Privacy, retention, export, and deletion.
9. Vendors/subprocessors link when published.
10. AI data-use disclosure: data minimization, provider/subprocessor, retention, training-use position, processing location/cross-border handling, deletion, and human-control boundary. Do not claim no-training, no-retention, Indonesian data residency, or contractual protection until provider/legal evidence exists.
11. Secure development and vulnerability reporting.
12. Compliance/certification status with exact current state.
13. Security FAQ.
14. Contact/trust CTA.

P1 child pages after operational evidence exists:

- `/keamanan/trust-center`
- `/keamanan/subprosesor`
- `/.well-known/security.txt`

## 21. About page `/tentang`

Sections:

1. Mission-led hero.
2. The decision problem experienced by Indonesian MSMEs.
3. RAMUNI point of view: companion, clarity, and human control.
4. Product principles: insight-first, deterministic calculation, evidence, approval before action.
5. Who RAMUNI serves and current boundaries.
6. How research, validation, and product development happen.
7. Team/founder section only with approved information and photos.
8. Milestones only when factual and date-stamped.
9. Careers/partnership links only when routes are active.
10. CTA to trial/demo/contact.

## 22. Status page `/status`

Sections:

1. Current overall status.
2. Component status: marketing site, app, API, background jobs, notifications, integrations as applicable.
3. Active incidents.
4. Scheduled maintenance.
5. Incident history.
6. Subscription to updates only when implemented.
7. Link to support and security contact.

The status page must use operational data or a verified status provider. Do not render a permanent static “All systems operational” claim.

## 23. Help center `/bantuan`

**Primary goal:** Help users complete a product task and reduce support friction. Marketing conversion is secondary.

Route contract:

| Route | Purpose | Indexing |
|---|---|---|
| `/bantuan` | Help center home with search, collections, popular articles, and support escalation | Index when public content is useful and crawlable |
| `/bantuan/[koleksi]` | Collection hub for a product area or user task family | Index when it has unique intro, meaningful article groups, and at least three public articles |
| `/bantuan/[koleksi]/[slug]` | Public task article | Index when complete, verified, and not internal SOP |
| `/bantuan/cari?q=` | Help search results | Always `noindex,follow`; excluded from sitemap |

Internal admin, support-only, billing operations, security incident, and account-recovery SOPs must not use public help routes.

Help home sections:

1. Search.
2. Getting Started shortcut.
3. Collections: Account & Recovery; Business Setup; Catalog & Pricing; Inventory; Sales; POS & Shift; Returns & Refunds; Outlet & Warehouse; Procurement & Supplier; Customers & CRM; Loyalty & Customer Campaigns; Dashboard; Reports & Notifications; AI Assistant; Finance & Period Close; Team, Roles & Approvals; Import & Export; Integrations & API; Omnichannel Orders; Offline & Devices; Subscription & Entitlements; Security & Privacy; Enterprise Admin; Troubleshooting.
4. Browse by role.
5. Popular and recently updated articles.
6. Active incident/status banner when needed.
7. Contact-support escalation.
8. Product version/release compatibility.
9. Feedback prompt.

Help collection page:

1. Breadcrumb.
2. Collection title and scope.
3. Recommended start article.
4. Article groups by task.
5. Role and permission labels.
6. Troubleshooting shortcut.
7. Related collection.
8. Support escalation.

Help article template:

1. Breadcrumb.
2. H1.
3. Product version and availability status.
4. Audience and use case.
5. Before you start.
6. Required permission/role.
7. Expected result.
8. Numbered steps.
9. Verified screenshot with date/version.
10. Example.
11. Important warnings.
12. Troubleshooting matrix.
13. Recovery/rollback where relevant.
14. Related prerequisite and next-step articles.
15. “Was this helpful?” feedback.
16. Last verified date.
17. Support escalation.

GA documentation gate: every newly available feature must ship with a quick start, full guide, permission table, troubleshooting, recovery/rollback, FAQ, support macro, release/version label, and a deep link from the product UI to the exact verified help revision. A collection stays unpublished or clearly marked future until these assets exist.

## 24. Blog information architecture

```text
/blog
├── /blog/[slug]
├── /blog/kategori/[slug]
├── /blog/tag/[slug]
├── /blog/penulis/[slug]
├── /blog/reviewer/[slug]
├── /blog/cari?q=
├── /blog/kebijakan-editorial
├── /blog/metodologi-fact-check
├── /blog/kebijakan-sumber
├── /blog/kebijakan-pembaruan
└── /blog/koreksi
```

Primary categories; one article has exactly one primary category:

1. Penjualan & Omzet.
2. Stok & Inventori.
3. Keuangan UMKM.
4. Pelanggan & CRM.
5. Operasional Bisnis.
6. AI untuk UMKM.
7. Strategi per Industri.
8. Panduan RAMUNI.

Tag rules:

- Maximum 3-5 approved tags per article.
- Do not create a tag for one isolated article.
- New tag requires a plan for at least three pieces of content.
- Merge synonyms and near-duplicates.
- Industry tags: Retail, F&B, Distributor, Reseller Online, Jasa, Manufaktur Kecil.
- Persona tags: Pemilik Usaha, Admin Toko, Kasir, Supervisor, Staf Keuangan, Staf Gudang.
- Level tags: Pemula, Menengah, Lanjutan.
- Format/topic tags: Template, Checklist, Studi Kasus, Kalkulator, HPP, Arus Kas, Stock Opname, Repeat Customer.

Product-capability editorial coverage matrix; these are controlled topic clusters, not automatically new indexable categories:

| Capability cluster | Existing primary category | Required content family | Release-truth rule |
|---|---|---|---|
| Catalog, SKU, pricing, barcode | Operasional Bisnis | Pillar, setup guide, glossary, template | Advanced catalog features carry their own availability labels |
| POS, payment, shift, receipt, refund | Penjualan & Omzet | Pillar, cashier guide, reconciliation checklist | Separate basic sales recording from verified Sellable-GA POS |
| Inventory, warehouse, transfer, stocktake | Stok & Inventori | Pillar, calculator, SOP guide | Multi-outlet, lot, serial, and offline claims require evidence |
| Procurement, supplier, purchase order | Stok & Inventori | Pillar, supplier template, PO guide | Educational content may precede the product; CTA cannot imply availability |
| Accounting, AR/AP, bank reconciliation | Keuangan UMKM | Pillar, glossary, worksheet, reviewed guide | Requires finance/accounting reviewer and legal disclaimer where needed |
| Omnichannel order and fulfillment | Operasional Bisnis | Architecture guide, channel checklist | Connector availability requires certification, pilot, reconciliation, and support evidence |
| CRM, loyalty, consent, retention | Pelanggan & CRM | Pillar, segmentation guide, consent checklist | Distinguish product customer campaign from RAMUNI acquisition campaign |
| Reports, forecast, anomaly | Operasional Bisnis | Metric guide, report examples | State metric version, freshness, and feature availability |
| Integrations, API, migration | Panduan RAMUNI | Setup guide, migration checklist, developer guide | Do not publish provider logos or API promises before verified |
| Offline operation and devices | Operasional Bisnis | Safety guide, recovery guide | List online-only actions and verified device scope |
| Security, privacy, continuity | Operasional Bisnis | Trust explainer, privacy guide, incident education | Claims require control evidence and last-verified date |
| AI recommendations and agents | AI untuk UMKM | Governance pillar, safe-use guide, decision checklist | Distinguish read-only AI, draft action, and approved execution by release |
| Product updates and release notes | Panduan RAMUNI | Changelog, release note, migration note | Every article states product version and availability date |

Editorial rollout baseline:

1. Weeks 1-4: fundamentals for revenue, stock, HPP/profit/cash flow, customer retention, and foundational templates.
2. Weeks 5-8: solution/industry content, safe AI education, POS/catalog/procurement basics, and verified product guides.
3. Weeks 9-12: refresh from Search Console and lead quality, publish decision-stage content, and expand only clusters with evidence and editorial capacity.
4. Initial target remains 24-30 high-quality articles; do not dilute this target by creating thin pages for every future capability.
5. A product-related article stores `capabilityIds`, `availabilitySnapshotId`, `availabilityAsOf`, and allowed CTA. Educational discussion of a future capability must explicitly say that it does not prove RAMUNI currently supports it.

## 25. Blog homepage `/blog`

**Goal:** Help visitors find practical business answers, establish editorial credibility, and connect educational intent to relevant resources or product pages.

Sections:

1. Optional breadcrumb consistent with visible design and schema.
2. Hero with a useful H1, short description, and search input.
3. Featured article selected by editor, not automatically the newest.
4. Eight category cards with descriptions and example questions.
5. Latest articles with stable URL pagination.
6. “Mulai dari masalah bisnis” paths: revenue, stock, profit, customers, reports, safe AI use.
7. Evergreen pillar guides.
8. Templates and calculators with output explained before CTA.
9. Content by industry linking to useful existing destinations.
10. RAMUNI product guides clearly labelled as product education.
11. Newsletter/lead magnet only when email operations, consent, and value cadence are ready.
12. Editorial trust block linking policies.
13. Contextual CTA appropriate to reader stage.

Featured article card fields:

- Image and alt text.
- Category.
- Title and dek.
- Author.
- Reviewer when applicable.
- Updated date.
- Reading time.
- CMS-controlled feature start/end time.

Blog home states:

- If featured content is unavailable, fall back to the latest approved pillar article.
- If a category has no published content, hide the card.
- Search error and zero-result states must suggest categories and guides.
- Infinite scroll can enhance, but cannot replace crawlable pagination.

## 26. Category page `/blog/kategori/[slug]`

Sections:

1. Breadcrumb.
2. H1 category name.
3. Unique 100-250 word editorial introduction covering audience, problem, and learning outcome.
4. Featured/pillar article.
5. Controlled subtopic chips.
6. Paginated article list.
7. “Mulai dari sini” beginner path.
8. Related template, calculator, guide, and glossary items.
9. Relevant product/solution CTA.
10. Visible category FAQ only if meaningful.
11. Related categories.

Category CMS fields:

- Name, slug, short description, full introduction.
- Hero icon/image and alt.
- SEO title/meta and OG image.
- Featured article and pillar article.
- Related categories.
- Default CTA mapping.
- Indexing state.
- Redirect target when merged.

Index if it has unique introduction and at least three quality articles. Empty/thin categories use `noindex,follow` and stay out of sitemap.

## 27. Tag page `/blog/tag/[slug]`

Sections:

1. Breadcrumb.
2. H1 and short unique tag definition.
3. Paginated article list.
4. Related tags and categories.
5. Relevant resource CTA.

Default is `noindex,follow`. A tag becomes indexable only after SEO approval when it has clear intent, unique description, at least five quality articles, and no overlap with category/industry/persona pages. Single-use and duplicate tags must be merged, archived, or redirected.

## 28. Article page `/blog/[slug]`

Required section order:

1. Breadcrumb: Home → Blog → Category → Article.
2. Category label.
3. One H1.
4. Dek explaining what the reader will understand or do.
5. Author block.
6. Reviewer block when required.
7. Published date, updated date, reading time, editorial status.
8. Featured image and alt.
9. Key takeaway/short answer in three to five points.
10. Table of contents generated from H2/H3.
11. Main content: definition/context, process/formula/framework, examples, table/checklist, common mistakes, actions.
12. Contextual inline CTA after value has been delivered.
13. Visible FAQ when useful.
14. Structured source/reference list.
15. Methodology/disclaimer for finance, legal, security, privacy, AI, and calculations.
16. Last-updated block with material change summary.
17. Short author/reviewer bio.
18. Related content: pillar/category, two to four sibling articles, one resource, one product/solution.
19. Usefulness feedback without PII free text by default.
20. Final CTA matched to intent.
21. Correction/editorial contact link.

Article rules:

- Statistics include source, year, population/context, and methodology when relevant.
- Formula content defines variables, units, assumptions, worked example, and limitations.
- Product screenshots carry verification date/version.
- Sensitive topics require an approved reviewer mapped to expertise.
- Finance content states it is educational and not individualized tax/accounting advice.
- AI content explains input limitations, evidence, uncertainty, and human review.
- `FAQPage` and `HowTo` schema may only represent visible qualifying content.
- `BlogPosting` includes headline, image, datePublished, dateModified, author, publisher, and mainEntityOfPage.

## 29. Author profile `/blog/penulis/[slug]`

Sections:

1. Breadcrumb.
2. Approved profile photo and alt.
3. Full name and role.
4. Short expertise summary.
5. Full bio.
6. Topics written.
7. Verifiable experience/credentials.
8. Approved professional links.
9. Relationship/disclosure with RAMUNI.
10. Paginated article list.
11. Editorial-policy link.

Author CMS fields:

- Full name and unique slug.
- Photo reference and alt.
- Job title and organization/team.
- Short and full bio.
- Expertise taxonomy.
- Credentials/qualifications with verification reference.
- Professional URLs.
- Employment/relationship disclosure.
- Languages.
- Active/inactive/former contributor state.
- SEO title/meta and OG image.
- Public `Person` schema fields.
- Article count calculated by system.

Index only when the profile is substantive and has at least two to three articles. Empty/dummy/one-article profiles default to noindex. Former contributors remain attributed; do not silently move bylines.

## 30. Reviewer profile `/blog/reviewer/[slug]`

Reviewer means subject-matter validation, not only language editing.

Sections:

1. Breadcrumb.
2. Name, photo, and role.
3. Review areas: finance, inventory, AI, security, privacy, product.
4. Bio and relevant experience.
5. Verifiable credentials.
6. Reviewer responsibilities.
7. Relationship/conflict disclosure.
8. Reviewed article list.
9. Fact-check methodology link.

Reviewer CMS fields:

- Identity and public profile fields.
- Review expertise taxonomy.
- Credential type, issuer, reference URL, expiry where applicable.
- Allowed categories/content types.
- Conflict-of-interest disclosure.
- Active/inactive state.
- Internal review notes.
- Per-article review status and timestamp.
- Reviewed revision ID.

Do not render “expert reviewed” unless a real reviewer approved the exact published revision. Material edits invalidate the review until re-approved.

## 31. Editorial trust pages

### `/blog/kebijakan-editorial`

Sections:

1. Editorial purpose and audience.
2. Accuracy, clarity, independence, and usefulness principles.
3. Topic selection.
4. Roles: writer, editor, SEO reviewer, subject-matter reviewer, product/legal reviewer.
5. Draft-to-publish workflow.
6. AI-assisted writing policy: human accountability, source verification, no secrets/PII, no AI-generated citations without original-source review.
7. Conflict of interest and commercial influence.
8. Product/customer claim rules.
9. Sponsored/partner content labelling.
10. Correction and complaint process.
11. Editorial contact.

### `/blog/metodologi-fact-check`

Sections:

1. Claims requiring verification.
2. Source hierarchy.
3. Original-source checking process.
4. Formula/example validation.
5. Sensitive-topic review process.
6. Screenshot/version verification.
7. Changed or unavailable source handling.
8. Pre-publication fact-check checklist.
9. Meaning of `Ditinjau`.
10. Information limitations.

### `/blog/kebijakan-sumber`

Source priority:

1. Regulation, government, and official standards.
2. Official product/platform documentation.
3. Primary data and trusted institution publications.
4. Relevant research/journals.
5. Industry reports with visible methodology.
6. Credible media for context.
7. Third-party blogs only as supporting material.

Store source title, publisher, author, URL, published/updated date, access date, source type, supported claim, internal verification note, and active/broken status.

### `/blog/kebijakan-pembaruan`

Sections:

1. Update triggers.
2. Review cadence: 3-6 months for finance/security/privacy/AI/product; 6-12 months for evergreen fundamentals.
3. Minor versus material update.
4. Rules for changing `dateModified`.
5. Visible material-change log.
6. Re-review requirement.
7. Archive/consolidate/redirect process.
8. Owner and internal update SLA.

### `/blog/koreksi`

Sections:

1. How to report an error.
2. Minimum useful information.
3. Acknowledgement expectation.
4. Investigation process.
5. Correction types: typo, clarification, factual correction, material revision, withdrawal.
6. How corrections are displayed.
7. Secure contact form/email.

All editorial trust pages are indexable, included in the pages sitemap, and linked from blog/article footer.

## 32. Blog search `/blog/cari?q=`

Interface:

1. Search box.
2. Sanitized query display.
3. Result count.
4. Filters: category, content type, industry, level.
5. Sort: relevance or newest.
6. Suggested queries.
7. Zero-result state with categories and popular guides.
8. Crawlable pagination links as progressive enhancement.
9. Clear filters.

Technical rules:

- `noindex,follow`; excluded from sitemap.
- Escape query output; rate-limit requests.
- Do not expose drafts or internal manuals.
- Do not create crawlable parameter combinations.
- Avoid storing raw queries that may contain PII; normalize or classify only under approved privacy policy.
- Search title, dek, headings, category, tags, author, and glossary terms.

## 33. Resource center architecture

```text
/sumber-daya
├── /panduan
│   └── /panduan/[slug]
├── /template
│   └── /template/[slug]
├── /kalkulator
│   ├── /kalkulator/laba-usaha
│   ├── /kalkulator/hpp
│   └── /kalkulator/reorder-stok
└── /kamus-bisnis
    └── /kamus-bisnis/[slug]
```

`/sumber-daya` sections:

1. Hero and resource search/selector.
2. Choose-by-goal: learn, calculate, download, understand a term.
3. Featured guides.
4. Popular templates.
5. Calculators.
6. Glossary A-Z.
7. Resources by business problem.
8. Resources by industry.
9. New/updated resources.
10. Product connection and CTA.

## 34. Guide page `/panduan/[slug]`

Sections:

1. Breadcrumb.
2. H1 and practical outcome.
3. Audience and when to use.
4. Prerequisites.
5. Quick answer.
6. TOC.
7. Step-by-step guidance.
8. Worked example.
9. Checklist.
10. Common mistakes.
11. Related template/calculator/glossary.
12. Product connection.
13. Author/reviewer/sources/update.
14. FAQ.
15. CTA.

Use `HowTo` schema only when the visible content meets step requirements.

## 35. Template page `/template/[slug]`

Sections:

1. Hero: template name and resulting output.
2. Preview/screenshot.
3. Intended user and situation.
4. Included sheets/fields/sections.
5. How to use.
6. File format and compatibility.
7. Completed sample.
8. Download/copy CTA.
9. Gated/ungated disclosure.
10. Privacy/consent if gated.
11. Version and updated date.
12. Related guide/calculator/product.
13. FAQ.

CMS fields include file asset, version, format, file size, gated flag, form mapping, usage terms, preview asset, and internal download count. Fire download conversion only after a valid file response or confirmed delivery.

## 36. Calculator page `/kalkulator/[slug]`

Sections:

1. H1 and decision supported.
2. Definition and when to use.
3. Input form with units, validation, and tooltips.
4. Calculate/reset actions.
5. Result.
6. Result interpretation.
7. Visible formula.
8. Worked example.
9. Assumptions and limitations.
10. Disclaimer.
11. Save/download/share only when privacy-safe.
12. Related glossary/guide/template.
13. Product CTA.
14. Sources/reviewer/update.
15. FAQ.

Calculator rules:

- Explanatory content renders server-side.
- Never send financial inputs/results to analytics.
- Track only calculator type and successful use.
- Formula has unit tests and subject-matter review.
- Saved results require separate authenticated privacy design.

## 37. Glossary page `/kamus-bisnis/[slug]`

Sections:

1. Term H1.
2. One-sentence definition.
3. Plain-language explanation.
4. Why the term matters.
5. Formula/components where relevant.
6. Example.
7. Related terms.
8. Related guide/calculator/article.
9. Sources, author/reviewer, updated date.
10. FAQ only when useful.

Thin definitions without unique value must remain noindex or be consolidated into a glossary hub.

## 38. Integration hub and detail pages

Canonical route decision: RAMUNI uses `/produk/integrasi` for the integration hub and `/produk/integrasi/[slug]` for detail pages because integrations are part of the product family. If older references or campaigns use `/integrasi/[slug]`, implement a 301 redirect to `/produk/integrasi/[slug]` after the destination page exists. Do not maintain both as indexable routes.

### Integration hub `/produk/integrasi`

Sections:

1. Hero explaining how data can enter RAMUNI.
2. Availability legend uses the global enum: Available, Private Beta, Coming Soon, Concept Preview, Unavailable.
3. Integration method is separate: direct, certified aggregator, import alternative, manual-assisted, or disabled.
4. Search/filter by category only after enough integrations exist.
5. Available integrations with verified setup links.
6. CSV import as a first-class fallback.
7. Planned integrations clearly separated from available items.
8. Data sync, permissions, freshness, and failure behavior.
9. Security/privacy note.
10. Integration request form.
11. FAQ.

### Integration detail `/produk/integrasi/[slug]`

Sections:

1. Breadcrumb and status.
2. Integration outcome hero.
3. Supported data and direction of sync.
4. Prerequisites and account requirements.
5. Setup steps.
6. Sync schedule/freshness.
7. Mapping, duplicate, and conflict behavior.
8. Permissions and security.
9. Known limitations.
10. Troubleshooting and support.
11. Related product/help pages.
12. CTA to connect/request access.

Do not publish a detail page as indexable unless the integration has a truthful status, substantial unique content, and an owner.

## 39. Customer story page P1 `/cerita-pelanggan/[slug]`

Publish only with written permission and verified facts.

Sections:

1. Breadcrumb.
2. Customer context: industry, size range, operating challenge.
3. Challenge in the customer's own approved words.
4. Previous workflow.
5. RAMUNI setup and modules used.
6. Implementation timeline.
7. Verified results with methodology, period, and baseline.
8. Customer quote with named attribution and approval.
9. What did not change or current limitations.
10. Related product/solution/industry pages.
11. CTA.

No anonymous fabricated story, composite customer, or unsourced result may be represented as a real case study.

## 40. Paid landing page system

Campaign landing pages use dedicated templates and CMS records, not ad-hoc hardcoded duplicates.

### 40.1 Campaign landing page global shell

Header:

- RAMUNI logo linked to the same landing page or homepage according to campaign test.
- Optional text link: `Masuk` for existing users.
- Optional trust link: `Keamanan`.
- No full mega-menu by default.

Footer:

- Privacy.
- Terms.
- Cookie settings.
- Contact.
- Copyright.
- No large resource navigation by default.

Every landing page requires:

- Campaign/offer ID.
- Audience and traffic source.
- Message-match headline.
- One primary conversion.
- One approved secondary recovery action at most.
- Analytics IDs per section.
- UTM and click-ID persistence.
- Consent behavior.
- Success/thank-you state.
- Index/noindex and canonical decision.
- Active date range and fallback redirect.

### 40.2 Early-access landing `/early-access` or `/lp/early-access`

Canonical route decision: use `/early-access` as the evergreen public early-access page if the program is open beyond one campaign. Use `/lp/early-access` only as a temporary campaign-specific variant. When both exist, `/early-access` is the canonical route and `/lp/early-access` is `noindex,follow` unless SEO approves a unique durable page. If the campaign ends and no evergreen program remains, redirect or archive the temporary variant according to Section 42.

**Audience:** Cold social visitors, founder/community referrals, broad pre-launch interest.  
**Primary conversion:** Join early access.

Sections:

1. Campaign-matched hero: who RAMUNI is for and what early access means.
2. One-sentence problem recognition.
3. Three outcomes: understand business condition, see reasons, know next check/action.
4. Sample insight visual labelled as synthetic.
5. How RAMUNI works in four steps.
6. Who fits early access: industry, role, readiness to input/import data.
7. What beta participants receive.
8. What RAMUNI expects: feedback, data setup, product limitations.
9. Trust and privacy summary.
10. Early-access form.
11. FAQ: cost, timing, eligibility, data, contact.
12. Final CTA.

Do not promise acceptance or launch date unless operationally committed.

### 40.3 Google Search high-intent landing `/lp/ai-bisnis-umkm`

**Traffic:** Search queries around AI for business/MSMEs.  
**Primary conversion:** Request demo or join beta.

Sections:

1. H1 mirrors the search promise without keyword stuffing.
2. Direct category definition: what AI business companion means.
3. Problems it helps investigate.
4. What data it reads.
5. Example questions and evidence-backed answers.
6. What RAMUNI cannot/do not do.
7. Product workflow.
8. Security and human-control proof.
9. Fit by industry/role.
10. Demo/lead form.
11. FAQ derived from search intent.
12. Final CTA.

If this page has durable unique search value, SEO may approve indexability. If it only duplicates `/produk/asisten-ai`, keep it noindex and use the product page as canonical or redirect ads to the product page.

### 40.4 Google problem-intent landing `/lp/kelola-stok-usaha`

**Traffic:** High-intent searches related to stock management, stockout, reorder, and stock opname.  
**Primary conversion:** Demo/trial.  
**Alternative:** Calculator or template if visitor is not ready.

Sections:

1. Message-matched stock problem hero.
2. Symptom checklist.
3. Cost of manual guessing without inflated statistics.
4. RAMUNI workflow: movement → balance → minimum stock → insight.
5. Sample stock insight.
6. Relevant feature proof and limitation.
7. Industry examples.
8. Setup/data requirements.
9. Calculator/template recovery offer.
10. Lead form.
11. FAQ.
12. Final CTA.

Use `/solusi/kelola-stok` for ads when its message and CTA match; avoid thin duplicate landing pages.

### 40.5 Meta/Instagram pain-led landing `/lp/[segment]-[pain]`

**Traffic:** Meta/Instagram creative targeting a recognizable identity and pain.  
**Example slug:** `/lp/retail-stok-menipis`.

Sections:

1. Exact creative promise repeated in hero.
2. Identity confirmation: “Untuk pemilik retail yang sering kehabisan stok produk laris.”
3. Three familiar scenarios from the ad.
4. Short product mechanism; avoid technical detail first.
5. Visual before/after decision state, not fabricated financial result.
6. Sample insight.
7. How to start.
8. Trust/privacy/human-control block.
9. Form with only minimum fields.
10. FAQ focused on fit, effort, cost/status, and data.
11. Final CTA.

Default is noindex. Create one variant only when creative/message materially differs; do not generate dozens of thin segment pages.

### 40.6 Demo campaign landing `/lp/demo-ramuni`

Sections:

1. Campaign-matched demo hero.
2. What the demo covers.
3. Who benefits.
4. Sample screens.
5. Agenda and duration.
6. Qualification form.
7. Privacy/consent.
8. Scheduling expectation.
9. FAQ.
10. Final CTA.

Use `/demo` instead if no campaign-specific message or form variant is required.

### 40.7 Lead-magnet landing `/lp/[asset-slug]`

Sections:

1. Asset outcome hero.
2. Preview.
3. What is included.
4. Intended user and use case.
5. How the asset helps without product dependency.
6. Form and explicit email-marketing consent choice.
7. Delivery expectation.
8. Related RAMUNI connection.
9. FAQ and usage rights.

The asset must exist and be deliverable before campaign launch. Conversion fires after successful server acceptance and confirmed download/delivery path.

### 40.8 Retargeting/objection landing `/lp/[offer]-untuk-[objection]`

Use only for a meaningful alternative offer or objection, not to repeat the same page harder.

Sections:

1. Acknowledge the specific concern.
2. Clarify who RAMUNI fits and does not fit.
3. Process transparency.
4. Evidence or product proof that directly addresses the concern.
5. Risk/friction reducer: demo, calculator, template, or consultation.
6. FAQ focused on the objection.
7. One CTA.

Default is noindex and time-bounded.

## 41. Thank-you and post-conversion pages

Routes:

- `/terima-kasih` as a generic fallback only when a typed success route cannot be used
- `/terima-kasih/early-access`
- `/terima-kasih/demo`
- `/terima-kasih/kontak`
- `/terima-kasih/template`

Successful account signup does not use `/terima-kasih/daftar`; the product-owned `/daftar` flow continues into verified onboarding. If operations later require an intermediate signup confirmation, it remains product-owned, noindex, idempotent, and must not duplicate account or conversion creation.

Sections:

1. Confirmation that the server received the request.
2. What happens next and realistic timing.
3. Confirmation/delivery troubleshooting.
4. One next-step resource or social channel.
5. Contact route if the expected next step fails.

Rules:

- `noindex,follow`; excluded from sitemap.
- Never include submitted PII in URL or rendered page source.
- Conversion event fires once using a server-confirmed transaction/lead state and deduplication key.
- Refreshing the page must not create another lead or conversion.

## 42. Campaign landing page index and canonical rules

| Landing type | Default robots | Canonical rule |
|---|---|---|
| Evergreen early access with unique content | Index only after SEO approval | Self-canonical |
| Temporary campaign variant | noindex,follow | Self-canonical or campaign SEO decision |
| Thin duplicate of product/solution page | noindex,follow | Prefer redirecting traffic to source page; canonical alone is not a content strategy |
| Search landing with durable unique intent | index,follow after review | Self-canonical |
| Meta identity/pain variant | noindex,follow | Self-canonical |
| Retargeting objection page | noindex,follow | Self-canonical |
| Thank-you page | noindex,follow | Self-canonical; excluded sitemap |
| Expired campaign with equivalent page | 301 | Redirect to nearest relevant evergreen page |
| Expired campaign without replacement | 410 or retained explanatory page | SEO review required |

## 43. Campaign CRO and tracking acceptance

- Hero identifies audience, outcome, and next action within five seconds.
- Ad headline and landing H1 express the same promise.
- One primary CTA is visible above the fold and repeated after proof/objections.
- No full navigation unless test hypothesis explicitly requires it.
- Form asks only fields required for qualification/delivery.
- CTA clicks, form start, form errors, successful lead, and thank-you view use stable analytics IDs.
- Conversion is based on successful server storage, not button click.
- UTM, gclid/gbraid/wbraid, fbclid, referrer, landing page, and first/last touch are saved.
- Consent state controls GA4, Google Ads, Meta Pixel, and CAPI.
- No PII enters analytics or pixels.
- Mobile load target is under three seconds; CWV targets still apply.
- Campaign variants have start/end dates and an owner.
- Campaign page cannot publish without a fallback route after expiry.

## 44. CMS page and content models

### 44.1 Page record

Required fields:

- Internal name.
- Public title/H1.
- Slug and full path.
- Page type/template.
- Parent page.
- Delivery priority: P0/P1/P2/P3/P4.
- Release horizon: R0/R1/R2/R3/R4/R5 or `TBD`.
- Surface owner and implementation owner; product-owned auth/app routes must not be reimplemented in the marketing runtime.
- Audience.
- Primary job-to-be-done.
- Primary CTA and secondary CTA.
- Traffic intent: organic, direct, referral, paid, product help.
- Indexing state.
- Canonical override.
- Sitemap inclusion and priority group.
- SEO title/meta.
- OG/Twitter image.
- Schema types/flags.
- Header variant and footer variant.
- Sections as structured component references.
- Related pages/resources.
- Availability status.
- Capability IDs, backlog/story IDs, commercial edition, release evidence ID, verified environment, and last-verified release.
- Claim/evidence approval state.
- Published, updated, and review-due dates.
- Owner and approvers.
- Revision, redirect, and audit history.

### 44.2 Section record

Required fields:

- Stable section ID.
- Component type.
- Purpose/internal note.
- Eyebrow, heading, body, bullets.
- Primary/secondary CTA.
- Media and alt.
- Proof/source references.
- Availability/status label.
- Theme token.
- Analytics location ID.
- Visibility conditions.
- Required/optional flag by template.

### 44.3 Article record

Required fields:

- Internal title and public H1.
- Slug.
- Dek/excerpt.
- Structured body.
- Primary category.
- Zero to five approved tags.
- Content type.
- Search intent and funnel stage.
- Target persona/industry.
- Primary keyword and secondary topics, internal only.
- Author entity.
- Reviewer entity/entities.
- Editor internal.
- Featured image/alt and social image.
- Published, updated, last-reviewed, and next-review dates.
- Reading time calculated.
- Structured source list.
- Disclaimer type.
- Related content override.
- CTA mapping.
- SEO title/meta, canonical, robots, schema.
- Featured/pinned state with date range.
- Workflow status and revision ID.
- Material change summary.
- Redirect history.
- Product/version references.
- Capability IDs, availability snapshot ID, availability-as-of date, required release gate, claim owner, and revalidation trigger.
- Claim/evidence status.
- Product/legal review flags.

### 44.4 Author entity

- Full name and unique slug.
- Photo and alt.
- Job title and organization/team.
- Short/full bio.
- Expertise taxonomy.
- Credentials with verification reference.
- Professional URLs.
- Relationship disclosure.
- Languages.
- Active/inactive/former contributor status.
- Public schema fields.
- SEO metadata.
- Private contact excluded from public API.

### 44.5 Reviewer entity and review record

Reviewer entity:

- Identity/profile fields.
- Expertise and allowed categories.
- Credentials, issuer, reference, expiry.
- Conflict disclosure.
- Active/inactive state.

Review record:

- Article/content ID.
- Revision ID reviewed.
- Reviewer ID.
- Review scope.
- Status.
- Review timestamp.
- Internal notes.
- Required re-review trigger.

### 44.6 Structured source entity

- Source title.
- Publisher.
- Author.
- URL.
- Published/updated date.
- Access date.
- Source type.
- Claim supported.
- Verification note.
- Active/broken status.

### 44.7 Product capability and public-claim registry

This registry is mandatory and fail-closed. A missing, expired, unapproved, or environment-mismatched record hides the public feature claim instead of guessing availability.

Required fields:

- Stable `capabilityId`, public label, internal description, and product owner.
- SRS requirement IDs, backlog/story IDs, delivery priority P0-P4, and release horizon R0-R5.
- Commercial edition and entitlement/plan-version references only after packaging approval.
- Availability: `Available`, `Private Beta`, `Coming Soon`, `Concept Preview`, or `Unavailable`.
- Integration method where relevant: direct, certified aggregator, import alternative, manual-assisted, or disabled; this is not an availability enum.
- Verified environment, release/version/SHA, evidence URL or artifact ID, test/acceptance reference, limitation, prerequisite, and region.
- Approved public wording, prohibited wording, screenshot/media version, owner, approvers, verified date, expiry/review date.
- Linked product pages, pricing rows, navigation cards, help articles, blog articles, customer stories, campaign landing pages, and schema records.
- Revalidation triggers for release, pricing, entitlement, integration, legal, security, screenshot, or wording changes.

Security and AI claims use the same pattern through a trust-claim record containing control owner, evidence, verified environment, public wording, last verified date, expiry, subprocessor/data-use review, and legal/security approval.

### 44.8 Remaining CMS entity matrix

| Entity | Required relationships and purpose |
|---|---|
| Product/Feature | Capability registry, release, evidence, plan, prerequisite, media, product/help links |
| Solution/Industry/Role | Audience problem, supported capability IDs, evidence, related content, CTA resolver |
| Pricing/Plan | Plan version, effective date, entitlement IDs, quota/limits, tax/payment state, approval |
| Integration | Capability, provider, integration method, certification/pilot/reconciliation gates, sync/support owner |
| Category/Tag | Taxonomy purpose, description, owner, indexability threshold, merge/redirect history |
| Customer Story | Written permission, fact/evidence records, methodology, review date, related capabilities |
| FAQ | Visible question/answer, page placements, source, availability dependency, review date |
| Guide/Template/Calculator/Glossary | Asset or formula version, reviewer, delivery state, related capability/content |
| Product Update/Changelog | Release version/date, affected capabilities, migration/limitation, help links |
| Media | Asset type, dimensions, alt, source/rights, release version, approval, responsive variants |
| Form/Lead | Field schema, purpose, consent version, server destination, attribution, retention, owner |
| CTA Variant | Launch state, label, destination, eligible pages, experiment, analytics ID, expiry |
| Navigation | Menu group/order, route, availability rule, desktop/mobile labels, effective dates |
| Redirect | Source, destination/status, reason, owner, start/end, chain validation |
| Settings/Legal/Consent | Version, locale, approvers, effective date, public route, re-consent rule |

## 45. Editorial workflow

```text
Draft
→ Content Review
→ Fact Check
→ SEO Review
→ Subject-Matter Review when required
→ Product/Legal Review when required
→ Approved
→ Scheduled/Published
→ Monitoring
→ Updated/Re-reviewed
→ Consolidated/Archived
```

Workflow rules:

- Writer cannot self-approve sensitive content.
- Reviewer approval is tied to revision ID.
- Material edits invalidate the previous review.
- Publish is blocked when required author, sources, reviewer, alt, CTA, SEO metadata, disclaimer, or review due date is missing.
- CMS provides freshness queue and overdue review view.
- Overdue content is escalated; it is not silently removed.
- Byline, reviewer, dates, sources, canonical, robots, and redirect changes are audited.

## 46. Index/noindex matrix

| Page type | Default |
|---|---|
| Homepage/product/solution/industry/role/pricing/demo with unique approved content | index,follow |
| Temporary campaign landing | noindex,follow |
| Evergreen campaign/search landing approved by SEO | index,follow |
| Thank-you/system state page | noindex,follow; excluded sitemap |
| Login/signup/account | noindex,follow; excluded sitemap |
| Blog home | index,follow |
| Unique published article | index,follow |
| Category with unique intro and at least three quality articles | index,follow |
| Empty/thin category | noindex,follow |
| Tag | noindex,follow by default |
| Approved strategic tag with at least five quality articles | index,follow |
| Substantive author/reviewer profile | index,follow |
| Empty/internal author/reviewer | noindex or no public route |
| Editorial trust policies | index,follow |
| Blog/help internal search | noindex,follow |
| Filter/sort/query combinations | noindex,follow |
| Guide/template/calculator/glossary with unique value | index,follow |
| Thin glossary/resource | noindex or consolidate |
| Public help article | index,follow |
| Internal support/admin SOP | authenticated, noindex, never sitemap |
| Draft/preview/staging | authenticated/tokenized, noindex, excluded sitemap |
| Archived with equivalent replacement | 301 |
| Removed without replacement | 410 or reviewed retained page |

Pagination uses stable URLs and self-canonical pages. Do not canonical page 2+ to page 1 when page 2 contains a distinct crawlable collection.

## 47. Internal linking contract

### Commercial pages

- Product detail links to pricing/demo, at least one solution, one industry or role, one educational resource, and one help article.
- Solution detail links to supporting modules, industries, and related calculator/template/article.
- Industry detail links to relevant solutions, roles, product modules, and industry resources.
- Role detail links to product workflows and relevant help articles.
- Pricing links to security, demo, and plan-specific FAQ anchors.

### Editorial pages

- Article links to its primary category/pillar.
- Article includes two to four contextual sibling links.
- Terms needing explanation link to glossary.
- Article links to one relevant guide/template/calculator when useful.
- Product/solution link appears only when it genuinely solves the discussed problem.
- Related cards do not replace contextual body links.
- Every spoke links back to its pillar; each pillar links to important spokes.

### Resource/help pages

- Guide links to template/calculator/glossary used in the workflow.
- Template and calculator link to the guide explaining correct use.
- Glossary links upward to guides and sideways to related terms.
- Help article links to prerequisites, next step, troubleshooting, and exact product route.

All anchors are descriptive. Do not repeatedly force exact-match keywords. Broken-link checks run before publish and on a scheduled crawl. When content is merged or deleted, update inbound links in addition to creating redirects.

## 48. CTA and analytics location contract

Stable `cta_location` examples:

- `homepage_hero`
- `homepage_ai_demo`
- `homepage_pricing_preview`
- `homepage_final_cta`
- `product_hero`
- `product_example_output`
- `product_final_cta`
- `solution_workflow`
- `industry_setup`
- `pricing_plan_card`
- `pricing_final_cta`
- `article_inline_cta`
- `article_final_cta`
- `calculator_result_cta`
- `lp_hero`
- `lp_form`
- `lp_final_cta`

Visible CTA copy may change through CMS/A-B tests; analytics location IDs remain stable. Form conversion events fire only after successful server acceptance.

## 49. Content states and fallback behavior

Every template must define:

- Loading state for dynamic components.
- Empty state when optional content is unavailable.
- Error state for API/search/form failures.
- Unavailable feature/integration state.
- Expired campaign state and redirect.
- Missing featured article fallback.
- Missing image fallback that preserves layout and accessibility.
- Draft/scheduled/archived exclusion.

Never show an empty testimonials, integrations, pricing, or customer-story section. Hide the section or show an honest approved status explanation.

## 50. Developer acceptance checklist

### Navigation and architecture

- [ ] Desktop and mobile nav use one route source.
- [ ] Mega-menu has keyboard, focus, Escape, and ARIA behavior.
- [ ] All published pages appear in correct navigation/footer/context.
- [ ] Important pages are reachable within three clicks.
- [ ] No orphan pages.
- [ ] Breadcrumb hierarchy matches visible URL hierarchy.

### Page sections

- [ ] Each template implements every required section in this brief.
- [ ] Each section has stable section and analytics IDs.
- [ ] Required content cannot be accidentally removed through CMS.
- [ ] Optional unavailable content has defined fallback/hide behavior.
- [ ] Claims and status labels follow approval state.
- [ ] Every public product/security/integration claim resolves to capability or trust evidence with owner and last-verified release.
- [ ] P0-P4 priority and R0-R5 horizon never automatically map to public availability.
- [ ] Mixed-availability pages label each feature group independently.
- [ ] Screenshot and sample UI match the release/version being claimed.
- [ ] Unresolved product-owner decisions block route activation, CTA, schema, pricing, and paid campaign launch.
- [ ] Coming Soon, Concept Preview, and Unavailable content cannot use misleading purchase/open-trial CTAs.

### Blog/editorial

- [ ] Blog home, category, tag, article, author, reviewer, search, and policy pages exist according to priority.
- [ ] Author and reviewer are reusable entities, not free text.
- [ ] Review approval is revision-bound.
- [ ] Source records are structured.
- [ ] Category/tag indexability follows thresholds.
- [ ] Article templates support sources, disclaimers, update logs, feedback, and related content.
- [ ] Feature-related articles store availability snapshot/version and trigger re-review when capability status changes.
- [ ] Every newly available feature has versioned quick start, full guide, permission table, troubleshooting, rollback/recovery, FAQ, and support macro.

### SEO and campaigns

- [ ] SEO pages and paid landing pages use separate template decisions.
- [ ] Campaign landing pages have audience, promise, offer, conversion, start/end, owner, canonical, and robots fields.
- [ ] Temporary campaign variants default to noindex.
- [ ] Message match and one-primary-CTA rules pass.
- [ ] Thank-you pages are noindex and idempotent.
- [ ] No thin indexed duplicates are generated.

### Forms, privacy, and measurement

- [ ] Consent controls all non-essential tags.
- [ ] PII never enters URLs, analytics, pixels, or client logs.
- [ ] UTM and click IDs persist to the server lead record.
- [ ] Conversion fires after successful server acceptance.
- [ ] Refresh does not duplicate leads or conversions.
- [ ] Calculator financial inputs/results are not tracked.

### Accessibility and content QA

- [ ] One H1 per page.
- [ ] Logical heading hierarchy.
- [ ] All images have factual alt or are correctly decorative.
- [ ] Forms have labels, errors, instructions, and keyboard support.
- [ ] Tables work on mobile and expose headers to assistive technology.
- [ ] Search/filter/pagination works without infinite scroll dependency.
- [ ] Links are descriptive.
- [ ] No placeholder, fabricated proof, or unavailable feature claim remains.

## 51. Required URL map columns

Developer must deliver `docs/url-map.csv` with:

1. URL.
2. Page name.
3. Page type/template.
4. Parent.
5. Header location.
6. Footer location.
7. Breadcrumb.
8. Delivery priority P0-P4.
9. Release horizon R0-R5.
10. Commercial edition or `Unapproved`.
11. Capability/backlog IDs and release evidence ID.
12. Availability, evidence owner, verified environment, and last-verified release/date.
13. Surface owner and implementation owner.
14. Audience.
15. Search/campaign intent.
16. Primary CTA.
17. Header/footer variant.
18. Indexability.
19. Canonical rule.
20. Sitemap group.
21. Schema types.
22. CMS owner.
23. Product/legal reviewer requirement.
24. Analytics page type.
25. Status, dependency, and unresolved-decision blockers.

## 52. Legal and consent pages

### Privacy policy `/privasi`

Required content:

1. Data controller/company identity.
2. Data categories collected from website, forms, account, product, support, analytics, and advertising.
3. Purpose and legal basis/consent basis as applicable.
4. Data sources.
5. Service providers/subprocessors.
6. Cross-border handling if applicable.
7. Retention periods or criteria.
8. Security summary.
9. User rights: access, correction, export, deletion, withdrawal/objection as applicable.
10. Cookie/tracking relationship.
11. Children/minimum age position.
12. Contact and request process.
13. Effective date and change history.

### Terms `/syarat-penggunaan`

Required content:

1. Service scope and eligibility.
2. Account responsibilities.
3. Acceptable use.
4. Data ownership and permission.
5. AI output limitations and human responsibility.
6. Beta/preview feature terms.
7. Payment, cancellation, and refund only when applicable.
8. Intellectual property.
9. Suspension/termination.
10. Warranty/liability language approved by legal.
11. Governing law/dispute process.
12. Contact, effective date, and version.

### Cookie policy `/kebijakan-cookie`

Required content:

1. Cookie/local-storage definition.
2. Essential, analytics, advertising, and personalization categories.
3. Vendor, purpose, duration, and first/third-party status.
4. Consent defaults and how to change choices.
5. Effect of rejecting optional categories.
6. Browser controls.
7. Policy update date.

### Data processing `/pemrosesan-data`

Required content:

1. Controller/processor roles.
2. Processing scope and categories.
3. Security measures summary.
4. Subprocessor management.
5. Incident notification framework.
6. Data-subject assistance.
7. Retention/deletion after termination.
8. Audit/contact process.
9. Downloadable DPA only after legal approval.

Legal pages are indexable unless legal decides otherwise, use full footer, show effective date/version, and must not be editable without legal approval workflow.

## 53. Account entry pages

Surface ownership: `/masuk`, `/daftar`, `/lupa-kata-sandi`, `/reset-kata-sandi`, `/verifikasi-email`, and authenticated onboarding are product-owned auth/app routes. The marketing website may link to them, preserve consent-safe attribution, and provide approved copy requirements, but must not implement a second authentication system or store account credentials.

### Login `/masuk`

Content/components:

1. RAMUNI logo and page purpose.
2. Email/approved login method.
3. Password visibility and accessible errors.
4. Forgot-password link.
5. Security/session notice.
6. Link to signup.
7. Help/contact link.
8. Privacy and terms links.

### Signup `/daftar`

Content/components:

1. Clear statement of beta/trial/paid status.
2. Minimum account fields.
3. Terms/privacy acknowledgement.
4. Marketing consent separate from service consent.
5. Password requirements or identity-provider behavior.
6. Verification expectation.
7. Existing-account login link.
8. Trust/security link.
9. Success route into onboarding.

Account routes default to noindex and stay out of XML sitemap. Marketing attribution may persist to the successful account/lead record without exposing PII or tenant data to marketing analytics.

Account-state routes:

| Route | Purpose | Marketing rule |
|---|---|---|
| `/lupa-kata-sandi` | Request password reset | Product-owned, noindex, no ad pixels on sensitive forms |
| `/reset-kata-sandi` | Tokenized password reset | Product-owned, noindex, token never logged or sent to analytics |
| `/verifikasi-email` | Verify signup/account email | Product-owned, noindex, success/failure states do not expose email in URL |

## 54. System and error pages

### 404

1. Clear “page not found” message.
2. Search or links to Home, Product, Blog, Help.
3. Report-broken-link option without forcing PII.
4. Preserve normal header/footer unless the route occurs inside authenticated app.

### 500

1. Honest temporary error message.
2. Retry action.
3. Status-page link.
4. Support path.
5. No stack trace or sensitive details.

### Maintenance

1. Maintenance reason at safe summary level.
2. Expected return time only when operationally known.
3. Status link.
4. Support contact.
5. Correct HTTP status and retry behavior.

System/error pages are noindex and excluded from sitemap. Error analytics must not capture sensitive URL parameters, form values, or stack details in public clients.

## 55. Resource collection hubs

Applies to `/panduan`, `/template`, `/kalkulator`, and `/kamus-bisnis`.

Required sections:

1. Breadcrumb.
2. H1 and definition of the collection.
3. Search/filter appropriate to content volume.
4. Featured resource selected by CMS.
5. Browse by business problem.
6. Browse by industry or level where relevant.
7. Paginated resource list or glossary A-Z.
8. Related resource-type links.
9. Empty/error states.
10. Contextual product CTA.

Collection-specific requirements:

- `/panduan`: beginner paths, pillar guides, reading time, author/reviewer.
- `/template`: format, compatibility, gated state, preview, updated version.
- `/kalkulator`: calculation purpose, reviewer, privacy note; never show fake usage counts.
- `/kamus-bisnis`: alphabet navigation, term search, related term clusters, unique-definition threshold.

Do not create indexable filter combinations. Collection hubs self-canonical; filters/search default to noindex.

## 56. Email preference and unsubscribe P1

Routes when lifecycle email launches:

- `/preferensi-email`
- `/berhenti-berlangganan`

Requirements:

1. Secure tokenized identity; do not expose email in URL.
2. Current subscription categories.
3. Clear save/unsubscribe action.
4. Confirmation state.
5. Service-message distinction.
6. Privacy link and support contact.
7. Idempotent request processing.

These pages are noindex and excluded from sitemap. Analytics records only the preference action category and success state, not identity.

## 57. Implementation sequence

### Deferred expansion route matrix

The following routes are out of P0 unless the product owner confirms availability, content owner, proof source, support readiness, and tracking acceptance. Keep them in the URL map as deferred entries so developers do not accidentally create orphan or duplicate pages.

| Future route | Page type | Required content before build | Default indexing |
|---|---|---|---|
| `/produk/katalog-produk` | Product detail | Category, unit, SKU, price, HPP, archive, import, and clear labels for advanced catalog scope | Index when P0 catalog is verified |
| `/produk/katalog-dan-harga` | Product detail or redirect | Use only if product owner prefers this route over `/produk/katalog-produk`; one must redirect to the other | Only one canonical route indexable |
| `/produk/pos-kasir` | Product detail | POS workflow, device/browser support, role permissions, receipt/payment status, offline limitation | Index only when available or credible beta |
| `/produk/pembelian` | Product detail | Supplier workflow, purchase order states, receiving, stock impact, finance link | Index only when available or credible beta |
| `/produk/pembayaran-dan-rekonsiliasi` | Product detail | Payment boundary, provider status, settlement, fees, refunds, reconciliation, and finance linkage | Index only when provider/reconciliation gates pass |
| `/produk/multi-outlet` | Product detail | Outlet hierarchy, transfer workflow, permissions, consolidated reporting, limitation | Index only when available or credible beta |
| `/produk/akuntansi` | Product detail | Accounting scope, chart of accounts, reports, tax limitations, reviewer approval | Index only after product/legal review |
| `/produk/loyalitas-pelanggan` | Product detail | Loyalty rules, earning/redemption, customer consent, abuse prevention | Index only when rules are final |
| `/produk/promosi-dan-otomasi` | Product detail | Campaign workflow, consent rules, approval steps, channel availability | Index only when compliant and available |
| `/produk/alur-kerja-dan-persetujuan` | Product detail | Approval inbox, maker-checker, workflow builder, step-up auth, audit, expiry, kill switch | Index only when approval policies are implemented |
| `/produk/omnichannel` | Product detail | Channel/store connection, mapping, order state, fulfillment, cancellation/refund, settlement, tracking, connector health | Index only after certification, pilot, support, and reconciliation pass |
| `/solusi/kelola-pesanan-multichannel` | Solution detail | Business problem, order visibility, fulfillment/reconciliation workflow, supported channel status | Index only if product route has evidence |
| `/produk/notifikasi-dan-kolaborasi` | Product detail | In-app/email/WA/push status, preferences, quiet hours, templates, delivery monitoring, comments/tasks | Index only when channels are approved |
| `/produk/mobile-dan-offline` | Product detail | Supported devices, offline queue, sync conflict behavior, data-loss prevention | Index only when verified |
| `/produk/manajemen-tim` | Product detail | Role matrix, invitation flow, audit log, permission examples | Index when implemented |
| `/produk/api-dan-integrasi` | Product/API hub | API availability, auth model, rate limits, developer docs, support process | Index only when developer program exists |
| `/produk/ai-agent` | Product detail | Agent capabilities, approval boundaries, audit trail, safe-failure behavior | Index only after product/legal/security approval |
| `/keamanan/trust-center` | Trust page | Verified controls, policies, evidence, subprocessor links, incident/security contact | Index only when evidence is maintained |
| `/keamanan/subprosesor` | Trust/legal page | Vendor, purpose, data category, location, DPA status, update process | Index after legal/privacy approval |
| `/enterprise` | Segment page | Enterprise needs, security posture, procurement path, SLA only if approved | Index when enterprise offer is real |
| `/migrasi-data` | Service/support page | Import formats, mapping process, validation, rollback, owner | Index when service is supported |
| `/mitra` | Partner page | Partner types, requirements, application flow, review process | Index when partner program exists |
| `/developer` | Developer hub | API status, docs links, sandbox, auth, changelog, support | Index when developer portal exists |
| `/docs/api` | Developer docs | Public API reference, versioning, auth, examples, rate limits | Index only if public and maintained |
| `/changelog` | Product update log | Versioned releases, dates, affected modules, availability | Index when updates are maintained |
| `/dukungan` | Support/CS page | Support scope, channels, response expectations, escalation rules | Index when support policy is approved |
| `/marketplace` | Ecosystem marketplace | Partner/app listing model, review process, install/support ownership, commercial rules | Deferred P4; noindex until program exists |
| `/academy` | Education hub | Course/webinar program, syllabus, speaker proof, cadence, registration rules | Index only when program is active |
| `/webinar/[slug]` | Webinar page | Topic, speaker, date, registration, replay/expiry, consent, follow-up owner | Noindex or 410 after expiry unless replay is valuable |
| `/tour-interaktif` | Product tour | Approved screens, state labels, sample data, accessibility, fallback | Index only when maintained |
| `/perbandingan/[slug]` | Comparison page | Competitor/legal review, factual sources, update owner, fair comparison | Deferred until strategy/legal approval |
| `/program-referral` | Referral page | Offer terms, eligibility, fraud controls, tracking, legal approval | Noindex until live program exists |
| `/en/*` | English locale | Fully localized content, hreflang, support readiness, translated legal pages | Do not publish thin locale pages |

### Deferred capability page content contract

All future product pages reuse Section 10 and additionally document feature-group availability independently:

| Page family | Required feature groups and boundaries |
|---|---|
| Catalog | P0 category/unit/product/SKU/price/HPP/archive/import; later barcode, variants, services, bundles, lots, serials, units conversion, price lists, bulk operations |
| POS | Basic sales baseline versus register/shift, cash movement, hold/recall, tender/QRIS, promo/override, receipt/device, return/refund/exchange, fulfillment, offline scope |
| Procurement | Supplier, requisition/approval, RFQ, PO, partial receipt/backorder, supplier bill, matching, purchase return, landed cost, reorder, supplier performance |
| Accounting | Chart of accounts, journals, AR/AP, allocation/aging, bank reconciliation, tax snapshot, budget, fixed assets, financial statements, period close/reopen, audit adjustments |
| CRM/loyalty/customer campaign | Customer/lead lifecycle, dedup, tasks, RFM/LTV/churn, consent/preferences, points/tier/reward, audience snapshot, message channel, frequency cap, opt-out, campaign ROI |
| Omnichannel | Connection mode, certification/pilot, mapping, order/payment/fulfillment/settlement state, stock reservation, cancellation/refund saga, courier rules, sync/reconciliation, degraded mode, support owner |
| Offline/devices | Device registration/revoke, encrypted cache, connectivity/freshness, queue, idempotent receipt, conflicts, reconciliation, supported peripherals, and explicit online-only actions |
| Workflow/AI agent | Read-only insight versus draft action versus approved execution; policy/risk, preview/diff, approver, expiry, idempotency, receipt, compensation, escalation, budget, kill switch |

`RAMUNI Customer Campaign` means an authenticated CRM/loyalty feature. `RAMUNI Acquisition Campaign` means website, content, Google Ads, Meta Ads, or Instagram Ads. CMS labels, analytics names, and copy must not use the ambiguous word `campaign` without this context.

Deferred product pages reuse the Product Detail Page Template in Section 10. Deferred segment, service, and developer pages reuse the closest existing template, but must not borrow claims, CTAs, or schema from pages with different intent.

1. Create page/template inventory and URL map.
2. Implement global header, mega-menus, mobile menu, footer, breadcrumbs, and section contract.
3. Build homepage and commercial hub templates.
4. Build product, solution, industry, and role detail templates.
5. Build pricing, demo, contact, security, about, and status pages.
6. Build blog taxonomy, article, author, reviewer, search, and editorial trust templates.
7. Build resource and help-center templates.
8. Build campaign landing and thank-you templates.
9. Configure CMS required fields, workflow, review binding, and fallbacks.
10. Add internal-link mappings, metadata, schema, analytics IDs, and consent behavior.
11. Seed only approved content and synthetic examples.
12. Run route, content, SEO, accessibility, form, tracking, and campaign QA before launch.
