const readInput = require('../utils/readInput');
const input = readInput('polymer');
const test = readInput('d14test');

const parse = raw => {
  let [template, rawRules] = raw.split('\n\n');
  rawRules = rawRules.split('\n').map(x => x.split(' -> '));
  let rules = {};
  rawRules.forEach(rule => {
    rules[rule[0]] = rule[1];
  });
  return {template, rules};
}

const charCount = str => str.split('').reduce((counts, char) => {
  counts[char] ??= 0;
  counts[char]++;
  return counts;
}, {});

const processRules = (template, rules) => {
  let insertions = [];
  for (let i = 1; i < template.length; i++) {
    let pair = template.slice(i - 1, i + 1)
    if (rules[pair]) {
      insertions.push({
        idx: i,
        char: rules[pair]
      });
    }
  }
  while (insertions.length > 0) {
    let {idx, char} = insertions.pop();
    template = template.slice(0, idx) + char + template.slice(idx);
  }
  return template;
}

const processRules2 = (pairCounts, rules) => {
  let newPairCounts = {}
  for (let pair in pairCounts) {
    let count = pairCounts[pair];
    if (rules[pair]) {
      let insert = rules[pair];
      newPairCounts[pair[0] + insert] ??= 0;
      newPairCounts[pair[0] + insert] += count;
      newPairCounts[insert + pair[1]] ??= 0;
      newPairCounts[insert + pair[1]] += count;;
    } else {
      newPairCounts[pair] = count;
    }
  }
  return newPairCounts;
};

const getMinMax = (pairCounts, first, last) => {
  let charCounts = {};
  for (let pair in pairCounts) {
    let count = pairCounts[pair];
    charCounts[pair[0]] ??= 0;
    charCounts[pair[1]] ??= 0;
    charCounts[pair[0]] += count / 2;
    charCounts[pair[1]] += count / 2;
  }
  charCounts[first]--;
  charCounts[last]--;
  let counts = Object.values(charCounts);
  let min = Math.min(...counts);
  let max = Math.max(...counts);
  return {min, max};
};

const solve = raw => {
  let {template, rules} = parse(raw);
  let first = template[0];
  let last = template[template.length - 1];
  //first, store a count of each pair
  let pairCounts = {};
  for (let i = 1; i < template.length; i++) {
    let pair = template[i - 1] + template[i];
    pairCounts[pair] ??= 0;
    pairCounts[pair]++;
  }
  for (let i = 0; i < 10; i++) {
    //template = processRules(template, rules);
    pairCounts = processRules2(pairCounts, rules);
  }
  let {min, max} = getMinMax(pairCounts, first, last)
  let part1 = max - min;
  for (let i = 0; i < 30; i++) {
    //template = processRules(template, rules);
    pairCounts = processRules2(pairCounts, rules);
  }
  let {min: min2, max: max2} = getMinMax(pairCounts, first, last);
  let part2 = max2 - min2;
  return {part1, part2};
};

console.log('should be 1588 and 2188189693529: ', solve(test));
console.log('solution: ', solve(input));