const inputConsumer = require('../utils/inputConsumer');

// Part 1
let safeReports = 0;
function countSafeReports(line) {
  const reports = line.split(' ');
  const evolution = reports[0] - reports[1] > 0;

  for (let i = 0; i < reports.length - 1; i++) {
    const currentDifference = reports[i] - reports[i + 1];
    const currentEvolution = currentDifference > 0;
    const currentIncrement = Math.abs(currentDifference);

    if (
      currentEvolution !== evolution ||
      currentIncrement < 1 ||
      currentIncrement > 3
    ) {
      return;
    }
  }

  safeReports++;
}

inputConsumer(countSafeReports, './input');
console.log('Part 1:', safeReports);

// Part 2
function isSafe(evolution, currentEvolution, currentIncrement) {
  if (
    currentEvolution !== evolution ||
    currentIncrement < 1 ||
    currentIncrement > 3
  ) {
    return false;
  }
  return true;
}

let safeReportsWithOneTolerance = 0;
function countSafeReportsWithOneTolerance(line) {
  const reports = line.split(' ');
  let evolution = reports[0] - reports[1] > 0;
  let tolerance = 0;
  let skippedIndex = 0;
  let next = 1;

  for (let i = 0; i < reports.length - 1; i++) {
    const currentDifference = reports[i] - reports[i + 1];
    const currentEvolution = currentDifference > 0;
    const currentIncrement = Math.abs(currentDifference);

    if (!isSafe(evolution, currentEvolution, currentIncrement)) {
      if (!tolerance && i + 1 === reports.length - 1) {
        safeReportsWithOneTolerance++;
        return;
      }

      if (tolerance > 1) {
        return;
      }

      if (tolerance) {
        i = skippedIndex + 1;
        next = 0;
      }

      const differenceAfterSkip = reports[i - 1] - reports[i + next];
      const evolutionAfterSkip = differenceAfterSkip > 0;
      const incrementAfterSkip = Math.abs(differenceAfterSkip);
      evolution = evolutionAfterSkip;
      skippedIndex = i;

      if (!isSafe(evolution, evolutionAfterSkip, incrementAfterSkip)) {
        return;
      }
      tolerance++;
    }
  }

  safeReportsWithOneTolerance++;
}

inputConsumer(countSafeReportsWithOneTolerance, './testinput');
console.log('Part 2:', safeReportsWithOneTolerance);
