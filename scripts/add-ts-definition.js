const write = require('./write-file');
const path = require('path');

const dir = process.argv[2];
const oldDir = process.argv[3];

const tds = `export * from "${path.relative(path.resolve(dir), path.resolve(`typings`, oldDir))}";`;

write(dir + `/index.d.ts`, tds);
