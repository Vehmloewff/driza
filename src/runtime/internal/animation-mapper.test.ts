import { describe, addAssertion } from 'zip-tap';
import { animationMapper } from './animation-mapper';

addAssertion((actual, ...expected) => {
	const ok = actual >= expected[0] && actual <= expected[1];

	return {
		ok,
		actual,
		expected: `>= ${expected[0]} && <= ${expected[1]}`,
	};
}, `inbetween`);

describe(`animationMapper.preRun`, async it => {
	it(`should call with the right numbers`, expect => {
		let count = 0;

		animationMapper.preRun(5, 100, t => {
			expect(t).toBe((5 * count) / 100);
			count++;
		});

		expect(count).toBe(21); // Starting at 0, 5, 10, ... 90, 95, 100
	});
	it(`should throw instead of running an infinite loop`, expect => {
		// @ts-ignore
		expect(() => animationMapper.preRun(NaN, `100`, () => {})).toThrow();
	});
});

describe(`animationMapper.live`, async it => {
	await it(`should call with the right numbers`, async expect => {
		let count = 0;

		const mapper = (num: number): Promise<void> =>
			new Promise(resolve => {
				setTimeout(resolve, num);
			});

		await animationMapper.live(
			() => mapper(1),
			400,
			async () => {
				await mapper(1);

				count++;
			}
		);

		expect(count).custom(`inbetween`, 5, 200);
	});
});
