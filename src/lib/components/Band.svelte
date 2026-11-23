<script lang="ts">
	interface Props {
		items: string[];
	}
	let { items }: Props = $props();

	// Repeat the list so the loop at -50% is seamless.
	const text = $derived(`${items.join(' ◆ ')} ◆ `);
</script>

<div class="band" aria-hidden="true">
	<div><span>{text}{text}{text}{text}</span></div>
</div>

<style>
	.band {
		position: relative;
		/* A -2.5deg tilt over 110vw rises/falls ~4.8vw end to end, plus the strip's own height. */
		height: max(84px, calc(4.8vw + 56px));
		overflow-x: clip;
		overflow-y: visible;
		margin-block: 8px 18px;
	}

	.band div {
		position: absolute;
		left: -5%;
		top: 50%;
		width: 110%;
		padding: 12px 0;
		white-space: nowrap;
		background: var(--ink);
		color: var(--ground);
		font: 400 clamp(18px, 2.2vw, 26px) / 1 var(--display);
		transform: translateY(-50%) rotate(-2.5deg);
	}

	.band span {
		display: inline-block;
		animation: marquee 60s linear infinite;
	}

	@keyframes marquee {
		to {
			transform: translateX(-50%);
		}
	}
</style>
