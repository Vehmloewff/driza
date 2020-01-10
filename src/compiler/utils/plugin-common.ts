import nodePath from 'path';
import write from 'write';
import pupa from 'pupa';
import { BuildOptions } from '../interfaces';
import debug from '../../../debug';

// @ts-ignore
import template from '../defaults/template.html';

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
