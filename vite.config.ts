import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

function normalizeBase(value: string | undefined): '' | `/${string}` {
	const trimmed = (value ?? '').replace(/^\/+/, '').replace(/\/+$/, '');
	return trimmed ? `/${trimmed}` : '';
}

const base = normalizeBase(process.env.BASE_PATH);

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}),

			paths: { base },

			prerender: {
				handleHttpError: 'fail'
			}
		})
	]
});
