import { page as gameDev } from './games';
import { page as swe } from './swe';
import type { PageId, PageMeta } from './types';

export const pages: PageMeta[] = [swe, gameDev];

export const pageById = (id: PageId): PageMeta => {
	const found = pages.find((p) => p.id === id);
	if (!found) throw new Error(`Unknown page: ${id}`);
	return found;
};
