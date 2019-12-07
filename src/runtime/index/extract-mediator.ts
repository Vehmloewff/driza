import { ComponentBasics } from '../interfaces';
import { RendererResult } from '../internal/renderer';

export const extractMediator = (SELF: Omit<ComponentBasics, 'props'>) => {
	return new Promise((resolve, reject) => {
		SELF.once(`create`, (data: RendererResult) => {
			if (typeof data.mediator === 'function') resolve(data.mediator);
			else reject(`Renderer did not provide a mediator.`);
		});
	});
};
