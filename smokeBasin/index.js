const readInput = require('../utils/readInput');
const test = readInput('d9test');
const input = readInput('smokeBasin');

const parse = raw => raw.split('\n').map(x => x.split('').map(x => parseInt(x)));

const getAdjacents = (row, col, rowCount, colCount) => {
  let adjacents = [];
  if (row > 0) adjacents.push([row - 1, col]);
  if (col > 0) adjacents.push([row, col - 1]);
  if (row + 1 < rowCount) adjacents.push([row + 1, col]);
  if (col + 1 < colCount) adjacents.push([row, col + 1]);
  return adjacents
};

const getMatrixGraph = (matrix) => matrix.map(
  (row, i) => row.map((cell, j) => ({
    val: cell,
    adjs: getAdjacents(i, j, matrix.length, matrix[0].length),
    checked: false,
  })
))

const getLowPoints = heights => heights.reduce(
  (lows, row, i) => lows.concat(
    row.reduce(
      (rowLows, height, j) => {
        if (height.adjs.every(adj => heights[adj[0]][adj[1]].val > height.val)) {
          rowLows.push([i, j]);
        }
        return rowLows;
      },
      []
    )
  ),
  []
);

const getBasinSize = (row, col, heights) => {
  let cell = heights[row][col];
  if (cell.checked) return 0;
  cell.checked = true;
  if (cell.val === 9) return 0;
  let size = 1;
  for (let [adjRow, adjCol] of cell.adjs) {
    size += getBasinSize(adjRow, adjCol, heights);
  }
  return size;
}

const smokeBasin = raw => {
  const heights = getMatrixGraph(parse(raw));
  const lows = getLowPoints(heights);
  let part1 = lows.reduce((sum, cur) => sum + heights[cur[0]][cur[1]].val + 1, 0);
  let biggestBasins = [0, 0, 0];
  for (let lowCoord of lows) {
    let basinSize = getBasinSize(lowCoord[0], lowCoord[1], heights);
    if (basinSize > biggestBasins[biggestBasins.length - 1]) {
      biggestBasins.pop();
      biggestBasins.push(basinSize);
      biggestBasins.sort((a, b) => b - a);
    }
  }
  let part2 = biggestBasins.reduce((prod, cur) => prod * cur);
  return {part1, part2};
};

console.log('should be p1:15 and p2:1134 ', smokeBasin(test));
console.log('part 1 and 2: ', smokeBasin(input));
