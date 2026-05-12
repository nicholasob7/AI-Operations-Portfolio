<script lang="ts">
	import HighlightContentPage from '$lib/components/HighlightContentPage.svelte';
	import { aiGovernanceContent } from '$lib/content/highlight-content';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const aiGovernanceEntrySurface = resolveEntrySurface('aiGovernance');
	const aiGovernanceTitle = "AI Governance | Nicko O'Brien";
	const aiGovernanceDescription =
		'Detailed portfolio entry for the AI Governance evidence highlight.';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const aiGovernanceActions = [
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
	<title>{aiGovernanceTitle}</title>
	<meta name="description" content={aiGovernanceDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={aiGovernanceTitle} />
	<meta property="og:description" content={aiGovernanceDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={aiGovernanceTitle} />
	<meta name="twitter:description" content={aiGovernanceDescription} />
</svelte:head>

<HighlightContentPage
	actions={aiGovernanceActions}
	detail={aiGovernanceContent}
	entrySurface={aiGovernanceEntrySurface}
	panelId="ai-governance-actions"
/>
