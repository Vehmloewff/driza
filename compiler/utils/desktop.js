const write = require('write');
const nodePath = require('path');
const { format } = require('prettier');
const prettierOptions = require('../plugins/lib/prettier-options');
const read = require('../services/read');

module.exports = async ({ dir, config, outputPath }) => {
	const file = require('../templates/electron-main')({ config, dir });
	await write(nodePath.join(outputPath, `desktop/index.js`), format(file, prettierOptions('babel')));

	let template;
	if (config.template === 'default') template = require('../templates/template.html');
	else template = await read(nodePath.join(dir, config.template));

	const styles = `<link rel="stylesheet" href="app.css">`;
	const appElement = `<div id="app-root"></div>`;
	const script = `<script src="app.js"></script>`;
	template = template
		.replace(`%versatile_styles%`, `${styles}`)
		.replace(`%versatile_app%`, `${appElement}`)
		.replace(`%versatile_scripts%`, `${script}`);

	await write(nodePath.join(outputPath, `desktop/app.html`), format(template, prettierOptions('html')));

	const packageJSON = require('../templates/electron-package.json')({ config });
	await write(nodePath.join(outputPath, `desktop/package.json`), packageJSON);

	return {
		cssPath: `app.css`,
		jsPath: `app.js`,
	};
};
