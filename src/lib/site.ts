// Site-wide constants. Change these to reuse the template for another product.
export const SITE = {
  name: 'Specstride',
  url: 'https://specstride.ai',
  title: 'Specstride: from specs to tested code',
  description:
    'Specstride drives your coding agent through a Spec Kit feature phase by phase. Nothing advances until a critic approves it on cited evidence. Open source, runs on your machine, your models.',
  tagline: 'From specs to tested code.',
  caption: 'Every step, signed off.',
  repo: 'mairp/specstride',
  repoUrl: 'https://github.com/mairp/specstride',
  siteRepoUrl: 'https://github.com/mairp/specstride.ai',
  licenseUrl: 'https://github.com/mairp/specstride/blob/main/LICENSE',
  discussionsUrl: 'https://github.com/mairp/specstride/discussions',
  copyright: 'Marlon De Paz',
  productLicense: 'Apache-2.0',
  siteLicense: 'MIT',
} as const;

export const NAV = [
  { href: '/install/', label: 'Install' },
  { href: '/ecosystem/', label: 'Ecosystem' },
  { href: '/docs/', label: 'Docs' },
] as const;

export type Status = 'available' | 'in-progress' | 'planned';

/** The site shows only what ships today. Entries with another status stay in the
 *  data and render nowhere; set `status: available` when one is released. */
export const isAvailable = (e: { data: { status: Status } }) => e.data.status === 'available';
