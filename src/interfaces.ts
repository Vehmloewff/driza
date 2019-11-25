import { EventEmitter } from 'events';

export interface BuildOptions {
	name?: string;
	machineName?: string;
	description?: string;
	plugins?: Plugin[];
	watch?: {
		enable?: boolean;
		clearScreen?: boolean;
	};
	dependencies?: {
		nativeModules?: string[];
		sandboxedModules?: string[];
		dualModules?: string[];
	};
	[otherOptions: string]: any;
}
export interface PluginParams {
	versatileParams: BuildOptions;
	setRuntime: (code: string, pluginId: string) => void;
	setValue: (key: string, value: any) => void;
	getValue: (key: string) => any;
	addWatchFile: (path: string) => void;
	emitter: () => EventEmitter;
}
export type Plugin = (pluginOptions: PluginParams) => Promise<any> | any;
export interface Preprocessor {}
