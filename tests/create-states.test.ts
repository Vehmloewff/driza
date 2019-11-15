import { describe } from 'zip-tap';
import createStates from '../src/create-states';
import nodePath from 'path';

describe(`createStates`, it => {
	const fromRoot = (loc: string) => nodePath.resolve(loc);

	it(`should create the states`, expect => {
		expect(
			createStates(
				[
					`index.svelte`,
					`about.svelte`,
					`blog.svelte`,
					`panel/index.svelte`,
					`panel/user.svelte`,
				],
				[],
				`./src`
			)
		).toMatchObject([
			{
				name: `index`,
				path: fromRoot(`src/index.svelte`),
				id: `state$index`,
				defaultRoute: `/`,
			},
			{
				name: `about`,
				path: fromRoot(`src/about.svelte`),
				id: `state$about`,
				defaultRoute: `about`,
			},
			{
				name: `blog`,
				path: fromRoot(`src/blog.svelte`),
				id: `state$blog`,
				defaultRoute: `blog`,
			},
			{
				name: `panel`,
				path: fromRoot(`src/panel/index.svelte`),
				id: `state$panel`,
				defaultRoute: `panel`,
			},
			{
				name: `panel.user`,
				path: fromRoot(`src/panel/user.svelte`),
				id: `state$panel$user`,
				defaultRoute: `panel/user`,
			},
		]);
	});

	it(`should exclude the underscore`, expect => {
		expect(
			createStates(
				[
					`this/that.svelte`,
					`_components/me.svelte`,
					`that/_you.svelte`,
					`_inner.svelte`,
					`fo_oler.svelte`,
				],
				[/^(.+\/|)_.+$/]
			)
		).toMatchObject([
			{
				name: `this.that`,
				path: fromRoot(`this/that.svelte`),
				id: `state$this$that`,
				defaultRoute: `this/that`,
			},
			{
				name: `fo_oler`,
				path: fromRoot(`fo_oler.svelte`),
				id: `state$fo_oler`,
				defaultRoute: `fo_oler`,
			},
		]);
	});
});
