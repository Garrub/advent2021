const { count } = require('console');
const readInput = require('../utils/readInput');
const input = readInput('lanternFish');
const test = readInput('d6test');
const parse = raw => raw.split(',').reduce((sum, cur) => ({...sum, [cur]: !sum[cur] ? 1 : sum[cur] + 1}), {});

const getFishCountAt = (countdown, days, fishCount) => {
  if (countdown >= days) return 1;
  if (countdown + 1 === days) return 2;
  if (!fishCount?.[countdown]?.[days]) {
    fishCount[countdown] ??= {};
    fishCount[countdown][days] = getFishCountAt(8, days - countdown - 1, fishCount) + getFishCountAt(6, days - countdown - 1, fishCount);
  }
  return fishCount[countdown][days];
}

//console.log(parse(test));
const lanternFish = (raw, days) => {
  let fishCount = {};
  const fish = parse(raw);
  let total = 0;
  for (let countdown in fish) {
    let count = fish[countdown];
    total += count * getFishCountAt(parseInt(countdown), days, fishCount);
  }
  return total;
};

console.log('should be 5934: ', lanternFish(test, 80));
console.log('part1: ', lanternFish(input, 80));
console.log('should be 26984457539: ', lanternFish(test, 256));
console.log('part 2: ', lanternFish(input, 256));

