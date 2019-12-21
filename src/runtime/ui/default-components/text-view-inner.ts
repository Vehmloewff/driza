/*
	TEXT_VIEW_INNER - To be inserted into the `TextView` component
*/

import { TextViewComponentProps } from '../ui-specs';
import { UserInterface } from '../ui-object-specs';
import { ComponentSELF, createComponent } from 'halyard/internal';

export interface TextViewInnerOptions {}

function constructor(props: TextViewComponentProps, UI: UserInterface, SELF: ComponentSELF) {
	const label = UI.Label({ text: props.value });

	SELF.render(label);
}

export const TextViewInner = createComponent(constructor);
