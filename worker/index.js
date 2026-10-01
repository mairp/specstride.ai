// The only code on the Worker: send www.specstride.ai to the apex with a 301,
// keeping the path and query. Everything else is the static site as built.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.specstride.ai') {
      url.hostname = 'specstride.ai';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
