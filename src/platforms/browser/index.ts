import { Platform, BrowserOptions, PlatformResult } from '../../compiler/interfaces';
import { RollupOptions } from 'rollup';
import nodePath from 'path';
import write from 'write';
import defaultServerCode from './server.jstxt';
import nativeNodeModules from '../../compiler/utils/native-node-modules';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const browserPlatform = (options: BrowserOptions = {}): Platform => async (buildOptions, logger) => {
	const log = logger('browser');

	// Set the default options
	options = {
		bundlePath: options.bundlePath || `bundle.js`,
		tag: options.tag || `browser`,
		// entryFile will be set later
	};

	// Set a default entry file
	if (!options.entryFile) {
		options.entryFile = nodePath.join(buildOptions.outDir, options.tag, `.pre-server.js`);
		await write(options.entryFile, defaultServerCode);
		log.notice(`options.entryFile not specified, wrote a default '.pre-server.js' file instead.`);
	}

	// Create a server build
	const serverBuild: RollupOptions = {
		input: options.entryFile,
		output: {
			file: nodePath.join(buildOptions.outDir, options.tag, `.server.js`),
			format: `cjs`,
		},
		external: nativeNodeModules,
		plugins: [
			nodeResolve({
				preferBuiltins: true,
				browser: false,
			}),
			commonjs(),
		],
	};

	// Assemble the platform
	const toReturn: PlatformResult = {
		tag: options.tag,
		data: `browser`,
		isSandboxed: () => true,
		bundlePath: () => options.bundlePath,
		runtimePath: () => `.runtime.js`,
		plugin: () => ({ name: `nothing` }),
		run: () => ({ name: `nothing` }),
		assetsPath: () => `/`,
		extraBuilds: () => [serverBuild],
	};

	// Return
	return toReturn;
};

export default browserPlatform;
