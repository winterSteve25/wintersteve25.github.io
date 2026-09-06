<script lang="ts">
	import type { SystemNode } from '$lib/content/types';

	interface Props {
		nodes: SystemNode[];
	}
	let { nodes }: Props = $props();

	const labelFor = (id: string) => nodes.find((n) => n.id === id)?.label ?? id;
</script>

<figure class="systems">
	<figcaption class="mono">Data flow</figcaption>
	<ul>
		{#each nodes as node (node.id)}
			<li>
				<span class="node">{node.label}</span>
				{#if node.to.length}
					<span class="arrow" aria-hidden="true">&rarr;</span>
					<span class="targets">
						{#each node.to as target (target)}
							<span class="node dim">{labelFor(target)}</span>
						{/each}
					</span>
				{:else}
					<span class="terminal mono">terminal</span>
				{/if}
			</li>
		{/each}
	</ul>
</figure>

<style>
	.systems {
		margin: 0;
		border: 1px solid var(--line-soft);
		border-radius: var(--radius);
		background: var(--bg-raised);
		padding: 1rem 1.15rem;
	}

	figcaption {
		margin-bottom: 0.75rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.45rem;
	}

	li {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		flex-wrap: wrap;
		font-size: 0.92rem;
	}

	.node {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.1rem 0.5rem;
		white-space: nowrap;
	}

	.node.dim {
		color: var(--text-dim);
		border-color: var(--line-soft);
	}

	.arrow {
		color: var(--accent);
	}

	.targets {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
	}

	.terminal {
		color: var(--text-faint);
	}
</style>
