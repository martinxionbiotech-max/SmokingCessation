# Nightly Progress — SmokingCessationHub

Last updated: 2026-11-13
Current task: N6
Next task: N7
Status: ready

## Completed

| Task | Date | Commit | Build | Notes |
|---|---|---|---|---|
| N1 | 2026-11-08 | 2d19944 | 229 pages | 6 medication methods consolidated: `/medications/{slug}/` is canonical, `/methods/{slug}/` returns 301 on Netlify/Vercel/nginx and renders a noindex redirect stub elsewhere. Methods hub now lists 7 non-medication methods; sitemap has a separate 6-page medications section. Duplicate titles 0; broken internal links 0. |
| N2 | 2026-11-09 | 0566a30 | 152 content pages (+6 redirect stubs) | Experience quality gate applied: published only records with `qualityScore >= 7`, complete provenance, a reported outcome and at least 3 structured detail fields, capped at 60. 133 published → 56 (169 records total; 111 noindex, 2 review). Sitemap has exactly 56 Experience URLs. New `scripts/experience-quality-gate.mjs` (`--check`/`--write`) runs as npm `prebuild`; hub shows 56 of 169 and documents the gate. Duplicate titles 0; broken internal links 0. |
| N3 | 2026-11-10 | a6d5ae6 | 162 content pages (+6 redirect stubs) | Split the top 10 questions into `/questions/{slug}/` pages (970–1,161 words each; 8 FAQs; 5–6 sections; sources; explicit "not been reviewed by a clinician" note). The hub is now an index: 10 featured cards plus a compact 112-question list with short answers. The 112-question FAQPage was removed; each detail page emits its own 8-item FAQPage. HTML sitemap has a Questions section (10 entries). Duplicate titles 0; broken internal links 0. |
| N4 | 2026-11-11 | 1415a37 | 163 content pages (+6 redirect stubs) | Metadata + schema + review disclosure pass. Every indexable page: title 20–60 chars, description 140–155, self-referencing canonical, exactly one H1, duplicate titles/descriptions 0. New `src/utils/seo.ts` clamps at render time (`seoTitle`, `seoDescription`, `clampDescriptionMax`) so future content cannot exceed the limits; three Experience titles were shortened in the data instead of relying on truncation. New `/editorial-policy/` page (source hierarchy, corrections, AI-assistance disclosure, explicit "no clinician has reviewed this page") linked from header, footer and HTML sitemap. `ReviewStatement` on every content page states the page "has not been reviewed by a clinician" — the site never uses "medically reviewed". JSON-LD: author + datePublished on Article/MedicalWebPage/WebPage, self-referential `reviewedBy` removed, non-ISO review labels no longer leak into `dateModified`, duplicate BreadcrumbList output removed (nav component already emits it). New `scripts/seo-audit.mjs` (`npm run audit:seo`): 169 HTML files, 163 indexable, 0 problems. |
| N6 | 2026-11-13 | 7b58071 | 164 content pages (+6 redirect stubs) | New Pillar: `/withdrawal/timeline/` — "Nicotine withdrawal timeline: hour by hour, week by week". 3,897 source words (4,347 rendered main content), 12 H2 sections, 4 tables (stage map rendered from the `timeline` collection, first-24-hours, symptom-duration, what-helps), 12 linked sources (WHO 2024, WHO fact sheet, USPSTF 2021, NICE NG209, Hughes 2007/R-007, four Cochrane reviews, Surgeon General 2020, NHS, CDC), 43 unique site links. `Article` + `MedicalWebPage` JSON-LD with author/datePublished/dateModified; explicit "Not reviewed by a clinician" in the byline and `ReviewStatement`. No dosing, injection, efficacy guarantee or invented reviewer. Linked from `/withdrawal/`, `/timeline/`, `/questions/how-long-withdrawal-lasts/` and the HTML sitemap. `npm run audit:seo`: 170 HTML files, 164 indexable, 0 problems; duplicate titles/descriptions 0; internal links 0 broken. |
| N5 | 2026-11-12 | 4b4b339 | 163 content pages (+6 redirect stubs) | Expanded `/quit-smoking/` into the first Pillar: 4,040 source words (≈4,400 rendered), 12 H2 sections, 4 tables (health milestones, guideline comparison, method comparison, withdrawal symptoms), 12 linked sources (WHO 2024, WHO fact sheet, USPSTF 2021, NICE NG209, five Cochrane reviews, Surgeon General 2020, NHS), 29 unique internal links, and both `Article` and `MedicalWebPage` JSON-LD with author/datePublished/dateModified. No dosing, injection, efficacy guarantees or invented reviewer; the page states "Not reviewed by a clinician" in the header line and in `ReviewStatement`. `npm run audit:seo`: 169 HTML files, 163 indexable, 0 problems; duplicate titles/descriptions 0; page-level internal links 0 missing. |

