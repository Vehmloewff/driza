import { describe } from 'zip-tap';
import { createEventDispatcher } from './events';

describe(`createEventDispatcher`, async it => {
	await it(`should call the listeners when new events are recieved`, async expect => {
		const { on, dispatch } = createEventDispatcher();

		let called = 0;

		on(`event`, data => {
			expect(data).toBe(`cool`);
			called++;
		});

		on(`otherevent`, data => {
			expect(data).toBe(`awesome`);
			called++;
		});

		await dispatch(`event`, `cool`);
		await dispatch(`event`, `cool`);
		await dispatch(`otherevent`, `awesome`);

		expect(called).toBe(3);
	});

	await it(`should only call the 'once' events once`, async expect => {
		const { once, dispatch } = createEventDispatcher();

		let called = 0;

		once(`event`, data => {
			expect(data).toBe(`cool`);
			called++;
		});

		once(`otherevent`, data => {
			expect(data).toBe(`awesome`);
			called++;
		});

		await dispatch(`event`, `cool`);
		await dispatch(`event`, `cool`);
		await dispatch(`otherevent`, `awesome`);

		expect(called).toBe(2);
	});

	await it(`should remove listener when prompted to do so`, async expect => {
		const { on, dispatch } = createEventDispatcher();

		let called = 0;

		const remove = on(`event`, data => {
			expect(data).toBe(`cool`);
			called++;
		});

		on(`otherevent`, data => {
			expect(data).toBe(`awesome`);
			called++;
		});

		await dispatch(`event`, `cool`);
		await dispatch(`otherevent`, `awesome`);

		remove();

		await dispatch(`event`, `cool`);

		expect(called).toBe(2);
	});

	await it(`should respect the args`, async expect => {
		const { on, dispatch } = createEventDispatcher();

		let called = 0;

		on(`event`, (__, _, addArg) => {
			addArg('you');
			called++;
		});

		on(`event`, (_, args, addArg) => {
			expect(args).toMatchObject([`you`]);
			addArg(`me`);
			called++;
		});

		on(`event`, (_, args) => {
			expect(args).toMatchObject([`you`, `me`]);
			called++;
		});

		await dispatch(`event`);

		expect(called).toBe(3);
	});

	await it(`should respect the args with once`, async expect => {
		const { once, dispatch } = createEventDispatcher();

		let called = 0;

		once(`event`, (__, _, addArg) => {
			addArg('you');
			called++;
		});

		once(`event`, (_, args, addArg) => {
			expect(args).toMatchObject([`you`]);
			addArg(`me`);
			called++;
		});

		once(`event`, (_, args) => {
			expect(args).toMatchObject([`you`, `me`]);
			called++;
		});

		await dispatch(`event`);

		expect(called).toBe(3);
	});
});
