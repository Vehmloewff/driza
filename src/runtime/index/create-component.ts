import { createComponentOrElement } from '../internal/create-component-or-element';
import { UserInterface, PrivateComponentBasics } from '../interfaces';
import { createUI } from '../internal/create-ui';

export const createComponent = <UserImpliedProps, UserReturnedResult>(
	fn: (props: UserImpliedProps, UI: UserInterface, self: Omit<PrivateComponentBasics, 'props'> & { props: UserImpliedProps }) => UserReturnedResult
) => createComponentOrElement((props: UserImpliedProps, SELF) => fn(props, createUI(), SELF), {}, `virtual`);
