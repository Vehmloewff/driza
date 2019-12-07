import { Store } from './store';
import { GlobalStyles, GlobalStates, TextStyles, InputStyles } from './style/interfaces';

export type ComponentTypes =
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
	| 'stackLayout'
	| 'gridLayout'
	| 'absoluteLayout'
	| 'wrapLayout'
	| 'scrollView'
	| 'actionBar'

	// Other
	| 'virtual'
	| 'webView';

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
		// TODO?: Some sort of check svg
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
		items?: Store<{ groupName: string; items: ComponentBasics[] }[]>;
		// Some sort of toggle icon controller
		displayToggleIcon?: Store<boolean>;
		selected?: Store<ComponentBasics>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	//
	segmentedBar: DefaultPropsOnElement & {
		items?: Store<ComponentBasics[]>;
		selected?: Store<ComponentBasics>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	radio: DefaultPropsOnElement & {
		items?: Store<ComponentBasics[]>;
		selected?: Store<ComponentBasics>;
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
		style?: Store<
			GlobalStyles & { mainColor: Color } & GlobalStates<GlobalStyles & { mainColor: Color }>
		>;
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
		items?: Store<{ groupName: string; items: ComponentBasics[] }[]>;
		selected?: Store<ComponentBasics>;
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
		items?: Store<ComponentBasics[]>;
		style?: Store<GlobalStyles & GlobalStates<GlobalStyles>>;
	};
	tabView: DefaultPropsOnElement & {
		items?: Store<ComponentBasics[]>;
		selected?: Store<ComponentBasics>;
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
		resolve?: Store<
			(paramaters: { [key: string]: any }) => Promise<void | string> | void | string
		>;
		defaultChild?: Store<string>;
	};
	childSlot: {
		currentChild: Store<string>;
	};
	stackLayout: DefaultPropsOnElement & {
		style?: GlobalStyles & GlobalStates<GlobalStyles>;
		orientation?: Store<'horizantal' | 'vertical'>;
	};
	gridLayout: DefaultPropsOnElement & {
		columns?: Store<number>;
		rows?: Store<number>;
		style?: GlobalStyles & GlobalStates<GlobalStyles>;
	};
	gridItem: DefaultPropsOnElement & {
		columnSpan?: Store<number>;
		rowSpan?: Store<number>;
		style?: GlobalStyles & GlobalStates<GlobalStyles>;
	};
	absoluteLayout: DefaultPropsOnElement & {
		style?: GlobalStyles & GlobalStates<GlobalStyles>;
	};
	wrapLayout: DefaultPropsOnElement & {
		style?: GlobalStyles & GlobalStates<GlobalStyles>;
	};
	dockLayout: DefaultPropsOnElement & {
		style?: GlobalStyles & GlobalStates<GlobalStyles>;
		stretchLastChild?: Store<boolean>;
	};
	scrollView: DefaultPropsOnElement & {
		scrollPos?: Store<number>;
		style?: GlobalStyles & GlobalStates<GlobalStyles>;
	};
	actionBar: DefaultPropsOnElement & {
		style?: GlobalStyles & GlobalStates<GlobalStyles>;
	};

	// Other
	webView: DefaultPropsOnElement & {
		src: Store<string>;
		isLoading: Store<boolean>;
	};
	virtual: { [key: string]: any };
}

export interface Renderer<RendererResult> {
	root: () => RendererResult;
	component: (values: {
		type: ComponentTypes;
		order: RendererResult[];
		parent: RendererResult;
		props: ComponentProps[ComponentTypes];
		removed: Store<boolean>;
		dispatch: (event: string, data?: any) => Promise<void>;
	}) => RendererResult;
}

// The core fundamentals of all components
export interface ComponentBasics {
	on: (event: string, cb: (data?: any) => Promise<void> | void) => void;
	destroy: () => void;
	reMount: () => void;
	removed: Store<boolean>;
	dispatch: (event: string, data?: any) => Promise<void>;
	props: ComponentProps[ComponentTypes];
}

export interface AdditionalComponentValues {
	[name: string]: any;
}

export interface UserInterface {
	// Inputs
	button: (props: ComponentProps['button']) => ComponentBasics;

	// Text inputs
	textField: (props: ComponentProps['textField']) => ComponentBasics;
	textView: (props: ComponentProps['textView']) => ComponentBasics;
	search: (props: ComponentProps[ComponentTypes]) => ComponentBasics;

	// Options Inputs
	switch: (props: ComponentProps['switch']) => ComponentBasics;
	checkbox: (props: ComponentProps['checkbox']) => ComponentBasics;
	//
	slider: (props: ComponentProps['slider']) => ComponentBasics;
	//
	select: (props: ComponentProps['select']) => ComponentBasics;
	//
	segmentedBar: (props: ComponentProps['segmentedBar']) => ComponentBasics;
	radio: (props: ComponentProps['radio']) => ComponentBasics;

	// Complex options inputs
	datePicker: (props: ComponentProps['datePicker']) => ComponentBasics;
	timePicker: (props: ComponentProps['timePicker']) => ComponentBasics;
	listPicker: (props: ComponentProps['listPicker']) => ComponentBasics;

	// Moving
	activityIndicator: (props: ComponentProps['activityIndicator']) => ComponentBasics;
	progress: (props: ComponentProps['progress']) => ComponentBasics;
	dialogs: (props: ComponentProps['dialogs']) => ComponentBasics;
	menu: (props: ComponentProps['menu']) => ComponentBasics;

	// Static
	label: (props: ComponentProps['label']) => ComponentBasics;
	image: (props: ComponentProps['image']) => ComponentBasics;
	htmlView: (props: ComponentProps['htmlView']) => ComponentBasics;
	listView: (props: ComponentProps['listView']) => ComponentBasics;
	tabView: (props: ComponentProps['tabView']) => ComponentBasics;
	tabItem: (props: ComponentProps['tabItem']) => ComponentBasics;

	// Layout
	page: (
		props: ComponentProps['page']
	) => ComponentBasics & {
		go: (route: string, params: { [key: string]: any }) => Promise<void>;
	};
	childSlot: (props: ComponentProps['childSlot']) => ComponentBasics;
	stackLayout: (props: ComponentProps['stackLayout']) => ComponentBasics;
	gridLayout: (props: ComponentProps['gridLayout']) => ComponentBasics;
	absoluteLayout: (props: ComponentProps['absoluteLayout']) => ComponentBasics;
	wrapLayout: (props: ComponentProps['wrapLayout']) => ComponentBasics;
	scrollView: (
		props: ComponentProps['scrollView']
	) => ComponentBasics & {
		scrollTo: (pos: number) => Promise<void>;
	};
	actionBar: (props: ComponentProps['actionBar']) => ComponentBasics;

	// Other
	webView: (
		props: ComponentProps['webView']
	) => ComponentBasics & {
		history: Store<string[]> & {
			back: () => Promise<void>;
			foward: () => Promise<void>;
		};
	};
}
