const readInput = require('../utils/readInput');
const input = readInput('syntaxScoring');
const test = readInput('d10test');
const PAIRS = {
  '{' : '}',
  '[' : ']',
  '(' : ')',
  '<' : '>',
};
const ERR_SCORES = {
  ')' : 3,
  ']' : 57,
  '}' : 1197,
  '>' : 25137,
}
const AC_SCORES = {
  ')' : 1,
  ']' : 2,
  '}' : 3,
  '>' : 4,
}
const parse = raw => raw.split('\n').map(x => x.split(''));

const processLine = line => {
  const opens = Object.keys(PAIRS);
  let stack = [];
  for (let char of line) {
    if (opens.includes(char)) {
      stack.push(char);
    } else if (char !== PAIRS[stack.pop()]) {
      return {char, stack: null};
    }
  }
  return {stack, char: null};
}

const getStackScore = stack => stack.reverse().reduce((sum, char) => sum * 5 + AC_SCORES[PAIRS[char]], 0);


const getLineScore = line => {
  let {char, stack} = processLine(line);
  return char ?
    {
      score: ERR_SCORES[char],
      type: 'error'
    } :
    {
      score: getStackScore(stack),
      type: 'close'
    };
};

const solve = raw => {
  const lines = parse(raw);
  let solution = lines.reduce((sum, line) => {
    let { part1, part2 } = sum;
    let lineScore = getLineScore(line);
    if (lineScore.type === 'error') {
      part1 += lineScore.score;
    } else if (lineScore.type === 'close') {
      part2.push(lineScore.score);
    }
    return { part1, part2 };
  }, { part1: 0, part2: [] });
  let sorted = solution.part2.sort((a, b) => a - b);
  solution.part2 = sorted[(sorted.length - 1) / 2];
  return solution;
};

console.log('should be p1:26397, p2:288957 : ', solve(test));
console.log('solution: ', solve(input));