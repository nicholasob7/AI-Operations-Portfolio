<script lang="ts">
	import ProjectDetailPage from '$lib/components/ProjectDetailPage.svelte';
	import { remediationProjectDetail } from '$lib/content/project-details';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import { onMount } from 'svelte';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const remediationEntrySurface = resolveEntrySurface('remediationProject');

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
			id: 'home',
			label: 'Home',
			type: 'link',
			href: '/',
			preload: true
		},
		{
			id: 'next',
			label: 'Next Fix',
			type: 'link',
			href: '/#deployment-head',
			preload: true
		},
		{
			id: 'top',
			label: 'Top',
			type: 'button',
			onclick: scrollToTop
		}
	] satisfies DestinationAction[];

	onMount(() => {
		if (remediationEntrySurface.mode === 'none') {
			window.scrollTo({ top: 0, behavior: 'auto' });
		}
	});
</script>

<svelte:head>
	<title>Post-Deployment Remediation Script Development | Nicko O'Brien</title>
	<meta
		name="description"
		content="Detailed portfolio entry for post-deployment remediation script development and validation."
	/>
</svelte:head>

<ProjectDetailPage
	actions={remediationActions}
	detail={remediationProjectDetail}
	panelId="remediation-destination-actions"
/>
