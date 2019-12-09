import { ComponentBasics } from '../interfaces';

export const create$ = <Element extends Omit<ComponentBasics, 'props'>>(SELF: Element): { $: (...children: ComponentBasics[]) => Element } => ({
	$: (...children) => {
		SELF.children.set(children);

		return SELF;
	},
});
