const readInput = require('../utils/readInput');
const input = readInput('transparentOrigami');
const test = readInput('d13test');

const parse = raw => {
  let [dots, folds] = raw.split('\n\n');
  folds = folds.split('\n').map(fold => {
    let [instruct, line] = fold.split('=');
    axis = instruct[instruct.length - 1];
    line = parseInt(line);
    return {axis, line};
  });
  dots = new Set(dots.split('\n'));
  return {dots, folds};
};

const getDotFoldLoc = (loc, line) => {
  let dist = loc - line;
  return loc < line ? loc : line - dist;
}

const getDotsFromFold = (dots, fold) => {
  let {axis, line} = fold;
  let newDots = new Set();
  for (let dot of dots) {
    let [x, y] = dot.split(',').map(num => parseInt(num));
    let coord = {x, y};
    let newLoc = getDotFoldLoc(coord[axis], line);
    let newCoord = {
      x,
      y,
      [axis]: newLoc,
    }
    newDots.add(`${newCoord.x},${newCoord.y}`);
  }
  return newDots;
};

const getSizeXY = (dots) => [...dots].reduce((maxSizes, dot) => {
  let [x, y] = dot.split(',').map(num => parseInt(num));
  maxSizes.x = x + 1 > maxSizes.x ? x + 1 : maxSizes.x;
  maxSizes.y = y + 1 > maxSizes.y ? y + 1 : maxSizes.y;
  return maxSizes;
}, {x:0, y:0})

const solve = raw => {
  let {dots, folds} = parse(raw);
  let part1 = null;
  for (let fold of folds) {
    dots = getDotsFromFold(dots, fold);
    part1 ??= dots.size;
  }
  let paperSize = getSizeXY(dots);
  let part2 = [];
  for (let y = 0; y < paperSize.y; y++) {
    part2.push('');
    for (let x = 0; x < paperSize.x; x++) {
      part2[y] += dots.has(`${x},${y}`) ? '#' : '.';
    }
  }
  return {part1, part2}
};

console.log('should be 17, and an O: ', solve(test));
console.log('solution: ', solve(input));