const createDesktop = require('./lib/create-desktop');
const read = require('../services/read');
const { format } = require('prettier');
const prettierOptions = require('./lib/prettier-options');

module.exports = ({ config }) => {
	return {
		name: 'versatile-dynamic',
		async load(id) {
			if (/versatile\/startup\/index\.js$/.test(id)) {
				let code = await read(id);

				const desktopData = createDesktop({ config });

				code = code
					.replace(`/*{LAUNCH_DESKTOP_CODE}*/`, desktopData.code)
					.replace(`/*{IMPORTS_HERE}*/`, `${desktopData.imports}`);

				code = format(code, prettierOptions('babel'));
				return code;
			}
			return null;
		},
	};
};
