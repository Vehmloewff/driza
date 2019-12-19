export const animationMapper = {
	live: async (mapper: () => Promise<void>, duration: number, cb: (t: number) => Promise<void> | void) => {
		let soFar = 0;
		let waits = 0;

		const average = () => (waits === 0 ? 0 : soFar / waits);

		while (true) {
			console.log(soFar);
			const startTime = Date.now();

			await mapper();
			await cb(soFar / duration);

			soFar += Date.now() - startTime;
			waits++;

			if (soFar + average() / 2 >= duration) break;

			if (Number.isNaN(soFar) || Number.isNaN(waits) || Number.isNaN(duration)) throw new Error(`Got 'NaN'!`);
		}
	},
	preRun: (interval: number, duration: number, cb: (t: number) => void) => {
		if (!interval || !duration || !cb) throw new Error(`All arguments to 'animationMapper.live' are required!`);

		const runs = duration / interval;

		for (let run = 0; run <= runs; run++) {
			cb(runs === 0 ? 0 : run / runs);
			if (Number.isNaN(run) || Number.isNaN(runs)) throw new Error(`Got 'NaN'!`);
		}
	},
};
