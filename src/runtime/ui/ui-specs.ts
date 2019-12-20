import { Store } from 'halyard/store';
import { Font, TextShadow, Color, ScrollBarStyles } from 'halyard/style';
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
	font?: Store<Font> | Font;
	textShadow?: Store<TextShadow> | TextShadow;
	color?: Store<Color> | Color;
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
	lines?: Store<{ num: number; max: number; min: number }> | { num: number; max: number; min: number };
	rows?: Store<{ num: number; max: number; min: number }> | { num: number; max: number; min: number };
}
export interface TextViewResult {}

export interface ToggleProps {
	inner?: Store<Component> | Component;
	isOn?: Store<boolean> | boolean;
}
export interface ToggleResult {}

export interface ChoiceProps {
	component?: Store<Component> | Component;
	choices?: Store<any[]> | any[];
	currentChoice?: Store<any> | any;
}
export interface ChoiceResult {}

export interface AnonymousChoiceProps {
	inner?: Store<Component> | Component;
	value?: Store<any> | any;
}
export interface AnonymousChoiceResult {}

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
	scrollBehavior?:
		| Store<{ x?: 'auto' | 'always' | 'never'; y?: 'auto' | 'always' | 'never' }>
		| { x?: 'auto' | 'always' | 'never'; y?: 'auto' | 'always' | 'never' };
	style?: Store<ScrollBarStyles> | ScrollBarStyles;
}
export interface ScrollViewResult {
	scrollTo: (pos: number, easing: EaseLikeFunction) => Promise<void>;
}