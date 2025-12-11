const { parseWordList } = require('./wordlist');
const { hasLowercase, hasUppercase, hasDigits, hasSpecialChars, ALPHABET_LENGTH, DIGITS_COUNT, SPECIAL_CHARS_COUNT } = require('./alphabet');

// Checks if password is in wordlist
function passwordInWordList(password) {
    return parseWordList().includes(password);
}

// Calculates password strength as number of permutations
function countPermutations(password) {
    const n = password.length;
    const knownLetters = /[a-zA-Z\u0410-\u044F\u0401\u0451]/.test(password);
    const hasUnknownLetters = /[^\u0000-\u007F\u0410-\u044F\u0401\u0451]/.test(password) && /[^\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
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

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Generates modified versions of the password
function generateNeighbors(password) {
    const neighbors = [];
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    // Add a character in any position
    for (let i = 0; i <= password.length; i++) {
        for (const c of chars) {
            const newPassword = password.slice(0, i) + c + password.slice(i);
            neighbors.push(newPassword);
        }
    }
    // Delete a character
    for (let i = 0; i < password.length; i++) {
        const newPassword = password.slice(0, i) + password.slice(i + 1);
        neighbors.push(newPassword);
    }
    return shuffleArray(neighbors);
}

// Generates stronger password suggestions using BFS
function passwordSuggestions(password) {
    const originalStrength = countPermutations(password);
    const wordlist = parseWordList();
    const suggestions = [];
    const queue = [password];
    const visited = new Set([password]);
    while (queue.length > 0 && suggestions.length < 10) {
        const current = queue.shift();
        const neighbors = generateNeighbors(current);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                if (!wordlist.includes(neighbor) && countPermutations(neighbor) > originalStrength) {
                    suggestions.push(neighbor);
                    if (suggestions.length >= 12) break;
                }
                queue.push(neighbor);
            }
        }
    }
    return suggestions;
}

module.exports = { passwordInWordList, countPermutations, passwordSuggestions };

