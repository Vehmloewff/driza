import { Renderer } from '../interfaces';
import { Mediator } from '../../utils';

export type RendererResult = { data: any; mediator: Mediator };

let currentRenderer: Renderer<RendererResult> = null;

export const setRenderer = (renderer: Renderer<RendererResult>) => (currentRenderer = renderer);

export const getRenderer = () => currentRenderer;
