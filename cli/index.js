#!/usr/bin/env node

const Command = require('commander').Command;
const program = new Command();

// const preview = require('./commands/preview');
const compile = require('./commands/compile');

const version = `0.1.0`;
const name = `versatile`;
const cwd = process.cwd();

program.version(version, '-v, --version', 'output the current version').arguments(`<cmd>`);

// program
// 	.command('dev')
// 	.description('Run application with hot reloading')
// 	.option('-d, --desktop', 'Run the desktop code')
// 	.option('-b, --browser', 'Run the browser code')
// 	.option('-a, --all', 'Run code for all platforms')
// 	.action(() => {

// 	})

// program
// 	.command('preview')
// 	.description('Preview application')
// 	.option('-d, --desktop', 'Run the desktop code')
// 	.option('-b, --browser', 'Run the browser code')
// 	.option('-a, --all', 'Run code for all platforms')
// 	.action(() => {
// 		tryWrapper(() => preview({
// 			cwd,
// 			desktop: program.desktop || program.all,
// 			browser: program.browser || program.all,
// 		}))
// 	})

// program
// 	.command('package-desktop')
// 	.description('Package the application for desktop')
// 	.option('-l, --linux', 'Package for Linux')
// 	.option('-m, --macos', 'Pakcage for MacOS')
// 	.option('-w, -windows', 'Package for Windows')
// 	.action(() => {

// 	})

// program
// 	.command('build-browser')
// 	.description('Bundle the application for the web')
// 	.action(() => {

// 	})

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
	}
}
