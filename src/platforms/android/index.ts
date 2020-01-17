import { Platform, CordovaOptions, PlatformResult } from '../../compiler/interfaces';
import { plugin } from '../../compiler/cordova';
import runAndroid from './run-android';
import fileExists from '../../compiler/utils/file-exists';
import findUp from 'find-up';
import nodePath from 'path';

const platform = (options: CordovaOptions = {}): Platform => async (buildOptions, debug) => {
	const log = debug(`android`);

	// Set the default options
	options = {
		pathToCordova: options.pathToCordova, // The default will be set later
		bundlePath: options.bundlePath || `app.js`,
		tag: options.tag || `android`,
	};

	// Make sure that cordova is installed
	const errorPrefix = `Cordova could not be found.`;

	if (options.pathToCordova) {
		const electronDoesExist = await fileExists(options.pathToCordova);
		if (!electronDoesExist) log.fatal(errorPrefix, `"${options.pathToCordova}" doesn't exist.`);
	}

	const pathToCordova = await findUp(`node_modules/.bin/cordova`);
	if (!pathToCordova) log.fatal(errorPrefix);

	options.pathToCordova = pathToCordova;

	// Create a result
	const result: PlatformResult = {
		tag: `android`,
		isSandboxed: () => true,
		bundlePath: () => nodePath.join(`www`, options.bundlePath),
		runtimePath: () => `www/runtime.js`,
		assetsPath: () => ``,
		plugin: () =>
			plugin(buildOptions, options.pathToCordova, `android`, options.bundlePath, nodePath.join(buildOptions.outDir, options.tag)),
		run: runAndroid(options, buildOptions, `android`),
	};

	return result;
};

export default platform;
