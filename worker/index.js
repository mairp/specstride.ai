// Worker in front of the static assets.
// - www.specstride.ai answers with a 301 to the apex, keeping path and query.
// - /ecosystem/ moved home: with the plugin release there is one product and one
//   host, which the home page already shows, so the page redirects to its
//   agents section.
// - /install.sh (the one-command installer) is served as text/plain, uncached.
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
    if (/^\/ecosystem\/?$/.test(url.pathname)) {
      url.pathname = '/';
      url.search = '';
      url.hash = 'agents';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/install.sh' && env.SITE_MODE !== 'construction') {
      // The installer: plain text so a browser shows it before anyone pipes it to bash,
      // and never cached, so a fix reaches the next install.
      const res = await env.ASSETS.fetch(request);
      if (!res.ok) return res;
      const headers = new Headers(res.headers);
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.set('Cache-Control', 'no-cache');
      return new Response(request.method === 'HEAD' ? null : res.body, { status: 200, headers });
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
