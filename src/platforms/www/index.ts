import { Platform, PlatformResult, StaticOptions } from 'compiler/interfaces';
import { Plugin } from 'rollup';
import command from 'rollup-plugin-command';
import nodePath from 'path';
import { writeTemplate } from '../../compiler/utils/plugin-common';

const www = (options: StaticOptions = {}): Platform => buildOptions => {
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
		writeIndexHtml: options.writeIndexHtml === undefined ? true : options.writeIndexHtml,
	};

	const dummyPlugin: Plugin = {
		name: `www-platform`,
	};

	const plugin: Plugin = {
		name: `www-platform`,
		buildStart: async () => {
			await writeTemplate(nodePath.join(buildOptions.outDir, options.tag), { appEntry: options.bundlePath });
		},
	};

	const platform: PlatformResult = {
		tag: options.tag,
		isSandboxed: () => options.isSandboxed,
		bundlePath: () => options.bundlePath,
		runtimePath: () => `.runtime.js`,
		plugin: () => (options.writeIndexHtml ? plugin : dummyPlugin),
		assetsPath: () => ``,
		run: () => (options.run.action ? command(options.run.action, options.run.options) : dummyPlugin),
	};

	return platform;
};

export default www;
