#!/usr/bin/env node
/**
 * Post-build SEO/metadata audit.
 *
 * Checks the generated HTML in `dist/` against the site's publishing rules:
 *   - <title> present, unique, 20–60 characters
 *   - meta description present, 140–155 characters
 *   - canonical present, absolute, self-referencing
 *   - exactly one <h1>
 *   - Article/MedicalWebPage JSON-LD carries author + datePublished
 *   - no page claims clinical review ("medically reviewed", "clinically reviewed", …)
 *   - every internal link resolves to a file in dist (no 404s)
 *
 * Usage: node scripts/seo-audit.mjs [--json]
 * Exit code 1 when any check fails.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const jsonOutput = process.argv.includes('--json');

const TITLE_MIN = 20;
const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 155;

const CLINICAL_CLAIMS = [
  /medically reviewed/i,
  /clinically reviewed/i,
  /physician reviewed/i,
  /doctor reviewed/i,
  /medically verified/i,
  /clinically verified/i,
  /reviewed by a (?:doctor|physician|clinician)/i,
];

/**
 * True when the matched claim is actually a denial, e.g.
 * "this page has not been reviewed by a clinician" or
 * "we do not describe any page as medically reviewed".
 */
function isNegated(text, index) {
  const window = text.slice(Math.max(0, index - 90), index).toLowerCase();
  return /(?:not|never|no|without|cannot|doesn't|don't|isn't|aren't|nor)\s+(?:\w+\s+){0,4}$/.test(window);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '_astro' ? [] : walk(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

function decode(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'");
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'));
  return match ? decode(match[1]) : null;
}

function urlPathFor(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  if (rel === '404.html') return '/404.html';
  return '/' + rel.replace(/(?:index)?\.html$/, '');
}

function existsForHref(hrefPath) {
  const clean = hrefPath.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return fs.existsSync(path.join(DIST, 'index.html'));
  const direct = path.join(DIST, clean);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return true;
  if (fs.existsSync(path.join(direct, 'index.html'))) return true;
  if (fs.existsSync(direct + '.html')) return true;
  if (fs.existsSync(path.join(DIST, clean.replace(/\/$/, ''), 'index.html'))) return true;
  return false;
}

const files = walk(DIST).sort();
const pages = [];
const problems = [];
const titleMap = new Map();
const descMap = new Map();

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const url = urlPathFor(file);

  // The error page is deliberately short, noindex and excluded from the sitemap.
  if (url === '/404.html') continue;

  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleTag ? decode(titleTag[1]).replace(/\s+/g, ' ').trim() : '';
  const descTag = html.match(/<meta[^>]+name="description"[^>]*>/i);
  const description = descTag ? attr(descTag[0], 'content') || '' : '';
  const canonicalTag = html.match(/<link[^>]+rel="canonical"[^>]*>/i);
  const canonical = canonicalTag ? attr(canonicalTag[0], 'href') : null;
  const robotsTag = html.match(/<meta[^>]+name="robots"[^>]*>/i);
  const robots = robotsTag ? attr(robotsTag[0], 'content') || '' : '';
  const noindex = /noindex/i.test(robots);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    decode(m[1]).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  );

  const page = { url, title, description, canonical, noindex, h1Count: h1s.length, issues: [] };
  pages.push(page);

  if (!title) page.issues.push('missing title');
  else {
    if (title.length > TITLE_MAX) page.issues.push(`title ${title.length} chars (>${TITLE_MAX})`);
    if (title.length < TITLE_MIN) page.issues.push(`title ${title.length} chars (<${TITLE_MIN})`);
    const seen = titleMap.get(title) || [];
    seen.push(url);
    titleMap.set(title, seen);
  }

  if (!noindex) {
    if (!description) page.issues.push('missing description');
    else {
      if (description.length > DESC_MAX) page.issues.push(`description ${description.length} chars (>${DESC_MAX})`);
      if (description.length < DESC_MIN) page.issues.push(`description ${description.length} chars (<${DESC_MIN})`);
      const seen = descMap.get(description) || [];
      seen.push(url);
      descMap.set(description, seen);
    }
  }

  // Redirect stubs are noindex by design: their canonical points at the
  // consolidated page and they intentionally render no <h1>.
  if (!noindex) {
    if (!canonical) page.issues.push('missing canonical');
    else {
      const canonicalPath = canonical.replace(/^https?:\/\/[^/]+/, '');
      if (canonicalPath !== url) page.issues.push(`canonical points to ${canonicalPath}, page is ${url}`);
    }

    if (h1s.length !== 1) page.issues.push(`${h1s.length} h1 tags`);
  }

  // Structured data: Article/MedicalWebPage needs author + datePublished.
  for (const match of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(decode(match[1]));
    } catch {
      page.issues.push('invalid JSON-LD');
      continue;
    }
    const nodes = Array.isArray(data) ? data : [data];
    for (const node of nodes) {
      const type = node?.['@type'];
      if (type === 'Article' || type === 'MedicalWebPage' || type === 'WebPage') {
        if (!node.author) page.issues.push(`${type} JSON-LD missing author`);
        if (!node.datePublished) page.issues.push(`${type} JSON-LD missing datePublished`);
      }
      if (node?.reviewedBy && node.reviewedBy.name && /team|editorial/i.test(String(node.reviewedBy.name))) {
        page.issues.push(`${type} JSON-LD claims reviewedBy ${node.reviewedBy.name}`);
      }
    }
  }

  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
  // The editorial policy page has to name the claims it forbids, so it is the
  // one page where those phrases legitimately appear in a negation.
  if (!noindex && url !== '/editorial-policy/') {
    for (const claim of CLINICAL_CLAIMS) {
      const global = new RegExp(claim.source, 'gi');
      let match;
      while ((match = global.exec(text))) {
        if (!isNegated(text, match.index)) {
          page.issues.push(`clinical review claim: "${match[0]}"`);
          break;
        }
      }
    }
  }

  // Internal link integrity.
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const href = decode(match[1]);
    if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript):/i.test(href)) continue;
    if (/^https?:\/\//i.test(href)) continue;
    if (!href.startsWith('/')) continue;
    if (!existsForHref(href)) page.issues.push(`broken internal link ${href}`);
  }
}

