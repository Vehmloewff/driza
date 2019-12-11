import { PublicComponentBasics } from '../interfaces';
import { RendererResult } from './renderer';

export const extractMediator = (SELF: Omit<PublicComponentBasics, 'props'>) => {
	return new Promise((resolve, reject) => {
		SELF.once(`create`, (data: RendererResult) => {
			if (typeof data.mediator === 'function') resolve(data.mediator);
			else reject(`Renderer did not provide a mediator.`);
		});
	});
};
