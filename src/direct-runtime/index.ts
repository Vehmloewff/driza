import { Plugin } from 'rollup';
import { BuildOptions } from '../interfaces';
import nodePath from 'path';
import { getPlatformResult } from '../utils/platform-keeper';

export default (options: BuildOptions): Plugin => ({
	name: `direct-sveltronova-runtime`,
	resolveId: source => {
		if (source !== `${options.sveltronova}/runtime`) return null;

		return nodePath.resolve(options.outDir, nodePath.join(getPlatformResult().tag, getPlatformResult().runtimePath()));
	},
});
