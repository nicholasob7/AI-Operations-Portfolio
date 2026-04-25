import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildPdfProjectionPilot } from '../src/lib/canonical/pdf-projection.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generatedDir = path.join(__dirname, 'generated');

const projection = buildPdfProjectionPilot();
const requestedTargets = process.argv.slice(2);
const targetSet = new Set(
	requestedTargets.length > 0 ? requestedTargets : ['resume', 'migration']
);

const escapeHtml = (value) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

const renderResumeTechnicalSkills = () => {
	const items = projection.resume.technicalSkills
		.map(
			(group) =>
				`<li><strong>${escapeHtml(group.title)}:</strong> ${group.items.map(escapeHtml).join(', ')}</li>`
		)
		.join('\n\t\t\t\t\t');

	return `<ul class="bullet-list skill-list">\n\t\t\t\t\t${items}\n\t\t\t\t</ul>`;
};

const replaceMarker = (template, marker, replacement) => {
	if (!template.includes(marker)) {
		throw new Error(`Template marker not found: ${marker}`);
	}

	return template.replace(marker, replacement);
};

const renderTemplate = async ({ source, destination, replacements }) => {
	let template = await readFile(source, 'utf8');

	for (const [marker, replacement] of replacements) {
		template = replaceMarker(template, marker, replacement);
	}

	await mkdir(path.dirname(destination), { recursive: true });
	await writeFile(destination, template, 'utf8');
};

if (targetSet.has('resume')) {
	const replacements = [
		['<!-- PDF_PILOT_RESUME_TECHNICAL_SKILLS -->', renderResumeTechnicalSkills()]
	];

	await renderTemplate({
		source: path.join(__dirname, 'resume-bw.html'),
		destination: path.join(generatedDir, 'resume-bw.html'),
		replacements
	});

	await renderTemplate({
		source: path.join(__dirname, 'resume-color.html'),
		destination: path.join(generatedDir, 'resume-color.html'),
		replacements
	});
}

if (targetSet.has('migration')) {
	await renderTemplate({
		source: path.join(__dirname, 'portfolio-description-bw.html'),
		destination: path.join(generatedDir, 'portfolio-description-bw.html'),
		replacements: [['<!-- PDF_PILOT_MIGRATION_SUMMARY -->', escapeHtml(projection.migration.summary)]]
	});
}
