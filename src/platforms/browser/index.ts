import { Platform, BrowserOptions, PlatformResult } from '../../compiler/interfaces';

const browserPlatform = (options: BrowserOptions): Platform => () => {
	options = {
		bundlePath: options.bundlePath || `bundle.js`,
		tag: options.tag || `browser`,
	};

	const toReturn: PlatformResult = {
		tag: options.tag,
		data: `browser`,
		isSandboxed: () => true,
		bundlePath: () => options.bundlePath,
		runtimePath: () => `.runtime.js`,
		plugin: () => ({ name: `nothing` }),
		run: () => ({ name: `nothing` }),
		assetsPath: () => `/`,
	};

	return toReturn;
};

export default browserPlatform;
