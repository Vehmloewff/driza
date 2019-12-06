import { buildApp, Plugin } from '../../../src';
import nodePath from 'path';

const plugin: Plugin = {
	name: `plugin`,
	writingId: `some-id`,
	run: ({}) => {},
};

export default () =>
	buildApp(nodePath.resolve(`tests/fixture/test-platform`), {
		plugins: [plugin],
	}).promise();
