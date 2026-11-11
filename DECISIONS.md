# Decisions

Every choice made while building this site, and why. Deviations from the build brief are marked
**Deviation**. Newest sections at the bottom.

## Positioning

**The one-line promise**

> From specs to tested code. Every step, signed off.

It is the product's own tagline (README and `lib/banner.py` in `mairp/specstride`), so the site and the
terminal splash say the same thing. The sub-line carries the mechanism: *Specstride drives your coding
agent through a Spec Kit feature phase by phase. Nothing advances until a critic approves it on cited
evidence.*

**Rejected alternatives**

| Alternative | Why not |
|---|---|
| "Your autonomous software engineer" | Overclaims. Specstride doesn't write specs or decide what to build; it carries out work that is already specified. The audience would discount the whole page after this line. |
| "LLM-as-a-judge for coding agents" | Too narrow. The critic is one part; the diagnostician, the accelerator and the self-tuning outer loop would read as extras. |
| "Ship while you sleep" | Playful but says nothing checkable, and it undercuts the one thing the product sells: evidence before advance. |

**Product status, as verified against the sources (2026-10-01)**

| Product | Status on the site | Evidence |
|---|---|---|
| Specstride CLI (Bash + Python, stdlib only) | **Available** | Public repo, Apache-2.0, release `v0.1.0` (2026-09-26), CI on `main`. The quick start was run end to end by the builder (`.review/commands.log`). |
| Specstride TypeScript core | **In progress** | Specified as 41 Spec Kit features with 1,643 functional requirements (Stage B final summary, 2026-09-30). Implementation began 2026-09-30 and is driven unattended by the current Specstride CLI; the umbrella feature had seven phases approved by its critic by 2026-10-01. The repository is not public yet, so the site links nowhere for it. |
| Claude Code plugin (`specstride-run`, `specstride-reverse`) | **In progress** | Feature 113 (host: Claude Code) is in Wave 1, specified, implementation queued behind the core. |
| dsh plugin | **Planned** | Wave 2 (feature 120) in the roadmap; its repository holds only an as-is spec placeholder. |
| Codex plugin | **Planned** | No code, no spec. The product roadmap has a Codex *harness adapter* in Wave 1 (feature 131), but no Codex *host plugin*; the owner's brief puts the plugin on the roadmap, so the site shows it as planned with no wave number. |

Differences between the brief and the sources:

- The brief lists harnesses including Gemini CLI, Copilot, opencode, OpenRouter and z.ai. In the
  sources these are Wave 3 adapters (features 132–137), so they show as **Planned**. pi is a Wave 1
  adapter of the TypeScript core (feature 134): **In progress**. Claude, Codex and dsh have a tested
  backend in the shipped CLI today (`lib/backends.py` and its registry test): **Available**.
- The CLI's backend registry has two more entries. One is a locally registered backend specific to the
  author's machine; the other is not in the owner's harness list. Neither is shown.
- Open discovery of installed agents ("generic descriptor adapter", features 124 and 146) belongs to the
  TypeScript core: **In progress**, not available today.
- The `[DIGEST]` line is printed today by the mixture-of-loops launcher that runs Specstride, not by
  the CLI itself. The observability section says so.

**Licence**

- The product (CLI today, TypeScript core and every plugin) is **Apache-2.0**, linked to
  `LICENSE` in `mairp/specstride`. The TypeScript working tree still carries an MIT file; the owner has
  ruled Apache-2.0 for the whole product and relicenses that repo separately, so the site states
  Apache-2.0 without hedging.
- This website and its template are **MIT**. Copyright holder as in the product's LICENSE.

## Research

