import chalk from 'chalk';
import { Logger } from 'src';
const appName = `sveltronova`;

const levels = [`info`, `notice`, `warn`, `error`, `fatal`];

const timestamp = Date.now();

let currentLogger = console.log;
let currentLevel = 1;

export const setLogger = (customLogger: (...messages: any[]) => void) => {
	currentLogger = customLogger;
};

export const setLevel = (customLevel: string) => {
	currentLevel = levels.findIndex(l => l === customLevel);
};

export default (job: string): Logger => {
	const log = (messageLevel: string, ...messages: string[]) => {
		const messageLevelIndex = levels.findIndex(l => l === messageLevel);

		if (messageLevelIndex >= currentLevel) {
			currentLogger(chalk.blue.bold(`${appName}:${job}`), ...messages, chalk.blue.bold(`+${Date.now() - timestamp}ms`));
		}
	};

	function fatal(...message: any[]) {
		log(`fatal`, chalk.black.bgRed(' FATAL ERROR '), ...message);
		notice('Fatal error.  Exiting with code 1.');
		process.exit(1);
	}

	function error(...message: any[]) {
		log(`error`, chalk.black.bgRed(' ERROR '), ...message);
	}

	function warn(...message: any[]) {
		log(`warn`, chalk.black.bgYellow(' WARN '), ...message);
	}

	function notice(...message: any[]) {
		log(`notice`, chalk.black.bgCyan(' NOTICE '), ...message);
	}

	function info(...message: any[]) {
		log(`info`, chalk.black.bgGreen(' INFO '), ...message);
	}

	return {
		fatal,
		error,
		warn,
		notice,
		info,
	};
};
