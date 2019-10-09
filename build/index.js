(function () {
	'use strict';

	/**
	 * Generate the client side routes
	 * @param {String} baseUrl The base url of the application
	 */
	const createClient = async ({ baseUrl = '/', useHash = false, defaultState = 'index' } = {}) => {
		/*{CLIENT_CODE}*/
	};

	/**
	 * Generate the server side routes
	 * @param {String?} baseUrl The base url of the application
	 */
	const createServer = async ({ baseUrl = '/', port = `3000`, host = `locahost` } = {}) => {
		/*{SERVER_CODE}*/
	};

	const onServer = (function () {
		return /*{ON_SERVER_BOOL}*/;
	}());

	(async function(){

		// Create the app
		if (onServer) await createServer();
		else await createClient();
		
		// Some other logic
		console.log("App started!");
	}());

}());
