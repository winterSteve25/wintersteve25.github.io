<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ShaderCanvas from '$lib/components/ShaderCanvas.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import { pages } from '$lib/content/pages';
	import { profile } from '$lib/content/profile';
	import { pageHref } from '$lib/routes';
	import dissolveFrag from '$lib/shaders/dissolve.frag.glsl?raw';

	/**
	 * The front door. It is not a parent of the other two pages and does not
	 * summarise them — it introduces you and points at them. Send this link
	 * when you don't know who is reading; send a page link when you do.
	 */
	const heroUniforms = { u_layer: 0, u_threshold: 0.5, u_edge: 0.07, u_distort: 0.14 };
</script>

<Seo title={profile.name} description={profile.landingHeadline} />

<div class="page">
	<div class="shell">
		<SiteNav />
	</div>

	<header class="shell hero">
		<div class="words">
			<h1>{profile.name}</h1>
			<p class="headline">{profile.landingHeadline}</p>
			<p class="blurb">{profile.blurb}</p>
		</div>
		<div class="canvas">
			<ShaderCanvas
				frag={dissolveFrag}
				uniforms={heroUniforms}
				dprCap={1.5}
				label="Live shader — dissolve study"
			/>
		</div>
	</header>

	<nav class="shell directory" aria-label="Pages">
		<ul>
			{#each pages as p (p.id)}
				<li class="theme" style="--accent-hue: {p.hue}">
					<a href={pageHref(p.id)}>
						<span class="title">{p.title}</span>
						<span class="blurb">{p.headline}</span>
						<span class="cta mono">Open &rarr;</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<footer class="shell">
		<div class="foot">
			<p class="mono">{profile.location}</p>
			<ul>
				<li><a href="mailto:{profile.email}">{profile.email}</a></li>
				{#each profile.links as link (link.label)}
					<li><a href={link.href} rel="noreferrer">{link.label}</a></li>
				{/each}
			</ul>
		</div>
	</footer>
</div>

<style>
	.page {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.hero {
		padding-block: clamp(3rem, 12vh, 7rem) clamp(2.5rem, 7vh, 4.5rem);
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 5vw, 3.5rem);
		align-items: center;
	}

	@media (max-width: 44rem) {
		.hero {
			grid-template-columns: 1fr;
		}
	}

	.words {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	h1 {
		font-size: var(--step-4);
	}

	.headline {
		font-size: var(--step-2);
		color: var(--text);
		max-width: 22ch;
		line-height: 1.15;
		letter-spacing: -0.015em;
	}

	.blurb {
		color: var(--text-dim);
		max-width: 44ch;
		margin-top: 0.35rem;
	}

	.canvas {
		aspect-ratio: 4 / 3;
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		background: var(--bg-sunken);
		overflow: hidden;
	}

	.directory ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: 1px;
		background: var(--line-soft);
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.directory li {
		background: var(--bg);
	}

	.directory a {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		height: 100%;
		padding: 1.35rem 1.4rem 1.5rem;
		text-decoration: none;
		color: var(--text);
	}

	.title {
		font-size: var(--step-1);
		font-weight: 650;
		letter-spacing: -0.015em;
		color: var(--accent);
	}

	.blurb {
		color: var(--text-dim);
		font-size: 0.92rem;
		flex: 1;
	}

	.cta {
		margin-top: 0.75rem;
		color: var(--text-faint);
		transition: color 140ms;
	}

	.directory a:hover .cta {
		color: var(--accent-bright);
	}

	footer {
		padding-block: 3rem 3.5rem;
		flex: 1;
		display: flex;
		align-items: flex-end;
	}

	.foot {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		justify-content: space-between;
		width: 100%;
	}

	.foot ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 0.92rem;
	}
</style>
