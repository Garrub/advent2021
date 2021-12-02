const readInput = require('../utils/readInput.js');
const input = readInput('dive');

const parse = (list) => list.trim().split('\n').map(pair => {
  const tuple = pair.split(' ');
  tuple[1] = Number(tuple[1]);
  if (tuple[0] === 'up') {
    tuple[0] = 'down';
    tuple[1] *= -1;
  }
  return tuple;
});

const dive = (puzzleInput) => {
  const commands = parse(puzzleInput);
  const newPos = commands.reduce((tracker, current) => ({
    hPos: tracker.hPos += current[0] === 'forward' ? current[1] : 0,
    depth: tracker.depth += current[0] === 'down' ? current[1] : 0,
  }), {depth: 0, hPos: 0});
  return newPos.hPos * newPos.depth;
};

console.log(dive(input));

const dive2 = (puzzleInput) => {
  const commands = parse(puzzleInput);
  const newPos = commands.reduce((tracker, current) => ({
    aim: tracker.aim += current[0] === 'down' ? current[1] : 0,
    depth: tracker.depth += current[0] === 'forward' ? current[1] * tracker.aim : 0,
    hPos: tracker.hPos += current[0] === 'forward' ? current[1] : 0,
  }), {aim: 0, hPos: 0, depth: 0});
  return newPos.hPos * newPos.depth;
};

console.log('2: ', dive2(input));