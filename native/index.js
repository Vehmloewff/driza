import { BrowserWindow } from 'electron';
import nodePath from 'path';

export class VersatileDesktopWindow extends BrowserWindow {
	constructor({
		file = `${nodePath.join(`/*{OUTPUT_PATH}*/`, `desktop/app.html`)}`,
		waitUntilReady = true,
		...windowSettings
	} = {}) {
		const defaults = {
			show: !waitUntilReady,
			webPreferences: {
				nodeIntegration: true,
			},
			icon: `${nodePath.join(`/*{OUTPUT_PATH}*/`, `desktop/favicon.ico`)}`,
		};
		super({ ...defaults, ...(windowSettings || {}) });

		this.loadURL(`file:///${nodePath.resolve(file)}`);
		this.once(`ready-to-show`, () => {
			this.show();
		});
	}
}
