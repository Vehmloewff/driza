const { rollup } = require('rollup');
const configureServer = require('../plugins/configure-server');
const nodePath = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const read = require('../services/read');
const write = require('write');
const { format } = require('prettier');
const prettierOptions = require('../plugins/lib/prettier-options');
const getAssetsRoutes = require('../services/get-assets-routes');

module.exports = async ({ serverRoutes: routes, dir, config, options, outputPath }) => {
	const assetsRoutes = await getAssetsRoutes(nodePath.join(dir, config.assetsDir), config.assetsBasePath);

	let serve = assetsRoutes;

	const jsRoute = nodePath.join(config.clientBasePath, `app.js`);
	const cssRoute = nodePath.join(config.clientBasePath, `app.css`);
	const cssMapRoute = nodePath.join(config.clientBasePath, `app.css.map`);
	const htmlRoute = nodePath.join(config.clientBasePath, `index.html`);

	serve.push(
		{ name: jsRoute, location: nodePath.join(outputPath, `browser/serve/app.js`) },
		{ name: cssRoute, location: nodePath.join(outputPath, `browser/serve/app.css`) },
		{ name: cssMapRoute, location: nodePath.join(outputPath, `browser/serve/app.css.map`) },
		{ name: htmlRoute, location: nodePath.join(outputPath, `browser/serve/index.html`) }
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

	const requireSlash = (route) => {
		if (route.charAt(0) === '/') return route;
		else return '/' + route;
	};

	const styles = `<link rel="stylesheet" href="${requireSlash(cssRoute)}">`;
	const appElement = `<div id="app-root"></div>`;
	const script = `<script src="${requireSlash(jsRoute)}"></script>`;
	template = template
		.replace(`%versatile_styles%`, `${styles}`)
		.replace(`%versatile_app%`, `${appElement}`)
		.replace(`%versatile_scripts%`, `${script}`);

	await write(nodePath.join(outputPath, `browser/serve/index.html`), format(template, prettierOptions('html')));

	await writeShellScripts({ outputPath });

	return {
		cssPath: `serve/app.css`,
		jsPath: `serve/app.js`,
	};
};

async function writeShellScripts({ outputPath }) {
	await write(nodePath.join(outputPath, `browser/run.sh`), `node ${nodePath.join(outputPath, `browser/index.js`)}`);
	await write(nodePath.join(outputPath, `browser/build.sh`), `echo "Done building!"`);
}
