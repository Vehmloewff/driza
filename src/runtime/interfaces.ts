import { Store } from './store';
import { GlobalStyles, GlobalStates, TextStyles, InputStyles } from './style/interfaces';
import { Color } from './style/color';
import { Font } from './style/font';
import {
	ButtonStyles,
	TextFieldStyles,
	TextViewStyles,
	SwitchStyles,
	CheckboxStyles,
	SliderStyles,
	SelectStyles,
	SegmentedBarStyles,
	RadioStyles,
	DatePickerStyles,
	TimePickerStyles,
	ListPickerStyles,
	ActivityIndicatorStyles,
	ProgressStyles,
	MenuStyles,
	LabelStyles,
	ImageStyles,
	ListViewStyles,
	TabViewStyles,
	TabItemStyles,
	StackLayoutStyles,
	GridLayoutStyles,
	GridItemStyles,
	AbsoluteLayoutStyles,
	WrapLayoutStyles,
	DockLayoutStyles,
	ScrollViewStyles,
	ActionBarStyles,
	ElementStyles,
} from './style/element-styles';

export type UITypes =
	// Inputs
	| 'button'

	// Text inputs
	| 'textField'
	| 'textView'

	// Options Inputs
	| 'switch'
	| 'checkbox'
	//
	| 'slider'
	//
	| 'select'
	//
	| 'segmentedBar'
	| 'radio'

	// Complex options inputs
	| 'datePicker'
	| 'timePicker'
	| 'listPicker'

	// Moving
	| 'activityIndicator'
	| 'progress'
	| 'dialog'
	| 'menu'

	// Static
	| 'label'
	| 'image'
	| 'htmlView'
	| 'listView'
	| 'tabView'
	| 'tabItem'

	// Layout
	| 'page'
	| 'childPageSlot'
	| 'stackLayout'
	| 'gridLayout'
	| 'absoluteLayout'
	| 'wrapLayout'
	| 'scrollView'
	| 'actionBar'

	// Other
	| 'webView'
	| 'element';

export type ComponentTypes = UITypes | 'virtual';

export interface DefaultPropsOnElement {
	disabled?: Store<boolean>;
	hidden?: Store<boolean>;
	draggable?: Store<boolean>;
}

export interface ComponentProps {
	// Inputs
	button: DefaultPropsOnElement & {
		text?: Store<string>;
		style?: Store<ButtonStyles>;
	};

	// Text inputs
	textField: DefaultPropsOnElement & {
		value?: Store<string>;
		placeholder?: Store<string>;
		style?: Store<TextFieldStyles>;
	};
	textView: DefaultPropsOnElement & {
		value?: Store<string>;
		placeholder?: Store<string>;
		style?: Store<TextViewStyles>;
	};

	// Options Inputs
	switch: DefaultPropsOnElement & {
		checked?: Store<boolean>;
		style?: Store<SwitchStyles>;
	};
	checkbox: DefaultPropsOnElement & {
		checked?: Store<boolean>;
		// TODO: Add some sort of check svg
		// BODY: Maybe an icon component?
		style?: Store<CheckboxStyles>;
	};
	//
	slider: DefaultPropsOnElement & {
		value?: Store<number>;
		maxValue?: Store<number>;
		minValue?: Store<number>;
		snap?: Store<boolean>;
		snapIncrement?: Store<number>;
		style?: Store<SliderStyles>;
	};
	//
	select: DefaultPropsOnElement & {
		items?: Store<{ groupName: string; items: PublicComponentBasics[] }[]>;
		// Some sort of toggle icon controller
		displayToggleIcon?: Store<boolean>;
		selected?: Store<PublicComponentBasics>;
		style?: Store<SelectStyles>;
	};
	//
	segmentedBar: DefaultPropsOnElement & {
		items?: Store<PublicComponentBasics[]>;
		selected?: Store<PublicComponentBasics>;
		style?: Store<SegmentedBarStyles>;
	};
	radio: DefaultPropsOnElement & {
		items?: Store<PublicComponentBasics[]>;
		selected?: Store<PublicComponentBasics>;
		radioPosition?: Store<'top' | 'right' | 'bottom' | 'left'>;
		listenForComponentClick?: Store<boolean>;
		style?: Store<RadioStyles>;
	};

