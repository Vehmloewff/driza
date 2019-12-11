import { createComponentOrElement } from './create-component-or-element';
import { UserInterface, ComponentBasics } from '../interfaces';
import { createUI } from './create-ui';

export const createComponent = <UserImpliedProps, UserReturnedResult>(
	fn: (props: UserImpliedProps, UI: UserInterface, self: Omit<ComponentBasics, 'props'> & { props: UserImpliedProps }) => UserReturnedResult
) => createComponentOrElement((props: UserImpliedProps, SELF) => fn(props, createUI(), SELF), {}, `virtual`);
