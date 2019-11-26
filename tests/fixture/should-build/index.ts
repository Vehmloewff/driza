import { buildApp, Plugin } from '../../../src';
import nodePath from 'path';

const myPlugin: Plugin = {
	name: `my-plugin`,
	writingId: `test`,
	run: ({ writeFile }) => {
		writeFile(`bundle.js`, `success`);
	},
};

export default () =>
	buildApp(nodePath.resolve(`tests/fixture/should-build`), {
		outputDir: `out`,
		plugins: [myPlugin],
	});
