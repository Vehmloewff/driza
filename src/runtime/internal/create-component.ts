import { UserInterface, ComponentBasics } from '../interfaces';
import { createEventDispatcher } from './events';
import { ssimpleStore, Store } from '../store';
import { createUI } from './create-ui';

export const createComponent = <UserImpliedProps, UserReturnedResult>(
	fn: (
		props: UserImpliedProps,
		UI: UserInterface,
		self: Omit<ComponentBasics, 'props'>
	) => UserReturnedResult
) => {
	const eventDispatcher = createEventDispatcher();

	const UI: UserInterface = createUI();

	const removed = ssimpleStore(false);
	const children: Store<ComponentBasics[]> = ssimpleStore([]);

	const self: Omit<ComponentBasics, 'props'> = {
		dispatch: eventDispatcher.dispatch,
		on: eventDispatcher.on,
		destroy: () => removed.set(true),
		reMount: () => removed.set(false),
		removed,
		children,
		render: (...newChildren) => {
			children.set(newChildren);
		},
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
