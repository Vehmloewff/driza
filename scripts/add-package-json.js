const write = require('./write-file');

const pkg = {
	main: `index.js`,
	module: `index.mjs`,
	typings: `index.d.ts`,
};

const dir = process.argv[2];

write(dir + `/package.json`, JSON.stringify(pkg));
