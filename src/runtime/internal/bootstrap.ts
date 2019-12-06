import { ComponentBasics, AdditionalComponentValues } from '../interfaces';
import renderer from './renderer';

export const bootstrapComponent = (component: ComponentBasics & AdditionalComponentValues) => {
	renderer.component({
		type: `virtual`,
		order: [null],
		parent: renderer.root(),
		props: component.props,
		removed: component.removed,
	});
};
