import { BuildOptions, Plugin, PluginParams } from './interfaces';

export { PluginParams, Plugin };

const defaultBuildOptions: BuildOptions = {
	name: `Versatile App`,
	machineName: `versatile-app`,
	description: `TODO: add a description`,
	plugins: [],
	watch: {
		enable: false,
		clearScreen: true,
	},
	dependencies: {
		nativeModules: [],
		sandboxedModules: [],
		dualModules: [],
	},
};

export async function buildApp(dir: string, options: BuildOptions) {
	options = Object.assign(options, defaultBuildOptions);
}
