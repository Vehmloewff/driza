const readFileTree = require('./read-file-tree');
const flatten = require('flat');
const nodePath = require('path');

module.exports = async (dir, base = '') => {
	const filesObj = await readFileTree(dir);
	const filesFlat = flatten(filesObj, { delimiter: '/' });

	let filesArr = [];
	Object.keys(filesFlat).forEach((path) => {
		if (typeof filesFlat[path] === `object`) return;

		filesArr.push({
			name: nodePath.join(base, path),
			location: nodePath.join(dir, path),
		});
	});

	return filesArr;
};
