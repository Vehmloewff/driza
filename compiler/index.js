const nodePath = require('path');
const defaultConfigOptions = require('./services/default-config-options');
const defaultCompilerOptions = require('./services/default-compiler-options');
const configureStartup = require('./plugins/configure-startup');
const getClientRoutes = require('./services/get-client-routes');
const getServerRoutes = require('./services/get-server-routes');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const svelte = require('rollup-plugin-svelte');
const { rollup } = require('rollup');
const transformSvelteScript = require('./services/transform-script');
const transformSvelteMarkup = require('./services/transform-markup');

const buildApp = async (dir, file, options) => {
	options = Object.assign(defaultCompilerOptions, options);
	const production = process.env.NODE_ENV === `production`;

	// Get the config
	let config = null;
	try {
		if (options.useConfig) {
			config = Object.assign(defaultConfigOptions, require(nodePath.join(dir, options.configPath)));
		} else {
			config = defaultConfigOptions;
		}
	} catch (ex) {
		console.error('Could not load config file!');
		throw ex;
	}

	// Get the routes
	const serverRoutes = await getServerRoutes(nodePath.join(dir, config.serverDir));
	const clientRoutes = await getClientRoutes(nodePath.join(dir, config.clientDir));

	const { cssPath, jsPath } = await require(`./utils/${options.platform}`)({
		serverRoutes: serverRoutes,
		clientRoutes: clientRoutes,
		config,
		dir,
		file,
		options,
		outputPath: nodePath.join(dir, options.path),
	});

	// Configure Rollup plugins
	let plugins = [
		configureStartup({ platform: options.platform, clientRoutes }),
		nodeResolve({ browser: true }),
		commonjs(),
		svelte({
			dev: !production,
			css: (css) => {
				css.write(nodePath.join(dir, options.path, options.platform, cssPath));
			},
			preprocess: {
				markup: (params) => {
					return transformSvelteMarkup(params);
				},
				script: (params) => {
					return transformSvelteScript(params);
				},
			},
		}),
	];

	// Run Rollup
	const bundle = await rollup({
		input: nodePath.join(dir, file),
		plugins,
	});
	await bundle.write({
		format: 'iife',
		name: `App`,
		file: nodePath.join(dir, options.path, options.platform, jsPath),
	});
};

module.exports = {
	buildApp,
};
