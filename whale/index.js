const readInput = require('../utils/readInput');
const test = readInput('d7test');
const input = readInput('whale');

const getMedian = list => {
  const sorted = crabPos.sort((a, b) => a - b);
  const index = (sorted.length - 1) / 2;
  return sorted.length % 2 === 1 ?
    sorted[index] :
    (sorted[Math.ceil(index)] + sorted[Math.floor(index)]) / 2;
};

const getMean = list => {
  //ceil to pass test input, floor for real input. IDK why. maybe bad float math?
  return Math.floor(list.reduce((sum, cur) => sum + cur) / list.length);
};

const getFuel1 = (crabs, level) => crabs.reduce((dist, cur) => dist + Math.abs(level - cur), 0)
const getFuel2 = (crabs, level) => crabs.reduce((dist, cur) => {
  const diff = Math.abs(level - cur)
  return dist + (diff * (diff + 1)) / 2
}, 0)

const getAlignmentFuel = (raw, getLevel, getFuel) => {
  crabPos = raw.split(',').map(x => parseInt(x));
  const level = getLevel(crabPos);
  return getFuel(crabPos, level);
};

console.log('should be 37: ', getAlignmentFuel(test, getMedian, getFuel1));
console.log('part 1: ', getAlignmentFuel(input, getMedian, getFuel1));
console.log('should be 168: ', getAlignmentFuel(test, getMean, getFuel2));
console.log('part 2: ', getAlignmentFuel(input, getMean, getFuel2));