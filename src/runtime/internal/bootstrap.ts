import { PublicComponentBasics, AdditionalComponentValues, ComponentBasics } from '../interfaces';
import { getRenderer } from './renderer';
import { simpleStore } from 'halyard/store';
import { allDelaysResolved } from './manage-delays';

export const bootstrapComponent = async (component: PublicComponentBasics & AdditionalComponentValues) => {
	const renderedResult = getRenderer().component({
		rendererCreated: !!component.rendererCreated,
		order: simpleStore([null]),
		parent: getRenderer().root(),
		props: component.props,
		removed: component.removed,
		dispatch: component.dispatch,
	});

	component.hasBeenRendered.set(true);

	await component.dispatch(`create`, renderedResult);

	await allDelaysResolved();
};
