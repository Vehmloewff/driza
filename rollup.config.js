import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import command from 'rollup-plugin-command';
import typescript from 'rollup-plugin-typescript';
import globFiles from 'rollup-plugin-glob-files';
import nodePath from 'path';
import { readdirSync } from 'fs';

const name = 'todo';
const sourcemap = true;
const prod = process.env.NODE_ENV === 'production';
const watching = process.env.ROLLUP_WATCH;
const testDir = process.env.VERSATILE_FILTER || ``;
const testPattern = nodePath.resolve(testDir, `**/*.test.ts`);
const browserMode = process.env.VERSATILE_ENV === `browser`;

const sharedOutputOptions = {
	name,
	sourcemap,
};

const globalPlugins = (dir, oldDir) => [
	resolve({
		preferBuiltins: true,
		browser: browserMode,
	}),
	commonjs(),
	typescript({
		typescript: require('typescript'),
	}),
	prod &&
		command(
			[
				`node scripts/add-package-json.js "${dir}"`,
				`node scripts/add-ts-definition.js "${dir}" "${oldDir || dir}"`,
			],
			{
				exitOnFail: !watching,
			}
		),
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
};

const compiler = {
	input: `src/compiler/index.ts`,
	output: generateOutputOptions({
		file: `compiler/index`,
		...sharedOutputOptions,
	}),
	plugins: globalPlugins(`compiler`),
};

const workflowManager = {
	input: `src/workflow-manager/index.ts`,
	output: generateOutputOptions({
		file: `workflow/index`,
		...sharedOutputOptions,
	}),
	plugins: globalPlugins(`workflow`),
};

const runtimes = readdirSync(`src/runtime`, 'utf-8')
	.filter(dir => dir.indexOf(`.`) === -1)
	.map(dir => ({
		input: `src/runtime/${dir}/index.ts`,
		output: generateOutputOptions({
			file: `${dir}/index`,
			...sharedOutputOptions,
		}),
		plugins: globalPlugins(dir, `runtime/${dir}`),
	}));

export default prod ? [compiler, workflowManager, ...runtimes] : testRound;
