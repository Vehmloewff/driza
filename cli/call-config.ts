import debug from '../debug';
import { rollup, Plugin } from 'rollup';
import nodePath from 'path';
import makeModule from 'make-module';

const log = debug('config-caller');

export default async (filePath: string, rawCode?: string) => {
	log.info(`Bundling config...`);

	const plugins: Plugin[] = [];

	if (rawCode) {
		plugins.push({
			name: `tricker`,
			load: id => {
				if (id === filePath) return rawCode;
			},
		});
	}

	const bundle = await rollup({
		input: filePath,
		external: (id: string) => id[0] !== '.' && !nodePath.isAbsolute(id),
		plugins,
	});

	const { output } = await bundle.generate({
		format: 'commonjs',
	});

	const { code } = output[0];

	log.info(`Requiring config...`);
	const res = makeModule(code, filePath);

	return res.exports;
};
