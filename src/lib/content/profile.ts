/** Everything about you that is not a project. */
export const profile = {
	name: 'Caden Zhang',
	/** Used on the home page, where you don't know who is reading. */
	landingHeadline: 'Software engineer and game developer',
	/** One line under the headline. Say where you are and what you are doing. */
	blurb:
		'Computer science at UBC. Currently writing Rust and WebAssembly at Diffchecker, and a 2D engine for a game headed to Steam.',
	location: 'Vancouver, BC',

	email: 'cadenz.personal@gmail.com',

	links: [
		{ label: 'GitHub', href: 'https://github.com/winterSteve25' },
		{ label: 'itch.io', href: 'https://wintersteve25.itch.io' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/cadenz' }
	],

	/**
	 * Canonical origin, used for absolute OG image URLs (link previews need
	 * absolute paths). Set this to your custom domain once DNS is live.
	 */
	origin: 'https://example.com' // TODO
};
