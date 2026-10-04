# GSC Search-Term Mining — Observation Period Checklist

> Status: **BLOCKED on user GSC submission.** This file is the execution checklist to
> run once Google Search Console data (queries + pages) is provided. It replaces the
> planned "GSC search-term mining" build topic for the 2026-09-29 12:05 run, which
> cannot be executed without the underlying data.

## Why this is blocked

Search-term mining requires actual query/impression/click data from Google Search
Console. That data lives only in the user's GSC account and has not been submitted.
No search terms can be mined — and per the no-fabrication rule, none will be
invented.

## What to request from the user

1. **GSC Performance export** — full queries table (Queries, Clicks, Impressions,
   CTR, Average position) for the site, last 3–6 months, CSV or screenshot.
2. **Pages export** — Pages table (Clicks, Impressions, CTR, Position).
3. **Coverage report** — any indexed / excluded / error statuses.
4. Optionally: **sitemap status** and which sitemap URLs are indexed.

## Execution steps once data arrives

1. **Import** the queries table and filter out brand terms
   (`xuanbao`, `萱宝`, `盐城萱宝`).
2. **Cluster non-brand queries** by intent: material (activated carbon / zeolite /
   SCR / CO catalyst / VOC catalyst), pollutant (NOx / CO / VOC / BTEX / H₂S),
   application (sintering / incineration / coating / printing), and geography.
3. **Match to existing pages** — main site + data.xuanbaoenvironment.com KB. Flag
   high-impression queries with no matching page as content gaps.
4. **Prioritize** by impressions × position (high impression, weak position =
   low-hanging fruit; high impression, no page = new page candidate).
5. **Map candidates** against the no-duplication rule: main site = "what Xuanbao
   provides", KB = "how it works".
6. **Propose** the top 5–10 new pages / enhancements with target keywords, then
   execute under the standard build → QA → commit → push discipline.

## Output template for the eventual report

| Query | Impressions | CTR | Position | Matched page | Action |
| --- | --- | --- | --- | --- | --- |
| (from GSC) | | | | (existing URL or —) | (optimize / new page / leave) |

## Notes

- No search terms are listed in this file because none have been provided — this
  file intentionally contains no fabricated data.
- Revisit when the user submits GSC exports; the run is the checklist above.
