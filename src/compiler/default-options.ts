import { readJSON } from './utils/read';
import debug from '../../debug';
import { BuildOptions } from './interfaces';
import write from 'write';
import nodePath from 'path';
import { access, constants } from 'fs';
import makeSlug from './utils/make-slug';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nativeNodeModules from './utils/native-node-modules';
import json from '@rollup/plugin-json';

// @ts-ignore
import defaultIcon from './defaults/default-icon.png';
import { setPlatformResult } from './utils/platform-keeper';

const log = debug('default-options');

export const defaultBuildOptions = async (options: BuildOptions): Promise<BuildOptions> => {
	// Set the children
	if (!options.author) options.author = {};
	if (!options.watch) options.watch = {};

	// Some values for easy reference
	const isBuild = options.object === 'build';
	const isCompile = options.object === 'compile';
	const isRun = !isBuild && !isCompile;

	// Get the project dir
	const dir = options.dir || process.cwd();

	// Get the package.json
	const pkg = await readJSON(dir, 'package.json');
	if (typeof pkg.author === 'string') {
		const name = pkg.author;
		delete pkg.author;
		pkg.author.name = name;
	} else if (!pkg.author) pkg.author = {};

	// Get the outDir
	const outDir = nodePath.join(dir, options.outDir || `dist`);

	// Set the defaults
	const toReturn: BuildOptions = {
		platform: options.platform,
		sourceMap: options.sourceMap || true,
		object: options.object || 'run',
		dir,
		name: options.name || pkg.displayName || `Driza App`,
		description: options.description || pkg.description || ``,
		version: options.version || pkg.version || `1.0.0-beta.3`,
		// id will be set later
		// bundleId will be set later
		author: {
			name: options.author.name || pkg.author.name || `Mr. Awesome`,
			// devId will be set later
			email: options.author.email || pkg.author.email || `mr.awesome@example.com`,
			url: options.author.url || pkg.author.url || `https://example.com/mrawesome`,
		},
		icon: options.icon || {
			width: 512,
			height: 512,
			// This path will be made absolute later.
			// It is not made absolute now because options.icon.path is expected to be relative
			path: `img/icon.png`,
		},
		appEntry: nodePath.join(dir, options.appEntry || pkg.main || 'src/index.js'),
		outDir,
		// rollupOptions will be set later
		additionalPlugins: options.additionalPlugins || [],
		// electronRollupOptions will be set later
		// cordova will be set later
		watch: {
			enable: options.watch.enable || false,
			include: options.watch.include || [],
			exclude: options.watch.exclude || [],
		},
		driza: options.driza || `driza`,
	};

	// Make sure that the version is a positive semver string
	const test = /^([1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
	if (!test.test(toReturn.version)) {
		log.error(
			`The version must be a semver (https://semver.org) string that starts with a nubmber greater than or equal to '1'.  Recieved '${toReturn.version}'.`
		);
		log.error(`Sorry, that's a requirement by android.`);
		log.fatal(`Invalid version!`);
	}

	// Set the id
	toReturn.id = options.id || pkg.name || makeSlug(toReturn.name);

	// Make the icon path relative if it is absolute
	if (nodePath.isAbsolute(toReturn.icon.path)) toReturn.icon.path = nodePath.relative(toReturn.icon.path, dir);

	// Set the devId
	toReturn.author.devId = options.author.devId || makeSlug(toReturn.author.name).replace(/-/g, ``);

	// Set the bundleId
	toReturn.bundleId = `com.` + toReturn.author.devId + `.` + toReturn.id.replace(/-/g, ``);

	// Create an appicon if it does not exist
	await new Promise(resolve => {
		access(toReturn.icon.path, constants.W_OK, err => {
			if (err) {
				// @ts-ignore
				write(toReturn.icon.path, defaultIcon.replace(/^data:image\/png;base64,/, ``), { encoding: 'base64' })
					.then(resolve)
					.catch((err: any) => {
						log.error(`We encountered an error writing the default app icon.`, err);
						resolve();
					});
			} else resolve();
		});
	});

	// Configure the platform
	const invalidTypeMessage = `options.platform is not of the right type.`;

	if (!options.platform) log.fatal(`options.platform is required`);
	if (typeof options.platform !== 'function') log.fatal(invalidTypeMessage, `Expected a function, but got ${typeof options.platform}`);

	const platform = await options.platform(toReturn, debug);

	if (!platform) log.fatal(invalidTypeMessage, `Function did not return a defined value.`);

	const platformIsRightType =
		// buildOptions is optional
		platform.plugin &&
		// platform.extraBuilds is optional
		// platform.external is optional
		platform.isSandboxed &&
		platform.tag &&
		platform.bundlePath &&
		platform.runtimePath &&
		platform.run &&
		// It is required that platform.run be a rollup plugin
		platform.run().name;
	if (!platformIsRightType) log.fatal(invalidTypeMessage, `Not all of the required hooks were provided.`);

	setPlatformResult(platform);

	// Define the external modules
	const external = [...nativeNodeModules, ...(typeof platform.external === 'function' && platform.external() ? platform.external() : [])];

	// Define the global modules
	const globals: { [key: string]: string } = {};
	external.forEach(str => {
		globals[str] = `{}`;
	});

	// Set the rollupOptionsClient
	toReturn.rollupOptions = options.rollupOptions || {
		input: toReturn.appEntry,
		output: {
			file: nodePath.join(outDir, platform.tag, platform.bundlePath()),
			format: platform.isSandboxed() ? 'iife' : 'commonjs',
			globals: platform.isSandboxed() ? globals : {},
		},
		plugins: [
			resolve({
				browser: platform.isSandboxed(),
				preferBuiltins: true,
			}),
			commonjs(),
			json(),
			isRun && platform.run(),
			...toReturn.additionalPlugins,
		],
		external,
		onwarn: warning => {
			let containsKnown = false;

			if (/level\-blobs/.test(warning.message)) containsKnown = true;
			if (/fwd\-stream/.test(warning.message)) containsKnown = true;
			if (/concat\-stream/.test(warning.message)) containsKnown = true;
			if (/rollup\-plugin\-node\-builtins/.test(warning.message)) containsKnown = true;
			if (/levelup/.test(warning.message)) containsKnown = true;
			if (/bl/.test(warning.message)) containsKnown = true;

			if (/Circular dependency:/.test(warning.message) && containsKnown) return;

			debug('bundle').warn(`[Rollup bundle client]`, warning.message);
		},
	};

	return toReturn;
};
