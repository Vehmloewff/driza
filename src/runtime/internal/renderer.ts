import { Renderer } from '@self';
import { Font } from '@self/style';
import { Mediator, createMediator } from '../../utils';

export type RendererResult = { data: any; mediator: Mediator };

const renderer: Renderer<RendererResult> = (function() {
	/*RENDERER_START*/
	return {
		root: () => ({ data: `some-id`, mediator: createMediator() }),
		component: () => ({
			data: { element: `parent>element:type`, id: `some-id` },
			mediator: createMediator(),
		}),
		applyFont: async (font: Font) => console.log('Applying Font...', font),
	};
	/*RENDERER_END*/
})();

export default renderer;
