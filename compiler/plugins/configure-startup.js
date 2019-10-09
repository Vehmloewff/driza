module.exports = ({ platform, routes }) => {
	return {
		name: 'versatile-dynamic', // this name will show up in warnings and errors
		load(id) {
			console.log(platform, routes);
			if (id === 'virtual-module') {
				return 'export default "This is virtual!"'; // the source code for "virtual-module"
			}
			return null; // other ids should be handled as usually
		},
	};
};