openclaw.ai (the brief's model), bun.sh and opentofu.org. What was taken: openclaw's order (ASCII
hero, the open-source promise in one line, install tabs up front, an integrations grid), bun's
install block (tabs, copy button, a link to the full install page) and opentofu's plain FAQ.
What was left out on purpose: testimonials, press and "used by" logos (nothing real to show
yet, and the honesty rule forbids inventing them), benchmarks (none measured), and social links
other than GitHub and its Discussions (the only community channels that exist).

## Restyle after co3.ooo (2026-10-03)

The owner asked for the look of https://www.co3.ooo/ and for the roadmap to go. What was taken from
co3: a near-black canvas with a dot grid instead of grey bands and section rules; the accent used as
light (a blurred orb with a bright core rising from the bottom edge of the hero, a ring around it,
halos on cards); large geometric display type; a split hero; cards whose border is a gradient that
fades out; a figure that stays pinned beside a column of cards; group titles hanging from a line
with a glowing node; a light primary button with an arrow that straightens on hover; a closing call
to action. What was kept: the pink accent, the status colours, JetBrains Mono for everything
terminal, the copy and its order.

- **Display face.** Poppins 500/600 (the face co3 uses), latin subset, self-hosted through
  `@fontsource/poppins`, for `h1`–`h4` and FAQ questions. 16 KB for the two files; the 500 is
  preloaded because the headline is the largest paint.
- **The mark moved.** The hero is type and light only, as on co3. The ASCII mark is the pinned
  figure of the "why" section, where co3 has its wireframe sphere.
- **Install tabs** left the hero and are the first band under it, still at `#install`.
- **Departures from co3, on purpose.** Its resting card text is `#666` on black, which fails
  contrast; here text rests at `--muted` (AA in both themes) and only gets brighter on hover or
  focus. It loads GSAP, Font Awesome and Google Fonts; here every effect is CSS (keyframes,
  `position: sticky`, scroll-driven reveals behind `@supports`), nothing moves under
  `prefers-reduced-motion`, and there is still no third-party request. co3 is dark only; the light
  theme keeps the same layout with darker dots and a softer orb. The header keeps its navigation.
- **No inline styles.** The CSP has no `'unsafe-inline'` for styles, which also blocks `style`
  attributes, so the orb's variants are classes.
- **Roadmap removed**: the page, its data file, the collection, the nav entry and the block on
  product pages. Status chips and each product's `statusNote` carry the same facts. The site was
  under construction, so `/roadmap/` needs no redirect.
- **Under-construction placeholder**: same canvas and orb, nothing else changed.

## Only what ships (2026-10-03)

The owner's call before going public: no roadmap anywhere, and the site should read as a finished
product. So the site now shows only entries whose status is `available`; everything in progress or
planned stays in the data and renders nowhere. This supersedes the three-chip presentation described
above, and it keeps the honesty rule: nothing is claimed that does not ship.

- Status chips, the chip palette and the amber/blue tab dots are gone; with one state on screen they
  were noise.
- Home: the "why" cards describe what the CLI does today, in the product README's own words and with
  its one measured example. The agents grid lists the three backends the CLI has. The "hosts and
  plugins" band is hidden until a plugin is released. The release tag left the hero.
- The star count is shown only from 100 up (`STAR_FLOOR` in `src/lib/github.ts`).
- "Built by itself" stays: it is use of the released CLI on real work, not a promise. Its status
  line and the "not public yet" note were removed.
- `/ecosystem` lists released products and the agents; the hosts table appears once two hosts have
  a product. Product pages exist for released products only.

## Information architecture

As in the brief, with one addition: **`/products/<id>/`**, a page generated for each product from its
data file. It is the "at most one page" a new product may bring, and it costs nothing to add. The
home page order is the brief's; the observability section shows a real event record and the digest
format instead of a screenshot.

## Stack

- **Astro 7, static output, TypeScript strict.** Zero framework JavaScript. Four small scripts, each
  its own file: install tabs, copy buttons, the loop replay and the theme toggle, plus a 5-line
  inline theme init that applies a saved theme and marks `.js` before first paint (it also
  prevents a layout shift from the tabs).
- **Plain CSS with tokens, not Tailwind.** One tokens file is easier to read and reuse than a utility
  config for a site of this size, and component styles are scoped by Astro.
- **Content collections with Zod** for products (Markdown, so a product can carry prose), hosts,
  harnesses, FAQ and install (YAML).
- **No `'unsafe-inline'` in the CSP.** Styles are one external stylesheet for the whole site
  (`cssCodeSplit: false`; it is 27 KB, and one render-blocking request beat five on the home page).
  Component scripts are external files. The one inline script, the theme init that must run before
  first paint, is allowed by its SHA-256, which `scripts/csp-hash.mjs` writes into `dist/_headers`
  after every build; the build fails if any other inline script appears. It started as an external
  file and was inlined because the extra round trip showed up in first paint. JSON-LD is a data
  block, which CSP doesn't govern.

## Design

- **Palette** taken from the product's own terminal theme (`docs/media/specstride.tape`): pink accent,
  green for approved, amber for in progress, periwinkle for planned. Light-theme values are darker
  variants chosen for AA contrast on small chip text.
- **Hero art.** The folded-track mark from `lib/banner.py` is rasterised by `scripts/gen-ascii.mjs`
  and drawn in `#`. A first version used half-block glyphs (▀▄█): crisp in a terminal, but browsers
  leave hairline seams between cells and the gate posts cut gaps into the rails. Plain ASCII has no
  seam to show and reads as text art, which is the point. The six gate posts light up green in the
  order a run reaches them, and the current one is pink; under `prefers-reduced-motion` they are a
  still frame. Phones (under 760 px) get the mark's own box-drawing glyphs, set large.
- **The loop** is an ASCII diagram whose boxes light up while a real presenter transcript replays
  beside it (the recording the product README's GIF is made from, rendered by `lib/present.py`). It
  starts when scrolled into view, can be replayed, and is static under reduced motion.
- **Fonts.** Inter for prose; JetBrains Mono (no-ligature build) for everything terminal. The
  fontsource subsets of JetBrains Mono have no box-drawing or block glyphs, so the art fell back to
  another font and lost alignment; `scripts/subset-fonts.sh` builds a 20 KB subset that keeps them.
  Both are self-hosted; there is no font request to a third party.
- **Iterations.** (1) Split hero, half-block art: headline wrapped to four lines and the art showed
  seams. (2) `#` art: right texture, but the per-line centring of a centred container skewed it. (3)
  Centred stack like openclaw's, art left-aligned inside its own box, headline sized from the
  viewport so it fits on two lines from 390 px up. Later passes split the products into an engine
  row and a plugin row, fixed the observability list, and removed a layout shift from the tabs.

## Honesty and verification

- **The README quick start fails on a fresh clone** (`mairp/specstride` at `164a118`): the default
  `--verification required` stops with exit 3 because the empty demo directory has no test command.
  The site's command adds the documented `--verification off` and says why. The product repo was
  not changed; this is reported as a follow-up.
- **The critic leg.** The `claude` critic calls the Anthropic API directly and needs
  `ANTHROPIC_API_KEY`, which the build machine doesn't have; the run with the site's exact command
  reached the critic and stopped with the documented missing-key message. The complete loop was then
  proven with the same command and a `dsh` critic: all three phases approved, and the generated
  `greet.py` prints `Hello, Ada!` and `Hello, world!`. The install tab lists the key as a
  prerequisite and names the alternatives. Transcript: `.review/commands.log` (kept out of git).
- Also run as shown: the shell-function install (in a clean `env -i` shell), `specstride status`,
  `specstride watch`, `specstride reverse <dir> --dry-run`, and `--otel --otel-url
  http://localhost:4318` against a local collector.
- **Numbers on the site** come from files and are dated: the release and stars from the GitHub API
  at build time; 41 features, 1,643 requirements and 2,983 tasks from the TypeScript core's Stage B
  summary; the anonymised run figures (about two-thirds waiting on verification jobs, over a third
  of agent time in passes killed at the cap, about fifty passes blocked on a human, under one percent
  in the critic) are rounded from the run analysis, with the project left unnamed.
- **Live data at build time only.** Stars and the latest release are fetched once per build with a
  graceful fallback, rather than by the visitor's browser, so a visit makes no request to a third
  party. A redeploy refreshes them.
- **The `[DIGEST]` line** is shown as its format, taken from the mixture-of-loops launcher's source,
  and labelled as such, not as captured output.

## Cloudflare

Only the `specstride.ai` zone and the new Worker `specstride-site` were touched. No other zone or
Worker was listed, read or changed.

- **Workers with static assets, not Pages** (as the brief asks). `wrangler.jsonc` deploys `dist/`
  with `not_found_handling: "404-page"` and the custom domains `specstride.ai` and
  `www.specstride.ai`, which created their DNS records.
- **www → apex in the Worker.** A zone Redirect Rule was the first choice, but the API token has no
  permission on the zone's rulesets (`Authentication error` on the `http_request_dynamic_redirect`
  phase entrypoint; the missing permission is *Zone → Single Redirect: Edit*, or *Zone WAF/Rulesets*
  edit). The brief allows the redirect in the Worker, so `worker/index.js` answers `www` with a 301 to
  the apex, keeping path and query, and hands every other request to the assets binding
  (`run_worker_first: true`). If the permission is added later, a Redirect Rule can replace it and
  the Worker code can go.
- **Zone settings** set through the API: SSL Full (strict), Always Use HTTPS, Automatic HTTPS
  Rewrites, minimum TLS 1.2, TLS 1.3 on, HSTS `max-age=15552000; includeSubDomains` without preload
  (with nosniff), Brotli and HTTP/3 on.
- **Headers** from `public/_headers`: a CSP of `'self'` only with `frame-ancestors 'none'`,
  `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive
  `Permissions-Policy`, `X-Frame-Options: DENY`, COOP. Hashed `/_astro/*` files are cached for a year
  as immutable; HTML and everything else revalidates on each request (the platform default).
- **Null mail.** `TXT @ "v=spf1 -all"`, `TXT _dmarc "v=DMARC1; p=reject; sp=reject; adkim=s;
  aspf=s"` and `MX 0 .`, since the domain sends and receives no mail.
- **Web Analytics.** Enabling it through the API failed with `Authentication error` (the token lacks
  *Account → Account Analytics: Edit* / RUM), but the first production Lighthouse run showed that
  Cloudflare Web Analytics is already active for the zone: the edge injects its cookie-free beacon
  into every page, and the strict CSP was blocking it (a console error, Best Practices 92). The CSP
  now allows exactly `static.cloudflareinsights.com` (script) and `cloudflareinsights.com`
  (reporting), and the footer says the site counts pages with it and sets no cookies.
- **Deploys stay on the host.** CI builds and checks but never deploys; the admin token is not in
  GitHub secrets.
- **CI deploy, ready but off.** The admin token cannot create tokens (*User → API Tokens: Edit* is
  missing), so no deploy token was minted. `ci.yml` has a `deploy` job for `main` that runs once the
  `CLOUDFLARE_DEPLOY_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets exist. It uses `wrangler versions
  upload` + `versions deploy`, which leave triggers and custom domains alone, so the token needs only
  *Account → Workers Scripts: Edit*. The path was tested from the host on 2026-10-01.

## Under construction (2026-10-01)

The owner put the site under construction while product-repo issues are resolved: the live domain
shows only the mark and "under construction", the full content is not exposed, and the site repo is
private until relaunch.

- **`site-mode`** (committed) is the single switch: `construction` or `live`. `npm run deploy` and
  the CI deploy job both read it, so the full site can't be relaunched by accident.
- **Construction mode** deploys `dist-construction/` (built by `scripts/build-construction.mjs`):
  one page, its stylesheet, the bold mono font and the icons. None of the full site's pages, data
  or social card is uploaded. The Worker (`SITE_MODE=construction`, from
  `wrangler.construction.jsonc`) answers every other URL with the placeholder, `503`,
  `Retry-After: 86400`, `X-Robots-Tag: noindex, nofollow` and `Cache-Control: no-store`, so search
  engines treat it as temporary and drop the old pages without penalising the domain.
- **Relaunch:** set `site-mode` to `live`, run `npm run deploy`, make the repo public again.

## The plugin release (2026-11-05)

Specstride now ships as one thing: a Claude Code plugin
([mairp/specstride-plugin](https://github.com/mairp/specstride-plugin), Apache-2.0). Everything the
site used to say about the older CLI engines, the TypeScript core, the dsh and Codex plugins, the
self-tuning loop and how the tool was built is gone. What the site sells is the plugin's story: a
run takes a Spec Kit feature to done phase by phase, and a separate reviewer has to approve each
phase before it is committed.

- **Positioning** is the plugin README's first line: development governance for coding agents. The
  tagline ("Development governance for coding agents.") and caption ("Every phase reviewed, signed
  and committed.") come from it.
- **Truth sources** were only the plugin repository's README, its six wiki pages, the two skill
  descriptions, SECURITY.md, CONTRIBUTING.md, the Apache-2.0 licence and the example repository's
  README. Anything not said there is not said here.
- **Removed from the site:** the products specstride-cli, specstride-core, the dsh plugin and the
  Codex plugin (one product now: the Claude Code plugin); the whole observability story; the
  "built by itself" section; every mention of how the tool was developed, how many tasks, phases or
  tests it ran, and every model name or count that was ever a development detail. The only numbers
  left are the ones the README itself states: up to 3 attempts, exit 1, exit 2, Node 22+, version
  0.1.0. The only external repositories linked are the plugin, its wiki, and the example.
- **Install paths:** only the two `/plugin` commands the README gives, then the example repository
  as the first run. The install tab carries the note that commands are run by hand exactly as
  written. Verified by hand on 2026-11-05: the two `/plugin` commands in a clean Claude Code 2.1.318
  configuration (plugin 0.1.0 installed and enabled), the example clone, and the bundled doctor in it
  (node, git, claude, git repository, `specs/` all ok). The first run itself is the recorded one the
  demo video shows, on the same example, the same day.
- **/ecosystem is gone.** With one product and one host the page repeated the home page, so the
  Worker answers `/ecosystem/` with a 301 to `/#agents`, and it left the navigation with the site.
- **The demo** is the example repository's GIF, converted to self-hosted video: WebM first (100 KB)
  with the H.264 MP4 (294 KB) behind it, a poster frame, `preload="none"`, and no autoplay under
  prefers-reduced-motion. The example README's own caption — the phase 3 merge-check catch —
  stays with it.
- **The loop diagram** was redrawn for what the plugin actually does: implementer → verification →
  reviewer → approval, with the rejected path going back to the implementer (up to 3 attempts).
  Beside it a terminal replays the README's stored run log line by line and lights the part of the
  diagram each line belongs to.
- **The run log is quoted verbatim**, including its two `proposer started` lines: it is the engine's
  own output, labelled as such, and a quote is not rewritten to match the site's role words.
- **Stuck phases (owner, same day).** The plugin's engine ships the diagnostician and the accelerated
  attempt, on by default, and its README and wiki now document them ("When a phase is stuck"). The
  site shows them: the loop diagram's rejected path, the two lines of the stored run log that the
  README had trimmed, a card and the FAQ answer. Plain agent loops get stuck easily; the site says so
  in words and shows the mechanism, with no figures from internal runs.
- **Words.** The visible pages say implementer and reviewer; proposer/critic survive only where the
  product itself names them (below). The site's own README and TEMPLATE were rewritten for the
  template's new shape; the harnesses page maps the internal role enum to the two visible words.
- **Checks (2026-11-05, on the final build):** `astro check` 0 errors; screenshots at 390/768/1440
  in both themes with no overflow and no console errors; axe clean on all five pages in both
  themes; linkinator 39 links OK; Lighthouse desktop and mobile on /, /install/ and
  /products/claude-code-plugin/ — performance 0.98–1.0, accessibility/best-practices/seo 1.0, all
  above the 0.95 gate. The one failure found and fixed along the way: the plugin page carried a
  0.159 layout shift from font swapping; all faces are now self-declared with
  `font-display: optional`, CLS 0.

### Kept sweep hits (internal only, no visitor sees them)

The release sweep greps the tree for the old product's vocabulary; every visible hit was fixed.
These remain, each internal to the product's own names or to build tooling:

- `SPECSTRIDE_PROPOSER` / `SPECSTRIDE_CRITIC` (home page env block) — the product's own documented
  environment variables; the README's install and docs say exactly this.
- `proposer started` in the replayed run log — the engine's own output, quoted verbatim.
- `roles: [proposer, critic]` and its comment (harnesses.yaml, content.config.ts, HarnessGrid, the
  TEMPLATE recipe) — the content schema's internal enum behind the product's variable names; the
  rendered page says implementer and reviewer.
- `.digest(` in scripts/csp-hash.mjs — Node's crypto API, nothing to do with the old digest feature.
- `best-practice` in scripts/a11y.mjs — axe-core's rule-category name.
- `#!/usr/bin/env bash` (deploy.sh, subset-fonts.sh) — the interpreter line of two build scripts.

## Three variants (2026-11-08)

The owner asked for the site to cover all three public repositories: specstride-plugin,
specstride-dsh and specstride-core. Three decisions, taken on 2026-11-08:

- **Plugin first, plus two.** The hero, the description and the home page story stay on the
  Claude Code plugin. A new home section, "Three ways to run it" (02), renders the available products
  from the collection. The plugin card comes first and is wider and lit. Each variant has a
  `/products/<id>/` page (`specstride-dsh`, `specstride-core`) and an install tab. Two hosts now
  have a product, but the hosts table stays off: the cards already name the host, and a table would
  repeat them.
- **Available from source.** Neither `specstride`, `@specstride/*` nor `@specstride/host-dsh` is on
  npm, so the install paths build from a clone. The status notes say so. They also say that Linux is
  verified and macOS is not, and, for dsh, that the paid live probe (F120-FR-030) has not run.
- **Ship all the way:** PR, merge, deploy, and the repo homepages point here.

**Install steps as run by hand on 2026-11-08** (fresh clones in a scratch directory, isolated npm
prefixes, a clean environment):

- core at `f9d0044`: `npm ci`, `npm run typecheck:src` and `node scripts/pack-release.mjs` (all four
  tarballs) passed. `npm install -g .build/release/specstride-0.1.0.tgz` worked, `specstride
  --protocol` printed `1`, and `specstride doctor` in a clone of specstride-example was all `ok`.
- dsh at `17c970b`: `npm install` and `npm run build` passed (3 skills, shim, every gate).
  `npm install -g vendor/core/specstride-0.1.0.tgz` worked, and with `DSH_HOME` set,
  `node bin/specstride-host-dsh.mjs install` installed the three skills. A second run printed
  "already installed, unchanged", and `doctor` was ok on every check (exit 0).

**Update, same day.** Bugs 1 and 2 below were fixed in specstride-dsh PR #2 (merged as `32d62c3`). The dsh
tab now uses the short path, run by hand from a fresh clone of that commit with a clean home:
`npm install -g . vendor/core/specstride-0.1.0.tgz`, then, in a clone of specstride-example,
`specstride-host-dsh install --project` and `specstride-host-dsh doctor` (every check ok, exit 0).

**What the site first worked around, and why:**

- `specstride-host-dsh` through an npm bin symlink (`npm install -g .`, `npx`) does nothing and exits
  0. The entry guard compares `process.argv[1]` with the module path, and a symlink never matches.
  The site therefore runs `node bin/specstride-host-dsh.mjs`.
- `install --project` installs the skills, but the doctor checks only the user scope
  (`$DSH_HOME/skills`), so a project install fails `host.skills-installed`. The site uses the
  user-scope install, which needs `DSH_HOME`.
- `npm test` in a fresh dsh clone fails 1 of its tests: a dsh-kanban test cannot resolve
  `@specstride/host-dsh` without the CI peer stub. It is not part of the install, so it is not a step.

**Build changes.** Markdown syntax highlighting is off (`markdown.syntaxHighlight: false`). Shiki
writes token colours as inline `style` attributes, which the CSP blocks; the core page's layer diagram
was the first fenced block in a product body. Product summaries now go through `inlineMd`, so
`code` renders. Product prose `pre` scrolls inside its box instead of widening the page at 390 px.
The a11y and screenshot scripts cover the two new pages.

## Loop engineering at the centre (2026-11-08)

The site explained a single phase and listed features, but it never stated the idea behind them, which the core README
calls loop engineering. Changes:

- **New section 02, "Loop engineering"**, right after "How it works". It holds a figure of the nested loops (pipeline
  stages ▸ phases ▸ attempts ▸ passes ▸ micro cycles), each labelled with what ends it, and six principle cards from the
  core README: every loop has an end (yields merged into it), deterministic checks before any opinion, stuck phases,
  a router with no I/O, stackable loop layers, and learning with guardrails. The figure is HTML and CSS with no inline styles,
  and its rings are numbered 01–05, not L1–L5, so they don't clash with the engine's L0–L7 architecture layers.
- **"Stuck phases get unstuck" moved** from "Built for unattended work" to the loop section, so it appears only once.
- **New "What you get" section**: the core's "Benefits at a glance", read as benefit *because* reason. The models row adds
  "The hosts ship Claude and dsh today", because the engine has the Codex, pi and prime adapters but the plugin's roadmap
  still lists native Codex and Pi roles.
- **New governance section**, "Controls an agent can't talk its way past": seven controls from "Why governance". The
  seventh card spans the row instead of sitting alone.
- **Wording:** "Loop engineering" opens the hero's small line, `SITE.description` names loop engineering and
  governance, and a new FAQ entry, "What is loop engineering?", links to the core page.

The source for every claim is the core README on `main` (sections "Why loop engineering", "Why governance" and "Benefits at
a glance"). The plugin's How-It-Works wiki is the source for the cap of 3 attempts and exit 2.

## Design lift, the judge and the variants (2026-11-11)

The owner asked for a better design and for content on the variants, the benefits of loop engineering and LLM-as-a-judge.
The request met two existing rules: the page says "reviewer" (2026-11-05), and "LLM-as-a-judge for coding agents" was
rejected as the one-line promise. Three paths were weighed: stay within the rules, take a bounded exception (rename the
role to "judge", or add a second accent or display face), or mock up first. The first was taken, so no rule changed.

- **The judge has a section** (02, "LLM-as-a-judge, held to evidence"), not the tagline. The industry term names the
  pattern; the role is still "the reviewer" everywhere. A figure shows what reaches the reviewer, what is held back and
  what comes out, and six cards say why the verdict counts. Sources: the plugin wiki's "How it works" (what the reviewer
  receives, the nonce, the signed record) and the core README's "Why governance" (notebook and repair history withheld,
  one ingress, records verified on resume). The cost is stated in the wiki's words: every attempt makes at least two
  model calls.
