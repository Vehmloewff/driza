export const asyncForeach = async <T>(
	arr: T[],
	fn: (value?: T, index?: number) => Promise<void> | void
) => {
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

export const callLikeArray = async <T>(
	valOrArray: T[] | T,
	cb: (val: T) => void | Promise<void>
) => {
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
