import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// GitHub Pages base path.
//   - Custom domain, or a repo named `<user>.github.io` -> leave empty.
//   - Repo named e.g. `portfolio`                       -> set BASE_PATH=/portfolio
// The deploy workflow passes this in; see .github/workflows/deploy.yml
//
// Tolerates `portfolio`, `/portfolio`, and `/portfolio/` — a wrong base path
// breaks every asset on the deployed site and nothing locally, so it is worth
// normalising rather than trusting.
function normalizeBase(value: string | undefined): '' | `/${string}` {
	const trimmed = (value ?? '').replace(/^\/+/, '').replace(/\/+$/, '');
	return trimmed ? `/${trimmed}` : '';
}

const base = normalizeBase(process.env.BASE_PATH);

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Static output only — GitHub Pages has no server. Every route is
			// prerendered (see src/routes/+layout.ts), so `/tech-art/` ships as a
			// real index.html and deep links work with no SPA fallback.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}),

			paths: { base },

			prerender: {
				// A broken internal link should fail the build, not ship.
				handleHttpError: 'fail'
			}
		})
	]
});
