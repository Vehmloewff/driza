module.exports = ({ config }) => {
	let imports = ``;
	let code = ``;

	imports += `import { app, BrowserWindow, Menu } from 'electron';\n`;

	code += `return new Promise((resolve, reject) => {
		let win

		function createWindow () {
			win = new BrowserWindow({
				width,
				height,
				webPreferences: {
					nodeIntegration: true
				},
				icon,
				backgroundColor: '${config.backgroundColor}',
				show: !waitUntilReady,
				minWidth,
				minHeight,
				maxWidth,
				maxHeight,
			})

			win.loadURL('file:///' + __dirname + '/app.html');

			win.on('closed', () => {
				win = null
			})

			win.once('ready-to-show', () => {
				win.show()
			})
		}

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

		const menu = Menu.buildFromTemplate(menuTemplate({ app }));
		Menu.setApplicationMenu(menu);

		app.on('ready', () => {
			createWindow();
			resolve({ app, win });
		});
		
	});
		`;

	return {
		imports,
		code,
	};
};
