import { BrowserWindowConstructorOptions } from 'electron';
import { BuildOptions } from '../compiler/interfaces';

export const platform: string = `%PLATFORM%`;

export const buildOptions: BuildOptions = JSON.parse('%BUILD_OPTIONS%');

export function createBrowserWindow(options: BrowserWindowConstructorOptions = {}) {
	// @ts-ignore
	const win = new BrowserWindow({ icon: buildOptions.icon.path, ...options });

	win.loadURL(`file://${__dirname}/index.html`);

	win.webContents.on('did-finish-load', () => {
		win.webContents.send('window-id', win.id);
	});

	return win;
}
