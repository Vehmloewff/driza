import { ComponentBasics, Animation, PotentialKeys, TransitionApplicableResult, AnimationParamaters } from '../interfaces';

export const createPotential = <Element extends Omit<ComponentBasics, 'props'>, Style>(
	SELF: Element
): Pick<TransitionApplicableResult<Element, Style>, 'potential'> => {
	const animations: { [key: string]: { fn: Animation<Element, Style>; local: boolean; defaultParams: AnimationParamaters }[] } = {};

	const add = (name: PotentialKeys, fn: Animation<Element, Style>, defaultParams: AnimationParamaters, local: boolean = false) => {
		const obj = { fn, defaultParams, local };

		if (animations[name]) animations[name].push(obj);
		else animations[name] = [obj];

		return () => (animations[name] = animations[name].filter(o => o !== obj));
	};

	const fire = (name: PotentialKeys, params: AnimationParamaters): Promise<void> => {
		return new Promise(resolve => {
			SELF.once('create', () => {
				SELF.dispatch(
					'animation',
					animations[name].map(animation => {
						const result = animation.fn(SELF, Object.assign(animation.defaultParams, params));

						return {
							...result,
							local: animation.local,
						};
					})
				).then(_ => resolve());
			});
		});
	};

	// TODO: Listen for the `beforemount` and `beforedestroy` events and call fire for `in` `out` and `transition`

	return {
		potential: {
			add,
			fire,
		},
	};
};
