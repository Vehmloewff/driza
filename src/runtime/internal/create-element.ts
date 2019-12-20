import { ElementConstructor, SpecificComponent, ComponentBasics, ComponentInstance, SpecificComponentBasics, ComponentSELF } from '../interfaces';
import { createEventDispatcher } from './events';
import { simpleStore, Store } from 'halyard/store';

export const createElement = <P, R>(fn: ElementConstructor<P, R>): SpecificComponent<P, R> => {
	function instance(props: P): ComponentBasics & R {
		const eventDispatcher = createEventDispatcher();

		const removed = simpleStore(false);
		const children: Store<ComponentInstance[]> = simpleStore([]);

		removed.subscribe((shouldRemove, initial) => {
			if (shouldRemove) eventDispatcher.dispatch('destroy');
			else if (!initial) eventDispatcher.dispatch('mount');
		});

		const basics: SpecificComponentBasics<P> = {
			dispatch: eventDispatcher.dispatch,
			on: eventDispatcher.on,
			once: eventDispatcher.once,
			destroy: () => removed.set(true),
			reMount: () => removed.set(false),
			removed,
			props,
			hasBeenRendered: simpleStore(true),
		};

		const self: ComponentSELF = {
			...basics,
			children,
			render: (...components) => children.set(components),
		};

		const result = fn(props, self);

		return {
			...result,
			...basics,
		};
	}

	return instance;
};
