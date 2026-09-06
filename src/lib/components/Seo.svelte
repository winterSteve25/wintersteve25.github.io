<script lang="ts">
	import { profile } from '$lib/content/profile';
	import { staticHref } from '$lib/routes';

	interface Props {
		title: string;
		description: string;
		ogImage?: string;
	}
	let { title, description, ogImage }: Props = $props();

	const imageUrl = $derived(ogImage ? `${profile.origin}${staticHref(ogImage)}` : undefined);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:site_name" content={profile.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />

	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={imageUrl} />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
</svelte:head>
