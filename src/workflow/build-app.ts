import { BuildOptions, GoEmitter } from './interfaces';
import { defaultBuildOptions } from './defaults/default-build-options';
import { rollup, watch } from 'rollup';

export const buildApp = (dir?: string, options?: BuildOptions): GoEmitter => {
	// Get the correct arguments
	if (!dir) dir = process.cwd();
	options = Object.assign(options || {}, defaultBuildOptions);

	//
	const emitter = new GoEmitter();

	return emitter;
};
