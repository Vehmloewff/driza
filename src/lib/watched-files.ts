export default () => {
	let files: string[] = [];

	return {
		addWatchFile: (path: string) => {
			if (!files.find(p => p === path)) files.push(path);
		},
		removeWatchFile: (path: string) => (files = files.filter(p => p === path)),
		get: () => files,
	};
};
