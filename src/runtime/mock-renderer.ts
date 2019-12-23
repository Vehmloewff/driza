import { UserInterface } from 'driza/ui';
import { ComponentSELF, createElement, Renderer, ComponentInstance, createDelay } from './internal';
import { simpleStore } from './store';

export function createMockUI(callOnEachInstance: (type: string, props: any, SELF: ComponentSELF) => void): UserInterface {
	const mocker = <T>(toReturn: T, type: string, children = false) => (props: any, SELF: ComponentSELF) => {
		callOnEachInstance(type, props, SELF);

		if (children)
			return {
				...toReturn,
				$: (...components: ComponentInstance[]) => {
					const resolve = createDelay();
					SELF.render(...components).then(resolve);

					return SELF;
				},
				children: SELF.children,
			};

		return toReturn;
	};

	return {
		// @ts-ignore
		WebView: createElement(mocker({ history: simpleStore([``]) }, 'WebView')),
		// @ts-ignore
		HtmlView: createElement(mocker({}, 'HtmlView')),
		// @ts-ignore
		Image: createElement(mocker({}, 'Image')),
		// @ts-ignore
		Video: createElement(mocker({}, 'Video')),
		// @ts-ignore
		Audio: createElement(mocker({}, 'Audio')),
		// @ts-ignore
		Label: createElement(mocker({}, 'Label')),
		// @ts-ignore
		Element: createElement(mocker({}, 'Element', true)),
		// @ts-ignore
		TextView: createElement(mocker({}, 'TextView')),
		// @ts-ignore
		Toggle: createElement(mocker({}, 'Toggle')),
		// @ts-ignore
		Choice: createElement(mocker({}, 'Choice')),
		// @ts-ignore
		AnonymousChoice: createElement(mocker({}, 'AnonymousChoice')),
		// @ts-ignore
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
		root: () => 'root',
		UI,
		component,
		render: () => {},
		applyFont: async () => {},
	};
}
