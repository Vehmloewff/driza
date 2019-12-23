import { SpecificComponentBasics } from 'driza/internal';
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
	WebViewPropsProcessed,
	HtmlViewPropsProcessed,
	ImagePropsProcessed,
	VideoPropsProcessed,
	AudioPropsProcessed,
	LabelPropsProcessed,
	ElementPropsProcessed,
	TextViewPropsProcessed,
	TogglePropsProcessed,
	ChoicePropsProcessed,
	AnonymousChoicePropsProcessed,
	DialogPropsProcessed,
	AbsoluteLayoutPropsProcessed,
	StackLayoutPropsProcessed,
	ScrollViewPropsProcessed,
} from './ui-specs';

export type WebViewComponent = (props?: WebViewProps) => SpecificComponentBasics<WebViewPropsProcessed> & WebViewResult;

export type HtmlViewComponent = (props: HtmlViewProps) => SpecificComponentBasics<HtmlViewPropsProcessed> & HtmlViewResult;

export type ImageComponent = (props: ImageProps) => SpecificComponentBasics<ImagePropsProcessed> & ImageResult;

export type VideoComponent = (props: VideoProps) => SpecificComponentBasics<VideoPropsProcessed> & VideoResult;

export type AudioComponent = (props: AudioProps) => SpecificComponentBasics<AudioPropsProcessed> & AudioResult;

export type LabelComponent = (props: LabelProps) => SpecificComponentBasics<LabelPropsProcessed> & LabelResult;

export type ElementComponent = (props?: ElementProps) => SpecificComponentBasics<ElementPropsProcessed> & ElementResult;

export type TextViewComponent = (props?: TextViewProps) => SpecificComponentBasics<TextViewPropsProcessed> & TextViewResult;

export type ToggleComponent = (props?: ToggleProps) => SpecificComponentBasics<TogglePropsProcessed> & ToggleResult;

export type ChoiceComponent = (props?: ChoiceProps) => SpecificComponentBasics<ChoicePropsProcessed> & ChoiceResult;

export type AnonymousChoiceComponent = (
	props?: AnonymousChoiceProps
) => SpecificComponentBasics<AnonymousChoicePropsProcessed> & AnonymousChoiceResult;

export type DialogComponent = (props: DialogProps) => SpecificComponentBasics<DialogPropsProcessed> & DialogResult;

export type AbsoluteLayoutComponent = (props?: AbsoluteLayoutProps) => SpecificComponentBasics<AbsoluteLayoutPropsProcessed> & AbsoluteLayoutResult;

export type StackLayoutComponent = (props?: StackLayoutProps) => SpecificComponentBasics<StackLayoutPropsProcessed> & StackLayoutResult;

export type ScrollViewComponent = (props?: ScrollViewProps) => SpecificComponentBasics<ScrollViewPropsProcessed> & ScrollViewResult;
