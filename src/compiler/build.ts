import { BuildOptions } from './interfaces';
import { watch, rollup, RollupOptions } from 'rollup';
import debug from '../../debug';

const log = debug('bundle');

export const build = async (options: BuildOptions, rollupOptions: RollupOptions[]) => {
	const params = rollupOptions.map(opt => ({
		...opt,
		watch: options.watch.enable ? opt.watch : {},
	}));

	if (options.watch.enable) {
		const watcher = watch(params);

		watcher.on('event', event => {
			if (event.code === 'START') log.notice('Starting bundle generation...');
			else if (event.code === 'BUNDLE_START') log.notice('Starting a new section in the bundle...');
			else if (event.code === 'BUNDLE_END') log.notice('Finished bundle section.');
			else if (event.code === 'END') log.notice('Finished generating the bundle.  Waiting for changes...');
			else if (event.code === 'ERROR') log.error('Recieved an error while bundling!', event.error.message);
		});
	} else {
		log.notice('Starting bundle generation...');

		try {
			for (let i in params) {
				log.notice('Starting a new section in the bundle...');

				const bundle = await rollup(params[i]);

				let output = params[i].output;
				if (!Array.isArray(output)) {
					output = [output];
				}

				for (let x in output) {
					await bundle.write(output[x]);
				}

				log.notice('Finished bundle section.');
			}
		} catch (err) {
			log.error('Recieved an error while bundling!', err.message, err);
		}

		log.notice('Finished generating the bundle.');
	}
};
