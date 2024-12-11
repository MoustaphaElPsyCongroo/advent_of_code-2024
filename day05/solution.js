const inputConsumer = require('../utils/inputConsumer');

const rules = [];
const pageLists = [];

inputConsumer(getRules, 'input');

let total = 0;
let total2 = 0;
for (const pageList of pageLists) {
  const ordered = reorderPageList(pageList.split(','));
  if (ordered.join(',') === pageList) {
    //correct order
    const middleValue = parseInt(ordered[Math.floor(ordered.length / 2)]);
    total += middleValue;
  } else {
    const middleValue = parseInt(ordered[Math.floor(ordered.length / 2)]);
    total2 += middleValue;
  }
}

console.log('Part 1:', total);
console.log('Part 2:', total2);

function reorderPageList(arr) {
  const ordered = arr.sort((a, b) => {
    if (rules.includes(`${a}|${b}`)) {
      return -1;
    } else if (rules.includes(`${b}|${a}`)) {
      return 1;
    } else {
      return 0;
    }
  });

  return ordered;
}

function getRules(text) {
  const members = text.split('|');

  if (members.length === 2) {
    rules.push(text);
  } else if (members[0] !== '') {
    pageLists.push(text);
  }
}
