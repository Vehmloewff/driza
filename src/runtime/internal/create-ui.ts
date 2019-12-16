import { UserInterface, ComponentProps, EaseLikeFunction, PublicComponentBasics, UITypes } from '../interfaces';
import { createComponentOrElement } from './create-component-or-element';
import { RendererResult } from './renderer';
import { simpleStore, Store } from 'halyard/store';
import { Mediator } from '../../utils';
import { propsDefaults } from './reasonable-defaults';
import { createPotential } from './potential';
import { create$ } from './render-children';

const create = (fn: (props: any, SELF: Omit<PublicComponentBasics, 'props'>) => any, type: UITypes) =>
	createComponentOrElement((props, SELF) => fn(props, SELF), propsDefaults[type], type);

export const createUI = (): UserInterface => ({
	// Inputs
	button: create((_, SELF) => createPotential(SELF), 'button'),

	// Text inputs
	textField: create((_, SELF) => createPotential(SELF), 'textField'),

	textView: create((_, SELF) => createPotential(SELF), 'textView'),

	// Options Inputs
	switch: create((_, SELF) => createPotential(SELF), 'switch'),

	checkbox: create((_, SELF) => createPotential(SELF), 'checkbox'),

	//
	slider: create((_, SELF) => createPotential(SELF), 'slider'),

	//
	select: create((_, SELF) => createPotential(SELF), 'select'),

	//
	segmentedBar: create((_, SELF) => createPotential(SELF), 'segmentedBar'),

	radio: create((_, SELF) => createPotential(SELF), 'radio'),

	// Complex options inputs
	datePicker: create((_, SELF) => createPotential(SELF), 'datePicker'),

	timePicker: create((_, SELF) => createPotential(SELF), 'timePicker'),

	listPicker: create((_, SELF) => createPotential(SELF), 'listPicker'),

	// Moving
	activityIndicator: create((_, SELF) => createPotential(SELF), 'activityIndicator'),

	progress: create((_, SELF) => createPotential(SELF), 'progress'),

	dialog: create(() => {}, 'dialog'),

	menu: create((_, SELF) => createPotential(SELF), 'menu'),

	// Static
	label: create((_, SELF) => createPotential(SELF), 'label'),

	image: create((_, SELF) => createPotential(SELF), 'image'),

	htmlView: create(() => {}, 'htmlView'),

	listView: create((_, SELF) => createPotential(SELF), 'listView'),

	tabView: create((_, SELF) => createPotential(SELF), 'tabView'),

	tabItem: create((_, SELF) => createPotential(SELF), 'tabItem'),

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
	}, 'page'),

	childPageSlot: create((_, SELF) => createPotential(SELF), 'childPageSlot'),

	stackLayout: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'stackLayout'),

	gridLayout: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'gridLayout'),

	absoluteLayout: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'absoluteLayout'),

	wrapLayout: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'wrapLayout'),

	scrollView: create(
		(props: ComponentProps['scrollView'], SELF) => ({
			scrollTo: async (pos: number, easing: EaseLikeFunction) => {
				// TODO: `scrollTo` function does not work
				// BODY: This should be fixed
			},
			...create$(SELF),
		}),
		'scrollView'
	),

	actionBar: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'actionBar'),

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
	}, 'webView'),
	element: create((_, SELF) => ({ ...createPotential(SELF), ...create$(SELF) }), 'element'),
});
