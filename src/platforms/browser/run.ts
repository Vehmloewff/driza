import spawn from 'cross-spawn';
import debug from '../../../debug';
import { logChild } from '../../compiler/utils/log-child';
import { BuildOptions, BrowserOptions } from '../../compiler/interfaces';
import nodePath from 'path';
import { Plugin } from 'rollup';
import command from 'rollup-plugin-command';

const log = debug('run:browser');

export default (options: BrowserOptions, buildOptions: BuildOptions) => (): Plugin => {
	return command(
		() => {
			log.notice('Launching application...');
			const child = spawn(`node`, [`.server.js`], { cwd: nodePath.join(buildOptions.outDir, options.tag) });

			logChild(log.error, log.notice, child, log.fatal);
		},
		{ once: true }
	);
};
