import { Plugin } from 'rollup';
import { BuildOptions } from '../interfaces';
import { getPlatformResult } from '../utils/platform-keeper';
import debug from '../../../debug';

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
		load: id => {
			if (id !== uniqueId) return;

			let code = runtime;
			if (getPlatformResult().data === `electron`) {
				const importStatement = `import { BrowserWindow } from 'electron';\n`;

				code = importStatement + code;
			}

			code = code.replace(`%PLATFORM%`, getPlatformResult().tag).replace(`%BUILD_OPTIONS%`, JSON.stringify(options));

			log.info(`Customized runtime.`);

			return {
				code,
			};
		},
	};
};
