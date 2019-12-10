import { asyncForeach } from '../../utils';
import { EventListener as Listener } from '../interfaces';

export const createEventDispatcher = () => {
	const dispatchAwaiters: {
		[event: string]: {
			listeners: Listener[];
			oneTimeListeners: Listener[];
			called: boolean;
			callWithData?: any;
			args?: any[];
		};
	} = {};

	const addEventListener = (event: string, listener: Listener, once: boolean = false) => {
		if (dispatchAwaiters[event]) {
			if (!dispatchAwaiters[event].args) dispatchAwaiters[event].args = [];

			if (dispatchAwaiters[event].called && once) {
				listener(dispatchAwaiters[event].callWithData, dispatchAwaiters[event].args, data => {
					dispatchAwaiters[event].args.push(data);
				});
			}

			dispatchAwaiters[event][once ? 'oneTimeListeners' : 'listeners'].push(listener);
		} else {
			dispatchAwaiters[event] = {
				listeners: !once ? [listener] : [],
				oneTimeListeners: once ? [listener] : [],
				called: false,
			};
		}

		return () => {
			dispatchAwaiters[event].listeners = (dispatchAwaiters[event].listeners || []).filter(fn => fn !== listener);
		};
	};

	const on = (event: string, listener: Listener) => addEventListener(event, listener);

	const once = (event: string, listener: Listener) => {
		addEventListener(event, listener, true);
	};

	const dispatch = async (event: string, data?: any) => {
		const addArg = (data: any) => {
			dispatchAwaiters[event].args.push(data);
		};

		if (dispatchAwaiters[event]) {
			dispatchAwaiters[event].args = [];

			await asyncForeach(dispatchAwaiters[event].listeners, async listener => await listener(data, dispatchAwaiters[event].args, addArg));

			let called = 0;
			while (dispatchAwaiters[event].oneTimeListeners.length) {
				await dispatchAwaiters[event].oneTimeListeners[0](data, dispatchAwaiters[event].args, addArg);

				dispatchAwaiters[event].oneTimeListeners.shift();

				called++;
			}

			dispatchAwaiters[event].called = true;
			dispatchAwaiters[event].callWithData = data;

			return dispatchAwaiters[event].listeners.length + called;
		}

		return null;
	};

	return {
		on,
		once,
		dispatch,
	};
};
