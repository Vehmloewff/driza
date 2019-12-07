import { UserInterface, ComponentBasics, ComponentTypes } from '../interfaces';
import { createEventDispatcher } from './events';
import { simpleStore, Store } from '../store';
import { createUI } from './create-ui';
import renderer, { RendererResult } from './renderer';

const unexpectedError = `An unexpected error occured.  Please open an issue to report this. https://github.com/Vehmloewff/versatilejs/issues/new`;

export const createComponent = <UserImpliedProps, UserReturnedResult>(
	fn: (
		props: UserImpliedProps,
		UI: UserInterface,
		self: Omit<ComponentBasics, 'props'>
	) => UserReturnedResult,
	type: ComponentTypes
) => {
	const eventDispatcher = createEventDispatcher();

	const UI: UserInterface = createUI();

	const removed = simpleStore(false);
	const children: Store<ComponentBasics[]> = simpleStore([]);
	const order: Store<RendererResult[]> = simpleStore([]);

	function inisateChild(child: ComponentBasics, renderedParent: RendererResult, index: number) {
		if (index > order.get().length) throw new Error(unexpectedError);

		order.update(currentOrder => {
			currentOrder.splice(index, 0, null);
			return currentOrder;
		});

		const renderedChild = renderer.component({
			type,
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

		child.dispatch(`create`, renderedChild);
	}

	eventDispatcher.once(`create`, (rendererResult: RendererResult) => {
		// Assume that all children have not been mounted yet
		children.get().forEach((child, index) => {
			inisateChild(child, rendererResult, index);
		});
		children.subscribe((newChildren, initialCall) => {
			if (initialCall) return;

			// What changed?  Figure it out, then call inisateChild for each child
			// that is not already inisiated
			newChildren.forEach((child, index) => {
				if (!child.hasBeenRendered) inisateChild(child, rendererResult, index);
			});
		});
	});

	const self: Omit<ComponentBasics, 'props'> = {
		dispatch: eventDispatcher.dispatch,
		on: eventDispatcher.on,
		destroy: () => removed.set(true),
		reMount: () => removed.set(false),
		removed,
		render: (...newChildren) => {
			children.set(newChildren);
		},
		hasBeenRendered: simpleStore(false),
	};

	return (props: UserImpliedProps) => {
		const thisComponent: ComponentBasics = {
			...self,
			...fn(props, UI, self),
			props: props,
		};

		return thisComponent;
	};
};
