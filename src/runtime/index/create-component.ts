import { createComponentOrElement, createUI } from '@self/internal';
import { UserInterface, ComponentBasics } from '../interfaces';

export const createComponent = <UserImpliedProps, UserReturnedResult>(
	fn: (props: UserImpliedProps, UI: UserInterface, self: Omit<ComponentBasics, 'props'> & { props: UserImpliedProps }) => UserReturnedResult
) => createComponentOrElement((props: UserImpliedProps, SELF) => fn(props, createUI(), SELF), {}, `virtual`);
