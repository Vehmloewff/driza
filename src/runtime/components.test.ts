import { describe } from 'zip-tap';
import { createComponent } from '.';
import { Store, simpleStore } from './store';
import { Color } from './style';
import { bootstrapComponent } from './index/bootstrap';

describe(`components`, async it => {
	await it(`should create the component without any errors`, async expect => {
		let called = 0;

		const App = createComponent((props: { cool: Store<boolean> }, UI, SELF) => {
			SELF.once(`create`, () => {
				called++;
				expect(props.cool.get()).toBe(true);
			});

			const button = UI.button({
				text: simpleStore(``),
				style: simpleStore({
					backgroundColor: new Color([0, 0, 0, 1]),
				}),
			});

			SELF.render(button);
		});

		const app = App({ cool: simpleStore(true) });

		app.props.cool;

		await bootstrapComponent(app);

		expect(called).toBe(1);
	});
});
