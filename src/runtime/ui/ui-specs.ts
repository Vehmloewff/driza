import { Store } from 'halyard/store';
import { Font, TextShadow, Color, ScrollbarStyles, TextStyles } from 'halyard/style';
import { ElementStyles } from 'runtime/style/element-styles';
import { Component, EaseLikeFunction } from 'halyard/internal';

export interface WebViewProps {
	src?: Store<string> | string;
	data?: Store<string> | string;
}
export interface WebViewResult {
	history: Store<string[]> | string[];
}

export interface HtmlViewProps {
	html: Store<string> | string;
}
export interface HtmlViewResult {}

export interface ImageProps {
	src: Store<string> | string;
}
export interface ImageResult {}

export interface VideoProps {
	src: Store<string> | string;
}
export interface VideoResult {}

export interface AudioProps {
	src: Store<string> | string;
}
export interface AudioResult {}

export interface LabelProps {
	text: Store<string> | string;
	style?: Store<TextStyles> | TextStyles;
}
export interface LabelResult {}

export interface ElementProps {
	style?: Store<ElementStyles> | ElementStyles;
	draggable?: Store<boolean> | boolean;
	disabled?: Store<boolean> | boolean;
}
export interface ElementResult {}

export interface TextViewProps {
	value?: Store<string[]> | string[];
	textComponent?: Store<Component> | Component;
	caretPosition?: Store<{ before: number; after: number }> | { before: number; after: number };
	caret?: Store<Component> | Component;
	options?: Store<{ [key: string]: any }> | { [key: string]: any };
	lines?: Store<{ num: number; max: number; min: number }> | { num: number; max: number; min: number };
	rows?: Store<{ num: number; max: number; min: number }> | { num: number; max: number; min: number };
}
export interface TextViewResult {}
export interface TextViewComponentProps {
	value: Store<string>;
	index: Store<number>;
	caretPosition: Store<TextViewProps['caretPosition']>;
	options: Store<{ [key: string]: any }>;
}

export interface ToggleProps {
	inner?: Store<Component> | Component;
	isOn?: Store<boolean> | boolean;
}
export interface ToggleResult {}
export interface ToggleComponentProps {
	isOn: Store<boolean>;
	options: Store<{ [key: string]: any }>;
}
// Component should dispatch a `toggle` event when the user toggles this option

export interface ChoiceProps {
	component?: Store<Component> | Component;
	choices?: Store<any[]> | any[];
	options?: Store<{ [key: string]: any }> | { [key: string]: any };
	currentChoice?: Store<any> | any;
}
export interface ChoiceResult {}
export interface ChoiceComponentProps {
	selected: Store<boolean>;
	data: Store<any>;
	options: Store<{ [key: string]: any }>;
}
// Component should dispatch a `select` event when the user selects this option

export interface AnonymousChoiceProps {
	inner?: Store<Component> | Component;
	options?: Store<{ [key: string]: any }> | { [key: string]: any };
	value?: Store<any> | any;
}
export interface AnonymousChoiceResult {}
export interface AnonymousChoiceComponentProps {
	options: Store<{ [key: string]: any }>;
	value: Store<any>;
}
// Component should dispatch a `valueset` event when the user sets a new value

export interface DialogProps {
	primaryText?: Store<string> | string;
	secondaryText?: Store<string> | string;
	header?: Store<string> | string;
	body: Store<string> | string;
}
export interface DialogResult {
	open: () => void;
	close: () => void;
}

export interface AbsoluteLayoutProps {}
export interface AbsoluteLayoutResult {}

export interface StackLayoutProps {}
export interface StackLayoutResult {}

export interface ScrollViewProps {
	scrollPos?: Store<number> | number;
	style?: Store<ScrollbarStyles> | ScrollbarStyles;
}
export interface ScrollViewResult {
	scrollTo: (pos: number, easing: EaseLikeFunction) => Promise<void>;
}
