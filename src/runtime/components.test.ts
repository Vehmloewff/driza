import { describe } from 'zip-tap';
import { createComponent, bootstrapComponent, IF, EACH } from 'versatilejs';
import { Store, simpleStore } from 'versatilejs/store';
import { Color } from 'versatilejs/style';
import { setRenderer, createMediator } from './internal';
import delay from 'delay';

describe(`components`, async it => {
	await it(`should create the component without any errors`, async expect => {
		let called = 0;
		let rendererd = 0;

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
				rendererd++;
				return {
					data: `root`,
					mediator: createMediator(),
				};
			},
			component: ({ parent, type }) => {
				const data = parent.data + `>` + type;

				expect(calls[rendererd]).toBe(data);

				rendererd++;

				return {
					data,
					mediator: createMediator(),
				};
			},
			applyFont: async () => {},
		});

		await bootstrapComponent(app);

		expect(called).toBe(1);

		expect(rendererd).toBe(calls.length);
	});
});
