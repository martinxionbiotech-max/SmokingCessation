# Nightly Progress — SmokingCessationHub

Last updated: 2026-11-11
Current task: N4
Next task: N5
Status: ready

## Completed

| Task | Date | Commit | Build | Notes |
|---|---|---|---|---|
| N1 | 2026-11-08 | 2d19944 | 229 pages | 6 medication methods consolidated: `/medications/{slug}/` is canonical, `/methods/{slug}/` returns 301 on Netlify/Vercel/nginx and renders a noindex redirect stub elsewhere. Methods hub now lists 7 non-medication methods; sitemap has a separate 6-page medications section. Duplicate titles 0; broken internal links 0. |
| N2 | 2026-11-09 | 0566a30 | 152 content pages (+6 redirect stubs) | Experience quality gate applied: published only records with `qualityScore >= 7`, complete provenance, a reported outcome and at least 3 structured detail fields, capped at 60. 133 published → 56 (169 records total; 111 noindex, 2 review). Sitemap has exactly 56 Experience URLs. New `scripts/experience-quality-gate.mjs` (`--check`/`--write`) runs as npm `prebuild`; hub shows 56 of 169 and documents the gate. Duplicate titles 0; broken internal links 0. |
| N3 | 2026-11-10 | a6d5ae6 | 162 content pages (+6 redirect stubs) | Split the top 10 questions into `/questions/{slug}/` pages (970–1,161 words each; 8 FAQs; 5–6 sections; sources; explicit "not been reviewed by a clinician" note). The hub is now an index: 10 featured cards plus a compact 112-question list with short answers. The 112-question FAQPage was removed; each detail page emits its own 8-item FAQPage. HTML sitemap has a Questions section (10 entries). Duplicate titles 0; broken internal links 0. |
| N4 | 2026-11-11 | 1415a37 | 163 content pages (+6 redirect stubs) | Metadata + schema + review disclosure pass. Every indexable page: title 20–60 chars, description 140–155, self-referencing canonical, exactly one H1, duplicate titles/descriptions 0. New `src/utils/seo.ts` clamps at render time (`seoTitle`, `seoDescription`, `clampDescriptionMax`) so future content cannot exceed the limits; three Experience titles were shortened in the data instead of relying on truncation. New `/editorial-policy/` page (source hierarchy, corrections, AI-assistance disclosure, explicit "no clinician has reviewed this page") linked from header, footer and HTML sitemap. `ReviewStatement` on every content page states the page "has not been reviewed by a clinician" — the site never uses "medically reviewed". JSON-LD: author + datePublished on Article/MedicalWebPage/WebPage, self-referential `reviewedBy` removed, non-ISO review labels no longer leak into `dateModified`, duplicate BreadcrumbList output removed (nav component already emits it). New `scripts/seo-audit.mjs` (`npm run audit:seo`): 169 HTML files, 163 indexable, 0 problems. |

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

## Rules

- 每次只执行 `docs/execution-plan-nightly-2026-11.md` 里的一个任务单元。
- 完成后更新本文件：任务、日期、commit、构建页数、下一任务。
- 07:30 前停止；未完成标为 `partial`，不要提交半成品。
