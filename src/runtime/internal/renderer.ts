import { Renderer } from '../interfaces';
import { Mediator } from '../../utils';

export type RendererResult = { data: any; mediator: Mediator };
type Callee = (renderer: Renderer) => void;

let currentRenderer: Renderer = null;
const callOnSet: Callee[] = [];

export const setRenderer = (renderer: Renderer) => {
	currentRenderer = renderer;

	callOnSet.forEach(fn => fn(renderer));
};

export const rendererIsSet = () => !!currentRenderer;

export const onRendererSet = (fn: Callee) => {
	callOnSet.push(fn);
};

export const getRenderer = () => {
	if (currentRenderer === null) throw new Error(`Renderer has not been set.  Remember, 'setRenderer' must be called before 'createComponent'.`);
	if (
		currentRenderer &&
		currentRenderer.root &&
		currentRenderer.component &&
		currentRenderer.UI &&
		currentRenderer.render &&
		currentRenderer.applyFont
	)
		return currentRenderer;
	throw new Error(`The current renderer is not of the right type.`);
};
