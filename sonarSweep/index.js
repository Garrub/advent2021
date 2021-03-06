const readInput = require('../utils/readInput.js');
const input = readInput('sonarSweep');
const parse = (list) => list.trim().split('\n').map(depth => Number(depth));

const sonarSweep = (readout) => {
  let depths = parse(readout);
  let count = 0;
  for (let i = 1; i < depths.length; i++) {
    let depth = depths[i];
    let prev = depths[i - 1];
    if (depth > prev) {
      count++;
    }
  }
  return count;
};

console.log('part 1: ', sonarSweep(input));

const sonarSweep2 = (readout) => {
  let depths = parse(readout);
  if (depths.length < 4) return 0;
  let count = 0;
  let prevSum = depths[0] + depths[1] + depths[2];
  for (let i = 3; i < depths.length; i++ ) {
    let curSum = depths[i] + depths[i - 1] + depths[i - 2];
    if (curSum > prevSum) {
      count++;
    }
    prevSum = curSum;
  }
  return count;
};

const ss2FunLiner = (readout) => parse(readout).reduce((tracker, cur, i, list) => ({count: tracker.count += list[i + 2] > tracker.loss ? 1 : 0, loss: cur}), {loss: -1, count: -1}).count;
let p = parse;
let f=r=>p(r).reduce((t,c,i,a)=>({s:t.s+=a[i+2]>t.l?1:0,l:c}),{l:-1,s:-1}).s;

console.log('part 2: ', sonarSweep2(input));
console.log('past 2 funLiner: ', ss2FunLiner(input));
console.log('part 2 code golf: ', f(input));