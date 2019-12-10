export const createFontFace = (name: string, sources: { url: string; format: string }[]) => {
	let str = `@font-face {`;

	str += `font-family: ${name};`;
	str += `src:`;

	str += sources
		.map(src => {
			return `url("${src.url}") format("${src.format}")`;
		})
		.join(',');

	str += `;}`;

	return str;
};
