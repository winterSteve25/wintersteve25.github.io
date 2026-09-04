import { page as gameDev } from './games';
import { page as swe } from './swe';
import type { PageId, PageMeta } from './types';

/**
 * Nav order. Adding a page: write its content file, add its route directory,
 * then list it here and add a case to `pageHref` in `$lib/routes`.
 */
export const pages: PageMeta[] = [swe, gameDev];

export const pageById = (id: PageId): PageMeta => {
	const found = pages.find((p) => p.id === id);
	if (!found) throw new Error(`Unknown page: ${id}`);
	return found;
};
