const { parseWordList } = require('./wordlist');
const { countPermutations } = require('./core');

// Generates modified versions of the password
function generateNeighbors(pw) {
    const neighbors = [];
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    // Add a character in any position
    for (let i = 0; i <= pw.length; i++) {
        for (const c of chars) {
            const newPw = pw.slice(0, i) + c + pw.slice(i);
            neighbors.push(newPw);
        }
    }
    // Delete a character
    for (let i = 0; i < pw.length; i++) {
        const newPw = pw.slice(0, i) + pw.slice(i + 1);
        neighbors.push(newPw);
    }
    // Switch (swap) two characters
    for (let i = 0; i < pw.length; i++) {
        for (let j = i + 1; j < pw.length; j++) {
            const arr = pw.split('');
            [arr[i], arr[j]] = [arr[j], arr[i]];
            const newPw = arr.join('');
            neighbors.push(newPw);
        }
    }
    return neighbors;
}

// Generates stronger password suggestions using BFS
function passwordSuggestionsBFS(password) {
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
                    if (suggestions.length >= 10) break;
                }
                queue.push(neighbor);
            }
        }
    }
    return suggestions;
}

module.exports = { passwordSuggestionsBFS };
