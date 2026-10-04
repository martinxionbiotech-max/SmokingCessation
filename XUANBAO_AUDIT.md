# XUANBAO_AUDIT.md — Phase 2 Pre-Change Full Audit

Date: 2026-09-27 · Scope: main site (xuanbao-astro, 64 built pages) + data site (data-xuanbao, 84 built pages)
Method: local source scan + built-HTML scan + live HTTP/DNS checks (Google DoH, Cloudflare DoH, Verisign RDAP).

---

## 0. P0 — DOMAIN / DNS (BLOCKING)

| Check | Result |
|---|---|
| xuanbao.pages.dev | HTTP 200 ✓ live |
| data-xuanbao.pages.dev | HTTP 200 ✓ live |
| xuanbaoenvironment.com | **NXDOMAIN — no DNS zone, not registered** (Google DoH Status 3, Cloudflare DoH Status 3, Verisign RDAP 404) |
| data.xuanbaoenvironment.com | **NXDOMAIN** (subdomain of the same dead zone) |

**Impact (critical):**
1. Every canonical, sitemap URL, robots Sitemap line, OG URL and Schema `@id` on both sites points to `xuanbaoenvironment.com` / `data.xuanbaoenvironment.com` — a domain that does not resolve. Google sees live pages (pages.dev) with canonicals to a dead domain → "dead canonical" hazard: Google may ignore canonicals and treat pages.dev as the canonical, or devalue the canonical signal.
2. The main site contains **125 internal KB links** to `data.xuanbaoenvironment.com` — all currently 404/broken for real visitors.
3. Verisign RDAP 404 = the .com is **not registered**. Registering the domain is a user action I cannot perform.

**User action required (either):**
- (a) Register `xuanbaoenvironment.com` now and create the Cloudflare zone (Pages custom domains `xuanbaoenvironment.com` → xuanbao project, `data.xuanbaoenvironment.com` → data-xuanbao project). Canonicals are already correct for this future state — no code change needed.
- (b) If registration is delayed, temporarily switch all canonicals/sitemap/robots to `*.pages.dev` to avoid the dead-canonical hazard (I can do this in ~15 min, reversible).

---

## 1. MAIN SITE (xuanbao-astro, 64 pages)

### 1.1 Pages & URL inventory
- 64 HTML pages: home, about, 7 application pages (+hub), 3 materials pages (+hub), 12 product detail + 5 product category + products hub + heating-tubes, 12 industries (+hub), 2 case-studies (+hub), 5 solutions (+hub), manufacturing, quality, r-and-d, service, resources, contact, privacy, 404, decapcms (admin, noindex).
- URL scheme: trailingSlash = false. Internal links all use non-trailing-slash form ✓ consistent.
- `/decapcms/` admin page: has `noindex` meta, excluded from sitemap ✓ OK (still ships in dist — acceptable).

### 1.2 Titles / Meta / Canonical / OG
- Titles: present on all pages except `/privacy/` (**raw markdown page rendered without the Layout → no `<title>`, no meta, no canonical, no OG**).
- Meta descriptions: present everywhere except `/privacy/` and `/decapcms/` (admin, fine).
- Canonicals: present on all except `/privacy/` / `/decapcms/`; all correctly on `xuanbaoenvironment.com` (dead domain → see P0).
- OG url/image: present except privacy/decapcms. OG image uses built asset ✓.
- Titles > 60–70 chars (SERP truncation): `/products/activated-carbon` (96), `/products` (72), `/products/scr-denox-catalysts` (75) → P2 shortening.
- **Positioning mismatch:** home title = "VOC Catalysts & Activated Carbon Manufacturer" and home H1 = "Precious-Metal Honeycomb Ceramic Catalysts & Activated Carbon". Phase 2 requires "Industrial Environmental & Purification Materials Manufacturer" with 5 core lines (AC, VOC, SCR/DeNOx, CO oxidation, zeolite). Title/H1/default meta need the broader positioning. (config.yaml metadata.default likewise.)

