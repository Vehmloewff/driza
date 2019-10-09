const baseFromRoute = require('../../services/base-from-route');
const nodePath = require('path');

module.exports = ({ routes, config }) => {
	let handlers = ``;
	let code = ``;
	let imports = ``;

	imports += `import express from 'express';`;

	// Handle the routes
	routes.forEach((route) => {
		const base = baseFromRoute(route.name);

		imports += `import * as Methods_${base} from '${route.module}';\n`;

		const acceptedMethods = [`get`, `head`, `post`, `put`, `delete`, `connect`, `options`, `trace`, `patch`];

		let methodCatcher = `if (`;
		acceptedMethods.forEach((method, i) => {
			methodCatcher += `method !== '${method}'`;
			if (i !== acceptedMethods.length - 1) methodCatcher += ` && `;
		});
		methodCatcher += `) return;`;

		handlers += `for (let method in Methods_${base}) {
			(function(){
				const fn = Methods_${base}[method];
				
				if (method === 'del') method = 'delete';

				${methodCatcher}

				app[method]('/${nodePath.join(config.serverBasePath, route.name)}', (req, res) => {
					try {
						fn(req, res);
					} catch (ex) {
						errorHandler(err, req, res);
					}
				});
			}())
		}`;
	});

	code += `
	return new Promise((resolve, reject) => {
		const app = express();
		if (json) app.use(express.json());

		middleware.forEach(fn => {
			app.use(fn);
		})

		${handlers}

		app.use((req, res) => {
			try {
				notFoundHandler(req, res);
			} catch (e) {
				errorHandler(err, req, res);
			}
		})

		app.listen(port, (args) => {
			resolve();
		})
	});`;

	return {
		imports,
		code,
	};
};
