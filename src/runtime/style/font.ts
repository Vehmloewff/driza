import { random } from '../../utils';
import { getRenderer, rendererIsSet, Renderer, onRendererSet } from 'driza/internal';
import { Store, simpleStore } from 'driza/store';

export interface FontOptions {
	default?: 'serif' | 'sans-serf' | 'monospace';
	custom?: {
		eot?: string;
		woff?: string;
		woff2?: string;
		ttf?: string;
		svg?: string;
	};
}

export class Font {
	id: string;

	eot: string = null;
	woff: string = null;
	woff2: string = null;
	ttf: string = null;
	svg: string = null;

	loaded: Store<boolean> = simpleStore(false);
	error: Store<string> = simpleStore(null);

	constructor(options: FontOptions = {}) {
		if (options.default) this.id = options.default;
		else if (options.custom) {
			this.id = `font${random(20)}`;

			this.eot = options.custom.eot;
			this.woff = options.custom.woff;
			this.woff2 = options.custom.woff2;
			this.ttf = options.custom.ttf;
			this.svg = options.custom.svg;
		}

		const callApplyFont = (renderer: Renderer) => {
			renderer
				.applyFont(this)
				.then(() => this.loaded.set(true))
				.catch(e => this.error.set(e));
		};

		rendererIsSet() ? callApplyFont(getRenderer()) : onRendererSet(callApplyFont);
	}
}

export const defaultFont = simpleStore(new Font({ default: 'sans-serf' }));
