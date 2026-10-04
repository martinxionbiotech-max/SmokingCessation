# Quit Smoking Hub — Smoking Cessation Knowledge & Experience Platform

A structured, evidence-aware knowledge and experience platform for people trying to quit
smoking and understand nicotine dependence, withdrawal, relapse and evidence-based cessation
strategies.

**Not a blog. Not a translation of forum posts. Not a programmatic SEO farm.**

The platform turns real community quit experiences into a structured, de-identified,
de-duplicated, English editorial experience database, and pairs it with an independently
verified scientific evidence library — forming a Smoking Cessation Knowledge Graph.

## Repositories

| Repo | Site | Stack |
|---|---|---|
| `SmokingCessation` (this repo) | main site | Astro 7 + Tailwind v4 + Content Collections |
| `data.SmokingCessation` | data site | MkDocs Material |

## Four content levels

1. **Personal Experience** — one person's report ("A community member reported…"). Never "This proves…".
2. **Community Pattern** — when multiple independent experiences show the same phenomenon.
3. **Scientific Evidence** — WHO, CDC, NIH, PubMed, Cochrane, systematic reviews, clinical guidelines.
4. **Clinical Professional Information** — medication and medical topics, framed as information only, never prescription.

## Directory map (main site)

```
/
├── start/            Start Here
├── quit-smoking/     How to Quit Smoking
├── withdrawal/       Nicotine Withdrawal (+ 8 symptom pages)
├── cravings/         Cravings
├── triggers/         Smoking Triggers (15+ trigger pages)
├── relapse/          Relapse & Recovery
├── experiences/      Real Quit Experiences (Experience Database)
├── methods/          Quit Methods (13+ method pages)
├── medications/      Quit Smoking Medications (NRT, varenicline, bupropion, cytisine)
├── timeline/         Quit Smoking Timeline (science vs community, 13 stages)
├── questions/        Popular Questions (direct answers + FAQPage schema)
├── tools/            Quit Tools
├── research/         Research Highlights
├── patterns/         Community Patterns
├── about/            About
├── methodology/      Methodology
├── disclaimer/       Medical Disclaimer
└── privacy/          Privacy Policy
```

## Content collections

All collections live under `src/data/` with schemas in `src/content.config.ts`:

| Collection | Purpose |
|---|---|
| `experience` | Structured, de-identified quit experiences (Experience Database) |
| `research` | Research records with DOI/PMID, population, findings, evidence strength |
| `trigger` | Smoking triggers (definition, community reports, evidence, strategies) |
| `method` | Quit methods (evidence strength, community experiences, limitations) |
| `withdrawal` | Withdrawal symptoms (science vs reports, management, when to seek help) |
| `relapse` | Relapse case records (context, trigger, outcome, lessons) |
| `timeline` | Timeline stages (science timeline vs community timeline) |
| `pattern` | Community patterns (observed pattern, evidence count, unknowns) |
| `question` | Questions (short answer, evidence, uncertainty, search intent) |

## Key governance documents

- [DATA-MODEL.md](DATA-MODEL.md) — schemas and knowledge graph structure
- [CONTENT-INGESTION.md](CONTENT-INGESTION.md) — the 20-step agent ingestion pipeline
- [CONTENT-QUALITY.md](CONTENT-QUALITY.md) — content and experience quality scoring
- [MEDICAL-SAFETY.md](MEDICAL-SAFETY.md) — medical safety gate rules

## Build

```bash
npm install
npm run build   # static output in dist/
```

## Hard rules (non-negotiable)

- No fabricated experiences, data, studies, DOIs, PMIDs, experts or statistics.
- No verbatim copying or wholesale translation of forum posts.
- No usernames, avatars, UIDs, contact details or real names.
- Community reports ≠ scientific evidence. Correlation ≠ causation.
- Medication information ≠ prescription. No dosing advice, ever.
- Unreported fields are "Not reported" — never estimated.
