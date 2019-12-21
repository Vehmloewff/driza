/*
	TEXT_VIEW_INNER - To be inserted into the `TextView` component
*/

import { AnonymousChoiceComponentProps } from '../ui-specs';
import { UserInterface } from '../ui-object-specs';
import { ComponentSELF, createComponent, EACH } from 'halyard/internal';
import { simpleStore } from 'halyard/store';

export interface SliderOptions {}

function constructor(props: AnonymousChoiceComponentProps, UI: UserInterface, SELF: ComponentSELF) {
	const label = UI.Label({ text: props.value, style: { textSize: 40 } });

	const values = simpleStore([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

	SELF.render(
		label,
		EACH(values).as(value => {
			const label = UI.Label({ text: ` ${value} ` });

			label.on('click', () => {
				SELF.dispatch('valueset', value);
			});

			return label;
		})
	);
}

export const Slider = createComponent(constructor);
