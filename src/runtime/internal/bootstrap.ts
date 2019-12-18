import { PublicComponentBasics, AdditionalComponentValues, ComponentBasics } from '../interfaces';
import { getRenderer } from './renderer';
import { simpleStore } from 'halyard/store';
import { allDelaysResolved } from './manage-delays';

export const bootstrapComponent = async (component: PublicComponentBasics & AdditionalComponentValues) => {
	let render: ComponentBasics['render'];

	component.once('before-create', (_, args) => {
		render = args[0];
	});

	await component.dispatch('before-create');

	const renderedResult = getRenderer().component({
		render,
		type: component.type(),
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
