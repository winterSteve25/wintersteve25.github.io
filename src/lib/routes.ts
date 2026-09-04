import { resolve } from '$app/paths';
import type { PageId } from '$lib/content/types';

/**
 * `resolve()` is typed against the real route tree, so it catches typos and
 * applies the GitHub Pages base path for us. It needs a literal, not a template
 * string, which is why this is a switch rather than `resolve(`/${id}`)` — a fair
 * trade for two pages and compile-time link checking.
 */
export function pageHref(id: PageId): string {
	switch (id) {
		case 'swe':
			return resolve('/swe');
		case 'game-dev':
			return resolve('/game-dev');
	}
}

export const homeHref = (): string => resolve('/');

/** Base-aware URL for a file in `static/`. */
export const staticHref = (filename: string): string => `${resolve('/')}${filename}`;
