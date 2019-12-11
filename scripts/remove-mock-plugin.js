const pathTest = /src\/runtime\/internal\/renderer.ts$/;
const rendererTest = /\/\*RENDERER_START\*\/(\n|.)*\/\*RENDERER_END\*\//;

export default {
	resolve: id => {
		if (pathTest.test(id)) return id;
		else return null;
	},
	transform: (code, id) => {
		if (!pathTest.test(id)) return;

		code = code.replace(rendererTest, `return versatilejs.renderer;`);

		return code;
	},
};