	// Complex options inputs
	datePicker: DefaultPropsOnElement & {
		value?: Store<Date>;
		style?: Store<DatePickerStyles>;
	};
	timePicker: DefaultPropsOnElement & {
		value?: Store<Date>;
		style?: Store<TimePickerStyles>;
	};
	listPicker: DefaultPropsOnElement & {
		values?: Store<string[]>;
		value?: Store<string>;
		style?: Store<ListPickerStyles>;
	};

	// Moving
	activityIndicator: DefaultPropsOnElement & {
		spin?: Store<boolean>;
		style?: Store<ActivityIndicatorStyles>;
	};
	progress: DefaultPropsOnElement & {
		value: Store<number>;
		style?: Store<ProgressStyles>;
	};
	dialog: DefaultPropsOnElement & {
		primaryText?: Store<string>;
		secondaryText?: Store<string>;
		content?: {
			header?: Store<string>;
			body?: Store<string>;
		};
	};
	menu: DefaultPropsOnElement & {
		items?: Store<{ groupName: string; items: PublicComponentBasics[] }[]>;
		selected?: Store<PublicComponentBasics>;
		style?: Store<MenuStyles>;
	};

	// Static
	label: DefaultPropsOnElement & {
		text?: Store<string>;
		type?: Store<string>;
		style?: Store<LabelStyles>;
	};
	image: DefaultPropsOnElement & {
		src?: Store<string>;
		style?: Store<ImageStyles>;
	};
	htmlView: DefaultPropsOnElement & {
		html?: Store<string>;
	};
	listView: DefaultPropsOnElement & {
		items?: Store<PublicComponentBasics[]>;
		style?: Store<ListViewStyles>;
	};
	tabView: DefaultPropsOnElement & {
		items?: Store<PublicComponentBasics[]>;
		selected?: Store<PublicComponentBasics>;
		style?: Store<TabViewStyles>;
	};
	tabItem: DefaultPropsOnElement & {
		text?: Store<string>;
		// Some sort of icon
		style?: Store<TabItemStyles>;
	};

	// Layout
	page: DefaultPropsOnElement & {
		name: Store<string>;
		route: Store<string>;
		paramaters?: Store<{ [key: string]: any }>;
		resolve?: Store<(paramaters: { [key: string]: any }) => Promise<void | string> | void | string>;
		defaultChild?: Store<string>;
	};
	childPageSlot: {
		currentChild: Store<string>;
	};
	stackLayout: DefaultPropsOnElement & {
		style?: Store<StackLayoutStyles>;
		orientation?: Store<'horizantal' | 'vertical'>;
	};
	gridLayout: DefaultPropsOnElement & {
		columns?: Store<number>;
		rows?: Store<number>;
		style?: Store<GridLayoutStyles>;
	};
	gridItem: DefaultPropsOnElement & {
		columnSpan?: Store<number>;
		rowSpan?: Store<number>;
		style?: Store<GridItemStyles>;
	};
	absoluteLayout: DefaultPropsOnElement & {
		style?: Store<AbsoluteLayoutStyles>;
	};
	wrapLayout: DefaultPropsOnElement & {
		style?: Store<WrapLayoutStyles>;
	};
	dockLayout: DefaultPropsOnElement & {
		style?: Store<DockLayoutStyles>;
		stretchLastChild?: Store<boolean>;
	};
	scrollView: DefaultPropsOnElement & {
		scrollPos?: Store<number>;
		style?: Store<ScrollViewStyles>;
	};
	actionBar: DefaultPropsOnElement & {
		style?: Store<ActionBarStyles>;
	};

	// Other
	webView: DefaultPropsOnElement & {
		src: Store<string>;
		isLoading: Store<boolean>;
		history: Store<string[]>;
	};
	element: DefaultPropsOnElement & {
		style: Store<ElementStyles>;
	};
	virtual: { [key: string]: any };
}

export interface Renderer<RendererResult> {
	root: () => RendererResult;
	component: (values: {
		rendererCreated: boolean;
		order: Store<RendererResult[]>;
		parent: RendererResult;
		props: ComponentProps[ComponentTypes];
		removed: Store<boolean>;
		dispatch: (event: string, data?: any) => Promise<number>;
	}) => RendererResult;
	applyFont: (params: Font) => Promise<void>;
}

export type EventListener = (data: any | undefined, args: any[], addArg: (data: any) => void) => Promise<void> | void;

