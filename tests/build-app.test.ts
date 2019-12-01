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

	await it(`should call the hooks`, async expect => {
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

		build.on(`status-changed`, () => {
			counter++;
		});

		await build.run();
	});

	await it(`should handle errors, warnings, and messages`, async expect => {
		let counter = 0;
		const build = buildApp(`invalid`, {
			plugins: [
				{
					name: `plugin`,
					run: ({ error, warn, notice }) => {
						notice(`some n`, `des`);
						warn(`some warn`);
						error(`some error`, `des`);
						expect(1).toBe(2);
					},
				},
			],
		}).emitter();

		build.on(`notice`, notice => {
			counter++;
			expect(notice).toMatchObject({ message: `plugin: some n`, description: `des` });
		});
		build.on(`warn`, warn => {
			counter++;
			expect(warn).toMatchObject({
				message: `plugin: some warn`,
				description: ``,
			});
		});
		build.on(`error`, err => {
			counter++;
			expect(err).toMatchObject({ message: `plugin: some error`, description: `des` });
		});

		await build.run();

		expect(counter).toBe(3);
	});
});
