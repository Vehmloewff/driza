import { describe } from 'zip-tap';
import { Color } from './color';

describe(`Color`, it => {
	it(`should create a color`, expect => {
		const color = new Color([255, 0, 0]);

		expect(color.hex).toBe(`#ff0000`);
	});

	it(`should always return lowercase, six or eight hex`, expect => {
		expect(new Color({ hex: `F0a` }).hex).toBe(`#ff00aa`);
	});

	it(`should recreate itself when prompted to do so`, expect => {
		const color = new Color([45, 34, 67]);

		expect(color.hex).toBe(`#2d2243`);

		color.recreate([12, 89, 180]);

		expect(color.hex).toBe(`#0c59b4`);
	});

	it(`should handle transparency values`, expect => {
		expect(new Color({ hex: `14fDe32a` }).hex).toBe(`#14fde32a`);
		expect(new Color({ rgb: [45, 134, 181, 0.7] }).hex).toBe(`#2d86b5b3`);
	});

	it(`should give values for default colors`, expect => {
		expect(new Color('blue').hex).toBe(`#2196f3`);
		expect(new Color('grey').hex).toBe(`#f1f1f1`);
	});
});
