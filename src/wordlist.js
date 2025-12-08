
const fs = require('fs');

function parseWordList() {
    const data = fs.readFileSync('src/password-wordlist.txt', 'utf8');
    return data.trim().split('\n');
}

module.exports = { parseWordList };
