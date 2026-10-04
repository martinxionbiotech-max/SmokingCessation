# Content Quality Gate Report — V3.0 Phase 1–4 (2026-09-25)

> Scope: audit + source register + IA + main-page rewrite. Build verified locally; not yet deployed.

## 1. Build & Technical Checks

| Check | Result |
|---|---|
| `npm run build` | ✅ 52 pages, 0 errors, 8.06s |
| astro-compress | ✅ 53 HTML files compressed |
| sitemap-index.xml generated | ✅ |
| robots.txt updated with sitemap | ✅ (by astrowind integration) |
| Icon import in rewritten pages | ✅ (fixed `Icon` import in products/index.astro) |
| Broken internal links in rewritten pages | ✅ none — all hrefs point to existing routes or KB |

## 2. Factual Verification (against source-register.md)

| Check | Result |
|---|---|
| Homepage case percentages | ✅ 98.8% (1,499→18 ppm) and 99.86% (11,224.2→16.2) — phrased "under the stated test conditions", no guarantee wording |
| Invented values | ✅ none added — no capacity/area/customers/certifications invented |
| Raw-material claims | ✅ only verified systems linked to products (coconut shell, coal-based); fruit-shell/bamboo/wood kept as "can be discussed", no doorway pages |
| Product forms | ✅ only verified forms linked (honeycomb, columnar, fiber); granular/powdered mentioned as "can be discussed" |
| Placeholder contact | ✅ removed — replaced with "International Sales & Technical Support" |
| Data classification on Quality page | ✅ 5 types now (added Field Data) |
| Bamboo charcoal vs bamboo activated carbon | ✅ not merged; no bamboo product page created |
| Company identity | ✅ short brand "Xuanbao Environmental" + full legal name where appropriate; config site name updated |

## 3. SEO / Metadata Checks (Phase 6 items partially applied)

| Check | Result |
|---|---|
| Default title template | ✅ `%s | Xuanbao Environmental` |
| Homepage title | ✅ `Activated Carbon & Industrial Adsorption Materials | Xuanbao Environmental` |
| Homepage description | ✅ per V3.0 §41 |
| Unique titles/descriptions on rewritten pages | ✅ each page has unique metadata |
| H1 uniqueness | ✅ one H1 per rewritten page |

## 4. Content Status After This Phase

- REWRITE completed: `/`, `/products/`, `/about/`, `/r-and-d/`, `/manufacturing/`, `/quality/`, `/contact/`, `/privacy/`
- LIVE kept: service, resources, all product/category/solution/industry/case pages, KB gateway
- DO_NOT_PUBLISH resolved: placeholder contact removed

## 5. Deferred to Phase 5 (per user instruction — not generated this round)

- `/applications/` hub + evidence-gated application pages (VOC adsorption, industrial waste gas, odor control, gas purification; water/decolorization/gold gated on company confirmation)
- `/materials/` hub + coconut-shell / coal-based material pages
- Structured case-study fields (§28–29)
- Navigation restructure (mega-menu Products/Applications/Materials) — only after Phase 5 URLs exist
- llms.txt refresh — after Phase 5 URL set stabilizes

## 6. Remaining Facts Requiring Company Confirmation (list for user)

1. Founding year
2. Production capacity (t/y) and factory area
3. Certifications (ISO etc.) — currently none claimed
4. Customer references / export countries
5. Contact person name (currently "International Sales & Technical Support")
6. Whether the company supplies: granular/powdered activated carbon, fruit-shell/bamboo/wood-based carbon, gold-recovery carbon, water-treatment carbon
7. Original case-study test reports (flow/temperature/SO₂/dust/catalyst volume for the two CO cases)
8. Whether a corporate email domain is available (currently QQ mailbox — kept as-is)
