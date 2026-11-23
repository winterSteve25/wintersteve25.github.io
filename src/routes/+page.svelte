<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import Star from '$lib/components/Star.svelte';
	import { profile } from '$lib/content/profile';
	import { page as gamesPage } from '$lib/content/games';
	import { page as swePage } from '$lib/content/swe';
	import { pageHref } from '$lib/routes';

	const doors = [
		{
			id: 'swe' as const,
			side: 'software',
			title: 'Software Engineer',
			ticket: 'Software',
			blurb:
				'Rust, WebAssembly and TypeScript. A DOCX renderer at Diffchecker, a Nokia internship, and Myelin Notes: a cross-platform notes app with 21 public releases.',
			cta: 'Open Software'
		},
		{
			id: 'game-dev' as const,
			side: 'games',
			title: 'Game Developer',
			ticket: 'Game Dev',
			blurb:
				'Astrodescent on a custom C# and OpenGL engine, plus jam games in Godot and Unity: GLSL effects, gameplay systems and game feel.',
			cta: 'Open Game Dev'
		}
	];

	const resumes = [
		{ label: 'Software Resume', file: swePage.resume },
		{ label: 'Game Dev Resume', file: gamesPage.resume }
	].filter((r): r is { label: string; file: string } => !!r.file);
</script>

<Seo title={profile.name} description={profile.landingHeadline} />

<div class="site" data-side="home">
	<SiteNav />

	<Hero eyebrow="{profile.location} · CS @ UBC" lines={['CADEN', 'ZHANG']} stripLabel="CADEN ZHANG">
		<p class="lede">
			<strong>Software engineer and game developer.</strong> I build gameplay systems, rendering and
			VFX, desktop apps in Rust, and the tools that make development smoother.
		</p>
		<div class="now">
			<a href="https://trymyelin.app/" target="_blank" rel="noreferrer">
				<small>Currently building</small><b>Myelin Notes</b>
			</a>
			<a href="https://store.steampowered.com/app/3973750/Astrodescent" target="_blank" rel="noreferrer">
				<small>Currently shipping on Steam</small><b>Astrodescent</b>
			</a>
		</div>
		{#snippet extra()}
			<Star id="home-hero" place="right: 4%; top: 6px" tilt={-14} />
		{/snippet}
	</Hero>

	<main class="wrap doors" aria-label="Pages">
		{#each doors as door (door.id)}
			<a class="door {door.side}" href={pageHref(door.id)}>
				<span class="ticket">Page · {door.ticket}</span>
				<h2>{door.title}</h2>
				<p>{door.blurb}</p>
				<span class="go">{door.cta} &rarr;</span>
			</a>
		{/each}
	</main>

	<SiteFooter {resumes} />
</div>

<style>
	.now {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		margin-top: 22px;
	}

	.now a {
		display: block;
		padding: 10px 14px;
		text-decoration: none;
		background: var(--paper);
		border: 3px solid var(--ink);
		transform: skewX(-6deg);
		transition:
			background 0.15s,
			color 0.15s;
	}

	.now b {
		display: block;
		font: 400 19px/1.1 var(--display);
	}

	.now small {
		color: var(--muted);
		font-weight: 500;
	}

	.now a:hover {
		background: var(--ink);
		color: var(--paper);
	}

	.now a:hover small {
		color: #cfc8b6;
	}

	.doors {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 30px;
		align-content: start;
		padding-block: 20px 50px;
	}

	.door {
		position: relative;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 26px 26px 24px;
		text-decoration: none;
		border: 4px solid var(--ink);
		box-shadow: 10px 10px 0 var(--ink);
		transition:
			transform 0.25s cubic-bezier(0.2, 1.6, 0.4, 1),
			box-shadow 0.2s;
	}

	.door.software {
		background: var(--cyan);
		transform: rotate(-1.2deg);
	}

	.door.games {
		background: var(--yellow);
		transform: rotate(1.2deg) translateY(18px);
	}

	.door:hover {
		transform: rotate(0) translateY(-6px);
		box-shadow: 14px 14px 0 var(--pop);
	}

	.door h2 {
		font: 400 clamp(34px, 4.6vw, 58px) / 0.9 var(--display);
		letter-spacing: -0.03em;
	}

	.door p {
		max-width: 52ch;
	}

	.go {
		align-self: flex-start;
		margin-top: auto;
		padding: 10px 14px;
		font: 400 17px/1 var(--display);
		background: var(--ink);
		color: var(--paper);
		transform: skewX(-10deg);
	}

	.ticket {
		position: absolute;
		top: -16px;
		right: 18px;
		padding: 6px 10px;
		font: 700 13px/1 var(--body);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		background: var(--paper);
		border: 3px solid var(--ink);
		transform: rotate(4deg);
	}

	@media (max-width: 860px) {
		.doors {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.door.games {
			transform: rotate(1deg);
		}
	}

	@media (max-width: 520px) {
		.now {
			grid-template-columns: 1fr;
		}
	}
</style>
