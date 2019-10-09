const readFileTree = require('./read-file-tree');
const deepForEach = require('deep-for-each');
const nodePath = require('path');

module.exports = async (dir) => {
	const filesObj = await readFileTree(dir);
	const files = returnFiles(filesObj, dir);
	return order(files);
};

function returnFiles(obj, dir) {
	const toReturn = [];

	deepForEach(obj, (code, fileName, subject, path) => {
		if (nodePath.extname(fileName) === '.svelte') {
			let obj = {};

			// Find the url path
			let url = path.split('.');
			url.pop();
			url = url.filter((val) => val !== '');

			// Remove index if it is not in the first level
			if (url.length !== 1) {
				url = url.filter((val) => val !== 'index');
			}

			url = url.join('.');

			// populate the array
			obj.name = url;
			obj.module = dir + `/` + path.replace(fileName, '').replace(/\./g, '/') + fileName;

			toReturn.push(obj);
		}
	});

	return toReturn;

	// Should return an array full of objects like this:
	/*
	{
		name: 'parent.child',
		module: '/home/code/app/client/parent/child.svelte'
	}
	*/

	/* Limitations:
		- Naming a folder index is not allowed.
		- Also, there can be only one '.' in a
		filename (e.g. `file.svelte`), and 0
		'.' chars in a folder
	*/
}

function order(routes) {
	const getRoot = (route) => {
		let arr = route.split('.');
		arr.pop();
		return arr.join('.');
	};

	const loop = () => {
		let preDefined = [];
		let workToDo = false;

		for (let routeIndex in routes) {
			const route = routes[routeIndex].name;
			const root = getRoot(route);

			if (root && !preDefined.find((d) => root === d)) {
				let indexOk = null;
				for (let routeIndexInside in routes) {
					if (routes[routeIndexInside].name === root) {
						indexOk = routeIndexInside;
						break;
					}
				}
				if (indexOk) {
					const saving = routes[indexOk];
					routes.splice(indexOk, 1);
					routes.splice(routeIndex, 0, saving);
					workToDo = true;
				} else {
					throw new Error(`The '${root}' state could not be found.`);
				}
				break;
			} else if (!root && route) {
				preDefined.push(route);
			}
		}

		if (workToDo) loop();
	};

	loop();

	return routes;
}
