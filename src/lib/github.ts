// Live repository facts, fetched once at build time. Every field may be null:
// the site renders without them rather than showing a stale or invented number.
import { SITE } from './site';

export interface RepoFacts {
  stars: number | null;
  release: { tag: string; url: string; date: string } | null;
}

/** Below this the star count is left out: a small number says nothing yet. */
const STAR_FLOOR = 100;

let cached: Promise<RepoFacts> | undefined;

async function get(path: string): Promise<any | null> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'specstride-site-build' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`https://api.github.com/${path}`, { headers, signal: AbortSignal.timeout(8000) });
      if (res.ok) return await res.json();
      if (res.status === 404) return null;
    } catch {
      /* network hiccup: retry, then give up quietly */
    }
  }
  return null;
}

export function repoFacts(): Promise<RepoFacts> {
  cached ??= (async () => {
    if (process.env.SITE_OFFLINE === '1') return { stars: null, release: null };
    const [repo, rel] = await Promise.all([get(`repos/${SITE.repo}`), get(`repos/${SITE.repo}/releases/latest`)]);
    const facts: RepoFacts = {
      stars: typeof repo?.stargazers_count === 'number' && repo.stargazers_count >= STAR_FLOOR ? repo.stargazers_count : null,
      release: rel?.tag_name ? { tag: rel.tag_name, url: rel.html_url, date: String(rel.published_at).slice(0, 10) } : null,
    };
    console.log(`[github] stars=${facts.stars ?? 'n/a'} release=${facts.release?.tag ?? 'n/a'}`);
    return facts;
  })();
  return cached;
}