### 1.3 Headings H1–H3
- H1: exactly 1 per page (except admin + privacy which is raw).
- H2/H3: hierarchical, recently site-wide centered ✓. All section H2s use the same heading class pattern (consistent).

### 1.4 Schema
- Every page: `WebSite` + `Organization` (global) ✓.
- `BreadcrumbList`: all detail/leaf pages ✓; hubs (/, /products, /applications, /industries, /solutions, /case-studies, /about) have none — acceptable for top-level hubs.
- 12 product detail pages: `Product` + `FAQPage` ✓. Product schema has `brand`, `manufacturer` (@id ref), `offers` (URL + `priceCurrency: USD` + `availability: InStock`, **no price**) — no fabricated price/rating/review ✓. **Flag:** `availability: InStock` on a make-to-order catalog is borderline fabrication per Phase 2 rules → recommend removing availability semantics (keep Offer as contact-for-pricing).
- Home: `FAQPage` ✓.
- **Gap:** case-studies pages have only WebSite/Organization/BreadcrumbList — no `Article`/`TechArticle` schema. Phase 2 wants Article schema on case studies.
- **Gap:** category hubs (/products/voc-catalysts etc.) have no `CollectionPage`/`ItemList`. Optional P2.

### 1.5 Internal links / Orphans / Broken
- Broken internal links: **0** (all hrefs resolve; sitemap-index.xml refs are head sitemap links, valid files).
- Orphans (0 inbound from nav/footer/other pages):
  - `/privacy/` — not linked from footer/nav. **Fix: add footer link.**
  - `/products/heating-tubes/` — dropped from products hub after catalyst-first reorder; still in sitemap. **Decision: keep as "auxiliary equipment" (link from products hub + keep sitemap) or remove from sitemap.** Brochure confirms it as a real product → recommend keep, de-emphasized.
  - `/resources/` — nav "Resources" dropdown links to Industries/Case-Studies, not to `/resources` itself. **Fix: link it.**
- KB links (125) from main site → `data.xuanbaoenvironment.com` (dead until DNS). Covered by P0.
- External links: only `images.unsplash.com` preconnect (no visible external content) ✓.

### 1.6 Thin content (<250 words main content)
`/case-studies` hub (88w), `/service` (101w), `/resources` (168w), `/solutions` hub (181w), `/products/*` category hubs (160–211w), `/quality` (199w), `/contact` (228w), `/manufacturing` (227w), `/privacy` (raw), 4 industries pages 216–245w.
- Hubs: short by design (cards do the work) — acceptable, but `/case-studies` and `/service` are genuinely thin → deepen in Phase 2 (case studies: full field structure per §12; service: 101 words is too little).

### 1.7 Images / Breadcrumbs / AI-readable
- `<img>` missing alt: **0** ✓ (prior image-SEO work holds).
- Breadcrumbs UI + BreadcrumbList present on all leaf pages ✓.
- `llms.txt` exists (main + data) ✓, lists core pages + KB.
- robots.txt: allows AI crawlers (GPTBot/ClaudeBot/PerplexityBot/etc.) ✓; Sitemap line → dead domain (P0).

### 1.8 Entity consistency
- "Xuanbao Environmental" (short form) + "Yancheng Xuanbao Environmental Technology Co., Ltd." (full form) used consistently (440/65 occurrences, no conflicting variants) ✓.
- No shisha/hookah/BBQ/coconut/fruit/bamboo charcoal content anywhere ✓ (exclusion already respected).
- `materials/` pages (coal-based, coconut-shell carbon) are industrial technical pages — consistent with "activated carbon" core line, not consumer charcoal. Keep.

### 1.9 Duplicate content
- No duplicate titles. No duplicated bodies detected between pages (product detail vs category vs hub have distinct text). KB↔main overlap is intentional cross-linking, not duplication.

---

