function add(a, b) {
  return a + b;
}

function calculateSum(numbers) {
  return numbers.reduce((sum, num) => add(sum, num), 0);
}

module.exports = { add, calculateSum };