# Information Architecture — Xuanbao Environmental (V3.0 Phase 3)

> Date: 2026-09-25 ｜ Purpose: URL map, intent model and phased page plan for the V3.0 restructure.
> Legend: LIVE (keep) ｜ REWRITE (Phase 4, this round) ｜ NEW (Phase 5, evidence-gated) ｜ LATER (Phase 6+) ｜ NOT-PLANNED (no evidence)

## 1. Conceptual Model (§2, §7, §54)

```
ONE COMPANY — Yancheng Xuanbao Environmental Technology Co., Ltd.
 └─ ONE PLATFORM — Activated Carbon & Industrial Materials (xuanbaoenvironment.com)
     ├─ Raw Material (coconut shell, coal-based, …)   ← /materials/
     ├─ Product Form (honeycomb, columnar, fiber, …)  ← dimension, not category
     ├─ Product Family (AC / Catalysts / Sieves)      ← /products/
     ├─ Applications (gas treatment / purification)   ← /applications/
     ├─ Performance / Testing                          ← /quality/ + KB
     └─ Engineering Support                            ← /service/ + /contact/
DATA HUB — data.xuanbaoenvironment.com = technical knowledge, specs, comparisons
```

Rule (§54): one domain. No split for multi-application reasons.

## 2. URL Map — Existing → Target

### Phase 4 (this round) — existing URLs kept, content rewritten

| Existing URL | Purpose | Status |
|---|---|---|
| `/` | Homepage — catalyst-first positioning (owner decision 2026-09-27), business areas, core catalyst line, AC materials, selection steps, field evidence | REWRITE |
| `/products/` | Products landing — 3 groups: Activated Carbon / Catalysts / Molecular Sieves | REWRITE |
| `/about/` | Company — verified facts + source-tagged statements | REWRITE |
| `/r-and-d/` | R&D — + AC development direction, workflow | REWRITE |
| `/manufacturing/` | Manufacturing — generic process + 3 catalyst lines | REWRITE |
| `/quality/` | Quality — data classification extended to 5 types | REWRITE (small) |
| `/contact/` | Contact — no placeholder person, expanded form | REWRITE |
| `/service/` `/resources/` `/privacy/` | Service / KC gateway / privacy | LIVE (light edits) |

### Phase 5 — new commercial architecture (evidence-gated)

| Target URL | Page | Gate |
|---|---|---|
| `/applications/` | Applications hub (2 blocks: Environmental/Gas Treatment + Water & Process Purification) | NEW |
| `/applications/voc-adsorption/` | AC for VOC adsorption (§20) | NEW — products exist (honeycomb/columnar AC) |
| `/applications/industrial-waste-gas/` | Industrial waste gas treatment | NEW — verified via industries.ts |
| `/applications/odor-control/` | Odor control | NEW — AC fiber/carbon cover it |
| `/applications/gas-purification/` | Gas purification | NEW — 5A/13X/AC verified |
| `/applications/water-treatment/` | Water treatment (§22) | GATE: site lists water uses for coconut AC/13X/NaY — create only if confirmed as supplied |
| `/applications/decolorization/` | Decolorization | GATE: coconut AC claims food decolorization — needs confirmation |
| `/applications/gold-recovery/` | Gold recovery (§21) | GATE: NOT in current data — create only with company confirmation |
| `/materials/` | Materials hub | NEW |
| `/materials/coconut-shell-activated-carbon/` | Raw material page (§23) | NEW — product exists |
| `/materials/coal-based-activated-carbon/` | Raw material page | NEW — columnar product exists |
| `/materials/fruit-shell-…/` `/materials/bamboo-…/` `/materials/wood-…/` | Raw material pages | NOT-PLANNED until company confirms supply |
| `/products/activated-carbon/` (children) | Form pages granular/powdered | NOT-PLANNED until verified |
| `/case-studies/` (structured fields) | Case architecture §28–29 | NEW (expand existing 2 cases) |
| `/technology/` | Technology overview page | LATER (optional hub; R&D/Manufacturing/Quality cover it) |

### Phase 6 — SEO/AIO layer

| Item | Status |
|---|---|
| Metadata per §41 (unique title/description/canonical/OG) | Phase 6 sweep |
| Schema (§42): Organization/WebSite/WebPage on all; Product on detail pages; FAQPage only where real FAQs shown | Phase 6 audit |
| Breadcrumbs + internal links per §35 (product↔application↔material↔case↔testing) | with Phase 5 pages |
| llms.txt refresh after Phase 5 URLs exist | Phase 6 |
| KB (data.xuanbaoenvironment.com) alignment to same architecture | separate project round |

## 3. Navigation Plan (§3)

Current header: Products▾ Solutions▾ Industries / Case Studies / Company▾ Contact
Target (after Phase 5 pages exist):

```
Products ▾        Applications ▾        Materials ▾        Company ▾        Knowledge Center        Contact
```

- Solutions pages: fold under Applications as "Emission Control Solutions" (kept as URLs, relabeled) — decision deferred to Phase 5.
- Industries pages: fold under Applications as vertical slices.
- Mega-menu lists only group + child pages; detail pages not in nav.

## 4. Content Status Inventory (§45) — snapshot

LIVE: products data pages (14+heating), categories (5), industries (13), cases (3), solutions (6), service, resources, privacy
REWRITE: /, /products/, /about/, /r-and-d/, /manufacturing/, /quality/, /contact/ (this round)
NEW (Phase 5): applications hub + selected app pages, materials hub + 2 material pages, case-study structure
NEEDS_VERIFICATION: heating components (data), water/decolorization/gold applications, granular/powdered AC, fruit/bamboo/wood materials, C8–C11 company facts
DO_NOT_PUBLISH: placeholder contact person (removed this round)

## 5. Priority Order (§47) — current position

P0 (this round): Homepage, Products, Contact, About, Quality → ✅
P1 (this round): R&D, Manufacturing, Service, KC gateway → ✅
P2 (Phase 5): Applications, Materials, case expansion → queued
