<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	});
</script>

<svelte:head>
	<title>Nicholas Francis O'Brien | Resume</title>
	<meta
		name="description"
		content="Resume of Nicholas Francis O'Brien, IT Service Desk Analyst focused on identity and endpoint administration."
	/>
</svelte:head>

<main class="resume-page">
	<header class="card hero">
		<p class="eyebrow">Resume</p>
		<div class="hero-content-row">
			<div class="hero-copy">
				<h1>Nicholas Francis O'Brien</h1>
				<div class="hero-subcopy">
					<p class="role">
						<span>AI_focused IT_operator</span>
						<span aria-hidden="true">|</span>
						<a href="mailto:nicko.obrien.ai@gmail.com">nicko.obrien.ai@gmail.com</a>
						<span>Lower Hutt, New Zealand</span>
					</p>
				</div>
			</div>
			<div class="metrics">
				<article>
					<p><strong>5,000+</strong> Users Supported</p>
				</article>
				<article>
					<p><strong>3+ Years</strong> Enterprise Service Desk</p>
				</article>
				<article>
					<p><strong>Queue Reduction</strong> Below Prior Baseline</p>
				</article>
				<article>
					<p><strong>On Request</strong> Mobile and References</p>
				</article>
			</div>
		</div>
	</header>

	<section class="card summary-card">
		<h2>Professional Summary</h2>
		<p class="summary-copy">
			IT professional with 3+ years supporting enterprise environments.
			Uses AI tools in IT support to improve troubleshooting, speed, and workflow quality.
			Ready to take on broader roles where strong IT delivery, automation, and practical AI use improve results.
		</p>
	</section>

	<section class="card">
		<h2>Professional Experience</h2>
		<h3>IT Service Desk Analyst / Service Desk SME - NTT, Wellington</h3>
		<p class="meta">November 2022 - Present</p>
		<ul>
			<li>
				Support a 5,000+ user environment across shared-service and single-organisation clients in
				transport, healthcare, energy, regional government, and consumer goods.
			</li>
			<li>
				Provide dedicated BAU Service Desk support for a major transport-sector client, with 2.5+
				years in this engagement within a team delivering 90%+ first-contact resolution.
			</li>
			<li>
				Handle BAU incidents and service requests from triage through to resolution, documentation,
				and escalation.
			</li>
			<li>
				Administer Active Directory and Entra ID daily, including user lifecycle, group access, and
				privileged account work within SDA scope.
			</li>
			<li>
				Serve as Service Desk SME for Privileged User Access Requests, managing end-to-end setup
				of admin, local admin, shared, and external accounts.
			</li>
			<li>
				Daily support across Microsoft 365, Exchange Online, and Intune, including device
				administration and endpoint management.
			</li>
			<li>
				Provide identity and access troubleshooting, including MFA support through Entra ID,
				BitLocker recovery, and Intune-managed endpoint compliance.
			</li>
			<li>
				Use Nexthink to identify, analyse, and support resolution of endpoint performance and device
				health issues.
			</li>
			<li>
				Use Jira Service Management and ServiceNow daily for incident, request, and escalation
				management.
			</li>
			<li>
				Provide remote end-user support through TeamViewer to resolve application, device, and access
				issues without onsite intervention.
			</li>
		</ul>
	</section>

	<section class="card">
		<h2>Selected Achievements and SME Responsibilities</h2>
		<ul>
			<li>Printer Services SME for a major enterprise client, with ownership of the printer vendor queue.</li>
			<li>
				Service Desk SME for a managed print vendor transition, including project meeting
				participation and direct coordination with vendor representatives.
			</li>
			<li>
				Extended effectiveness into Level 2 support by resolving printer configuration issues within
				Service Desk, reducing avoidable escalations.
			</li>
			<li>
				Workflow improvement: designed bulk-change execution, filter logic, and cross-ticket identity
				linkage to reduce handling demand below the previous single-ticket baseline.
			</li>
			<li>
				Improved triage visibility by turning the formal three-ticket model into clearer traceability
				and better resolution outcomes.
			</li>
			<li>
				Served as SME during transition away from the three-ticket vendor model,
				advising how to retain classification and workflow visibility benefits.
			</li>
			<li>
				Built AI-assisted troubleshooting scripts using modern development tooling that were adopted
				into production workflows for vendor-supplied enterprise applications.
			</li>
			<li>
				Diagnosed enterprise application migration failures linked to shortcut handling
				and logon cache behavior, helping restart a deferred upgrade programme.
			</li>
			<li>
				Looking to expand AI-assisted troubleshooting playbooks across other vendor-supplied
				applications.
			</li>
		</ul>
	</section>

	<section class="card compact-list-card">
		<h2>Technical Skills</h2>
		<ul>
			<li>Active Directory and Entra ID administration</li>
			<li>Intune device administration, compliance, and endpoint policy support</li>
			<li>Microsoft 365 and Exchange Online</li>
			<li>MFA support, identity troubleshooting, and BitLocker recovery</li>
			<li>Windows desktop and application support</li>
			<li>Jira Service Management, ServiceNow, TeamViewer, and Nexthink</li>
		</ul>
	</section>

	<section class="card compact-list-card">
		<h2>Qualifications</h2>
		<ul>
			<li>AWS Certified Cloud Practitioner</li>
			<li>AWS Foundations of Cloud Computing - Unitec / Te Pukenga</li>
			<li>Bachelor of Arts (History and Political Science) - Griffith University</li>
			<li>NTT internal certifications, including ongoing AI training programme</li>
		</ul>
	</section>

	<section class="card compact-copy-card">
		<h2>Additional Strengths</h2>
		<ul>
			<li>Clear, professional communication in public-facing and technical contexts</li>
			<li>Calm, methodical problem solving in BAU and project environments</li>
			<li>Continuous learning in identity, endpoint management, and AI-assisted IT support</li>
		</ul>
	</section>

	<div class="resume-actions">
		<a class="resume-download-link resume-download-link-bw" href="/resume-bw.pdf" download="Nicholas_Francis_OBrien_Resume_BW.pdf">
			Download Print-Friendly (B&W PDF)
		</a>
			<a class="resume-home-link" data-sveltekit-reload href="/#hero-head">Return to Main Page</a>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		color: #e7edf8;
		font-family: 'Space Grotesk', sans-serif;
		background:
			radial-gradient(circle at 10% 0%, rgba(39, 102, 171, 0.24), transparent 32%),
			radial-gradient(circle at 90% 10%, rgba(29, 131, 113, 0.22), transparent 28%),
			linear-gradient(165deg, #070d18 0%, #111b2f 55%, #0c1629 100%);
	}

	.resume-page {
		max-width: 980px;
		margin: 0 auto;
		padding: 1.2rem 1rem 2.2rem;
		display: grid;
		gap: 0.8rem;
	}

	.card {
		background:
			linear-gradient(rgba(15, 24, 40, 0.9), rgba(15, 24, 40, 0.9)) padding-box,
			linear-gradient(120deg, rgba(93, 173, 255, 0.6), rgba(61, 177, 153, 0.62)) border-box;
		border: 1px solid transparent;
		border-radius: 0.9rem;
		padding: 0.9rem 1rem;
		box-shadow: 0 12px 26px rgba(3, 8, 20, 0.5);
	}

	.hero {
		padding-top: 1rem;
		position: relative;
	}

	.hero-content-row {
		display: flex;
		align-items: stretch;
		gap: 1.25rem;
		margin-top: 0.55rem;
		padding-right: calc(16rem + 1.25rem);
	}

	.eyebrow {
		margin: 0;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.09em;
		color: #88d2ff;
		font-weight: 700;
	}

	h1 {
		margin: 0.2rem 0 0;
		font-size: clamp(1.6rem, 4vw, 2.2rem);
		line-height: 1;
		color: #dce6f3;
	}

	.role {
		margin: 0.35rem 0 0;
		display: flex;
		flex-wrap: nowrap;
		align-items: baseline;
		column-gap: 0.18rem;
		row-gap: 0.08rem;
		font-size: 0.74rem;
		line-height: 1.08;
		font-weight: 560;
		color: #afc3de;
	}

	.role > * {
		white-space: nowrap;
	}

	.hero-copy h1,
	.hero-copy .role {
		margin: 0;
	}

	.hero-copy {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 0.58rem;
		min-width: 0;
		min-height: 100%;
	}

	.hero-subcopy {
		display: grid;
		gap: 0.42rem;
	}

	a {
		color: #9ed7ff;
	}

	h2 {
		margin: 0;
		font-size: 1.08rem;
		line-height: 1.2;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #96dcff;
	}

	h3 {
		margin: 0.72rem 0 0;
		font-size: 1.02rem;
		line-height: 1.3;
		color: #f3f7ff;
	}

	.meta {
		margin: 0.26rem 0 0;
		font-size: 0.76rem;
		font-weight: 560;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #9fb9da;
	}

	p {
		margin: 0.66rem 0 0;
		line-height: 1.54;
		color: #d7e2f4;
		font-size: 0.9rem;
	}

	ul {
		margin: 0.68rem 0 0;
		padding-left: 1.05rem;
		display: grid;
		gap: 0.4rem;
		list-style: disc;
	}

	li {
		line-height: 1.47;
		font-size: 0.89rem;
		color: #d3def1;
	}

	li::marker {
		color: #92dbff;
	}

	.compact-list-card {
		padding-top: 0.72rem;
		padding-bottom: 0.76rem;
	}

	.compact-list-card ul {
		margin-top: 0.42rem;
		padding-left: 1rem;
		gap: 0.22rem;
		list-style: disc;
	}

	.compact-list-card li {
		line-height: 1.24;
	}

	.compact-copy-card {
		padding-top: 0.72rem;
		padding-bottom: 0.76rem;
	}

	.compact-copy-card ul {
		margin-top: 0.42rem;
		padding-left: 1rem;
		gap: 0.22rem;
		list-style: disc;
	}

	.compact-copy-card li {
		line-height: 1.26;
	}

	.summary-card {
		display: grid;
		gap: 0.72rem;
	}

	.summary-copy {
		margin: 0;
		max-width: none;
	}

	.metrics {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		width: 16rem;
		display: grid;
		grid-template-rows: repeat(4, minmax(0, 1fr));
		gap: 0.28rem;
	}

	.metrics article {
		background: linear-gradient(120deg, rgba(46, 74, 118, 0.68), rgba(29, 83, 75, 0.65));
		border-radius: 0.65rem;
		padding: 0 0.46rem;
		border: 1px solid rgba(156, 205, 255, 0.26);
		display: flex;
		align-items: center;
		min-height: 0;
	}

	.metrics p {
		margin: 0;
		font-size: 0.72rem;
		line-height: 1.12;
		color: #d5e2f5;
	}

	.resume-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		justify-content: flex-start;
	}

	.resume-download-link,
	.resume-home-link {
		text-decoration: none;
		font-family: inherit;
		padding: 0.45rem 0.75rem;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: #f3f7ff;
		border: 1px solid rgba(193, 217, 255, 0.34);
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.06) inset,
			0 8px 20px rgba(7, 14, 33, 0.35);
	}

	.resume-download-link {
		background: linear-gradient(120deg, #35598f 0%, #4f4685 55%, #2a7167 100%);
	}

	.resume-download-link-bw {
		background: linear-gradient(120deg, #395759 0%, #3d5366 55%, #1f584b 100%);
	}

	.resume-home-link {
		background: linear-gradient(120deg, #3b7b63 0%, #2a5f4d 55%, #1e4538 100%);
	}

	.metrics strong {
		color: #f4f8ff;
		font-size: 0.82rem;
		font-weight: 700;
		margin-right: 0.22rem;
	}

	@media (max-width: 760px) {
		.role {
			flex-wrap: wrap;
			font-size: 0.78rem;
			column-gap: 0.22rem;
		}

		.hero-content-row {
			display: block;
			padding-right: 0;
		}

		.metrics {
			position: static;
			transform: none;
			width: auto;
			grid-template-rows: none;
			gap: 0.28rem;
		}

		.metrics {
			margin-top: 0.75rem;
		}

		.resume-page {
			padding: 1rem 0.85rem 1.6rem;
			gap: 0.7rem;
		}
	}
</style>
