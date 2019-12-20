import { createElement } from './create-element';
import { ComponentConstructor, SpecificComponent, ComponentSELF } from '../interfaces';
import { createUI } from 'halyard/ui';
import { getRenderer, rendererIsSet, onRendererSet } from './renderer';

export const createComponent = <P, R>(fn: ComponentConstructor<P, R>): SpecificComponent<P, R> => {
	const componentConstructor = (props: P, SELF: ComponentSELF): R => {
		rendererIsSet() ? getRenderer().component({ SELF }) : onRendererSet(renderer => renderer.component({ SELF }));

		const UI = createUI();

		return fn(props, UI, SELF);
	};

	return createElement(componentConstructor);
};
