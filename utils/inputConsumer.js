const NReadlines = require('n-readlines');

function inputConsumer(fn, inputPath) {
  const input = new NReadlines(inputPath);

  let line = input.next();

  while (line) {
    fn(line.toString('utf8'));
    line = input.next();
  }
}

module.exports = inputConsumer;
