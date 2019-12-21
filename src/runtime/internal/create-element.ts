import { ElementConstructor, SpecificComponent, ComponentBasics, ComponentInstance, SpecificComponentBasics, ComponentSELF } from '../interfaces';
import { createEventDispatcher } from './events';
import { simpleStore, Store } from 'halyard/store';
import { RendererResult } from './renderer';
import { asyncForeach } from 'utils';

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

		eventDispatcher.once('render', async parent => {
			// This element is in the process of being rendered

			// Right away, loop through the children and call `initiateChild` on each one
			await asyncForeach(children.get(), async (child, index) => {
				await initiateChild(child, parent, index);
			});

			// Then, listen for changes to the children
			children.subscribe(async (children, initial) => {
				if (initial) return;

				// The children have changed

				// Loop through the children and call `initiateChild` for each new one
				await asyncForeach(children, async (child, index) => {
					if (!child.hasBeenRendered.get()) await initiateChild(child, parent, index);
				});

				// TODO: Destroy every child that is not present in the new children
			});
		});

		async function initiateChild(child: ComponentInstance, parentResult: any, index: number) {
			// TODO: Improve `eventEmitter` so that this is not so messy
			const thisResult = simpleStore(parentResult);

			await child.dispatch('prerender', thisResult);

			await child.dispatch('render', thisResult.get());

			child.hasBeenRendered.set(true);
		}

		const result = fn(props, self);

		return {
			...result,
			...basics,
		};
	}

	return instance;
};
