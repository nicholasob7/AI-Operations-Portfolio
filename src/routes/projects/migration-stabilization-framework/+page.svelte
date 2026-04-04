<svelte:head>
	<title>Enterprise Migration Stabilization Framework | Nicko O'Brien</title>
	<meta
		name="description"
		content="Detailed portfolio entry for the Enterprise Application Migration Stabilization Framework project."
	/>
</svelte:head>

<main class="doc-page">
	<section class="doc-card">
		<p class="eyebrow">Project Detail</p>
		<h1>Enterprise Application Migration Stabilization Framework</h1>

		<div class="doc-text" aria-label="Migration stabilization project details">
			<h2>Enterprise Application Migration Stabilization Framework</h2>

			<h3>Project Achievement</h3>
			<p>
				Developed and validated an evidence-driven migration stabilization methodology for an enterprise
				application. The project resolved post-upgrade endpoint failures by turning field-tested remediation
				actions into hardened installation package controls.
			</p>

			<h3>Technical Core</h3>
			<ul>
				<li>Analyzed endpoint failure patterns from a large-scale enterprise application version migration</li>
				<li>
					Isolated root causes through evidence of mechanisms: user-context state drift, cache coexistence
					drift, shortcut launch inconsistency, installer sequencing weak points, and runtime validation
					gaps
				</li>
				<li>
					Mapped live production remediation actions (user-state cleanup, cache hygiene, shortcut
					normalization controls, executable validation) directly into proposed package controls
				</li>
				<li>
					Built AI-assisted evidence-chain protocols so each package change is traceable to symptoms and
					outcomes
				</li>
			</ul>

			<h3>Outcomes</h3>
			<ul>
				<li>Resolved duplicate path entries, intermittent launch failures, and non-standard workaround drift</li>
				<li>Eliminated installation sequencing ambiguity with early failure detection improvements</li>
				<li>Validated on live production devices post-remediation, including uninstall/reboot behaviors</li>
				<li>Produced reproducible, audit-ready change documentation for formal review process</li>
			</ul>

			<h3>User-Friendly and Platform-Agnostic Impact</h3>
			<p>
				This project goes beyond technical implementation. It delivers a reusable stabilization framework
				template for both technical and non-technical stakeholders:
			</p>
			<ul>
				<li>
					For Technical Teams: Evidence-based control mapping, smoke-test gates, integrity manifests, and
					side-by-side package diffs for confident deployment decisions
				</li>
				<li>
					For Business and Compliance: Executive summaries with confidence levels, chronology anchors, and
					clear before/after outcomes; no specialized technical background required
				</li>
				<li>
					For Future Deployments: AI-assisted workflows that guide new migrations with the same evidence-first
					method
				</li>
			</ul>

			<h3>Key Differentiators</h3>
			<ol>
				<li>
					Evidence-First Architecture: Prose summaries are not treated as primary proof. Controls remain
					traceable to installer behavior, remediation outcomes, or endpoint-state observations.
				</li>
				<li>
					Defensive Historiography: Separates validated findings from assumptions and explicitly marks
					unresolved questions for follow-up investigation.
				</li>
				<li>
					Cross-Functional Accessibility: A single repository structure supports technical architects,
					compliance auditors, operations teams, and AI-assisted documentation workflows.
				</li>
				<li>
					Reproducible Methodology: The template enables the same structured approach for future migrations.
					It is applicable to any versioned enterprise software with similar failure patterns.
				</li>
			</ol>

			<p>
				This work shows how AI supports human technical judgment. It improves evidence traceability,
				documentation clarity, and troubleshooting access across stakeholder groups.
			</p>

			<hr />
			<h3>Attribution Note</h3>
			<p>
				This portfolio description was produced in collaboration with GitHub Copilot in Visual Studio Code.
				Repository artifacts and technical documentation were analyzed to synthesize key achievements and
				differentiators while preserving confidentiality.
			</p>
			<div class="doc-actions">
				<a class="doc-cta" href="/#migration-card">Hide and Return to Main Page</a>
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
		margin: 0.35rem 0 0;
		font-size: clamp(1.45rem, 3.4vw, 2rem);
	}

	.doc-text {
		margin-top: 0.7rem;
		padding: 0.9rem;
		border-radius: 0.72rem;
		border: 1px solid rgba(190, 215, 242, 0.32);
		background: rgba(12, 20, 37, 0.65);
		font-family: 'Source Serif 4', serif;
		font-size: 1rem;
		line-height: 1.52;
		color: #d4def3;
	}

	.doc-text h2,
	.doc-text h3 {
		font-family: 'Space Grotesk', sans-serif;
		color: #e8eefc;
	}

	.doc-text h2 {
		font-size: 1.15rem;
		margin: 0 0 0.4rem;
	}

	.doc-text h3 {
		font-size: 1rem;
		margin: 1.1rem 0 0.35rem;
	}

	.doc-text ul,
	.doc-text ol {
		margin: 0.25rem 0 0.65rem 1.15rem;
		padding: 0;
	}

	.doc-text li {
		margin: 0.25rem 0;
	}

	.doc-text p {
		margin: 0.35rem 0 0.65rem;
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
</style>
