# DATA-MODEL.md — Data Schemas & Knowledge Graph

This document defines the structured data layer of Quit Smoking Hub. All schemas are
enforced in `src/content.config.ts` (Astro content collections) and mirrored in the
data site's structured records.

## 1. Entity model (Knowledge Graph)

```
Smoker
  ↓ has
Smoking History        (years_smoking, cigarettes_per_day, age_started, quit_attempts)
  ↓ makes
Quit Attempt
  ↓ uses
Quit Method            (cold turkey, NRT, varenicline, bupropion, cytisine, counseling…)
  ↓ produces
Withdrawal             (cravings, irritability, sleep, concentration, appetite, mood, cough)
  ↓ encounters
Trigger                (coffee, alcohol, stress, driving, social events…)
  ↓ experiences
Craving
  ↓ responds with
Intervention / Strategy
  ↓ yields
Outcome                (abstinent / lapse / relapse)
  ↓ may enter
Relapse                (trigger, context, emotional state, lessons)
  ↓ leads to
Recovery               (stage, day, timeline position)
```

Cross-entity relations:

```
Trigger → Community Pattern → Scientific Evidence
Question → Experience → Evidence
Experience → Trigger / Method / Timeline / Relapse / Research
```

## 2. Core schemas

### experience (Experience Database)
| Field | Type | Rules |
|---|---|---|
| experienceId | string | stable id |
| sourcePlatform / sourceUrl / sourceDate | string | provenance; sourceUrl internal only |
| publishedDate | date | publication date |
| ageGroup / gender | string? | only if explicitly reported |
| yearsSmoking / cigarettesPerDay / quitAttemptNumber | string? | reported text or "Not reported" — never estimated |
| quitMethod | string[] | one or more |
| quitDate / recoveryDay / recoveryStage | string?/number?/string? | reported values |
| motivation / craving / emotionalState / behavior / intervention / strategy | string? | free text from report |
| trigger / physicalSymptoms | string[] | tag-style |
| medicationReported / nicotineReplacementReported | string? | only what the person reported |
| outcome | string? | reported outcome |
| relapse / relapseTrigger | boolean?/string? | relapse flag + reported trigger |
| reportedChanges / positiveChanges / negativeChanges / lessons / uncertainties | string? | synthesis |
| evidenceStatus | enum | community-report / pattern-supported / evidence-aligned / evidence-mixed |
| privacyStatus | enum | de-identified / needs-review |
| qualityScore | number 0–10 | experience quality (see CONTENT-QUALITY.md) |
| confidenceLevel | enum | low / medium / high |
| editorialStatus | enum | published / review / noindex |

### research (Research Database)
researchId, title, authors, year, journal, doi, pmid, researchType
(Systematic Review | Meta-analysis | RCT | Clinical Guideline | Cohort Study |
Observational Study | Review | Public Health Report), population, sampleSize, method,
mainQuestion, mainFindings, limitations, evidenceStrength
(Strong | Moderate | Limited | Mixed | Insufficient), clinicalRelevance,
relatedTopics, sourceUrl, lastVerified.

**Never fabricate DOIs or PMIDs.** Empty fields stay empty.

### trigger
slug, title, summary, definition, communityReports, reportedContexts, scientificEvidence,
evidenceStrength, practicalStrategies, limitations.

### method
slug, title, category, summary, whatItIs, howItWorks, evidence, evidenceStrength,
reportedCommunityExperiences, practicalConsiderations, limitations, medicationWarning.

### withdrawal
slug, title, summary, whatScienceSays, whatPeopleReport, typicalUncertainty,
howPeopleManage, evidenceSupportedApproaches, whenToSeekMedicalAdvice.

### relapse
slug, title, summary, situation, trigger, timeContext, emotionalState, socialEnvironment,
alcoholUse, previousQuitDuration, interventionAttempted, outcome, reasonReported,
whatHappenedAfter, lessons, evidenceContext.

### timeline
slug, title, timeLabel, scienceSummary, scienceDetail, communitySummary, communityDetail,
evidenceStrength, sources.

### pattern (Community Pattern Engine)
slug, title, observedPattern, numberOfRelevantExperiences, commonContexts,
reportedStrategies, contradictoryExperiences, scientificEvidence, possibleExplanations,
whatWeDoNotKnow, practicalTakeaways.

### question
slug, question, shortAnswer (40–80 words), fullAnswer, evidence, communityExperience,
uncertainty, relatedTopics, searchIntent
(INFORMATIONAL | PROBLEM | SOLUTION | COMPARISON | EXPERIENCE | TIMELINE | RELAPSE |
MEDICAL | COMMERCIAL).

## 3. Smoking History profiles

Only explicitly reported information is recorded. Profile dimensions: years smoking,
cigarettes per day, age started, previous quit attempts, smoking type (cigarettes,
hand-rolled, social, heavy, long-term). Every dimension accepts "Not reported".

## 4. Evidence labels (Evidence Matrix)

| Label | Meaning |
|---|---|
| Strong Evidence | multiple high-quality trials/reviews agree |
| Moderate Evidence | good evidence, some uncertainty |
| Limited Evidence | few or small studies |
| Mixed Evidence | studies disagree |
| Insufficient Evidence | no adequate studies |
| Community Report Only | experience reports, not evidence |

## 5. Statistics rules (community-data / insights pages)

- Always show sample size, data source, time range.
- Always state: "Community sample ≠ general population."
- Never extrapolate forum samples to global smoker conclusions.
