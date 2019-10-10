module.exports = (name) => {
	if (name === 'index') return '/';
	else return '/' + name.replace(/\./g, '/');
};
