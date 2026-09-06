import type { Education, Experience, PageMeta, SkillGroup, SystemProject } from './types';

export const page: PageMeta = {
	id: 'swe',
	nav: 'Software',
	title: 'Software Engineer',
	headline: 'Systems, tools, and things that have to hold up',
	intro:
		'CS at UBC, currently shipping Rust and WASM at Diffchecker. Most of what I build is close to the metal by choice — a document renderer, a note-taking app that runs its own embedding and speech models on-device, a 2D engine written without an engine.',
	hue: 195
	// TODO: add the resume and OG image files to `static/`, then set `resume` and `ogImage`.
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
		tagline: 'Goodnotes and Obsidian in one app, with the models running on your machine',
		year: 'Dec 2024 — present',
		role: 'Solo',
		tags: ['Tauri', 'Rust', 'on-device ML', 'shipped'],
		hero: null,

		summary:
			'A cross-platform note-taking and knowledge-management app, shipped through 13 public releases on automated GitHub Actions pipelines. Everything that would normally be an API call — embeddings, speech-to-text — runs locally instead, which is the constraint the whole backend is designed around.',
		stack: ['React', 'TypeScript', 'Tauri', 'Rust', 'Candle', 'whisper.cpp'],
		systems: [
			{ id: 'vault', label: 'Note vault', to: ['watch'] },
			{ id: 'watch', label: 'Change watcher (debounced)', to: ['queue'] },
			{ id: 'queue', label: 'Index queue (bounded, staleness-hashed)', to: ['embed'] },
			{ id: 'embed', label: 'all-MiniLM-L6-v2 via Candle', to: ['index'] },
			{ id: 'index', label: 'Vector index', to: ['search'] },
			{ id: 'search', label: 'Semantic search', to: [] }
		],
		// TODO: add a short annotated excerpt of the staleness hash check or VAD gate.
		siteUrl: 'https://trymyelin.app/',
		contributions: [
			'Implemented on-device semantic search by running the all-MiniLM-L6-v2 embedding model locally with Candle, backed by a background indexing engine with debouncing, bounded concurrency, and staleness hashing.',
			'Built live audio transcription of streamed microphone input with whisper.cpp, using a quantized model, voice-activity detection, and optional Vulkan GPU acceleration with a CPU fallback.',
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
			'A 2D space mining game shipping on Steam, built engine-up on Raylib with no game engine underneath it. That decision is the interesting part: everything a commercial engine would have handed over — the renderer, the lighting, the collision, the content pipeline — is written here.',
		stack: ['C#', 'Raylib', 'GLSL', 'Steamworks'],
		systems: [
			{ id: 'registry', label: 'Content registry', to: ['worldgen'] },
			{ id: 'worldgen', label: 'Procedural planet gen', to: ['grid'] },
			{ id: 'grid', label: 'Tile grid', to: ['physics', 'gbuffer'] },
			{ id: 'physics', label: 'Swept AABB + DDA raycast', to: [] },
			{ id: 'gbuffer', label: 'Deferred renderer', to: ['post'] },
			{ id: 'post', label: 'Post-processing chain', to: [] }
		],
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
		systems: [
			{ id: 'hub', label: 'Hub runtime (C++)', to: ['sandbox', 'net'] },
			{ id: 'sandbox', label: 'Lua sandbox (sol2)', to: ['ui'] },
			{ id: 'ui', label: 'Declarative UI API', to: ['render'] },
			{ id: 'render', label: 'Raylib renderer', to: [] },
			{ id: 'net', label: 'GameNetworkingSockets', to: ['steam'] },
			{ id: 'steam', label: 'Steam invites & leaderboards', to: [] }
		],
		repoUrl: 'https://github.com/winterSteve25/PartyLab',
		contributions: [
			'Built the framework and its declarative UI API in C++ on Raylib.',
			'Integrated Lua scripting through sol2 inside a sandboxed environment, so modding and custom game modes are safe to load.',
			"Implemented multiplayer networking on Valve's GameNetworkingSockets, and integrated the Steam API for friend invites and leaderboards."
		]
	}
];
