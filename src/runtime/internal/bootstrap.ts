import { ComponentInstance } from '../interfaces';
import { getRenderer } from './renderer';
import { allDelaysResolved } from './manage-delays';

export const bootstrapComponent = async (component: ComponentInstance) => {
	await component.dispatch('render', getRenderer().root());

	component.hasBeenRendered.set(true);

	await allDelaysResolved();

	getRenderer().render();
};
