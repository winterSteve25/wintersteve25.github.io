<script lang="ts">
	import { stars, type StarId } from '$lib/stars.svelte';

	interface Props {
		id: StarId;
		/** Absolute position within the nearest positioned ancestor, e.g. "right: 4%; top: 6px". */
		place: string;
		tilt?: number;
	}
	let { id, place, tilt = 12 }: Props = $props();

	const got = $derived(stars.has(id));
	let bursts = $state<number[]>([]);

	function collect() {
		if (got) return;
		stars.collect(id);
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const burst = Date.now();
		bursts = [...bursts, burst];
		setTimeout(() => (bursts = bursts.filter((b) => b !== burst)), 650);
	}
</script>

<button
	type="button"
	class="star"
	class:got
	style="{place}; --r: {tilt}deg"
	aria-label={got ? 'Star found' : 'Hidden star'}
	aria-pressed={got}
	onclick={collect}
>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
	</svg>
	{#each bursts as burst (burst)}
		{#each Array(8) as _, k (k)}
			<i
				class="spark"
				style="--dx: {Math.cos((k / 8) * Math.PI * 2) * 26}px; --dy: {Math.sin((k / 8) * Math.PI * 2) * 26}px"
			></i>
		{/each}
	{/each}
</button>

<style>
	.star {
		position: absolute;
		z-index: 5;
		width: 26px;
		height: 26px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		color: var(--star-color, var(--ink));
		opacity: 0.55;
		transform: rotate(var(--r));
		transition:
			opacity 0.2s,
			transform 0.25s cubic-bezier(0.2, 2, 0.4, 1);
	}

	.star svg {
		width: 100%;
		height: 100%;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.star:hover {
		opacity: 1;
		transform: rotate(0) scale(1.3);
	}

	.star.got {
		opacity: 1;
		color: var(--pop);
		cursor: default;
	}

	.star.got svg {
		fill: currentColor;
		stroke: var(--ink);
	}

	.spark {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--pop);
		pointer-events: none;
		animation: spark 0.6s ease-out forwards;
	}

	@keyframes spark {
		to {
			transform: translate(var(--dx), var(--dy)) scale(0.2);
			opacity: 0;
		}
	}
</style>
