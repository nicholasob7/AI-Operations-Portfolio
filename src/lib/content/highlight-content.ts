export type HighlightContentListItem =
	| string
	| {
				label: string;
				text: string;
		  };

export type HighlightContentBlock =
	| {
				type: 'paragraph';
				text: string;
				className?: string;
		  }
	| {
				type: 'list';
				items: HighlightContentListItem[];
		  };

export type HighlightContentSection = {
	title: string;
	id?: string;
	blocks: HighlightContentBlock[];
};

export type HighlightContent = {
	title: string;
	titleId: string;
	eyebrow: string;
	ariaLabel: string;
	standfirst?: string;
	highlightDetailText?: boolean;
	sections: HighlightContentSection[];
};

export const endpointRemediationContent: HighlightContent = {
	title: 'Endpoint Remediation',
	titleId: 'endpoint-remediation-title',
	eyebrow: 'Evidence Highlight',
	ariaLabel: 'Endpoint remediation evidence',
	sections: [
		{
			title: 'Summary',
			blocks: [
				{
					type: 'paragraph',
					className: 'doc-summary',
					text: 'A major application migration failed. I built a remediation script for affected endpoints. The script passed the required approval process, entered production use, and remains in use today. Its results became evidence for the wider package and deployment-layer correction.'
				}
			]
		},
		{
			title: 'Starting Point',
			blocks: [
				{
					type: 'list',
					items: [
						'Earlier remediation work had provided a test device and a safe way to test endpoint changes.',
						'The failed migration raised a larger practical question: which failures could be fixed locally?',
						'A test account was requested so the application could be investigated without relying only on live user sessions.'
					]
				}
			]
		},
		{
			title: 'Investigation Setup',
			blocks: [
				{
					type: 'list',
					items: [
						'AI support, PowerShell, VS Code, and GitHub Copilot were used to work through the script logic.',
						'Local application behavior was tested through uninstall, reinstall, safe local-data cleanup, and checks against what the application recreated.',
						'The investigation separated safe endpoint remediation from areas that needed to remain untouched.'
					]
				}
			]
		},
		{
			title: 'Script Development',
			blocks: [
				{
					type: 'list',
					items: [
						'The script refreshed safe local application state on affected endpoints.',
						'It corrected launch and profile-related failures where those failures were local to the endpoint.',
						'It also identified when a failure sat outside local application state.'
					]
				}
			]
		},
		{
			title: 'Approval and Production Use',
			blocks: [
				{
					type: 'list',
					items: [
						'The script was prepared for review and approval.',
						'It passed the required approval process.',
						'It entered production use for affected endpoints.'
					]
				}
			]
		},
		{
			title: 'What It Proved',
			blocks: [
				{
					type: 'list',
					items: [
						'The script fixed endpoint failures that would otherwise have required workaround or rollback.',
						'Its success and failure boundaries showed that the wider migration problem involved the package and deployment layer.',
						'The work turned live service-desk issues into evidence for a larger technical correction.'
					]
				}
			]
		}
	]
};

export const packageRedesignContent: HighlightContent = {
	title: 'Package Redesign',
	titleId: 'package-redesign-title',
	eyebrow: 'Evidence Highlight',
	ariaLabel: 'Package redesign evidence',
	sections: [
		{
			title: 'Summary',
			blocks: [
				{
					type: 'paragraph',
					className: 'doc-summary',
					text: 'The endpoint remediation script worked on affected machines, but it did not solve the whole migration by itself. Its success and failure boundaries showed that the package and deployment layer needed correction. I used that evidence to redesign the package path, which reached successful test-device validation. Full production rollout is in process.'
				}
			]
		},
		{
			title: 'Turning Point',
			blocks: [
				{
					type: 'list',
					items: [
						'The endpoint remediation script showed which failures could be corrected locally.',
						'The wider migration still needed a package-level answer.',
						'The work moved from individual endpoint recovery to investigation of the deployment package.'
					]
				}
			]
		},
		{
			title: 'Package Investigation',
			blocks: [
				{
					type: 'list',
					items: [
						'The endpoint remediation script worked when applied directly to affected machines.',
						'When packaged, the same fix failed because installation packaging conflicted with and overrode the script behavior.',
						'That failure showed there was no reliable pre-installation point where the endpoint script alone could correct the migration.',
						'The investigation therefore moved from packaging the script to redesigning the package path itself.'
					]
				}
			]
		},
		{
			title: 'Redesign Path',
			blocks: [
				{
					type: 'list',
					items: [
						'The endpoint script became evidence for what the package needed to handle.',
						'Package controls were mapped back to observed failure behavior.',
						'The redesign focused on reducing repeated endpoint recovery by correcting the deployment path.'
					]
				}
			]
		},
		{
			title: 'Review Surface',
			blocks: [
				{
					type: 'paragraph',
					text: 'The package redesign was structured as an agent-readable evidence directory rather than a loose set of notes or chat output. The directory preserved the package design, justifications, supporting evidence, deployment implications, and review-relevant information in a form another reviewer could open and interrogate with their preferred AI assistant.'
				},
				{
					type: 'paragraph',
					text: 'The result was a transferable review surface: a reviewer could open the working directory, whether through an editor, Codex, or another agent-assisted environment, ask a basic question such as “What is this?”, and be guided through the redesigned package path, the reasons for it, the evidence supporting it, and the information needed for change review.'
				}
			]
		},
		{
			title: 'Validation',
			blocks: [
				{
					type: 'list',
					items: [
						'The redesigned package path reached successful test-device validation.',
						'The output was prepared for review, change submission, and later rollout.',
						'Production rollout remained a later stage.'
					]
				}
			]
		},
		{
			title: 'What It Proved',
			blocks: [
				{
					type: 'list',
					items: [
						'The work turned live support failures into a package redesign path.',
						'It showed a progression from service-desk investigation to deployment-level correction.',
						'It gave the migration problem a practical route beyond repeated endpoint recovery.'
					]
				}
			]
		}
	]
};

export const aiGovernanceContent: HighlightContent = {
	title: 'AI Governance',
	titleId: 'ai-governance-title',
	eyebrow: 'Evidence Highlight',
	ariaLabel: 'AI governance evidence',
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

export const websitePublicationContent: HighlightContent = {
	title: 'Website Publication',
	titleId: 'website-publication-title',
	eyebrow: 'Evidence Highlight',
	ariaLabel: 'Website publication evidence',
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
