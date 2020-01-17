import { Plugin } from 'rollup';
import { BuildOptions } from '../interfaces';
import { getPlatformResult } from '../utils/platform-keeper';
import debug from '../../../debug';
import simplyGetFiles from 'simply-get-files';
import nodePath from 'path';

// @ts-ignore
import runtime from '../../../dist/index.js';

const log = debug(`direct-runtime`);

export default (options: BuildOptions): Plugin => {
	const uniqueId = `driza?runtime`;

	return {
		name: `direct-driza-runtime`,
		resolveId: source => {
			if (source !== options.driza) return null;

			return uniqueId;
		},
		load: async id => {
			if (id !== uniqueId) return null;

			let code = runtime;
			const platformData = getPlatformResult().data;

			if (platformData === `electron`) {
				const importStatement = `import { BrowserWindow } from 'electron';\n`;

				code = importStatement + code;
			}

			let assets: string[] = await simplyGetFiles(options.assetsDir);

			assets.push(getPlatformResult().bundlePath());

			if (platformData === `browser`) assets.push(`service-worker.js`);

			assets = assets.map(asset => `'${nodePath.join(getPlatformResult().assetsPath(), asset)}'`);

			code = code
				.replace(`%PLATFORM%`, getPlatformResult().tag)
				.replace(`%BUILD_OPTIONS%`, JSON.stringify(options))
				.replace(`/*ASSETS_HERE*/`, assets.join(', '));

			log.info(`Customized runtime.`);

			return {
				code,
			};
		},
	};
};
