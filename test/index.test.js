const { add } = require('../src/index');
const { calculateSum } = require('../src/core');

function testAdd() {
  console.log('Testing add function...');
  
  if (add(2, 3) !== 5) {
    throw new Error('add(2, 3) should return 5');
  }
  
  if (add(-1, 1) !== 0) {
    throw new Error('add(-1, 1) should return 0');
  }
  
  if (add(0, 0) !== 0) {
    throw new Error('add(0, 0) should return 0');
  }
  
  console.log('✓ add function tests passed');
}

function testCalculateSum() {
  console.log('Testing calculateSum function...');
  
  if (calculateSum([1, 2, 3, 4]) !== 10) {
    throw new Error('calculateSum([1, 2, 3, 4]) should return 10');
  }
  
  if (calculateSum([5, -2, 1]) !== 4) {
    throw new Error('calculateSum([5, -2, 1]) should return 4');
  }
  
  if (calculateSum([]) !== 0) {
    throw new Error('calculateSum([]) should return 0');
  }
  
  console.log('✓ calculateSum function tests passed');
}

function runTests() {
  try {
    testAdd();
    testCalculateSum();
    console.log('All tests passed! ✓');
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  runTests();
}

module.exports = { testAdd, testCalculateSum, runTests };
