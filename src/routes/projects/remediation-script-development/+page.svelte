<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	});
</script>

<svelte:head>
	<title>Post-Deployment Remediation Script Development | Nicko O'Brien</title>
	<meta
		name="description"
		content="Detailed portfolio entry for post-deployment remediation script development and validation."
	/>
</svelte:head>

<main class="doc-page">
	<section class="doc-card">
		<p class="eyebrow">Project Detail</p>
		<h1>Post-Deployment Remediation Script Development</h1>

		<div class="doc-text" aria-label="Remediation project details">
			<h2>Summary</h2>
			<p class="doc-summary">
				Built and deployed a remediation script for live post-deployment incidents. It targeted profile
				corruption, cache drift, and launch inconsistency. The work moved from testing into live production use
				and became part of the wider stabilization effort.
			</p>

			<h2>How It Was Built</h2>
			<ul>
				<li>
					<strong>Development workflow:</strong> Built with AI-assisted support in VS Code using GitHub Copilot
				</li>
				<li>
					<strong>Testing path:</strong> Moved from non-production testing to test-device validation and then live
					deployment
				</li>
				<li>
					<strong>User targeting:</strong> Separated device logon user from session user to hit the correct profile
				</li>
				<li>
					<strong>Cache cleanup:</strong> Covered both version-specific and legacy cache variants
				</li>
				<li>
					<strong>Shortcut control:</strong> Consolidated validated shortcut artifacts into one canonical
					launch surface
				</li>
				<li>
					<strong>Binary checks:</strong> Confirmed binaries and detected reparse-point anomalies
				</li>
				<li>
					<strong>Status output:</strong> Returned JSON-compatible state summaries for downstream parsing
				</li>
			</ul>

			<h2>What We Found</h2>
			<ul>
				<li>
					<strong>Main pattern:</strong> Incidents clustered in upgrade scenarios
				</li>
				<li>
					<strong>Control case:</strong> Clean first-time installs did not show the same failure profile
				</li>
				<li>
					<strong>Main causes:</strong> Cache drift, user-profile contamination, mixed shortcut paths, duplicate
					variants, and validation gaps
				</li>
				<li>
					<strong>Field behavior:</strong> Production incidents often involved stale shortcuts, legacy cache
					corruption, and precise per-profile targeting
				</li>
				<li>
					<strong>Production result:</strong> Validation confirmed normalized application state
				</li>
				<li>
					<strong>Boundary:</strong> Remaining failures sat outside remediation scope
				</li>
			</ul>

			<h2>How It Was Used</h2>
			<ul>
				<li>
					<strong>Evidence role:</strong> Became the main evidence artifact in the reformatted deployment package
					wrapper
				</li>
				<li>
					<strong>Problem link:</strong> Tied each remediation action back to observed symptoms
				</li>
				<li>
					<strong>Approval:</strong> Approved for controlled live use on single endpoints
				</li>
				<li>
					<strong>Project effect:</strong> Turned incident success into evidence for root-cause analysis and
					package hardening
				</li>
				<li>
					<strong>Scope boundary:</strong> Full wrapper lifecycle testing remained separate from script
					effectiveness evidence
				</li>
			</ul>

			<h2>Why It Helped</h2>
			<ul>
				<li>
					Each remediation action targeted a real observed failure rather than a theoretical fix
				</li>
				<li>
					Refinement decisions were based on test-device and production outcomes
				</li>
				<li>
					Defensive design handled cloud desktop variants, registry-redirected paths, and reparse-point binaries
				</li>
				<li>Rapid problem breakdown supported cache, shortcut, and user-context diagnosis</li>
				<li>AI-assisted code generation was turned into production-grade PowerShell</li>
				<li>Confirmed outcomes were kept separate from assumptions needing more evidence</li>
			</ul>

			<hr />
			<h2>Attribution Note</h2>
			<p class="doc-note">
				This portfolio description was written with GitHub Copilot in Visual Studio Code. Repository artifacts,
				validation records, and operational observations were used to summarize the work while preserving
				confidentiality.
			</p>
			<div class="doc-actions">
				<a class="doc-cta" href="/#remediation-card">Hide and Return to Main Page</a>
			</div>
		</div>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Space Grotesk', sans-serif;
		background:
			radial-gradient(circle at 10% 10%, rgba(47, 209, 255, 0.12) 0%, transparent 25%),
			radial-gradient(circle at 75% 12%, rgba(110, 63, 177, 0.24) 0%, transparent 24%),
			radial-gradient(circle at 90% 18%, rgba(30, 141, 106, 0.18) 0%, transparent 24%),
			linear-gradient(170deg, #060912 0%, #0b1326 100%);
		color: #e8eefc;
	}

	.doc-page {
		max-width: 980px;
		margin: 0 auto;
		padding: 2rem 1.25rem 3rem;
	}

	.doc-card {
		background:
			linear-gradient(rgba(14, 22, 42, 0.82), rgba(14, 22, 42, 0.82)) padding-box,
			linear-gradient(125deg, rgba(35, 148, 182, 0.54), rgba(110, 63, 177, 0.84), rgba(30, 141, 106, 0.84))
				border-box;
		border: 1px solid transparent;
		border-radius: 1rem;
		padding: 1.2rem;
		box-shadow: 0 14px 40px rgba(4, 8, 20, 0.55);
	}

	.eyebrow {
		margin: 0;
		font-size: 0.76rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 700;
		color: #5ed8ff;
	}

	h1 {
		margin: 0.42rem 0 0;
		font-size: clamp(1.62rem, 3.8vw, 2.18rem);
		line-height: 1.06;
	}

	.doc-text {
		margin-top: 0.8rem;
		padding: 1.05rem 1.08rem 1.15rem;
		border-radius: 0.72rem;
		border: 1px solid rgba(190, 215, 242, 0.32);
		background: rgba(12, 20, 37, 0.65);
		font-family: 'Source Serif 4', serif;
		font-size: 1rem;
		line-height: 1.64;
		color: #d4def3;
	}

	.doc-summary {
		margin: 0.32rem 0 0.96rem;
		max-width: none;
		color: #dbe5f5;
		line-height: 1.6;
	}

	.doc-text h2 {
		font-family: 'Space Grotesk', sans-serif;
		color: #f1f6ff;
		font-size: 1.15rem;
		line-height: 1.26;
		letter-spacing: 0.015em;
		margin: 1.45rem 0 0.5rem;
		padding-top: 0.9rem;
		border-top: 1px solid rgba(162, 201, 243, 0.18);
	}

	.doc-text h2:first-of-type {
		margin-top: 0;
		padding-top: 0;
		border-top: 0;
	}

	.doc-text ul {
		margin: 0.42rem 0 0.95rem 1.22rem;
		padding: 0;
		list-style-type: disc;
		list-style-position: outside;
	}

	.doc-text li {
		display: list-item;
		margin: 0.36rem 0;
		line-height: 1.6;
		color: #d7e2f4;
	}

	.doc-text li::marker {
		color: #8fdcff;
		font-family: 'Space Grotesk', sans-serif;
		font-weight: 700;
	}

	.doc-text p {
		margin: 0.3rem 0 0.86rem;
		max-width: 70ch;
		color: #dbe5f5;
	}

	.doc-text p.doc-summary {
		max-width: none;
	}

	.doc-note {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.83rem;
		line-height: 1.55;
		color: #b2c7e6;
	}

	hr {
		border: 0;
		height: 1px;
		background: rgba(190, 215, 242, 0.24);
		margin: 1.1rem 0 0.8rem;
	}

	.doc-actions {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-start;
	}

	.doc-cta {
		text-decoration: none;
		font-family: 'Space Grotesk', sans-serif;
		padding: 0.45rem 0.75rem;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: #f3f7ff;
		background: linear-gradient(120deg, #3b7b63 0%, #2a5f4d 55%, #1e4538 100%);
		border: 1px solid rgba(193, 217, 255, 0.34);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.06) inset,
			0 8px 20px rgba(7, 14, 33, 0.35);
	}

	@media (max-width: 720px) {
		.doc-text {
			padding: 0.95rem 0.92rem 1rem;
		}

		.doc-text p {
			max-width: none;
		}
	}
</style>
