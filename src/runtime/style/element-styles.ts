import { GlobalStyles, GlobalStates, TextStyles, InputStyles } from './interfaces';
import { Color } from './color';

export type ButtonStyles = GlobalStyles & TextStyles & GlobalStates<GlobalStyles & TextStyles>;

export type TextFieldStyles = GlobalStyles & InputStyles & GlobalStates<GlobalStyles & InputStyles>;
export type TextViewStyles = GlobalStyles & InputStyles & GlobalStates<GlobalStyles & InputStyles>;

export type SwitchStyles = GlobalStyles &
	GlobalStates<GlobalStyles> & {
		checked?: GlobalStyles;
		checkedAndHover?: GlobalStyles;
		thumb?: Omit<SwitchStyles, 'thumb'>;
	};
export type CheckboxStyles = GlobalStyles &
	GlobalStates<GlobalStyles> & {
		checked?: GlobalStyles;
		checkedAndHover?: GlobalStyles;
		inner?: Omit<CheckboxStyles, 'inner'> & {
			checkColor?: Color;
		};
	};

export type SliderStyles = GlobalStyles & {
	thumb?: GlobalStyles & GlobalStates<GlobalStyles>;
	showCrosscuts?: boolean;
	crossCutWidth?: number;
	crossCutColor?: Color;
} & GlobalStates<
		GlobalStyles & {
			thumb?: GlobalStyles & GlobalStates<GlobalStyles>;
			showCrosscuts?: boolean;
			crossCutWidth?: number;
			crossCutColor?: Color;
		}
	>;

export type SelectStyles = GlobalStyles & GlobalStates<GlobalStyles>;

export type SegmentedBarStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type RadioStyles = GlobalStyles & GlobalStates<GlobalStyles>;

export type DatePickerStyles = GlobalStyles;
export type TimePickerStyles = GlobalStyles;
export type ListPickerStyles = GlobalStyles;

export type ActivityIndicatorStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type ProgressStyles = GlobalStyles & { mainColor?: Color } & GlobalStates<GlobalStyles & { mainColor?: Color }>;
export type MenuStyles = GlobalStyles & GlobalStates<GlobalStyles>;

export type LabelStyles = GlobalStyles & TextStyles & GlobalStates<GlobalStyles & TextStyles>;
export type ImageStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type ListViewStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type TabViewStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type TabItemStyles = GlobalStyles & TextStyles & GlobalStates<GlobalStyles & TextStyles>;

export type StackLayoutStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type GridLayoutStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type GridItemStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type AbsoluteLayoutStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type WrapLayoutStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type DockLayoutStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type ScrollViewStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type ActionBarStyles = GlobalStyles & GlobalStates<GlobalStyles>;
export type ElementStyles = GlobalStyles & GlobalStates<GlobalStyles>;
