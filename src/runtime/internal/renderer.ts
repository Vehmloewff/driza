import { Renderer } from '../interfaces';
import { Font } from '../style/font';
import { Mediator, createMediator } from '../../utils';

export type RendererResult = { data: any; mediator: Mediator };

const renderer: Renderer<RendererResult> = {
	root: () => ({ data: `some-id`, mediator: createMediator() }),
	component: ({ type, parent }) => ({
		data: { element: `${parent}>element:${type}`, id: `some-id` },
		mediator: createMediator(),
	}),
	applyFont: async (font: Font) => console.log('Applying Font...', font),
};

export default renderer;
