const write = require('write');
const nodePath = require('path');
const { format } = require('prettier');
const prettierOptions = require('../plugins/lib/prettier-options');
const read = require('../services/read');
const { rollup } = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const configureDesktop = require('../plugins/configure-desktop');

module.exports = async ({ dir, config, outputPath }) => {
	// Run rollup
	// const file = require('../templates/electron-main')({ config, dir });
	// await write(nodePath.join(outputPath, `desktop/index.js`), format(file, prettierOptions('babel')));
	await runRollup({ config, dir, outputPath });

	// Template
	await writeTemplate({ dir, config, outputPath });

	// Wtite a package.json
	await writePackage({ config, outputPath });

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

async function writePackage({ config, outputPath }) {
	const packageJSON = require('../templates/electron-package.json')({ config });
	await write(nodePath.join(outputPath, `desktop/package.json`), packageJSON);
}
