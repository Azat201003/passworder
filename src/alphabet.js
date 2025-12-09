const DIGITS_COUNT = 10;
const ALPHABET_LENGTH = 26;
const SPECIAL_CHARS_COUNT = 30;

function hasLowercase(password) {
  return /[a-z]/.test(password);
}

function hasUppercase(password) {
  return /[A-Z]/.test(password);
}

function hasDigits(password) {
  return /\d/.test(password);
}

function hasSpecialChars(password) {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

module.exports = { DIGITS_COUNT, ALPHABET_LENGTH, SPECIAL_CHARS_COUNT, hasLowercase, hasUppercase, hasDigits, hasSpecialChars };

