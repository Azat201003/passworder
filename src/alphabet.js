const DIGITS_COUNT = 10;
const ALPHABET_LENGTH = 26;
const SPECIAL_CHARS_COUNT = 30;

// Checks for lowercase letters
function hasLowercase(password) {
  return /[a-z]/.test(password);
}

// Checks for uppercase letters
function hasUppercase(password) {
  return /[A-Z]/.test(password);
}

// Checks for digits
function hasDigits(password) {
  return /\d/.test(password);
}

// Checks for special characters
function hasSpecialChars(password) {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

module.exports = { DIGITS_COUNT, ALPHABET_LENGTH, SPECIAL_CHARS_COUNT, hasLowercase, hasUppercase, hasDigits, hasSpecialChars };

