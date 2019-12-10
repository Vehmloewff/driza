import { ComponentBasics } from '../interfaces';
import { Store, simpleStore } from '../store';
import { createComponent } from './create-component';

type Expression = Store<any | (() => Promise<any> | any)>;

export const IF = createComponent((expression: Expression, UI, SELF) => {
	const render = (...components: ((() => ComponentBasics) | ComponentBasics)[]) => {
		const sureComponents: ComponentBasics[] = [];

		components.forEach(c => {
			let component: ComponentBasics = null;

			if (typeof c === 'function') {
				component = c();
			} else component = c;

			sureComponents.push(component);
		});

		expression.subscribe(val => {
			sureComponents.forEach(c => c.removed.set(!val));
		});

		SELF.render(...sureComponents);

		return {
			...SELF,
			else: () => {
				const mirror = simpleStore(expression.get());
				expression.subscribe(val => mirror.set(!val));

				return IF(mirror);
			},
			elseif: (expression: Expression) => {
				return IF(expression);
			},
		};
	};

	return { render };
});
