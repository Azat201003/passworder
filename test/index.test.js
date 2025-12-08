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

function runTests() {
  try {
    testPasswordInWordList();
    testPasswordNotInWordList();
    console.log('All tests passed! ✓');
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  runTests();
}

