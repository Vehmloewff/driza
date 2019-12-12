import { Store } from './store';
import { GlobalStyles, GlobalStates, TextStyles, InputStyles } from './style/interfaces';
import { Color } from './style/color';
import { Font } from './style/font';

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
	| 'dialogs'
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

interface SliderStyles extends GlobalStyles {
	thumb?: GlobalStyles & GlobalStates<GlobalStyles>;
	showCrosscuts?: boolean;
	crossCutWidth?: number;
	crossCutColor?: Color;
}

export interface ComponentProps {
	// Inputs
	button: DefaultPropsOnElement & {
		text?: Store<string>;
		style?: Store<GlobalStyles & TextStyles & GlobalStates<GlobalStyles & TextStyles>>;
	};

	// Text inputs
	textField: DefaultPropsOnElement & {
		value?: Store<string>;
		style?: Store<GlobalStyles & InputStyles & GlobalStates<GlobalStyles & InputStyles>>;
	};
	textView: DefaultPropsOnElement & {
		value?: Store<string>;
		style?: Store<GlobalStyles & InputStyles & GlobalStates<GlobalStyles & InputStyles>>;
	};

	// Options Inputs
	switch: DefaultPropsOnElement & {
		checked?: Store<boolean>;
		style?: Store<
			GlobalStyles &
				GlobalStates<GlobalStyles> & {
					checked?: GlobalStyles;
					checkedAndHover?: GlobalStyles;
					thumb?: Omit<ComponentProps['switch']['style'], 'thumb'>;
				}
		>;
	};
	checkbox: DefaultPropsOnElement & {
		checked?: Store<boolean>;
		// TODO: Add some sort of check svg
		// BODY: Maybe an icon component?
		style?: Store<
			GlobalStyles &
				GlobalStates<GlobalStyles> & {
					checked?: GlobalStyles;
					checkedAndHover?: GlobalStyles;
					inner?: Omit<ComponentProps['checkbox']['style'], 'inner'> & {
						checkColor?: Color;
					};
				}
		>;
	};
	//
	slider: DefaultPropsOnElement & {
		value?: Store<number>;
		maxValue?: Store<number>;
		minValue?: Store<number>;
		snap?: Store<boolean>;
		snapIncrement?: Store<number>;
		style?: Store<SliderStyles & GlobalStates<SliderStyles>>;
	};
	//
	select: DefaultPropsOnElement & {
		items?: Store<{ groupName: string; items: PublicComponentBasics[] }[]>;
		// Some sort of toggle icon controller
		displayToggleIcon?: Store<boolean>;
		selected?: Store<PublicComponentBasics>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	//
	segmentedBar: DefaultPropsOnElement & {
		items?: Store<PublicComponentBasics[]>;
		selected?: Store<PublicComponentBasics>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	radio: DefaultPropsOnElement & {
		items?: Store<PublicComponentBasics[]>;
		selected?: Store<PublicComponentBasics>;
		radioPosition?: Store<'top' | 'right' | 'bottom' | 'left'>;
		listenForComponentClick?: Store<boolean>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};

	// Complex options inputs
	datePicker: DefaultPropsOnElement & {
		value?: Store<Date>;
		style?: Store<GlobalStyles>;
	};
	timePicker: DefaultPropsOnElement & {
		value?: Store<Date>;
		style?: Store<GlobalStyles>;
	};
	listPicker: DefaultPropsOnElement & {
		values?: Store<string[]>;
		value?: Store<string>;
		style?: Store<GlobalStyles>;
	};

	// Moving
	activityIndicator: DefaultPropsOnElement & {
		spin?: Store<boolean>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	progress: DefaultPropsOnElement & {
		value: Store<number>;
		style?: Store<GlobalStyles & { mainColor?: Color } & GlobalStates<GlobalStyles & { mainColor?: Color }>>;
	};
	dialogs: DefaultPropsOnElement & {
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
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};

	// Static
	label: DefaultPropsOnElement & {
		text?: Store<string>;
		style?: Store<GlobalStyles & TextStyles & GlobalStates<GlobalStyles & TextStyles>>;
	};
	image: DefaultPropsOnElement & {
		src?: Store<string>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	htmlView: DefaultPropsOnElement & {
		html?: Store<string>;
	};
	listView: DefaultPropsOnElement & {
		items?: Store<PublicComponentBasics[]>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	tabView: DefaultPropsOnElement & {
		items?: Store<PublicComponentBasics[]>;
		selected?: Store<PublicComponentBasics>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	tabItem: DefaultPropsOnElement & {
		text?: Store<string>;
		// Some sort of icon
		style?: Store<GlobalStyles & TextStyles & GlobalStates<GlobalStyles & TextStyles>>;
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
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
		orientation?: Store<'horizantal' | 'vertical'>;
	};
	gridLayout: DefaultPropsOnElement & {
		columns?: Store<number>;
		rows?: Store<number>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	gridItem: DefaultPropsOnElement & {
		columnSpan?: Store<number>;
		rowSpan?: Store<number>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	absoluteLayout: DefaultPropsOnElement & {
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	wrapLayout: DefaultPropsOnElement & {
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	dockLayout: DefaultPropsOnElement & {
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
		stretchLastChild?: Store<boolean>;
	};
	scrollView: DefaultPropsOnElement & {
		scrollPos?: Store<number>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	actionBar: DefaultPropsOnElement & {
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};

	// Other
	webView: DefaultPropsOnElement & {
		src: Store<string>;
		isLoading: Store<boolean>;
		history: Store<string[]>;
	};
	element: DefaultPropsOnElement & {
		style: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	virtual: { [key: string]: any };
}

export interface Renderer<RendererResult> {
	root: () => RendererResult;
	component: (values: {
		type: ComponentTypes;
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
	children: Store<PublicComponentBasics[]>;
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

export interface PublicRenderShortcut<Element> {
	$: (...children: PublicComponentBasics[]) => Element;
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
	dialogs: (props?: ComponentProps['dialogs']) => PublicComponentBasics;
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
		PublicRenderShortcut<PublicComponentBasics & { go: (route: string, params: { [key: string]: any }) => Promise<void> }> & {
			go: (route: string, params: { [key: string]: any }) => Promise<void>;
		};
	childPageSlot: (props?: ComponentProps['childPageSlot']) => PublicComponentBasics;
	stackLayout: (
		props?: ComponentProps['stackLayout']
	) => TransitionApplicableResult<UserInterface['stackLayout'], ComponentProps['stackLayout']['style']> &
		PublicRenderShortcut<TransitionApplicableResult<UserInterface['stackLayout'], ComponentProps['stackLayout']['style']>>;
	gridLayout: (
		props?: ComponentProps['gridLayout']
	) => TransitionApplicableResult<UserInterface['gridLayout'], ComponentProps['gridLayout']['style']> &
		PublicRenderShortcut<TransitionApplicableResult<UserInterface['gridLayout'], ComponentProps['gridLayout']['style']>>;
	absoluteLayout: (
		props?: ComponentProps['absoluteLayout']
	) => TransitionApplicableResult<UserInterface['absoluteLayout'], ComponentProps['absoluteLayout']['style']> &
		PublicRenderShortcut<TransitionApplicableResult<UserInterface['absoluteLayout'], ComponentProps['absoluteLayout']['style']>>;
	wrapLayout: (
		props?: ComponentProps['wrapLayout']
	) => TransitionApplicableResult<UserInterface['wrapLayout'], ComponentProps['wrapLayout']['style']> &
		PublicRenderShortcut<TransitionApplicableResult<UserInterface['wrapLayout'], ComponentProps['wrapLayout']['style']>>;
	scrollView: (
		props?: ComponentProps['scrollView']
	) => TransitionApplicableResult<UserInterface['button'], ComponentProps['button']['style']> &
		PublicRenderShortcut<TransitionApplicableResult<UserInterface['button'], ComponentProps['button']['style']>> & {
			scrollTo: (pos: number, easing: EaseLikeFunction) => Promise<void>;
		};
	actionBar: (
		props?: ComponentProps['actionBar']
	) => TransitionApplicableResult<UserInterface['actionBar'], ComponentProps['actionBar']['style']> &
		PublicRenderShortcut<TransitionApplicableResult<UserInterface['actionBar'], ComponentProps['actionBar']['style']>>;

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
		PublicRenderShortcut<TransitionApplicableResult<UserInterface['element'], ComponentProps['element']['style']>>;
}

export type EaseLikeFunction = (t: number) => number;

export type ComponentConstructor<Props> = (props: Props, UI: UserInterface, SELF: ComponentBasics) => any;

export interface Mediator {
	provide: <Arg, ReturnType>(name: string, fn: (arg: Arg) => ReturnType) => () => void;
	call: <Arg, ReturnType>(name: string, arg: Arg) => ReturnType;
}
