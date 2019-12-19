import { Renderer } from '../interfaces';
import { Mediator } from '../../utils';

export type RendererResult = { data: any; mediator: Mediator };
type Callee = (renderer: Renderer<RendererResult>) => void;

let currentRenderer: Renderer<RendererResult> = null;
const callOnSet: Callee[] = [];

export const setRenderer = (renderer: Renderer<RendererResult>) => {
	currentRenderer = renderer;

	callOnSet.forEach(fn => fn(renderer));
};

export const rendererIsSet = () => !!currentRenderer;

export const onRendererSet = (fn: Callee) => {
	callOnSet.push(fn);
};

export const getRenderer = () => {
	if (currentRenderer === null) throw new Error(`Renderer has not been set.  Remember, 'setRenderer' must be called before 'bootstrapComponent'.`);
	if (currentRenderer && currentRenderer.applyFont && currentRenderer.component && currentRenderer.root) return currentRenderer;
	throw new Error(`The current renderer is not of the right type.`);
};
