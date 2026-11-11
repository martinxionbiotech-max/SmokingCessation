/**
 * Metadata length helpers.
 *
 * The site has to publish page titles within 60 characters and meta
 * descriptions within 140–155 characters. Source records (community
 * experiences, questions, medication summaries) are written for readers, not
 * for SERP limits, so the templates clamp them at render time instead of
 * storing a second, shorter copy of every text in the data files.
 *
 * The helpers never invent facts: they only shorten the supplied text, or —
 * for descriptions that are too short — append a caller-supplied disclosure
 * sentence (for example "Educational information only, not medical advice.").
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 140;
export const DESCRIPTION_MAX = 155;

export const DISCLOSURE_TAIL = ' Educational information only, not medical advice.';
export const COMMUNITY_TAIL = ' Community-reported account, not medical advice.';

const STOPWORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'but',
  'by',
  'for',
  'from',
  'in',
  'into',
  'is',
  'its',
  'of',
  'on',
  'or',
  'that',
  'the',
  'their',
  'then',
  'these',
  'this',
  'those',
  'to',
  'was',
  'were',
  'which',
  'who',
  'with',
]);

function normalize(text: string): string {
  return String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

function dropTrailingNoise(words: string[]): string[] {
  const out = [...words];
  while (out.length > 1) {
    const last = out[out.length - 1].replace(/[,;:—–-]+$/, '');
    if (!last) {
      out.pop();
      continue;
    }
    if (STOPWORDS.has(last.toLowerCase())) {
      out.pop();
      continue;
    }
    break;
  }
  return out;
}

function tidyEnd(text: string): string {
  return text
    .replace(/[\s,;:—–-]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Clamp a page title to `max` characters at a word boundary.
 * Trailing conjunctions, prepositions and dangling punctuation are dropped so
 * the result reads as a phrase rather than a chopped sentence.
 */
export function seoTitle(text: string, max: number = TITLE_MAX): string {
  const value = normalize(text);
  if (!value) return '';
  if (value.length <= max) return tidyEnd(value);

  // Prefer a clause boundary: a title cut after a colon or dash reads as a
  // phrase, while a bare word-boundary cut often strands a qualifier.
  let clause: string | null = null;
  for (const re of [/[:—–]/g, /,(?=\s)/g]) {
    let match: RegExpExecArray | null;
    while ((match = re.exec(value))) {
      const end = match.index;
      if (end <= max && end >= 28) clause = value.slice(0, end);
      if (end > max) break;
    }
    if (clause) break;
  }
  if (clause) {
    const candidate = tidyEnd(dropTrailingNoise(clause.split(' ')).join(' '));
    if (candidate.length >= 28) return candidate;
  }

  const words = value.split(' ');
  const kept: string[] = [];
  for (const word of words) {
    const candidate = [...kept, word].join(' ');
    if (candidate.length > max) break;
    kept.push(word);
  }

  if (!kept.length) return value.slice(0, max).trim();

  const trimmed = tidyEnd(dropTrailingNoise(kept).join(' '));
  if (trimmed.length >= 20) return trimmed;

  // Very short result (long words early in the string): fall back to a hard cut.
  return tidyEnd(value.slice(0, max));
}

function sentenceCut(value: string, min: number, max: number): string | null {
  // Prefer a real sentence boundary inside the window.
  let best: string | null = null;
  const sentence = /[.!?](?=\s|$)/g;
  let match: RegExpExecArray | null;
  while ((match = sentence.exec(value))) {
    const end = match.index + 1;
    if (end >= min && end <= max) best = value.slice(0, end);
    if (end > max) break;
  }
  if (best) return best;

  // Then a clause boundary.
  const clause = /[;:](?=\s)/g;
  best = null;
  while ((match = clause.exec(value))) {
    const end = match.index + 1;
    if (end >= min && end <= max) best = value.slice(0, end);
    if (end > max) break;
  }
  if (best) return best;

  const dash = /\s—\s/g;
  best = null;
  while ((match = dash.exec(value))) {
    const end = match.index;
    if (end >= min && end <= max) best = value.slice(0, end);
    if (end > max) break;
  }
  if (best) return best;

  const comma = /,(?=\s)/g;
  best = null;
  while ((match = comma.exec(value))) {
    const end = match.index;
    if (end >= min && end <= max) best = value.slice(0, end);
    if (end > max) break;
  }
  if (best) return best;

  return null;
}

/**
 * Truncate a description to `max` characters without restructuring it.
 *
 * Used as a layout-level guard: text that is already inside the window is
 * returned untouched, and only over-long text is cut — at a sentence or clause
 * boundary near the end, never at an early one, so a 200-character description
 * does not collapse into its first short sentence.
 */
export function clampDescriptionMax(text: string, max: number = DESCRIPTION_MAX): string {
  const value = normalize(text);
  if (value.length <= max) return value;

  // Keep the cut inside the publishing window: a boundary below 140 would
  // produce a description that is too short, so drop to a word-boundary cut.
  const floor = Math.floor(max * 0.9);
  const cut = sentenceCut(value, floor, max);
  if (cut) {
    const tidy = tidyEnd(cut);
    if (/[.!?]$/.test(tidy)) return tidy;
    if (tidy.length + 1 <= max) return `${tidy}.`;
  }

  const words = value.split(' ');
  const kept: string[] = [];
  for (const word of words) {
    const candidate = [...kept, word].join(' ');
    if (candidate.length > max) break;
    kept.push(word);
  }
  const result = tidyEnd(dropTrailingNoise(kept).join(' ')) || value.slice(0, max).trim();
  return result.replace(/[.,;:—–-]+$/, '');
}

/**
 * Clamp a meta description into the 140–155 character window.
 * Too-long text is cut at a sentence, clause, dash or comma boundary inside the
 * window; too-short text gets the supplied disclosure tail appended first.
 */
export function seoDescription(
  text: string,
  options: { min?: number; max?: number; tail?: string } = {}
): string {
  const min = options.min ?? DESCRIPTION_MIN;
  const max = options.max ?? DESCRIPTION_MAX;
  const tail = options.tail ?? DISCLOSURE_TAIL;

  let value = normalize(text).replace(/\s+([.,;:])/g, '$1');

  if (value.length < min && tail) {
    value = normalize(value + tail);
  }

  if (value.length <= max) {
    if (value.length >= min) return value;
    // Still too short and no usable tail: hard-pad with a neutral phrase.
    const pad = normalize(value + DISCLOSURE_TAIL);
    return pad.length <= max ? pad : value;
  }

  const cut = sentenceCut(value, min, max);
  if (cut) {
    const tidy = tidyEnd(cut);
    if (/[.!?]$/.test(tidy)) return tidy.length <= max ? tidy : tidy.slice(0, max);
    if (tidy.length + 1 <= max) return `${tidy}.`;
  }

  // Word boundary inside the window.
  const words = value.split(' ');
  const kept: string[] = [];
  for (const word of words) {
    const candidate = [...kept, word].join(' ');
    if (candidate.length > max - 1) break;
    kept.push(word);
  }
  let result = tidyEnd(dropTrailingNoise(kept).join(' '));
  if (!result) result = value.slice(0, max - 1).trim();
  result = result.replace(/[.,;:—–-]+$/, '');
  return `${result}.`;
}
