<script lang="ts">
	import { staticHref } from '$lib/routes';
	import type { Snippet } from 'svelte';

	interface Props {
		eyebrow: string;
		/** Heading lines; the second line gets the outlined treatment. */
		lines: string[];
		/** Text running up the portrait strip. */
		stripLabel: string;
		children: Snippet;
		extra?: Snippet;
	}
	let { eyebrow, lines, stripLabel, children, extra }: Props = $props();

	// Deterministic per-letter tilt so prerendered HTML matches hydration.
	const tilt = (i: number, line: number) => ({
		r: ((i * 37 + line * 11) % 9) - 4,
		y: ((i * 23) % 7) - 3,
		d: i + line * 6
	});
</script>

<div class="wrap hero">
	<div class="strip" aria-hidden="true">
		<div class="shot">
			<img src={staticHref('profile.jpg')} alt="" width="1200" height="1600" fetchpriority="high" />
		</div>
		<span class="label">{stripLabel}</span>
	</div>

	<div class="text">
		<span class="eyebrow">{eyebrow}</span>
		<h1 aria-label={lines.join(' ')}>
			{#each lines as line, li (li)}
				<span class="ln" aria-hidden="true">
					{#each [...line] as ch, i (i)}
						{@const t = tilt(i, li)}
						<span class="ch" style="--r: {t.r}deg; --y: {t.y}px; --i: {t.d}">{ch}</span>
					{/each}
				</span>
			{/each}
		</h1>
		{@render children()}
		{@render extra?.()}
	</div>
</div>

<style>
	.hero {
		display: grid;
		grid-template-columns: clamp(100px, 14vw, 180px) minmax(0, 1fr);
		gap: clamp(18px, 4vw, 48px);
		align-items: stretch;
		padding-block: 36px 28px;
	}

	/* Upright portrait in a zigzag cut, tinted to the page colour. */
	.strip {
		position: relative;
		min-height: 360px;
	}

	.shot {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: var(--ink);
		clip-path: polygon(22% 0, 100% 0, 82% 38%, 96% 52%, 70% 100%, 0 100%, 6% 64%, 0 30%);
		animation: bob 7s ease-in-out infinite alternate;
	}

	.shot img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 52% 24%;
		filter: grayscale(1) contrast(1.6) brightness(1.15);
	}

	.shot::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(180deg, var(--ground) 10%, var(--pop) 140%);
		mix-blend-mode: multiply;
	}

	.shot::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background: radial-gradient(var(--ink) 1px, transparent 1.5px) 0 0 / 5px 5px;
		opacity: 0.3;
	}

	@keyframes bob {
		to {
			transform: translateY(6px) rotate(-1deg);
		}
	}

	.label {
		position: absolute;
		left: -6px;
		bottom: 8px;
		z-index: 2;
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		white-space: nowrap;
		font: 400 clamp(26px, 3.4vw, 42px) / 0.9 var(--display);
		letter-spacing: -0.02em;
		color: var(--paper);
		-webkit-text-stroke: 2px var(--ink);
		paint-order: stroke;
	}

	.text {
		position: relative;
		min-width: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.eyebrow {
		align-self: flex-start;
		padding: 6px 10px;
		font: 700 13px/1 var(--body);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		background: var(--ink);
		color: var(--ground);
		transform: rotate(-2deg);
	}

	h1 {
		margin-top: 14px;
		font: 400 clamp(28px, 7.8vw, 104px) / 0.86 var(--display);
		letter-spacing: -0.04em;
	}

	.ln {
		display: block;
	}

	.ln + .ln .ch {
		color: var(--paper);
		-webkit-text-stroke: 3px var(--ink);
		paint-order: stroke;
		text-shadow: 6px 6px 0 var(--pop);
	}

	.ch {
		display: inline-block;
		transform: rotate(var(--r)) translateY(var(--y));
		transition: transform 0.25s cubic-bezier(0.2, 1.8, 0.4, 1);
		animation: drop 0.55s cubic-bezier(0.2, 1.4, 0.4, 1) backwards;
		animation-delay: calc(var(--i) * 35ms);
	}

	.ch:hover {
		transform: rotate(calc(var(--r) * -1.5)) translateY(-8px);
	}

	@keyframes drop {
		from {
			transform: translateY(-70px) rotate(24deg);
			opacity: 0;
		}
	}

	.text :global(.lede) {
		max-width: 58ch;
		margin-top: 18px;
		font-size: clamp(17px, 1.5vw, 19px);
	}

	.text :global(.actions) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 16px;
		margin-top: 20px;
	}

	@media (max-width: 520px) {
		.hero {
			grid-template-columns: 76px minmax(0, 1fr);
			gap: 14px;
		}

		.strip {
			min-height: 280px;
		}

		.label {
			font-size: 24px;
			-webkit-text-stroke: 1.5px var(--ink);
		}
	}
</style>
