import { PublicComponentBasics, ComponentBasics } from '../interfaces';
import { Store, simpleStore } from 'halyard/store';
import { createComponent } from './create-component';

type Expression = Store<any | (() => Promise<any> | any)>;
type Types = 'if' | 'elseif' | 'else';
type Logic = {
	expression?: Expression;
	shouldShow: Store<boolean>;
	type: Types;
};
type Component = (() => PublicComponentBasics) | PublicComponentBasics;
type ElseResult = {
	render: (...components: Component[]) => ComponentBasics;
};
type IfResult = {
	render: (
		...components: Component[]
	) => PublicComponentBasics & {
		elseif: (expression: Expression) => IfResult;
		else: () => ElseResult;
	};
};

export const IF = createComponent(
	(expression: Expression, _, SELF): IfResult => {
		const logicBlocks: Store<Logic[]> = simpleStore([]);

		const ifStatement = (expression: Expression, firstTime: boolean = false): IfResult => {
			const render = (...components: Component[]) => {
				const store = newLogicBlock(firstTime ? 'if' : 'elseif', expression);

				renderIfOk(store, ...components);

				const $else = () => ({
					render: (...components: Component[]) => {
						const store = newLogicBlock('else');

						renderIfOk(store, ...components);

						resolveLogic();

						return SELF;
					},
				});

				const $elseif = (expression: Expression) => {
					return ifStatement(expression);
				};

				return {
					...SELF,
					else: $else,
					elseif: $elseif,
				};
			};

			return { render };
		};

		const newLogicBlock = (type: Types, expression?: Expression): Store<boolean> => {
			const store = simpleStore(false);

			logicBlocks.update(blocks => {
				blocks.push({
					type,
					shouldShow: store,
					expression,
				});

				return blocks;
			});

			return store;
		};

		const renderIfOk = (store: Store<boolean>, ...components: Component[]) => {
			const sureComponents: PublicComponentBasics[] = [];

			components.forEach(c => {
				let component: PublicComponentBasics = null;

				if (typeof c === 'function') {
					component = c();
				} else component = c;

				sureComponents.push(component);
			});

			store.subscribe(show => {
				sureComponents.forEach(c => c.removed.set(!show));
			});

			SELF.render(...sureComponents);
		};

		const resolveLogic = () => {
			logicBlocks.get().forEach(block => {
				if (block.expression) block.expression.subscribe(_ => runLogic());
			});

			logicBlocks.subscribe(_ => runLogic());
		};

		const runLogic = () => {
			let matchFound = false;

			const errorOut = (message = `Something went wrong!`) => {
				throw new Error(message);
			};

			logicBlocks.get().forEach((block, index) => {
				if (matchFound) return block.shouldShow.set(false);

				if (index === 0 && block.type !== 'if') errorOut();
				else if (index + 1 !== logicBlocks.get().length && block.type === 'else') errorOut();
				else if (index !== 0 && block.type === 'if') errorOut();

				if (block.type === 'if' || block.type === 'elseif') {
					if (block.expression && block.expression.get()) {
						block.shouldShow.set(true);
						matchFound = true;
					} else {
						block.shouldShow.set(false);
					}
				} else {
					block.shouldShow.set(true);
				}
			});
		};

		return ifStatement(expression, true);
	}
);