// The core fundamentals of all components
export interface PublicComponentBasics {
	on: (event: string, cb: EventListener) => void;
	once: (event: string, cb: EventListener) => void;
	destroy: () => void;
	reMount: () => void;
	removed: Store<boolean>;
	dispatch: (event: string, data?: any) => Promise<number>;
	props: ComponentProps[ComponentTypes];
	hasBeenRendered: Store<boolean>;
	type: () => ComponentTypes;
}

export interface ComponentBasics extends PublicComponentBasics {
	render: (...components: PublicComponentBasics[]) => Promise<void>;
}

export type PotentialKeys = 'in' | 'out' | 'transition' | string;

export interface AnimationParamaters {
	[key: string]: any;
}

export interface TransitionApplicableResult<Element, Style> extends PublicComponentBasics {
	potential: {
		add: (key: PotentialKeys, fn: Animation<Element, Style>, defaultParamaters: AnimationParamaters, local: boolean) => () => void;
		fire: (key: PotentialKeys, params?: AnimationParamaters) => Promise<void>;
	};
}

export interface PublicChildren<Element> {
	$: (...children: PublicComponentBasics[]) => Element;
	children: Store<PublicComponentBasics[]>;
}

export type Animation<Element, Styles> = (
	component: Element,
	params: any
) => {
	duration?: number;
	delay?: number;
	style?: (fn: (t: number) => Styles | void) => void;
	tick?: (fn: (t: number) => void) => void;
};

export interface AdditionalComponentValues {
	[name: string]: any;
}

export interface UserInterface {
	// Inputs
	button: (props?: ComponentProps['button']) => TransitionApplicableResult<UserInterface['button'], ComponentProps['button']['style']>;

	// Text inputs
	textField: (props?: ComponentProps['textField']) => TransitionApplicableResult<UserInterface['textField'], ComponentProps['textField']['style']>;
	textView: (props?: ComponentProps['textView']) => TransitionApplicableResult<UserInterface['textView'], ComponentProps['textView']['style']>;

	// Options Inputs
	switch: (props?: ComponentProps['switch']) => TransitionApplicableResult<UserInterface['switch'], ComponentProps['switch']['style']>;
	checkbox: (props?: ComponentProps['checkbox']) => TransitionApplicableResult<UserInterface['checkbox'], ComponentProps['checkbox']['style']>;
	//
	slider: (props?: ComponentProps['slider']) => TransitionApplicableResult<UserInterface['slider'], ComponentProps['slider']['style']>;
	//
	select: (props?: ComponentProps['select']) => TransitionApplicableResult<UserInterface['select'], ComponentProps['select']['style']>;
	//
	segmentedBar: (
		props?: ComponentProps['segmentedBar']
	) => TransitionApplicableResult<UserInterface['segmentedBar'], ComponentProps['segmentedBar']['style']>;
	radio: (props?: ComponentProps['radio']) => TransitionApplicableResult<UserInterface['radio'], ComponentProps['radio']['style']>;

	// Complex options inputs
	datePicker: (
		props?: ComponentProps['datePicker']
	) => TransitionApplicableResult<UserInterface['datePicker'], ComponentProps['datePicker']['style']>;
	timePicker: (
		props?: ComponentProps['timePicker']
	) => TransitionApplicableResult<UserInterface['timePicker'], ComponentProps['timePicker']['style']>;
	listPicker: (
		props?: ComponentProps['listPicker']
	) => TransitionApplicableResult<UserInterface['listPicker'], ComponentProps['listPicker']['style']>;

	// Moving
	activityIndicator: (
		props?: ComponentProps['activityIndicator']
	) => TransitionApplicableResult<UserInterface['activityIndicator'], ComponentProps['activityIndicator']['style']>;
	progress: (props?: ComponentProps['progress']) => TransitionApplicableResult<UserInterface['progress'], ComponentProps['progress']['style']>;
	dialog: (props?: ComponentProps['dialog']) => PublicComponentBasics;
	menu: (props?: ComponentProps['menu']) => TransitionApplicableResult<UserInterface['menu'], ComponentProps['menu']['style']>;

	// Static
	label: (props?: ComponentProps['label']) => TransitionApplicableResult<UserInterface['label'], ComponentProps['label']['style']>;
	image: (props?: ComponentProps['image']) => TransitionApplicableResult<UserInterface['image'], ComponentProps['image']['style']>;
	htmlView: (props?: ComponentProps['htmlView']) => PublicComponentBasics;
	listView: (props?: ComponentProps['listView']) => TransitionApplicableResult<UserInterface['listView'], ComponentProps['listView']['style']>;
	tabView: (props?: ComponentProps['tabView']) => TransitionApplicableResult<UserInterface['tabView'], ComponentProps['tabView']['style']>;
	tabItem: (props?: ComponentProps['tabItem']) => TransitionApplicableResult<UserInterface['tabItem'], ComponentProps['tabItem']['style']>;

