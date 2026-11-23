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
		height: 84px;
		overflow: hidden;
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
