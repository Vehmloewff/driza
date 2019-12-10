import { createComponent } from './create-component';
import { UserInterface, PrivateComponentBasics, ComponentBasics } from '../interfaces';
import { asyncForeach } from '../../utils';
import { Store } from '../store';

interface EachResult<Value> {
	as: (
		cb: (item: Value) => Promise<ComponentBasics> | ComponentBasics
	) => ComponentBasics & {
		else: (component: ComponentBasics | (() => ComponentBasics)) => ComponentBasics;
	};
}

const each = <Value>(array: Store<Value[]>, _: any, SELF: PrivateComponentBasics): EachResult<Value> => {
	const as: EachResult<Value>['as'] = (cb: (item: Value) => Promise<ComponentBasics> | ComponentBasics) => {
		array.subscribe(async arr => {
			const components: ComponentBasics[] = [];

			await asyncForeach(arr, async item => {
				const userResult = await cb(item);

				components.push(userResult);
			});

			if (arr.length) SELF.render(...components);
		});

		return {
			...SELF,
			else: toRender => {
				let component: ComponentBasics;

				if (typeof toRender === 'function') component = toRender();
				else component = toRender;

				array.subscribe(arr => {
					if (arr.length === 0) SELF.render(component);
				});

				return SELF;
			},
		};
	};

	return { as };
};

export const $$each = createComponent(each);
