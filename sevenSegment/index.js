const readInput = require('../utils/readInput');
const input = readInput('sevenSegment');
const test = readInput('d8test');

const parse = raw => raw.split('\n').map(x => x.split(' | '));
const easyLengths = [2, 4, 3, 7];

const countEasyDigits = raw => parse(raw).reduce((count, current) => {
  let digits = current[1].split(' ');
  return count + digits.reduce((sum, cur) => easyLengths.includes(cur.length) ? sum + 1 : sum, 0);
}, 0);

console.log('should be 26: ', countEasyDigits(test));
console.log('part 1: ', countEasyDigits(input));

/*
    0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/

// 0: 6 seg
// 1: 2 seg
// 2: 5 seg
// 3: 5 seg
// 4: 4 seg
// 5: 5 sef
// 6: 6 seg
// 7: 3 seg
// 8: 7 seg
// 9: 6 seg

// 1
// 4
// 7
// 8
// 2, 3, 5
// 0, 6, 9

// 5-seg that contains 1's segs === 3
// non-3 5-seg fully contained in 2/3 6segs === 5
// remaining 5-seg === 2
// 6-seg that doesn't contain 5 === 0
// 6-seg that fully contains 3 === 9
// remaining 6-seg === 6

const containsAllSegsOf = (pattern, testPattern) => {
  if (testPattern === undefined) debugger;
  let superSet = new Set(pattern.split(''));
  let test = new Set(testPattern.split(''));
  for (let seg of test) {
    if (!superSet.has(seg)) return false;
  }
  return true;
}

const part2 = raw => {
  const parsed = parse(raw);
  return parsed.reduce((sum, line) => {
    let [patterns, digits] = line.map(x => x.split(' '));
    digits = digits.map(digit => digit.split('').sort().join(''));
    let patternMap = patterns.reduce((map, cur) => {
      map[cur.length] ??= [];
      map[cur.length].push(cur.split('').sort().join(''));
      return map;
    }, {});
    let translations = {};
    translations[patternMap[2][0]] = '1';
    translations[patternMap[4][0]] = '4';
    translations[patternMap[3][0]] = '7';
    translations[patternMap[7][0]] = '8';
    let three = patternMap[5].find(pattern => containsAllSegsOf(pattern, patternMap[2][0]));
    if (three === undefined) debugger;
    translations[three] = '3';
    let remainingFiveSegs = patternMap[5].filter(pattern => pattern !== three);
    let sixSegCount = 0;
    for (let sixSeg of patternMap[6]) {
      if (containsAllSegsOf(sixSeg, remainingFiveSegs[0])) sixSegCount++;
    }
    let [five, two] = sixSegCount === 2 ? [...remainingFiveSegs] : [remainingFiveSegs[1], remainingFiveSegs[0]];
    translations[two] = '2';
    translations[five] = '5';
    let zero = patternMap[6].find(pattern => !containsAllSegsOf(pattern, five));
    translations[zero] = '0';
    let nine = patternMap[6].find(pattern => containsAllSegsOf(pattern, three));
    let six = patternMap[6].find(pattern => pattern !== zero && pattern !== nine);
    translations[nine] = '9';
    translations[six] = '6';

    let value = parseInt(digits.reduce((acc, digit) => acc + translations[digit], ''));
    //console.log(value);
    return sum + value;

  }, 0);
}

console.log('should be 61229: ', part2(test));
console.log('part 2: ', part2(input));


