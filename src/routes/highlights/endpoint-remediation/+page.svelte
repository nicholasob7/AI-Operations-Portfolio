<script lang="ts">
	import HighlightContentPage from '$lib/components/HighlightContentPage.svelte';
	import { endpointRemediationContent } from '$lib/content/highlight-content';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const endpointRemediationEntrySurface = resolveEntrySurface('endpointRemediation');
	const endpointRemediationTitle = "Endpoint Remediation | Nicko O'Brien";
	const endpointRemediationDescription =
		'Detailed portfolio entry for the Endpoint Remediation evidence highlight.';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const endpointRemediationActions = [
		{
			id: 'highlights',
			label: 'Highlights',
			type: 'link',
			href: '/highlights',
			preload: true
		},
		{
			id: 'home',
			label: 'Home',
			type: 'link',
			href: '/',
			preload: true
		},
		{
			id: 'top',
			label: 'Top',
			type: 'button',
			onclick: scrollToTop
		}
	] satisfies DestinationAction[];

</script>

<svelte:head>
	<title>{endpointRemediationTitle}</title>
	<meta name="description" content={endpointRemediationDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={endpointRemediationTitle} />
	<meta property="og:description" content={endpointRemediationDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={endpointRemediationTitle} />
	<meta name="twitter:description" content={endpointRemediationDescription} />
</svelte:head>

<HighlightContentPage
	actions={endpointRemediationActions}
	detail={endpointRemediationContent}
	entrySurface={endpointRemediationEntrySurface}
	panelId="endpoint-remediation-actions"
/>
