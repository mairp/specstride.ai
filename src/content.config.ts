// Content collections: every product, host, harness, roadmap item, FAQ entry and
// install path on the site is data here. Pages render from these; see TEMPLATE.md.
import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** The three states the site may claim. Never add a fourth without a legend entry. */
export const status = z.enum(['available', 'in-progress', 'planned']);

const link = z.object({ label: z.string(), href: z.url() });

const products = defineCollection({
  // One Markdown file per product. The front matter is the data; an optional body
  // becomes extra prose on the product's own page (/products/<id>).
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['core', 'plugin']),
    status,
    order: z.number(),
    summary: z.string(),
    /** What the status means for this product, in one honest sentence. */
    statusNote: z.string(),
    host: reference('hosts').optional(),
    skills: z.array(z.object({ name: z.string(), does: z.string() })).default([]),
    repo: z.url().optional(),
    links: z.array(link).default([]),
    install: reference('install').optional(),
  }),
});

const hosts = defineCollection({
  loader: file('src/content/hosts.yaml'),
  schema: z.object({
    name: z.string(),
    url: z.url().optional(),
    order: z.number(),
    blurb: z.string(),
  }),
});

const harnesses = defineCollection({
  loader: file('src/content/harnesses.yaml'),
  schema: z.object({
    name: z.string(),
    url: z.url().optional(),
    order: z.number(),
    /** Roles it can play: the coding agent (proposer) and/or the judge (critic). */
    roles: z.array(z.enum(['proposer', 'critic'])),
    /** Status of its adapter: in the shipped CLI today, else in the TypeScript core. */
    status,
    /** True only when the shipped CLI has a tested backend for it. */
    testedToday: z.boolean().default(false),
    note: z.string(),
  }),
});

const roadmap = defineCollection({
  loader: file('src/content/roadmap.yaml'),
  schema: z.object({
    title: z.string(),
    product: reference('products'),
    status,
    stage: z.string(),
    order: z.number(),
    summary: z.string(),
    links: z.array(link).default([]),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.yaml'),
  schema: z.object({ q: z.string(), a: z.string(), order: z.number() }),
});

const install = defineCollection({
  loader: file('src/content/install.yaml'),
  schema: z.object({
    label: z.string(),
    status,
    order: z.number(),
    product: reference('products'),
    /** Shown on the home page tabs (keep it short) and in full on /install. */
    summary: z.string(),
    prereqs: z.array(z.string()).default([]),
    steps: z.array(z.object({ note: z.string().optional(), cmd: z.string() })).default([]),
    after: z.string().optional(),
    /** Date the steps were last executed by hand, as shown. Required when steps exist. */
    verified: z.string().optional(),
    watch: link.optional(),
  }),
});

export const collections = { products, hosts, harnesses, roadmap, faq, install };
