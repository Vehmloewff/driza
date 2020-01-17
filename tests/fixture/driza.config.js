import { electron, android, www, browser } from '../../platforms/index';

const parse = args => {
	let watch = true;
	let platform = electron();
	let object = `run`;
	let file = null;

	let fileIndex = null;

	args.forEach((arg, index) => {
		if (/\./.test(arg)) (file = arg) && (fileIndex = index);
	});

	if (fileIndex !== null) args.splice(fileIndex, 1);

	const has = val => !!args.find(arg => arg.trim() === val);

	if (has('no-watch') || has('nowatch')) watch = false;
	if (has('android') || has('A')) platform = android();
	if (has('www') || has('W')) platform = www();
	if (has('browser') || has('B')) platform = browser();
	// TODO: Add support of ios and windows
	// BODY: We just need the hardware to do it
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

export default (...args) => {
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
