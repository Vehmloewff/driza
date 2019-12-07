import { ComponentBasics, AdditionalComponentValues } from '../interfaces';
import renderer from './renderer';
import { ssimpleStore } from '../store';

export const bootstrapComponent = async (
	component: ComponentBasics & AdditionalComponentValues
) => {
	const renderedResult = renderer.component({
		type: `virtual`,
		order: ssimpleStore([null]),
		parent: renderer.root(),
		props: component.props,
		removed: component.removed,
		dispatch: component.dispatch,
	});

	component.hasBeenRendered.set(true);

	await component.dispatch(`create`, renderedResult);
};
