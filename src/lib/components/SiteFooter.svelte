<script lang="ts">
	import Star from './Star.svelte';
	import { profile } from '$lib/content/profile';
	import { staticHref } from '$lib/routes';

	interface Props {
		/** Resume PDFs (filenames in `static/`) shown before the profile links. */
		resumes?: { label: string; file: string }[];
	}
	let { resumes = [] }: Props = $props();

	const tilts = ['-2deg', '1.5deg', '-1deg'];
</script>

<footer class="contact">
	<div class="wrap inner">
		<div>
			<h2>Contact</h2>
			<p>{profile.location}. Open to software and game dev roles.</p>
			<p><a class="mail" href="mailto:{profile.email}">{profile.email}</a></p>
		</div>
		<ul>
			{#each resumes as resume (resume.file)}
				<li>
					<a class="btn resume" href={staticHref(resume.file)} target="_blank" rel="noreferrer"
						>{resume.label}</a
					>
				</li>
			{/each}
			{#each profile.links as link, i (link.label)}
				<li>
					<a class="btn" href={link.href} target="_blank" rel="noreferrer" style="--r: {tilts[i % 3]}"
						>{link.label}</a
					>
				</li>
			{/each}
		</ul>
		<Star id="footer" place="left: 42%; top: 22px" tilt={-20} />
	</div>
</footer>

<style>
	.contact {
		--star-color: var(--ground);
		margin-top: 30px;
		background: var(--ink);
		color: var(--paper);
		clip-path: polygon(0 18px, 100% 0, 100% 100%, 0 100%);
	}

	.inner {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		padding-block: 56px calc(36px + env(safe-area-inset-bottom, 0px));
	}

	h2 {
		font: 400 clamp(36px, 5vw, 60px) / 0.9 var(--display);
		color: var(--ground);
	}

	p {
		margin-top: 6px;
		color: #cfc8b6;
	}

	.mail {
		color: var(--paper);
		font-weight: 700;
		text-decoration-color: var(--pop);
	}

	.resume {
		background: var(--ground);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