	// Layout
	page: (
		props?: ComponentProps['page']
	) => PublicComponentBasics &
		PublicChildren<PublicComponentBasics & { go: (route: string, params: { [key: string]: any }) => Promise<void> }> & {
			go: (route: string, params: { [key: string]: any }) => Promise<void>;
		};
	childPageSlot: (props?: ComponentProps['childPageSlot']) => PublicComponentBasics;
	stackLayout: (
		props?: ComponentProps['stackLayout']
	) => TransitionApplicableResult<UserInterface['stackLayout'], ComponentProps['stackLayout']['style']> &
		PublicChildren<TransitionApplicableResult<UserInterface['stackLayout'], ComponentProps['stackLayout']['style']>>;
	gridLayout: (
		props?: ComponentProps['gridLayout']
	) => TransitionApplicableResult<UserInterface['gridLayout'], ComponentProps['gridLayout']['style']> &
		PublicChildren<TransitionApplicableResult<UserInterface['gridLayout'], ComponentProps['gridLayout']['style']>>;
	absoluteLayout: (
		props?: ComponentProps['absoluteLayout']
	) => TransitionApplicableResult<UserInterface['absoluteLayout'], ComponentProps['absoluteLayout']['style']> &
		PublicChildren<TransitionApplicableResult<UserInterface['absoluteLayout'], ComponentProps['absoluteLayout']['style']>>;
	wrapLayout: (
		props?: ComponentProps['wrapLayout']
	) => TransitionApplicableResult<UserInterface['wrapLayout'], ComponentProps['wrapLayout']['style']> &
		PublicChildren<TransitionApplicableResult<UserInterface['wrapLayout'], ComponentProps['wrapLayout']['style']>>;
	scrollView: (
		props?: ComponentProps['scrollView']
	) => TransitionApplicableResult<UserInterface['button'], ComponentProps['button']['style']> &
		PublicChildren<TransitionApplicableResult<UserInterface['button'], ComponentProps['button']['style']>> & {
			scrollTo: (pos: number, easing: EaseLikeFunction) => Promise<void>;
		};
	actionBar: (
		props?: ComponentProps['actionBar']
	) => TransitionApplicableResult<UserInterface['actionBar'], ComponentProps['actionBar']['style']> &
		PublicChildren<TransitionApplicableResult<UserInterface['actionBar'], ComponentProps['actionBar']['style']>>;

	// Other
	webView: (
		props?: ComponentProps['webView']
	) => PublicComponentBasics & {
		history: Store<string[]> & {
			back: () => Promise<void>;
			foward: () => Promise<void>;
		};
	};
	element: (
		props?: ComponentProps['element']
	) => TransitionApplicableResult<UserInterface['element'], ComponentProps['element']['style']> &
		PublicChildren<TransitionApplicableResult<UserInterface['element'], ComponentProps['element']['style']>>;
}
export type EaseLikeFunction = (t: number) => number;

export type ComponentConstructor<Props> = (props: Props, UI: UserInterface, SELF: ComponentBasics) => any;

export interface Mediator {
	provide: <Arg, ReturnType>(name: string, fn: (arg: Arg) => ReturnType) => () => void;
	call: <Arg, ReturnType>(name: string, arg: Arg) => ReturnType;
}

export interface ComponentBasics {
	on: (event: string, cb: EventListener) => void;
	once: (event: string, cb: EventListener) => void;
	destroy: () => void;
	reMount: () => void;
	removed: Store<boolean>;
	dispatch: (event: string, data?: any) => Promise<number>;
	props: { [key: string]: any };
	hasBeenRendered: Store<boolean>;
	type: () => ComponentTypes;
}

export interface ComponentInstance {
	on: (event: string, cb: EventListener) => void;
	once: (event: string, cb: EventListener) => void;
	destroy: () => void;
	reMount: () => void;
	removed: Store<boolean>;
	dispatch: (event: string, data?: any) => Promise<number>;
	props: { [key: string]: any };
	hasBeenRendered: Store<boolean>;
	rendererCreated: boolean;
	[key: string]: any;
}

export type Component = (props: { [key: string]: any }) => ComponentInstance;
