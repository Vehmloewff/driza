import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import command from 'rollup-plugin-command';
import typescript from 'rollup-plugin-typescript';
import globFiles from 'rollup-plugin-glob-files';
import nodePath from 'path';
import { readdirSync } from 'fs';
import removeMockPlugin from './scripts/remove-mock-plugin';

const sourcemap = false;
const prod = process.env.NODE_ENV === 'production';
const watching = process.env.ROLLUP_WATCH;
const testDir = process.env.VERSATILE_FILTER || ``;
const testPattern = nodePath.resolve(testDir, `**/*.test.ts`);

const sharedOutputOptions = (dir = null) => ({
	name: !dir ? undefined : `versatilejs${dir === `index` ? `` : `.${dir}`}`,
	sourcemap,
	globals: {
		'@self': 'versatilejs',

		'@self/easing': 'versatilejs.easing',
		'@self/internal': 'versatilejs.internal',
		'@self/store': 'versatilejs.store',
		'@self/style': 'versatilejs.style',
	},
});

const external = {
	workflow: [`events`],
	runtime: id => id.startsWith(`@self`),
	compiler: [],
};

const globalPlugins = (dir, oldDir, disable) => [
	resolve({
		preferBuiltins: true,
		browser: dir !== `compiler` && dir !== `workflow`,
	}),
	commonjs(),
	typescript({
		typescript: require('typescript'),
	}),
	prod && removeMockPlugin,
	prod &&
		!disable &&
		command([`node scripts/add-package-json.js "${dir}"`, `node scripts/add-ts-definition.js "${dir}" "${oldDir || dir}"`], {
			exitOnFail: !watching,
		}),
];

function generateOutputOptions(options, browser = false) {
	const result = [
		{
			...options,
			file: options.file + `.js`,
			format: `cjs`,
		},
		{
			...options,
			file: options.file + `.mjs`,
			format: `esm`,
		},
	];

	if (browser)
		result.push({
			...options,
			file: options.file + `.browser.js`,
			format: `iife`,
		});

	return result;
}

const testRound = {
	input: `globbed-tests.ts`,
	output: { file: `dist/build.js`, format: 'cjs', ...sharedOutputOptions() },
	plugins: [
		globFiles({
			file: `globbed-tests.ts`,
			include: testPattern,
			justImport: true,
		}),
		...globalPlugins(),
		command(`node dist/build.js | zip-tap-reporter`, { exitOnFail: !watching }),
	],
	external: external.workflow.concat(external.compiler, external.runtime),
};

const compiler = {
	input: `src/compiler/index.ts`,
	output: generateOutputOptions({
		file: `compiler/index`,
		...sharedOutputOptions(),
	}),
	plugins: globalPlugins(`compiler`),
	external: external.compiler,
};

const workflowManager = {
	input: `src/workflow/index.ts`,
	output: generateOutputOptions({
		file: `workflow/index`,
		...sharedOutputOptions,
	}),
	external: external.workflow,
	plugins: globalPlugins(`workflow`),
};

const index = {
	input: `src/runtime/index.ts`,
	output: generateOutputOptions(
		{
			file: `dist/index`,
			...sharedOutputOptions(`index`),
		},
		true
	),
	external: external.runtime,
	plugins: globalPlugins(null, null, true),
};

const runtimes = readdirSync(`src/runtime`, 'utf-8')
	.filter(dir => dir.indexOf(`.`) === -1 && dir !== `index`)
	.map(dir => ({
		input: `src/runtime/${dir}/index.ts`,
		output: generateOutputOptions(
			{
				file: `${dir}/index`,
				...sharedOutputOptions(dir),
			},
			true
		),
		external: external.runtime,
		plugins: globalPlugins(dir, `runtime/${dir}`),
	}));

export default prod ? [index, compiler, workflowManager, ...runtimes] : testRound;
