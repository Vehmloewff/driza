import write from 'write';
import nodePath from 'path';
import { asyncForeach } from './utils';

export default (root: string) => {
	const files: { code: string; path: string; id: string; params: any }[] = [];

	const writeFileNow = async (path: string, code: string, id: string) => {
		await write(nodePath.join(root, id, path), code);
	};

	return {
		createWriter: (id: string, transformParams?: any) => (path: string, code: string) => {
			files.push({ path, code, id, params: transformParams });
		},
		writeFileNow,
		transformFiles: async (
			fn: (code?: string, file?: string, params?: any) => string | Promise<string>
		) => {
			asyncForeach(files, async ({ code, path, params }) => {
				code = await fn(path, code, params);
			});
		},
		now: async () => {
			await asyncForeach(files, async ({ code, path, id }) => {
				await writeFileNow(path, code, id);
			});
		},
	};
};
