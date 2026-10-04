# CONTENT-QUALITY.md — Quality Gates & Scoring

## 1. Content Quality Score (knowledge pages)

Each public page is scored 0–10 on:

| Dimension | What it measures |
|---|---|
| Originality | Original editorial content, not stitching or pseudo-original rewriting |
| Information Gain | Does it add new information beyond existing pages? |
| Evidence Quality | Are sources Tier 1/2, properly cited with labels? |
| Source Quality | Real sources, real DOIs/PMIDs — never fabricated |
| Experience Value | Does community material add real insight? |
| Specificity | Concrete, specific, not generic filler |
| Accuracy | Matches sources; no exaggeration |
| Uncertainty Handling | States what is unknown/uncertain |
| Internal Links | Connected into the knowledge graph |
| Search Intent Fit | Matches the stated search intent |
| AIO Readiness | Direct answer, evidence, uncertainty, related questions |
| Medical Safety | Passes the medical safety gate |

**Threshold: 8/10. Below threshold: DO NOT PUBLISH.**

## 2. Experience Quality Score (Experience Database)

Each structured experience is scored 0–10 on:

| Dimension | Notes |
|---|---|
| Specificity | Concrete details vs "day 3, still hard" |
| Timeline Detail | Dates/days/stages reported |
| Smoking History | How much is explicitly reported |
| Trigger Detail | Named triggers and contexts |
| Quit Method | Named method(s) |
| Outcome | Reported outcome |
| Relapse Detail | Trigger, context, aftermath |
| Long-Term Follow-up | Whether the person returned to report later |
| Clarity | Coherent, extractable |
| Privacy Safety | Fully de-identified, nothing risky |

**Minimum 6/10 to enter the public Experience Database.** Below that: internal
database only, marked `editorialStatus: noindex`.

## 3. Information Gain rule (anti-spam)

Before creating any public page, ask:

> Does this experience add new information?

- "Today is day 3 of my quit." → no new info → database only, NOINDEX.
- New trigger, new strategy, new relapse pattern, long-term follow-up, new method,
  unusual withdrawal report → candidate for a public page.

**Never** create programmatic day-1/day-2/day-3 pages. The Timeline page exists
precisely to serve that intent in one place. Create per-day pages only if the
data for that specific day is genuinely rich enough to stand alone.

## 4. Language rules

- Natural, professional, clear English.
- Non-judgmental: use "relapse", "return to smoking", "quit attempt", "recovery" —
  never "weak", "failure", "lack of willpower".
- No AI clichés: no "journey to wellness", "unlock your potential",
  "transform your life", "powerful journey".
- Structure: Information → Analysis → Evidence → Interpretation → Practical
  Implication → Limitations.

## 5. Statistics rules (insights / community-data pages)

Every statistic must show:
- sample size
- data source
- time range

And must state: "Community sample ≠ general population." Never extrapolate forum
samples to global smoker conclusions.

## 6. SEO anti-spam rules

- No daily AI article cadence.
- Entity + Question + Experience + Evidence structure, not keyword stuffing.
- No mechanical FAQ blocks that repeat questions/answers.
- No fabricated authors, medical reviewers or experts.
- Canonical tags correct, sitemap accurate, no duplicate content.

## 7. AIO citation-friendly structure

Each core topic page contains, near the top: a 40–80 word direct answer;
then key facts, evidence (labeled), community experience (labeled), what remains
uncertain, sources, related questions. Clear concept, conclusion, source,
evidence level, limitations, timeframe, population.
