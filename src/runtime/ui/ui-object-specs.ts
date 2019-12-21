import {
	WebViewComponent,
	HtmlViewComponent,
	VideoComponent,
	ImageComponent,
	AudioComponent,
	LabelComponent,
	ElementComponent,
	TextViewComponent,
	ToggleComponent,
	ChoiceComponent,
	AnonymousChoiceComponent,
	DialogComponent,
	AbsoluteLayoutComponent,
	StackLayoutComponent,
	ScrollViewComponent,
} from './ui-components';

export interface UserInterface {
	WebView: WebViewComponent;
	HtmlView: HtmlViewComponent;
	Image: ImageComponent;
	Video: VideoComponent;
	Audio: AudioComponent;
	Label: LabelComponent;
	Element: ElementComponent;
	TextView: TextViewComponent;
	Toggle: ToggleComponent;
	Choice: ChoiceComponent;
	AnonymousChoice: AnonymousChoiceComponent;
	Dialog: DialogComponent;
	AbsoluteLayout: AbsoluteLayoutComponent;
	StackLayout: StackLayoutComponent;
	ScrollView: ScrollViewComponent;
}
