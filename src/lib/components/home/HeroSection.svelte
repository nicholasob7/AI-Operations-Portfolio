<script lang="ts">
	type Props = {
		githubUrl: string;
		linkedInProfilePath: string;
		twitterProfilePath: string;
		contactEmail: string;
		navigationReady: boolean;
		entrySettled: boolean;
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
		navigationReady,
		entrySettled,
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
	<h1>Nicko O'Brien</h1>
	<p class="tagline">AI Operations Portfolio</p>
	<p class="proof">
		Technical communication, structured reasoning, and deterministic AI delivery for enterprise operations and
		automation.
	</p>
	<div class="links">
		<div class="hero-actions" aria-label="Primary actions">
					<a
						aria-disabled={!navigationReady}
						class="cta cta-github cta-feature"
						href={githubUrl}
						rel="noopener noreferrer me"
						style:pointer-events={navigationReady ? 'auto' : 'none'}
						tabindex={navigationReady ? undefined : -1}
						target="_blank"
					>
						GitHub<span class="sr-only"> (opens in new tab)</span>
					</a>
				<a
					aria-disabled={!navigationReady}
					class="cta cta-resume"
					data-sveltekit-preload-code="hover"
					href="/resume"
					style:pointer-events={navigationReady ? 'auto' : 'none'}
					tabindex={navigationReady ? undefined : -1}
				>
					Resume
				</a>
				<button
					class="cta cta-contact"
					disabled={!entrySettled}
					type="button"
					aria-expanded={showEmailOptions}
					aria-controls="email-subactions"
					onclick={toggleEmailOptions}
					style:pointer-events={entrySettled ? 'auto' : 'none'}
				>
					{showEmailOptions ? 'Hide Email' : 'Email'}
				</button>
				<button
					class="cta cta-social"
					disabled={!entrySettled}
					type="button"
					aria-expanded={showSocialOptions}
					aria-controls="social-subactions"
					onclick={toggleSocialOptions}
					style:pointer-events={entrySettled ? 'auto' : 'none'}
				>
					{showSocialOptions ? 'Hide Social' : 'Social'}
				</button>
		</div>

		{#if showEmailOptions}
			<div class="hero-subpanel email-subactions" id="email-subactions" aria-label="Email actions" tabindex="-1">
				<p class="email-plain">{contactEmail}</p>
					<button
						class="cta cta-contact-sub"
						disabled={!entrySettled}
						type="button"
						onclick={copyEmail}
						style:pointer-events={entrySettled ? 'auto' : 'none'}
					>
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
						<button
							class="cta cta-social-option"
							disabled={!entrySettled}
							type="button"
							onclick={toggleLinkedInSocialDetails}
							style:pointer-events={entrySettled ? 'auto' : 'none'}
						>
							{showLinkedInSocialDetails ? 'Hide LinkedIn' : 'LinkedIn'}
						</button>
						<button
							class="cta cta-social-option"
							disabled={!entrySettled}
							type="button"
							onclick={toggleTwitterSocialDetails}
							style:pointer-events={entrySettled ? 'auto' : 'none'}
						>
							{showTwitterSocialDetails ? 'Hide X/Twitter' : 'X/Twitter'}
						</button>
				</div>
				{#if showLinkedInSocialDetails}
					<div class="social-detail">
						<p class="profile-link-plain">
							<span class="profile-url">{linkedInProfilePath}</span>
						</p>
							<button
								class="cta cta-contact-sub"
								disabled={!entrySettled}
								type="button"
								onclick={copyLinkedInProfilePath}
								style:pointer-events={entrySettled ? 'auto' : 'none'}
							>
								{copiedTarget === 'linkedin' ? 'Copied' : 'Copy'}
							</button>
					</div>
				{/if}
				{#if showTwitterSocialDetails}
					<div class="social-detail">
						<p class="profile-link-plain">
							<span class="profile-url">{twitterProfilePath}</span>
						</p>
							<button
								class="cta cta-contact-sub"
								disabled={!entrySettled}
								type="button"
								onclick={copyTwitterProfilePath}
								style:pointer-events={entrySettled ? 'auto' : 'none'}
							>
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
