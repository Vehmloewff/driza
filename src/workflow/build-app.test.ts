import { describe } from 'zip-tap';
import { buildApp } from '.';

describe(`buildApp`, it => {
	it(`should run`, expect => {
		const acorn = buildApp();
	});
});
