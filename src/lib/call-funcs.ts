import { asyncForeach } from './utils';

export default () => {
	type Callee = () => Promise<void> | void;
	const toCall: Callee[] = [];

	return {
		call: async () =>
			await asyncForeach(toCall, async (func: Callee) => {
				await func();
			}),
		add: (fn: Callee) => toCall.push(fn),
	};
};
