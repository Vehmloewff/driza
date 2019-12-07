import {
	UserInterface,
	ComponentProps,
	EaseLikeFunction,
	ComponentTypes,
	ComponentBasics,
	UITypes,
} from '../interfaces';
import { createComponentOrElement } from './create-component-or-element';
import { RendererResult } from './renderer';
import { simpleStore, Store } from '../store';
import { Mediator } from '../../utils';
import { propsDefaults } from './reasonable-defaults';

const create = (fn: (props: any, SELF: Omit<ComponentBasics, 'props'>) => any, type: UITypes) =>
	createComponentOrElement(
		(props, SELF) => fn(Object.assign(propsDefaults[type], props), SELF),
		type
	);

export const createUI = (): UserInterface => ({
	// Inputs
	button: create(() => {}, 'select'),

	// Text inputs
	textField: create(() => {}, 'select'),

	textView: create(() => {}, 'select'),

	// Options Inputs
	switch: create(() => {}, 'select'),

	checkbox: create(() => {}, 'select'),

	//
	slider: create(() => {}, 'select'),

	//
	select: create(() => {}, 'select'),

	//
	segmentedBar: create(() => {}, 'select'),

	radio: create(() => {}, 'select'),

	// Complex options inputs
	datePicker: create(() => {}, 'select'),

	timePicker: create(() => {}, 'select'),

	listPicker: create(() => {}, 'select'),

	// Moving
	activityIndicator: create(() => {}, 'select'),

	progress: create(() => {}, 'select'),

	dialogs: create(() => {}, 'select'),

	menu: create(() => {}, 'select'),

	// Static
	label: create(() => {}, 'select'),

	image: create(() => {}, 'select'),

	htmlView: create(() => {}, 'select'),

	listView: create(() => {}, 'select'),

	tabView: create(() => {}, 'select'),

	tabItem: create(() => {}, 'select'),

	// Layout
	page: create((__, SELF) => {
		const mediator: Store<Mediator> = simpleStore(null);

		SELF.once(`create`, (data: RendererResult) => mediator.set(data.mediator));

		return {
			go: async (route: string, params: { [key: string]: any }) => {
				const unsubscribe = mediator.subscribe(mediator => {
					if (!mediator) return;

					mediator.call(`navigate`, {
						params,
						route,
					});

					unsubscribe();
				});
			},
		};
	}, 'select'),

	childPageSlot: create(() => {}, 'select'),

	stackLayout: create(() => {}, 'select'),

	gridLayout: create(() => {}, 'select'),

	absoluteLayout: create(() => {}, 'select'),

	wrapLayout: create(() => {}, 'select'),

	scrollView: create(
		(props: ComponentProps['scrollView']) => ({
			scrollTo: async (pos: number, easing: EaseLikeFunction) => {},
		}),
		'select'
	),

	actionBar: create(() => {}, 'select'),

	// Other
	webView: create((props: ComponentProps['webView'], SELF) => {
		const mediator: Store<Mediator> = simpleStore(null);

		SELF.once(`create`, (data: RendererResult) => mediator.set(data.mediator));

		const callMediator = (name: string): Promise<void> => {
			return new Promise(resolve => {
				const unsubscribe = mediator.subscribe(async mediator => {
					if (!mediator) return;

					await mediator.call(name, null);

					unsubscribe();

					resolve();
				});
			});
		};

		const history = {
			...props.history,
			back: () => callMediator(`webview-history-back`),
			foward: () => callMediator(`webview-history-foward`),
		};

		return {
			history,
		};
	}, 'select'),
});