## 2. DATA SITE (data-xuanbao, 84 pages)

### 2.1 Core quality — clean
- Titles / meta descriptions / canonicals / OG: **0 missing** (84/84) ✓.
- H1: exactly 1 per page ✓.
- Orphans: **0** — every page is in the MkDocs nav (relative links resolved properly) ✓.
- Broken links: none detected in scan.
- Thin content (<100w): none ✓.

### 2.2 Schema
- Organization 84, WebSite 84, BreadcrumbList 83, **TechArticle 73**, CollectionPage 10.
- Coverage is good. Optional: add `Dataset` only where real tables of measured data exist (do not fabricate).
- Canonicals → `data.xuanbaoenvironment.com` (dead domain, P0).

### 2.3 Structure vs Phase 2 content levels
- Current sections: activated-carbon (14), scr-denox (17), co-oxidation (9), voc-catalysts (9), voc-engineering (10), molecular-sieves (9), testing (4), compliance (5), methodology (4), water-purification (2+). Strong coverage of Levels 1–4 (Definition → Testing). Evidence/sources methodology exists (methodology/*).
- **Level 5–7 (Evidence / Comparison / Decision) gaps vs priority list (§10):**

| Priority topic | Status |
|---|---|
| How to Select Activated Carbon | ❌ no dedicated page (material exists scattered in quality-indicators/capacity-calculation) |
| Activated Carbon vs Zeolite | ✅ voc-engineering/zeolite-vs-activated-carbon |
| Honeycomb vs Columnar AC | ❌ missing |
| Coconut Shell vs Coal-Based | ✅ raw-materials comparison |
| Humidity & adsorption | ✅ humidity-temperature |
| AC service life estimate | ✅ replacement-cycles |
| Breakthrough curve & capacity | ✅ breakthrough-curves, capacity-calculation |
| How to Select VOC Catalyst | ✅ voc-catalyst-selection |
| Pt vs Pt-Pd | ❌ missing (precious-vs-non-precious exists, different axis) |
| VOC catalyst deactivation | ✅ voc-catalyst-deactivation |
| RTO vs RCO | ✅ rco-vs-rto |
| Adsorption vs Catalytic Oxidation | ⚠️ partially in voc-technology-comparison — consider dedicated decision page |
| Gas Purification Material Selection | ❌ missing |
| Operating conditions → material selection | ⚠️ partial |

→ ~5 new decision pages max: AC selection guide, Honeycomb vs Columnar, Pt vs Pt-Pd, Adsorption vs Catalytic Oxidation (decision-focused), Gas Purification Material Selection. Matches the "20% new topics / no URL spam" rule.

---

## 3. STRUCTURE: CURRENT vs PHASE-2 TARGET

| Target (§5) | Current | Action |
|---|---|---|
| /products/activated-carbon | ✓ | keep |
| /products/voc-catalysts | ✓ | keep |
| /products/scr-catalysts | /products/scr-denox-catalysts | keep slug (indexed); no rename |
| /products/co-oxidation-catalysts | /products/co-removal-catalyst (single-product category) | keep slug |
| /products/zeolite | /products/zeolite-molecular-sieve | keep slug |
| — | /products/heating-tubes | decision: auxiliary keep vs remove (recommend keep, de-emphasized) |
| /applications/voc-control | /applications/voc-adsorption | keep existing slug; title can say "VOC Control" |
| /applications/nox-reduction | ❌ missing | **add** (1 page) |
| /applications/co-removal | ❌ missing | **add** (1 page) |
| /applications/gas-purification | ✓ | keep |
| /applications/odor-control | ✓ | keep |
| /applications/water-treatment | ✓ | keep |
| extra apps (gold-recovery, decolorization, waste-gas-treatment) | exist | keep — real AC applications, not low-value |
| /testing | ❌ on main site (data has testing/) | **add** main /testing/ page linking KB testing docs |
| /case-studies | ✓ 2 pages | deepen to §12 field structure |
| /company | /about + /r-and-d + /manufacturing + /quality + /service | keep as-is (all exist, no rename) |
| /solutions | ✓ 5 pages | keep |

Net new URLs: **3** (nox-reduction, co-removal, testing). No renames, no removals without user decision on heating-tubes.

---

## 4. ENTITY ARCHITECTURE (target state)

```
Xuanbao Environmental / Yancheng Xuanbao Environmental Technology Co., Ltd.
└─ Industrial Environmental & Purification Materials Manufacturer
   ├─ Activated Carbon (coal/coconut/fruit-shell/honeycomb/fiber) → Adsorption, Water Treatment, Gas Purification, Odor Control
   ├─ VOC Catalysts (Pt / Pt-Pd / non-precious, YC-XB-A/B/C) → Catalytic Oxidation, VOC Control
   ├─ SCR / DeNOx Catalysts (plate / honeycomb, V-Mo-Ti) → NOx Reduction
   ├─ CO Oxidation Catalysts → CO Removal (sintering, incineration, furnaces)
   ├─ Zeolite / Molecular Sieves (5A, 13X, ZSM-5, NaY) → Adsorption, Concentration Wheels
   └─ (auxiliary) Fin Heating Tubes — decision pending
```
- Current on-site entity naming already consistent (see 1.8). Main change = positioning language in title/H1/meta (from "VOC+AC manufacturer" → 5-line industrial materials manufacturer).

---

## 5. EVIDENCE SYSTEM status
- data site methodology/sources.md + data-classification.md exist ✓ (Data Types + Evidence Levels A–E).
- Product pages already carry the "values are manufacturer specs unless marked (*)" disclaimer ✓.
- No fabricated price/rating/review/SKU/certification found in Schema ✓ (availability flag — see 1.4).
- Case studies are field-test records with conditions — upgrade path defined in §12 of the brief (add Industry/Process/Pollutant/Inlet/Outlet/Temperature/Flow/Material/Equipment/Test Method/Result/Conditions/Limitations/Evidence Type).

---

## 6. PRIORITY ISSUE LIST

**P0 (blocking, user action):**
1. Register/activate `xuanbaoenvironment.com` + DNS zone; or authorize temporary switch of canonicals/sitemap/robots to pages.dev.
2. (Consequence) 125 KB links + all Schema URLs dead until DNS live.

**P1 (fix in Phase 2):**
3. `/privacy/` raw page → wrap in Layout (title/meta/canonical) + add footer link (orphan fix).
4. `/resources/` orphan → link from Resources nav dropdown.
5. `/products/heating-tubes/` orphan → relink from products hub as auxiliary equipment (or user decides removal).
6. Positioning: home title/H1, config.yaml default title/description → "Industrial Environmental & Purification Materials Manufacturer" (5 lines).
7. Case studies: add Article/TechArticle schema + deepen content to full field structure (§12).
8. Product schema: remove `availability: InStock` (avoid fabricated semantics); keep contact-for-pricing Offer.
9. Add missing application pages: nox-reduction, co-removal; add main-site /testing/ page (3 new URLs).
10. Data site: add ~5 decision pages (AC selection, Honeycomb vs Columnar, Pt vs Pt-Pd, Adsorption vs Catalytic Oxidation, Gas Purification Material Selection).

**P2 (opportunistic):**
11. Shorten 3 over-length titles (96/75/72 chars).
12. Category hubs: consider CollectionPage/ItemList schema.
13. Deepen /service (101w) and /case-studies hub (88w).
14. 4 industries pages 216–245w — enrich if evidence exists (no fabrication).

---

## 7. VERIFICATION PLAN (final, per §18)
Build (both) → link check → sitemap check → canonical check → redirect check → schema check → robots check → title check → H1 check → orphan check → duplicate check → entity consistency check → AIO readability check. Output: `XUANBAO_PHASE2_REPORT.md`.
