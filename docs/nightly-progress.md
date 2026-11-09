# Nightly Progress — SmokingCessationHub

Last updated: 2026-11-09
Current task: N2
Next task: N3
Status: ready

## Completed

| Task | Date | Commit | Build | Notes |
|---|---|---|---|---|
| N1 | 2026-11-08 | 2d19944 | 229 pages | 6 medication methods consolidated: `/medications/{slug}/` is canonical, `/methods/{slug}/` returns 301 on Netlify/Vercel/nginx and renders a noindex redirect stub elsewhere. Methods hub now lists 7 non-medication methods; sitemap has a separate 6-page medications section. Duplicate titles 0; broken internal links 0. |
| N2 | 2026-11-09 | 0566a30 | 152 content pages (+6 redirect stubs) | Experience quality gate applied: published only records with `qualityScore >= 7`, complete provenance, a reported outcome and at least 3 structured detail fields, capped at 60. 133 published → 56 (169 records total; 111 noindex, 2 review). Sitemap has exactly 56 Experience URLs. New `scripts/experience-quality-gate.mjs` (`--check`/`--write`) runs as npm `prebuild`; hub shows 56 of 169 and documents the gate. Duplicate titles 0; broken internal links 0. |

## Blocked / Partial

| Task | Reason | Next action |
|---|---|---|
| — | — | — |

## Notes

- Metadata debt for N4 after the Experience gate: 35 page titles over 60 characters (32 on Experience pages), 70 meta descriptions over 170 (46 on Experience pages), 6 under 100. None are duplicate medication titles.
- The Experience gate is deliberately strict: demoted records keep their source data but are marked `editorialStatus: noindex` and get no route, sitemap entry or hub link. `--write` never promotes a record; promotion stays an editorial decision.
- Astro's static `redirects` generate meta-refresh stubs for hosts that do not read `_redirects`, `vercel.json` or `nginx.conf`; these stubs are `noindex` and excluded from the XML sitemap.

## Rules

- 每次只执行 `docs/execution-plan-nightly-2026-11.md` 里的一个任务单元。
- 完成后更新本文件：任务、日期、commit、构建页数、下一任务。
- 07:30 前停止；未完成标为 `partial`，不要提交半成品。
