import { describe } from 'zip-tap';
import { createComponent, bootstrapComponent } from 'halyard';
import { Store, simpleStore } from 'halyard/store';
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
			`root>Virtual>StackLayout>Element>Element>Label`,
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

		const App = createComponent((props: { cool: Store<boolean> }, UI, SELF) => {
			const layout = UI.StackLayout();
			const element = UI.Element({ style: {} });

			const label = UI.Label({
				text: ``,
			});

			SELF.render(layout.$(element.$(UI.Element().$(UI.Label({ text: `` }))), UI.AbsoluteLayout().$(label)));
		});

		const app = App({ cool: simpleStore(true) });

		expect(app.props.cool.get()).toBe(true);

		await bootstrapComponent(app);

		// expect(called).toBe(1);
		expect(rendered).toBe(calls.length);
	});

	// await it(`each element should be it's own instance`, async expect => {
	// 	let called = 0;
	// 	const App = createComponent((_, UI, SELF) => {
	// 		const text = simpleStore(`me`);
	// 		const label1 = UI.label({
	// 			text,
	// 		});
	// 		const label2 = UI.label({
	// 			text: simpleStore(`you`),
	// 		});
	// 		SELF.render(label1, label2);
	// 	});
	// 	setRenderer({
	// 		root: () => ({
	// 			data: `root`,
	// 			mediator: createMediator(),
	// 		}),
	// 		component: ({ props: anyProps }) => {
	// 			const props: any = anyProps;
	// 			// if (type === 'label') {
	// 			if (called === 0) expect(props.text.get()).toBe(`me`);
	// 			else if (called === 1) expect(props.text.get()).toBe(`you`);
	// 			called++;
	// 			// }
	// 			return {
	// 				data: `in`,
	// 				mediator: createMediator(),
	// 			};
	// 		},
	// 		applyFont: async () => {},
	// 	});
	// 	await bootstrapComponent(App());
	// });
	// await it(`should get the SELF.render`, async expect => {
	// 	const App = createComponent((_, UI, SELF) => {
	// 		SELF.render(UI.button({ text: simpleStore('string') }));
	// 	});
	// 	let called = 0;
	// 	setRenderer({
	// 		root: () => ({ mediator: createMediator(), data: 'asd' }),
	// 		component: ({}) => {
	// 			// Erase the button
	// 			// render();
	// 			called++;
	// 			return {
	// 				mediator: createMediator(),
	// 				data: `string`,
	// 			};
	// 		},
	// 		applyFont: async () => {},
	// 	});
	// 	await bootstrapComponent(App());
	// 	expect(called).toBe(1);
	// });
});
