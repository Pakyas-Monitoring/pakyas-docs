export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Redirect non-trailing-slash URLs to trailing-slash versions
    // Skip files with extensions (e.g., .js, .css, .png, .svg, .ico, .xml, .json)
    if (
      path.startsWith("/docs") &&
      !path.endsWith("/") &&
      !path.match(/\.[a-zA-Z0-9]+$/)
    ) {
      url.pathname = path + "/";
      return Response.redirect(url.toString(), 301);
    }

    // Strip /docs prefix from path
    const newPath = path.replace(/^\/docs/, "") || "/";
    return env.ASSETS.fetch(new Request(url.origin + newPath, request));
  },
};
