import { access, constants } from 'fs';

export default (file: string) => {
	return new Promise<string>(resolve => {
		if (!file) resolve();

		access(file, constants.F_OK, err => {
			if (err) resolve();
			else resolve(file);
		});
	});
};
