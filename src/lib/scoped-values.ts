export default () => {
	const values: { [key: string]: string } = {};

	return {
		getValue: (key: string) => values[key],
		setValue: (key: string, value: string) => (values[key] = value),
	};
};
