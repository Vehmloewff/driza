import nodePath from 'path';
import write from 'write';
import pupa from 'pupa';
import { BuildOptions } from '../interfaces';
import debug from '../../debug';

// @ts-ignore
import template from '../defaults/template.html';
// @ts-ignore
import runtimeFramework from '../../dist/runtime.jstxt';
import { getPlatformResult } from './platform-keeper';

const log = debug('actions');

type AnyObject = { [key: string]: string };

export async function writeTemplate(dir: string, options: AnyObject) {
	await write(nodePath.join(dir, 'index.html'), pupa(template, options));
	log.info(`Migrated template to index.html`);
}

export async function writeJSONBuildOptions(dir: string, options: BuildOptions) {
	await write(nodePath.join(dir, 'build-options.json'), JSON.stringify(options));
	log.info(`Migrated options to build-options.json`);
}

export async function writeSveltronovaRuntime(dir: string, options: BuildOptions) {
	let code = runtimeFramework;

	if (getPlatformResult().data === `electron`) {
		const browserWindow = `const win = new BrowserWindow({ icon: buildOptions.icon.path, ...options });
	win.loadURL(\`file://\${__dirname}/index.html\`);
	win.webContents.on('did-finish-load', () => {
		win.webContents.send('window-id', win.id);
	});
	return win;`;

		const importStatement = `import { BrowserWindow } from 'electron';\n`;

		code = importStatement + code.replace(`/*BROWSER_WINDOW*/`, browserWindow);
	}

	code = code.replace(`%PLATFORM%`, getPlatformResult().tag).replace(`%BUILD_OPTIONS%`, JSON.stringify(options));

	await write(dir, code);
	log.info(`Migrated runtime to ${nodePath.basename(dir)}`);
}
