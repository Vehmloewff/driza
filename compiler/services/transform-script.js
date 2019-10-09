module.exports = ({ content, attributes }) => {
	// Only transform `context=module`
	if (attributes.context !== `module`) return;

	// Leave it alone if it already has a ASR export
	const regex = /export.+(const|let).+ASR.*=.*{/;
	if (regex.test(content)) return;

	const code = `${content}
	export const ASR = {

	}
	`;

	return { code };
};
