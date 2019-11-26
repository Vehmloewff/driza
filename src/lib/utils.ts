export const asyncForeach = async (
	arr: unknown[],
	fn: (value?: unknown, index?: number) => Promise<void> | void
) => {
	for (let index in arr) {
		await fn(arr[index], Number(index));
	}
};
