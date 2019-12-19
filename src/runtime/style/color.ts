import { colorDefaults } from './color-defaults';

export type ColorOptions =
	| string
	| [number, number, number, number?]
	| {
			rgb?: [number, number, number, number?];
			hex?: string;
			alpha?: number;
	  };

export class Color {
	constructor(options: ColorOptions) {
		this.recreate(options);
	}

	public hex: string;

	public recreate(options: ColorOptions) {
		if (Array.isArray(options)) {
			this.hex = this.rgbToHex(...options);
		} else if (typeof options === 'string') {
			// @ts-ignore
			const hex = colorDefaults[options];
			if (!hex) throw new Error(`Expected a valid color, but got "${options}".`);
			this.hex = hex;
		} else if (options.rgb) {
			this.hex = this.rgbToHex(...options.rgb);
		} else if (options.hex) {
			this.hex = this.ensureAllLowercase(this.ensureSixOrEightHex(this.ensureHash(options.hex)));
		}

		if (!Array.isArray(options) && typeof options !== 'string' && options.alpha) {
			if (this.hex.length === 7) this.hex = this.hex + this.componentToHex(options.alpha * 225);
			else throw new Error(`The 'alpha' option is illegal when the alpha value is set with rgb or hex.`);
		}
	}

	private componentToHex(c: number): string {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	private rgbToHex(r: number, g: number, b: number, a?: number): string {
		const baseHex = '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);

		if (a === 0) return baseHex + `00`;
		if (!a || a === 1) return baseHex;
		return baseHex + this.componentToHex(Math.round(a * 255));
	}

	private ensureSixOrEightHex(hex: string): string {
		if (hex.length === 7 || hex.length === 9) return hex;
		if (hex.length !== 4) throw new Error(`Invalid hex value`);

		const arr = hex.split(``);

		arr.splice(1, 0, arr[1]);
		arr.splice(3, 0, arr[3]);
		arr.splice(5, 0, arr[5]);

		return arr.join('');
	}

	private ensureAllLowercase(hex: string) {
		return hex.toLowerCase();
	}

	private ensureHash(hex: string): string {
		if (hex.charAt(0) === `#`) return hex;
		return `#` + hex;
	}
}
