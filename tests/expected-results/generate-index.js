// #T1
import StateRouter from 'abstract-state-router';
import makeSvelteStateRenderer from 'svelte-state-renderer';

// States
import state$app from '$ROOT$src/app/index.svelte';

const renderer = makeSvelteStateRenderer();

const stateRouter = StateRouter(renderer, document.getElementById(`app-target`));

stateRouter.addState;

stateRouter.on(`routeNotFound`, (route, parameters) => {
	stateRouter.go(`not-found`, { route }, { replace: true });
});

stateRouter.evaluateCurrentRoute(`index`);
// #T2
