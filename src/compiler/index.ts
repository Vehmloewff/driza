import debug from '../../debug';
import { PromiseEmitter } from './utils/promise-emitter';
import { BuildOptions } from './interfaces';
import { defaultBuildOptions } from './default-options';
import { createOptions } from './options';
import { build } from './build';

const log = debug('build');

type RunResult = void;

export function buildApp(options: BuildOptions): PromiseEmitter<RunResult> {
	const emitter = new PromiseEmitter<RunResult>();

	emitter.set(
		async (): Promise<RunResult> => {
			log.notice('Starting build...');

			options = await defaultBuildOptions(options);

			const rollupOptions = await createOptions(options);

			await build(options, rollupOptions);
		}
	);

	return emitter;
}

// Additional exports
import * as pluginHelpers from './utils/plugin-common';
export { pluginHelpers };

import * as cordovaHelpers from './cordova';
export { cordovaHelpers };

import { setLevel, setLogger } from '../../debug';
const logger = {
	setLevel,
	setLogger,
};
export { logger, debug };
export * from './interfaces';
