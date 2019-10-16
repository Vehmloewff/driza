#!/usr/bin/env node

const Command = require('commander').Command;
const program = new Command();
const compiler = require('../compiler');
const { spawn } = require('child_process');
const watch = require('watch');
const nodePath = require('path');
const liveServer = require('./changes-server');

(async function() {
	let version = `0.1.0`;
	let name = `versatile`;

	let dev = false;
	let build = false;
	let preview = false;
	let browser = false;
	let desktop = false;
	let outputPath = `dist`;

	program.version(version, '-v, --version', 'output the current version');

	program
		.command('dev')
		.description('Run application with hot reloading')
		.action(() => {
			dev = true;
		});

	program
		.command('preview')
		.description('Start application')
		.action(() => {
			dev = true;
		});

	program
		.command('build')
		.description('Build and package application')
		.action(() => {
			build = true;
		});

	program
		.option(`-b, --browser`, 'Run the browser code')
		.option(`-d, --desktop`, 'Run the desktop application code')
		// .option(`-m, --mobile`, 'Run the mobile app code')
		.option(`-a, --all`, 'Run the code on all platforms');

	program.on('--help', () => {
		console.log('');
		console.log('Example:');
		console.log(`  $ ${name} dev --browser --watch`);
		console.log(`  $ ${name} build --all`);
	});

	program.parse(process.argv);

	browser = program.browser;
	desktop = program.desktop;
	if (program.all) {
		browser = true;
		desktop = true;
	}

	if (!dev && !build && !preview) stop(`A command must be specified.  See '${name} --help' for details.`);
	if (!desktop && !browser)
		stop(`We have to compile for at least one platform.  Did you forget to pass the browser flag ('--browser')?`);

	const cwd = process.cwd();
	let crashed = false;

	try {
		console.log('Compiling...');
		await compile({ cwd, dev, browser, desktop });
		console.log(build ? 'Building...' : 'Running...');

		const type = build ? 'build' : 'run';

		if (browser) await executeBash(cwd, outputPath, 'browser', type);
		if (desktop) await executeBash(cwd, outputPath, 'desktop', type);

		console.log('Done!');
	} catch (e) {
		console.log(e);
		console.error(`Failed due to an error.  There is likely additional logging output above.`);
		crashed = true;
	}

	if (dev) {
		const server = await liveServer();

		let timeSpent = false;
		setTimeout(() => {
			timeSpent = true;
		}, 2000);

		watch.watchTree(
			cwd,
			{
				ignoreDirectoryPattern: /(node_modules|dist)/,
				interval: 2,
			},
			async (file) => {
				if (!timeSpent) {
					if (crashed) console.log(`Waiting for changes to restart...`);
					else console.log(`Watching for file changes...`);
					return;
				}
				file = file.replace(cwd + '/', '');

				console.log(`\n\n${file} changed.  Recompiling...`);

				try {
					await compile({ cwd, dev, browser, desktop });
					console.log(`Waiting for client...`);

					await server.changeMade();

					console.log(`Done!`);
				} catch (e) {
					console.log(e);
					console.error(`Failed due to an error.  There is likely additional logging output above.`);
					console.log(`Waiting for changes to restart...`);
				}
			}
		);
	}
})();

async function compile({ cwd, dev, browser, desktop }) {
	if (browser) {
		await compiler.buildApp(cwd, { useConfig: true, platform: `browser`, hotReload: dev });
	}
	if (desktop) {
		await compiler.buildApp(cwd, { useConfig: true, platform: `desktop`, hotReload: dev });
	}
}

function executeBash(cwd, outputPath, platform, type) {
	return new Promise((resolve, reject) => {
		const bash = spawn('bash', [`${nodePath.join(cwd, outputPath, platform, type)}.sh`]);

		const quit = () => {
			bash.disconnect();
		};

		bash.stdout.on('data', (data) => {
			console.log(String(data).trim());
			resolve(quit);
		});

		bash.stderr.on('data', (data) => {
			console.log(String(data).trim());
			quit();
			reject();
		});
	});
}

function stop(err, num = 1) {
	console.error(err);
	process.exit(num);
}
