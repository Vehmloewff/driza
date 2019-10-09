const { rollup } = require('rollup');
const configureServer = require('../plugins/configure-server');
const nodePath = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = async ({ serverRoutes: routes, dir, config, options }) => {
	const bundle = await rollup({
		input: nodePath.join(dir, config.serverEntry),
		plugins: [configureServer({ routes, config }), nodeResolve(), commonjs()],
		external: ['express'],
	});
	await bundle.write({
		format: `commonjs`,
		name: `App`,
		file: nodePath.join(dir, options.path, `browser`, `index.js`),
	});

	return {
		cssPath: `serve/app.css`,
		jsPath: `serve/app.js`,
	};
};
