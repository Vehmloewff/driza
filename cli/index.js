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
			preview = true;
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
		.option(
			`-dbp, --desktopBuildPlatforms <array>`,
			'The platforms to build the desktop code for',
			'["macos", "linux", "windows"]'
		)
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

	let desktopBuildPlatforms = [];
	try {
		desktopBuildPlatforms = JSON.parse(program.desktopBuildPlatforms);
	} catch (ex) {
		stop(`Error parsing the "desktopBuildPlatforms" option.`, ex);
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
		const options = [];

		if (build) options.push(platformsFromArr(desktopBuildPlatforms));

		if (browser) await executeBash(cwd, outputPath, 'browser', type, options);
		if (desktop) await executeBash(cwd, outputPath, 'desktop', type, options);

		console.log('Done!');
	} catch (e) {
		console.log(e);
		console.error(`Failed due to an error.  There is likely additional logging output above.`);
		crashed = true;
	}

	if (dev) {
		const server = liveServer();

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

function executeBash(cwd, outputPath, platform, type, ...options) {
	return new Promise((resolve) => {
		const bash = spawn('bash', [`${nodePath.join(cwd, outputPath, platform, type)}.sh`, ...options]);

		const log = data => {
			let str = String(data).trim();
			str = str
				.replace(/\n/g, '')
				.replace(/•/g, '');

			if (str === ``) return;
			if (str === `VERSATILE_JOB_DONE`) return resolve();

			console.log(str.trim());
		}

		bash.stdout.on('data', (data) => {
			log(data)
		});

		bash.stderr.on('data', (data) => {
			log(data)
		});

		bash.on(`close`, () => {
			resolve();
		})
	});
}

function stop(...err) {
	console.error(...err);
	process.exit(1);
}

function platformsFromArr(arr) {
	if (arr.length === 0)
		stop(`There must be at least one platform specified in the "desktopBuildPlatforms" option.`);
	
	const optionForPlatform = {
		linux: 'l',
		lin: 'lin',
		l: 'l',
		macos: 'm',
		mac: 'm',
		m: 'm',
		windows: 'w',
		win: 'w',
		w: 'w',
	}

	let flag = `-`;
	arr.forEach(p => {
		flag += optionForPlatform[p];
	});

	return flag;
}
