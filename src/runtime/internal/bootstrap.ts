import { PublicComponentBasics, AdditionalComponentValues } from '../interfaces';
import { getRenderer } from './renderer';
import { simpleStore } from 'versatilejs/store';
import { appIsReady } from './app-is-ready';

export const bootstrapComponent = async (component: PublicComponentBasics & AdditionalComponentValues) => {
	const renderedResult = getRenderer().component({
		type: component.type(),
		order: simpleStore([null]),
		parent: getRenderer().root(),
		props: component.props,
		removed: component.removed,
		dispatch: component.dispatch,
	});

	component.hasBeenRendered.set(true);

	await component.dispatch(`create`, renderedResult);

	await new Promise(resolve => {
		appIsReady.subscribe(ready => {
			if (ready) resolve();
		});
	});
};
