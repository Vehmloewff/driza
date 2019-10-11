const platform = {
	build: '/*{PLATFORM_BUILD}*/',
	browser: platform.build === `browser`,
}

module.exports = {
	platform
};
