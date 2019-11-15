import { describe } from 'zip-tap';

describe(`sayHello`, it => {
	it(`sayHello should return a gretting`, expect => {
		expect(`hello Elijah`).toMatch(/hello.*Elijah/i);
	});
});
