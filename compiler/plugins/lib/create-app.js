const baseFromRoute = require('../../services/base-from-route');

module.exports = ({ routes }) => {
	let imports = ``;
	let code = ``;
	let addStateCalls = ``;

	routes.forEach((route) => {
		const base = baseFromRoute(route.name);
		imports += `import Component_${base}, { ASR as ASR_${base} } from '${route.module}';\n`;

		addStateCalls += `addStateOptions = ASR_${base};\n`;
		addStateCalls += `addStateOptions.name = '${route.name}';\n`;
		addStateCalls += `addStateOptions.template = Component_${base};\n`;
		addStateCalls += `stateRouter.addState(addStateOptions);\n\n`;
	});

	imports += `import createStateRouter from 'abstract-state-router';\n`;
	imports += `import createSvelteRenderer from 'svelte-state-renderer';\n`;
	imports += `import sausage from 'sausage-router';\n`;
	imports += `import makeRouter from 'hash-brown-router';\n`;

	code += `const svelteRenderer = createSvelteRenderer({});\n`;
	code += `const pathPrefix = baseUrl + useHash ? '/#/' : '';\n`;
	code += `const routerOptions = { pathPrefix };\n`;
	code += `if (useHash) routerOptions.router = makeRouter(sausage());\n`;
	code += `const stateRouter = createStateRouter(svelteRenderer, document.querySelector('#app-root'), routerOptions);\n`;

	code += `\nlet addStateOptions;\n\n`;

	code += addStateCalls;

	code += `stateRouter.evaluateCurrentRoute(defaultState)\n`;

	return {
		code,
		imports,
	};
};
