import { BrowserWindowConstructorOptions } from 'electron';
import { readFileSync } from 'fs';
import { BuildOptions } from '../compiler/interfaces';

export const platform: string = `%PLATFORM%`;

export const buildOptions: BuildOptions = JSON.parse('%BUILD_OPTIONS%');

export function createBrowserWindow(options: BrowserWindowConstructorOptions = {}) {
	/*BROWSER_WINDOW*/
}
