const readInput = require('../utils/readInput');
const input = readInput('bingo');

const getBoardIndex = (board) => {
  const lines = board.split('\n').map(line => line.trim().split(/ +/));
  const index = {
    unmarkedSum: 0,
    /* when countdown hits 0, thats a bingo */
    countDown: {
      row: new Array(lines.length).fill(lines[0].length),
      col: new Array(lines[0].length).fill(lines.length),
    },
  };
  lines.forEach((line, i) => {
    line.forEach((num, j) => {
      index[num] = [i, j];
      index.unmarkedSum += parseInt(num);
    });
  });
  return index;
};

const parseInput = raw => {
  const list = raw.split('\n\n');
  const nums = list[0].split(',');
  const boards = list.slice(1).map(strBoard => getBoardIndex(strBoard));
  return {nums, boards};
};

const bingo = (rawInput) => {
  let {nums, boards} = parseInput(rawInput);
  let part1;
  let part2;
  for (let num of nums) {
    for (let board of boards) {
      if (board.won || !board[num]) {
        continue;
      }
      board.unmarkedSum -= parseInt(num);
      let row = board[num][0];
      let col = board[num][1];
      board.countDown.row[row]--;
      board.countDown.col[col]--;
      if (board.countDown.row[row] === 0 || board.countDown.col[col] === 0) {
        board.won = true;
        part1 ??= parseInt(num) * board.unmarkedSum;
        part2 = parseInt(num) * board.unmarkedSum;
      }
    }
  }
  return {part1, part2};
};

console.log(bingo(input));

