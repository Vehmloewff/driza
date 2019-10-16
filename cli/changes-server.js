const { Server } = require('ws');

module.exports = () => {
	const wss = new Server({ port: 10189 });

	wss.on('connection', (ws) => {
		ws.on('message', (message) => {
			if (message === `ping`) ws.send('pong');
		});

		ws.send('ok');
	});

	const changeMade = async () => {
		return new Promise((resolve) => {
			wss.clients.forEach((ws) => {
				ws.send(`reload`);
				ws.on(`close`, () => {
					resolve();
				});
			});
			if (wss.clients.size === 0) resolve();
		});
	};

	return {
		changeMade,
	};
};
