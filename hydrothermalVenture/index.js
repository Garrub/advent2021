const readInput = require('../utils/readInput');
const input = readInput('hydrothermalVenture');

const parse = raw => raw.split('\n').map(line => {
  const coords = line.split(' -> ').map(pair => pair.split(','));
  return {
    x: [coords[0][0], coords[1][0]],
    y: [coords[0][1], coords[1][1]],
  };
});

const hVent = puzzleInput => {
  const lines = parse(puzzleInput);
  const covered = {};
  let start;
  let end;
  let axes;
  let base;
  let count = 0;
  for (let line of lines) {
    if (line.x[0] === line.x[1]) {
      axes = {stable: 'x', vary: 'y'}
    } else if (line.y[0] === line.y[1]) {
      axes = {stable: 'y', vary: 'x'}
    } else {
      continue;
    }
    start = parseInt(line[axes.vary][0]);
    end = parseInt(line[axes.vary][1]);
    if (start > end) {
      [start, end] = [end, start];
    }
    base = parseInt(line[axes.stable][0]);
    for (let i = start; i <= end; i++) {
      let {x, y} = {[axes.vary]: i, [axes.stable]: base};
      let coord = `${x},${y}`
      covered[coord] ??= 0;
      covered[coord]++;
      if (covered[coord] === 2) {
        count++;
      }
    }
  }
  return count;
}

console.log('part1: ', hVent(input));