import { PublicComponentBasics } from '@self';

export const create$ = <Element extends Omit<PublicComponentBasics, 'props'>>(
	SELF: Element
): { $: (...children: PublicComponentBasics[]) => Element } => ({
	$: (...children) => {
		SELF.children.set(children);

		return SELF;
	},
});
