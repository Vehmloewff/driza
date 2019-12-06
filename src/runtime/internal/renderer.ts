import { Renderer } from '../interfaces';
import { Store, store } from '../store';

type RendererResult = { element: string; id: string; removed: Store<boolean> };

const renderer: Renderer<RendererResult> = {
	root: () => ({ element: `root`, id: `some-id`, removed: store(false) }),
	component: ({ removed, type, parent }) => ({
		element: `${parent.element}>element:${type}`,
		id: `some-id`,
		removed,
	}),
};

export default renderer;
