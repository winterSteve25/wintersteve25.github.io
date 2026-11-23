<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import Playable from '$lib/components/Playable.svelte';
	import Star from '$lib/components/Star.svelte';
	import { alsoShipped, page, projects } from '$lib/content/games';
	import type { GameProject } from '$lib/content/types';
	import { staticHref } from '$lib/routes';

	const band = [
		'OPENGL',
		'GLSL',
		'C#',
		'GODOT',
		'UNITY',
		'RAYLIB',
		'LUA',
		'GMTK 2026',
		'GMTK 2025',
		'BRACKEYS'
	];

	const facts = (p: GameProject) =>
		[
			['Year', p.year],
			['Role', p.role],
			['Engine', p.engine],
			['Team', p.teamSize],
			['Length', p.duration]
		].filter((f): f is [string, string] => Boolean(f[1]));
</script>

{#snippet intro()}
	CS @ UBC. Currently working on <a
		href="https://store.steampowered.com/app/3973750/Astrodescent"
		target="_blank"
		rel="noreferrer">Astrodescent</a
	>, a 2D incremental mining game launching on Steam this year. I like building gameplay systems,
	VFX, graphics programming, and the custom tools that make development smoother.
{/snippet}

{#snippet heroExtra()}
	<Star id="games-hero" place="right: 2%; bottom: -6px" tilt={8} />
{/snippet}

<PageShell {page} {intro} {heroExtra} {band} stripLabel="GAME DEV">
	<section class="wrap block" aria-labelledby="games">
		<div class="sh">
			<h2 id="games">Games</h2>
			<p>What each game is, and the parts I built.</p>
		</div>

		<div class="list">
			{#each projects as project, i (project.slug)}
				<article class="game" class:flip={i % 2 === 1}>
					<div class="frame" class:live={project.itchEmbedUrl || project.videoEmbedUrl}>
						<div class="media">
							{#if project.itchEmbedUrl}
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
							{:else if project.videoEmbedUrl}
								<div class="video">
									<iframe
										src={project.videoEmbedUrl}
										title="{project.title} gameplay demo"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerpolicy="strict-origin-when-cross-origin"
										allowfullscreen
										loading="lazy"
									></iframe>
								</div>
							{:else if project.previewImage}
								<img src={staticHref(project.previewImage)} alt="{project.title} screenshot" loading="lazy" />
							{:else}
								<div class="placeholder" aria-hidden="true">{project.title}</div>
							{/if}
						</div>
						{#if project.stamp}<span class="stamp">{project.stamp}</span>{/if}
						{#if i === 4}
							<Star id="games-frame" place="left: -8px; bottom: -14px" tilt={-16} />
						{/if}
					</div>

					<div class="card">
						<h3>{project.title}</h3>
						<p class="tagline">{project.tagline}</p>

						<dl class="facts">
							{#each facts(project) as [label, value] (label)}
								<div><dt>{label}</dt><dd>{value}</dd></div>
							{/each}
						</dl>

						<p class="pitch">{project.pitch}</p>

						{#if project.playableBuildNote}
							<p class="note">{project.playableBuildNote}</p>
						{/if}

						<h4 class="label">What I did</h4>
						<dl class="areas">
							{#each project.contribution as group (group.area)}
								<div>
									<dt>{group.area}</dt>
									<dd>
										<ul class="pts">
											{#each group.points as point (point)}
												<li>{point}</li>
											{/each}
										</ul>
									</dd>
								</div>
							{/each}
						</dl>

						{#if project.collaborators?.length}
							<h4 class="label">Also on it</h4>
							<ul class="people">
								{#each project.collaborators as person (person.who)}
									<li>
										<b>
											{#if person.url}
												<a href={person.url} target="_blank" rel="noreferrer">{person.who}</a>
											{:else}
												{person.who}
											{/if}
										</b>
										<span>{person.what}</span>
									</li>
								{/each}
							</ul>
						{/if}

						{#if project.tags.length}
							<ul class="chips" aria-label="Project tags">
								{#each project.tags as tag (tag)}
									<li>{tag}</li>
								{/each}
							</ul>
						{/if}

						{#if project.storeUrl || project.itchPageUrl || project.repoUrl}
							<p class="links">
								{#if project.storeUrl}
									<a href={project.storeUrl} target="_blank" rel="noreferrer">Steam page ↗</a>
								{/if}
								{#if project.itchPageUrl}
									<a href={project.itchPageUrl} target="_blank" rel="noreferrer">Play on itch.io ↗</a>
								{/if}
								{#if project.repoUrl}
									<a href={project.repoUrl} target="_blank" rel="noreferrer">Source on GitHub ↗</a>
								{/if}
							</p>
						{/if}

						{#if i === 2}
							<Star id="games-card" place="right: 12px; top: 12px" tilt={14} />
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>

	{#if alsoShipped.length}
		<section class="wrap block" aria-labelledby="also">
			<div class="sh"><h2 id="also">Also shipped</h2></div>
			<div class="also">
				{#each alsoShipped as entry, i (entry.url)}
					<a class="card {i % 2 ? 'tilt-l' : 'tilt-r'}" href={entry.url} target="_blank" rel="noreferrer">
						{#if entry.context}<span class="meta">{entry.context}</span>{/if}
						<h3>{entry.title}</h3>
						<p>{entry.blurb}</p>
					</a>
				{/each}
			</div>
		</section>
	{/if}
</PageShell>

<style>
	.list {
		display: grid;
		gap: 64px;
	}

	.game {
		display: flex;
		flex-direction: column;
	}

	/* Media frame: tilted, straightens on hover. Playable and video frames stay
	   straight so the game and its controls line up with the pointer. */
	.frame {
		position: relative;
		width: min(88%, 900px);
		transform: rotate(-1.4deg);
		transition: transform 0.25s cubic-bezier(0.2, 1.6, 0.4, 1);
	}

	.game.flip .frame {
		align-self: flex-end;
		transform: rotate(1.4deg);
	}

	.game:hover .frame,
	.frame.live {
		transform: none !important;
	}

	.media {
		overflow: hidden;
		background: var(--ink);
		border: 4px solid var(--ink);
		box-shadow: 10px 10px 0 var(--ink);
	}

	.media > img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}

	.video {
		aspect-ratio: 16 / 9;
	}

	.video iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.placeholder {
		display: grid;
		place-items: center;
		aspect-ratio: 21 / 8;
		padding: 12px;
		text-align: center;
		text-transform: uppercase;
		color: var(--ground);
		font: 400 clamp(28px, 4vw, 52px) / 1 var(--display);
		background: repeating-linear-gradient(-45deg, var(--ink) 0 14px, #2a252a 14px 28px);
	}

	.stamp {
		position: absolute;
		top: -14px;
		right: -10px;
		padding: 7px 10px;
		font: 400 15px/1 var(--display);
		text-transform: uppercase;
		color: var(--paper);
		background: var(--pop);
		border: 3px solid var(--ink);
		transform: rotate(8deg);
	}

	.card {
		width: min(90%, 940px);
		margin-top: 22px;
		align-self: flex-end;
		box-shadow: 6px 6px 0 var(--ink);
	}

	.game.flip .card {
		align-self: flex-start;
	}

	/* Cards tuck under still images; playable builds keep their footer clear. */
	.frame:not(.live) + .card {
		margin-top: -26px;
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 0;
		margin: 8px 0 12px;
		font: 700 13px/1 var(--body);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.facts div {
		display: flex;
		gap: 6px;
		padding: 6px 10px;
		margin-right: -2px;
		border: 2px solid var(--ink);
		background: var(--paper);
	}

	.facts dt {
		color: var(--muted);
		font-weight: 500;
	}

	.facts dd {
		margin: 0;
	}

	.pitch {
		max-width: 70ch;
		font-size: 18px;
	}

	.note {
		max-width: 70ch;
		margin-top: 12px;
		padding-left: 12px;
		font-size: 15px;
		color: var(--muted);
		border-left: 4px solid var(--ink);
	}

	.label {
		margin-top: 20px;
		font: 400 20px/1 var(--display);
		letter-spacing: -0.01em;
	}

	.areas {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px 24px;
		margin: 10px 0 0;
	}

	.areas dt {
		display: inline-block;
		padding: 5px 8px;
		font: 700 13px/1 var(--body);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--pop);
		background: var(--ink);
		transform: skewX(-10deg);
	}

	.areas dd {
		margin: 0;
	}

	.areas .pts {
		margin-top: 6px;
		font-size: 16px;
	}

	.people {
		display: grid;
		gap: 6px;
		list-style: none;
		margin: 8px 0 0;
		padding: 0;
		font-size: 16px;
	}

	.people b::after {
		content: ': ';
	}

	.also {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: 26px;
	}

	.also .card {
		display: block;
		width: auto;
		margin: 0;
		text-decoration: none;
	}

	.also p {
		margin-top: 6px;
	}

	.also .card:hover {
		box-shadow: 10px 10px 0 var(--pop);
	}

	@media (max-width: 860px) {
		.frame,
		.card {
			width: 100%;
		}

		.areas {
			grid-template-columns: 1fr;
		}
	}
</style>
