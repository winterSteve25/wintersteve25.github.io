<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import Playable from '$lib/components/Playable.svelte';
	import { alsoShipped, page, projects } from '$lib/content/games';
	import type { GameProject } from '$lib/content/types';

	const facts = (p: GameProject) =>
		[p.role, p.engine, p.year, p.teamSize ? `team of ${p.teamSize}` : null, p.duration]
			.filter(Boolean)
			.join(' · ');
</script>

<PageShell {page}>
	{#each projects as project (project.slug)}
		<article class="game">
			<header>
				<h2>{project.title}</h2>
				<p class="tagline">{project.tagline}</p>
			</header>

			<Playable
				embedUrl={project.itchEmbedUrl}
				controls={project.controls}
				title={project.title}
			/>

			<p class="pitch">{project.pitch}</p>

			<p class="mono facts">{facts(project)}</p>

			{#if project.storeUrl || project.itchPageUrl || project.repoUrl}
				<p class="links">
					{#if project.storeUrl}
						<a href={project.storeUrl} rel="noreferrer">Steam page &rarr;</a>
					{/if}
					{#if project.itchPageUrl}
						<a href={project.itchPageUrl} rel="noreferrer">Play on itch.io &rarr;</a>
					{/if}
					{#if project.repoUrl}
						<a href={project.repoUrl} rel="noreferrer">Source on GitHub &rarr;</a>
					{/if}
				</p>
			{/if}

			<section class="breakdown">
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
				<section class="people">
					<h3 class="mono">Also on it</h3>
					<ul>
						{#each project.collaborators as person (person.who)}
							<li>
								<span class="who">
									{#if person.url}
										<a href={person.url} rel="noreferrer">{person.who}</a>
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

			{#if project.tags.length}
				<ul class="tags">
					{#each project.tags as tag (tag)}
						<li class="mono">{tag}</li>
					{/each}
				</ul>
			{/if}
		</article>
	{/each}

	{#if alsoShipped.length}
		<section class="also">
			<h2 class="mono">Also shipped</h2>
			<ul>
				{#each alsoShipped as entry (entry.url)}
					<li>
						<a href={entry.url} rel="noreferrer">{entry.title}</a>
						{#if entry.context}<span class="mono context">{entry.context}</span>{/if}
						<p>{entry.blurb}</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</PageShell>

<style>
	.game {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding-block: clamp(2.5rem, 6vw, 4.5rem);
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

	.pitch {
		max-width: 60ch;
		font-size: var(--step-1);
	}

	.facts {
		color: var(--text-faint);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		font-size: 0.92rem;
	}

	.breakdown h3,
	.people h3 {
		color: var(--accent);
		margin-bottom: 0.9rem;
	}

	.breakdown dl {
		margin: 0;
		display: grid;
		gap: 1rem;
	}

	.area {
		display: grid;
		grid-template-columns: minmax(7rem, 9rem) minmax(0, 1fr);
		gap: 0.35rem 1.25rem;
		padding-top: 0.9rem;
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
		gap: 0.6rem;
	}

	.people li {
		display: grid;
		grid-template-columns: minmax(7rem, 9rem) minmax(0, 1fr);
		gap: 0.25rem 1.25rem;
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
		border-radius: 999px;
		padding: 0.1rem 0.6rem;
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
