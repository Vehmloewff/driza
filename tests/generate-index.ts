import { describe } from 'zip-tap';
import generateIndex from '../src/generate-index';
import delupe from '../src/lib/delupe';
import { readFile } from 'fs';
import nodePath from 'path';

const fromRoot = (loc: string) => nodePath.resolve(loc);

describe(`generateIndex`, async it => {
	const liveCode = <string>await delupe(readFile, ``, `utf-8`);
	const perTest = liveCode.split(/\/\/ #T\d\n/);

	it(`should generate the index file`, expect => {
		expect(
			generateIndex([
				{
					name: `app`,
					path: fromRoot(`src/app/index.svelte`),
					id: `state$app`,
					defaultRoute: `/`,
				},
				{
					name: `app.home`,
					path: fromRoot(`src/app/home.svelte`),
					id: `state$app$home`,
					defaultRoute: `home`,
				},
			])
		).toBe(perTest[0]);
	});
});
