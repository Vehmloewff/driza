const { buildApp } = require('../../compiler');
const chalk = require('chalk');

module.exports = async ({ cwd, browser, desktop }) => {
	if (!browser && !desktop) return console.error(`You must specify a platform.`);

	if (browser) {
		console.log(chalk.green(`Compiling for the browser...`));
		await buildApp(cwd, { platform: `browser`, useConfig: true });
	}
	if (desktop) {
		console.log(chalk.green(`Compiling for desktop...`));
		await buildApp(cwd, { platform: `desktop`, useConfig: true });
	}

	console.log(chalk.green(`Done!`));
	console.log(`Type ${chalk.blue('bash <output-dir>/<platform>/run.sh')} to run the app,`);
	console.log(`or ${chalk.blue('bash <output-dir>/<platform>/build.sh')} to build it.`);
};
