import program from 'commander';
import { access, constants } from 'fs';
import debug, { setLevel } from '../debug';
import runFile from './call-config';
import { BuildOptions } from '../src/compiler/interfaces';
import { buildApp } from '../src/compiler';
import nodePath from 'path';

// @ts-ignore
import defaultConfig from './default-config.jstxt';

const log = debug('cli');

// @ts-ignore
import { version } from '../package.json';

let args: string[] = [];

program
	.version(version, '-v, --version', `output the current version`)
	.arguments('[arguments...]')
	.action((cliArgs: string[]) => {
		if (cliArgs) args = cliArgs;
	})
	.option('--config', 'Path to the config file.  By default driza will look for a `driza.config.js` or `driza.config.ts`')
	.option('--verbose', 'display lots of logs (good for debugging)')
	.option('--silent', 'only errors will show');

program.parse(process.argv);

const jsTry = `driza.config.js`;
// const tsTry = `driza.config.ts`;

let configFile: string = program.config || jsTry;

let logLevel: string;

if (program.silent) logLevel = 'error';
else if (program.verbose) logLevel = 'info';
else logLevel = 'notice';

setLevel(logLevel);

(async function() {
	let didFindConfig = true;

	await new Promise(resolve => {
		access(configFile, constants.R_OK, err => {
			if (!err) return resolve();

			didFindConfig = false;
			// if (configFile !== jsTry) {
			if (configFile !== jsTry) log.fatal(`Could not find config "${configFile}".`);
			return resolve();
			// }

			// access(tsTry, constants.R_OK, err => {
			// 	if (!err) {
			// 		configFile = tsTry;
			// 		return resolve();
			// 	}

			// 	log.fatal(`Could not find a '${jsTry}' or '${tsTry}' in your project.`);
			// 	resolve();
			// });
		});
	});

	if (didFindConfig) log.info(`Found the config file (${configFile})`);
	else log.info(`Could not find config file (${configFile}).  Resorting to default.`);

	const result = await runFile(nodePath.resolve(configFile), didFindConfig ? null : defaultConfig);

	const invalidTypeMessage = `${configFile} must export at default either an object, or a function which returns an object.  Recieved type`;

	let options: BuildOptions;

	if (!result) return log.fatal(invalidTypeMessage, result);
	if (typeof result === 'object') options = result as BuildOptions;
	else if (typeof result === 'function') {
		const funcResult = result(...args);

		if (typeof funcResult === 'object') options = funcResult as BuildOptions;
		else return log.fatal(invalidTypeMessage, `() =>`, typeof funcResult);
	} else return log.fatal(invalidTypeMessage, typeof result);

	log.info(`Loaded the config file (${configFile})`);

	const build = buildApp(options);

	await build.run();
})();
