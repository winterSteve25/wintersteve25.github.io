<script lang="ts">
	interface Props {
		embedUrl?: string;
		controls?: string;
		title: string;
	}
	let { embedUrl, controls, title }: Props = $props();

	let loaded = $state(false);
</script>

{#if embedUrl}
	<div class="stage">
		{#if loaded}
			<iframe
				src={embedUrl}
				title="{title} — playable build"
				allow="autoplay; fullscreen; gamepad"
				allowfullscreen
			></iframe>
		{:else}
			<button type="button" class="play" onclick={() => (loaded = true)}>
				<span class="glyph" aria-hidden="true">&#9654;</span>
				<span>Play {title} in browser</span>
				{#if controls}<span class="mono">{controls}</span>{/if}
			</button>
		{/if}
	</div>
{:else}
	<p class="pending mono">
		No web build yet — publish to itch.io, enable embedding, then set
		<code>itchEmbedUrl</code>.
	</p>
{/if}

<style>
	.stage {
		aspect-ratio: 16 / 9;
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		background: var(--bg-sunken);
		overflow: hidden;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: 0;
		display: block;
	}

	.play {
		width: 100%;
		height: 100%;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 0.5rem;
		background: none;
		border: 0;
		color: var(--text);
		font: inherit;
		cursor: pointer;
	}

	.play:hover .glyph {
		border-color: var(--accent);
		color: var(--accent-bright);
	}

	.glyph {
		display: grid;
		place-content: center;
		width: 3.5rem;
		height: 3.5rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		color: var(--text-dim);
		transition:
			color 120ms,
			border-color 120ms;
	}

	.pending {
		border: 1px dashed var(--line);
		border-radius: var(--radius);
		padding: 1rem 1.15rem;
		margin: 0;
		text-transform: none;
		letter-spacing: 0;
		line-height: 1.6;
	}
</style>
