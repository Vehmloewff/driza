/*
	RADIO - To be inserted into the `Choice` component
*/

import { ChoiceComponentProps } from '../ui-specs';
import { UserInterface } from '../ui-object-specs';
import { ComponentSELF, createComponent } from 'halyard/internal';
import { dependantStore } from 'halyard/store';

export interface RadioOptions {}
export type RadioData = string;

function constructor(props: ChoiceComponentProps, UI: UserInterface, SELF: ComponentSELF) {
	const indicator = UI.Label({ text: dependantStore(() => (props.selected.get() ? 'on' : 'off'), props.data) });
	const label = UI.Label({ text: props.data });

	SELF.render(indicator, UI.Label({ text: ` ` }), label);
}

export const Radio = createComponent(constructor);
