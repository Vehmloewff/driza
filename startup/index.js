/**
 * Generate the client side routes
 * @param {String} baseUrl The base url of the application
 */
export const createClient = async ({ baseUrl = '/', useHash = false, defaultState = 'index' } = {}) => {
	/*{CLIENT_CODE}*/
};

/**
 * Generate the server side routes
 * @param {String?} baseUrl The base url of the application
 */
export const createServer = async ({ baseUrl = '/', port = `3000`, host = `locahost` } = {}) => {
	/*{SERVER_CODE}*/
};

export const onServer = (function () {
	return /*{ON_SERVER_BOOL}*/;
}());
