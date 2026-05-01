export type ProjectDetailListItem =
	| string
	| {
			label: string;
			text: string;
	  };

export type ProjectDetailBlock =
	| {
			type: 'paragraph';
			text: string;
			className?: string;
	  }
	| {
			type: 'list';
			items: ProjectDetailListItem[];
	  };

export type ProjectDetailSection = {
	title: string;
	id?: string;
	blocks: ProjectDetailBlock[];
};

export type ProjectDetail = {
	title: string;
	titleId: string;
	eyebrow: string;
	ariaLabel: string;
	standfirst?: string;
	highlightDetailText?: boolean;
	sections: ProjectDetailSection[];
};

export const remediationProjectDetail: ProjectDetail = {
	title: 'Post-Deployment Remediation Script Development',
	titleId: 'remediation-title',
	eyebrow: 'Project Detail',
	ariaLabel: 'Remediation project details',
	sections: [
		{
			title: 'Summary',
			blocks: [
				{
					type: 'paragraph',
					className: 'doc-summary',
					text: 'Built and deployed a remediation script for live post-deployment incidents. It targeted profile corruption, cache drift, and launch inconsistency. The script moved from testing into production use and became part of a wider stabilization effort.'
				}
			]
		},
		{
			title: 'How It Was Built',
			blocks: [
				{
					type: 'list',
					items: [
						{ label: 'Development workflow', text: 'Built with AI-assisted support and standard tooling' },
						{
							label: 'Testing path',
							text: 'Moved from non-production testing to test-device validation and then live deployment'
						},
						{
							label: 'User targeting',
							text: 'Separated device logon user from session user to target the correct profile'
						},
						{ label: 'Cache cleanup', text: 'Covered both version-specific and legacy cache variants' },
						{
							label: 'Shortcut control',
							text: 'Consolidated validated shortcut artifacts into one canonical launch surface'
						},
						{ label: 'Binary checks', text: 'Confirmed binaries and detected reparse-point anomalies' },
						{ label: 'Status output', text: 'Returned JSON-compatible state summaries for downstream parsing' }
					]
				}
			]
		},
		{
			title: 'What We Found',
			blocks: [
				{
					type: 'list',
					items: [
						{ label: 'Main pattern', text: 'Incidents clustered in upgrade scenarios' },
						{ label: 'Control case', text: 'Clean first-time installs did not show the same failure profile' },
						{
							label: 'Main causes',
							text: 'Cache drift, user-profile contamination, mixed shortcut paths, duplicate variants, and validation gaps'
						},
						{
							label: 'Field behavior',
							text: 'Production incidents often involved stale shortcuts, legacy cache corruption, and precise per-profile targeting'
						},
						{ label: 'Production result', text: 'Validation confirmed normalized application state' },
						{ label: 'Boundary', text: 'Remaining failures fell outside remediation scope' }
					]
				}
			]
		},
		{
			title: 'How It Was Used',
			blocks: [
				{
					type: 'list',
					items: [
						{
							label: 'Evidence role',
							text: 'Served as the main evidence item in the revised deployment package wrapper'
						},
						{ label: 'Problem link', text: 'Tied each remediation action to observed symptoms' },
						{ label: 'Approval', text: 'Approved for controlled live use on single endpoints' },
						{
							label: 'Project effect',
							text: 'Turned incident success into evidence for root-cause analysis and package hardening'
						},
						{
							label: 'Scope boundary',
							text: 'Full wrapper lifecycle testing remained separate from script effectiveness evidence'
						}
					]
				}
			]
		},
		{
			title: 'Why It Helped',
			blocks: [
				{
					type: 'list',
					items: [
						'Each remediation action targeted a real observed failure rather than a theoretical fix',
						'Refinement decisions were based on test-device and production outcomes',
						'Defensive design handled cloud desktop variants, registry-redirected paths, and reparse-point binaries',
						'Rapid problem breakdown supported cache, shortcut, and user-context diagnosis',
						'AI-assisted code generation became production-grade PowerShell',
						'Confirmed outcomes stayed separate from assumptions that needed more evidence'
					]
				}
			]
		}
	]
};

