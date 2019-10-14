const path = require('path');

module.exports = ({ config, dir }) => {
	return `const path = require('path');
	
	const { app, BrowserWindow } = require('electron')
	let win

	function createWindow () {
		win = new BrowserWindow({
			width: ${config.desktop.width},
			height: ${config.desktop.height},
			webPreferences: {
				nodeIntegration: true
			},
			icon: '${path.join(dir, config.desktop.icon)}',
			backgroundColor: '${config.backgroundColor}',
			show: ${!config.desktop.waitUntilReady},
			minWidth: ${config.desktop.minWidth},
			minHeight: ${config.desktop.minHeight},
			${config.desktop.maxWidth ? `maxWidth: ${config.desktop.minWidth},` : ''}
			${config.desktop.maxHeight ? `maxHeight: ${config.desktop.minHeight},` : ''}
		})

		win.loadFile('app.html');

		win.on('closed', () => {
			win = null
		})

		win.once('ready-to-show', () => {
			win.show()
		})
	}

	app.on('ready', createWindow)

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})

	app.on('activate', () => {
		if (win === null) {
			createWindow()
		}
	})
	`;
};
