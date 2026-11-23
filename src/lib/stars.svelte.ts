// Hidden stars scattered across the site. Found stars are remembered in this
// browser only; nothing is sent anywhere.

export const STAR_IDS = [
	'home-hero',
	'footer',
	'swe-screens',
	'swe-education',
	'swe-skills',
	'games-hero',
	'games-frame',
	'games-card'
] as const;

export type StarId = (typeof STAR_IDS)[number];

const KEY = 'cz-stars';

class Stars {
	found = $state<StarId[]>([]);
	message = $state('');
	messageId = $state(0);

	readonly total = STAR_IDS.length;

	load() {
		try {
			const saved: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
			if (Array.isArray(saved)) {
				this.found = STAR_IDS.filter((id) => saved.includes(id));
			}
		} catch {
			// Storage can be blocked; the stars still work for this visit.
		}
	}

	has(id: StarId) {
		return this.found.includes(id);
	}

	collect(id: StarId) {
		if (this.has(id)) return;
		this.found = [...this.found, id];
		try {
			localStorage.setItem(KEY, JSON.stringify(this.found));
		} catch {
			// Ignore storage failures.
		}
		const n = this.found.length;
		this.message =
			n === this.total
				? `All ${n} stars found. Thanks for looking around.`
				: `Star found · ${n} of ${this.total}`;
		this.messageId++;
	}
}

export const stars = new Stars();
