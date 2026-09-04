/**
 * Static site, no server.
 *
 * `prerender` makes every route a real HTML file, so `/game-dev/` deep-links
 * correctly on GitHub Pages without an SPA fallback — which is exactly what the
 * send-a-targeted-link strategy depends on.
 *
 * `trailingSlash: 'always'` emits `game-dev/index.html` rather than
 * `game-dev.html`; directory-style output is what static hosts resolve most
 * predictably.
 */
export const prerender = true;
export const trailingSlash = 'always';
