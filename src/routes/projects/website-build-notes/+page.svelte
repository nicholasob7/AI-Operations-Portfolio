<script lang="ts">
	import ProjectDetailPage from '$lib/components/ProjectDetailPage.svelte';
	import { websiteBuildNotesProjectDetail } from '$lib/content/project-details';
	import { resolveEntrySurface } from '$lib/entry-surfaces';
	import type { DestinationAction } from '$lib/components/DestinationActions.svelte';

	const websiteBuildNotesEntrySurface = resolveEntrySurface('websiteBuildNotesProject');
	const websiteBuildNotesTitle = "Website Publication System | Nicko O'Brien";
	const websiteBuildNotesDescription =
		"Evidence highlight for the website publication system, canonical JSON surface, public route structure, interaction controls, and static delivery.";

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const websiteBuildNotesActions = [
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
	<title>{websiteBuildNotesTitle}</title>
	<meta name="description" content={websiteBuildNotesDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={websiteBuildNotesTitle} />
	<meta property="og:description" content={websiteBuildNotesDescription} />
	<meta property="og:site_name" content="Nicko O'Brien" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={websiteBuildNotesTitle} />
	<meta name="twitter:description" content={websiteBuildNotesDescription} />
</svelte:head>

<ProjectDetailPage
	actions={websiteBuildNotesActions}
	detail={websiteBuildNotesProjectDetail}
	entrySurface={websiteBuildNotesEntrySurface}
	panelId="website-build-notes-destination-actions"
/>
