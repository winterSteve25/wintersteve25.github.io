import type { Education, Experience, PageMeta, SkillGroup, SystemProject } from './types';

export const page: PageMeta = {
	id: 'swe',
	nav: 'Software',
	title: 'Software Engineer',
	intro:
		'CS @ UBC. Currently working on Myelin Notes, a cross-platform note-taking and knowledge management app. Working in TypeScript, Rust, and WebAssembly.',
	hue: 195,
	resume: 'resume-swe.pdf'
	// TODO: add an OG image to `static/`, then set `ogImage`.
};

export const experience: Experience[] = [
	{
		company: 'Checker Software (Diffchecker)',
		role: 'Full Stack Developer',
		period: 'Jan 2026 — Aug 2026',
		stack: ['Rust', 'WebAssembly', 'TypeScript'],
		highlights: [
			'Built a web-based DOCX renderer in Rust, speeding up document comparison by 60%.',
			'Optimized LibreOffice compiled to WASM for the web, cutting bundle size by 25%.',
			'Built the localization system for the Diffchecker desktop app, enabling multi-language support.'
		],
		url: 'https://www.diffchecker.com'
	},
	{
		company: 'Nokia',
		role: 'Software Engineering Intern',
		period: 'Jul 2023 — Aug 2023',
		stack: ['Linux', 'Grafana', 'Prometheus', 'Robot Framework', 'Power BI'],
		highlights: [
			'Improved stability and performance of the Netguard Endpoint Detection and Response product, identifying and resolving 3 recurring performance bottlenecks across Linux VMs using Grafana and Prometheus.',
			'Automated Jira ticket tracking with Power BI dashboards, improving team workflow visibility.',
			'Raised test coverage by 10% with red-team assessments built on Caldera and Robot Framework, across multiple platforms.'
		]
	}
];

export const education: Education[] = [
	{
		school: 'University of British Columbia',
		credential: 'BSc, Computer Science',
		period: 'Sep 2024 — Apr 2028',
		location: 'Vancouver, BC',
		detail: 'GPA 4.08/4.33 (94.3%)'
	}
];

export const skills: SkillGroup[] = [
	{ label: 'Advanced', items: ['C#', 'Java'] },
	{
		label: 'Intermediate',
		items: ['C/C++', 'Rust', 'TypeScript', 'Python', 'GLSL', 'GDScript']
	},
	{
		label: 'Frameworks',
		items: ['React', 'Svelte', 'Vue', 'Node.js', 'Tauri', 'Unity', 'Godot', 'Raylib']
	},
	{ label: 'Tools', items: ['Git', 'GitHub Actions', 'Docker', 'Jira', 'Confluence'] }
];

export const projects: SystemProject[] = [
	{
		slug: 'myelin-notes',
		title: 'Myelin Notes',
		tagline: 'Handwriting, typing, and PDFs. One note, live synced across your devices.',
		year: 'Dec 2024 — present',
		role: 'Solo',
		tags: ['Tauri', 'Rust', 'on-device ML', 'shipped'],
		hero: null,

		summary:
			'A cross-platform note-taking and knowledge-management app built around an infinite canvas: write by hand, type alongside ink, embed PDFs and images, and organize work into notebooks, pages, folders, and tags. It includes backlinks and a graph view, handwriting-aware search, live peer sync across devices, GitHub and Google Drive repository sync, and live audio transcription. Shipped through 13 public releases on automated GitHub Actions pipelines.',
		stack: ['React', 'TypeScript', 'Tauri', 'Rust'],
		screenshots: [
			{
				src: 'myelin-library.png',
				alt: 'Myelin Notes library showing folders, tags, and recently opened canvases.',
				caption: 'Library'
			},
			{
				src: 'myelin-graph.png',
				alt: 'Myelin Notes graph view showing connections between notes.',
				caption: 'Note graph'
			},
			{
				src: 'myelin-pdf.png',
				alt: 'Myelin Notes canvas with an annotated PDF.',
				caption: 'PDF workspace'
			}
		],
		// TODO: add a short annotated excerpt of the staleness hash check.
		siteUrl: 'https://trymyelin.app/',
		contributions: [
			'Built the infinite canvas editor for handwriting, typed text, embedded PDFs and images, Markdown page frames, and LaTeX content.',
			'Built import and export pipelines for Goodnotes, Obsidian, OneNote, Markdown, PDFs, and workspace JSON.',
			'Implemented live peer sync across devices with iroh, plus repository sync through GitHub and Google Drive OAuth clients.',
			'Built backlinks, a note graph view, hierarchical tags, and search across notes and recognized handwriting.',
			'Implemented on-device semantic search by running the all-MiniLM-L6-v2 embedding model locally with Candle, backed by a background indexing engine with debouncing, bounded concurrency, and staleness hashing.',
			'Built live audio transcription of streamed microphone input with whisper.cpp, using a quantized model and optional Vulkan GPU acceleration with a CPU fallback.',
			'Shipped 13 public releases through automated GitHub Actions build and release pipelines.'
		]
	},

	{
		slug: 'astrodescent',
		title: 'Astrodescent',
		tagline: 'A 2D game engine, written because the game needed one',
		year: 'Aug 2026 — present',
		role: 'Engine and gameplay programmer',
		tags: ['C#', 'Raylib', 'GLSL', 'rendering'],
		hero: null,

		summary:
			'A 2D space mining game built from scratch on Raylib. Mine an alien planet, manage your oxygen, haul resources back to the surface, and spend your earnings on upgrades that let you go deeper. It includes custom rendering, dynamic lighting, tile physics, procedural planet generation, and a data-driven content pipeline, and is shipping on Steam.',
		stack: ['C#', 'Raylib', 'GLSL', 'Steamworks'],
		siteUrl: 'https://store.steampowered.com/app/3973750/Astrodescent',
		contributions: [
			'Wrote a custom deferred renderer with a post-processing chain, dynamic 2D lighting, texture atlasing, and a pixel-font UI system.',
			'Wrote the gameplay physics from scratch: swept AABB tile collision, and DDA grid raycasting for mining and tool targeting.',
			'Built a data-driven content registry for tiles, items, biomes, and planets, so content is authored as data rather than code.',
			'Implemented procedural planet generation using Perlin noise with Poisson-disc feature placement.'
		]
	},

	{
		slug: 'party-lab',
		title: 'Party Lab',
		tagline: 'A Lua-scriptable engine and hub for multiplayer party games',
		year: 'Jul 2024 — Dec 2024',
		role: 'Solo',
		duration: '6 months',
		tags: ['C++', 'Lua', 'networking', 'sandboxing'],
		hero: null,

		summary:
			'A framework and hub for multiplayer party games: games are Lua modules loaded into a sandbox at runtime, so a new mode is a script rather than a build. The C++ side owns rendering, networking, and the declarative UI API those scripts draw through.',
		stack: ['C++', 'Raylib', 'Lua', 'sol2', 'GameNetworkingSockets', 'Steamworks'],
		repoUrl: 'https://github.com/winterSteve25/PartyLab',
		contributions: [
			'Built the framework and its declarative UI API in C++ on Raylib.',
			'Integrated Lua scripting through sol2 inside a sandboxed environment, so modding and custom game modes are safe to load.',
			"Implemented multiplayer networking on Valve's GameNetworkingSockets, and integrated the Steam API for friend invites and leaderboards."
		]
	}
];
