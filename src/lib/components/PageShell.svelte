<script lang="ts">
	import Band from './Band.svelte';
	import Hero from './Hero.svelte';
	import Seo from './Seo.svelte';
	import SiteFooter from './SiteFooter.svelte';
	import SiteNav from './SiteNav.svelte';
	import { profile } from '$lib/content/profile';
	import { staticHref } from '$lib/routes';
	import type { PageMeta } from '$lib/content/types';
	import type { Snippet } from 'svelte';

	interface Props {
		page: PageMeta;
		/** Words for the scrolling band under the hero. */
		band: string[];
		/** Text running up the portrait strip. */
		stripLabel: string;
		children: Snippet;
		intro?: Snippet;
		heroExtra?: Snippet;
	}
	let { page, band, stripLabel, children, intro, heroExtra }: Props = $props();

	const side = $derived(page.id === 'swe' ? 'software' : 'games');
	const tilts = ['1.5deg', '-1.5deg', '1deg'];
</script>

<Seo
	title="{profile.name} — {page.title}"
	description={page.headline ?? page.intro}
	ogImage={page.ogImage}
/>

<div class="site" data-side={side}>
	<SiteNav current={page.id} />

	<Hero eyebrow={profile.name} lines={page.title.toUpperCase().split(' ')} {stripLabel} extra={heroExtra}>
		<p class="lede">
			{#if intro}{@render intro()}{:else}{page.intro}{/if}
		</p>
		<div class="actions">
			{#if page.resume}
				<a class="btn dark" href={staticHref(page.resume)} target="_blank" rel="noreferrer"
					>Resume (PDF)</a
				>
			{/if}
			{#each profile.links as link, i (link.label)}
				<a class="btn" href={link.href} target="_blank" rel="noreferrer" style="--r: {tilts[i % 3]}"
					>{link.label}</a
				>
			{/each}
		</div>
	</Hero>

	<Band items={band} />

	<main>
		{@render children()}
	</main>

	<SiteFooter resumes={page.resume ? [{ label: 'Resume (PDF)', file: page.resume }] : []} />
</div>
