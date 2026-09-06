import type { GameProject, PageMeta, ShippedEntry } from './types';

export const page: PageMeta = {
	id: 'game-dev',
	nav: 'Games',
	title: 'Game Developer',
	intro:
		'CS @ UBC. Currently working on Astrodescent, a 2D incremental mining game launching on Steam this year. I like building gameplay systems, VFX, computer graphics related features, and the custom tools that make development smoother.',
	hue: 45,
	resume: 'resume-game-dev.pdf'
};

export const projects: GameProject[] = [
	{
		slug: 'astrodescent',
		title: 'Astrodescent',
		tagline: 'Mine an alien planet, get out before the oxygen does',
		year: 'Aug 2026 — present',
		role: 'Programming',
		engine: 'None — C# on Raylib',
		tags: ['mining', 'pixel art', 'Steam'],
		hero: null,

		pitch:
			'Land on an alien planet, dig for resources, and get back up before your oxygen runs out. Sell what you hauled, buy the upgrade that lets you go deeper, and go again.',
		itchPageUrl: 'https://wintersteve25.itch.io/astrodescent',
		itchEmbedUrl: 'https://itch.io/embed-upload/14823388?color=AD9B89',
		// The Unity export hardcodes a 960x600 canvas with a 38px footer. The outer
		// itch frame adds a 1px top edge, 1px side edges, and its own 20px footer.
		itchEmbedWidth: 962,
		itchEmbedHeight: 659,
		itchEmbedColor: '#AD9B89',
		hideItchFullscreen: true,
		controls: 'WASD to move · mouse to look and interact · E for inventory',
		playableBuildNote:
			'The original game jam prototype below was built in Unity, with art and visual direction by felixrl. The current Steam release is a substantially expanded C# and Raylib rewrite developed with a new collaborator.',
		storeUrl: 'https://store.steampowered.com/app/3973750/Astrodescent',

		contribution: [
			{
				area: 'Engine',
				points: [
					'Built engine-up on Raylib with no game engine underneath — everything below is written for this game rather than configured.'
				]
			},
			{
				area: 'Rendering',
				points: [
					'Custom deferred renderer with dynamic 2D lighting.',
					'Post-processing chain in GLSL.',
					'Texture atlasing, and a pixel-font UI system to draw the interface in.'
				]
			},
			{
				area: 'Physics',
				points: [
					'Gameplay physics from scratch: swept AABB tile collision.',
					'DDA grid raycasting, so mining and tool targeting hit exactly the tile you are pointing at.'
				]
			},
			{
				area: 'Content & world',
				points: [
					'Data-driven content registry for tiles, items, biomes, and planets, so new content is data rather than code.',
					'Procedural planet generation with Perlin noise and Poisson-disc feature placement, so features spread out instead of clumping.'
				]
			}
		],
		collaborators: [
			{
				who: 'felixrl',
				what: 'Art and visual direction for the original Unity game jam prototype.',
				url: 'https://felixrl.itch.io'
			}
		]
	},

	{
		slug: 'sand-of-souls',
		title: 'Sand of Souls',
		tagline: 'A topdown survivor shooter where your health and your ammo are the same hourglass',
		year: 'Jul 2026',
		role: 'VFX and gameplay programming',
		engine: 'Godot',
		teamSize: '19',
		duration: '4 days',
		tags: ['GMTK 2026', 'game jam', 'survivor shooter'],
		hero: null,

		pitch:
			'Spending ammo spends your health, because the same draining hourglass is both. Built in four days with a team of nineteen for GMTK Game Jam 2026, against 10,600+ other entries.',
		itchPageUrl: 'https://patrickzhou45.itch.io/sand-of-souls',
		itchEmbedUrl: 'https://itch.io/embed-upload/18705654?color=333333',
		itchEmbedWidth: 1280,
		itchEmbedHeight: 740,

		contribution: [
			{
				area: 'VFX (GLSL)',
				points: [
					'Enemy disintegration on death.',
					'Screen-space vignette and desaturation as the hourglass drains.',
					'Bloom, muzzle flashes, and projectile trails.'
				]
			},
			{
				area: 'Gameplay',
				points: [
					'Enemy archetypes, and the wave-based difficulty scaler that introduces them.'
				]
			},
			{
				area: 'UI',
				points: ['The full menu and HUD flow, including its animations.']
			}
		],
		collaborators: [
			{
				who: 'The other 18 people on the team',
				what: 'Design, art, audio, and the rest of the gameplay code — this was a jam team, and the parts above are the ones I own.'
			}
		]
	},

	{
		slug: 'party-lab',
		title: 'Party Lab',
		tagline: 'A hub for multiplayer party games, where a new game is a Lua script',
		year: 'Jul 2024 — Dec 2024',
		role: 'Solo',
		engine: 'None — C++ on Raylib',
		duration: '6 months',
		tags: ['multiplayer', 'modding', 'Steam'],
		hero: null,

		pitch:
			'Get everyone into one lobby and play short games without leaving it. Each game is a Lua module the hub loads at runtime, so anyone can write a new one without touching the engine or shipping a build.',
		repoUrl: 'https://github.com/winterSteve25/PartyLab',

		contribution: [
			{
				area: 'Framework',
				points: [
					'The whole thing, solo, in C++ on Raylib.',
					'A declarative UI API that games lay themselves out through, rather than positioning anything by hand.'
				]
			},
			{
				area: 'Scripting',
				points: [
					'Lua modules run in a sol2 sandbox, so modded modes load at runtime and cannot reach the host.'
				]
			},
			{
				area: 'Networking',
				points: [
					"Multiplayer on Valve's GameNetworkingSockets.",
					'Steam friend invites and leaderboards, so a lobby starts from the friends list.'
				]
			}
		]
	}
];

export const alsoShipped: ShippedEntry[] = [
	{
		title: 'LoopBound',
		blurb:
			'Your bullets loop around the edge of a shrinking arena and come back at you. Kill enemies to widen it.',
		url: 'https://wintersteve25.itch.io/loopbound'
	},
	{
		title: 'Bingo Spree',
		blurb: 'Help Jimmy go shopping on a Black Friday.',
		url: 'https://tgedev.itch.io/bingo-spree',
		context: 'Brackeys Game Jam 2024.2'
	},
	{
		title: 'Biometrics',
		blurb: 'A sci-fi dungeon crawler set inside a simulation that insists none of it is real.',
		url: 'https://wintersteve25.itch.io/biometrics',
		context: 'Brackeys Game Jam 2022.1'
	}
];
