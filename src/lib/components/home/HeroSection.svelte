<script lang="ts">
	type Props = {
		githubUrl: string;
		linkedInProfilePath: string;
		twitterProfilePath: string;
		contactEmail: string;
		showResumeOptions: boolean;
		showEmailOptions: boolean;
		showSocialOptions: boolean;
		showLinkedInSocialDetails: boolean;
		showTwitterSocialDetails: boolean;
		copiedTarget: 'email' | 'linkedin' | 'twitter' | null;
		toggleResumeOptions: () => void;
		toggleEmailOptions: () => void;
		toggleSocialOptions: () => void;
		toggleLinkedInSocialDetails: () => void;
		toggleTwitterSocialDetails: () => void;
		copyEmail: () => void;
		copyLinkedInProfilePath: () => void;
		copyTwitterProfilePath: () => void;
	};

	let {
		githubUrl,
		linkedInProfilePath,
		twitterProfilePath,
		contactEmail,
		showResumeOptions,
		showEmailOptions,
		showSocialOptions,
		showLinkedInSocialDetails,
		showTwitterSocialDetails,
		copiedTarget,
		toggleResumeOptions,
		toggleEmailOptions,
		toggleSocialOptions,
		toggleLinkedInSocialDetails,
		toggleTwitterSocialDetails,
		copyEmail,
		copyLinkedInProfilePath,
		copyTwitterProfilePath
	}: Props = $props();
</script>

<section id="hero-head" class="hero card" tabindex="-1">
	<div class="hero-aurora" aria-hidden="true"></div>
	<p class="eyebrow">AI Operations Portfolio</p>
	<h1>Nicko O'Brien</h1>
	<p class="tagline">AI-Forward IT Operations</p>
	<p class="proof">
		High-precision technical communication. Structured reasoning. Deterministic AI outcomes for enterprise
		operations, automation, and delivery.
	</p>
	<div class="links">
		{#if showResumeOptions}
			<div class="hero-actions" aria-label="Primary actions">
				<a class="cta cta-github cta-feature" href={githubUrl} target="_blank" rel="noopener noreferrer me"
					>GitHub<span class="sr-only"> (opens in new tab)</span></a
				>
				<button
					class="cta cta-resume"
					type="button"
					aria-expanded={showResumeOptions}
					aria-controls="resume-subactions"
					onclick={toggleResumeOptions}
				>
					Hide Resume
				</button>
			</div>
		{:else}
			<div class="hero-actions" aria-label="Primary actions">
				<a class="cta cta-github cta-feature" href={githubUrl} target="_blank" rel="noopener noreferrer me"
					>GitHub<span class="sr-only"> (opens in new tab)</span></a
				>
				<button
					class="cta cta-resume"
					type="button"
					aria-expanded={showResumeOptions}
					aria-controls="resume-subactions"
					onclick={toggleResumeOptions}
				>
					Resume
				</button>
				<button
					class="cta cta-contact"
					type="button"
					aria-expanded={showEmailOptions}
					aria-controls="email-subactions"
					onclick={toggleEmailOptions}
				>
					{showEmailOptions ? 'Hide Email' : 'Email'}
				</button>
				<button
					class="cta cta-social"
					type="button"
					aria-expanded={showSocialOptions}
					aria-controls="social-subactions"
					onclick={toggleSocialOptions}
				>
					{showSocialOptions ? 'Hide Social' : 'Social'}
				</button>
			</div>
		{/if}

		{#if showResumeOptions}
			<div
				class="hero-subpanel resume-subactions"
				id="resume-subactions"
				aria-label="Resume actions"
				tabindex="-1"
			>
				<a class="cta cta-view" href="/resume">View First</a>
				<a
					class="cta cta-view cta-hero-download"
					href="/resume-bw.pdf"
					download="Nicholas_Francis_OBrien_Resume_BW.pdf"
					>Download B&amp;W PDF</a
				>
			</div>

			<div class="hero-actions" aria-label="Secondary actions">
				<button
					class="cta cta-contact"
					type="button"
					aria-expanded={showEmailOptions}
					aria-controls="email-subactions"
					onclick={toggleEmailOptions}
				>
					{showEmailOptions ? 'Hide Email' : 'Email'}
				</button>
				<button
					class="cta cta-social"
					type="button"
					aria-expanded={showSocialOptions}
					aria-controls="social-subactions"
					onclick={toggleSocialOptions}
				>
					{showSocialOptions ? 'Hide Social' : 'Social'}
				</button>
			</div>
		{/if}

		{#if showEmailOptions}
			<div class="hero-subpanel email-subactions" id="email-subactions" aria-label="Email actions" tabindex="-1">
				<p class="email-plain">{contactEmail}</p>
				<button class="cta cta-contact-sub" type="button" onclick={copyEmail}>
					{copiedTarget === 'email' ? 'Copied Email' : 'Copy Email'}
				</button>
				<p class="sr-only" aria-live="polite">
					{copiedTarget === 'email' ? 'Email address copied to clipboard.' : ''}
				</p>
			</div>
		{/if}

		{#if showSocialOptions}
			<div class="hero-subpanel social-subactions" id="social-subactions" aria-label="Social actions" tabindex="-1">
				<div class="social-selector-group" aria-label="Social platform choices">
					<button class="cta cta-social-option" type="button" onclick={toggleLinkedInSocialDetails}>
						{showLinkedInSocialDetails ? 'Hide LinkedIn' : 'LinkedIn'}
					</button>
					<button class="cta cta-social-option" type="button" onclick={toggleTwitterSocialDetails}>
						{showTwitterSocialDetails ? 'Hide X/Twitter' : 'X/Twitter'}
					</button>
				</div>
				{#if showLinkedInSocialDetails}
					<div class="social-detail">
						<p class="profile-link-plain">
							<span class="profile-url">{linkedInProfilePath}</span>
						</p>
						<button class="cta cta-contact-sub" type="button" onclick={copyLinkedInProfilePath}>
							{copiedTarget === 'linkedin' ? 'Copied' : 'Copy'}
						</button>
					</div>
				{/if}
				{#if showTwitterSocialDetails}
					<div class="social-detail">
						<p class="profile-link-plain">
							<span class="profile-url">{twitterProfilePath}</span>
						</p>
						<button class="cta cta-contact-sub" type="button" onclick={copyTwitterProfilePath}>
							{copiedTarget === 'twitter' ? 'Copied' : 'Copy'}
						</button>
					</div>
				{/if}
				<p class="sr-only" aria-live="polite">
					{copiedTarget === 'linkedin'
						? 'LinkedIn profile URL copied to clipboard.'
						: copiedTarget === 'twitter'
							? 'X slash Twitter profile URL copied to clipboard.'
							: ''}
				</p>
			</div>
		{/if}
	</div>
</section>
