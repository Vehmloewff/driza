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

export type WebViewComponent = (props: WebViewProps) => ComponentBasics & WebViewResult;

export type HtmlViewComponent = (props: HtmlViewProps) => ComponentBasics & HtmlViewResult;

export type ImageComponent = (props: ImageProps) => ComponentBasics & ImageResult;

export type VideoComponent = (props: VideoProps) => ComponentBasics & VideoResult;

export type AudioComponent = (props: AudioProps) => ComponentBasics & AudioResult;

export type LabelComponent = (props: LabelProps) => ComponentBasics & LabelResult;

export type ElementComponent = (props: ElementProps) => ComponentBasics & ElementResult;

export type TextViewComponent = (props: TextViewProps) => ComponentBasics & TextViewResult;

export type ToggleComponent = (props: ToggleProps) => ComponentBasics & ToggleResult;

export type ChoiceComponent = (props: ChoiceProps) => ComponentBasics & ChoiceResult;

export type AnonymousChoiceComponent = (props: AnonymousChoiceProps) => ComponentBasics & AnonymousChoiceResult;

export type DialogComponent = (props: DialogProps) => ComponentBasics & DialogResult;

export type AbsoluteLayoutComponent = (props: AbsoluteLayoutProps) => ComponentBasics & AbsoluteLayoutResult;

export type StackLayoutComponent = (props: StackLayoutProps) => ComponentBasics & StackLayoutResult;

export type ScrollViewComponent = (props: ScrollViewProps) => ComponentBasics & ScrollViewResult;
