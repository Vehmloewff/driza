import { describe, tests } from 'zip-tap';
import { createComponent, bootstrapComponent, IF, EACH } from 'halyard';
import { Store, simpleStore } from 'halyard/store';
import { Color } from 'halyard/style';
import { setRenderer, createMediator } from './internal';
import delay from 'delay';

describe(`components`, async it => {
	await it(`should create the component without any errors`, async expect => {
		let called = 0;
		let rendered = 0;

		const App = createComponent((props: { cool: Store<boolean> }, UI, SELF) => {
			SELF.once(`create`, () => {
				called++;
				expect(props.cool.get()).toBe(true);
			});

			const layout2 = UI.wrapLayout();

			const layout = UI.stackLayout();

			const element = UI.element();

			const button = UI.button({
				text: simpleStore(``),
				style: simpleStore({
					backgroundColor: new Color([0, 0, 0, 1]),
				}),
			});

			const thing = simpleStore([`one`, `two`, `three`]);

			SELF.render(
				layout2.$(
					layout.$(
						IF(simpleStore(called === 0))
							.render(button)
							.elseif(simpleStore(called === 1))
							.render(() => UI.label({ text: simpleStore(`Hello`) }))
							.elseif(simpleStore(called === 2))
							.render(() => UI.label({ text: simpleStore(`Hello`) }))
							.else()
							.render(element.$(button)),
						EACH(thing).as(async item => {
							await delay(10);

							return UI.label({
								text: simpleStore(item),
							});
						})
					)
				)
			);
		});

		const app = App({ cool: simpleStore(true) });

		expect(app.props.cool.get()).toBe(true);

		const calls = [
			`root`,
			`root>virtual`,
			`root>virtual>wrapLayout`,
			`root>virtual>wrapLayout>stackLayout`,
			`root>virtual>wrapLayout>stackLayout>virtual`,
			`root>virtual>wrapLayout>stackLayout>virtual>element`,
			`root>virtual>wrapLayout>stackLayout>virtual>element>button`,
			`root>virtual>wrapLayout>stackLayout>virtual`,
			`root>virtual>wrapLayout>stackLayout>virtual>label`,
			`root>virtual>wrapLayout>stackLayout>virtual>label`,
			`root>virtual>wrapLayout>stackLayout>virtual>label`,
		];

		setRenderer({
			root: () => {
				rendered++;
				return {
					data: `root`,
					mediator: createMediator(),
				};
			},
			component: ({ parent, type }) => {
				const data = parent.data + `>` + type;

				expect(calls[rendered]).toBe(data);

				rendered++;

				return {
					data,
					mediator: createMediator(),
				};
			},
			applyFont: async () => {},
		});

		await bootstrapComponent(app);

		expect(called).toBe(1);

		expect(rendered).toBe(calls.length);
	});

	await it(`each element should be it's own instance`, async expect => {
		let called = 0;

		const App = createComponent((_, UI, SELF) => {
			const text = simpleStore(`me`);

			const label1 = UI.label({
				text,
			});

			const label2 = UI.label({
				text: simpleStore(`you`),
			});

			SELF.render(label1, label2);
		});

		setRenderer({
			root: () => ({
				data: `root`,
				mediator: createMediator(),
			}),
			component: ({ type, props: anyProps }) => {
				const props: any = anyProps;

				if (type === 'label') {
					if (called === 0) expect(props.text.get()).toBe(`me`);
					else if (called === 1) expect(props.text.get()).toBe(`you`);
					called++;
				}

				return {
					data: `in`,
					mediator: createMediator(),
				};
			},
			applyFont: async () => {},
		});

		await bootstrapComponent(App());
	});
});
