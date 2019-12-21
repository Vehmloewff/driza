import { UserInterface } from 'halyard/ui';
import { ComponentSELF, createElement, RendererResult, Renderer, ComponentInstance } from './internal';
import { simpleStore } from './store';

export function createMockUI(callOnEachInstance: (type: string, props: any, SELF: ComponentSELF) => void): UserInterface {
	const mocker = <T>(toReturn: T, type: string, children = false) => (props: any, SELF: ComponentSELF) => {
		callOnEachInstance(type, props, SELF);

		if (children)
			return {
				...toReturn,
				$: (...components: ComponentInstance[]) => {
					SELF.render(...components);
					return SELF;
				},
				children: SELF.children,
			};

		return toReturn;
	};

	return {
		WebView: createElement(mocker({ history: simpleStore([``]) }, 'WebView')),
		HtmlView: createElement(mocker({}, 'HtmlView')),
		Image: createElement(mocker({}, 'Image')),
		Video: createElement(mocker({}, 'Video')),
		Audio: createElement(mocker({}, 'Audio')),
		Label: createElement(mocker({}, 'Label')),
		// @ts-ignore
		Element: createElement(mocker({}, 'Element', true)),
		TextView: createElement(mocker({}, 'TextView')),
		Toggle: createElement(mocker({}, 'Toggle')),
		Choice: createElement(mocker({}, 'Choice')),
		AnonymousChoice: createElement(mocker({}, 'AnonymousChoice')),
		Dialog: createElement(mocker({ open: () => {}, close: () => {} }, 'Dialog')),
		// @ts-ignore
		AbsoluteLayout: createElement(mocker({}, 'AbsoluteLayout', true)),
		// @ts-ignore
		StackLayout: createElement(mocker({}, 'StackLayout', true)),
		// @ts-ignore
		ScrollView: createElement(mocker({ scrollTo: async () => {} }, 'ScrollView', true)),
	};
}

export function createMockRenderer(component: Renderer['component'], UI: UserInterface): Renderer {
	return {
		root: createElement(() => ({})),
		UI,
		component,
		render: () => {},
		applyFont: async () => {},
	};
}
