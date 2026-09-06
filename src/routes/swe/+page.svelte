<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { education, experience, page, projects, skills } from '$lib/content/swe';
	import { staticHref } from '$lib/routes';

</script>

{#snippet intro()}
	CS @ UBC. Currently working on <a href="https://trymyelin.app/" target="_blank" rel="noreferrer"
		>Myelin Notes</a
	>, a cross-platform note-taking and knowledge management app. Working in TypeScript, Rust,
	and WebAssembly.
{/snippet}

<PageShell {page} {intro}>
	<section class="band">
		<h2 class="mono band-title">Experience</h2>
		{#each experience as job (job.company)}
			<article class="job">
				<header>
					<h3>
						{job.role} <span class="at">at</span>
						{#if job.url}
							<a href={job.url} target="_blank" rel="noreferrer">{job.company}</a>
						{:else}
							{job.company}
						{/if}
					</h3>
					<p class="mono period">{job.period}</p>
				</header>

				<ul class="stack">
					{#each job.stack as tech (tech)}
						<li class="mono">{tech}</li>
					{/each}
				</ul>

				<ul class="bullets">
					{#each job.highlights as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</article>
		{/each}
	</section>

	<section class="band">
		<h2 class="mono band-title">Projects</h2>
		{#each projects as project (project.slug)}
			<article class="project">
				<header>
					<div class="project-heading">
						<h3>{project.title}</h3>
						{#if project.siteUrl || project.repoUrl}
							<p class="links">
								{#if project.siteUrl}
									<a href={project.siteUrl} target="_blank" rel="noreferrer">Visit &rarr;</a>
								{/if}
								{#if project.repoUrl}
									<a href={project.repoUrl} target="_blank" rel="noreferrer">Source on GitHub &rarr;</a>
								{/if}
							</p>
						{/if}
					</div>
					<p class="tagline">{project.tagline}</p>

					<dl class="meta">
						<div><dt class="mono">Role</dt><dd>{project.role}</dd></div>
						{#if project.teamSize}
							<div><dt class="mono">Team</dt><dd>{project.teamSize}</dd></div>
						{/if}
						{#if project.duration}
							<div><dt class="mono">Duration</dt><dd>{project.duration}</dd></div>
						{/if}
						<div><dt class="mono">When</dt><dd>{project.year}</dd></div>
					</dl>
				</header>

				<ul class="stack">
					{#each project.stack as tech (tech)}
						<li class="mono">{tech}</li>
					{/each}
				</ul>

				<div class="project-body" class:with-screenshot={project.screenshots?.length}>
					<div class="project-copy">
						<p class="summary">{project.summary}</p>

						{#if project.excerpt}
							<figure class="excerpt">
								<figcaption>{project.excerpt.caption}</figcaption>
								<pre><code>{project.excerpt.code}</code></pre>
							</figure>
						{/if}

						<ul class="bullets">
							{#each project.contributions as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>

					{#if project.screenshots?.length}
						<div class="screenshot-gallery">
							{#each project.screenshots as screenshot (screenshot.src)}
								<figure class="screenshot">
									<a
										href={staticHref(screenshot.src)}
										target="_blank"
										rel="noreferrer"
										aria-label="Open {screenshot.caption ?? 'screenshot'} full size"
									>
										<img src={staticHref(screenshot.src)} alt={screenshot.alt} />
									</a>
									{#if screenshot.caption}
										<figcaption>{screenshot.caption}</figcaption>
									{/if}
								</figure>
							{/each}
						</div>
					{/if}
				</div>

			</article>
		{/each}
	</section>

	<section class="band closing">
		<div>
			<h2 class="mono band-title">Skills</h2>
			<dl class="skills">
				{#each skills as group (group.label)}
					<div>
						<dt class="mono">{group.label}</dt>
						<dd>{group.items.join(' · ')}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div>
			<h2 class="mono band-title">Education</h2>
			{#each education as entry (entry.school)}
				<div class="school">
					<h3>{entry.school}</h3>
					<p>{entry.credential}</p>
					<p class="mono period">{entry.period} · {entry.location}</p>
					{#if entry.detail}<p class="detail">{entry.detail}</p>{/if}
				</div>
			{/each}
		</div>
	</section>
</PageShell>

<style>
	.band {
		padding-block: clamp(2rem, 5vw, 3.5rem);
		border-top: 1px solid var(--line-soft);
	}

	.band-title {
		color: var(--accent);
		margin-bottom: 1.5rem;
	}

	.job,
	.project {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-block: 1.5rem;
	}

	.project {
		gap: 1.25rem;
		padding-block: clamp(1.75rem, 4vw, 2.75rem);
	}

	.job + .job,
	.project + .project {
		border-top: 1px solid var(--line-soft);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h3 {
		font-size: var(--step-1);
	}

	.project h3 {
		font-size: var(--step-2);
	}

	.project-heading {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.25rem 0.75rem;
	}

	.at {
		color: var(--text-faint);
		font-weight: 400;
	}

	.period {
		color: var(--text-faint);
	}

	.tagline {
		color: var(--text-dim);
		font-size: var(--step-1);
		max-width: none;
	}

	.meta {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
		gap: 0.9rem 1.5rem;
		margin: 0.5rem 0 0;
		padding-top: 0.9rem;
		border-top: 1px solid var(--line-soft);
	}

	.meta dt {
		margin-bottom: 0.15rem;
	}

	.meta dd {
		margin: 0;
		font-size: 0.95rem;
	}

	.summary {
		max-width: none;
	}

	.project-body {
		display: grid;
		gap: 1.25rem;
	}

	.project-copy {
		display: grid;
		gap: 1.5rem;
	}

	.project-body.with-screenshot {
		grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.9fr);
		align-items: start;
	}

	.screenshot-gallery {
		display: grid;
		gap: 1rem;
	}

	.screenshot {
		margin: 0;
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		background: var(--bg-sunken);
		overflow: hidden;
	}

	.screenshot img {
		display: block;
		width: 100%;
		height: auto;
		transition: opacity 140ms;
	}

	.screenshot a:hover img {
		opacity: 0.82;
	}

	.screenshot figcaption {
		padding: 0.8rem 1.15rem;
		border-top: 1px solid var(--line-soft);
		color: var(--text-dim);
		font-size: 0.9rem;
	}

	@media (max-width: 48rem) {
		.project-body.with-screenshot {
			grid-template-columns: 1fr;
		}
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.stack li {
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		padding: 0.15rem 0.6rem;
		color: var(--text-dim);
	}

	.bullets {
		margin: 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.45rem;
		color: var(--text-dim);
		max-width: none;
	}

	.bullets li::marker {
		color: var(--accent);
	}

	.excerpt {
		margin: 0;
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		background: var(--bg-sunken);
		overflow: hidden;
	}

	.excerpt figcaption {
		padding: 0.8rem 1.15rem;
		border-bottom: 1px solid var(--line-soft);
		color: var(--text-dim);
		font-size: 0.9rem;
	}

	.excerpt pre {
		margin: 0;
		padding: 1.15rem;
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.6;
		color: var(--text-dim);
		tab-size: 4;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		font-size: 0.92rem;
	}

	.closing {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: clamp(1.5rem, 5vw, 3.5rem);
	}

	.skills {
		display: grid;
		gap: 0.85rem;
		margin: 0;
	}

	.skills dt {
		margin-bottom: 0.15rem;
	}

	.skills dd {
		margin: 0;
		color: var(--text-dim);
		font-size: 0.95rem;
	}

	.school p {
		color: var(--text-dim);
		font-size: 0.95rem;
		margin-top: 0.35rem;
	}

	.school .detail {
		color: var(--text);
	}
</style>
