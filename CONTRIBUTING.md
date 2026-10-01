# Contributing

Fixes and improvements to the website are welcome. Questions about Specstride itself belong in the
product repository's [Discussions](https://github.com/mairp/specstride/discussions).

1. Branch from `main` and keep the change focused.
2. `npm ci && npm run build && npm run check` must pass. For visual changes, run
   `node scripts/screens.mjs` against `npx wrangler dev --port 8788` and look at `.review/`.
3. **Honesty rules for content.** Every availability claim is one of `available`, `in-progress` or
   `planned`, and must match the product's sources. No invented numbers, users, logos, quotes or
   benchmarks. A command goes into `src/content/install.yaml` only after you ran it exactly as
   written; update its `verified` date.
4. Sign off your commits (`git commit -s`, [DCO](https://developercertificate.org/)).
5. Open a pull request. CI must pass.

By contributing you agree that your contribution is licensed under the MIT licence of this
repository.
