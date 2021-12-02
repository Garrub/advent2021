const {readFileSync} = require('fs');
const {join} = require('path');


module.exports = function readInput(filename) {
  if (filename.substring(filename.length - 4) !== '.txt') filename += '.txt';
  return readFileSync(join(__dirname, '..', 'inputs', filename), 'utf-8');
}