import { Renderer } from '../interfaces';
import { Store, simpleStore } from '../store';
import { Font } from '../style/font';

export type RendererResult = { element: string; id: string; removed: Store<boolean> };

const renderer: Renderer<RendererResult> = {
	root: () => ({ element: `root`, id: `some-id`, removed: simpleStore(false) }),
	component: ({ removed, type, parent }) => ({
		element: `${parent.element}>element:${type}`,
		id: `some-id`,
		removed,
	}),
	applyFont: async (font: Font) => console.log('Applying Font...', font),
};

export default renderer;
