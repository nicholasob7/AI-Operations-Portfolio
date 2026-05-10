<script lang="ts">
	import HomeInnerPanel from '$lib/components/home/HomeInnerPanel.svelte';

	type Props = {
		navigationReady: boolean;
	};

	let { navigationReady }: Props = $props();
</script>

<section class="card" aria-labelledby="selected-work-head">
	<div class="section-flow">
		<h2 id="selected-work-head" tabindex="-1">Recruiter-Friendly Resumes</h2>
		<HomeInnerPanel>
			<p>
				Resumes on this website come from one canonical source. Evidence stays consistent; role emphasis changes. Built to save you valuable time.
			</p>
			<p>
				Current: <strong>IT Support</strong>, <strong>Technical Operations</strong>, and
				<strong>AI / Process Improvement</strong>.
			</p>
			<a
				aria-disabled={!navigationReady}
				class:interaction-disabled={!navigationReady}
				class="cta cta-resume section-cta-remediation"
				href="/resume"
				data-sveltekit-preload-code="hover"
				tabindex={navigationReady ? undefined : -1}
			>
				Resumes
			</a>
		</HomeInnerPanel>
	</div>
</section>
