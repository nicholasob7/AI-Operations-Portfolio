<script lang="ts">
	import ProjectDetailPage from '$lib/components/ProjectDetailPage.svelte';
	import { remediationProjectDetail } from '$lib/content/project-details';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const remediationEntrySurface = resolveEntrySurface('remediationProject');
	const remediationTitle = "Post-Deployment Remediation Script Development | Nicko O'Brien";
	const remediationDescription =
		'Detailed portfolio entry for post-deployment remediation script development and validation.';

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const remediationActions = [
		{
			id: 'print',
			label: 'Print',
			type: 'link',
			href: '/appprojects/Remediation_Script_Development_Portfolio_bw.pdf',
			download: 'Remediation_Script_Development_Portfolio_BW.pdf'
		},
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
	<title>{remediationTitle}</title>
	<meta name="description" content={remediationDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={remediationTitle} />
	<meta property="og:description" content={remediationDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={remediationTitle} />
	<meta name="twitter:description" content={remediationDescription} />
</svelte:head>

<ProjectDetailPage
	actions={remediationActions}
	detail={remediationProjectDetail}
	entrySurface={remediationEntrySurface}
	panelId="remediation-destination-actions"
/>
