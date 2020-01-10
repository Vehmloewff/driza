export default (str: string) =>
	str
		.replace(/\.git/g, ``)
		.replace(/[^a-zA-Z0-9]/g, `-`)
		.replace(/-+/g, `-`)
		.toLowerCase();
