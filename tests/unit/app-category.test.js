const appCategory = require('../../compiler/services/app-category');

describe(`appCategory`, () => {
	
	it(`should return a value for linux and mac`, () => {
		expect(appCategory(`business`)).toMatchObject({
			linux: `Office`,
			mac: `public.app-category.business`,
		})
	})

	it(`should throw an error if category is invalid`, () => {
		expect(() => {
			appCategory(`businessthatisinvalid`);
		}).toThrow();
	})

})