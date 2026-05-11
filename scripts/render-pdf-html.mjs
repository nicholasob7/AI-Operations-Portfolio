const requestedTargets = process.argv.slice(2);
const targetSet = new Set(
	requestedTargets.length > 0 ? requestedTargets : ['remediation', 'migration']
);

if (targetSet.has('resume')) {
	throw new Error(
		'Legacy resume PDF rendering is retired. Active resume PDFs are reviewed static artifacts until the resume-documents.ts renderer is implemented.'
	);
}
throw new Error(
	'Project-detail PDF HTML generation is retired. This repository publishes only reviewed resume PDF artifacts.'
);
