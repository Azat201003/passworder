const { parseWordList } = require('./wordlist');

function passwordInWordList(password) {
    return parseWordList().includes(password);
}

module.exports = { passwordInWordList };

