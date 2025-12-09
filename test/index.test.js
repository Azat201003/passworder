const pw = require('../src/index');

function testPasswordInWordList() {
    data = [
        'password',  'princess',  '123456',    'sunshine',
        'princess1', 'abc123',    'jordan23',  'blessed1',
        'Password1', 'password1', 'jasmine1',  'blink182',
        'sunshine1', 'happy123',  'butterfly', 'whatever',
    ];
    data.forEach((password) => {
        if (!pw.passwordInWordList(password)) {
            throw new Error('Password \'' + password + '\'from wordlist marked as not in wordlist');
        }
    })
}
function testPasswordNotInWordList() {
    data = [
        'superMegaPassword1234',
        'unhackable_passwOrd',
        'ThEBesTP@sSWorD',
        'IDontKnowWhichPasswordCanIChoose',
    ];
    data.forEach((password) => {
        if (pw.passwordInWordList(password)) {
            throw new Error('Password \'' + password + '\' not from wordlist marked as in wordlist');
        }
    })
}

function testCountPermutations() {
    // Test cases with expected results
    const testCases = [
        { password: 'a', expected: 26n }, // lowercase only
        { password: 'A', expected: 26n }, // uppercase only
        { password: '1', expected: 10n }, // digits only
        { password: '!', expected: 30n }, // special chars only
        { password: 'a1', expected: 1332n }, // lowercase + digits
        { password: 'aA', expected: 2756n }, // lowercase + uppercase
        { password: 'aA1', expected: 242234n }, // lowercase + uppercase + digits
        { password: 'aA1!', expected: 72426540n }, // all types
        { password: 'a©', expected: 6n }, // unknown chars
        { password: '', expected: 0n }, // empty string
    ];

    testCases.forEach(({ password, expected }) => {
        const result = pw.countPermutations(password);
        if (result !== expected) {
            throw new Error(`countPermutations('${password}') = ${result}, expected ${expected}`);
        }
    });
}

function runTests() {
  try {
    testPasswordInWordList();
    testPasswordNotInWordList();
    testCountPermutations();
    console.log('All tests passed! ✓');
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  runTests();
}

