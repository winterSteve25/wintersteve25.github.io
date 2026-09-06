<script lang="ts">
	import { onMount } from 'svelte';
	import { ShaderRunner, prefersReducedMotion } from '$lib/gl';
	import defaultVert from '$lib/shaders/fullscreen.vert.glsl?raw';

	interface Props {
		frag: string;
		vert?: string;
		uniforms?: Record<string, number>;
		dprCap?: number;
		label: string;
		class?: string;
	}

	let {
		frag,
		vert = defaultVert,
		uniforms = {},
		dprCap = 2,
		label,
		class: className = ''
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let runner = $state.raw<ShaderRunner | null>(null);
	let error = $state<string | null>(null);
	let visible = $state(false);
	let reduced = $state(false);

	onMount(() => {
		reduced = prefersReducedMotion();

		const instance = new ShaderRunner(canvas, { vert, frag, dprCap });
		if (instance.error) {
			error = instance.error;
			return;
		}
		runner = instance;

		const observer = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
			},
			{ rootMargin: '128px' }
		);
		observer.observe(canvas);

		return () => {
			observer.disconnect();
			instance.dispose();
			runner = null;
		};
	});

	$effect(() => {
		if (!runner) return;
		for (const [name, value] of Object.entries(uniforms)) {
			runner.setUniform(name, value);
		}
	});

	$effect(() => {
		if (!runner) return;
		if (visible && !reduced) {
			runner.start();
		} else {
			runner.stop();
			if (visible) runner.renderOnce();
		}
	});
</script>

<div class="wrap {className}" role="img" aria-label={label}>
	<canvas bind:this={canvas} aria-hidden="true"></canvas>

	{#if error}
		<p class="fallback mono">{error}</p>
	{/if}
</div>

<style>
	.wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background: var(--bg-sunken);
	}

	canvas {
		width: 100%;
		height: 100%;
	}

	.fallback {
		position: absolute;
		inset: 0;
		display: grid;
		place-content: center;
		text-align: center;
		padding: 1rem;
		margin: 0;
		color: var(--text-faint);
	}
</style>
