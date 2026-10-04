# Site Audit — Xuanbao Environmental Main Site (V3.0 Phase 1)

> Date: 2026-09-25 ｜ Project: `/projects/xuanbao-astro/` ｜ Repo: `martinxionbiotech-max/xuanbao` (main, local=remote synced)
> Scope: audit before V3.0 restructuring. Status codes: LIVE / REWRITE / NEEDS_VERIFICATION / NEEDS_SOURCE / NEW / DO_NOT_PUBLISH.

## 1. Platform & Build

| Item | Value |
|---|---|
| Framework | Astro 7 + Tailwind v4 (AstroWind template), output static |
| Build | `npm install && npm run build` → `dist/` |
| Deployment | Cloudflare Pages (git push `main`) |
| Live site | https://xuanbaoenvironment.com |
| Content model | Hard-coded data files (`src/data/*.ts`) + .astro page templates; blog disabled |
| Page count | 51 pages (index, about, 15 product, 6 solution, 13 industry, 3 case, 8 company/resource) |

## 2. Current URL / Page Inventory (status per V3.0 rules)

| URL | Page | Status | Notes |
|---|---|---|---|
| `/` | Homepage | REWRITE | V3.0 §8–16 new structure (AC-first positioning, business areas, materials, selection steps, field evidence with % ) |
| `/products/` | Products landing | REWRITE | §17: split Activated Carbon / Catalysts / Molecular Sieves |
| `/products/scr-denox-catalysts/` | Category (plate+honeycomb) | LIVE | Keep; will sit under Catalysts in Phase 5 |
| `/products/co-removal-catalyst/` | CO catalyst product | LIVE | |
| `/products/voc-catalysts/` | Category (3 catalysts) | LIVE | |
| `/products/zeolite-molecular-sieve/` | Category (4 sieves) | LIVE | |
| `/products/activated-carbon/` | Category (4 products) | LIVE | Anchor of AC line; material/form sub-pages come in Phase 5 |
| `/products/heating-tubes/` | Heating components | NEEDS_VERIFICATION | Not part of V3.0 core; keep, mark data-on-request |
| 14 product detail pages | product data | LIVE | Values carry (*) OCR markers; keep as-is this phase |
| `/solutions/` + 5 | Solutions | LIVE | Phase 5 will relabel → Applications or keep as solutions under Applications |
| `/industries/` + 12 | Industries | LIVE | Phase 5: move under Applications |
| `/case-studies/` + 2 | Cases | LIVE | Verified field data; will be expanded with structured fields in Phase 5 |
| `/about/` | About | REWRITE | §30: verified-facts structure, source tags |
| `/r-and-d/` | R&D | REWRITE | §25: add activated carbon development direction, workflow |
| `/manufacturing/` | Manufacturing | REWRITE | §26: generic process + 3 verified catalyst lines |
| `/quality/` | Quality | REWRITE (small) | §27: add "Field Data" to data classification (5 types) |
| `/service/` | Service | LIVE | Keep; minor wording only |
| `/resources/` | Resources / KC gateway | LIVE | Keep as Knowledge Center gateway |
| `/contact/` | Contact | REWRITE | §38–39: remove placeholder contact person, expand form |
| `/privacy/` | Privacy | LIVE | Accurate to implementation (no analytics ID set); add hosting line |

## 3. Identity & Metadata Findings

| Item | Current | Finding |
|---|---|---|
| Site name (config) | `Xuanbao Environmental Technology` | V3.0 §43 → brand `Xuanbao Environmental`; legal name in Organization schema/About |
| Default SEO title | `Xuanbao Environmental Technology — Industrial Emission Control Catalysts` | REWRITE → `Activated Carbon & Industrial Adsorption Materials \| Xuanbao Environmental` (§41) |
| Default description | catalyst-first | REWRITE → AC + adsorption + emission-control materials (§41) |
| Organization schema | full legal name ✓ | Keep |
| Contact person | "Ms. Chen (placeholder contact…)" | **DO_NOT_PUBLISH** → replace with "International Sales & Technical Support" (§39) |
| Email | 625534887@qq.com (QQ mailbox) | LIVE — do not invent corporate email |
| Phone/WhatsApp | +86 151 6936 1313 | LIVE |
| Founding year, capacity, area, certifications, customers | not on site | NEEDS_VERIFICATION — do not invent (§50) |

## 4. Analytics / Tracking Audit (§40)

| Item | Finding |
|---|---|
| Google Analytics | `analytics.vendors.googleAnalytics.id = null` → **not loaded** |
| Partytown | configured but `hasExternalScripts = false` → **not loaded** |
| Third-party scripts | none in repo |
| Form | static `mailto:` form (opens email client) — no server, no CAPTCHA, no cookies |
| Hosting | Cloudflare Pages (CDN logs processed by infrastructure provider) |
| Conclusion | Privacy Policy claim "no advertising cookies / third-party trackers" is **accurate**; add one line on hosting access logs |

## 5. Gaps vs V3.0 Architecture

| Gap | Phase |
|---|---|
| No `/applications/`, `/materials/`, `/technology/` sections | Phase 5 |
| No AC raw-material pages (coconut/fruit/bamboo/coal/wood) | Phase 5 — only evidence-supported ones |
| No AC form pages (granular/powdered/columnar/honeycomb/fiber) | Phase 5 — only verified: columnar, honeycomb, fiber |
| No `/docs/source-register.md` | Fixed this phase (Phase 2) |
| No `/docs/information-architecture.md` | Fixed this phase (Phase 3) |
| Homepage lacks calculated case reductions (98.8% / 99.86%) | Fixed this phase (Phase 4) |
| Blog disabled (apps.blog.isEnabled=false) | Intended — no generic articles during restructure (§46) |

## 6. Existing Widget Inventory (for rewrites)

Available Astro widgets: Hero, Hero2, HeroText, Features, Features2, Features3, FeatureTabs, Content, Steps, Steps2, Note, FAQs, Stats, CallToAction, Comparison, Projects, Gallery, Quote, Team, Testimonials, Pricing, SocialProof, Bento, Newsletter, Announcement, Contact, Timeline, Brand logos.
