const readInput = require('../utils/readInput');
const test = readInput('d11test');
const input = readInput('dumbo');

const parse = raw => raw.split('\n').map(line => line.split('').map(x => parseInt(x)));

const getAdjacents = (row, col, rowCount, colCount) => {
  let offset = [-1, 0, 1];
  let adjacents = [];
  for (let i = 0; i < offset.length; i++) {
    for (let j = 0; j < offset.length; j++) {
      if (offset[i] === 0 && offset[j] === 0) continue;
      let x = row + offset[i];
      if (x < 0 || x >= rowCount) continue;
      let y = col + offset[j];
      if (y < 0 || y >= colCount) continue;
      adjacents.push([x, y]);
    }
  }
  return adjacents
};

const getMatrixGraph = (matrix) => matrix.map(
  (row, i) => row.map((cell, j) => ({
    val: cell,
    adjs: getAdjacents(i, j, matrix.length, matrix[0].length),
    flashed: false,
  })
));

const traverse = (grid, cb) => grid.forEach(row => row.forEach(cell => cb(cell)));

const flash = (cell, grid, cb) => {
  if (cell.flashed) return;
  cell.flashed = true;
  cb();
  cell.adjs.forEach(([x, y]) => {
    let adj = grid[x][y];
    adj.val++;
    if (adj.val > 9) {
      flash(adj, grid, cb);
    }
  });
};

const step = (grid, flashCb, part2Cb) => {
  let toFlash = [];
  traverse(grid, (cell) => {
    cell.val++;
    if (cell.val > 9) {
      toFlash.push(cell);
    }
  });
  toFlash.forEach(cell => flash(cell, grid, flashCb));
  part2Cb(grid);
  traverse(grid, (cell) => {
    if (cell.flashed) {
      cell.val = 0;
      cell.flashed = false;
    }
  });
};

const solve = (raw, cycles) => {
  let count = 0;
  let part1 = null;
  let part2 = null;
  let grid = getMatrixGraph(parse(raw));
  for (let i = 1; part1 === null || part2 === null; i++) {
    step(grid, () => count++, octoGrid => {
      if (octoGrid.every(octoLine => octoLine.every(octo => octo.flashed))) {
        part2 = i;
      }
    });
    if (i === cycles) part1 = count;
  }
  return {part1, part2};
}

console.log('should be 1656, 195: ', solve(test, 100));
console.log('part1: ', solve(input, 100));


