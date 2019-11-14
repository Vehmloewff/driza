import nodePath from 'path';

export default (paths: string[], exclude: RegExp[], basePath: string = '') => {
	paths = paths.filter(path => {
		let match = false;

		for (let index in exclude) {
			const pattern = exclude[index];

			match = pattern.test(path);

			if (match) break;
		}

		return !match;
	});

	return paths.map(path => {
		const name = nameFromPath(path);

		return {
			name,
			path: nodePath.resolve(basePath, path),
			id: idFromName(name),
			defaultRoute: routeFromName(name),
		};
	});
};

function nameFromPath(path: string): string {
	const pathArr = path.split('.');
	pathArr.pop();

	path = pathArr.join('.');

	if (path === `index`) return `index`;
	else return path.replace(/\//g, `.`).replace(/\.index/g, ``);
}

function routeFromName(name: string): string {
	return name
		.replace(/\./g, `/`)
		.replace(/index/g, ``)
		.replace(/\/+/, `/`)
		.replace(/^$/, `/`);
}

function idFromName(name: string): string {
	return `state$` + name.replace(/[^a-zA-Z0-9\$_]/g, `$`);
}
