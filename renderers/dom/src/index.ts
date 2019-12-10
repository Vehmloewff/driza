import { Mediator, Renderer, createMediator } from 'versatilejs';
import { Store, simpleStore } from 'versatilejs/store';

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
	applyFont: async () => {},
};

export default renderer;
