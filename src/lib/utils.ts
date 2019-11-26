export const asyncForeach = async (
	arr: unknown[],
	fn: (value?: unknown, index?: number) => Promise<void> | void
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
