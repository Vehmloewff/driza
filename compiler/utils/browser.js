const { rollup } = require('rollup');
const configureServer = require('../plugins/configure-server');
const nodePath = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const read = require('../services/read');
const write = require('write');
const { format } = require('prettier');
const prettierOptions = require('../plugins/lib/prettier-options');

module.exports = async ({ serverRoutes: routes, dir, config, options, outputPath }) => {
	let serve = [];
	serve.push(
		{ name: `app.js`, location: nodePath.join(outputPath, `browser/serve/app.js`) },
		{ name: `app.css`, location: nodePath.join(outputPath, `browser/serve/app.css`) },
		{ name: `app.css.map`, location: nodePath.join(outputPath, `browser/serve/app.css.map`) },
		{ name: `index.html`, location: nodePath.join(outputPath, `browser/serve/index.html`) }
	);

	const bundle = await rollup({
		input: nodePath.join(dir, config.serverEntry),
		plugins: [configureServer({ routes, config, serve }), nodeResolve(), commonjs()],
		external: ['express'],
	});
	await bundle.write({
		format: `commonjs`,
		name: `Server`,
		file: nodePath.join(dir, options.path, `browser`, `index.js`),
	});

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

	await write(nodePath.join(outputPath, `browser/serve/index.html`), format(template, prettierOptions('html')));

	return {
		cssPath: `serve/app.css`,
		jsPath: `serve/app.js`,
	};
};
