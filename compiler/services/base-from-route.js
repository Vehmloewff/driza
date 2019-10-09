module.exports = function baseFromRoute(route) {
	return route.replace(/\.|\//g, '_');
};
