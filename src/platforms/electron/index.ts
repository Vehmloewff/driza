import { Platform, ElectronOptions } from '../../interfaces';
import plugin from './plugin';
import runElectron from './run-electron';
import fileExists from '../../utils/file-exists';
import findUp from 'find-up';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePath from 'path';
import nativeNodeModules from '../../utils/native-node-modules';
import write from 'write';

// @ts-ignore
import defaultElectronMain from '../../defaults/electron-main.jstxt';

const platform = (options: ElectronOptions = {}): Platform => async (buildOptions, debug) => {
	const log = debug('electron');

	// Set the default options
	options = {
		pathToElectron: options.pathToElectron, // The default will be set later
		bundlePath: options.bundlePath || `app.js`,
		mainBundlePath: options.mainBundlePath || `index.js`,
		rollupConfig: options.rollupConfig, // The default will be set later
		// entryFile will be set later
		tag: options.tag || `electron`,
	};

	// Write a default electron main process file if the user did not specify one
	if (!options.entryFile) {
		const defaultMainPath = nodePath.join(buildOptions.outDir, options.tag, `__pre-index.js`);
		await write(defaultMainPath, defaultElectronMain);
		log.info(`options.entryFile not specified, writing a default '__pre-main.js' file instead.`);
		options.entryFile = defaultMainPath;
	}

	// Set the rollup configuration for bundling the electron main process
	options.rollupConfig = options.rollupConfig || {
		input: options.entryFile,
		output: {
			file: nodePath.join(buildOptions.outDir, options.tag, options.mainBundlePath),
			format: 'commonjs',
		},
		plugins: [resolve({ preferBuiltins: true }), commonjs()],
		external: nativeNodeModules.concat(['electron']),
		onwarn: warning => {
			debug('bundle').warn(`(Rollup bundle electron main process)`, warning.message);
		},
	};

	// Make sure that electron is installed
	const errorPrefix = `Electron could not be found.`;

	if (options.pathToElectron) {
		const electronDoesExist = await fileExists(options.pathToElectron);
		if (!electronDoesExist) log.fatal(errorPrefix, `"${options.pathToElectron}" doesn't exist.`);
	}

	const pathToElectron = await findUp(`node_modules/.bin/electron`);
	if (!pathToElectron) log.fatal(errorPrefix);

	options.pathToElectron = pathToElectron;

	// Return the hooks and values
	return {
		tag: options.tag,
		data: `electron`,
		plugin: () => plugin(buildOptions, options),
		external: () => ['electron'],
		extraBuilds: () => [options.rollupConfig],
		isSandboxed: () => false,
		bundlePath: () => options.bundlePath,
		runtimePath: () => `runtime.js`,
		run: runElectron(options, buildOptions, options.mainBundlePath),
	};
};

export default platform;
