<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import DestinationActions, { type DestinationAction } from '$lib/components/DestinationActions.svelte';
	import PortraitIntro from '$lib/components/PortraitIntro.svelte';
	import ResumeDocumentView from '$lib/components/resume/ResumeDocumentView.svelte';
	import type { ResumeProjectionDocument } from '$lib/content/resume-documents';
	import { getEntryImage, isPortraitEntry, resolveEntrySurface } from '$lib/entry-surfaces';
	import {
		setPortraitIntroHandoff,
		shouldReplayResumePortraitOnHomeEntry
	} from '$lib/portrait-intro';
	import { canonicalOrigin } from '$lib/site';

	type Props = {
		data: {
			document: ResumeProjectionDocument;
		};
	};

	let { data }: Props = $props();
	const document = $derived(data.document);
	const projectionEntrySurface = resolveEntrySurface('resume');
	const projectionEntryImage = getEntryImage(projectionEntrySurface);
	const projectionSocialImage = projectionEntryImage
		? `${canonicalOrigin}${projectionEntryImage}`
		: null;
	const projectionUsesPortraitEntry = isPortraitEntry(projectionEntrySurface);

	const projectionActions = $derived([
		{
			id: 'home',
			label: 'Home',
			type: 'link' as const,
			href: '/',
			preload: true
		},
		{
			id: 'resume-index',
			label: 'Resume Versions',
			type: 'link' as const,
			href: '/resumes',
			preload: true
		},
		{
			id: 'save-pdf',
			label: 'Save PDF',
			type: 'link' as const,
			href: document.pdfPath,
			download: `${document.slug}.pdf`
		}
	] satisfies DestinationAction[]);

	beforeNavigate(({ from, to }) => {
		if (
			projectionEntryImage &&
			shouldReplayResumePortraitOnHomeEntry(from?.url.pathname, to?.url.pathname)
		) {
			setPortraitIntroHandoff({ src: projectionEntryImage });
		}
	});
</script>

<svelte:head>
	<title>{document.pageTitle}</title>
	<meta
		name="description"
		content={`${document.heading}. Human-readable HTML resume projection with print-friendly output.`}
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:title" content={document.pageTitle} />
	<meta
		property="og:description"
		content={`${document.heading}. Human-readable HTML resume projection with print-friendly output.`}
	/>
	<meta property="og:site_name" content="Nicko O'Brien" />
	{#if projectionSocialImage}
		<meta property="og:image" content={projectionSocialImage} />
		<meta property="og:image:alt" content="Portrait image for Nicholas Francis O'Brien's resume projection." />
	{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={document.pageTitle} />
	<meta
		name="twitter:description"
		content={`${document.heading}. Human-readable HTML resume projection with print-friendly output.`}
	/>
</svelte:head>

<PortraitIntro
	src={projectionEntryImage}
	enabled={projectionUsesPortraitEntry}
	pathname={document.htmlPath}
/>

	<main class="resume-detail-page">
		<div class="resume-print-hidden">
			<DestinationActions
				actions={projectionActions}
				panelId={`resume-projection-actions-${document.slug}`}
				portraitHandoff={{ src: projectionEntryImage }}
			/>
		</div>

		<ResumeDocumentView
			heading={document.heading}
			subheading={document.subheading}
		roleFamily={document.roleFamily}
		sections={document.sections}
		contactItems={document.contactItems}
	/>
</main>

<style>
	:global(body) {
		color: #e7edf8;
		font-family: "Spectral", "Times New Roman", "Liberation Serif", "DejaVu Serif", serif;
		background:
			radial-gradient(circle at 10% 0%, rgba(39, 102, 171, 0.24), transparent 32%),
			radial-gradient(circle at 90% 10%, rgba(29, 131, 113, 0.22), transparent 28%),
			linear-gradient(165deg, #070d18 0%, #111b2f 55%, #0c1629 100%);
	}

	.resume-detail-page {
		display: grid;
		gap: 0.8rem;
		min-width: 0;
		box-sizing: border-box;
	}

	.resume-detail-page {
		width: min(100%, 1320px);
		max-width: 1320px;
		margin: 0 auto;
		padding: 1.2rem 1rem calc(6.5rem + env(safe-area-inset-bottom));
	}

	@media (max-width: 640px) {
		.resume-detail-page {
			width: 100%;
			padding: 0.95rem 0.8rem 1.25rem;
		}
	}

	@media print {
		@page {
			size: A4;
			margin: 8mm 9mm;
		}

		:global(body) {
			color: #000;
			background: #fff;
		}

		:global(.portrait-intro-overlay),
		:global(.destination-actions),
		.resume-print-hidden {
			display: none !important;
		}

		.resume-detail-page {
			max-width: none;
			padding: 0;
			gap: 0.35rem;
		}

		:global(.resume-document-body) {
			display: flex;
			flex-direction: column;
			gap: 0.35rem;
		}

		:global(.resume-document-panel) {
			padding: 0;
			border: 0;
			border-radius: 0;
			box-shadow: none;
			background: #fff !important;
			color: #000 !important;
			font-size: 10.6pt;
		 }

		:global(.resume-document-eyebrow),
		:global(.resume-document-subheading),
		:global(.resume-document-role-family),
		:global(.resume-document-paragraphs p),
		:global(.resume-document-section li),
		:global(.resume-document-contact-list a),
		:global(.resume-contact-label),
		:global(.resume-document-section h2),
		:global(.resume-document-group h3),
		:global(.resume-document-panel h1) {
			color: #000 !important;
			text-shadow: none !important;
			background: transparent !important;
			-webkit-text-fill-color: currentColor !important;
		}

		:global(.resume-document-section h2) {
			border-top: 1px solid #000;
		}

		:global(.resume-document-header) {
			gap: 0.2rem;
		}

		:global(.resume-document-panel h1) {
			font-size: 17pt;
			line-height: 1.02;
		}

		:global(.resume-document-eyebrow) {
			display: none;
		}

		:global(.resume-document-paragraphs),
		:global(.resume-document-groups),
		:global(.resume-document-group),
		:global(.resume-document-section) {
			gap: 0.25rem;
		}

		:global(.resume-document-section h2) {
			font-size: 10pt;
			padding-top: 0.28rem;
		}

		:global(.resume-document-group h3) {
			font-size: 9.4pt;
		}

		:global(.resume-document-subheading),
		:global(.resume-document-role-family),
		:global(.resume-document-paragraphs p),
		:global(.resume-document-section li),
		:global(.resume-document-contact-list a),
		:global(.resume-contact-label) {
			font-size: 9pt;
			line-height: 1.26;
		}

		:global(.resume-document-list) {
			margin: 0;
			padding-left: 0.9rem;
		}

		:global(.resume-document-contact-section) {
			order: -1;
			display: block;
			margin: 0;
			padding: 0;
			border: 0;
		}

		:global(.resume-document-contact-heading) {
			display: none;
		}

		:global(.resume-document-contact-list) {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			gap: 0.35rem;
			margin: 0;
			padding: 0;
			list-style: none;
			font-size: 8.3pt;
			line-height: 1.12;
		}

		:global(.resume-document-contact-list li) {
			margin: 0;
		}

		:global(.resume-contact-label) {
			font-size: 0.74rem;
			margin-right: 0.18rem;
		}

		:global(.resume-contact-item-linkedin),
		:global(.resume-contact-item-github),
		:global(.resume-contact-item-twitter),
		:global(.resume-contact-item-mobile) {
			display: none !important;
		}

		:global(a) {
			color: #000 !important;
			text-decoration: none;
		}
	}
</style>
