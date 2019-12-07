import { createComponentOrElement } from './create-component-or-element';
import { UserInterface, ComponentBasics } from '../interfaces';

export const createComponent = <UserImpliedProps, UserReturnedResult>(
	fn: (
		props: UserImpliedProps,
		UI: UserInterface,
		self: Omit<ComponentBasics, 'props'>
	) => UserReturnedResult
) => createComponentOrElement(fn, `virtual`);
