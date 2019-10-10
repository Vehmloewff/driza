const readFileTree = require('./read-file-tree');
const deepForEach = require('deep-for-each');
const nodePath = require('path');
const routesShouldBeUnique = require('./routes-should-be-unique');

module.exports = async (dir) => {
	try {
		const filesObj = await readFileTree(dir);
		return returnFiles(filesObj, dir);
	} catch (e) {
		console.error(e);
		return [];
	}
};

function returnFiles(obj, dir) {
	const toReturn = [];

	deepForEach(obj, (code, fileName, subject, path) => {
		if (nodePath.extname(fileName) === '.js') {
			let obj = {};

			// Find the url path
			let url = path.split('.');
			url.pop();
			url = url.filter((val) => val !== '');

			// Find module path
			let modulePath = url.join('/');
			modulePath += '.js';
			modulePath = nodePath.join(dir, modulePath);

			// Remove index
			url = url.filter((val) => val !== 'index');

			url = url.join('/');
			if (url === '') url = '/';

			// populate the array
			obj = { name: url, module: modulePath };

			toReturn.push(obj);
		}
	});

	return routesShouldBeUnique(toReturn);

	// Should return an array full of objects like this:
	/*
	{
		name: 'parent/child',
		module: '/home/code/app/client/parent/child.js'
	}
	*/

	/* Limitations:
		- Naming a folder index is not allowed.
		- Also, there can be only one '.' in a
		filename (e.g. `file.svelte`), and 0
		'.' chars in a folder
	*/
}
