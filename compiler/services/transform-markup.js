module.exports = ({ content }) => {
	// Make sure that every file has a `<script context=module></script>` tag
	let code = testScript(content);

	return { code };
};

function testScript(code) {
	const scriptTester = /<script.*context=.*module.*>/;
	if (scriptTester.test(code)) return code;

	return `<script context="module">
	
	</script>
	
	${code}`;
}
