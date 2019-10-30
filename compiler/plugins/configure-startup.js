const createApp = require('./lib/create-app');
const read = require('../services/read');
const { format } = require('prettier');
const prettierOptions = require('./lib/prettier-options');

module.exports = ({ clientRoutes, config, platform }) => {
	return {
		name: 'versatile-dynamic',
		async load(id) {
			if (/versatilejs\/startup\/index\.js$/.test(id)) {
				let code = await read(id);

				const appData = createApp({ routes: clientRoutes, config });

				code = code
					.replace(`/*{CREATE_APP_CODE}*/`, appData.code)
					.replace(`/*{IMPORTS_HERE}*/`, `${appData.imports}`);

				code = format(code, prettierOptions('babel'));
				return code;
			} else if (/versatilejs\/index.js$/.test(id)) {
				let code = await read(id);

				code = code.replace(`/*{PLATFORM_BUILD}*/`, `${platform}`);

				return code;
			}
			return null;
		},
	};
};
