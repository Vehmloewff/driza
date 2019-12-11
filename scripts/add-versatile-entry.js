const write = require('./write-file');
const path = require('path');

const dir = process.argv[2];
const oldDir = process.argv[3];

const code = `export * from "${path.relative(path.resolve(dir), path.resolve(`src`, oldDir))}";`;

write(dir + `/index.ts`, code);
