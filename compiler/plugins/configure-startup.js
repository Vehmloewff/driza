const createApp = require('./lib/create-app');
const read = require('../services/read');
const { format } = require('prettier');
const prettierOptions = require('./lib/prettier-options');

module.exports = ({ clientRoutes, config }) => {
	return {
		name: 'versatile-dynamic',
		async load(id) {
			if (/versatile\/startup\/index\.js$/.test(id)) {
				let code = await read(id);

				const appData = createApp({ routes: clientRoutes, config });

				code = code
					.replace(`/*{CREATE_APP_CODE}*/`, appData.code)
					.replace(`/*{IMPORTS_HERE}*/`, `${appData.imports}`);

				code = format(code, prettierOptions('babel'));
				return code;
			}
			return null;
		},
	};
};
