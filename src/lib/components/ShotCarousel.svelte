<script lang="ts">
	import type { SystemProject } from '$lib/content/types';
	import { staticHref } from '$lib/routes';

	type Shot = NonNullable<SystemProject['screenshots']>[number];

	interface Props {
		shots: Shot[];
		/** Used to give the tabs unique ids when several carousels share a page. */
		id: string;
	}
	let { shots, id }: Props = $props();

	let active = $state(0);
	const shot = $derived(shots[active]);
	const tilts = ['-1deg', '0.8deg', '-0.6deg'];

	function go(i: number) {
		active = (i + shots.length) % shots.length;
	}

	function onTabKey(event: KeyboardEvent) {
		const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
		if (event.key === 'Home') go(0);
		else if (event.key === 'End') go(shots.length - 1);
		else if (step) go(active + step);
		else return;
		event.preventDefault();
		document.getElementById(`${id}-tab-${active}`)?.focus();
	}

	const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

	/** Loop the clip only while it is on screen. Under reduced motion it waits for the viewer to press play. */
	function playInView(video: HTMLVideoElement) {
		if (reducedMotion()) {
			video.controls = true;
			return;
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) video.play().catch(() => {});
			else video.pause();
		});
		observer.observe(video);
		return { destroy: () => observer.disconnect() };
	}
</script>

<div class="carousel">
	<!-- Arrows live outside the tilted stage so they stay put when the tilt changes between clips. -->
	<div class="frame">
		<div
			class="stage"
			role="tabpanel"
			id="{id}-panel"
			aria-labelledby="{id}-tab-{active}"
			style="--r: {tilts[active % tilts.length]}"
		>
			{#key active}
				{#if shot.video}
					<video
						src={staticHref(shot.video)}
						poster={staticHref(shot.src)}
						aria-label={shot.alt}
						muted
						loop
						playsinline
						preload="none"
						use:playInView
					></video>
				{:else}
					<a href={staticHref(shot.src)} target="_blank" rel="noreferrer" aria-label="Open {shot.caption ?? 'screenshot'} full size">
						<img src={staticHref(shot.src)} alt={shot.alt} />
					</a>
				{/if}
			{/key}
		</div>
		<button type="button" class="arrow prev" aria-label="Previous clip" onclick={() => go(active - 1)}>‹</button>
		<button type="button" class="arrow next" aria-label="Next clip" onclick={() => go(active + 1)}>›</button>
	</div>

	<div class="tabs" role="tablist" aria-label="Screenshots">
		{#each shots as item, i (item.src)}
			<button
				type="button"
				role="tab"
				id="{id}-tab-{i}"
				aria-selected={i === active}
				aria-controls="{id}-panel"
				tabindex={i === active ? 0 : -1}
				onclick={() => go(i)}
				onkeydown={onTabKey}
			>
				{item.caption ?? `Clip ${i + 1}`}
			</button>
		{/each}
	</div>
</div>

<style>
	.carousel {
		margin: 18px 0 6px;
	}

	.frame {
		position: relative;
	}

	.stage {
		transform: rotate(var(--r));
		transition: transform 0.2s;
	}

	.stage video,
	.stage img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		object-position: top left;
		background: var(--paper);
		border: 3px solid var(--ink);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.arrow {
		position: absolute;
		top: 50%;
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		padding: 0 0 4px;
		font: 700 28px/1 var(--body);
		color: var(--ink);
		background: var(--paper);
		border: 3px solid var(--ink);
		box-shadow: 3px 3px 0 var(--ink);
		cursor: pointer;
		transform: translateY(-50%);
		transition:
			transform 0.15s,
			box-shadow 0.15s,
			background 0.15s;
	}

	.prev {
		left: -14px;
	}

	.next {
		right: -14px;
	}

	.arrow:hover,
	.arrow:focus-visible {
		background: var(--pop);
		color: var(--paper);
	}

	.arrow:active {
		box-shadow: 0 0 0 var(--ink);
		transform: translate(3px, calc(-50% + 3px));
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 16px;
	}

	.tabs button {
		font: 700 12px/1 var(--body);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 7px 10px;
		color: var(--ink);
		background: var(--paper);
		border: 2px solid var(--ink);
		cursor: pointer;
		transform: skewX(-10deg);
		transition:
			background 0.15s,
			color 0.15s;
	}

	.tabs button:hover {
		background: var(--ink);
		color: var(--paper);
	}

	.tabs button[aria-selected='true'] {
		background: var(--pop);
		color: var(--paper);
		border-color: var(--ink);
		box-shadow: 3px 3px 0 var(--ink);
	}

	@media (max-width: 520px) {
		.arrow {
			width: 34px;
			height: 34px;
			font-size: 24px;
		}

		.prev {
			left: -8px;
		}

		.next {
			right: -8px;
		}
	}
</style>
