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
install block (tabs, copy button, a link to the full install page) and opentofu's plain FAQ and
roadmap. What was left out on purpose: testimonials, press and "used by" logos (nothing real to show
yet, and the honesty rule forbids inventing them), benchmarks (none measured), and social links
other than GitHub and its Discussions (the only community channels that exist).

## Information architecture

As in the brief, with one addition: **`/products/<id>/`**, a page generated for each product from its
data file. It is the "at most one page" a new product may bring, and it costs nothing to add. The
home page order is the brief's; the observability section shows a real event record and the digest
format instead of a screenshot.

## Stack

- **Astro 7, static output, TypeScript strict.** Zero framework JavaScript. Four small scripts, each
  its own file: install tabs, copy buttons, the loop replay and the theme toggle, plus a 5-line
  blocking `theme-init.js` that applies a saved theme and marks `.js` before first paint (it also
  prevents a layout shift from the tabs).
- **Plain CSS with tokens, not Tailwind.** One tokens file is easier to read and reuse than a utility
  config for a site of this size, and component styles are scoped by Astro.
- **Content collections with Zod** for products (Markdown, so a product can carry prose), hosts,
  harnesses, roadmap, FAQ and install (YAML).
- **Every style and script is an external file** (`inlineStylesheets: 'never'`, `assetsInlineLimit:
  0`), so the CSP needs no `'unsafe-inline'`. JSON-LD is a data block, which CSP doesn't govern.

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
