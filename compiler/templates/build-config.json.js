module.exports = ({ config }) => {
	return `{
		"appId": "${config.appID}",
		"directories": {
			"output": "dist/desktop-packaged"
		},
		"files": [
			"dist/desktop/**",
			"icons/**"
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
		"linux": {
			"category": "Development",
			"target": [
				"AppImage",
				"deb"
			],
			"icon": "icons",
		},
		"win": {
			"icon": "icons/icon.ico"
		}
	}`;
};
