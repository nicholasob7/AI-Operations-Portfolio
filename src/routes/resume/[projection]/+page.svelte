<script lang="ts">
	import { browser } from '$app/environment';
	import DestinationActions, { type DestinationAction } from '$lib/components/DestinationActions.svelte';
	import PortraitIntro from '$lib/components/PortraitIntro.svelte';
	import ResumeDocumentView from '$lib/components/resume/ResumeDocumentView.svelte';
	import type { ResumeProjectionDocument } from '$lib/content/resume-documents';
	import { getEntryImage, isPortraitEntry, resolveEntrySurface } from '$lib/entry-surfaces';
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

	const printResume = () => {
		if (!browser) return;
		window.print();
	};

	const projectionActions = $derived([
		{
			id: 'resume-index',
			label: 'Resume Versions',
			type: 'link' as const,
			href: '/resume',
			preload: true
		},
		{
			id: 'pdf',
			label: 'PDF',
			type: 'link' as const,
			href: document.pdfPath,
			download: `${document.slug}.pdf`
		},
		{
			id: 'print',
			label: 'Print',
			type: 'button' as const,
			onclick: printResume
		}
	] satisfies DestinationAction[]);
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

	<section class="resume-detail-intro panel resume-print-hidden">
		<div class="resume-detail-intro-copy">
			<p class="resume-detail-eyebrow">Resume Actions</p>
			<p class="resume-detail-note">
				Read this resume on-site, then use Print for a clean black-and-white output of the same content.
			</p>
			<div class="resume-detail-actions resume-print-hidden">
				<a class="resume-detail-action" href="/resume" data-sveltekit-preload-code="hover">Back to Resume Versions</a>
				<button class="resume-detail-action" type="button" onclick={printResume}>Print</button>
			</div>
		</div>
	</section>

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

	.resume-detail-page,
	.resume-detail-intro,
	.resume-detail-intro-copy {
		display: grid;
		gap: 0.8rem;
	}

	.resume-detail-page {
		max-width: 1320px;
		margin: 0 auto;
		padding: 1.2rem 1rem calc(6.5rem + env(safe-area-inset-bottom));
	}

	.panel {
		min-width: 0;
		padding: 1rem 1.05rem;
		border: 1px solid transparent;
		border-radius: 0.95rem;
		background:
			linear-gradient(rgba(15, 24, 40, 0.9), rgba(15, 24, 40, 0.9)) padding-box,
			linear-gradient(120deg, rgba(93, 173, 255, 0.6), rgba(61, 177, 153, 0.62)) border-box;
		box-shadow: 0 12px 26px rgba(3, 8, 20, 0.5);
	}

	.resume-detail-eyebrow {
		margin: 0;
		font-size: 0.74rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #6ad7ff;
	}

	.resume-detail-note {
		margin: 0;
		color: #d4def3;
		line-height: 1.58;
	}

	.resume-detail-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.resume-detail-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.45rem;
		padding: 0.58rem 0.95rem;
		border: 1px solid rgba(193, 217, 255, 0.34);
		border-radius: 999px;
		font: inherit;
		font-size: 0.88rem;
		font-weight: 700;
		letter-spacing: 0.01em;
		text-decoration: none;
		color: #f8fbff;
		background:
			linear-gradient(120deg, rgba(12, 22, 42, 0.97), rgba(16, 30, 52, 0.97)) padding-box,
			linear-gradient(120deg, #2fd1ff 0%, #9a63e8 52%, #39c69a 100%) border-box;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.05) inset,
			0 10px 22px rgba(4, 9, 22, 0.28);
		cursor: pointer;
	}

	@media print {
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
			gap: 0.5rem;
		}

		.panel,
		:global(.resume-document-panel) {
			padding: 0;
			border: 0;
			border-radius: 0;
			box-shadow: none;
			background: #fff !important;
			color: #000 !important;
		}

		.resume-detail-eyebrow,
		.resume-detail-note,
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

		:global(a) {
			color: #000 !important;
			text-decoration: none;
		}
	}
</style>
