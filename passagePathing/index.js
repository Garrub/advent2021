const readInput = require('../utils/readInput');
const input = readInput('passagePathing');
const test = readInput('d12test');

const parse = raw => raw.split('\n').map(x => x.split('-'));

const traversePaths = (paths, root, oldAvoid, soFar, cb, double = '') => {
  if (root === 'end') {
    cb(soFar);
    return;
  }
  let avoid = new Set(oldAvoid);
  if (root.toLowerCase() === root) {
    if (root === double) {
      double = '';
    } else {
      avoid.add(root);
    }
  }
  for (let dest of paths[root]) {
    if (avoid.has(dest)) continue;
    traversePaths(paths, dest, avoid, soFar + `-${dest}`, cb, double);
  }
};

const solve = raw => {
  const parsed = parse(raw);
  let paths = {};
  let smalls = new Set();
  parsed.forEach(([start, end]) => {
    paths[start] ??= new Set();
    paths[end] ??= new Set();
    paths[start].add(end);
    paths[end].add(start);
    if (start !== 'start' && start === start.toLowerCase()) {
      smalls.add(start);
    }
    if (end !== 'end' && end === end.toLowerCase()) {
      smalls.add(end);
    }
  });
  let avoid = new Set();
  let allPaths = new Set();
  let part1 = 0;
  traversePaths(paths, 'start', avoid, 'start', () => part1++);
  for (let small of smalls) {
    traversePaths(paths, 'start', avoid, 'start', (foundPath) => allPaths.add(foundPath), small);
  }
  let part2 = allPaths.size;
  return {part1, part2};
};

console.log('should be 226, 3509: ', solve(test));
console.log('solution: ', solve(input));