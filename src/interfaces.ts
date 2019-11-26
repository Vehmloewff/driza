import { EventEmitter } from 'events';

export interface BuildOptions {
	name?: string;
	machineName?: string;
	description?: string;
	plugins?: Plugin[];
	outputDir?: string;
	watch?: {
		enable?: boolean;
		clearScreen?: boolean;
		displayMetadata?: boolean;
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
	setValue: (key: string, value: any) => void;
	getValue: (key: string) => any;
	addWatchFile: (path: string) => void;
	removeWatchFile: (path: string) => void;
	beforeBuild: (fn: () => void | Promise<void>) => void;
	afterBuild: (fn: () => void | Promise<void>) => void;
	afterWrite: (fn: () => void | Promise<void>) => void;
	onFinish: (fn: () => void | Promise<void>) => void;
	writeFile: (path: string, code: string) => void;
	writeFileNow: (path: string, code: string, id: string) => Promise<void>;
	build: (fn: () => void | Promise<void>) => void;
}

export interface Plugin {
	name: string;
	writingId?: string;
	platformResult?: string;
	platformIsSandboxed?: boolean;
	run: (pluginOptions?: PluginParams) => Promise<any> | any;
}

export interface Preprocessor {}