- **Loop engineering shows its benefit.** A five-row comparison puts one loop with no brakes beside the engineered loops.
  The left column says only what follows from the READMEs' description of a plain session; it has no figures. The
  principle cards were cut to two or three lines, and "Yields instead of dead waits" is its own card again.
- **The variants are shown as a stack and a table.** The stack figure has the hosts (plugin, dsh, the plain shell) over
  one pinned engine, joined by the core's CLI protocol line. The table is generated from the products, hosts and install
  collections; only "Pick it when" is typed, in the FAQ's words. Each product page has a switcher to the other two.
- **"What you get"** is a full-width grid of the same eight benefits in the same words.
- **Order:** how it works, the judge, loop engineering, what you get, three ways, unattended, see it run, governance,
  your models, parallel units, open source, FAQ.
- **Design, all from existing tokens:** the hero headline is three lines and the caption two at 1440 px, the small line
  sits on one line above both columns, and a phase rail (implement, verify, review, commit, next phase) shows the
  mechanism on the first screen. Section heads put the intro beside the title on wide screens. The header has in-page
  links from 1024 px up. The demo video sits in the terminal frame. Green and red appear only as verdicts. No new
  motion, face, colour or request.
- **Faults fixed on the way:** the agents tiles touched the terminal below them (the scoped `.env` rule never reached
  the child component), and the harness notes printed their backticks.
- **Checks (local build):** `astro check` 0 errors; screenshots at 390/768/1440 in both themes with no overflow and no
  console errors; axe clean; linkinator OK; Lighthouse mobile on `/` 0.98 performance, 1.0 accessibility, best practices
  and SEO, CLS 0.
- **Phones (same day).** Under 760 px the three variant cards are hidden: the stack figure and the table already carry
  their content and the links to the product pages, and the phone page had grown by about a third.
