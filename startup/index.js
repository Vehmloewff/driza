/*{IMPORTS_HERE}*/
import defaultMenuTemplate from './default-menu-template';

/**
 * Start the client side application
 * @param {{ defaultState?: String}}
 */
export const startApp = async ({ defaultState = 'index' } = {}) => {
	/*{CREATE_APP_CODE}*/
};

export const launchDesktop = async ({
	height = 500,
	width = 800,
	minWidth = 100,
	minHeight = 100,
	maxWidth = null,
	maxHeight = null,
	icon = `assets/favicon.ico`,
	waitUntilReady = true,
	menuTemplate = defaultMenuTemplate,
} = {}) => {
	/*{LAUNCH_DESKTOP_CODE}*/
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
