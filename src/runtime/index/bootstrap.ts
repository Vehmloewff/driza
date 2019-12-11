import { PublicComponentBasics, AdditionalComponentValues } from '../interfaces';
import { renderer } from '@self/internal';
import { simpleStore } from '@self/store';

export const bootstrapComponent = async (component: PublicComponentBasics & AdditionalComponentValues) => {
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
