module.exports = (/*{ routes }*/) => {
	// let handlers = ``;
	let code = ``;
	let imports = ``;

	imports += `import http from 'http';\n`;

	code += `const app = express();`;

	return {
		imports,
		code,
	};
};
