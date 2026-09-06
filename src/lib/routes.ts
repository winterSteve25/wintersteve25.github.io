import { resolve } from '$app/paths';
import type { PageId } from '$lib/content/types';

export function pageHref(id: PageId): string {
	switch (id) {
		case 'swe':
			return resolve('/swe');
		case 'game-dev':
			return resolve('/game-dev');
	}
}

export const homeHref = (): string => resolve('/');

export const staticHref = (filename: string): string => `${resolve('/')}${filename}`;
