# Using this site as a template

The site is built so that a new product, host, harness or roadmap item is **data**, not design.
Pages and components read the content collections in `src/content/`, validated by the Zod schemas
in `src/content.config.ts`. A typo in a data file fails the build with the file and field named.

## The three statuses

Every availability claim is one of three values, defined once in `src/content.config.ts` (`status`)
and styled once in `src/styles/tokens.css` (`--chip-*`):

| Value | Chip | Means |
|---|---|---|
| `available` | ✓ Available | Works today; anything installable has verified commands |
| `in-progress` | ▶ In progress | Specified and being built |
| `planned` | ◇ Planned | Decided, not started |

## Recipes

### Add a product (for example a new host plugin)

Create **one file**, `src/content/products/<id>.md`:

```markdown
---
name: Codex plugin
kind: plugin              # core | plugin
status: planned           # available | in-progress | planned
order: 5                  # position in lists
summary: One or two sentences.
statusNote: What the status means for this product, honestly.
host: codex               # an id from src/content/hosts.yaml (optional)
skills:                   # optional
  - name: specstride-run
    does: What it does.
links: []                 # optional [{ label, href }]
install: codex            # optional: an id from install.yaml
---

Optional Markdown body: extra prose on /products/<id>/.
```

That is all. The product appears on the home page (engine or plugin row), on `/ecosystem` (product
cards and the hosts table), and gets its own page at `/products/<id>/`. The Codex plugin was added
exactly this way: `src/content/products/codex-plugin.md`, nothing else.

To give it an install tab, add an entry to `src/content/install.yaml` with the same status and, once
it works, the `steps` you ran by hand and the date in `verified`. Planned entries stay off the home
page's tabs and appear on `/install` with their status.

### Add a host

Append to `src/content/hosts.yaml`:

```yaml
- id: my-host
  name: My Host
  url: https://example.com      # optional
  order: 4
  blurb: One line about what a plugin there exposes.
```

A host has no status of its own; the products that target it carry one.

### Add a harness

Append to `src/content/harnesses.yaml`:

```yaml
- id: my-agent
  name: My Agent
  url: https://example.com      # optional
  order: 10
  roles: [proposer, critic]     # what it can be
  status: planned
  testedToday: false            # true only if the shipped CLI has a tested backend for it
  note: One line.
```

It appears in the home page grid and the `/ecosystem` table.

### Add a roadmap item

Append to `src/content/roadmap.yaml`:

```yaml
- id: my-item
  title: What ships
  product: specstride-core      # a product id
  status: planned
  stage: Wave 3                 # free text beside the chip
  order: 40
  summary: One or two sentences.
  links: []                     # public pages only
```

`/roadmap` groups items by status; each product page lists its own items.

### Add a FAQ entry

Append `{ id, order, q, a }` to `src/content/faq.yaml`. Answers accept `` `code` `` and
`[text](https://…)` and nothing else; everything else is escaped.

### Add a page

Create `src/pages/<name>.astro` and wrap it in the base layout:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Title" description="One sentence for search and social cards.">
  <div class="wrap page">
    <p class="eyebrow mono">// name</p>
    <h1>Title</h1>
  </div>
</Base>
```

Add it to `NAV` in `src/lib/site.ts` if it belongs in the header and footer. The sitemap picks it up.

## Components

| Component | Props | Notes |
|---|---|---|
| `Terminal` | `title?`, `label?`; slots: default, `actions` | A window frame. The body scrolls horizontally on its own, so long commands never widen the page; it is focusable so keyboards can scroll it. |
| `InstallTabs` | `entries`, `full?`, `id?`, `headingLevel?` | Install paths as ARIA tabs (arrow keys, Home, End). Without JavaScript every panel is shown. `full` adds prerequisites and the verification date. |
| `CopyButton` | `text`, `label?` | Copies to the clipboard. Hidden when the Clipboard API is missing. |
| `AsciiArt` | `label?` | The hero, from `src/generated/hero.json`. Gate posts light up in run order; static under reduced motion. Phones get the mark's own glyphs, set larger. |
| `LoopDiagram` | none | The loop as an ASCII diagram plus a replay of a real presenter transcript (`src/data/demo-timeline.ts`). Diagram boxes are found by their corners, so editing the diagram text is enough. |
| `StatusChip` | `status`, `label?` | The only way the site shows status. |
| `ProductCard` | `product`, `showSkills?`, `headingLevel?` | A product with its host, status, note and skills; links to its page. |
| `HarnessGrid` | `compact?` | Every harness plus the "yours, discovered" tile. |
| `Section` | `id`, `title`, `eyebrow?`, `intro?`, `tone?` | A home page section with an anchor; `tone="raised"` alternates the background. |
| `FAQ` | none | `faq.yaml` as `<details>` elements. |
| `Header`, `Footer`, `ThemeToggle` | none | Navigation from `NAV`; GitHub stars from the build-time API call. |

## Design tokens

`src/styles/tokens.css` holds every colour (dark first, a light set for `prefers-color-scheme: light`
and for the toggle), the type scale, spacing and the status-chip palette. Components use only these
variables. Both themes meet WCAG AA; `scripts/a11y.mjs` checks it with axe-core.

Fonts are self-hosted: Inter (variable, from `@fontsource-variable/inter`) for prose and a subset of
JetBrains Mono in `public/fonts/` that keeps box-drawing and block glyphs, which the usual web
subsets drop. `scripts/subset-fonts.sh` regenerates it.

## Generated assets

`npm run build` runs `npm run gen` first:

- `scripts/gen-ascii.mjs`: reads the mark (`scripts/mark.mjs`, copied from `lib/banner.py` in the
  product repo) and writes `src/generated/hero.json`, `hero.txt` and `public/favicon.svg`.
- `scripts/gen-og.mjs`: draws `public/og.png` (1200×630), `apple-touch-icon.png` and `favicon.ico`
  from the same geometry with resvg.

To reuse the template for another product, change `scripts/mark.mjs`, `src/lib/site.ts` and the data.

## Live data

`src/lib/github.ts` reads the star count and latest release of the repository in `SITE.repo` once
per build. If the API can't be reached, those elements are left out; nothing is ever hard-coded.
