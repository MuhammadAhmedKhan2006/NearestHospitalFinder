// validation.js
// Input validation for coordinates and hospital IDs.
// Rule: accept only whole numbers (digits with an optional leading minus sign).
// Rejected: empty values, letters, decimals, special characters, "+5", "1e3".

export function validateWholeNumber(rawText, label) {
  const text = String(rawText).trim();

  // 1. Empty input
  if (text === "") {
    return { valid: false, message: label + " is required." };
  }

  // 2. Decimals
  if (text.includes(".")) {
    return { valid: false, message: label + " must be a whole number. Decimals are not allowed." };
  }

  // 3. Only an optional leading "-" followed by digits is allowed
  const wholeNumberPattern = /^-?[0-9]+$/;
  if (!wholeNumberPattern.test(text)) {
    return {
      valid: false,
      message: label + " must contain only digits (a leading minus sign is allowed). Letters and special characters are not allowed."
    };
  }

  // 4. Very large numbers cannot be handled safely
  const value = Number(text);
  if (!Number.isSafeInteger(value)) {
    return { valid: false, message: label + " is too large." };
  }

  return { valid: true, value: value, message: "" };
}
