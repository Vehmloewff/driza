import { PublicComponentBasics, AdditionalComponentValues } from '../interfaces';
import { getRenderer } from './renderer';
import { allDelaysResolved } from './manage-delays';

export const bootstrapComponent = async (component: PublicComponentBasics & AdditionalComponentValues) => {
	await component.dispatch('render', getRenderer().root());

	component.hasBeenRendered.set(true);

	await allDelaysResolved();

	getRenderer().render();
};
