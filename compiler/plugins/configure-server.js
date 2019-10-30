const createServer = require('./lib/create-server');
const read = require('../services/read');
const { format } = require('prettier');
const prettierOptions = require('./lib/prettier-options');

module.exports = ({ routes, config, serve }) => {
	return {
		name: 'versatile-dynamic',
		async load(id) {
			if (/versatilejs\/startup\/index\.js$/.test(id)) {
				let code = await read(id);

				const serverData = createServer({ routes, config, serve });

				code = code
					.replace(`/*{CREATE_SERVER_CODE}*/`, serverData.code)
					.replace(`/*{IMPORTS_HERE}*/`, `${serverData.imports}`);

				code = format(code, prettierOptions('babel'));
				return code;
			}
			return null;
		},
	};
};
