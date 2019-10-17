#!/usr/bin/env node

const Command = require('commander').Command;
const program = new Command();
const chalk = require('chalk');

const compile = require('./commands/compile');

const version = `0.1.0`;
const name = `versatile`;
const cwd = process.cwd();

program.version(version, '-v, --version', 'output the current version').arguments(`<cmd>`);

program
	.command(`compile`)
	.description(`Compile your code`)
	.option(`-b, --browser`, `For the browser`)
	.option(`-d, --desktop`, `For desktop`)
	.option(`-a, --all`, `For all supported platforms`)
	.action((cmdObj) => {
		tryWrapper(() =>
			compile({
				cwd,
				desktop: cmdObj.desktop || cmdObj.all,
				browser: cmdObj.browser || cmdObj.all,
			})
		);
	});

program.on('--help', () => {
	console.log('');
	console.log('For more usage information, type the following:');
	console.log(`  $ ${name} [command] --help`);
});

program.parse(process.argv);

function tryWrapper(fn) {
	try {
		fn();
	} catch (ex) {
		console.error(ex);
		console.error(chalk(`Failed due to an error.  There is likely additional logging output above.`));
	}
}
