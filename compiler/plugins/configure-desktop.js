const read = require('../services/read');
const { format } = require('prettier');
const prettierOptions = require('./lib/prettier-options');

module.exports = ({ outputPath }) => {
	return {
		name: 'versatile-dynamic',
		async load(id) {
			if (/versatile\/native\/index\.js$/.test(id)) {
				let code = await read(id);

				code = code.replace(/\/\*{OUTPUT_PATH}\*\//g, outputPath);

				code = format(code, prettierOptions('babel'));
				return code;
			}
			return null;
		},
	};
};
