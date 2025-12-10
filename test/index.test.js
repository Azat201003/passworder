// Import the main module for testing
const pw = require('../src/index');

/**
 * Tests that known passwords from the wordlist are correctly identified as being in the wordlist.
 */
function testPasswordInWordList() {
    // Array of passwords known to be in the wordlist
    const data = [
        'password',  'princess',  '123456',    'sunshine',
        'princess1', 'abc123',    'jordan23',  'blessed1',
        'Password1', 'password1', 'jasmine1',  'blink182',
        'sunshine1', 'happy123',  'butterfly', 'whatever',
    ];
    data.forEach((password) => {
        if (!pw.passwordInWordList(password)) {
            throw new Error('Password \'' + password + '\'from wordlist marked as not in wordlist');
        }
    });
}

/**
 * Tests that passwords not in the wordlist are correctly identified as not being in the wordlist.
 */
function testPasswordNotInWordList() {
    // Array of passwords not in the wordlist
    const data = [
        'superMegaPassword1234',
        'unhackable_passwOrd',
        'ThEBesTP@sSWorD',
        'IDontKnowWhichPasswordCanIChoose',
    ];
    data.forEach((password) => {
        if (pw.passwordInWordList(password)) {
            throw new Error('Password \'' + password + '\' not from wordlist marked as in wordlist');
        }
    });
}

/**
 * Tests the countPermutations function with various password examples and expected results.
 */
function testCountPermutations() {
    // Test cases with passwords and their expected permutation counts
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

/**
 * Tests the passwordSuggestions function to ensure it returns valid suggestions.
 */
function testPasswordSuggestions() {
    const testCases = [
        'password',
        'abc',
        '123',
    ];

    testCases.forEach((password) => {
        const suggestions = pw.passwordSuggestions(password);
        if (!Array.isArray(suggestions)) {
            throw new Error('passwordSuggestions should return an array');
        }
        const originalStrength = pw.countPermutations(password);
        suggestions.forEach(suggestion => {
            if (typeof suggestion !== 'string') {
                throw new Error('Suggestions should be strings');
            }
            if (pw.passwordInWordList(suggestion)) {
                throw new Error(`Suggestion '${suggestion}' is in wordlist`);
            }
            if (pw.countPermutations(suggestion) <= originalStrength) {
                throw new Error(`Suggestion '${suggestion}' is not stronger than original`);
            }
        });
    });
}

/**
 * Runs all test functions and reports the results.
 */
function runTests() {
  try {
    testPasswordInWordList();
    testPasswordNotInWordList();
    testCountPermutations();
    testPasswordSuggestions();
    console.log('All tests passed! ✓');
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

