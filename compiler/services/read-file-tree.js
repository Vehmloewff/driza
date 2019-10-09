const readFileTreeLib = require('read-file-tree');

module.exports = function readFileTree(dir) {
	return new Promise((resolve, reject) => {
		// TODO: This promise never resolves if the directory is empty.
		// https://github.com/goto-bus-stop/read-file-tree/pull/2 should
		// fix this.
		readFileTreeLib(dir, { encoding: 'utf-8' }, (err, tree) => {
			if (err) reject(err);
			else resolve(tree);
		});
	});
};
