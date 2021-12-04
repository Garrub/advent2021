const readInput = require('../utils/readInput');
const input = readInput('bingo');
console.log(input.split('\n\n')[1].split('\n')[1].split(/ +/));
//console.log(input.split('\n\n'));

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
  console.log(list.slice(1)[0])
  console.log(boards[0]);
  return {nums, boards};
};

const bingo = (rawInput) => {
  let {nums, boards} = parseInput(rawInput);
  for (let num of nums) {
    for (let board of boards) {
      if (board[num] === undefined) {
        continue;
      }
      board.unmarkedSum -= parseInt(num);
      let row = board[num][0];
      let col = board[num][1];
      board.countDown.row[row]--;
      board.countDown.col[col]--;
      if (board.countDown.row[row] === 0 || board.countDown.col[col] === 0) {
        return parseInt(num) * board.unmarkedSum;
      }
    }
  }
  //should only get here if no boards win
  return 0;
};

console.log('part 1: ', bingo(input));
