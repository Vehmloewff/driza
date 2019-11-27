import { BuildOptions, Plugin } from './interfaces';
import nodePath from 'path';
import createWritingFuncs from './lib/write-file';
import createScopedValues from './lib/scoped-values';
import watchedFiles from './lib/watched-files';
import callFuncs from './lib/call-funcs';
import { asyncForeach } from './lib/utils';
import { EventEmitter } from 'events';

const defaultBuildOptions: BuildOptions = {
	name: `Versatile App`,
	machineName: `versatile-app`,
	description: `TODO: add a description`,
	outputDir: `dist`,
	plugins: [],
	watch: {
		enable: false,
		clearScreen: true,
		displayMetadata: true,
	},
	dependencies: {
		nativeModules: [],
		sandboxedModules: [],
		dualModules: [],
	},
};

export function buildApp(dir: string, options: BuildOptions) {
	async function promiseBuilt(emit: (event?: string, value?: any) => void) {
		options = Object.assign(defaultBuildOptions, options);

		const outputPath = nodePath.join(dir, options.outputDir);
		const { setValue, getValue } = createScopedValues();
		const { get: getWatchedFiles, addWatchFile, removeWatchFile } = watchedFiles();
		const { createWriter, now: writeFiles, transformFiles, writeFileNow } = createWritingFuncs(
			outputPath
		);

		const beforeBuild = callFuncs();
		const afterBuild = callFuncs();
		const afterWrite = callFuncs();
		const onFinish = callFuncs();
		const build = callFuncs();

		interface TransformParams {
			isSandboxed: boolean;
			platform: string;
		}

		async function runBuild() {
			await asyncForeach(options.plugins, async (plugin: Plugin) => {
				const writeFile = createWriter(plugin.writingId, {
					isSandboxed: plugin.platformIsSandboxed,
					platform: plugin.platformResult,
				});

				await plugin.run({
					versatileParams: options,
					setValue,
					getValue,
					addWatchFile,
					removeWatchFile,
					beforeBuild: beforeBuild.add,
					afterBuild: afterBuild.add,
					afterWrite: afterWrite.add,
					onFinish: onFinish.add,
					writeFile,
					writeFileNow,
					build: build.add,
				});
			});

			await beforeBuild.call();
			emit(`status-changed`, `build`);

			await build.call();
			emit(`status-changed`, `after-build`);

			await afterBuild.call();
			emit(`status-changed`, `before-write`);

			await transformFiles((code, _, params: TransformParams) => {
				code = code.replace(
					`/*{%^&$#_PLATFORM_HERE_#$&^%}*/ return 'notset';`,
					params.platform
				);
				code = code.replace(
					`/*{%^&$#_PLATFORM_IS_SANDBOXED_#$&^%}*/`,
					`${params.isSandboxed}`
				);

				return code;
			});
			await writeFiles();
			await afterWrite.call();
			emit(`status-changed`, `finish`);

			emit(`finish`);
			onFinish.call();
		}

		await runBuild();
	}

	return {
		promise: () => {
			return promiseBuilt(() => {});
		},
		emitter: () => {
			const emitter = new EventEmitter();
			promiseBuilt((event: string, value: any) => {
				emitter.emit(event, value);
			});
			return emitter;
		},
	};
}

export * from './interfaces';
export { default as platform } from './platforms';
