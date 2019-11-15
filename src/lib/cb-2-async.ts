export default (fn: Function, ...args: any[]): Promise<any> => {
	return new Promise((resolve, reject) => {
		fn(...args, (err: Error, data: any) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};
