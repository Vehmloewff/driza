import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import command from 'rollup-plugin-command';
import typescript from 'rollup-plugin-typescript';
import globFiles from 'rollup-plugin-glob-files';
import nodePath from 'path';
import { readdirSync } from 'fs';
import { string } from 'rollup-plugin-string';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';

const sourcemap = false;
const prod = process.env.NODE_ENV === 'production';
const watching = process.env.ROLLUP_WATCH;
const testDir = process.env.VERSATILE_FILTER || ``;
const testPattern = nodePath.resolve(testDir, `**/*.test.ts`);

const sharedOutputOptions = (dir = null) => {
	const paths = id => id.startsWith(`driza`) && id.replace('driza', '..');

	if (dir === `compiler`) paths = undefined;

	return {
		paths,
		sourcemap,
	};
};

const external = (runtime = false) => id => (runtime ? false : id[0] !== '.' && !nodePath.isAbsolute(id));

const globalPlugins = (dir, oldDir, disable) => [
	resolve({
		preferBuiltins: true,
		browser: dir !== `compiler`,
	}),
	commonjs(),
	typescript({
		typescript: require('typescript'),
	}),
	image(),
	json(),
	string({ include: [`**/*txt`, `**/*.xml`, `**/*.html`, `./dist/index.js`] }),
	prod &&
		!disable &&
		command([`node scripts/add-package-json.js "${dir}"`, `node scripts/add-ts-definition.js "${dir}" "${oldDir || dir}"`], {
			exitOnFail: !watching,
		}),
];

const generateOutputOptions = options => [
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

const testRound = {
	input: `globbed-tests.ts`,
	output: { file: `dist/build.js`, format: 'cjs' },
	plugins: [
		globFiles({
			file: `globbed-tests.ts`,
			include: testPattern,
			justImport: true,
		}),
		...globalPlugins(),
		command(`zip-tap-reporter node dist/build.js`, { exitOnFail: !watching }),
	],
	external: external(),
};

const compiler = {
	input: `src/compiler/index.ts`,
	output: generateOutputOptions({
		file: `compiler/index`,
		...sharedOutputOptions(),
	}),
	plugins: globalPlugins(`compiler`),
	external: external(),
};

const platforms = {
	input: `src/platforms/index.ts`,
	output: generateOutputOptions({
		file: `platforms/index`,
		...sharedOutputOptions(),
	}),
	plugins: globalPlugins(`platforms`),
	external: external(),
};

const cli = {
	input: `cli/index.ts`,
	output: generateOutputOptions({
		file: `dist/cli`,
		...sharedOutputOptions(),
	}),
	plugins: globalPlugins(null, null, true),
	external: external(),
};

const index = {
	input: `src/runtime/index.ts`,
	output: generateOutputOptions({
		file: `dist/index`,
		...sharedOutputOptions(`index`),
	}),
	plugins: globalPlugins(null, null, true),
	external: external(true),
};

const runtimes = readdirSync(`src/runtime`, 'utf-8')
	.filter(dir => dir.indexOf(`.`) === -1 && dir !== `index`)
	.map(dir => ({
		input: `src/runtime/${dir}/index.ts`,
		output: generateOutputOptions({
			file: `${dir}/index`,
			...sharedOutputOptions(dir),
		}),
		plugins: globalPlugins(dir, `runtime/${dir}`),
		external: external(true),
	}));

export default prod ? [index, compiler, cli, platforms, ...runtimes] : [cli, platforms, testRound];
