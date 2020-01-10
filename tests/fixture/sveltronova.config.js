import { platforms, logger } from '../../dist/build.esm';

const parse = args => {
	let watch = true;
	let platform = platforms.electron();
	let object = `run`;
	let file = null;

	let fileIndex = null;

	args.forEach((arg, index) => {
		if (/\./.test(arg)) (file = arg) && (fileIndex = index);
	});

	if (fileIndex !== null) args.splice(fileIndex, 1);

	const has = val => !!args.find(arg => arg.trim() === val);

	if (has('no-watch') || has('nowatch')) watch = false;
	if (has('android') || has('A')) platform = platforms.android();
	// TODO: Add support of ios and windows
	// if (has('ios') || has('I')) platform = 'ios';
	// if (has('windows') || has('window') || has('win') || has('W')) platform = 'windows';
	if (has('build')) object = 'build';
	if (has('compile')) object = 'compile';

	return {
		watch,
		platform,
		object,
		file,
	};
};

export default (logLevel, ...args) => {
	logger.setLevel(logLevel);

	const result = parse(args);

	return {
		appEntry: result.file,
		platform: result.platform,
		object: result.object,
		watch: {
			enable: result.watch,
		},
	};
};
