import { ComponentBasics, AdditionalComponentValues } from '../interfaces';
import renderer from '../internal/renderer';
import { simpleStore } from '../store';

export const bootstrapComponent = async (
	component: ComponentBasics & AdditionalComponentValues
) => {
	const renderedResult = renderer.component({
		type: `virtual`,
		order: simpleStore([null]),
		parent: renderer.root(),
		props: component.props,
		removed: component.removed,
		dispatch: component.dispatch,
	});

	component.hasBeenRendered.set(true);

	await component.dispatch(`create`, renderedResult);
};
