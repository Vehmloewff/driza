import { createEventDispatcher } from './events';
import { PublicComponentBasics, ComponentTypes, ComponentBasics, ComponentProps } from '../interfaces';
import { simpleStore, Store } from 'halyard/store';
import { RendererResult, getRenderer } from './renderer';
import { asyncForeach } from 'utils';

const unexpectedError = `An unexpected error occured.  Please open an issue to report this. https://github.com/Vehmloewff/halyard/issues/new`;

export const createComponentOrElement = <UserDefinedProps extends {}, UserImpliedProps extends UserDefinedProps, UserReturnedResult>(
	fn: (props: UserImpliedProps, self: Omit<ComponentBasics, 'props'> & { props: UserImpliedProps }) => UserReturnedResult,
	defaultProps: UserDefinedProps,
	type: ComponentTypes
) => (props?: UserImpliedProps): Omit<PublicComponentBasics, 'props'> & UserReturnedResult & { props: UserImpliedProps } => {
	const eventDispatcher = createEventDispatcher();

	const removed = simpleStore(false);
	const children: Store<PublicComponentBasics[]> = simpleStore([]);
	const order: Store<RendererResult[]> = simpleStore([]);

	removed.subscribe(async remove => {
		if (remove) await eventDispatcher.dispatch(`beforedestroy`);
		else await eventDispatcher.dispatch(`beforemount`);
	});

	async function initiateChild(child: PublicComponentBasics, renderedParent: RendererResult, index: number) {
		let render: ComponentBasics['render'];

		child.once('before-create', (_, args) => {
			render = args[0];
		});

		await child.dispatch('before-create');

		if (index > order.get().length) throw new Error(unexpectedError);

		order.update(currentOrder => {
			currentOrder.splice(index, 0, null);
			return currentOrder;
		});

		const renderedChild = getRenderer().component({
			render,
			type: child.type(),
			order,
			parent: renderedParent,
			props: child.props,
			removed: child.removed,
			dispatch: child.dispatch,
		});

		order.update(currentChild => {
			currentChild[index] = renderedChild;
			return currentChild;
		});

		child.hasBeenRendered.set(true);

		await child.dispatch(`create`, renderedChild);
	}

	const render = (...newChildren: PublicComponentBasics[]) => children.set(newChildren);

	eventDispatcher.once(`before-create`, (_, __, addArg) => addArg(render));

	eventDispatcher.once(`create`, async (rendererResult: RendererResult) => {
		// Provide the render function
		rendererResult.mediator.provide(`__render_children`, (arr: PublicComponentBasics[]) => render(...arr));

		// Assume that all children have not been mounted yet
		await asyncForeach(children.get(), async (child, index) => {
			await initiateChild(child, rendererResult, index);
		});

		children.subscribe(async (newChildren, initialCall) => {
			if (initialCall) return;

			// What changed?  Figure it out, then call initiateChild for each child
			// that is not already initiate
			await asyncForeach(newChildren, async (child, index) => {
				if (!child.hasBeenRendered.get()) await initiateChild(child, rendererResult, index);
			});
		});
	});

	const self: Omit<PublicComponentBasics, 'props'> = {
		dispatch: eventDispatcher.dispatch,
		on: eventDispatcher.on,
		once: eventDispatcher.once,
		destroy: () => removed.set(true),
		reMount: () => removed.set(false),
		removed,
		children,
		type: () => type,
		hasBeenRendered: simpleStore(false),
	};

	props = Object.assign({}, defaultProps || {}, props);

	return {
		...self,
		...fn(props, { ...self, props, render }),
		props,
	};
};
