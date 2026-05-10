<script lang="ts">
	import type {
		ResumeDocumentBlock,
		ResumeDocumentContactItem,
		ResumeDocumentSection
	} from '$lib/content/resume-documents';

	type Props = {
		heading: string;
		subheading: string;
		roleFamily: string;
		sections: ResumeDocumentSection[];
		contactItems: ResumeDocumentContactItem[];
	};

	let { heading, subheading, roleFamily, sections, contactItems }: Props = $props();
</script>

<section class="resume-document-panel" aria-labelledby="resume-document-title">
	<header class="resume-document-header">
		<p class="resume-document-eyebrow">Role-Specific Resume</p>
		<h1 id="resume-document-title">{heading}</h1>
		<p class="resume-document-subheading">{subheading}</p>
		<p class="resume-document-role-family">{roleFamily}</p>
	</header>

	<div class="resume-document-body">
		{#each sections as section}
			<section class="resume-document-section" aria-labelledby={`${section.id}-heading`}>
				<h2 id={`${section.id}-heading`}>{section.title}</h2>
				{#each section.blocks as block}
					{#if block.type === 'paragraphs'}
						<div class="resume-document-paragraphs">
							{#each block.lines as line}
								<p>{line}</p>
							{/each}
						</div>
					{:else if block.type === 'bullet_list'}
						<ul class="resume-document-list">
							{#each block.items as item}
								<li>{item}</li>
							{/each}
						</ul>
					{:else}
						<div class="resume-document-groups">
							{#each block.items as group}
								<div class="resume-document-group">
									<h3>{group.title}</h3>
									<ul class="resume-document-list">
										{#each group.items as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
					{/if}
				{/each}
			</section>
		{/each}

		<section
			class="resume-document-section resume-document-contact-section"
			aria-labelledby="resume-contact-heading"
		>
			<h2 id="resume-contact-heading" class="resume-document-contact-heading">
				Contact and Public Profile
			</h2>
			<ul class="resume-document-contact-list">
				{#each contactItems as item}
						<li class={`resume-contact-item resume-contact-item-${item.id}`}>
							<span class="resume-contact-label">{item.label}</span>
							<a
								href={item.href}
								rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
								target={item.id === 'email' ? undefined : '_blank'}
							>
								{item.value}
							</a>
						</li>
					{/each}
				</ul>
			</section>
	</div>
</section>

<style>
	.resume-document-panel,
	.resume-document-header,
	.resume-document-body,
	.resume-document-section,
	.resume-document-paragraphs,
	.resume-document-groups,
	.resume-document-group {
		display: grid;
		gap: 0.55rem;
	}

	.resume-document-panel {
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		min-width: 0;
		padding: 1rem 1.05rem;
		border: 1px solid transparent;
		border-radius: 0.95rem;
		background:
			linear-gradient(rgba(15, 24, 40, 0.9), rgba(15, 24, 40, 0.9)) padding-box,
			linear-gradient(120deg, rgba(93, 173, 255, 0.6), rgba(61, 177, 153, 0.62)) border-box;
		box-shadow: 0 12px 26px rgba(3, 8, 20, 0.5);
	}

	.resume-document-eyebrow {
		margin: 0;
		font-size: 0.74rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #6ad7ff;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.8rem, 4vw, 2.4rem);
		line-height: 1.05;
		color: #f4f8ff;
		overflow-wrap: anywhere;
	}

	.resume-document-subheading,
	.resume-document-role-family,
	.resume-document-paragraphs p,
	.resume-document-section li,
	.resume-document-contact-list a,
	.resume-contact-label {
		margin: 0;
		color: #d4def3;
		line-height: 1.58;
		overflow-wrap: anywhere;
	}

	.resume-document-role-family {
		color: #9fb8df;
	}

	h2,
	h3 {
		margin: 0;
		color: #f1f6ff;
	}

	h2 {
		font-size: 1.02rem;
		padding-top: 0.7rem;
		border-top: 1px solid rgba(190, 215, 242, 0.16);
	}

	h3 {
		font-size: 0.96rem;
		color: #dce7fb;
	}

	.resume-document-list,
	.resume-document-contact-list {
		margin: 0;
		padding-left: 1.15rem;
	}

	.resume-document-contact-list li {
		margin: 0.3rem 0;
	}

	.resume-contact-label {
		font-weight: 700;
		margin-right: 0.4rem;
	}

	.resume-document-contact-list a {
		color: #d4def3;
		text-decoration-color: rgba(165, 205, 255, 0.45);
		text-underline-offset: 0.14em;
	}

	@media (max-width: 640px) {
		.resume-document-panel {
			padding: 0.9rem 0.85rem;
		}

		h1 {
			font-size: clamp(1.6rem, 9vw, 2rem);
		}

		.resume-document-list,
		.resume-document-contact-list {
			padding-left: 1rem;
		}
	}
</style>
