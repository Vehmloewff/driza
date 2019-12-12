import { asyncForeach } from 'utils';

export interface ReadableStore<StoreType> {
	get: () => StoreType;
	subscribe: (fn: (currentValue: StoreType, initial: boolean) => void) => () => void;
}

export interface StoreActions<StoreType> {
	set: (newValue: StoreType) => Promise<void>;
	update: (fn: (currentValue: StoreType) => StoreType) => void;
}

export interface Store<StoreType> extends ReadableStore<StoreType>, StoreActions<StoreType> {}

export const simpleStore = <StoreType>(startValue: StoreType): Store<StoreType> => {
	let value: StoreType = startValue;
	let subscribers: ((currentValue: StoreType, initial: boolean) => Promise<void> | void)[] = [];

	const subscribe = (fn: (currentValue: StoreType, intial: boolean) => Promise<void> | void) => {
		fn(value, true);

		subscribers.push(fn);

		return () => (subscribers = subscribers.filter(subscriber => subscriber !== fn));
	};

	const set = async (newValue: StoreType) => {
		value = newValue;
		await asyncForeach(subscribers, async fn => await fn(value, false));
	};

	const update = (fn: (currentValue: StoreType) => StoreType) => set(fn(value));

	const get = () => value;

	return {
		subscribe,
		set,
		update,
		get,
	};
};

export const dependantStore = <StoreType>(startValue: () => StoreType, ...updatables: Store<any>[]): Store<StoreType> => {
	const { subscribe, set, update, get } = simpleStore(startValue());

	updatables.forEach(updatable => {
		updatable.subscribe(() => set(startValue()));
	});

	return {
		subscribe,
		set,
		update,
		get,
	};
};

export const readableStore = <StoreType>(startValue: StoreType, updater: (actions: StoreActions<StoreType>) => void): ReadableStore<StoreType> => {
	const { subscribe, set, update, get } = simpleStore(startValue);

	updater({ set, update });

	return {
		subscribe,
		get,
	};
};
