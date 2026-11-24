<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import ShotCarousel from '$lib/components/ShotCarousel.svelte';
	import Star from '$lib/components/Star.svelte';
	import { education, experience, page, projects, skills } from '$lib/content/swe';

	const band = [
		'RUST',
		'WEBASSEMBLY',
		'TYPESCRIPT',
		'TAURI',
		'REACT',
		'SVELTE',
		'C++',
		'LUA',
		'JAVA',
		'GITHUB ACTIONS'
	];
</script>

{#snippet intro()}
	CS @ UBC. Currently working on <a href="https://trymyelin.app/" target="_blank" rel="noreferrer"
		>Myelin Notes</a
	>, a cross-platform note-taking and knowledge management app. I mostly work in TypeScript, Rust,
	and WebAssembly.
{/snippet}

<PageShell {page} {intro} {band} stripLabel="SOFTWARE">
	<section class="wrap block" aria-labelledby="experience">
		<div class="sh"><h2 id="experience">Experience</h2></div>
		<div class="stack">
			{#each experience as job, i (job.company)}
				<article class="card job {i % 2 ? 'tilt-r' : 'tilt-l'}">
					<div class="when">
						{job.period}
						<small>{job.role}</small>
					</div>
					<div>
						<h3>
							{#if job.url}
								<a href={job.url} target="_blank" rel="noreferrer">{job.company}</a>
							{:else}
								{job.company}
							{/if}
						</h3>
						<ul class="pts">
							{#each job.highlights as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
						<ul class="chips" aria-label="Stack">
							{#each job.stack as tech (tech)}
								<li>{tech}</li>
							{/each}
						</ul>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="wrap block" aria-labelledby="projects">
		<div class="sh">
			<h2 id="projects">Projects</h2>
			<p>Apps, libraries and engines, newest first.</p>
		</div>
		<div class="stack">
			{#each projects as project, i (project.slug)}
				<article class="card {i % 2 ? 'tilt-r' : 'tilt-l'}">
					<span class="meta">
						{project.year} · {project.role}{project.teamSize ? ` · team of ${project.teamSize}` : ''}{project.duration
							? ` · ${project.duration}`
							: ''}
					</span>
					<h3>{project.title}</h3>
					<p class="tagline">{project.tagline}</p>
					<p class="summary">{project.summary}</p>

					{#if project.screenshots?.length}
						<div class="shots">
							<ShotCarousel id="shots-{project.slug}" shots={project.screenshots} />
							{#if i === 0}
								<Star id="swe-screens" place="right: -6px; bottom: -4px" tilt={-10} />
							{/if}
						</div>
					{/if}

					{#if project.excerpt}
						<figure class="excerpt">
							<figcaption>{project.excerpt.caption}</figcaption>
							<pre><code>{project.excerpt.code}</code></pre>
						</figure>
					{/if}

					<ul class="pts">
						{#each project.contributions as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
					<ul class="chips" aria-label="Stack">
						{#each project.stack as tech (tech)}
							<li>{tech}</li>
						{/each}
					</ul>
					{#if project.siteUrl || project.repoUrl}
						<p class="links">
							{#if project.siteUrl}
								<a href={project.siteUrl} target="_blank" rel="noreferrer">Visit <span class="arr" aria-hidden="true">↗</span></a>
							{/if}
							{#if project.repoUrl}
								<a href={project.repoUrl} target="_blank" rel="noreferrer">Source on GitHub <span class="arr" aria-hidden="true">↗</span></a>
							{/if}
						</p>
					{/if}
				</article>
			{/each}
		</div>
	</section>

	<section class="wrap block closing">
		<div>
			<div class="sh"><h2 id="education">Education</h2></div>
			{#each education as entry (entry.school)}
				<div class="card tilt-l">
					<span class="meta">{entry.period} · {entry.location}</span>
					<h3>{entry.school}</h3>
					<p class="tagline">{entry.credential}</p>
					{#if entry.detail}
						<ul class="chips"><li>{entry.detail}</li></ul>
					{/if}
					<Star id="swe-education" place="right: 14px; bottom: 12px" tilt={20} />
				</div>
			{/each}
		</div>

		<div>
			<div class="sh"><h2 id="skills">Skills</h2></div>
			<div class="skills">
				{#each skills as group, i (group.label)}
					<div class="card {i % 2 ? 'tilt-r' : 'tilt-l'}">
						<h3>{group.label}</h3>
						<ul class="chips">
							{#each group.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
						{#if i === skills.length - 1}
							<Star id="swe-skills" place="right: 10px; top: 10px" tilt={24} />
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>
</PageShell>

<style>
	.stack {
		display: grid;
		gap: 26px;
	}

	.job {
		display: grid;
		grid-template-columns: 200px minmax(0, 1fr);
		gap: 8px 26px;
	}

	.when {
		font: 400 18px/1.15 var(--display);
	}

	.when small {
		display: block;
		margin-top: 6px;
		font: 700 12px/1.3 var(--body);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.job h3 a {
		text-decoration-color: var(--pop);
	}

	.stack .pts li {
		max-width: none;
	}

	.shots {
		position: relative;
	}

	.excerpt {
		margin: 16px 0 0;
	}

	.excerpt pre {
		overflow-x: auto;
		padding: 14px;
		background: var(--ink);
		color: var(--paper);
		font-size: 14px;
	}

	.closing {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 26px;
		align-items: start;
	}

	.skills {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}

	.skills .card {
		padding: 16px 18px;
		box-shadow: 6px 6px 0 var(--ink);
	}

	.skills h3 {
		font-size: 20px;
	}

	.skills .chips {
		margin-top: 8px;
	}

	@media (max-width: 860px) {
		.job,
		.closing {
			grid-template-columns: 1fr;
		}

	}

	@media (max-width: 520px) {
		.skills {
			grid-template-columns: 1fr;
		}
	}
</style>
