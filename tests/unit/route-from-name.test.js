const routeFromName = require('../../compiler/services/route-from-name');

describe(`routeFromName`, () => {
	it(`should generate a basic route`, () => {
		expect(routeFromName(`contact`)).toBe(`/contact`);
	});
	it(`should generate a complex route`, () => {
		expect(routeFromName(`contact.me.you`)).toBe(`/contact/me/you`);
	});
	it(`generate a route with index`, () => {
		expect(routeFromName(`index`)).toBe(`/`);
	});
});
