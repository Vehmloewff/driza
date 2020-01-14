import { Platform, PlatformResult, StaticOptions } from 'compiler/interfaces';
import { Plugin } from 'rollup';
import command from 'rollup-plugin-command';

const www = (options: StaticOptions = {}): Platform => (buildOptions, logger) => {
	if (!options.run) options.run = {};

	options = {
		bundlePath: options.bundlePath || `bundle.js`,
		tag: options.tag || `www`,
		isSandboxed: options.isSandboxed,
		run: {
			action: options.run.action, // This can be undefined
			options: options.run.options || {
				exitOnFail: !buildOptions.watch.enable,
			},
		},
	};

	const dummyPlugin: Plugin = {
		name: `www-platform`,
	};

	const platform: PlatformResult = {
		tag: options.tag,
		isSandboxed: () => options.isSandboxed,
		bundlePath: () => options.bundlePath,
		runtimePath: () => `.runtime.js`,
		plugin: () => dummyPlugin,
		assetsDir: () => `/`,
		run: () => (options.run.action ? command(options.run.action, options.run.options) : dummyPlugin),
	};

	return platform;
};

export default www;
