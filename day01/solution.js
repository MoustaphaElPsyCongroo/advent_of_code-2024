const inputConsumer = require('../utils/inputConsumer');

// Part 1
const list1 = [];
const list2 = [];

function createListsFrom(line) {
  const [num1, num2] = line.split('   ');
  list1.push(num1);
  list2.push(num2);
}

inputConsumer(createListsFrom, './input');

function calculateTotalDistanceBetweenLists() {
  let total = 0;

  list1.sort();
  list2.sort();

  for (let i = 0; i < list1.length; i++) {
    total += Math.abs(list1[i] - list2[i]);
  }

  return total;
}

console.log('Part 1:', calculateTotalDistanceBetweenLists());

// Part 2
function calculateSimilarityScoreBetweenLists() {
  const occurencesInList2 = {};

  for (const num of list2) {
    if (occurencesInList2[num]) {
      occurencesInList2[num]++;
    } else {
      occurencesInList2[num] = 1;
    }
  }

  let total = 0;

  for (const num of list1) {
    if (occurencesInList2[num]) {
      total += num * occurencesInList2[num];
    }
  }

  return total;
}

console.log('Part 2:', calculateSimilarityScoreBetweenLists());
