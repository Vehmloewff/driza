import { describe } from 'zip-tap';
import { exec } from 'child_process';
import nodePath from 'path';

describe(`cli`, async it => {
	await it(`should build the electron app`, async expect => {
		await new Promise(resolve => {
			const child = exec(`${nodePath.resolve('bin/driza.js')} nowatch compile --verbose`, {
				cwd: nodePath.resolve('tests/fixture'),
			});

			child.stdout.on('data', data => {
				process.stdout.write(data);
			});

			child.stderr.on('data', data => {
				process.stdout.write(data);
			});

			child.on('close', code => {
				if (code) expect(1).toBe(2);

				resolve();
			});
		});
	});
	await it(`should build the android app`, async expect => {
		await new Promise(resolve => {
			const child = exec(`${nodePath.resolve('bin/driza.js')} nowatch android compile --verbose`, {
				cwd: nodePath.resolve('tests/fixture'),
			});

			child.stdout.on('data', data => {
				process.stdout.write(data);
			});

			child.stderr.on('data', data => {
				process.stdout.write(data);
			});

			child.on('close', code => {
				if (code) expect(1).toBe(2);

				resolve();
			});
		});
	});
});
