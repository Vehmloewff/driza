import { createComponent } from './create-component';
import { UserInterface, ComponentBasics, PublicComponentBasics } from '../interfaces';
import { asyncForeach } from '../../utils';
import { Store } from '../store';

interface EachResult<Value> {
	as: (
		cb: (item: Value) => Promise<PublicComponentBasics> | PublicComponentBasics
	) => PublicComponentBasics & {
		else: (component: PublicComponentBasics | (() => PublicComponentBasics)) => PublicComponentBasics;
	};
}

const each = <Value>(array: Store<Value[]>, _: any, SELF: ComponentBasics): EachResult<Value> => {
	const as: EachResult<Value>['as'] = (cb: (item: Value) => Promise<PublicComponentBasics> | PublicComponentBasics) => {
		array.subscribe(async arr => {
			const components: PublicComponentBasics[] = [];

			await asyncForeach(arr, async item => {
				const userResult = await cb(item);

				components.push(userResult);
			});

			if (arr.length) SELF.render(...components);
		});

		return {
			...SELF,
			else: toRender => {
				let component: PublicComponentBasics;

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

export const EACH = createComponent(each);
