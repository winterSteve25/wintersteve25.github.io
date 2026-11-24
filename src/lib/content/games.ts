import type { GameProject, PageMeta, ShippedEntry } from './types';

export const page: PageMeta = {
	id: 'game-dev',
	nav: 'Games',
	title: 'Game Developer',
	intro:
		'CS @ UBC. Currently working on Astrodescent, a 2D incremental mining game launching on Steam this year. I like building gameplay systems, VFX, graphics programming, and the custom tools that make development smoother.',
	hue: 45,
	resume: 'resume-game-dev.pdf'
};

export const projects: GameProject[] = [
	{
		slug: 'astrodescent',
		stamp: 'Steam',
		title: 'Astrodescent',
		tagline: 'Mine an alien planet, get out before the oxygen does',
		year: 'Aug 2026 — present',
		role: 'Programming',
		engine: 'Custom (C# / OpenGL)',
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
		previewImage: 'games/astrodescent-preview.png',
		controls: 'WASD to move · mouse to look and interact · E for inventory',
		playableBuildLabel: 'Original Unity jam version',
		playableBuildNote:
			'This is the original game jam prototype, made in Unity with art and visual direction by felixrl. The Steam version is a full rewrite in C# and OpenGL with a new collaborator.',
		storeUrl: 'https://store.steampowered.com/app/3973750/Astrodescent',

		contribution: [
			{
				area: 'Engine',
				points: [
					"Doesn't use an existing engine. I wrote the renderer, physics, and content systems myself on top of OpenGL."
				]
			},
			{
				area: 'Rendering',
				points: [
					'Custom deferred renderer with dynamic 2D lighting.',
					'Post-processing effects written in GLSL.',
					'Texture atlasing and a pixel-font UI system.'
				]
			},
			{
				area: 'Physics',
				points: [
					'Tile collision using swept AABB.',
					'DDA grid raycasting so mining and tools hit the tile under the cursor.'
				]
			},
			{
				area: 'Content & world',
				points: [
					"Data-driven registry for tiles, items, biomes, and planets, so adding content doesn't require code changes.",
					'Procedural planet generation using Perlin noise, with Poisson-disc sampling to space out features evenly.'
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
		slug: 'party-lab',
		stamp: 'Solo',
		title: 'Party Lab',
		tagline: 'A hub for Lua-based multiplayer party games like Jackbox',
		year: 'Jul 2024 — Dec 2024',
		role: 'Solo',
		engine: 'Custom (C++ / Raylib)',
		duration: '6 months',
		tags: ['multiplayer', 'modding', 'Steam'],
		hero: null,

		pitch:
			'Players join one lobby and pick from a set of short party games. Each game is a Lua script loaded at runtime, so people can write new ones without rebuilding the app.',
		repoUrl: 'https://github.com/winterSteve25/PartyLab',

		contribution: [
			{
				area: 'Framework',
				points: [
					'Wrote the framework myself in C++ using Raylib.',
					'Built a declarative UI API so games describe their layout instead of positioning elements by hand.'
				]
			},
			{
				area: 'Scripting',
				points: [
					'Games run as Lua scripts in a sol2 sandbox, which keeps custom game modes from accessing the host system.'
				]
			},
			{
				area: 'Networking',
				points: [
					"Multiplayer networking built on Valve's GameNetworkingSockets.",
					'Steam integration for friend invites and leaderboards.'
				]
			}
		]
	},

	{
		slug: 'tau',
		stamp: 'Open source',
		title: 'Tau',
		tagline: 'Flutter-like UI composition for Minecraft Forge',
		year: 'Apr 2023 — Dec 2024',
		role: 'Solo',
		engine: 'Minecraft Forge — Java',
		tags: ['UI library', 'modding', 'open source'],
		hero: null,

		pitch:
			'An open-source UI library for Minecraft Forge that replaces the usual GUI workflow with composable, Flutter-inspired components. Tau supports responsive layouts, screens and HUDs, theming, and custom widgets.',
		siteUrl: 'https://mc-tau-ui.github.io/',
		repoUrl: 'https://github.com/mc-tau-ui/Tau',

		contribution: [
			{
				area: 'UI API',
				points: [
					'Designed a declarative component API where the code for a screen mirrors its layout.'
				]
			},
			{
				area: 'Rendering',
				points: [
					'Built separate renderers for screens and HUD overlays on top of Minecraft UI primitives.'
				]
			},
			{
				area: 'Developer tools',
				points: [
					'Wrote the widget, layout, and theming system that other mods extend, plus the documentation and starter templates.'
				]
			}
		]
	},

	{
		slug: 'gunplay',
		stamp: 'Team',
		title: 'Gunplay',
		tagline: 'A physically based, hyper-realistic first-person shooter',
		year: 'Jul 2025 — Jan 2026',
		role: 'Programming',
		engine: 'Unity',
		tags: ['FPS', 'physics', 'team project'],
		hero: null,

		pitch:
			'An FPS built with a team led by Bael, focused on realistic character reactions and physics interactions.',
		videoEmbedUrl:
			'https://www.youtube.com/embed/zeGEXJWIkyQ?si=Dpkbxt67g8v-xUKA',

		contribution: [
			{
				area: 'Physics',
				points: [
					'Implemented and tuned the ragdoll physics.'
				]
			},
			{
				area: 'UAV system',
				points: [
					'Built the UAV system, including aircraft movement and player controls.'
				]
			}
		],
		collaborators: [
			{
				who: 'Bael',
				what: 'Led the development team behind Gunplay.',
				url: 'https://bael.ca/'
			}
		]
	},

	{
		slug: 'sand-of-souls',
		stamp: 'GMTK 2026',
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
			'Your health and ammo come from the same hourglass, so every shot costs you sand. Made in four days by a team of 19 for GMTK Game Jam 2026, which had over 10,600 entries.',
		itchPageUrl: 'https://patrickzhou45.itch.io/sand-of-souls',
		itchEmbedUrl: 'https://itch.io/embed-upload/18705654?color=333333',
		itchEmbedWidth: 1280,
		itchEmbedHeight: 740,
		previewImage: 'games/sand-of-souls-preview.jpg',

		contribution: [
			{
				area: 'VFX (GLSL)',
				points: [
					'Disintegration effect when enemies die.',
					'Vignette and desaturation that get stronger as the hourglass drains.',
					'Bloom, muzzle flashes, and projectile trails.'
				]
			},
			{
				area: 'Gameplay',
				points: [
					'Enemy types and the wave system that brings them in as the difficulty ramps up.'
				]
			},
			{
				area: 'UI',
				points: ['Menus and HUD, including their animations.']
			}
		],
		collaborators: [
			{
				who: 'The rest of the team',
				what: 'Design, art, audio, and the remaining gameplay code.'
			}
		]
	},

	{
		slug: 'loopbound',
		stamp: 'GMTK 2025',
		title: 'LoopBound',
		tagline: 'Miss a shot and it loops around the arena to come back at you',
		year: 'Aug 2025',
		role: 'Solo',
		engine: 'Unity',
		duration: '4 days',
		tags: ['GMTK 2025', 'game jam', 'survivor shooter'],
		hero: null,

		pitch:
			'Fight inside shrinking circular zones where every missed bullet wraps around the edge and becomes a threat. Kill enemies to push the zones back, earn upgrades, and reshape the battlefield before your own shots catch up with you.',
		itchPageUrl: 'https://wintersteve25.itch.io/loopbound',
		itchEmbedUrl: 'https://itch.io/embed-upload/14548362?color=3e0d5c',
		itchEmbedWidth: 962,
		itchEmbedHeight: 659,
		itchEmbedColor: '#3e0d5c',
		hideItchFullscreen: true,
		previewImage: 'games/loopbound-preview.jpg',

		contribution: [
			{
				area: 'Core mechanic',
				points: [
					'Built projectiles that wrap around the edge of circular zones and can return to damage the player.',
					'Made enemy kills push the shrinking zones back out.'
				]
			},
			{
				area: 'Gameplay',
				points: [
					'Built the top-down movement, shooting, enemies, upgrades, and survivor-style progression loop.'
				]
			},
			{
				area: 'Presentation',
				points: [
					'Made the art, UI, animation, and combat feedback. Music, sound effects, icons, and a nebula shader (which I modified) are by other people and credited in the game.'
				]
			}
		],
		collaborators: [
			{
				who: 'Noah',
				what: 'Music.',
				url: 'https://github.com/bellflwr'
			}
		]
	},

	{
		slug: 'bingo-spree',
		stamp: 'Brackeys',
		title: 'Bingo Spree',
		tagline: 'Finish your shopping list before Black Friday floods the store',
		year: 'Sep 2024',
		role: 'Programming',
		engine: 'Unity',
		teamSize: '2',
		duration: '7 days',
		tags: ['Brackeys 2024.2', 'game jam', 'arcade'],
		hero: null,

		pitch:
			'Race through a supermarket, grab items from your bingo card, and reach the checkout before the Black Friday rush begins. Taking everything is quicker, but careful shopping gets a higher score.',
		itchPageUrl: 'https://tgedev.itch.io/bingo-spree',
		itchEmbedUrl: 'https://itch.io/embed-upload/11482170?color=5ac54f',
		itchEmbedWidth: 962,
		itchEmbedHeight: 659,
		itchEmbedColor: '#5ac54f',
		hideItchFullscreen: true,
		previewImage: 'games/bingo-spree-preview.png',
		controls: 'WASD to move · click items to collect them',

		contribution: [
			{
				area: 'Gameplay',
				points: [
					'Programmed the player movement, shopping-cart handling, and item collection interactions.',
					'Built the bingo-card objectives, checkout deadline, bonuses, penalties, and final scoring flow.'
				]
			},
			{
				area: 'Game feel',
				points: [
					'Implemented cart drifting, speed effects, and UI feedback.'
				]
			}
		],
		collaborators: [
			{
				who: 'TGEDev',
				what: 'Art and visual direction.',
				url: 'https://tgedev.itch.io'
			}
		]
	}
];

export const alsoShipped: ShippedEntry[] = [
	{
		title: 'Biometrics',
		blurb: 'A sci-fi dungeon crawler set inside a simulation that insists none of it is real.',
		url: 'https://wintersteve25.itch.io/biometrics',
		context: 'Brackeys Game Jam 2022.1'
	}
];
