import { RollupOptions, Plugin } from 'rollup';

export interface SvelteOptions {
	extensions?: string[];
	include?: string[] | string;
	exclude?: string[] | string;
	generate?: 'dom' | 'ssr' | false;
	preprocess?: {
		markup?: (input: {
			content: string;
			filename: string;
		}) => Promise<{
			code: string;
			dependencies?: Array<string>;
		}>;
		script?: (input: {
			content: string;
			attributes: Record<string, string>;
			filename: string;
		}) => Promise<{
			code: string;
			dependencies?: Array<string>;
		}>;
		style?: (input: {
			content: string;
			attributes: Record<string, string>;
			filename: string;
		}) => Promise<{
			code: string;
			dependencies?: Array<string>;
		}>;
	};
	emitCss?: boolean;
	css?: (css: { code: string; map: any; write: (file: string) => void }) => void;
	onwarn?: (warning: any, handler: (warning: any) => void) => void;
	[key: string]: any;
}

export interface BuildOptions {
	platform: Platform;
	sourceMap?: boolean;
	object?: 'build' | 'run' | 'compile';
	dir?: string;
	name?: string;
	description?: string;
	version?: string;
	id?: string;
	bundleId?: string;
	author?: {
		name?: string;
		devId?: string;
		email?: string;
		url?: string;
	};
	icon?: {
		width: number;
		height: number;
		path: string;
	};
	appEntry?: string;
	outDir?: string;
	assetsDir?: string;
	rollupOptions?: RollupOptions;
	additionalPlugins?: Plugin[];
	watch?: {
		enable?: boolean;
		include?: string[] | string;
		exclude?: string[] | string;
	};
	driza?: string;
}

export type Platform = (buildOptions: BuildOptions, logger: CreateLogger) => Promise<PlatformResult> | PlatformResult;

export interface PlatformResult {
	tag: string;
	data?: string;
	isSandboxed(): boolean;
	bundlePath(): string;
	runtimePath(): string;
	external?(): string[];
	plugin(): Plugin;
	run(): Plugin;
	assetsPath(): string;
	extraBuilds?(): RollupOptions[];
}

export interface ElectronOptions {
	pathToElectron?: string;
	bundlePath?: string;
	mainBundlePath?: string;
	rollupConfig?: RollupOptions;
	entryFile?: string;
	tag?: string;
}

export interface CordovaOptions {
	pathToCordova?: string;
	bundlePath?: string;
	tag?: string;
}

export type LogFunc = (...message: any[]) => void;

export type CreateLogger = (job: string) => Logger;

export interface Logger {
	fatal: LogFunc;
	error: LogFunc;
	warn: LogFunc;
	notice: LogFunc;
	info: LogFunc;
}
