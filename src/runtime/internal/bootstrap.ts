import { ComponentInstance } from '../interfaces';
import { getRenderer } from './renderer';
import { allDelaysResolved } from './manage-delays';
import { simpleStore } from 'driza/store';

export const bootstrapComponent = async (component: ComponentInstance) => {
	const root = getRenderer().root();

	const thisResult = simpleStore(root);

	await component.dispatch('prerender', thisResult);
	await component.dispatch('render', thisResult.get());

	component.hasBeenRendered.set(true);

	await allDelaysResolved();

	getRenderer().render();
};
