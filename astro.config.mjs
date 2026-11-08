// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://specstride.ai',
  trailingSlash: 'always',
  output: 'static',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/404') })],
  // No Shiki: its token colours are inline style attributes, which the CSP blocks.
  markdown: { syntaxHighlight: false },
  build: {
    format: 'directory',
    // Keep every style and script in its own file so the CSP needs no 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  // One small stylesheet for the whole site: a single render-blocking request.
  vite: { build: { assetsInlineLimit: 0, cssCodeSplit: false } },
});
