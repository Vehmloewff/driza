module.exports = (parser) => {
	return JSON.parse(`{
		"arrowParens": "always",
		"bracketSpacing": true,
		"endOfLine": "lf",
		"htmlWhitespaceSensitivity": "css",
		"insertPragma": false,
		"printWidth": 120,
		"proseWrap": "preserve",
		"requirePragma": false,
		"semi": true,
		"singleQuote": true,
		"tabWidth": 4,
		"trailingComma": "es5",
		"useTabs": true,
		"parser": "${parser}"
	}`);
};