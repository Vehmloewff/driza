import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import command from 'rollup-plugin-command';
import typescript from 'rollup-plugin-typescript';
import globFiles from 'rollup-plugin-glob-files';
import nodePath from 'path';

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

const output = [{ file: pkg.main, format: 'cjs', ...sharedOutputOptions }];

if (prod) output.push({ file: pkg.module, format: 'es', ...sharedOutputOptions });

export default {
	input: prod ? 'src/index.ts' : 'globbed-tests.ts',
	output,
	external: [`path`],
	plugins: [
		globFiles({
			file: `globbed-tests.ts`,
			include: testPattern,
			justImport: true,
		}),
		resolve({
			preferBuiltins: true,
			browser: browserMode,
		}),
		commonjs(),
		!prod && command(`node ${pkg.main} | zip-tap-reporter`, { exitOnFail: !watching }),
		typescript({
			typescript: require('typescript'),
		}),
	],
};
