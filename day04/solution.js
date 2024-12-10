const inputConsumer = require('../utils/inputConsumer');

//Part 1
const grid = [];
createGrid();

let total = 0;
let total2 = 0;

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === 'X') {
      let directions = [
        [0, 1],
        [0, -1],
        [1, 1],
        [1, 0],
        [1, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
      ];

      for (let i = 0; i < directions.length; i++) {
        if (isSearchTermStraightShape('XMAS', row, col, directions[i])) {
          total++;
        }
      }
    }

    // Part 2
    if (grid[row][col] === 'A') {
      let directions = [
        [2, 2],
        [2, 2],
      ];

      let cross = 0;
      for (let i = 0; i < directions.length; i++) {
        if (isSearchTermCrossShape('MAS', 'SAM', row, col, directions[i])) {
          cross++;
        }
      }

      if (cross === 2) {
        total2++;
      }
    }
  }
}

console.log('Part 1:', total);
console.log('Part 2:', total2);

function createRow(text) {
  grid.push(text);
}
function createGrid() {
  inputConsumer(createRow, 'input');
}

function isSearchTermStraightShape(searchTerm, row, col, direction) {
  let word = '';
  for (i = 0; i < searchTerm.length; i++) {
    if (
      typeof grid[row + i * direction[0]]?.[col * direction[1] + i] !==
      undefined
    ) {
      word += grid[row + i * direction[0]]?.[col + i * direction[1]];
    }
  }

  if (word === searchTerm) {
    return true;
  }
  return false;
}

function isSearchTermCrossShape(
  searchTerm,
  searchTermReverse,
  row,
  col,
  direction
) {
  let word = '';
  let wordReverse = '';
  for (i = 1; i < searchTerm.length + 1; i++) {
    if (
      typeof grid[row - direction[0] + i]?.[col - direction[1] + i] !==
      undefined
    ) {
      word += grid[row - direction[0] + i]?.[col - direction[1] + i];
    }

    if (
      typeof grid[row + direction[0] - i]?.[col - direction[1] + i] !==
      undefined
    ) {
      wordReverse += grid[row + direction[0] - i]?.[col - direction[1] + i];
    }
  }

  if (
    (word === searchTerm || word === searchTermReverse) &&
    (wordReverse === searchTermReverse || wordReverse === searchTerm)
  ) {
    return true;
  }
  return false;
}
