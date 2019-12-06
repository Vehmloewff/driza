import { describe } from 'zip-tap';
import { ssimpleStore, dependantStore, readableStore } from '.';

describe(`stores`, it => {
	it(`should update and call the subscribers`, expect => {
		const changes = [`this`, `that`, `then`, `there`];
		let count = 0;

		const myStore = ssimpleStore(changes[count]);

		myStore.subscribe((_, initial) => {
			if (!initial) count++;
		});

		myStore.subscribe(val => {
			expect(val).toBe(changes[count]);
		});

		myStore.set(changes[count + 1]);
		myStore.update(val => {
			expect(val).toBe(changes[count]);
			return changes[count + 1];
		});

		myStore.set(changes[count + 1]);

		myStore.get();

		expect(count).toBe(3);
	});

	it(`should unsubscribe themselves when prompted to do so`, expect => {
		const myStore = ssimpleStore(`this`);

		const unsubscribe = myStore.subscribe(val => expect(val).toBe(`this`));

		unsubscribe();

		myStore.set(`that`);
	});

	it(`readable stores should update themselves accoring to the second param`, expect => {
		const firstStore = ssimpleStore(`that`);

		const mirror = readableStore(`this`, ({ set }) => firstStore.subscribe(val => set(val)));

		expect(mirror.get()).toBe(`that`);

		firstStore.set(`there`);

		expect(mirror.get()).toBe(`there`);
	});

	it(`dependant stores should update when the dependents do`, expect => {
		const store1 = ssimpleStore(`then`);
		const store2 = ssimpleStore(`where`);
		const store3 = ssimpleStore(`happened`);

		const shouldUpdateWhenChildrenDo = dependantStore(
			() => [store1.get(), store2.get(), store3.get()],
			store1,
			store2,
			store3
		);

		store2.set(`that`);

		expect(shouldUpdateWhenChildrenDo.get().join(' ')).toBe(`then that happened`);
	});
});