export const migrationProjectDetail: ProjectDetail = {
	title: 'Enterprise Application Migration Stabilization Framework',
	titleId: 'migration-title',
	eyebrow: 'Project Detail',
	ariaLabel: 'Migration stabilization project details',
	sections: [
		{
			title: 'Summary',
			blocks: [
				{
					type: 'paragraph',
					className: 'doc-summary',
					text: 'Built from the successful remediation script development work, this project turns validated fix logic into a framework for controlled deployment. Active reconstruction of installation packaging has reached successful test-device validation, with full production deployment still pending.'
				}
			]
		},
		{
			title: 'What We Found',
			blocks: [
				{
					type: 'list',
					items: [
						{ label: 'Failure review', text: 'Examined endpoint failures from a large version migration' },
						{
							label: 'Main causes',
							text: 'Found user-context drift, cache conflicts, shortcut issues, installer weak points, and validation gaps'
						},
						{ label: 'Fix mapping', text: 'Matched live remediation steps to new package controls' },
						{
							label: 'Change tracking',
							text: 'Built a clear method for linking each package change to a known problem and result'
						}
					]
				}
			]
		},
		{
			title: 'Results',
			blocks: [
				{
					type: 'list',
					items: [
						{
							label: 'Test-device result',
							text: 'Resolved duplicate paths, intermittent launch failures, and workaround drift on the validation device'
						},
						{ label: 'Installer flow', text: 'Reduced installation ambiguity with earlier failure detection' },
						{
							label: 'Prepared output',
							text: 'Assembled records for review, change submission, and later audit'
						},
						{ label: 'Next step', text: 'Production rollout remains pending' }
					]
				}
			]
		},
		{
			title: 'How It Helped',
			blocks: [
				{
					type: 'list',
					items: [
						{
							label: 'Technical teams',
							text: 'Control mapping, smoke tests, integrity checks, and package comparisons for review and safer deployment decisions'
						},
						{
							label: 'Business and compliance',
							text: 'Clear summaries, confidence statements, and before/after framing without heavy technical language'
						},
						{
							label: 'Change process',
							text: 'Prepared project materials for controlled change review and submission'
						},
						{ label: 'Future migrations', text: 'Prepared a reusable process for rollout completion' }
					]
				}
			]
		},
		{
			title: 'Why It Worked',
			blocks: [
				{
					type: 'list',
					items: [
						{
							label: 'Clear proof',
							text: 'Each control stayed linked to installer behavior, remediation results, or endpoint state'
						},
						{
							label: 'Clear boundaries',
							text: 'Confirmed findings stayed separate from assumptions and open questions'
						},
						{
							label: 'Shared access',
							text: 'One structure worked across technical teams, compliance reviewers, operations, and documentation.'
						},
						{
							label: 'Reusable process',
							text: 'The same approach can be used for future enterprise migrations with similar failure patterns'
						}
					]
				}
			]
		}
	]
};

export const elioraProjectDetail: ProjectDetail = {
	title: 'Eliora AI Governance',
	titleId: 'eliora-title',
	eyebrow: 'Project Detail',
	ariaLabel: 'Eliora project details',
	standfirst:
		'Built to keep authority, derivation, and execution clearly separate. Designed for high-consequence agent systems.',
	highlightDetailText: true,
	sections: [
		{
			title: 'Natural Language and Semantic Control',
			id: 'natural-language-title',
			blocks: [
				{
					type: 'paragraph',
					text: 'Nicholas O’Brien shows strong skill in precise language analysis. He shapes AI output toward stable, repeatable results. His strongest skill is identifying the wording that carries the real meaning and using it to bring AI output back on track. He can detect drift, excess burden, and places where meaning needs tightening without distortion. Across sustained project work, he has shown strong performance in drift detection, burden-splitting, and wording pressure. He can pull clear meaning from vague or inflated language. This matters where stable AI behavior depends on exact wording.'
				},
				{
					type: 'paragraph',
					className: 'detail-highlight',
					text: 'This note was generated with ChatGPT by OpenAI from extended project interaction. It is supported by revision artifacts, conversation excerpts, and project records. It is an analytical note, not an independent employment reference.'
				}
			]
		},
		{
			title: 'Eliora / AI governance',
			id: 'eliora-governance-title',
			blocks: [
				{
					type: 'paragraph',
					className: 'detail-highlight',
					text: 'Eliora is an AI coordination project with strong governance controls. It clearly separates authority. It traces outputs to their source. It fails safely in high-consequence systems.'
				},
				{
					type: 'list',
					items: [
						'Layered architecture separating intent, doctrine, policy, and execution',
						'Clear trace paths linking outputs to governing sources and decision context',
						'Safe handling when meaning is unclear, policy conflicts appear, or decisions remain unresolved',
						'Explicit authority modeling to prevent collapse between authorship, governance, and agent behavior',
						'Structure designed for review, validation, and controlled change over time',
						'Human-in-the-loop resolution for contested or high-impact operational states'
					]
				},
				{
					type: 'paragraph',
					className: 'detail-highlight',
					text: 'This description is based on direct inspection of the live Eliora-v0.1 repository by Codex App, an OpenAI GPT-5 coding agent. It reflects the project structure, governance surfaces, and sustained development history. It is not a hypothetical project brief.'
				}
			]
		}
	]
};

