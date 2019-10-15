module.exports = () => {
	return {
		clientDir: `client`,
		serverDir: `server`,
		assetsDir: `assets`,
		serverEntry: `server.js`,
		desktopEntry: `desktop.js`,
		serverBasePath: `api`,
		clientBasePath: `/`,
		assetsBasePath: `/`,
		template: `default`,
		browserDependencies: [],
		osDependencies: [],
		appName: `versatile-app`,
		appID: `versatile-app`,
		productName: `Versatile App`,
		backgroundColor: `#2e2c29`,
		files: ['dist/desktop/**', 'icons/**'],
		category: 'developer-tools',
	};
};
