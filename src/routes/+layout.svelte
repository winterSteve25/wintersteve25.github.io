<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { stars } from '$lib/stars.svelte';

	let { children } = $props();

	// Diagonal wipe between pages: cover, swap the page, then uncover.
	let wipe = $state<'idle' | 'in' | 'out'>('idle');

	onNavigate((navigation) => {
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise<void>((resolve) => {
			wipe = 'in';
			setTimeout(() => {
				resolve();
				navigation.complete.finally(() => {
					wipe = 'out';
					setTimeout(() => (wipe = 'idle'), 280);
				});
			}, 230);
		});
	});

	let toastVisible = $state(false);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		if (stars.messageId === 0) return;
		toastVisible = true;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toastVisible = false), 2200);
	});

	onMount(() => stars.load());
	const DOT_LAG = 0.8;

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const root = document.documentElement;
		let frame = 0;
		const update = () => {
			frame = 0;
			root.style.setProperty('--dot-shift', `${(scrollY * DOT_LAG).toFixed(1)}px`);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		addEventListener('scroll', onScroll, { passive: true });
		return () => {
			removeEventListener('scroll', onScroll);
			cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<div class="wipe {wipe}" aria-hidden="true"></div>
<div class="toast" class:show={toastVisible} role="status">{stars.message}</div>

<style>
	.wipe {
		position: fixed;
		inset: 0;
		z-index: 40;
		pointer-events: none;
		background: var(--ink);
		clip-path: polygon(0 0, 0 0, -20% 100%, -20% 100%);
	}

	.wipe.in {
		animation: wipe-in 0.23s cubic-bezier(0.7, 0, 0.3, 1) forwards;
	}

	.wipe.out {
		clip-path: polygon(0 0, 120% 0, 100% 100%, -20% 100%);
		animation: wipe-out 0.28s cubic-bezier(0.7, 0, 0.3, 1) forwards;
	}

	@keyframes wipe-in {
		to {
			clip-path: polygon(0 0, 120% 0, 100% 100%, -20% 100%);
		}
	}

	@keyframes wipe-out {
		to {
			clip-path: polygon(120% 0, 120% 0, 100% 100%, 100% 100%);
		}
	}

	.toast {
		position: fixed;
		left: 50%;
		bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
		z-index: 35;
		max-width: calc(100% - 32px);
		padding: 10px 14px;
		font: 700 14px/1 var(--body);
		letter-spacing: 0.06em;
		color: var(--paper);
		background: var(--ink);
		border: 2px solid var(--pop);
		transform: translateX(-50%) skewX(-10deg);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.25s;
	}

	.toast.show {
		opacity: 1;
	}
</style>
