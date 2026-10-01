// Worker in front of the static assets.
// - www.specstride.ai answers with a 301 to the apex, keeping path and query.
// - With SITE_MODE "construction" (wrangler.construction.jsonc), every request
//   that isn't one of the placeholder's own files gets the placeholder page
//   with 503 + Retry-After, so search engines treat the outage as temporary.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.specstride.ai') {
      url.hostname = 'specstride.ai';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    if (env.SITE_MODE !== 'construction') return env.ASSETS.fetch(request);

    const isFile = /\.(css|woff2|svg|ico|png|txt)$/.test(url.pathname);
    if (isFile) {
      const res = await env.ASSETS.fetch(request);
      if (res.status !== 404) return res;
    }
    const page = await env.ASSETS.fetch(new Request(new URL('/', url), request));
    const headers = new Headers(page.headers);
    headers.set('Retry-After', '86400');
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    headers.set('Cache-Control', 'no-store');
    return new Response(request.method === 'HEAD' ? null : page.body, { status: 503, headers });
  },
};
