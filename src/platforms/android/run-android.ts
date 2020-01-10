import spawn from 'cross-spawn';
import debug from '../../../debug';
import { logChild } from '../../compiler/utils/log-child';
import { BuildOptions, CordovaOptions } from '../../compiler/interfaces';
import nodePath from 'path';
import { Plugin } from 'rollup';
import command from 'rollup-plugin-command';

const log = debug('run:android');

export default (options: CordovaOptions, buildOptions: BuildOptions, platform: string) => (): Plugin => {
	return command(() => {
		log.notice('Building binaries...');

		const child = spawn(options.pathToCordova, ['run', platform, `--debug`, `--stacktrace`], {
			cwd: nodePath.join(buildOptions.outDir, options.tag),
		});

		logChild(
			log.error,
			(message: string) => {
				if (/BUILD SUCCESSFUL/.test(message)) log.notice(`Launching app...`);
				if (/LAUNCH SUCCESS/.test(message)) log.notice(`App lanuched! 🚀 🚀 🚀 🚀 `);
				log.info(message);
			},
			child
		);
	});
};
