import { asyncForeach } from '../../utils';

export const createEventDispatcher = () => {
	type Listener = (data?: any) => Promise<void> | void;

	const dispatchAwaiters: {
		[event: string]: {
			listeners: Listener[];
			oneTimeListeners: Listener[];
			called: boolean;
			callWithData?: any;
		};
	} = {};

	const addEventListener = (event: string, listener: Listener, once: boolean = false) => {
		if (dispatchAwaiters[event]) {
			if (dispatchAwaiters[event].called && once) {
				listener(dispatchAwaiters[event].callWithData);
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
		if (dispatchAwaiters[event]) {
			asyncForeach(dispatchAwaiters[event].listeners, async listener => await listener(data));

			let called = 0;
			while (dispatchAwaiters[event].oneTimeListeners.length) {
				await dispatchAwaiters[event].oneTimeListeners[0](data);

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
