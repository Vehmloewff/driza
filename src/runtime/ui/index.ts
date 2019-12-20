import { getRenderer } from 'halyard/internal';

export * from './ui-specs';
export * from './ui-components';
export * from './ui-object-specs';

export const createUI = () => getRenderer().UI;
