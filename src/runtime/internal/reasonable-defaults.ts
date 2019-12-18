import { DefaultPropsOnElement, ComponentProps } from '../interfaces';
import { simpleStore } from 'halyard/store';

export const globalPropsDefaults: DefaultPropsOnElement = {
	hidden: simpleStore(false),
	disabled: simpleStore(false),
	draggable: simpleStore(false),
};

export const widelyUsedPropsDefaults = {
	...globalPropsDefaults,
	style: simpleStore({}),
};

export const propsDefaults: Omit<ComponentProps, 'virtual'> = {
	// Inputs
	button: {
		...widelyUsedPropsDefaults,
		text: simpleStore(``),
	},

	// Text inputs
	textField: {
		...widelyUsedPropsDefaults,
		value: simpleStore(``),
	},
	textView: {
		...widelyUsedPropsDefaults,
		value: simpleStore(``),
	},

	// Options Inputs
	switch: {
		...widelyUsedPropsDefaults,
		checked: simpleStore(false),
	},
	checkbox: {
		...widelyUsedPropsDefaults,
		checked: simpleStore(false),
	},
	//
	slider: {
		...widelyUsedPropsDefaults,
		value: simpleStore(0),
		maxValue: simpleStore(0),
		minValue: simpleStore(0),
		snap: simpleStore(false),
		snapIncrement: simpleStore(0),
	},
	//
	select: {
		...widelyUsedPropsDefaults,
		items: simpleStore([]),
		// Some sort of toggle icon controller
		displayToggleIcon: simpleStore(false),
		selected: simpleStore(null),
	},
	//
	segmentedBar: {
		...widelyUsedPropsDefaults,
		items: simpleStore([]),
		selected: simpleStore(null),
	},
	radio: {
		...widelyUsedPropsDefaults,
		items: simpleStore([]),
		selected: simpleStore(null),
		radioPosition: simpleStore('left'),
		listenForComponentClick: simpleStore(false),
	},

	// Complex options inputs
	datePicker: {
		...widelyUsedPropsDefaults,
		value: simpleStore(null),
	},
	timePicker: {
		...widelyUsedPropsDefaults,
		value: simpleStore(null),
	},
	listPicker: {
		...widelyUsedPropsDefaults,
		values: simpleStore([]),
		value: simpleStore(``),
	},

	// Moving
	activityIndicator: {
		...widelyUsedPropsDefaults,
		spin: simpleStore(false),
	},
	progress: {
		...widelyUsedPropsDefaults,
		value: simpleStore(0),
	},
	dialog: {
		...globalPropsDefaults,
		primaryText: simpleStore(``),
		secondaryText: simpleStore(``),
		content: {
			header: simpleStore(``),
			body: simpleStore(``),
		},
	},
	menu: {
		...widelyUsedPropsDefaults,
		items: simpleStore([]),
		selected: simpleStore(null),
	},

	// Static
	label: {
		...widelyUsedPropsDefaults,
		type: simpleStore(`regular`),
		text: simpleStore(``),
	},
	image: {
		...widelyUsedPropsDefaults,
		src: simpleStore(``),
	},
	htmlView: {
		...globalPropsDefaults,
		html: simpleStore(``),
	},
	listView: {
		...widelyUsedPropsDefaults,
		items: simpleStore([]),
	},
	tabView: {
		...widelyUsedPropsDefaults,
		items: simpleStore([]),
		selected: simpleStore(null),
	},
	tabItem: {
		...widelyUsedPropsDefaults,
		text: simpleStore(``),
	},

	// Layout
	page: {
		...globalPropsDefaults,
		name: simpleStore(``),
		route: simpleStore(``),
		paramaters: simpleStore({}),
		resolve: simpleStore(null),
		defaultChild: simpleStore(``),
	},
	childPageSlot: {
		currentChild: simpleStore(``),
	},
	stackLayout: {
		...widelyUsedPropsDefaults,
		orientation: simpleStore('horizantal'),
	},
	gridLayout: {
		...widelyUsedPropsDefaults,
		columns: simpleStore(0),
		rows: simpleStore(0),
	},
	gridItem: {
		...widelyUsedPropsDefaults,
		columnSpan: simpleStore(0),
		rowSpan: simpleStore(0),
	},
	absoluteLayout: {
		...widelyUsedPropsDefaults,
	},
	wrapLayout: {
		...widelyUsedPropsDefaults,
	},
	dockLayout: {
		...widelyUsedPropsDefaults,
		stretchLastChild: simpleStore(false),
	},
	scrollView: {
		...widelyUsedPropsDefaults,
		scrollPos: simpleStore(0),
	},
	actionBar: {
		...widelyUsedPropsDefaults,
	},

	// Other
	webView: {
		...globalPropsDefaults,
		src: simpleStore(``),
		isLoading: simpleStore(false),
		history: simpleStore([]),
	},
	element: {
		...widelyUsedPropsDefaults,
	},
};
