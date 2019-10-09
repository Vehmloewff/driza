const addServerCode = require('./lib/add-server-code');
const addClientCode = require('./lib/add-client-code');
const read = require('../services/read');
const { format } = require('prettier');
const prettierOptions = require('./lib/prettier-options');

module.exports = ({ platform, routes }) => {
	return {
		name: 'versatile-dynamic',
		async load(id) {
			if (/versatile\/startup\/index\.js$/.test(id)) {
				let code = await read(id);

				const client = addClientCode({ routes });
				const server = addServerCode({ routes });

				code = code
					.replace(`/*{CLIENT_CODE}*/`, client.code)
					.replace(`/*{SERVER_CODE}*/`, server.code)
					.replace(`/*{IMPORTS_HERE}*/`, `${server.imports}\n${client.imports}`)
					.replace(`/*{ON_SERVER_BOOL}*/`, platform === `server`);

				code = format(code, prettierOptions);
				return code;
			}
			return null;
		},
	};
};
