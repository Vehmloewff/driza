const write = require('write');
const nodePath = require('path');
const { format } = require('prettier');
const prettierOptions = require('../plugins/lib/prettier-options');

module.exports = async ({ config, outputPath, }) => {
	const file = require('../templates/electron-main');
	await write(nodePath.join(outputPath, `desktop/index.js`), format(file, prettierOptions('babel')))

	let template;
	if (config.template === 'default') template = require('../templates/template.html');
	else template = await read(nodePath.join(dir, config.template));

	const requireSlash = (route) => {
		if (route.charAt(0) === '/') return route;
		else return '/' + route;
	};

	const styles = `<link rel="stylesheet" href="app.css">`;
	const appElement = `<div id="app-root"></div>`;
	const script = `<script src="app.js"></script>`;
	template = template
		.replace(`%versatile_styles%`, `${styles}`)
		.replace(`%versatile_app%`, `${appElement}`)
		.replace(`%versatile_scripts%`, `${script}`);

	await write(nodePath.join(outputPath, `desktop/app.html`), format(template, prettierOptions('html')));

	return {
		cssPath: `app.css`,
		jsPath: `app.js`,
	};
};
