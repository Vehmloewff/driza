export const asyncForeach = async <T>(arr: T[], fn: (value: T, index: number) => Promise<void> | void) => {
	for (let index in arr) {
		await fn(arr[index], Number(index));
	}
};

export const cb2Asnyc = (fn: Function, ...args: any[]): Promise<any> => {
	return new Promise((resolve, reject) => {
		fn(...args, (err: Error, data: any) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};

export const callLikeArray = async <T>(valOrArray: T[] | T, cb: (val: T) => void | Promise<void>) => {
	if (Array.isArray(valOrArray)) asyncForeach(valOrArray, async val => await cb(val));
	else await cb(valOrArray);
};

const nums = `1234567890`.split('');
const letters = `abcdefghijklmnopqrstuvwxyz`;
const specialChars = `-`.split('');
const lowerCaseLetters = letters.split('');
const upperCaseLetters = letters.toUpperCase().split('');

const choices = nums.concat(lowerCaseLetters, upperCaseLetters, specialChars);

export const random = (length: number) => {
	const getChar = () => choices[Math.floor(Math.random() * choices.length)];

	let chars = ``;
	for (let cur = 0; cur < length; cur++) {
		chars += getChar();
	}

	return chars;
};

// Adapted from https://github.com/TehShrike/mannish/blob/master/index.js
export interface Mediator {
	provide: <Arg, ReturnType>(name: string, fn: (arg: Arg) => ReturnType) => () => void;
	call: <Arg, ReturnType>(name: string, arg: Arg) => ReturnType;
}

export const createMediator = (): Mediator => {
	const providers = Object.create(null);

	return {
		provide: <Arg, ReturnType>(name: string, fn: (arg: Arg) => ReturnType) => {
			if (typeof fn !== `function`) {
				throw new Error(`${fn} is not a function`);
			} else if (typeof name !== `string`) {
				throw new Error(`The provider name must be a string`);
			} else if (providers[name]) {
				throw new Error(`There is already a provider for "${name}"`);
			} else {
				providers[name] = fn;
			}

			let removed = false;
			return () => {
				if (!removed) {
					delete providers[name];
					removed = true;
				}
			};
		},
		call: <Arg, ReturnType>(name: string, arg: Arg): ReturnType => {
			if (providers[name]) {
				return providers[name](arg);
			} else {
				throw new Error(`No provider found for "${name}"`);
			}
		},
	};
};
