export type PageId = 'swe' | 'game-dev';

export interface PageMeta {
	id: PageId;
	nav: string;
	title: string;
	headline?: string;
	intro: string;
	hue: number;
	resume?: string;
	ogImage?: string;
}

export interface MediaRef {
	kind: 'video' | 'image';
	src: string;
	poster?: string;
	alt: string;
}

export interface ProjectBase {
	slug: string;
	title: string;
	tagline: string;
	year: string;
	role: string;
	teamSize?: string;
	duration?: string;
	tags: string[];
	hero: MediaRef | null;
}

export interface SystemNode {
	id: string;
	label: string;
	to: string[];
}

export interface SystemProject extends ProjectBase {
	summary: string;
	stack: string[];
	systems: SystemNode[];
	excerpt?: { language: string; caption: string; code: string };
	repoUrl?: string;
	siteUrl?: string;
	contributions: string[];
}

export interface Experience {
	company: string;
	role: string;
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
	detail?: string;
}

export interface SkillGroup {
	label: string;
	items: string[];
}

export interface GameProject extends ProjectBase {
	pitch: string;
	engine: string;
	itchEmbedUrl?: string;
	itchPageUrl?: string;
	storeUrl?: string;
	repoUrl?: string;
	controls?: string;
	contribution: ContributionArea[];
	collaborators?: Collaborator[];
}

export interface ContributionArea {
	area: string;
	points: string[];
}

export interface Collaborator {
	who: string;
	what: string;
	url?: string;
}

export interface ShippedEntry {
	title: string;
	blurb: string;
	url: string;
	context?: string;
}
