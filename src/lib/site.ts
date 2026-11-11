// Site-wide constants. Change these to reuse the template for another product.
export const SITE = {
  name: 'Specstride',
  url: 'https://specstride.ai',
  title: 'Specstride: development governance for coding agents',
  description:
    'Specstride is loop engineering and governance for coding agents: a Claude Code plugin, also on dsh, that takes a Spec Kit feature to done, phase by phase, unattended. Every loop has an end, tests run before an independent LLM judge reviews the change, and every approved phase is a signed record and its own commit. Open source, on your machine, with your models and your keys.',
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

/** In-page links of the home page, shown in the header on wide screens. */
export const SECTIONS = [
  { href: '/#loop', label: 'How it works' },
  { href: '/#judge', label: 'The judge' },
  { href: '/#engineering', label: 'Loop engineering' },
  { href: '/#ways', label: 'Variants' },
  { href: '/#faq', label: 'FAQ' },
] as const;

export const NAV = [
  { href: '/install/', label: 'Install' },
  { href: '/docs/', label: 'Docs' },
] as const;

export type Status = 'available' | 'in-progress' | 'planned';

/** The site shows only what ships today. Entries with another status stay in the
 *  data and render nowhere; set `status: available` when one is released. */
export const isAvailable = (e: { data: { status: Status } }) => e.data.status === 'available';
