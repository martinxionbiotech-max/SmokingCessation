#!/usr/bin/env node
/**
 * Experience quality gate.
 *
 * N2 rule (docs/execution-plan-nightly-2026-11.md):
 *   - only records with qualityScore >= 7 are published;
 *   - provenance and outcome fields must be present;
 *   - at least 3 structured detail fields must be reported;
 *   - the public, indexable set is capped at 60 records.
 *
 * Usage:
 *   node scripts/experience-quality-gate.mjs --check   validate the published set (CI/build gate)
 *   node scripts/experience-quality-gate.mjs --write   demote records that fail the gate
 *
 * `--write` never promotes a record. It only turns `published` into `noindex`
 * when a record fails the gate or falls outside the 60-page cap, so the gate is
 * idempotent and human review stays authoritative for promotion.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/data/experiences';
const MIN_SCORE = 7;
const MAX_INDEXABLE = 60;
const MIN_DETAIL_FIELDS = 3;

const CORE_FIELDS = ['title', 'summary', 'sourcePlatform', 'publishedDate'];
const DETAIL_FIELDS = [
  'quitMethod',
  'trigger',
  'craving',
  'behavior',
  'emotionalState',
  'physicalSymptoms',
  'recoveryStage',
  'lessons',
  'motivation',
  'strategy',
  'intervention',
  'reportedChanges',
  'positiveChanges',
  'negativeChanges',
  'relapse',
];

const NOT_REPORTED = new Set(['', 'none', 'unknown', 'n/a', 'no', 'not reported']);

function isSubstantive(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (Array.isArray(value)) return value.some(isSubstantive);
  const text = String(value).trim().toLowerCase();
  if (NOT_REPORTED.has(text)) return false;
  return !text.startsWith('not reported');
}

function readRecord(file) {
  const raw = readFileSync(file, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Missing JSON frontmatter: ${file}`);
  return { file, raw, data: JSON.parse(match[1]) };
}

function evaluate(data) {
  const score = Number.isFinite(Number(data.qualityScore)) ? Number(data.qualityScore) : -1;
  const missingCore = CORE_FIELDS.filter((key) => !isSubstantive(data[key]));
  const details = DETAIL_FIELDS.filter((key) => isSubstantive(data[key]));
  const outcomeReported = isSubstantive(data.outcome);
  const passes =
    score >= MIN_SCORE && missingCore.length === 0 && outcomeReported && details.length >= MIN_DETAIL_FIELDS;
  return { score, missingCore, details, outcomeReported, passes };
}

function rank(a, b) {
  return (
    b.evaluation.score - a.evaluation.score ||
    b.evaluation.details.length - a.evaluation.details.length ||
    a.data.experienceId.localeCompare(b.data.experienceId)
  );
}

function load() {
  return readdirSync(DIR)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .sort()
    .map((name) => {
      const record = readRecord(join(DIR, name));
      return { ...record, evaluation: evaluate(record.data) };
    });
}

function statusOf(record) {
  return record.data.editorialStatus || 'published';
}

function printSummary(records) {
  const published = records.filter((r) => statusOf(r) === 'published');
  const noindex = records.filter((r) => statusOf(r) === 'noindex');
  const review = records.filter((r) => statusOf(r) === 'review');
  const failing = published.filter((r) => !r.evaluation.passes);
  const scored = published.reduce((acc, r) => {
    acc[r.evaluation.score] = (acc[r.evaluation.score] || 0) + 1;
    return acc;
  }, {});

  console.log(`Experience records: ${records.length}`);
  console.log(`  published: ${published.length}`);
  console.log(`  noindex:   ${noindex.length}`);
  console.log(`  review:    ${review.length}`);
  console.log(`  published scores: ${JSON.stringify(scored)}`);
  console.log(`  gate: score >= ${MIN_SCORE}, core fields, outcome, >= ${MIN_DETAIL_FIELDS} detail fields`);
  console.log(`  cap: ${MAX_INDEXABLE} indexable experiences`);

  if (failing.length > 0) {
    console.error(`\nFAIL: ${failing.length} published record(s) below the gate:`);
    for (const record of failing) {
      const reasons = [];
      if (record.evaluation.score < MIN_SCORE) reasons.push(`score ${record.evaluation.score}`);
      if (record.evaluation.missingCore.length) reasons.push(`missing ${record.evaluation.missingCore.join(', ')}`);
      if (!record.evaluation.outcomeReported) reasons.push('no outcome');
      if (record.evaluation.details.length < MIN_DETAIL_FIELDS) {
        reasons.push(`${record.evaluation.details.length} detail fields`);
      }
      console.error(`  ${record.data.experienceId}: ${reasons.join('; ')}`);
    }
  }

  if (published.length > MAX_INDEXABLE) {
    console.error(`\nFAIL: ${published.length} published records exceeds the ${MAX_INDEXABLE} cap.`);
  }

  return failing.length === 0 && published.length <= MAX_INDEXABLE;
}

const mode = process.argv.includes('--write') ? 'write' : 'check';
const records = load();

if (mode === 'check') {
  const ok = printSummary(records);
  if (!ok) process.exit(1);
  console.log('\nPASS: published experience set is within the quality gate.');
} else {
  const published = records.filter((r) => statusOf(r) === 'published');
  const pass = published.filter((r) => r.evaluation.passes).sort(rank);
  const keep = new Set(pass.slice(0, MAX_INDEXABLE).map((r) => r.data.experienceId));
  const demote = published.filter((r) => !keep.has(r.data.experienceId));

  for (const record of demote) {
    const next = record.raw.replace(/("editorialStatus"\s*:\s*")[a-z]+(")/, '$1noindex$2');
    if (next === record.raw) throw new Error(`Could not update editorialStatus: ${record.file}`);
    writeFileSync(record.file, next, 'utf-8');
    console.log(
      `noindex ${record.data.experienceId} (score ${record.evaluation.score}, ` +
        `${record.evaluation.details.length} detail fields)`
    );
  }

  console.log(`\nDemoted ${demote.length} record(s); ${keep.size} remain published.`);
  printSummary(load());
}
