<script lang="ts">
	import Seo from './Seo.svelte';
	import SiteNav from './SiteNav.svelte';
	import { profile } from '$lib/content/profile';
	import { staticHref } from '$lib/routes';
	import type { PageMeta } from '$lib/content/types';
	import type { Snippet } from 'svelte';

	interface Props {
		page: PageMeta;
		children: Snippet;
	}
	let { page, children }: Props = $props();
</script>

<Seo
	title="{profile.name} — {page.title}"
	description={page.headline}
	ogImage={page.ogImage}
/>

<div class="page theme" style="--accent-hue: {page.hue}">
	<div class="shell">
		<SiteNav current={page.id} />
	</div>

	<header class="shell masthead">
		<p class="mono role">{page.title}</p>
		<h1>{profile.name}</h1>
		<p class="headline">{page.headline}</p>
		<p class="intro">{page.intro}</p>

		<div class="actions">
			<a href="mailto:{profile.email}">{profile.email}</a>
			{#if page.resume}
				<a href={staticHref(page.resume)}>Resume (PDF)</a>
			{/if}
			{#each profile.links as link (link.label)}
				<a href={link.href} rel="noreferrer">{link.label}</a>
			{/each}
		</div>
	</header>

	<main class="shell">
		{@render children()}
	</main>

	<footer class="shell">
		<hr class="rule" />
		<div class="foot">
			<p class="mono">{profile.name} · {profile.location}</p>
			<p><a href="mailto:{profile.email}">{profile.email}</a></p>
		</div>
	</footer>
</div>

<style>
	.page {
		background: var(--bg);
		color: var(--text);
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.masthead {
		padding-block: clamp(3rem, 10vh, 6rem) clamp(2.5rem, 6vw, 4rem);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.role {
		color: var(--accent);
	}

	h1 {
		font-size: var(--step-4);
	}

	.headline {
		font-size: var(--step-2);
		color: var(--text);
		max-width: 32ch;
		letter-spacing: -0.015em;
		line-height: 1.15;
	}

	.intro {
		color: var(--text-dim);
		max-width: 56ch;
		margin-top: 0.5rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.25rem;
		margin-top: 1.25rem;
		font-size: 0.92rem;
	}

	main {
		flex: 1;
	}

	footer {
		padding-block: 2rem 3.5rem;
	}

	.foot {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		justify-content: space-between;
		align-items: baseline;
		padding-top: 1.5rem;
	}
</style>
