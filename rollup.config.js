import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import command from 'rollup-plugin-command';
import typescript from 'rollup-plugin-typescript';
import globFiles from 'rollup-plugin-glob-files';
import nodePath from 'path';
import { readdirSync } from 'fs';

const name = 'versatilejs';
const sourcemap = false;
const prod = process.env.NODE_ENV === 'production';
const watching = process.env.ROLLUP_WATCH;
const testDir = process.env.VERSATILE_FILTER || ``;
const testPattern = nodePath.resolve(testDir, `**/*.test.ts`);
const browserMode = process.env.VERSATILE_ENV === `browser`;

const sharedOutputOptions = {
	name,
	sourcemap,
};

const external = {
	workflow: [`events`],
	runtime: [],
	compiler: [],
};

const globalPlugins = (dir, oldDir, disable) => [
	resolve({
		preferBuiltins: true,
		browser: browserMode,
	}),
	commonjs(),
	typescript({
		typescript: require('typescript'),
	}),
	prod &&
		!disable &&
		command([`node scripts/add-package-json.js "${dir}"`, `node scripts/add-ts-definition.js "${dir}" "${oldDir || dir}"`], {
			exitOnFail: !watching,
		}),
];

function generateOutputOptions(options) {
	return [
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
}

const testRound = {
	input: `globbed-tests.ts`,
	output: { file: `dist/build.js`, format: 'cjs', ...sharedOutputOptions },
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
		...sharedOutputOptions,
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
	output: generateOutputOptions({
		file: `dist/index`,
		...sharedOutputOptions,
	}),
	external: external.runtime,
	plugins: globalPlugins(null, null, true),
};

const runtimes = readdirSync(`src/runtime`, 'utf-8')
	.filter(dir => dir.indexOf(`.`) === -1 && dir !== `index`)
	.map(dir => ({
		input: `src/runtime/${dir}/index.ts`,
		output: generateOutputOptions({
			file: `${dir}/index`,
			...sharedOutputOptions,
		}),
		external: external.runtime,
		plugins: globalPlugins(dir, `runtime/${dir}`),
	}));

export default prod ? [index, compiler, workflowManager, ...runtimes] : testRound;
