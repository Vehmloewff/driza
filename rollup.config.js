import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';
import command from 'rollup-plugin-command';
import typescript from 'rollup-plugin-typescript';
import globFiles from 'rollup-plugin-glob-files';
import { string } from 'rollup-plugin-string';
import image from '@rollup/plugin-image';
import nodePath from 'path';
import json from '@rollup/plugin-json';

const name = 'todo';
const sourcemap = true;
const prod = process.env.NODE_ENV === 'production';
const watching = process.env.ROLLUP_WATCH;
const runtime = process.env.BUILD_OBJECT === 'runtime';
const cli = process.env.BUILD_OBJECT === 'cli';
const test = process.env.BUILD_OBJECT === 'test';

const sharedOutputOptions = {
	name,
	sourcemap,
};

const output = [{ file: pkg.main, format: 'cjs', ...sharedOutputOptions }];

output.push({ file: pkg.module, format: 'es', ...sharedOutputOptions });

const plugins = [
	!prod &&
		globFiles({
			file: `globbed-tests.ts`,
			include: `./tests/**/*.ts`,
			justImport: true,
		}),
	image(),
	json(),
	string({ include: [`./src/defaults/**/*txt`, `./src/defaults/**/*.xml`, `./src/defaults/**/*.html`, `./dist/runtime.jstxt`] }),
	resolve({
		preferBuiltins: true,
	}),
	commonjs(),
	typescript({
		typescript: require('typescript'),
	}),
];

const external = id => id[0] !== '.' && !nodePath.isAbsolute(id);

const runtimeConfig = {
	input: 'runtime/index.ts',
	output: { file: 'dist/runtime.jstxt', format: 'esm' },
	external,
	plugins,
};

const cliConfig = {
	input: 'cli/index.ts',
	output: { file: 'dist/cli.js', format: 'cjs' },
	external,
	plugins,
};

const libConfig = {
	input: 'src/index.ts',
	output,
	external,
	plugins,
};

const testConfig = {
	input: 'globbed-tests.ts',
	output: { file: 'dist/tests.js', format: 'cjs' },
	external,
	plugins: [...plugins, command(`zip-tap-reporter node dist/tests.js`, { exitOnFail: !watching })],
};

const configs = [];

if (runtime) configs.push(runtimeConfig);
else if (cli) configs.push(cliConfig);
else configs.push(runtimeConfig, cliConfig, libConfig);

if (test) configs.push(testConfig);

export default configs;
