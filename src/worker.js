export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Strip /docs prefix from path
    const newPath = url.pathname.replace(/^\/docs/, "") || "/";
    return env.ASSETS.fetch(new Request(url.origin + newPath, request));
  },
};
