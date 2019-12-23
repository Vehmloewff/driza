/*
	CARET - To be inserted into the `TextView` component
*/

import { TextViewCaretComponentProps } from '../ui-specs';
import { UserInterface } from '../ui-object-specs';
import { ComponentSELF, createComponent } from 'driza/internal';
import { dependantStore } from 'driza/store';
import { ElementStyles } from 'runtime/style/element-styles';
import { Color } from 'driza/style';

export interface CaretOptions {}

function constructor(props: TextViewCaretComponentProps, UI: UserInterface, SELF: ComponentSELF) {
	const element = UI.Element({
		style: dependantStore<ElementStyles>(
			() => ({
				width: 5,
				height: 40,
				backgroundColor: new Color(`gray`),
				opacity: props.active.get() ? (props.pulse.get() ? 1 : 0.5) : 0,
			}),
			props.active,
			props.pulse
		),
	});

	SELF.render(element);
}

export const Caret = createComponent(constructor);
