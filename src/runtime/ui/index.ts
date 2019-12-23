import { getRenderer } from 'driza/internal';

export * from './ui-specs';
export * from './ui-components';
export * from './ui-object-specs';
export * from './default-components';

export const createUI = () => getRenderer().UI;
