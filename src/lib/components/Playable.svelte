<script lang="ts">
	interface Props {
		embedUrl?: string;
		embedWidth?: number;
		embedHeight?: number;
		embedColor?: string;
		hideItchFullscreen?: boolean;
		previewImage?: string;
		controls?: string;
		title: string;
	}
	let {
		embedUrl,
		embedWidth,
		embedHeight,
		embedColor,
		hideItchFullscreen = false,
		previewImage,
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
					style={`right: ${embedLeft}px; bottom: ${embedTop}px; width: ${itchFullscreenMaskWidth * embedScale}px; height: ${itchFooterHeight * embedScale}px; background: ${embedColor ?? 'var(--ink)'}`}
					aria-hidden="true"
				></span>
			{/if}
		{:else}
			<button type="button" class="play" onclick={() => (loaded = true)}>
				{#if previewImage}
					<img class="preview" src={previewImage} alt="" aria-hidden="true" draggable="false" />
				{/if}
				<span class="glyph" aria-hidden="true">&#9654;</span>
				<span>Play {title} in browser</span>
				{#if controls}<span class="controls">{controls}</span>{/if}
			</button>
		{/if}
	</div>
{:else}
	<p class="pending">
		No web build yet — publish to itch.io, enable embedding, then set
		<code>itchEmbedUrl</code>.
	</p>
{/if}

<style>
	.stage {
		aspect-ratio: 640 / 380;
		position: relative;
		background: var(--ink);
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
		position: relative;
		isolation: isolate;
		overflow: hidden;
		width: 100%;
		height: 100%;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 10px;
		padding: 16px;
		background: var(--ink);
		border: 0;
		color: var(--paper);
		font: 400 clamp(18px, 2.4vw, 26px) / 1.1 var(--display);
		text-align: center;
		cursor: pointer;
	}

	.play::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background: radial-gradient(var(--ink) 1.2px, transparent 1.6px) 0 0 / 6px 6px;
		opacity: 0.45;
		transition: opacity 0.15s;
	}

	.play:hover::before {
		opacity: 0.2;
	}

	.play > span {
		position: relative;
		z-index: 2;
	}

	.play > span:not(.glyph):not(.controls) {
		padding: 8px 12px;
		background: var(--ink);
		transform: skewX(-8deg);
	}

	.controls {
		padding: 6px 10px;
		font: 700 13px/1.3 var(--body);
		letter-spacing: 0.06em;
		color: var(--ink);
		background: var(--paper);
		border: 2px solid var(--ink);
	}

	.preview {
		position: absolute;
		inset: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.85) brightness(0.8);
		transition:
			filter 0.2s,
			transform 0.4s;
	}

	.play:hover .preview {
		filter: none;
		transform: scale(1.04);
	}

	.glyph {
		display: grid;
		place-content: center;
		width: 4rem;
		height: 4rem;
		font-size: 22px;
		color: var(--ink);
		background: var(--pop);
		border: 3px solid var(--ink);
		box-shadow: 5px 5px 0 var(--ink);
		clip-path: polygon(0 0, 100% 6%, 94% 100%, 4% 92%);
		transition: transform 0.2s cubic-bezier(0.2, 2, 0.4, 1);
	}

	.play:hover .glyph {
		transform: scale(1.12) rotate(-6deg);
	}

	.pending {
		border: 3px dashed var(--ink);
		padding: 1rem 1.15rem;
		margin: 0;
		background: var(--paper);
		line-height: 1.6;
	}
</style>
