const read = require('../services/read');
const { format } = require('prettier');
const prettierOptions = require('./lib/prettier-options');
const nodePath = require('path');

module.exports = ({ dir, config, outputPath }) => {
	return {
		name: 'versatile-dynamic',
		async load(id) {
			if (/versatile\/native\/index\.js$/.test(id)) {
				let code = await read(id);

				code = code
					.replace(/\/\*{OUTPUT_PATH}\*\//g, outputPath)
					.replace(/\/\*{ICONS_PATH}\*\//g, nodePath.join(dir, config.iconsDir));

				code = format(code, prettierOptions('babel'));
				return code;
			}
			return null;
		},
	};
};
