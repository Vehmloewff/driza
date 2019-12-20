import { ComponentBasics } from 'halyard/internal';
import {
	WebViewProps,
	WebViewResult,
	HtmlViewProps,
	HtmlViewResult,
	VideoProps,
	VideoResult,
	ImageProps,
	ImageResult,
	AudioResult,
	AudioProps,
	LabelProps,
	LabelResult,
	ElementProps,
	ElementResult,
	TextViewProps,
	TextViewResult,
	ToggleProps,
	ToggleResult,
	ChoiceProps,
	ChoiceResult,
	AnonymousChoiceProps,
	AnonymousChoiceResult,
	DialogProps,
	DialogResult,
	AbsoluteLayoutProps,
	AbsoluteLayoutResult,
	StackLayoutProps,
	StackLayoutResult,
	ScrollViewProps,
	ScrollViewResult,
} from './ui-specs';

export type WebView = (props: WebViewProps) => ComponentBasics & WebViewResult;

export type HtmlView = (props: HtmlViewProps) => ComponentBasics & HtmlViewResult;

export type Image = (props: ImageProps) => ComponentBasics & ImageResult;

export type Video = (props: VideoProps) => ComponentBasics & VideoResult;

export type Audio = (props: AudioProps) => ComponentBasics & AudioResult;

export type Label = (props: LabelProps) => ComponentBasics & LabelResult;

export type Element = (props: ElementProps) => ComponentBasics & ElementResult;

export type TextView = (props: TextViewProps) => ComponentBasics & TextViewResult;

export type Toggle = (props: ToggleProps) => ComponentBasics & ToggleResult;

export type Choice = (props: ChoiceProps) => ComponentBasics & ChoiceResult;

export type AnonymousChoice = (props: AnonymousChoiceProps) => ComponentBasics & AnonymousChoiceResult;

export type Dialog = (props: DialogProps) => ComponentBasics & DialogResult;

export type AbsoluteLayout = (props: AbsoluteLayoutProps) => ComponentBasics & AbsoluteLayoutResult;

export type StackLayout = (props: StackLayoutProps) => ComponentBasics & StackLayoutResult;

export type ScrollView = (props: ScrollViewProps) => ComponentBasics & ScrollViewResult;
