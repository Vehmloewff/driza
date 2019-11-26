import { describe } from 'zip-tap';
import shouldBuild from './fixture/should-build';
import { cb2Asnyc } from '../src/lib/utils';
import { readFile } from 'fs';
import nodePath from 'path';

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
});
