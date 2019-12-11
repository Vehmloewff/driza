import { UserInterface, ComponentProps, EaseLikeFunction, PublicComponentBasics, UITypes } from '../interfaces';
import { createComponentOrElement } from './create-component-or-element';
import { RendererResult } from './renderer';
import { simpleStore, Store } from '@self/store';
import { Mediator } from '../../utils';
import { propsDefaults } from './reasonable-defaults';
import { createPotential } from './potential';
import { create$ } from './render-children';

const create = (fn: (props: any, SELF: Omit<PublicComponentBasics, 'props'>) => any, type: UITypes) =>
	createComponentOrElement((props, SELF) => fn(props, SELF), propsDefaults[type], type);

export const createUI = (): UserInterface => ({
	// Inputs
	button: create((_, SELF) => createPotential(SELF), 'select'),

	// Text inputs
	textField: create((_, SELF) => createPotential(SELF), 'select'),

	textView: create((_, SELF) => createPotential(SELF), 'select'),

	// Options Inputs
	switch: create((_, SELF) => createPotential(SELF), 'select'),

	checkbox: create((_, SELF) => createPotential(SELF), 'select'),

	//
	slider: create((_, SELF) => createPotential(SELF), 'select'),

	//
	select: create((_, SELF) => createPotential(SELF), 'select'),

	//
	segmentedBar: create((_, SELF) => createPotential(SELF), 'select'),

	radio: create((_, SELF) => createPotential(SELF), 'select'),

	// Complex options inputs
	datePicker: create((_, SELF) => createPotential(SELF), 'select'),

	timePicker: create((_, SELF) => createPotential(SELF), 'select'),

	listPicker: create((_, SELF) => createPotential(SELF), 'select'),

	// Moving
	activityIndicator: create((_, SELF) => createPotential(SELF), 'select'),

	progress: create((_, SELF) => createPotential(SELF), 'select'),

	dialogs: create(() => {}, 'select'),

	menu: create((_, SELF) => createPotential(SELF), 'select'),

	// Static
	label: create((_, SELF) => createPotential(SELF), 'select'),

	image: create((_, SELF) => createPotential(SELF), 'select'),

	htmlView: create(() => {}, 'select'),

	listView: create((_, SELF) => createPotential(SELF), 'select'),

	tabView: create((_, SELF) => createPotential(SELF), 'select'),

	tabItem: create((_, SELF) => createPotential(SELF), 'select'),

	// Layout
	page: create((__, SELF) => {
		const mediator: Store<Mediator> = simpleStore(null);

		SELF.once(`create`, (data: RendererResult) => mediator.set(data.mediator));

		return {
			...create$(SELF),
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

	childPageSlot: create((_, SELF) => createPotential(SELF), 'select'),

	stackLayout: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'select'),

	gridLayout: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'select'),

	absoluteLayout: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'select'),

	wrapLayout: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'select'),

	scrollView: create(
		(props: ComponentProps['scrollView'], SELF) => ({
			scrollTo: async (pos: number, easing: EaseLikeFunction) => {
				// TODO make this ease
			},
			...create$(SELF),
		}),
		'select'
	),

	actionBar: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'select'),

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
	element: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'element'),
});
