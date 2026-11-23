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
			'Built the localization system that lets the Diffchecker desktop app ship in multiple languages.'
		],
		url: 'https://www.diffchecker.com'
	},
	{
		company: 'Nokia',
		role: 'Software Engineering Intern',
		period: 'Jul 2023 — Aug 2023',
		stack: ['Linux', 'Grafana', 'Prometheus', 'Robot Framework', 'Power BI'],
		highlights: [
			'Found and fixed 3 recurring performance bottlenecks in the Netguard Endpoint Detection and Response product on Linux VMs, using Grafana and Prometheus.',
			'Automated Jira ticket tracking with Power BI dashboards so the team could see where work stood.',
			'Raised test coverage by 10% across several platforms with red-team assessments built on Caldera and Robot Framework.'
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
			'A local-first note-taking app for Mac, Windows, and Linux that puts handwriting, typed pages, and PDFs on one infinite canvas. Mark up PDFs and export them, write rich-text pages with tables, math, diagrams, and runnable code, record lectures with on-device transcription, and connect notes with links, backlinks, and a graph view. Notes are plain files that work fully offline, sync peer to peer with live collaboration and no server in the middle, and are readable by your own AI agents through a local MCP server. Shipped through 21 public releases on automated GitHub Actions pipelines.',
		stack: ['React', 'TypeScript', 'Tauri', 'Rust', 'Yjs'],
		screenshots: [
			{
				src: 'myelin/web-hero.jpg',
				video: 'myelin/web-hero.mp4',
				alt: 'Myelin Notes canvas with a PDF and a typed note side by side, next to the library sidebar.',
				caption: 'Canvas'
			},
			{
				src: 'myelin/web-pdf.jpg',
				video: 'myelin/web-pdf.mp4',
				alt: 'Writing on a PDF with the pen tool in Myelin Notes.',
				caption: 'PDF markup'
			},
			{
				src: 'myelin/web-code.jpg',
				video: 'myelin/web-code.mp4',
				alt: 'A Myelin Notes page with a runnable code block.',
				caption: 'Pages'
			},
			{
				src: 'myelin/web-audio.jpg',
				video: 'myelin/web-audio.mp4',
				alt: 'Recording a lecture in Myelin Notes with a live on-device transcript.',
				caption: 'Audio & transcripts'
			},
			{
				src: 'myelin/ft-live-collab.jpg',
				video: 'myelin/ft-live-collab.mp4',
				alt: 'Two computers editing the same Myelin note live over an encrypted peer-to-peer connection.',
				caption: 'Live collaboration'
			},
			{
				src: 'myelin/ft-mcp-agent.jpg',
				video: 'myelin/ft-mcp-agent.mp4',
				alt: 'An AI agent reading and editing a handwritten Myelin note through the local MCP server.',
				caption: 'Local MCP server'
			}
		],
		siteUrl: 'https://trymyelin.app/',
		contributions: [
			'Built the infinite canvas editor: pressure-sensitive ink with palm rejection, shape snapping, a ruler, lasso selection, a tool wheel with pen presets, flags, and per-canvas styles.',
			'Built PDF annotation with page navigation, in-PDF search, quoting from PDFs into notes, ink anchored to the page, and annotated PDF export.',
			'Built rich-text page frames with Markdown shortcuts, a slash menu, tables, callouts, LaTeX, mermaid diagrams, embed cards, and runnable code blocks.',
			'Implemented live peer-to-peer collaboration over encrypted QUIC with iroh and Yjs, with no server holding notes, plus repository sync through GitHub.',
			'Built a local MCP server on 127.0.0.1 so the user\'s own AI agents can read notes, with writes off until enabled in Settings.',
			'Built links, backlinks, hover previews, a graph view, nested tags, a command palette, and per-file version history.',
			'Built importers for Goodnotes, OneNote, Obsidian, and Notion, and export to PDF, Markdown, Obsidian, and JSON.',
			'Implemented on-device semantic search by running the all-MiniLM-L6-v2 embedding model locally with Candle, backed by a background indexing engine with debouncing, bounded concurrency, and staleness hashing.',
			'Built audio recording with on-device transcription using whisper.cpp, a quantized model, and optional Vulkan GPU acceleration with a CPU fallback.',
			'Shipped 21 public releases in four languages through automated GitHub Actions build and release pipelines.'
		]
	},

	{
		slug: 'tau',
		title: 'Tau',
		tagline: 'Flutter-like UI composition for Minecraft Forge',
		year: 'Apr 2023 — Dec 2024',
		role: 'Solo',
		tags: ['Java', 'Minecraft Forge', 'UI library', 'open source'],
		hero: null,

		summary:
			'An open-source UI library for Minecraft Forge that replaces the usual GUI workflow with composable, Flutter-inspired components. Tau supports responsive layouts, screens and HUDs, theming, and custom widgets.',
		stack: ['Java', 'Minecraft Forge', 'Gradle'],
		siteUrl: 'https://mc-tau-ui.github.io/',
		repoUrl: 'https://github.com/mc-tau-ui/Tau',
		contributions: [
			'Designed a declarative component API, so a Minecraft screen is described in code that reads like its layout.',
			'Built separate renderers for screens and HUD overlays on top of Minecraft UI primitives.',
			'Wrote the widget, layout, and theming system that other mods extend, plus the documentation and starter templates.'
		]
	},

	{
		slug: 'astrodescent',
		title: 'Astrodescent',
		tagline: 'A 2D game engine, written because the game needed one',
		year: 'Aug 2026 — present',
		role: 'Engine and gameplay programmer',
		tags: ['C#', 'OpenGL', 'GLSL', 'rendering'],
		hero: null,

		summary:
			'A 2D space mining game built from scratch on OpenGL. Mine an alien planet, manage your oxygen, haul resources back to the surface, and spend your earnings on upgrades that let you go deeper. It includes custom rendering, dynamic lighting, tile physics, procedural planet generation, and a data-driven content pipeline, and is shipping on Steam.',
		stack: ['C#', 'OpenGL', 'GLSL', 'Steamworks'],
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