## Blocked / Partial

| Task | Reason | Next action |
|---|---|---|
| — | — | — |

## Notes

- N4 closed the metadata debt: title/description limits are now enforced by helper functions at render time, not by editing 169 data records. Source summaries stay long (they read better in the body); the clamp guarantees the SERP window on output. `npm run audit:seo` fails the build review if any page drifts out of 20–60 / 140–155, if a title or description repeats, if canonical/H1 is wrong, if JSON-LD loses author/datePublished, or if an internal link 404s.
- N4 removed `reviewedBy` from JSON-LD and from page copy. The only reviewer statement the site may make is the negation: "this page has not been reviewed by a clinician". Do not reintroduce `reviewedBy`, "medically reviewed", reviewer names or credentials until a real clinician is engaged and the editorial policy is updated first.
- The `/editorial-policy/` page is the canonical statement of the review position. If the review process changes, update that page before any content page changes its disclosure.
- The Experience gate is deliberately strict: demoted records keep their source data but are marked `editorialStatus: noindex` and get no route, sitemap entry or hub link. `--write` never promotes a record; promotion stays an editorial decision.
- N3 page selection avoided topics already covered by a deeper page (`/comparisons/`, `/withdrawal/{symptom}/`, `/populations/`) to limit keyword cannibalisation. The remaining 102 questions keep one-paragraph answers on the hub; N15–N20 will split the next 30.
- N3 word counts are 970–1,161 per page, below the 1,200–1,800 Phase 3 target. The pages are complete (direct answer, key points, 5–6 sections, 8 FAQs, sources); expansion belongs with the N15–N20 batch rather than padding these now.
- Astro's static `redirects` generate meta-refresh stubs for hosts that do not read `_redirects`, `vercel.json` or `nginx.conf`; these stubs are `noindex` and excluded from the XML sitemap.
- N5 word count is measured on the Astro source after stripping frontmatter/markup (4,040); the rendered page is ≈4,400 words including navigation, sources and CTA. Pillar target for N5 is 4,000–5,000, so no padding was added. N6 is the withdrawal-timeline Pillar (3,500–4,500 words); it should reuse the timeline collection rather than duplicate it.
- N5 keeps the guideline and medication summaries at class level. It deliberately omits doses, titration schedules and injection instructions; those belong to prescribers and product labels, not to this site.
- N6 deliberately sits at `/withdrawal/timeline/` rather than replacing `/timeline/`. The two pages answer different queries: `/timeline/` is the recovery timeline (what repairs in the body, plus the community-reported half of each stage), while `/withdrawal/timeline/` is the symptom timeline (onset, peak, duration, what helps). The stage-map table on the new page renders `timeLabel` + `scienceSummary` from the existing `timeline` collection, so the stage records have one source of truth; the community-detail and per-stage prose stay on `/timeline/`. Both pages now cross-link and state the distinction.
- N6 word count: 4,347 words in the rendered `<main>` (3,897 in the Astro source before the data-driven table). The Pillar target is 3,500–4,500, so the page is at the top of the range without padding. The symptom-duration table carries 12 internal links that the withdrawal hub previously did not concentrate in one place.
- N6 closes the gap left by N3: `/questions/how-long-withdrawal-lasts/` now links up to the Pillar, so the short answer and the long answer reinforce each other instead of competing. If the Q&A is later expanded, keep the Pillar as the canonical long-form page.

## Rules

- 每次只执行 `docs/execution-plan-nightly-2026-11.md` 里的一个任务单元。
- 完成后更新本文件：任务、日期、commit、构建页数、下一任务。
- 07:30 前停止；未完成标为 `partial`，不要提交半成品。
