<script lang="ts">
	import EvidenceHighlightsList from '$lib/components/highlights/EvidenceHighlightsList.svelte';
	import './+page.css';

	const highlightsTitle = "Evidence Highlights | Nicko O'Brien";
	const highlightsDescription =
		'Public evidence index for project summaries and portfolio highlight routes.';
</script>

<svelte:head>
	<title>{highlightsTitle}</title>
	<meta name="description" content={highlightsDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={highlightsTitle} />
	<meta property="og:description" content={highlightsDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={highlightsTitle} />
	<meta name="twitter:description" content={highlightsDescription} />
</svelte:head>

<main class="page">
	<section class="card highlights-page-section" aria-labelledby="highlights-head">
		<h1 id="highlights-head" tabindex="-1">Evidence Highlights</h1>
		<p class="highlights-page-note">
			This index gathers the public evidence routes linked from the homepage.
		</p>
		<EvidenceHighlightsList navigationReady={true} />
	</section>
</main>
