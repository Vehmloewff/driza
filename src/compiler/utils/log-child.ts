import { ChildProcess } from 'child_process';

export const logChild = (errorLog: any, dataLog: any, child: ChildProcess, fatalLog = errorLog) => {
	child.stdout.on('data', data => dataLog(data.toString().trim()));
	child.stderr.on('data', data => errorLog(data.toString().trim()));
	child.on('close', code => {
		if (code) fatalLog(`A child process exited with a non-0 exit code.`);
	});

	process.on('exit', () => {
		child.kill('SIGINT');
	});
};
