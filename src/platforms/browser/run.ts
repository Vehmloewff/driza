import spawn from 'cross-spawn';
import debug from '../../../debug';
import { logChild } from '../../compiler/utils/log-child';
import { BuildOptions, BrowserOptions } from '../../compiler/interfaces';
import nodePath from 'path';
import { Plugin } from 'rollup';
import command from 'rollup-plugin-command';
import ws from 'ws';
import { ChildProcess } from 'child_process';

const log = debug('run:browser');

let hasBeenStarted = false;

const callOnStart: (() => void)[] = [];

const onStart = (fn: () => void) => {
	callOnStart.push(fn);
};

const relayStart = () => {
	callOnStart.forEach(fn => fn());
	hasBeenStarted = true;
};

let port: string;

export const runServer = (options: BrowserOptions, buildOptions: BuildOptions): Plugin => {
	let child: ChildProcess = null;

	return command(() => {
		if (child) child.kill('SIGINT');

		log.notice('Starting server...');
		child = spawn(`node`, [`.server.js`], {
			cwd: nodePath.join(buildOptions.outDir, options.tag),
		});

		logChild(
			log.error,
			(...messages: string[]) => {
				log.info(...messages);

				const regex = /^.*Listening on port (\d+)\.\.\..*$/;
				const testMessage = messages.join(' ');

				if (regex.test(testMessage)) {
					port = testMessage.replace(regex, `$1`);

					log.notice(`Server started!`);
					relayStart();
				}
			},
			child,
			log.fatal
		);
	});
};

export const runClient = (): Plugin => {
	const reloadClient = createServer();

	if (!hasBeenStarted) {
		onStart(() => {
			if (!hasBeenStarted) openPage();
		});
	} else {
		openPage();
	}

	function openPage() {
		log.notice(`App is ready!  http://localhost:${port}`);
	}

	return command(reloadClient);
};

function createServer() {
	const server = new ws.Server({ port: 3695 });

	const sendReloadMessage = () => {
		server.clients.forEach(socket => socket.send(`reload`));
	};

	onStart(() => {
		if (hasBeenStarted) sendReloadMessage();
	});

	process.on('SIGTERM', () => {
		server.close();
		process.exit(0);
	});
	process.on('SIGINT', () => {
		server.close();
		process.exit(0);
	});
	process.on('beforeExit', code => {
		server.close();
		process.exit(code);
	});

	return sendReloadMessage;
}
