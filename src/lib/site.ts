// Site-wide constants. Change these to reuse the template for another product.
export const SITE = {
  name: 'Specstride',
  url: 'https://specstride.ai',
  title: 'Specstride: development governance for coding agents',
  description:
    'Specstride takes a Spec Kit feature to done, unattended: the engine runs the tests, a separate reviewer judges the change, every approved phase is committed.',
  /** The home page H1 (set in two lines in index.astro): the first row of the core README's "Benefits at a glance". */
  headline: '“Done” that means done.',
  tagline: 'Development governance for coding agents.',
  caption: 'Every phase reviewed, signed and committed.',
  repo: 'mairp/specstride-plugin',
  repoUrl: 'https://github.com/mairp/specstride-plugin',
  issuesUrl: 'https://github.com/mairp/specstride-plugin/issues',
  siteRepoUrl: 'https://github.com/mairp/specstride.ai',
  licenseUrl: 'https://github.com/mairp/specstride-plugin/blob/main/LICENSE',
  contributingUrl: 'https://github.com/mairp/specstride-plugin/blob/main/CONTRIBUTING.md',
  exampleUrl: 'https://github.com/mairp/specstride-example',
  coreUrl: 'https://github.com/mairp/specstride-core',
  /** The one-command install of the lead host (public/install.sh). */
  installCmd: 'curl -fsSL https://specstride.ai/install.sh | bash -s -- plugin',
  copyright: 'Marlon De Paz',
  productLicense: 'Apache-2.0',
  siteLicense: 'MIT',
} as const;

/** In-page links of the home page, shown in the header on wide screens. */
export const SECTIONS = [
  { href: '/#compare', label: 'Why it differs' },
  { href: '/#loop', label: 'How it works' },
  { href: '/#judge', label: 'The reviewer' },
  { href: '/#unattended', label: 'Unattended' },
  { href: '/#ways', label: 'Hosts' },
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
