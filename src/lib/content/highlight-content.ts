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
			title: 'Static publication surface',
			blocks: [
				{
					type: 'paragraph',
					className: 'doc-summary',
					text: 'The website is a static SvelteKit professional publication surface. It publishes selected public profile, resume, evidence, and machine-readable material without relying on a live application backend.'
				},
				{
					type: 'list',
					items: [
						'Built with SvelteKit static output rather than a server-rendered runtime.',
						'Public pages render from committed source content and static assets.',
						'Deployment headers define browser-facing security and cache behaviour.',
						'Each major human route declares page identity and social preview metadata.',
						'Generated public files can be served without a dynamic application server.'
					]
				}
			]
		},
		{
			title: 'Public route system',
			blocks: [
				{
					type: 'paragraph',
					text: 'The public site is organized around a small set of intentional entry routes for human readers and machine readers.'
				},
				{
					type: 'list',
					items: [
						'The homepage introduces the profile, public links, resume entry point, highlights entry point, and canonical JSON pointer.',
						'/resumes lists the active role-specific resume projections.',
						'Resume detail routes publish the HTML versions for each active projection.',
						'/highlights lists the public evidence highlight routes.',
						'Highlight detail routes publish bounded evidence pages, including this Website Publication page.',
						'/canonical.json, /llms.txt, /sitemap.xml, and robots.txt provide public machine-readable and discovery surfaces.'
					]
				}
			]
		},
		{
			title: 'Resume projection surface',
			blocks: [
				{
					type: 'paragraph',
					text: 'The active resume surface is projection-based. It publishes three reviewed role-specific resume paths from the same public profile and evidence model.'
				},
				{
					type: 'list',
					items: [
						'The three active public projections are IT Support, Technical Operations, and AI / Process Improvement.',
						'Each projection has a human-readable HTML detail route linked from /resumes.',
						'Each projection also has a reviewed static PDF artifact under /resumes.',
						'The resume index opens PDFs in a new tab; resume detail pages expose a Save PDF action using the browser download attribute.',
						'Unknown or inactive resume projection slugs resolve to a not-found state rather than a generated resume.'
					]
				}
			]
		},
		{
			title: 'Machine-readable surfaces',
			blocks: [
				{
					type: 'paragraph',
					text: '/canonical.json is the authoritative structured public surface. It is generated from build-time content modules and exposes selected public profile, practice, evidence, resume projection, artifact, and publication-boundary data.'
				},
				{
					type: 'list',
					items: [
						'Machine readers are directed to start with resume_projection_index.',
						'The canonical payload declares active projection metadata, HTML routes, PDF artifact paths, evidence relationships, and publication boundary notes.',
						'/llms.txt points machine readers to /canonical.json and summarizes the intended reading path.',
						'/sitemap.xml lists intentionally exposed public routes and PDF artifacts.',
						'robots.txt allows crawling and points crawlers to the sitemap and canonical JSON surface.'
					]
				}
			]
		},
		{
			title: 'Portrait entry behaviour',
			blocks: [
				{
					type: 'paragraph',
					text: 'Portrait entry behaviour is visual navigation state. It is not application loading, resume generation, or data fetching.'
				},
				{
					type: 'list',
					items: [
						'Portrait images are attached to selected entry surfaces, including the homepage, resume area, and highlight detail pages.',
						'The visual fade state is tracked separately from interaction readiness.',
						'Controls can become available before the portrait fade has fully completed.',
						'Reduced-motion preference skips the long fade path.',
						'Resume-area navigation suppresses repeated automatic portrait intros while moving between active resume pages.'
					]
				}
			]
		},
		{
			title: 'Floating actions and accessibility',
			blocks: [
				{
					type: 'paragraph',
					text: 'Floating actions are simple action lists for route navigation, top-of-page actions, and PDF access. They are not clipboard controls or complex menu widgets.'
				},
				{
					type: 'list',
					items: [
						'The Actions trigger opens a grouped list of links or buttons.',
						'Opening the list moves focus to the first available action.',
						'Escape closes the list and returns focus to the trigger.',
						'Button actions close the list after running.',
						'Link actions close the list and may carry portrait handoff state for supported home navigation.'
					]
				}
			]
		},
		{
			title: 'Publication boundary',
			blocks: [
				{
					type: 'paragraph',
					text: 'This website publishes reviewed public material. It does not expose private development state, old project routes, or runtime resume generation.'
				},
				{
					type: 'list',
					items: [
						'The public model is bounded to selected professional profile, evidence, projection metadata, and artifact data.',
						'Runtime job-description ingestion and bespoke resume generation are not supported by this site.',
						'Only reviewed committed PDF artifacts are published from this repository.',
						'Retired or unknown public links fall back to the current not-found page and active entry points.',
						'Future generation systems, if used, are separate from this static publication surface.'
					]
				}
			]
		}
	]
};
