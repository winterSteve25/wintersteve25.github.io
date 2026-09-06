<script lang="ts">
	import { pages } from '$lib/content/pages';
	import { homeHref, pageHref } from '$lib/routes';
	import { profile } from '$lib/content/profile';
	import type { PageId } from '$lib/content/types';

	interface Props {
		current?: PageId;
	}
	let { current }: Props = $props();
</script>

<nav class="site" aria-label="Primary">
	<a class="wordmark" href={homeHref()}>{profile.name}</a>
	<ul>
		{#each pages as p (p.id)}
			<li class="theme" style="--accent-hue: {p.hue}">
				<a
					href={pageHref(p.id)}
					class:current={p.id === current}
					aria-current={p.id === current ? 'page' : undefined}
				>
					{p.nav}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.site {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem 2rem;
		flex-wrap: wrap;
		padding-block: 1.25rem;
		border-bottom: 1px solid var(--line-soft);
	}

	.wordmark {
		font-weight: 650;
		letter-spacing: -0.015em;
		color: var(--text);
		text-decoration: none;
	}

	ul {
		display: flex;
		gap: 1.25rem;
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		font-size: 0.92rem;
		color: var(--text-dim);
		text-decoration: none;
		padding-bottom: 2px;
		border-bottom: 1px solid transparent;
	}

	ul a:hover {
		color: var(--accent-bright);
		border-color: var(--accent);
	}

	ul a.current {
		color: var(--accent);
		border-color: var(--accent);
	}
</style>
