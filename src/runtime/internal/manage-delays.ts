import { simpleStore, Store } from 'driza/store';

const delays: Store<boolean[]> = simpleStore([]);

export const allDelaysResolved = async () => {
	let unsubscribe: () => void = null;

	await new Promise(resolve => {
		unsubscribe = delays.subscribe(delayArr => {
			if (!delayArr.find(delay => delay)) {
				resolve();
			}
		});
	});

	unsubscribe();
};

export const createDelay = () => {
	let index: number = null;

	delays.update(delayArr => {
		index = delayArr.length;

		delayArr.push(true);
		return delayArr;
	});

	return () => {
		delays.update(delayArr => {
			delayArr[index] = false;
			return delayArr;
		});
	};
};
