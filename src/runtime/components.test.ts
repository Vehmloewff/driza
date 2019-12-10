import { describe } from 'zip-tap';
import { createComponent } from '.';
import { Store, simpleStore } from './store';
import { Color } from './style';
import { bootstrapComponent } from './index/bootstrap';
import { IF, EACH } from '.';

describe(`components`, async it => {
	await it(`should create the component without any errors`, async expect => {
		let called = 0;

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
							.else()
							.render(element.$(button)),
						EACH(thing).as(item => {
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

		await bootstrapComponent(app);

		expect(called).toBe(1);
	});
});
