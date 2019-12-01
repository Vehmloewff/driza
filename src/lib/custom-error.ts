export default class extends Error {
	description: string;
	thrower: string;

	constructor(message: string, description: string) {
		super(message + ` - ` + description);

		this.message = message;
		this.description = description;
		this.thrower = `versatile`;
	}
}
