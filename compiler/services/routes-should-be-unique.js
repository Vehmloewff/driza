module.exports = (routes) => {
	let error = null;

	routes.forEach((route) => {
		if (routes.find((r) => r.name === route.name && r.module !== route.module))
			error = `All routes must be unique, but '${route.name}' already exists.
Because of this error, versatile is bundling an empty set of routes.`;
	});

	if (error) {
		console.warn(error);
		return [];
	} else return routes;
};
