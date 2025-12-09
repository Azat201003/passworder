const { parseWordList } = require('./wordlist');
const { hasLowercase, hasUppercase, hasDigits, hasSpecialChars, ALPHABET_LENGTH, DIGITS_COUNT, SPECIAL_CHARS_COUNT } = require('./alphabet');

function passwordInWordList(password) {
    return parseWordList().includes(password);
}

function countPermutations(password) {
    const n = password.length;
    const knownLetters = /[a-zA-Z\u0410-\u044F\u0401\u0451]/.test(password);
    const hasUnknownLetters = /[^\u0000-\u007F\u0410-\u044F\u0401\u0451]/.test(password) && /[^\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password); // letters not in known
    let alphabet_size = 0n;
    if (hasUnknownLetters) {
        alphabet_size = BigInt(new Set(password).size);
    } else {
        const letter_count = BigInt(ALPHABET_LENGTH);
        if (hasLowercase(password)) alphabet_size += letter_count;
        if (hasUppercase(password)) alphabet_size += letter_count;
        if (hasDigits(password)) alphabet_size += BigInt(DIGITS_COUNT);
        if (hasSpecialChars(password)) alphabet_size += BigInt(SPECIAL_CHARS_COUNT);
    }
    let total = 0n;
    for (let k = 1n; k <= BigInt(n); k++) {
        total += alphabet_size ** k;
    }
    return total;
}

module.exports = { passwordInWordList, countPermutations };

