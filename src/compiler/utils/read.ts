import fs from 'fs';
import nodePath from 'path';
import debug from '../../../debug';

const log = debug('read-files');

export const read = (...paths: string[]) =>
	new Promise<string>(resolve => {
		const path = nodePath.join(...paths);

		fs.readFile(path, 'utf-8', (err, data) => {
			if (err) return resolve(``);

			return resolve(data);
		});
	});

export const readJSON = async (...paths: string[]): Promise<{ [key: string]: any }> => {
	const res = await read(...paths);

	try {
		return JSON.parse(res.length ? res : `{}`);
	} catch (e) {
		log.error('Failed to load JSON', e);
		return {};
	}
};
