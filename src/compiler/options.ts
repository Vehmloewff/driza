import { BuildOptions } from './interfaces';
import { RollupOptions, Plugin } from 'rollup';
import directRuntime from './direct-runtime';
import { getPlatformResult } from './utils/platform-keeper';
import debug from '../../debug';

const log = debug('prepare-rollup');

function addPlugins(rollupOptions: RollupOptions, ...plugins: Plugin[]) {
	rollupOptions.plugins.push(...plugins);

	return rollupOptions;
}

export const createOptions = async (options: BuildOptions): Promise<RollupOptions[]> => {
	const toReturn = [];

	const extraBuilds = getPlatformResult().extraBuilds;
	if (extraBuilds) {
		if (typeof extraBuilds === 'function') {
			const result = extraBuilds();
			result.forEach(build => {
				toReturn.push(addPlugins(build, directRuntime(options)));
			});
		} else log.error(`Expected platform.extraBuilds to be a function.  Recieved type ${typeof extraBuilds}`);
	}

	toReturn.push(addPlugins(options.rollupOptions, getPlatformResult().plugin(), directRuntime(options)));

	return toReturn;
};
