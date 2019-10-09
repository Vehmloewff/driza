const fs = require('fs');

module.exports = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf-8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};
