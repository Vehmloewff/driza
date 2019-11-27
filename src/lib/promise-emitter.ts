import { asyncForeach } from './utils';

export default class extends Promise<any> {
	listeners: { [eventName: string]: ((value: any) => Promise<void> | void)[] } = {};

	constructor(
		executor: (
			resolve: (value?: any) => void,
			reject: (value?: any) => void,
			emit: (event: string, value: any) => void
		) => void
	) {
		super((resolve, reject) => {
			executor(resolve, reject, this.emit);
		});
	}

	private async emit(event: string, value: any) {
		if (Array.isArray(this.listeners[event]))
			await asyncForeach(
				this.listeners[event],
				async (fn: (value?: any) => Promise<void> | void) => await fn(value)
			);
	}

	public onSignal(event: string, fn: (value: any) => Promise<void> | void) {
		if (Array.isArray(this.listeners[event])) this.listeners[event].push(fn);
		else this.listeners[event] = [fn];
	}
}
