import { EventEmitter } from 'events';

type AsyncFunction<T> = () => Promise<T>;

export class PromiseEmitter<T> extends EventEmitter {
	private func: AsyncFunction<T>;

	set(fn: AsyncFunction<T>) {
		this.func = fn;
	}

	async run(): Promise<T> {
		return this.func();
	}
}
