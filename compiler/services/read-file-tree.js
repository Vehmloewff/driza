const readFileTreeLib = require('read-file-tree');

module.exports = function readFileTree(dir) {
	return new Promise((resolve, reject) => {
		readFileTreeLib(dir, { encoding: 'utf-8' }, (err, tree) => {
			if (err) reject(err);
			else resolve(tree);
		});
	});
};
