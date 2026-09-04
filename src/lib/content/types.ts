/**
 * The content schema.
 *
 * Each page owns its own content. `/swe` and `/game-dev` are two separate
 * pages with two separate project lists, two separate project shapes, and two
 * separate layouts — not one body of work re-read.
 *
 * If a project belongs on both pages, write it twice, once for each audience.
 * The two entries are allowed to disagree about what mattered; that is the
 * point of writing them separately.
 */

export type PageId = 'swe' | 'game-dev';

/** Route-level identity: what a page claims and how it looks. */
export interface PageMeta {
	id: PageId;
	/** Nav label. Short. */
	nav: string;
	/** Job title as it would be posted. */
	title: string;
	/** Shown under your name at the top of the page. */
	headline: string;
	/** One paragraph positioning statement. */
	intro: string;
	/** Accent hue (CSS `oklch` lightness/chroma are fixed in app.css). */
	hue: number;
	/**
	 * Filename of a per-page resume PDF in `static/`. Leave undefined until the
	 * file exists — prerendering fails the build on links that 404, which is the
	 * behaviour you want.
	 */
	resume?: string;
	/**
	 * Filename of a 1200x630 link-preview card in `static/`. This is what a
	 * recruiter sees when you paste the URL into an application or a DM, so it
	 * is worth making properly.
	 */
	ogImage?: string;
}

/**
 * Media is referenced by URL, not imported from the repo.
 *
 * GitHub Pages counts repo size and bandwidth, and committed binaries live in
 * git history forever. Host video on Cloudflare R2 / Bunny / Vimeo and paste
 * the URL here. Small optimized stills (<200KB) in `static/` are fine.
 */
export interface MediaRef {
	kind: 'video' | 'image';
	src: string;
	/** First-frame still. Required for video so nothing pops in. */
	poster?: string;
	alt: string;
}

/**
 * Facts every project carries regardless of which page it is on. Each page
 * decides for itself which of these to surface — they are not all interesting
 * to every reader.
 */
export interface ProjectBase {
	slug: string;
	title: string;
	tagline: string;
	/** Free text: a year, a range, or `2026 — present`. */
	year: string;
	/** Your role, stated plainly. */
	role: string;
	/** Leave out rather than guess. Both are rendered conditionally. */
	teamSize?: string;
	duration?: string;
	tags: string[];
	hero: MediaRef | null;
}

/* -------------------------------------------------------------------------- */
/* /swe                                                                       */
/* -------------------------------------------------------------------------- */

/** One node in a hand-authored systems diagram. */
export interface SystemNode {
	id: string;
	label: string;
	/** ids of nodes this one feeds into */
	to: string[];
}

export interface SystemProject extends ProjectBase {
	summary: string;
	stack: string[];
	/** Rendered as a simple flow diagram — keep it under ~8 nodes. */
	systems: SystemNode[];
	/** Annotated excerpt. Real code, short enough to read in the browser. */
	excerpt?: { language: string; caption: string; code: string };
	repoUrl?: string;
	/** Live site, store page, or wherever the thing actually is. */
	siteUrl?: string;
	contributions: string[];
}

/** A job. `/swe` leads with these; a studio reads the games page instead. */
export interface Experience {
	company: string;
	role: string;
	/** e.g. `Jan 2026 — Aug 2026` */
	period: string;
	location?: string;
	stack: string[];
	highlights: string[];
	url?: string;
}

export interface Education {
	school: string;
	credential: string;
	period: string;
	location: string;
	/** GPA, standing, anything worth one line. */
	detail?: string;
}

export interface SkillGroup {
	label: string;
	items: string[];
}

/* -------------------------------------------------------------------------- */
/* /game-dev                                                                  */
/* -------------------------------------------------------------------------- */

export interface GameProject extends ProjectBase {
	/** What it is, in the language a designer would use. */
	pitch: string;
	/** Engine, or the fact that there isn't one. */
	engine: string;
	/**
	 * itch.io *embed* URL — the `https://itch.io/embed-upload/...` one from the
	 * game's edit page, not the project page URL. Playables are hosted on itch,
	 * not here: GitHub Pages cannot send the COOP/COEP or Content-Encoding
	 * headers that Unity and Godot web builds need. See README.
	 */
	itchEmbedUrl?: string;
	itchPageUrl?: string;
	/** Steam or another storefront. */
	storeUrl?: string;
	repoUrl?: string;
	controls?: string;
	/**
	 * What you personally did, grouped by area. On anything with more than one
	 * name on it this is the first thing a studio reader looks for, so it is
	 * required rather than optional — including on solo projects, where the
	 * areas are still the fastest way to show the scope of the thing.
	 */
	contribution: ContributionArea[];
	/**
	 * Who else worked on it and what they did. Credit them, and let it scope
	 * your own claim: "art by someone else" is information, not a weakness.
	 */
	collaborators?: Collaborator[];
}

/** One slice of the work, and what you did inside it. */
export interface ContributionArea {
	/** Short label: `Rendering`, `Physics`, `VFX`, `UI`. */
	area: string;
	points: string[];
}

export interface Collaborator {
	/** A person, or a group like `The other 18 people on the team`. */
	who: string;
	what: string;
	url?: string;
}

/**
 * Jam entries and smaller shipped things. A compact list rather than full
 * entries — the point is volume and that they are all playable right now.
 */
export interface ShippedEntry {
	title: string;
	blurb: string;
	url: string;
	/** Jam name and year, if it came out of one. */
	context?: string;
}
