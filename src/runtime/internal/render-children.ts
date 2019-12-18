import { PublicComponentBasics } from '../interfaces';

export const create$ = <Element extends Omit<PublicComponentBasics, 'props'>>(
	SELF: Element
): { $: (...children: PublicComponentBasics[]) => Element } => ({
	$: (...children) => {
		// @ts-ignore children will be present
		SELF.children.set(children);

		return SELF;
	},
});
