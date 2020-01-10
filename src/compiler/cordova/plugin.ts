import { BuildOptions } from '../interfaces';
import { Plugin } from 'rollup';
import { join } from 'path';
import makeDir from 'make-dir';
import { writeTemplate, writeJSONBuildOptions } from '../utils/plugin-common';
import { readJSON } from '../utils/read';
import spawn from 'cross-spawn';
import write from 'write';
import { logChild } from '../utils/log-child';
import debug from '../../../debug';
import pupa from 'pupa';

// @ts-ignore
import { bugs } from '../../../package.json';
// @ts-ignore
import configXml from '../defaults/cordova-config.xml';

const log = debug('prepare:cordova');

export default (options: BuildOptions, runnable: string, platform: string, appEntry: string, dir: string): Plugin => {
	let didChangeThings = false;

	function addCordovaPlatform() {
		didChangeThings = true;
		return new Promise(resolve => {
			log.notice(`Adding cordova-${platform}...`);

			const child = spawn(runnable, [`platform`, `add`, platform], {
				cwd: dir,
			});

			logChild(log.error, log.info, child);

			child.on('close', async code => {
				if (code) log.fatal(`Failed to add cordova-${platform}.`);

				log.notice(`Done!`);

				await install();

				resolve();
			});

			async function install() {
				log.info(`Installing dependencies via npm...`);

				const child = spawn(`npm`, [`install`], {
					cwd: dir,
				});

				const errors: string[] = [];

				logChild(
					(error: string) => errors.push(error),
					() => {},
					child
				);

				child.on('close', code => {
					if (code) {
						log.error(`We are having trouble installing the dependencies.`);
						log.error(errors.join('\n'));
						log.fatal(`Failed install cordova-${platform} from npm.`);
					}

					log.info(`Installed dependencies.`);
					resolve();
				});
			}
		});
	}

	function cordovaPrepare() {
		return new Promise(resolve => {
			const child = spawn(runnable, [`prepare`], {
				cwd: dir,
			});

			logChild(log.error, log.notice, child);

			child.on('close', code => {
				if (code)
					log.fatal(`Cordova is having problems with what we are doing.  Would you consider opening an issue?  ${bugs.url}`);

				resolve();
			});
		});
	}

	return {
		name: 'cordova',
		buildStart: async () => {
			let pkg = await readJSON(dir, 'package.json');

			const actions: Promise<any>[] = [
				writeTemplate(join(dir, 'www'), { appEntry }),
				writeJSONBuildOptions(dir, options),
				makeDir(join(dir, 'platforms')),
				write(join(dir, `config.xml`), pupa(configXml, options)),
			];

			if (!Object.keys(pkg).length) {
				didChangeThings = true;

				pkg = {
					name: options.id,
				};
				await write(join(dir, 'package.json'), JSON.stringify(pkg));
			}

			const platformIsInstalled = pkg.cordova && pkg.cordova.platforms && pkg.cordova.platforms.find((p: string) => p === platform);

			if (!platformIsInstalled) await addCordovaPlatform();

			if (didChangeThings) await cordovaPrepare();

			await Promise.all(actions);
		},
	};
};
