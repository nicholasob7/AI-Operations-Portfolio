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
		<h1>Nicholas Francis O'Brien</h1>
		<p class="role">IT Service Desk Analyst | Identity and Endpoint Administration</p>
		<p class="contact">
			<a href="mailto:nicholasob972@gmail.com">nicholasob972@gmail.com</a>
			<span aria-hidden="true">|</span>
			<span>+64 21 874 999</span>
			<span aria-hidden="true">|</span>
			<span>Lower Hutt, New Zealand</span>
		</p>
	</header>

	<section class="card">
		<h2>Professional Summary</h2>
		<p>
			IT Service Desk Analyst and Service Desk SME with 3+ years supporting enterprise identity,
			access, and endpoint environments across Active Directory, Entra ID, Intune, and Microsoft 365.
			Trusted to resolve complex BAU incidents, lead support-facing vendor transition workflows, and
			improve queue outcomes through process design, structured ticket handling, and AI-assisted
			troubleshooting.
		</p>
		<div class="metrics">
			<article>
				<h3>5,000+</h3>
				<p>Users Supported</p>
			</article>
			<article>
				<h3>3+ Years</h3>
				<p>Enterprise Service Desk</p>
			</article>
			<article>
				<h3>Queue Reduction</h3>
				<p>Below Prior Baseline</p>
			</article>
		</div>
	</section>

	<section class="card">
		<h2>Professional Experience</h2>
		<h3>IT Service Desk Analyst / Service Desk SME - NTT, Wellington</h3>
		<p class="meta">November 2022 - Present</p>
		<ul>
			<li>
				Service Desk Analyst supporting a 5,000+ user environment across multi-client and
				single-organisation engagements, including KiwiRail.
			</li>
			<li>
				First point of contact for BAU incidents and service requests, owning triage, resolution,
				documentation, and escalation workflows.
			</li>
			<li>
				Daily administration across Active Directory and Entra ID, including user lifecycle management,
				group membership, access changes, and privileged account workflows within SDA scope.
			</li>
			<li>
				Service Desk SME for Privileged User Access Requests, owning end-to-end creation and
				configuration of admin, local admin, shared, and external user accounts.
			</li>
			<li>
				Daily support across Microsoft 365, Exchange Online, and Intune, including device
				administration and endpoint management.
			</li>
			<li>
				Deliver identity and access troubleshooting including MFA support via Entra ID, BitLocker
				recovery, and Intune-managed endpoint compliance.
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
			<li>Printer Services SME for KiwiRail, with operational ownership of the printer vendor queue.</li>
			<li>
				Service Desk SME for the Ricoh to Canon printer vendor transition, including project meeting
				participation and direct coordination with Canon representatives.
			</li>
			<li>
				Extended effectiveness into Level 2 support by resolving printer configuration issues within
				Service Desk, reducing avoidable escalations.
			</li>
			<li>
				Workflow optimization: designed bulk-change execution, filter logic, and cross-ticket identity
				linkage to reduce handling demand below the previous single-ticket baseline.
			</li>
			<li>
				Operational visibility: converted formal three-ticket schema granularity into stronger triage
				precision, traceability, and improved resolution outcomes.
			</li>
			<li>
				Transition advisory: served as SME during transition away from the three-ticket vendor model,
				advising how to retain classification and workflow visibility benefits.
			</li>
			<li>
				Automation: built AI-assisted troubleshooting scripts in VS Code and Copilot adopted into
				production workflows for Amicus and SAP.
			</li>
			<li>
				Migration recovery: diagnosed SAP 7.5 to 7.7 transition failures linked to shortcut handling
				and logon cache behavior, helping restart a deferred enterprise upgrade in Q1 2026.
			</li>
			<li>
				Expanding AI-assisted troubleshooting playbooks across additional externally supplied
				applications, including Vision CRE.
			</li>
		</ul>
	</section>

	<section class="card grid-two">
		<section>
			<h2>Education and Certifications</h2>
			<ul>
				<li>AWS Certified Cloud Practitioner</li>
				<li>AWS Foundations of Cloud Computing - Unitec / Te Pukenga</li>
				<li>Bachelor of Arts (History and Political Science) - Griffith University</li>
				<li>NTT internal certifications, including ongoing AI training programme</li>
			</ul>
		</section>
		<section>
			<h2>Technical Skills</h2>
			<ul>
				<li>Active Directory and Entra ID administration (user, group, access, privileged accounts)</li>
				<li>Intune device administration, compliance, and endpoint policy support</li>
				<li>Microsoft 365 and Exchange Online</li>
				<li>MFA support, identity troubleshooting, and BitLocker recovery</li>
				<li>Windows desktop and application support</li>
				<li>Jira Service Management, ServiceNow, TeamViewer, and Nexthink</li>
			</ul>
		</section>
	</section>

	<section class="card">
		<h2>Additional Strengths</h2>
		<p>
			Clear, professional communication in public-facing and technical contexts. Calm, methodical
			problem solving in BAU and project environments. Continuous self-directed learning in identity,
			endpoint management, and AI-assisted IT operations.
		</p>
	</section>
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
		line-height: 1.1;
		color: #f4f8ff;
	}

	.role {
		margin: 0.35rem 0 0;
		font-size: 0.95rem;
		font-weight: 600;
		color: #bdd4f4;
	}

	.contact {
		margin: 0.55rem 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: 0.86rem;
		color: #cbd8ec;
	}

	a {
		color: #9ed7ff;
	}

	h2 {
		margin: 0;
		font-size: 1.02rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #8fd5ff;
	}

	h3 {
		margin: 0.55rem 0 0;
		font-size: 0.98rem;
		color: #f2f6ff;
	}

	.meta {
		margin: 0.2rem 0 0;
		font-size: 0.83rem;
		color: #a9bedf;
	}

	p {
		margin: 0.55rem 0 0;
		line-height: 1.46;
		color: #d7e2f4;
		font-size: 0.93rem;
	}

	ul {
		margin: 0.55rem 0 0;
		padding-left: 1.1rem;
		display: grid;
		gap: 0.33rem;
	}

	li {
		line-height: 1.4;
		font-size: 0.91rem;
		color: #d3def1;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.55rem;
		margin-top: 0.75rem;
	}

	.metrics article {
		background: linear-gradient(120deg, rgba(46, 74, 118, 0.68), rgba(29, 83, 75, 0.65));
		border-radius: 0.65rem;
		padding: 0.5rem;
		border: 1px solid rgba(156, 205, 255, 0.26);
	}

	.metrics h3 {
		margin: 0;
		font-size: 1rem;
		color: #f4f8ff;
	}

	.metrics p {
		margin-top: 0.22rem;
		font-size: 0.8rem;
		color: #d5e2f5;
	}

	.grid-two {
		display: grid;
		gap: 0.8rem;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.grid-two section {
		min-width: 0;
	}

	@media (max-width: 760px) {
		.metrics,
		.grid-two {
			grid-template-columns: 1fr;
		}

		.resume-page {
			padding: 1rem 0.85rem 1.6rem;
			gap: 0.7rem;
		}
	}
</style>
