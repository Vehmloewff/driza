import { UserInterface, ComponentProps, EaseLikeFunction } from '../interfaces';
import { createComponentOrElement } from './create-component-or-element';
import { RendererResult } from './renderer';
import { simpleStore, Store } from '../store';
import { Mediator } from '../../utils';

export const createUI = (): UserInterface => ({
	// Inputs
	button: createComponentOrElement(() => {}, 'select'),

	// Text inputs
	textField: createComponentOrElement(() => {}, 'select'),

	textView: createComponentOrElement(() => {}, 'select'),

	// Options Inputs
	switch: createComponentOrElement(() => {}, 'select'),

	checkbox: createComponentOrElement(() => {}, 'select'),

	//
	slider: createComponentOrElement(() => {}, 'select'),

	//
	select: createComponentOrElement(() => {}, 'select'),

	//
	segmentedBar: createComponentOrElement(() => {}, 'select'),

	radio: createComponentOrElement(() => {}, 'select'),

	// Complex options inputs
	datePicker: createComponentOrElement(() => {}, 'select'),

	timePicker: createComponentOrElement(() => {}, 'select'),

	listPicker: createComponentOrElement(() => {}, 'select'),

	// Moving
	activityIndicator: createComponentOrElement(() => {}, 'select'),

	progress: createComponentOrElement(() => {}, 'select'),

	dialogs: createComponentOrElement(() => {}, 'select'),

	menu: createComponentOrElement(() => {}, 'select'),

	// Static
	label: createComponentOrElement(() => {}, 'select'),

	image: createComponentOrElement(() => {}, 'select'),

	htmlView: createComponentOrElement(() => {}, 'select'),

	listView: createComponentOrElement(() => {}, 'select'),

	tabView: createComponentOrElement(() => {}, 'select'),

	tabItem: createComponentOrElement(() => {}, 'select'),

	// Layout
	page: createComponentOrElement((__, SELF) => {
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

	childPageSlot: createComponentOrElement(() => {}, 'select'),

	stackLayout: createComponentOrElement(() => {}, 'select'),

	gridLayout: createComponentOrElement(() => {}, 'select'),

	absoluteLayout: createComponentOrElement(() => {}, 'select'),

	wrapLayout: createComponentOrElement(() => {}, 'select'),

	scrollView: createComponentOrElement(
		(props: ComponentProps['scrollView']) => ({
			scrollTo: async (pos: number, easing: EaseLikeFunction) => {},
		}),
		'select'
	),

	actionBar: createComponentOrElement(() => {}, 'select'),

	// Other
	webView: createComponentOrElement((props, SELF) => {
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
