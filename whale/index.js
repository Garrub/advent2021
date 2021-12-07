const readInput = require('../utils/readInput');
const test = readInput('d7test');
const input = readInput('whale');

const getMedian = list => {
  const sorted = crabPos.sort((a, b) => a - b);
  const index = (sorted.length - 1) / 2;
  return sorted.length % 2 === 1 ?
    sorted[index] :
    (sorted[Math.ceil(index)] + sorted[Math.floor(index)]) / 2;
}

const getAlignmentFuel = raw => {
  crabPos = raw.split(',').map(x => parseInt(x));
  const median = getMedian(crabPos);
  return crabPos.reduce((dist, cur) => dist + Math.abs(median - cur), 0);
}

console.log('should be 37: ', getAlignmentFuel(test));
console.log('part 1: ', getAlignmentFuel(input));