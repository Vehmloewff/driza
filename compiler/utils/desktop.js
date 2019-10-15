const write = require('write');
const nodePath = require('path');
const { format } = require('prettier');
const prettierOptions = require('../plugins/lib/prettier-options');
const read = require('../services/read');
const { rollup } = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const configureDesktop = require('../plugins/configure-desktop');
const copy = require('recursive-copy');

module.exports = async ({ dir, config, outputPath }) => {
	// Copy assets.  It must be done first, so that any conflicts
	// will be overwritten by the more important files to be generated next.
	await copyAssets({ dir, config, outputPath });

	// Run rollup
	await runRollup({ config, dir, outputPath });

	// Template
	await writeTemplate({ dir, config, outputPath });

	// Wtite a config file
	await writeBuildConfig({ config, outputPath });

	// Create the shell scripts
	await writeShellScripts({ outputPath });

	return {
		cssPath: `app.css`,
		jsPath: `app.js`,
	};
};

async function runRollup({ config, dir, outputPath }) {
	const bundle = await rollup({
		input: nodePath.join(dir, config.desktopEntry),
		plugins: [configureDesktop({ config }), nodeResolve(), commonjs()],
		external: ['electron', 'path'],
	});
	await bundle.write({
		format: `commonjs`,
		name: `Server`,
		file: nodePath.join(outputPath, `desktop/index.js`),
	});
}

async function writeTemplate({ config, outputPath, dir }) {
	let template;
	if (config.template === 'default') template = require('../templates/template.html');
	else template = await read(nodePath.join(dir, config.template));

	const styles = `<link rel="stylesheet" href="app.css">`;
	const appElement = `<div id="app-root"></div>`;
	const script = `<script src="app.js"></script>`;
	template = template
		.replace(`%versatile_styles%`, `${styles}`)
		.replace(`%versatile_app%`, `${appElement}`)
		.replace(`%versatile_scripts%`, `${script}`);

	await write(nodePath.join(outputPath, `desktop/app.html`), format(template, prettierOptions('html')));
}

async function writeBuildConfig({ config, outputPath }) {
	const packageJSON = require('../templates/build-config.json.js')({ outputPath, config });
	await write(nodePath.join(outputPath, `desktop/electron-builder.json`), packageJSON);
}

async function writeShellScripts({ outputPath }) {
	await write(
		nodePath.join(outputPath, `desktop/run.sh`),
		`./node_modules/.bin/electron ${nodePath.join(outputPath, `desktop/index.js`)}`
	);
	await write(
		nodePath.join(outputPath, 'desktop/build.sh'),
		`./node_modules/.bin/electron-builder \
		-c="${nodePath.join(outputPath, `desktop/electron-builder.json`)}" \
		$1`
	);
}

async function copyAssets({ dir, config, outputPath }) {
	await copy(
		nodePath.join(dir, config.assetsDir),
		nodePath.join(outputPath, `desktop/${config.assetsBasePath}`),
		{ overwrite: true }
	);
}
