const addServerCode = require('./lib/add-server-code');
const addClientCode = require('./lib/add-client-code');
const read = require('../services/read');

module.exports = ({ platform, routes }) => {
	return {
		name: 'versatile-dynamic',
		async load(id) {
			if (/versatile\/startup\/index\.js$/.test(id)) {
				let code = await read(id);
				code = code
					.replace(`/*{CLIENT_CODE}*/`, addClientCode({ routes }))
					.replace(`/*{SERVER_CODE}*/`, addServerCode({ routes }))
					.replace(`/*{ON_SERVER_BOOL}*/`, platform === `server`);

				return code;
			}
			return null;
		},
	};
};
