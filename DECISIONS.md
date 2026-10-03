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
