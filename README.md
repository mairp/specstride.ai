# specstride.ai

The website of [Specstride](https://github.com/mairp/specstride): spec-driven, gated, unattended
coding. Live at **https://specstride.ai**.

It is also a template. Products, hosts, harnesses, roadmap items, FAQ entries and install paths are
data in `src/content/`; pages render from them. Adding a product is one Markdown file. See
[TEMPLATE.md](TEMPLATE.md).

> The **website and template** in this repository are MIT-licensed. **Specstride itself** (the CLI,
> the TypeScript core and every plugin) is licensed under
> [Apache-2.0](https://github.com/mairp/specstride/blob/main/LICENSE).

## Run it locally

Needs Node.js 22 or newer.

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # regenerates the ASCII art, icons and OG image, then builds to dist/
npm run check      # astro check (types and templates)
npm run preview    # serve dist/
```

`npm run build` fetches the star count and latest release of `mairp/specstride` from the GitHub API.
Offline, or with `SITE_OFFLINE=1`, the site builds without them.

## Quality checks

```bash
npx wrangler dev --port 8788              # serve dist/ the way production does, headers included
node scripts/screens.mjs http://127.0.0.1:8788   # screenshots at 390/768/1440 px, both themes, into .review/
node scripts/a11y.mjs http://127.0.0.1:8788      # axe-core on every page, both themes
npx linkinator http://127.0.0.1:8788/ --recurse  # links
npx lighthouse http://127.0.0.1:8788/            # mobile Lighthouse
```

CI (`.github/workflows/ci.yml`) runs the build, `astro check`, the link check and Lighthouse CI on
every pull request and on `main`.

## Deploy

> **Currently under construction.** `site-mode` says `construction`, so deploys ship only the
> placeholder page. Set it to `live` to deploy the full site.

The site is a Cloudflare Worker with static assets (`wrangler.jsonc`, Worker `specstride-site`) on the
custom domains `specstride.ai` and `www.specstride.ai`. `worker/index.js` only redirects `www` to the
apex. Deploys run from a trusted machine, not CI:

```bash
npm run deploy     # builds, then `wrangler deploy` with credentials from ~/.cf-admin.env
```

The env file holds `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` and never enters the repository
(`CF_ENV_FILE` points elsewhere).

**Deploy from CI (optional).** The `deploy` job in `ci.yml` ships every push to `main` once two
repository secrets exist: `CLOUDFLARE_DEPLOY_TOKEN`, a token with only *Account → Workers Scripts:
Edit* on this account, and `CLOUDFLARE_ACCOUNT_ID`. It uploads a new version of the Worker and
deploys it with `wrangler versions upload` / `versions deploy`, which leave the custom domains alone,
so the token needs no zone permission. Without the secrets the job is skipped. Security headers are in `public/_headers`. Zone settings, DNS and the
`www` redirect are described in [DECISIONS.md](DECISIONS.md#cloudflare).

## Layout

```
src/content/        data: products/*.md, hosts, harnesses, roadmap, faq, install (YAML)
src/content.config.ts   the Zod schemas for all of it
src/components/     Terminal, InstallTabs, AsciiArt, LoopDiagram, StatusChip, ProductCard, ...
src/pages/          /, /install, /ecosystem, /roadmap, /docs, /products/[id], 404
src/styles/tokens.css   every colour, size and status-chip colour, dark and light
scripts/            ASCII art, OG image and font generators; screenshot and a11y checks; deploy
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Decisions and their reasons are in
[DECISIONS.md](DECISIONS.md).
