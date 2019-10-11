#!/usr/bin/env node

const Command = require('commander').Command;
const program = new Command();
const compiler = require('../compiler');

(async function() {
	let version = `0.1.0`;
	let name = `versatile`;

	let file = null;
	program.arguments('<file>').action((val) => {
		file = val;
	});

	program.version(version, '-v, --version', 'output the current version');

	program
		.option(`-w, --watch`, "Watch file and it's dependencies for changes")
		.option(`-b, --browser`, 'Run the browser code')
		.option(`-d, --desktop`, 'Run the desktop application code')
		// .option(`-m, --mobile`, 'Run the mobile app code')
		.option(`-a, --all`, 'Run the code on all platforms')
		.option(`-O, --no-open`, "Only compiles the code.  Usally used with the `--path 'dist' option")
		.option(`-p, --path <path>`, 'The path to build the apps to - default: `node_modules/bounce/dist`');

	program.on('--help', () => {
		console.log('');
		console.log('Example:');
		console.log(`  $ ${name} main.js --browser --watch`);
	});

	program.parse(process.argv);

	if (!file) {
		console.log(`\nInvalid configuration.  See 'versatile --help' for usage information.\n`);
		process.exit(1);
	}

	if (program.watch) console.log(`Watching ${file} for changes...`);

	try {
		console.log(`Building your app...`);
		await compiler.buildApp(process.cwd(), file, { useConfig: true, platform: `browser` });
		await compiler.buildApp(process.cwd(), file, { useConfig: true, platform: `desktop` });
		console.log('Done!');
	} catch (ex) {
		console.error(ex);
		console.error(`Failed due to an error.  There is likely additional logging output above.`);
		if (program.watch) console.log(`Waiting for changes to restart...`);
	}
})();
