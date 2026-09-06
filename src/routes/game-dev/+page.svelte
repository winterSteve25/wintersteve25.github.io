<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import Playable from '$lib/components/Playable.svelte';
	import { alsoShipped, page, projects } from '$lib/content/games';
	import type { GameProject } from '$lib/content/types';
	import { staticHref } from '$lib/routes';

	const facts = (p: GameProject) =>
		[p.role, p.engine, p.year, p.teamSize ? `team of ${p.teamSize}` : null, p.duration]
			.filter(Boolean)
			.join(' · ');
</script>

{#snippet intro()}
	CS @ UBC. Currently working on <a href="https://store.steampowered.com/app/3973750/Astrodescent" target="_blank" rel="noreferrer">Astrodescent</a>, 
	a 2D incremental mining game launching on Steam this year. 
	I like building gameplay systems, VFX, computer graphics related features, 
	and the custom tools that make development smoother.
{/snippet}


<PageShell {page} {intro}>
	{#each projects as project (project.slug)}
		<article class="game">
			<header>
				<div class="title">
					<h2>{project.title}</h2>
					{#if project.storeUrl || project.itchPageUrl || project.repoUrl}
						<p class="links">
							{#if project.storeUrl}
								<a href={project.storeUrl} target="_blank" rel="noreferrer">Steam page &rarr;</a>
							{/if}
							{#if project.itchPageUrl}
								<a href={project.itchPageUrl} target="_blank" rel="noreferrer">Play on itch.io &rarr;</a>
							{/if}
							{#if project.repoUrl}
								<a href={project.repoUrl} target="_blank" rel="noreferrer">Source on GitHub &rarr;</a>
							{/if}
						</p>
					{/if}
				</div>
				<p class="tagline">{project.tagline}</p>
			</header>

			<div class="overview">
				<p class="pitch">{project.pitch}</p>

				<div class="metadata">
					<p class="mono facts">{facts(project)}</p>
					{#if project.tags.length}
						<ul class="tags" aria-label="Project tags">
							{#each project.tags as tag (tag)}
								<li class="mono">{tag}</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>

			{#if project.itchEmbedUrl}
				<div class="playable">
						<Playable
							embedUrl={project.itchEmbedUrl}
							embedWidth={project.itchEmbedWidth}
							embedHeight={project.itchEmbedHeight}
							embedColor={project.itchEmbedColor}
							hideItchFullscreen={project.hideItchFullscreen}
							previewImage={project.previewImage ? staticHref(project.previewImage) : undefined}
							controls={project.controls}
						title={project.title}
					/>
					{#if project.playableBuildNote}
						<p class="playable-note">{project.playableBuildNote}</p>
					{/if}
				</div>
			{/if}

			<section class="project-section breakdown">
				<h3 class="mono">What I did</h3>
				<dl>
					{#each project.contribution as group (group.area)}
						<div class="area">
							<dt>{group.area}</dt>
							<dd>
								<ul>
									{#each group.points as point (point)}
										<li>{point}</li>
									{/each}
								</ul>
							</dd>
						</div>
					{/each}
				</dl>
			</section>

			{#if project.collaborators?.length}
				<section class="project-section people">
					<h3 class="mono">Also on it</h3>
					<ul>
						{#each project.collaborators as person (person.who)}
							<li>
								<span class="who">
									{#if person.url}
										<a href={person.url} target="_blank" rel="noreferrer">{person.who}</a>
									{:else}
										{person.who}
									{/if}
								</span>
								<span class="what">{person.what}</span>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		</article>
	{/each}

	{#if alsoShipped.length}
		<section class="also">
			<h2 class="mono">Also shipped</h2>
			<ul>
				{#each alsoShipped as entry (entry.url)}
					<li>
						<a href={entry.url} target="_blank" rel="noreferrer">{entry.title}</a>
						{#if entry.context}<span class="mono context">{entry.context}</span>{/if}
						<p>{entry.blurb}</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</PageShell>

<style>
	.title {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.4rem 1rem;
	}

	.game {
		padding-block: clamp(2.5rem, 6vw, 4.5rem) clamp(2.5rem, 4vw, 3rem);
		border-top: 1px solid var(--line-soft);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h2 {
		font-size: var(--step-2);
	}

	.tagline {
		color: var(--text-dim);
		font-size: var(--step-1);
		max-width: 46ch;
	}

	.overview {
		display: grid;
		gap: 1.25rem;
		margin-top: clamp(1.5rem, 3vw, 2rem);
	}

	.metadata {
		display: grid;
		gap: 0.75rem;
		justify-items: start;
		padding-top: 1rem;
		border-top: 1px solid var(--line-soft);
	}

	.playable {
		display: grid;
		gap: 0.75rem;
		margin-top: clamp(2.25rem, 5vw, 3.5rem);
	}

	.playable-note {
		color: var(--text-dim);
		font-size: var(--step--1);
	}

	.pitch {
		max-width: 60ch;
		font-size: var(--step-1);
	}

	.facts {
		color: var(--text-faint);
		line-height: 1.6;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: 0.92rem;
	}

	.project-section {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding-top: clamp(1.25rem, 3vw, 1.75rem);
		border-top: 1px solid var(--line-soft);
	}

	.breakdown {
		padding-top: 0;
		border-top: 0;
	}

	.people {
		margin-top: clamp(2rem, 4vw, 2.75rem);
		padding-top: 0;
		border-top: 0;
	}

	.breakdown h3,
	.people h3 {
		color: var(--accent);
		margin-bottom: 1.25rem;
	}

	.breakdown dl {
		margin: 0;
		display: grid;
	}

	.area {
		display: grid;
		grid-template-columns: minmax(7rem, 9rem) minmax(0, 1fr);
		gap: 0.35rem 1.25rem;
		padding-block: 0.95rem;
		border-top: 1px solid var(--line-soft);
	}

	@media (max-width: 34rem) {
		.area {
			grid-template-columns: 1fr;
		}
	}

	.area dt {
		font-weight: 650;
		font-size: 0.95rem;
	}

	.area dd {
		margin: 0;
	}

	.area ul {
		margin: 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.4rem;
		color: var(--text-dim);
		max-width: 62ch;
	}

	.area li::marker {
		color: var(--accent);
	}

	.people ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
	}

	.people li {
		display: grid;
		grid-template-columns: minmax(7rem, 9rem) minmax(0, 1fr);
		gap: 0.25rem 1.25rem;
	}

	.people li + li {
		margin-top: 0.85rem;
		padding-top: 0.85rem;
		border-top: 1px solid var(--line-soft);
	}

	@media (max-width: 34rem) {
		.people li {
			grid-template-columns: 1fr;
		}
	}

	.who {
		font-weight: 650;
		font-size: 0.95rem;
	}

	.what {
		color: var(--text-dim);
		max-width: 62ch;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.tags li {
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		padding: 0.15rem 0.55rem;
		color: var(--text-dim);
		background: var(--bg-sunken);
	}

	.also {
		padding-block: clamp(2.5rem, 6vw, 4rem);
		border-top: 1px solid var(--line-soft);
	}

	.also h2 {
		color: var(--accent);
		font-size: 0.78rem;
		margin-bottom: 1.25rem;
	}

	.also ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: 1.5rem;
	}

	.also li {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		align-items: flex-start;
	}

	.also a {
		font-weight: 650;
	}

	.context {
		color: var(--text-faint);
	}

	.also p {
		color: var(--text-dim);
		font-size: 0.92rem;
	}
</style>
