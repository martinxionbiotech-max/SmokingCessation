/**
 * Shared Schema.org fragments.
 *
 * The site does not have a named clinical reviewer, so no page may claim
 * `reviewedBy` for a person or imply clinical sign-off. What it can state
 * honestly is who authored the page, when it was first published and when it
 * was last edited.
 */

export const ORGANIZATION_NAME = 'SmokingCessationHub Editorial Team';

/** Date the current content set was first published on this domain. */
export const CONTENT_PUBLISHED = '2026-10-04';

/** Date of the N4 metadata/editorial-policy pass. */
export const CONTENT_UPDATED = '2026-11-11';

export function siteUrl(site: unknown): string {
  return String(site ?? '').replace(/\/$/, '');
}

export function organizationRef(site: unknown) {
  return { '@id': `${siteUrl(site)}/#organization` };
}

export function authorRef(site: unknown) {
  return {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: `${siteUrl(site)}/about/`,
  };
}

export function dateFields(published?: string, modified?: string) {
  // Schema.org expects ISO 8601 dates. Several source records store a
  // human-readable label such as "October 2026"; those must not be copied into
  // JSON-LD, so fall back to the site content date instead.
  const iso = (value?: string) => (value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined);
  const publishedDate = iso(published) || CONTENT_PUBLISHED;
  return {
    datePublished: publishedDate,
    dateModified: iso(modified) || publishedDate,
  };
}
