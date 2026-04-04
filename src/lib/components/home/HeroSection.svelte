<script lang="ts">
	type Props = {
		githubUrl: string;
		linkedInUrl: string;
		twitterUrl: string;
		contactEmail: string;
		showResumeOptions: boolean;
		showEmailOptions: boolean;
		showSocialOptions: boolean;
		copied: boolean;
		toggleResumeOptions: () => void;
		toggleEmailOptions: () => void;
		toggleSocialOptions: () => void;
		copyEmail: () => void;
	};

	let {
		githubUrl,
		linkedInUrl,
		twitterUrl,
		contactEmail,
		showResumeOptions,
		showEmailOptions,
		showSocialOptions,
		copied,
		toggleResumeOptions,
		toggleEmailOptions,
		toggleSocialOptions,
		copyEmail
	}: Props = $props();
</script>

<section class="hero card">
	<div class="hero-aurora" aria-hidden="true"></div>
	<p class="eyebrow">AI Operations Portfolio</p>
	<h1>Nicko O'Brien</h1>
	<p class="tagline">AI-Forward IT Operations</p>
	<p class="proof">
		High-precision technical communication and structured reasoning for deterministic AI outcomes across
		enterprise operations, automation, and delivery.
	</p>
	<div class="links">
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
				{showResumeOptions ? 'Hide Resume' : 'Resume'}
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

		{#if showResumeOptions}
			<div class="hero-subpanel resume-subactions" id="resume-subactions" aria-label="Resume actions" tabindex="-1">
				<a class="cta cta-view" href="/resume">View First</a>
				<a class="cta cta-download" href="/resume-bw.pdf" download="Nicholas_Francis_OBrien_Resume_BW.pdf"
					>Download Print-Friendly (B&W PDF)</a
				>
			</div>
		{/if}

		{#if showEmailOptions}
			<div class="hero-subpanel email-subactions" id="email-subactions" aria-label="Email actions" tabindex="-1">
				<p class="email-plain">{contactEmail}</p>
				<button class="cta cta-contact-sub" type="button" onclick={copyEmail}>
					{copied ? 'Copied Email' : 'Copy Email'}
				</button>
				<p class="sr-only" aria-live="polite">
					{copied ? 'Email address copied to clipboard.' : ''}
				</p>
			</div>
		{/if}

		{#if showSocialOptions}
			<div
				class="hero-subpanel social-subactions"
				id="social-subactions"
				aria-label="Social media actions"
				tabindex="-1"
			>
				<a class="cta cta-linkedin" href={linkedInUrl} target="_blank" rel="noopener noreferrer me"
					>LinkedIn<span class="sr-only"> (opens in new tab)</span></a
				>
				<a class="cta cta-twitter" href={twitterUrl} target="_blank" rel="noopener noreferrer me"
					>X / Twitter<span class="sr-only"> (opens in new tab)</span></a
				>
			</div>
		{/if}
	</div>
</section>
