import { createComponent } from './create-component';
import { ComponentBasics, ComponentInstance, ComponentSELF } from '../interfaces';
import { asyncForeach } from '../../utils';
import { Store } from 'driza/store';
import { createDelay } from './manage-delays';

interface EachResult<Value> {
	as: (
		cb: (item: Value, index: number, originalArray: Store<Value[]>) => Promise<ComponentInstance> | ComponentInstance
	) => ComponentInstance & {
		else: (component: ComponentInstance | (() => ComponentInstance)) => ComponentInstance;
	};
}

const each = <Value>(array: Store<Value[]>, _: any, SELF: ComponentSELF): EachResult<Value> => {
	const resolve = createDelay();

	const as: EachResult<Value>['as'] = cb => {
		array.subscribe(async arr => {
			const components: ComponentInstance[] = [];

			await asyncForeach(arr, async (item, index) => {
				const userResult = await cb(item, index, array);

				components.push(userResult);
			});

			if (arr.length) await SELF.render(...components);

			resolve();
		});

		return {
			...SELF,
			else: toRender => {
				let component: ComponentInstance;

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
