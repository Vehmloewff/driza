import { Store } from './store';
import { Font } from './style/font';
import { UserInterface } from './ui';

export type EaseLikeFunction = (t: number) => number;

export type EventListener = (data: any | undefined, args: any[], addArg: (data: any) => void) => Promise<void> | void;

export type ComponentConstructor<Props, Result> = (props: Props, UI: UserInterface, SELF: ComponentSELF) => Result;
export type ElementConstructor<Props, Result> = (props: Props, SELF: ComponentSELF) => Result;

export interface Mediator {
	provide: <Arg, ReturnType>(name: string, fn: (arg: Arg) => ReturnType) => () => void;
	call: <Arg, ReturnType>(name: string, arg: Arg) => ReturnType;
}

interface BareComponentBasics {
	on: (event: string, cb: EventListener) => void;
	once: (event: string, cb: EventListener) => void;
	destroy: () => void;
	reMount: () => void;
	removed: Store<boolean>;
	dispatch: (event: string, data?: any) => Promise<number>;
	hasBeenRendered: Store<boolean>;
}

export interface ComponentBasics extends BareComponentBasics {
	props: { [key: string]: any };
}
export interface SpecificComponentBasics<Props> extends BareComponentBasics {
	props: Props;
}

export interface ComponentSELF extends ComponentBasics {
	render: (...components: ComponentInstance[]) => Promise<void>;
	children: Store<ComponentInstance[]>;
}

export interface ComponentInstance extends ComponentBasics {
	[key: string]: any;
}

export type Component = (props: { [key: string]: any }) => ComponentInstance;
export type SpecificComponent<Props, Result> = (props: Props) => ComponentBasics & Result;

export interface Renderer {
	root: () => any;
	component: (params: { SELF: ComponentSELF; parentResult: any }) => any;
	UI: UserInterface;
	render: () => void;
	applyFont: (params: Font) => Promise<void>;
}
