const fs = require('fs');

module.exports = (name, content) => {
	if (!fs.existsSync(name))
		fs.writeFile(name, content, 'utf-8', err => {
			if (err) throw err;
		});
};
