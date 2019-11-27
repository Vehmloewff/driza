import { describe } from 'zip-tap';
import shouldBuild from './fixture/should-build';
import { cb2Asnyc } from '../src/lib/utils';
import { readFile } from 'fs';
import nodePath from 'path';
import { buildApp } from '../src';

describe(`buildApp`, async it => {
	await it(`should build`, async expect => {
		await shouldBuild();

		let file;

		file = await cb2Asnyc(
			readFile,
			nodePath.resolve(`tests/fixture/should-build/out/test/bundle.js`),
			'utf-8'
		);

		expect(file).toBe(`success`);
	});
	await it(`should call the hooks`, expect => {
		return new Promise(resolve => {
			let counter = 0;
			const build = buildApp(`invalid`, {
				plugins: [
					{
						name: `plugin`,
						run: ({ beforeBuild, build, afterBuild, afterWrite, onFinish }) => {
							beforeBuild(() => expect(counter).toBe(0));
							build(() => expect(counter).toBe(1));
							afterBuild(() => expect(counter).toBe(2));
							afterWrite(() => expect(counter).toBe(3));
							onFinish(() => expect(counter).toBe(4));
						},
					},
				],
			}).emitter();

			build.on(`status-changed`, (status: string) => {
				counter++;
				console.log(status);
			});
			build.on(`finish`, () => resolve());
		});
	});
});
