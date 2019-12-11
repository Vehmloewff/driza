const write = require('./write-file');

const pkg = {
	main: `index.js`,
	module: `index.mjs`,
	typings: `index.d.ts`,
};

const dir = process.argv[2];

if (dir !== `workflow` && dir !== `compiler`) pkg.browser = `index.browser.js`;

write(dir + `/package.json`, JSON.stringify(pkg));
