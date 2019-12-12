import { createEventDispatcher } from './events';
import { PublicComponentBasics, ComponentTypes, ComponentBasics } from '../interfaces';
import { simpleStore, Store } from 'versatilejs/store';
import { RendererResult, getRenderer } from './renderer';

const unexpectedError = `An unexpected error occured.  Please open an issue to report this. https://github.com/Vehmloewff/versatilejs/issues/new`;

export const createComponentOrElement = <UserDefinedProps extends {}, UserImpliedProps extends UserDefinedProps, UserReturnedResult>(
	fn: (props: UserImpliedProps, self: Omit<ComponentBasics, 'props'> & { props: UserImpliedProps }) => UserReturnedResult,
	defaultProps: UserDefinedProps,
	type: ComponentTypes
): ((props: UserImpliedProps) => Omit<PublicComponentBasics, 'props'> & UserReturnedResult & { props: UserImpliedProps }) => {
	const eventDispatcher = createEventDispatcher();

	const removed = simpleStore(false);
	const children: Store<PublicComponentBasics[]> = simpleStore([]);
	const order: Store<RendererResult[]> = simpleStore([]);

	removed.subscribe(async remove => {
		if (remove) await eventDispatcher.dispatch(`beforedestroy`);
		else await eventDispatcher.dispatch(`beforemount`);
	});

	function inisateChild(child: PublicComponentBasics, renderedParent: RendererResult, index: number) {
		if (index > order.get().length) throw new Error(unexpectedError);

		order.update(currentOrder => {
			currentOrder.splice(index, 0, null);
			return currentOrder;
		});

		const renderedChild = getRenderer().component({
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

	const render = (...newChildren: PublicComponentBasics[]) => {
		children.set(newChildren);
	};

	return (props?: UserImpliedProps) => {
		props = Object.assign(defaultProps || {}, props);

		return {
			...self,
			...fn(props, { ...self, props, render }),
			props,
		};
	};
};
