import input from "./input.js";

let sonarSweep = (readout) => {
  let depths = readout.trim().split('\n').map(depth => Number(depth));
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