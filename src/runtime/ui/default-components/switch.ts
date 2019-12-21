/*
	SWITCH - To be inserted into the `Toggle` component
*/

import { ToggleComponentProps } from '../ui-specs';
import { UserInterface } from '../ui-object-specs';
import { ComponentSELF, createComponent } from 'halyard/internal';
import { dependantStore } from 'halyard/store';

export interface SwitchOptions {}

function constructor(props: ToggleComponentProps, UI: UserInterface, SELF: ComponentSELF) {
	const label = UI.Label({
		text: dependantStore(() => {
			const dynamic = props.isOn.get() ? `on` : `off`;

			return `switch is ${dynamic}`;
		}),
	});

	label.on('click', () => {
		SELF.dispatch('toggle');
	});

	SELF.render(label);
}

export const Switch = createComponent(constructor);
