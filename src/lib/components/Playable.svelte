<script lang="ts">
	interface Props {
		embedUrl?: string;
		embedWidth?: number;
		embedHeight?: number;
		embedColor?: string;
		hideItchFullscreen?: boolean;
		controls?: string;
		title: string;
	}
	let {
		embedUrl,
		embedWidth,
		embedHeight,
		embedColor,
		hideItchFullscreen = false,
		controls,
		title
	}: Props = $props();

	let loaded = $state(false);
	let stageElement = $state<HTMLDivElement>();
	let embedScale = $state(1);
	let embedLeft = $state(0);
	let embedTop = $state(0);
	const itchFullscreenMaskWidth = 24;
	const itchFooterHeight = 20;

	$effect(() => {
		const element = stageElement;
		const nativeWidth = embedWidth ?? 640;
		const nativeHeight = embedHeight ?? 380;
		if (!element) return;

		const resize = () => {
			embedScale = Math.min(
				element.clientWidth / nativeWidth,
				element.clientHeight / nativeHeight
			);
			embedLeft = (element.clientWidth - nativeWidth * embedScale) / 2;
			embedTop = (element.clientHeight - nativeHeight * embedScale) / 2;
		};
		const observer = new ResizeObserver(resize);
		resize();
		observer.observe(element);

		return () => observer.disconnect();
	});

</script>

{#if embedUrl}
	<div
		bind:this={stageElement}
		class="stage"
		style={embedWidth && embedHeight ? `aspect-ratio: ${embedWidth} / ${embedHeight}` : undefined}
	>
		{#if loaded}
			<iframe
				src={embedUrl}
				title="{title} — playable build"
				width={embedWidth ?? 640}
				height={embedHeight ?? 380}
				style={`left: ${embedLeft}px; top: ${embedTop}px; width: ${embedWidth ?? 640}px; height: ${embedHeight ?? 380}px; transform: scale(${embedScale})`}
				allowfullscreen
			></iframe>
			{#if hideItchFullscreen}
				<span
					class="embed-fullscreen-mask"
					style={`right: ${embedLeft}px; bottom: ${embedTop}px; width: ${itchFullscreenMaskWidth * embedScale}px; height: ${itchFooterHeight * embedScale}px; background: ${embedColor ?? 'var(--bg-sunken)'}`}
					aria-hidden="true"
				></span>
			{/if}
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
		aspect-ratio: 640 / 380;
		position: relative;
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		background: var(--bg-sunken);
		overflow: hidden;
	}

	iframe {
		position: absolute;
		inset: 0 auto auto 0;
		border: 0;
		display: block;
		transform-origin: top left;
	}

	.embed-fullscreen-mask {
		position: absolute;
		z-index: 1;
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
