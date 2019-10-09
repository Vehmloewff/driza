/*{IMPORTS_HERE}*/

/**
 * Start the client side application
 * @param {String?} defaultState The application's default state
 */
export const startApp = async ({ defaultState = 'index' } = {}) => {
	/*{CREATE_APP_CODE}*/
};

/**
 * Start the server
 * @param {{
 * 	port?: String,
 * 	middleware?: Array<(req, res, next) => {}: void>,
 * 	json?: Boolean,
 * 	errorHandler: (err, req, res, next) => void,
 * 	notFoundHandler: (req, res) => void
 * }}
 */
export const createServer = async ({
	port = 3000,
	middleware = [],
	json = true,
	errorHandler = (err, req, res) => {
		console.error(err);
		res.status(500).send('Something went wrong...');
	},
	notFoundHandler = (req, res) => {
		res.status(404).send('Not found.');
	},
} = {}) => {
	/*{CREATE_SERVER_CODE}*/
};
