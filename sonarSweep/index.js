import input from "./input.js";

let parse = (list) => list.trim().split('\n').map(depth => Number(depth));

let sonarSweep = (readout) => {
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

let sonarSweep2 = (readout) => {
  let depths = parse(readout);
  if (depths.length < 4) return 0;
  let count = 0;
  let prevSum = depths[0] + depths[1] + depths[2];
  for (let right = 3; right < depths.length; right++ ) {
    let left = right - 2;
    let curSum = prevSum - depths[left - 1] + depths[right];
    if (curSum > prevSum) {
      count++;
    }
    prevSum = curSum;
  }
  return count;
};

console.log('part 2: ', sonarSweep2(input));