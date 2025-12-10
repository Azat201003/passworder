
const fs = require('fs');

// Parses wordlist from file
function parseWordList() {
    const data = fs.readFileSync('src/password-wordlist.txt', 'utf8');
    return data.trim().split('\n');
}

module.exports = { parseWordList };
