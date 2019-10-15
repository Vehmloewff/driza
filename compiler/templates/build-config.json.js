const path = require('path');
const appCategories = require('../services/app-category');

module.exports = ({ outputPath, config }) => {
	return `{
		"appId": "${config.appID}",
		"directories": {
			"output": "${path.join(outputPath, `desktop-package`)}"
		},
		"files": [
			${config.files.map(file => `"${file}"`)}
		],
		"dmg": {
			"contents": [
				{
					"x": 110,
					"y": 150
				},
				{
					"x": 240,
					"y": 150,
					"type": "link",
					"path": "/Applications"
				}
			],
			"icon": "icons/icon.icns"
		},
		"mac": {
			"category": "${appCategories(config.category).mac}",
			"icon": "icons/icon.icns",
			"electronLanguages": [
				"en"
			]
		},
		"linux": {
			"category": "${appCategories(config.category).linux}",
			"target": [
				"AppImage",
				"deb",
				"zip",
				"rpm"
			],
			"icon": "icons"
		},
		"win": {
			"icon": "icons/icon.ico"
		}
	}`;
};
