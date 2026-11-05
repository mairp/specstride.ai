# Using this site as a template

The site is built so that a new product, host or harness is **data**, not design.
Pages and components read the content collections in `src/content/`, validated by the Zod schemas
in `src/content.config.ts`. A typo in a data file fails the build with the file and field named.

## Status: only what ships is shown

Every product, harness and install path carries a `status`, defined once in `src/content.config.ts`:
`available`, `in-progress` or `planned`. The site renders **only `available` entries**
(`isAvailable` in `src/lib/site.ts`): the others stay in the data, get no card, tab, table row or
page, and appear the day their status is changed.

## Recipes

### Add a product

Create **one file**, `src/content/products/<id>.md`:

```markdown
---
name: My host plugin
kind: plugin              # core | plugin
status: planned           # available | in-progress | planned
order: 5                  # position in lists
summary: One or two sentences.
statusNote: What the status means for this product, honestly.
host: my-host             # an id from src/content/hosts.yaml (optional)
skills:                   # optional
  - name: specstride-run
    does: What it does.
links: []                 # optional [{ label, href }]
install: my-host          # optional: an id from install.yaml
---

Optional Markdown body: extra prose on /products/<id>/.
```

That is all. The product gets its own page at `/products/<id>/`, and the home page and the
products listings pick it up from the same data.

To give it an install tab, add an entry to `src/content/install.yaml` with the same status and, once
it works, the `steps` you ran by hand and the date in `verified`. The tab appears when the status is
`available`.

### Add a host

Append to `src/content/hosts.yaml`:

```yaml
- id: my-host
  name: My Host
  url: https://example.com      # optional
  order: 2
  blurb: One line about what a plugin there exposes.
```

A host has no status of its own; the products that target it carry one.

### Add a harness

Append to `src/content/harnesses.yaml`:

```yaml
- id: my-agent
  name: My Agent
  url: https://example.com      # optional
  order: 3
  roles: [proposer, critic]     # the internal enum; the page says implementer and reviewer
  status: planned
  note: One line.
```

It appears in the home page's models section. The role words on the page are
**implementer** (the coding agent) and **reviewer** (the judge); `proposer`/`critic` are the
product's own variable names and stay in the data.

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
| `LoopDiagram` | none | The loop as an ASCII diagram plus a replay of a real run log (`src/data/demo-timeline.ts`). Diagram boxes are found by their corners, so editing the diagram text is enough. |
| `ProductCard` | `product`, `showSkills?`, `headingLevel?` | A product with its host, note and skills; links to its page. |
| `HarnessGrid` | `compact?` | The implementer and reviewer harnesses. |
| `Section` | `id`, `title`, `eyebrow?`, `intro?`, `tone?` | A home page section with an anchor; `tone="raised"` alternates the background. |
| `FAQ` | none | `faq.yaml` as `<details>` elements. |
| `Header`, `Footer`, `ThemeToggle` | none | Navigation from `NAV`; GitHub stars from the build-time API call. |

## Design tokens

`src/styles/tokens.css` holds every colour (dark first, a light set for `prefers-color-scheme: light`
and for the toggle), the type scale and spacing. Components use only these
variables. Both themes meet WCAG AA; `scripts/a11y.mjs` checks it with axe-core.

Fonts are self-hosted: Inter (variable, from `@fontsource-variable/inter`) for prose and a subset of
JetBrains Mono in `public/fonts/` that keeps box-drawing and block glyphs, which the usual web
subsets drop. `scripts/subset-fonts.sh` regenerates it.

## Generated assets

`npm run build` runs `npm run gen` first:

- `scripts/gen-ascii.mjs`: reads the mark (`scripts/mark.mjs`) and writes `src/generated/hero.json`,
  `hero.txt` and `public/favicon.svg`.
- `scripts/gen-og.mjs`: draws `public/og.png` (1200×630), `apple-touch-icon.png` and `favicon.ico`
  from the same geometry with resvg.

To reuse the template for another product, change `scripts/mark.mjs`, `src/lib/site.ts` and the data.

## Live data

`src/lib/github.ts` reads the star count and latest release of the repository in `SITE.repo` once
per build. If the API can't be reached, those elements are left out; nothing is ever hard-coded.