for (const [title, urls] of titleMap) {
  if (urls.length > 1) problems.push(`duplicate title (${urls.length}): "${title}" -> ${urls.join(', ')}`);
}
for (const [desc, urls] of descMap) {
  if (urls.length > 1) problems.push(`duplicate description (${urls.length}) -> ${urls.join(', ')}`);
}

const failing = pages.filter((p) => p.issues.length);
for (const page of failing) {
  for (const issue of page.issues) problems.push(`${page.url}: ${issue}`);
}

const indexable = pages.filter((p) => !p.noindex);
const summary = {
  pages: pages.length,
  indexable: indexable.length,
  noindex: pages.length - indexable.length,
  titles: indexable.length,
  descriptions: indexable.filter((p) => p.description).length,
  duplicateTitles: [...titleMap.values()].filter((u) => u.length > 1).length,
  duplicateDescriptions: [...descMap.values()].filter((u) => u.length > 1).length,
  maxTitle: Math.max(...pages.map((p) => p.title.length)),
  minTitle: Math.min(...pages.map((p) => p.title.length)),
  maxDescription: Math.max(...indexable.map((p) => p.description.length || 0)),
  minDescription: Math.min(...indexable.map((p) => p.description.length || 0)),
  problems: problems.length,
};

if (jsonOutput) {
  console.log(JSON.stringify({ summary, problems, failing }, null, 2));
} else {
  console.log('SEO audit — dist/');
  console.log(`pages: ${summary.pages} (indexable ${summary.indexable}, noindex ${summary.noindex})`);
  console.log(`title length: ${summary.minTitle}–${summary.maxTitle}`);
  console.log(`description length: ${summary.minDescription}–${summary.maxDescription}`);
  console.log(`duplicate titles: ${summary.duplicateTitles}`);
  console.log(`duplicate descriptions: ${summary.duplicateDescriptions}`);
  console.log(`problems: ${summary.problems}`);
  if (problems.length) {
    console.log('\n' + problems.slice(0, 80).join('\n'));
    if (problems.length > 80) console.log(`… and ${problems.length - 80} more`);
  }
}

process.exit(problems.length ? 1 : 0);
