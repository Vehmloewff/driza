import { BuildOptions } from '../interfaces';

export const defaultBuildOptions: BuildOptions = {
	name: `Versatile App`,
	machineName: `versatile-app`,
	description: `TODO: add a description`,
	outputDir: `dist`,
	plugins: [],
	runtimeRenderer: `versatile-dom-renderer`,
	watch: {
		enable: false,
		clearScreen: true,
		displayMetadata: true,
	},
	dependencies: {
		nativeModules: [],
		sandboxedModules: [],
		dualModules: [],
	},
};
