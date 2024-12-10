const inputConsumer = require('../utils/inputConsumer');

//Part 1
let total = 0;

function addHiddenMuls(text) {
  const validMuls = /(mul)\((\d+,\d+)\)/g;
  const foundMuls = text.match(validMuls);
  const mul = (a, b) => a * b;

  if (foundMuls) {
    total += foundMuls.reduce((prev, next) => eval(prev) + eval(next));
  }
}

inputConsumer(addHiddenMuls, 'input');
console.log('Part 1:', total);

//Part 2
let enabledTotal = 0;

function addHiddenEnabledMuls(text) {
  const validMuls = /((mul)\((\d+,\d+)\))|(do\(\))|(don't\(\))/g;
  const foundMuls = text.match(validMuls);
  const mul = (a, b) => a * b;

  let enabled = true;

  for (const instruction of foundMuls) {
    if (instruction[0] !== 'm') {
      enabled = instruction === 'do()';
    }

    if (instruction[0] === 'm' && enabled) {
      enabledTotal += eval(instruction);
    }
  }
}

inputConsumer(addHiddenEnabledMuls, 'input');
console.log('Part 2:', enabledTotal);
