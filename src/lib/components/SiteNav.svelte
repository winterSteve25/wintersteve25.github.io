<script lang="ts">
	import { pages } from '$lib/content/pages';
	import { homeHref, pageHref } from '$lib/routes';
	import { profile } from '$lib/content/profile';
	import { stars } from '$lib/stars.svelte';
	import type { PageId } from '$lib/content/types';

	interface Props {
		current?: PageId;
	}
	let { current }: Props = $props();

	const labels: Record<PageId, string> = { swe: 'Software', 'game-dev': 'Game Dev' };
	const allFound = $derived(stars.found.length === stars.total);
</script>

<header class="top">
	<nav class="wrap" aria-label="Primary">
		<a class="brand" href={homeHref()}>{profile.name}</a>
		<ul>
			{#each pages as p (p.id)}
				<li>
					<a
						href={pageHref(p.id)}
						data-side={p.id === 'swe' ? 'software' : 'games'}
						aria-current={p.id === current ? 'page' : undefined}>{labels[p.id]}</a
					>
				</li>
			{/each}
		</ul>
		{#key stars.found.length}
			<span
				class="found"
				class:all={allFound}
				class:bump={stars.found.length > 0}
				title="Stars hidden around the site"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
				</svg>
				<span class="visually-hidden">Stars found:</span>
				{stars.found.length}/{stars.total}
			</span>
		{/key}
	</nav>
</header>

<style>
	.top {
		position: sticky;
		top: 0;
		z-index: 20;
		background: var(--ink);
		color: var(--paper);
		padding-top: env(safe-area-inset-top, 0px);
	}

	nav {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px 18px;
		padding-block: 10px;
	}

	.brand {
		margin-right: auto;
		font: 400 20px/1 var(--display);
		letter-spacing: -0.01em;
		text-decoration: none;
		color: var(--paper);
	}

	.brand:hover {
		color: var(--yellow);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		display: inline-block;
		padding: 8px 12px;
		font: 700 15px/1 var(--body);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-decoration: none;
		transform: skewX(-12deg);
		transition:
			background 0.15s,
			color 0.15s;
	}

	ul a[data-side='software']:hover,
	ul a[data-side='software'][aria-current='page'] {
		background: var(--cyan);
		color: var(--ink);
	}

	ul a[data-side='games']:hover,
	ul a[data-side='games'][aria-current='page'] {
		background: var(--yellow);
		color: var(--ink);
	}

	.found {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 10px;
		font: 700 14px/1 var(--body);
		letter-spacing: 0.06em;
		color: #bdb6a6;
		border: 1.5px solid #3a343a;
		transform: skewX(-12deg);
		font-variant-numeric: tabular-nums;
	}

	.found svg {
		width: 15px;
		height: 15px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.found.bump {
		animation: bump 0.4s cubic-bezier(0.2, 2, 0.4, 1);
	}

	.found.all {
		color: var(--ink);
		background: var(--pop);
		border-color: var(--pop);
	}

	.found.all svg {
		fill: currentColor;
	}

	@keyframes bump {
		0% {
			transform: skewX(-12deg) scale(1.25);
		}
	}

	@media (max-width: 520px) {
		.brand {
			font-size: 17px;
		}
	}
</style>
