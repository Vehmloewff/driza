import { Mediator, Renderer, createMediator } from 'versatilejs';
import { Store, simpleStore } from 'versatilejs/store';
import { createFontFace } from './font-face';

export interface RendererResult {
	element: HTMLElement;
	removed: Store<boolean>;
	mediator: Mediator;
}

const renderer: Renderer<RendererResult> = {
	root: () => ({
		element: document.body,
		mediator: createMediator(),
		removed: simpleStore(false),
	}),
	component: ({ removed }) => ({
		element: document.createElement('div'),
		mediator: createMediator(),
		removed,
	}),
	applyFont: async ({ eot, id, woff, woff2, ttf, svg }) => {
		const styleElement = document.createElement('style');

		styleElement.textContent = createFontFace(id, [
			{ url: ttf, format: 'ttf' },
			{ url: eot, format: 'eot' },
			{ url: woff2, format: 'woff2' },
			{ url: woff, format: 'woff' },
			{ url: svg, format: 'svg' },
		]);

		document.head.append(styleElement);

		// @ts-ignore
		if (document.fonts) {
			// @ts-ignore
			return document.fonts.ready;
		} else return Promise.resolve();
	},
};

export default renderer;
