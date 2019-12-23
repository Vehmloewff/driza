import { describe } from 'zip-tap';
import { createComponent, bootstrapComponent } from 'driza';
import { Store, simpleStore } from 'driza/store';
import { setRenderer, ComponentSELF } from './internal';
import { createMockRenderer, createMockUI } from './mock-renderer';

describe(`components`, async it => {
	await it(`should render children`, async expect => {
		let rendered = 0;

		const calls = [
			`root>Virtual`,
			`root>Virtual>StackLayout`,
			`root>Virtual>StackLayout>Element`,
			`root>Virtual>StackLayout>Element>Element`,
			`root>Virtual>StackLayout>Element>Element>Toggle`,
			`root>Virtual>StackLayout>AbsoluteLayout`,
			`root>Virtual>StackLayout>AbsoluteLayout>Label`,
		];

		function component({ parentResult }: { SELF: ComponentSELF; parentResult: string }) {
			const data = parentResult + `>Virtual`;
			expect(data).toBe(calls[rendered]);

			rendered++;
			return data;
		}

		function callOnEachUI(type: string, props: any, SELF: ComponentSELF) {
			SELF.once('prerender', data => {
				data.set(data.get() + '>' + type);

				expect(data.get()).toBe(calls[rendered]);

				rendered++;
			});
		}

		setRenderer(createMockRenderer(component, createMockUI(callOnEachUI)));

		const App = createComponent((_, UI, SELF) => {
			const layout = UI.StackLayout();
			const element = UI.Element({ style: {} });

			const label = UI.Label({
				text: ``,
			});

			SELF.render(layout.$(element.$(UI.Element().$(UI.Toggle())), UI.AbsoluteLayout().$(label)));
		});

		const app = App({ cool: simpleStore(true) });

		expect(app.props.cool.get()).toBe(true);

		await bootstrapComponent(app);

		expect(rendered).toBe(calls.length);
	});
});
