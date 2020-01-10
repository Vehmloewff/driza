import { PlatformResult } from '../interfaces';
import debug from '../../../debug';

// @ts-ignore
import { bugs } from '../../../package.json';

const log = debug('platform-keeper');

let currentPlatform: PlatformResult;

export const setPlatformResult = (platform: PlatformResult) => (currentPlatform = platform);
export const getPlatformResult = () => {
	if (!currentPlatform)
		log.fatal(`[internal error] the platform was requested before it was set.  Please consider opening an issue: ${bugs.url}`);

	return currentPlatform;
};
