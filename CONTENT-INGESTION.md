# CONTENT-INGESTION.md — Agent Content Processing Pipeline

This is the mandatory pipeline for any agent ingesting new community content
(e.g. from the Baidu Quit Smoking forum). Deviating from this pipeline is not allowed.

## The 20-step pipeline

### 1. Read the raw content
Read the original post/thread fully. Do not skim titles.

### 2. Relevance check
Is this relevant to smoking cessation? If the post is off-topic, spam or
promotional, discard it.

### 3. Privacy filtering
Locate and mark all identifying information: usernames, avatars, UIDs, QQ/WeChat
handles, emails, phone numbers, real names, workplace names, distinctive personal events.

### 4. Remove identity information
Delete all marked items. Where a detail is needed for context (e.g. workplace
smoking culture), generalize it ("a construction site" instead of a named company).

### 5. Remove unnecessary content
Strip sexual, violent, abusive, promotional or otherwise irrelevant material.

### 6. Extract structured experience
Map remaining content to the experience schema (see DATA-MODEL.md). Only fields
the person explicitly stated are filled. Everything else is `Not reported`.

### 7. Duplicate check
Compare against existing records by content similarity (same story, same person,
same event). Merge or skip duplicates.

### 8. Check existing experience records
Query the database for similar experiences to aid deduplication and pattern detection.

### 9. Identify dimensions
Tag the record with: Trigger, Craving, Quit Method, Withdrawal, Relapse,
Recovery Stage, Outcome.

### 10. Insert into Experience Database
Add the structured record with provenance (source_platform, source_date —
internal only; source_url is never published).

### 11. New Community Pattern?
Does this experience (alone or with others) form a new pattern? If multiple
independent reports show the same phenomenon, propose a pattern.

### 12. Update existing patterns?
If an existing pattern gains new relevant experiences, update its
`numberOfRelevantExperiences` and any changed contexts/strategies/contradictions.

### 13. Find related scientific evidence
Search Tier 1/2 sources (WHO, CDC, NIH, PubMed, Cochrane, guidelines) for
evidence on the topics this experience touches.

### 14. Classify evidence relationship
One of:
- Evidence supports the community observation
- Evidence contradicts it
- Evidence is unclear
- No evidence found

### 15. Generate original English content
Write original English editorial content from the structured record. Never
verbatim-translate posts. No AI clichés. Information → Analysis → Evidence →
Interpretation → Practical Implication → Limitations.

### 16. Build internal links
Link Experience → Trigger, Method, Timeline, Relapse, Research; and back
(Trigger → Experiences, Question → Research/Experiences, Research → Patterns).

### 17. SEO quality check
Title/description, search intent match, information gain, no programmatic
day-1/day-2 spam pages, canonical, no duplicate content.

### 18. AIO check
Direct 40–80 word answer at top, key facts, evidence, community experience,
uncertainty, sources, related questions. No mechanical FAQ spam.

### 19. Medical safety check
Run the MEDICAL-SAFETY.md gate. Any page touching medications, pregnancy,
mental health, cardiovascular/respiratory disease, cancer or interactions
enters the Medical Review Queue unless it passes the safe-framing rules.

### 20. Publish or review queue
Publish only if: quality score ≥ threshold, privacy verified, evidence labels
present, internal links done, medical gate passed. Otherwise: review queue.

## Hard prohibitions

- No fabricated experiences, data, studies, DOIs, PMIDs, experts, statistics.
- No verbatim copying or wholesale translation of forum posts.
- No publishing usernames/UIDs/contact details/real names.
- No turning one person's experience into a population claim.
- No turning community observations into medical conclusions.
- No turning correlation into causation.
- No turning medication information into personal prescriptions.
- No stitching search results into pseudo-original articles.

## Provenance rules

- `source_platform` and `source_date` are stored internally.
- `source_url` is internal only — never published, never exposed in HTML or JSON-LD.
- Published pages say: "This page summarizes a community-reported personal
  experience. It does not constitute medical advice or scientific evidence."
