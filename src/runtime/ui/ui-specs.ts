import { Store } from 'halyard/store';
import { ScrollbarStyles, TextStyles } from 'halyard/style';
import { ElementStyles } from 'runtime/style/element-styles';
import { Component, EaseLikeFunction, ComponentInstance } from 'halyard/internal';

/*
	WebView
*/
export interface WebViewProps {
	src?: Store<string> | string;
	data?: Store<string> | string;
}
export interface WebViewPropsProcessed {
	src: Store<string>;
	data: Store<string>;
}
export interface WebViewResult {
	history: Store<string[]>;
}

/*
	HtmlView
*/
export interface HtmlViewProps {
	html: Store<string> | string;
}
export interface HtmlViewPropsProcessed {
	html: Store<string>;
}
export interface HtmlViewResult {}

/*
	Image
*/
export interface ImageProps {
	src: Store<string> | string;
}
export interface ImagePropsProcessed {
	src: Store<string>;
}
export interface ImageResult {}

/*
	Video
*/
export interface VideoProps {
	src: Store<string>;
}
export interface VideoPropsProcessed {
	src: Store<string>;
}
export interface VideoResult {}

/*
	Audio
*/
export interface AudioProps {
	src: Store<string> | string;
}
export interface AudioPropsProcessed {
	src: Store<string>;
}
export interface AudioResult {}

/*
	Label
*/
export interface LabelProps {
	text: Store<string> | string;
	style?: Store<TextStyles> | TextStyles;
}
export interface LabelPropsProcessed {
	text: Store<string>;
	style?: Store<TextStyles>;
}
export interface LabelResult {}

/*
	Element
*/
export interface ElementProps {
	style?: Store<ElementStyles> | ElementStyles;
	draggable?: Store<boolean> | boolean;
	disabled?: Store<boolean> | boolean;
}
export interface ElementPropsProcessed {
	style: Store<ElementStyles> | ElementStyles;
	draggable: Store<boolean> | boolean;
	disabled: Store<boolean> | boolean;
}
export interface ElementResult {
	children: Store<ComponentInstance[]>;
	$: (...components: ComponentInstance[]) => ComponentInstance & { props: ElementPropsProcessed };
}

/*
	TextView
*/
export interface TextViewProps {
	value?: Store<string[]> | string[];
	textComponent?: Store<Component> | Component;
	caretPosition?: Store<{ before: number; after: number }> | { before: number; after: number };
	caret?: Store<Component> | Component;
	options?: Store<{ [key: string]: any }> | { [key: string]: any };
	lines?: Store<{ num: number; max: number; min: number }> | { num: number; max: number; min: number };
	rows?: Store<{ num: number; max: number; min: number }> | { num: number; max: number; min: number };
}
export interface TextViewPropsProcessed {
	value: Store<string[]>;
	textComponent: Store<Component>;
	caretPosition: Store<{ before: number; after: number }>;
	caret: Store<Component>;
	options: Store<{ [key: string]: any }>;
	lines: Store<{ num: number; max: number; min: number }>;
	rows: Store<{ num: number; max: number; min: number }>;
}
export interface TextViewResult {}
export interface TextViewComponentProps {
	value: Store<string>;
	index: Store<number>;
	caretPosition: Store<TextViewProps['caretPosition']>;
	options: Store<{ [key: string]: any }>;
}

/*
	Toggle
*/
export interface ToggleProps {
	inner?: Store<Component> | Component;
	isOn?: Store<boolean> | boolean;
}
export interface TogglePropsProcessed {
	inner: Store<Component>;
	isOn: Store<boolean>;
}
export interface ToggleResult {}
export interface ToggleComponentProps {
	isOn: Store<boolean>;
	options: Store<{ [key: string]: any }>;
}
// Component should dispatch a `toggle` event when the user toggles this option

/*
	Choice
*/
export interface ChoiceProps {
	component?: Store<Component> | Component;
	choices?: Store<any[]> | any[];
	options?: Store<{ [key: string]: any }> | { [key: string]: any };
	currentChoice?: Store<any> | any;
}
export interface ChoicePropsProcessed {
	component: Store<Component>;
	choices: Store<any[]>;
	options: Store<{ [key: string]: any }>;
	currentChoice: Store<any>;
}
export interface ChoiceResult {}
export interface ChoiceComponentProps {
	selected: Store<boolean>;
	data: Store<any>;
	options: Store<{ [key: string]: any }>;
}
// Component should dispatch a `select` event when the user selects this option

/*
	AnonymousChoice
*/
export interface AnonymousChoiceProps {
	inner?: Store<Component> | Component;
	options?: Store<{ [key: string]: any }> | { [key: string]: any };
	value?: Store<any> | any;
}
export interface AnonymousChoicePropsProcessed {
	inner: Store<Component>;
	options: Store<{ [key: string]: any }>;
	value: Store<any>;
}
export interface AnonymousChoiceResult {}
export interface AnonymousChoiceComponentProps {
	options: Store<{ [key: string]: any }>;
	value: Store<any>;
}
// Component should dispatch a `valueset` event when the user sets a new value

/*
	Dialog
*/
export interface DialogProps {
	primaryText?: Store<string> | string;
	secondaryText?: Store<string> | string;
	header?: Store<string> | string;
	body: Store<string> | string;
}
export interface DialogPropsProcessed {
	primaryText: Store<string>;
	secondaryText: Store<string>;
	header: Store<string>;
	body: Store<string>;
}
export interface DialogResult {
	open: () => void;
	close: () => void;
}

/*
	AbsoluteLayout
*/
export interface AbsoluteLayoutProps {}
export interface AbsoluteLayoutPropsProcessed {}
export interface AbsoluteLayoutResult {
	children: Store<ComponentInstance[]>;
	$: (...components: ComponentInstance[]) => ComponentInstance & { props: StackLayoutPropsProcessed };
}

/*
	StackLayout
*/
export interface StackLayoutProps {}
export interface StackLayoutPropsProcessed {}
export interface StackLayoutResult {
	children: Store<ComponentInstance[]>;
	$: (...components: ComponentInstance[]) => ComponentInstance & { props: AbsoluteLayoutPropsProcessed };
}

/*
	ScrollView
*/
export interface ScrollViewProps {
	scrollPos?: Store<number> | number;
	style?: Store<ScrollbarStyles> | ScrollbarStyles;
}
export interface ScrollViewPropsProcessed {
	scrollPos: Store<number>;
	style: Store<ScrollbarStyles>;
}
export interface ScrollViewResult {
	scrollTo: (pos: number, easing: EaseLikeFunction) => Promise<void>;
	children: Store<ComponentInstance[]>;
	$: (...components: ComponentInstance[]) => ComponentInstance & { props: ScrollViewPropsProcessed };
}
