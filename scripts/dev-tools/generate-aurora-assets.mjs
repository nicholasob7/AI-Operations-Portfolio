import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const repoRoot = process.cwd();
const outDir = resolve(repoRoot, 'static/aurora');
const chrome = process.env.CHROME_BIN || 'google-chrome';

const width = 1800;
const height = 800;

const frames = [
	{
		name: 'hero-aurora-01',
		transform: 'translateX(-2%) translateY(0%) scale(1)'
	},
	{
		name: 'hero-aurora-02',
		transform: 'translateX(0%) translateY(1.5%) scale(1.025)'
	},
	{
		name: 'hero-aurora-03',
		transform: 'translateX(2%) translateY(3%) scale(1.05)'
	},
	{
		name: 'hero-aurora-04',
		transform: 'translateX(-1%) translateY(-2%) scale(1.02)'
	}
];

const tempDir = mkdtempSync(join(tmpdir(), 'aurora-capture-'));

function renderHtml(transform) {
	return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
	html,
	body {
		margin: 0;
		width: ${width}px;
		height: ${height}px;
		overflow: hidden;
		background: transparent;
	}

	.capture {
		position: relative;
		width: ${width}px;
		height: ${height}px;
		overflow: hidden;
		background: transparent;
	}

	.hero-aurora {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(55% 60% at 20% 50%, rgba(111, 255, 214, 0.26) 0%, transparent 60%),
			radial-gradient(50% 60% at 45% 45%, rgba(154, 99, 232, 0.31) 0%, transparent 65%),
			radial-gradient(45% 55% at 75% 50%, rgba(47, 209, 255, 0.25) 0%, transparent 62%);
		filter: blur(18px) saturate(124%);
		transform: ${transform};
	}
</style>
</head>
<body>
	<div class="capture">
		<div class="hero-aurora"></div>
	</div>
</body>
</html>`;
}

try {
	for (const frame of frames) {
		const htmlPath = join(tempDir, `${frame.name}.html`);
		const pngPath = join(outDir, `${frame.name}.png`);
		const webpPath = join(outDir, `${frame.name}.webp`);

		writeFileSync(htmlPath, renderHtml(frame.transform), 'utf8');

		execFileSync(chrome, [
			'--headless=new',
			'--disable-gpu',
			'--hide-scrollbars',
			'--no-first-run',
			'--no-default-browser-check',
			'--disable-dev-shm-usage',
			'--default-background-color=00000000',
			`--window-size=${width},${height}`,
			`--screenshot=${pngPath}`,
			`file://${htmlPath}`
		], { stdio: 'inherit' });

		if (!existsSync(pngPath)) {
			throw new Error(`Chrome did not create ${pngPath}`);
		}

		execFileSync('cwebp', [
			'-q',
			'82',
			pngPath,
			'-o',
			webpPath
		], { stdio: 'inherit' });

		if (!existsSync(webpPath)) {
			throw new Error(`cwebp did not create ${webpPath}`);
		}

		console.log(`Generated ${pngPath}`);
		console.log(`Generated ${webpPath}`);
	}
} finally {
	rmSync(tempDir, { recursive: true, force: true });
}
