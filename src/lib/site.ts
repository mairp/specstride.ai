// Site-wide constants. Change these to reuse the template for another product.
export const SITE = {
  name: 'Specstride',
  url: 'https://specstride.ai',
  title: 'Specstride: development governance for coding agents',
  description:
    'Specstride is a Claude Code plugin that takes a Spec Kit feature to done, phase by phase, unattended: implement, verify, review, commit, resume. Provider-agnostic and open source: it runs on your machine, with your models and your keys.',
  tagline: 'Development governance for coding agents.',
  caption: 'Every phase reviewed, signed and committed.',
  repo: 'mairp/specstride-plugin',
  repoUrl: 'https://github.com/mairp/specstride-plugin',
  issuesUrl: 'https://github.com/mairp/specstride-plugin/issues',
  siteRepoUrl: 'https://github.com/mairp/specstride.ai',
  licenseUrl: 'https://github.com/mairp/specstride-plugin/blob/main/LICENSE',
  contributingUrl: 'https://github.com/mairp/specstride-plugin/blob/main/CONTRIBUTING.md',
  exampleUrl: 'https://github.com/mairp/specstride-example',
  copyright: 'Marlon De Paz',
  productLicense: 'Apache-2.0',
  siteLicense: 'MIT',
} as const;

export const NAV = [
  { href: '/install/', label: 'Install' },
  { href: '/docs/', label: 'Docs' },
] as const;

export type Status = 'available' | 'in-progress' | 'planned';

/** The site shows only what ships today. Entries with another status stay in the
 *  data and render nowhere; set `status: available` when one is released. */
export const isAvailable = (e: { data: { status: Status } }) => e.data.status === 'available';
