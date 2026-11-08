# Nightly Progress — SmokingCessationHub

Last updated: 2026-11-08
Current task: N2
Next task: N2
Status: ready

## Completed

| Task | Date | Commit | Build | Notes |
|---|---|---|---|---|
| N1 | 2026-11-08 | 2d19944 | 229 pages | 6 medication methods consolidated: `/medications/{slug}/` is canonical, `/methods/{slug}/` returns 301 on Netlify/Vercel/nginx and renders a noindex redirect stub elsewhere. Methods hub now lists 7 non-medication methods; sitemap has a separate 6-page medications section. Duplicate titles 0; broken internal links 0. |

## Blocked / Partial

| Task | Reason | Next action |
|---|---|---|
| — | — | — |

## Notes

- Pre-existing metadata debt remains for N4: 71 page titles over 60 characters, 124 meta descriptions over 170, 7 under 100. None are duplicate medication titles.
- Astro's static `redirects` generate meta-refresh stubs for hosts that do not read `_redirects`, `vercel.json` or `nginx.conf`; these stubs are `noindex` and excluded from the XML sitemap.

## Rules

- 每次只执行 `docs/execution-plan-nightly-2026-11.md` 里的一个任务单元。
- 完成后更新本文件：任务、日期、commit、构建页数、下一任务。
- 07:30 前停止；未完成标为 `partial`，不要提交半成品。
