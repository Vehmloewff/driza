import { BuildOptions, ElectronOptions } from '../../interfaces';
import { Plugin } from 'rollup';
import nodePath from 'path';
import { writeTemplate, writeJSONBuildOptions } from '../../utils/plugin-common';
import write from 'write';

export default (buildOptions: BuildOptions, options: ElectronOptions): Plugin => {
	const dir = nodePath.join(buildOptions.outDir, options.tag);

	return {
		name: 'electron',
		buildStart: async () => {
			const pkg = {
				name: buildOptions.id,
				main: options.mainBundlePath,
			};

			const writePkg = write(nodePath.join(dir, 'package.json'), JSON.stringify(pkg));

			const actions: Promise<any>[] = [
				writeTemplate(dir, { name: buildOptions.name, appEntry: options.bundlePath }),
				writeJSONBuildOptions(dir, buildOptions),
				writePkg,
			];

			await Promise.all(actions);
		},
	};
};
