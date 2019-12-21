import { createElement } from './create-element';
import { ComponentConstructor, SpecificComponent, ComponentSELF } from '../interfaces';
import { getRenderer } from './renderer';

export const createComponent = <P, R>(fn: ComponentConstructor<P, R>): SpecificComponent<P, R> => {
	const componentConstructor = (props: P, SELF: ComponentSELF): R => {
		SELF.once('prerender', data => {
			data.set(getRenderer().component({ SELF, parentResult: data.get() }));
		});

		return fn(props, getRenderer().UI, SELF);
	};

	return createElement(componentConstructor);
};
