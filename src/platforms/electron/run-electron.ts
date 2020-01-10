import spawn from 'cross-spawn';
import debug from '../../../debug';
import { logChild } from '../../utils/log-child';
import { ElectronOptions, BuildOptions } from 'src/interfaces';
import nodePath from 'path';
import { Plugin } from 'rollup';
import command from 'rollup-plugin-command';

const log = debug('run:electron');

export default (options: ElectronOptions, buildOptions: BuildOptions, mainBundlePath: string) => (): Plugin => {
	return command(
		() => {
			log.notice('Launching application...');
			const child = spawn(options.pathToElectron, [nodePath.join(buildOptions.outDir, options.tag, mainBundlePath)]);

			logChild(log.error, log.notice, child, log.fatal);
		},
		{ once: true }
	);
};
