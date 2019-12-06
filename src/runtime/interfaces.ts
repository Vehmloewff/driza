import { Store } from './store';

// Renderer
export type ComponentTypes = 'virtual' | 'button' | 'page';

export interface ComponentProps {
	button: {};
	page: {};
	virtual: { [key: string]: any };
}

export interface Renderer<RendererResult> {
	root: () => RendererResult;
	component: (values: {
		type: ComponentTypes;
		order: RendererResult[];
		parent: RendererResult;
		props: ComponentProps[ComponentTypes];
		removed: Store<boolean>;
		dispatch: (event: string, data?: any) => Promise<void>;
	}) => RendererResult;
}

// The core fundamentals of all components
export interface ComponentBasics {
	on: (event: string, cb: (data?: any) => Promise<void> | void) => void;
	destroy: () => void;
	reMount: () => void;
	removed: Store<boolean>;
	dispatch: (event: string, data?: any) => Promise<void>;
	props: ComponentProps[ComponentTypes];
}

export interface AdditionalComponentValues {
	[name: string]: any;
}