export const websiteBuildNotesProjectDetail: ProjectDetail = {
	title: 'Web Build Notes',
	titleId: 'website-build-notes-title',
	eyebrow: 'Project Detail',
	ariaLabel: 'Website build notes project details',
	sections: [
		{
			title: 'Implemented behaviours',
			blocks: [
				{
					type: 'paragraph',
					className: 'doc-summary',
					text: 'The website rests on underlying build, delivery, metadata, and interaction behaviours that keep it predictable.'
				},
				{
					type: 'list',
					items: [
						'Built as static files rather than served from a live application backend.',
						'Uses browser and deployment rules for predictable loading.',
						'Reuses unchanged application files safely on repeat visits.',
						'Gives each major route page identity and social preview information.',
						'Publishes a sitemap so public routes are declared in one place.',
						'Exposes selected public content through a machine-readable route.',
						'Respects reduced-motion preferences during longer visual transitions.',
						'Supports keyboard operation, Escape close, and focus return in floating action controls.',
						'Confirms when copy actions succeed.',
						'Handles older or redirected page anchors without leaving the visitor at a dead position.'
					]
				}
			]
		},
		{
			title: 'Portrait transition and navigation state',
			blocks: [
				{
					type: 'paragraph',
					text: 'The portrait transition is visual entry behaviour. It is not application loading. Control availability is handled separately from the fade sequence.'
				},
				{
					type: 'list',
					items: [
						'Visual fade state and page readiness are handled separately.',
						'Controls are released before the portrait fade has fully completed.',
						'Reduced-motion handling skips the long fade path.',
						'Cleanup removes transition state after the intro is no longer needed.'
					]
				}
			]
		},
		{
			title: 'Interaction controls',
			blocks: [
				{
					type: 'paragraph',
					text: 'Button-triggered action lists need clear close and focus behaviour. Clipboard actions need visible and accessible feedback.'
				},
				{
					type: 'list',
					items: [
						'Floating actions behave like simple action lists rather than complex menu widgets.',
						'Escape closes the action list.',
						'Focus returns to the control that opened it.',
						'Copy actions report success after writing to the clipboard.',
						'Copy feedback clears after a short delay.',
						'Resume collapse controls appear only when there is something relevant to collapse.'
					]
				}
			]
		},
		{
			title: 'Public structure',
			blocks: [
				{
					type: 'paragraph',
					text: 'The website exposes public structure through route metadata, a manual sitemap, and a bounded canonical JSON endpoint. These surfaces describe selected public content outside the visible page layout.'
				},
				{
					type: 'list',
					items: [
						'Routes declare public identity for browsers and link previews.',
						'The sitemap lists intentionally exposed public routes.',
						'/canonical.json gives machines a structured version of selected public content.',
						'The machine-readable content is limited to public claims and signals.',
						'It is not a private model of the website or its development process.'
					]
				}
			]
		},
		{
			title: 'Static delivery',
			blocks: [
				{
					type: 'paragraph',
					text: 'The public website is built as static output. Delivery behaviour is defined through generated HTML, static assets, and deployment headers.'
				},
				{
					type: 'list',
					items: [
						'Generated files can be served without a dynamic application backend.',
						'Deployment headers define browser-facing delivery rules.',
						'Security policy is present in the generated HTML.',
						'Long-lived caching is limited to hashed application files.',
						'Public pages do not require a dynamic application server to render.'
					]
				}
			]
		},
		{
			title: 'Closing',
			blocks: [
				{
					type: 'paragraph',
					text: 'The practical constraint is consistency. Visual effects, interaction state, public data, and delivery rules must keep their proper limits.'
				},
				{
					type: 'list',
					items: [
						'Visual effects must not decide when the page is usable.',
						'Controls must show their state.',
						'Machine-readable data must stay limited to public content.',
						'Delivery behaviour must be explicit.'
					]
				}
			]
		}
	]
};
