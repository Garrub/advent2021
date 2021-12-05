const { ENXIO } = require('constants');
const readInput = require('../utils/readInput');
const input = readInput('hydrothermalVenture');
const testInput = readInput('d5test');

const parse = raw => raw.split('\n').map(line => {
  const coords = line.split(' -> ').map(pair => pair.split(','));
  return {
    x: [coords[0][0], coords[1][0]],
    y: [coords[0][1], coords[1][1]],
  };
});

const traverseSegment = (x, y, cb, allowDiag = false) => {
  let i = parseInt(x[0]);
  let j = parseInt(y[0]);
  let end = {x: parseInt(x[1]), y: parseInt(y[1])};
  if (!allowDiag && (i !== end.x) && (j !== end.y)) {
    return;
  }
  do {
    cb(i, j);
    let adjust = {
      x: i === end.x ? 0 : (i < end.x ? 1 : -1),
      y: j === end.y ? 0 : (j < end.y ? 1 : -1),
    }
    i += adjust.x;
    j += adjust.y;
  } while ((i !== end.x) || (j !== end.y));
  //hacky: ensure last square gets marked
  cb(i, j);
};

const hVent = (puzzleInput, handleDiag = false) => {
  const lines = parse(puzzleInput);
  const covered = {};
  let adjust = 0;
  let count = 0;
  for (let line of lines) {
    traverseSegment(line.x, line.y, (x, y) => {
      let coord = `${x},${y}`;
      covered[coord] ??= 0;
      covered[coord]++;
      if (covered[coord] === 2) {
        count++;
      }
    }, handleDiag);
  }
  return count;
}

console.log('should be 5: ', hVent(testInput));
console.log('part1: ', hVent(input));
console.log('should be 12: ', hVent(testInput, true));
console.log('part2: ', hVent(input, true));