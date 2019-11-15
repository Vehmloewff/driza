import { Plugin, Preprocessor } from './interfaces';
import { Plugin as RollupPlugin } from 'rollup';

export interface BuildOptions {
	name?: string;
	machineName?: string;
	description?: string;
	isExport?: boolean;
	client?: string;
	plugins?: Plugin[];
	rollupPlugins?: RollupPlugin[];
	preprocess?: Preprocessor[];
	exclude?: RegExp[];
}

const defaultBuildOptions: BuildOptions = {
	name: `Versatile App`,
	machineName: `versatile-app`,
	description: `TODO: add a description`,
	isExport: false,
	client: `./src`,
	plugins: [],
	rollupPlugins: [],
	preprocess: [],
	exclude: [/^(.+\/|)_.+$/],
};

export async function buildApp(dir: string, options: BuildOptions) {
	options = Object.assign(options, defaultBuildOptions);
}
