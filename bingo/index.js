const readInput = require('../utils/readInput');
const input = readInput('bingo');

const getBoardIndex = (board) => {
  const lines = board.split('\n').map(line => line.trim().split(/ +/));
  const index = {
    unmarkedSum: 0,
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

//defaults to finding first winning board (part 1)
//pass true for part2 arg to find last winning board (part 2)
const bingo = (rawInput, part2 = false) => {
  let {nums, boards} = parseInput(rawInput);
  let lastWinning = {board: null, num: null};
  for (let num of nums) {
    for (let board of boards) {
      if (board.won) {
        continue;
      }
      if (board[num] === undefined) {
        continue;
      }
      board.unmarkedSum -= parseInt(num);
      let row = board[num][0];
      let col = board[num][1];
      board.countDown.row[row]--;
      board.countDown.col[col]--;
      if (board.countDown.row[row] === 0 || board.countDown.col[col] === 0) {
        if (!part2) return parseInt(num) * board.unmarkedSum;
        board.won = true;
        lastWinning = {board, num};
      }
    }
  }
  return parseInt(lastWinning.num) * lastWinning.board.unmarkedSum;
};

console.log('part 1: ', bingo(input));
console.log('part 2: ', bingo(input, 'lose'));


