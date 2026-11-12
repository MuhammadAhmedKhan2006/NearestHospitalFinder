// tests.js
// Executable test cases. Every test calls the REAL algorithm / validation functions.
// "expected" is written by hand; "actual" is produced by running the function.
// A test passes only if actual === expected. Nothing is hardcoded as PASS.

import { HOSPITALS } from "./hospitals.js";
import { findNearestHospital, interpolationSearch, searchHospitalById } from "./algorithms.js";
import { validateWholeNumber } from "./validation.js";

// ---- helpers that turn a result into a short text for comparison ----
function describeNearest(x, y, hospitals) {
  const result = findNearestHospital(x, y, hospitals);
  return "ID " + result.hospital.id + ", distance " + result.distance.toFixed(2);
}

function describeSearch(id) {
  const result = searchHospitalById(id);
  return result.found ? "Found ID " + result.hospital.id + " (" + result.hospital.name + ")" : "Not Found";
}

function describeIndexSearch(A, v) {
  const result = interpolationSearch(A, v);
  return result.found ? "Found at index " + result.index : "Not Found";
}

function describeValidation(text) {
  const result = validateWholeNumber(text, "Value");
  return result.valid ? "Valid (" + result.value + ")" : "Invalid";
}

// Searches every one of the 70 IDs and checks that each is found at the right index
function searchAllIds() {
  for (let i = 0; i < HOSPITALS.length; i++) {
    const result = searchHospitalById(HOSPITALS[i].id);
    if (!result.found || result.index !== i) {
      return "Failed at ID " + HOSPITALS[i].id;
    }
  }
  return "All " + HOSPITALS.length + " IDs found at correct index";
}

// Two hospitals at equal distance from (0, 0); the LARGER id is listed first
const tieHospitals = [
  { id: 9, name: "Tie Hospital B", x: 3, y: 4 },
  { id: 4, name: "Tie Hospital A", x: 4, y: 3 }
];

// Three hospitals at equal distance from (0, 0), listed in decreasing ID order
const threeWayTieHospitals = [
  { id: 9, name: "Tie Hospital C", x: 3, y: 4 },
  { id: 4, name: "Tie Hospital B", x: 4, y: 3 },
  { id: 2, name: "Tie Hospital A", x: -3, y: -4 }
];

function describeEmptyNearest() {
  const result = findNearestHospital(1, 2, []);
  return result === null ? "null" : "not null";
}

// An ID array with gaps, used to test a missing ID between existing IDs
const gappedIds = [101, 105, 110, 120];

// ---- the test list ----
const testCases = [
  // Brute Force
  { id: "BF-01", group: "Brute Force", description: "Exact coordinate match", input: "(30, 40)", expected: "ID 103, distance 0.00", run: () => describeNearest(30, 40, HOSPITALS) },
  { id: "BF-02", group: "Brute Force", description: "Nearest hospital", input: "(52, 62)", expected: "ID 104, distance 2.83", run: () => describeNearest(52, 62, HOSPITALS) },
  { id: "BF-03", group: "Brute Force", description: "Equal-distance tie (dataset)", input: "(11, 19)", expected: "ID 101, distance 1.41", run: () => describeNearest(11, 19, HOSPITALS) },
  { id: "BF-04", group: "Brute Force", description: "Equal-distance tie, larger ID listed first", input: "(0, 0) with IDs 9 and 4", expected: "ID 4, distance 5.00", run: () => describeNearest(0, 0, tieHospitals) },
  { id: "BF-05", group: "Brute Force", description: "Negative coordinates", input: "(-5, -5)", expected: "ID 141, distance 16.55", run: () => describeNearest(-5, -5, HOSPITALS) },
  { id: "BF-06", group: "Brute Force", description: "Far away from all hospitals", input: "(1000, 1000)", expected: "ID 144, distance 1285.52", run: () => describeNearest(1000, 1000, HOSPITALS) },
  { id: "BF-07", group: "Brute Force", description: "All hospitals are compared", input: "(50, 50)", expected: "70 comparisons", run: () => findNearestHospital(50, 50, HOSPITALS).comparisons + " comparisons" },
  { id: "BF-08", group: "Brute Force", description: "Empty hospital list", input: "(1, 2) with no hospitals", expected: "null", run: () => describeEmptyNearest() },
  { id: "BF-09", group: "Brute Force", description: "Three-way tie, smallest ID wins", input: "(0, 0) with IDs 9, 4 and 2", expected: "ID 2, distance 5.00", run: () => describeNearest(0, 0, threeWayTieHospitals) },

  // Interpolation Search
  { id: "IS-01", group: "Interpolation Search", description: "First hospital ID", input: "101", expected: "Found ID 101 (Jinnah Hospital)", run: () => describeSearch(101) },
  { id: "IS-02", group: "Interpolation Search", description: "Last hospital ID", input: "170", expected: "Found ID 170 (Malir Cantt Hospital)", run: () => describeSearch(170) },
  { id: "IS-03", group: "Interpolation Search", description: "Existing middle ID", input: "135", expected: "Found ID 135 (Nazimabad Care Hospital)", run: () => describeSearch(135) },
  { id: "IS-04", group: "Interpolation Search", description: "ID smaller than minimum", input: "100", expected: "Not Found", run: () => describeSearch(100) },
  { id: "IS-05", group: "Interpolation Search", description: "ID greater than maximum", input: "171", expected: "Not Found", run: () => describeSearch(171) },
  { id: "IS-06", group: "Interpolation Search", description: "Missing ID between existing IDs", input: "107 in [101, 105, 110, 120]", expected: "Not Found", run: () => describeIndexSearch(gappedIds, 107) },
  { id: "IS-07", group: "Interpolation Search", description: "Existing ID in an array with gaps", input: "110 in [101, 105, 110, 120]", expected: "Found at index 2", run: () => describeIndexSearch(gappedIds, 110) },
  { id: "IS-08", group: "Interpolation Search", description: "Single-element array (A[r] - A[l] = 0)", input: "105 in [105]", expected: "Found at index 0", run: () => describeIndexSearch([105], 105) },
  { id: "IS-09", group: "Interpolation Search", description: "Empty array", input: "105 in []", expected: "Not Found", run: () => describeIndexSearch([], 105) },
  { id: "IS-10", group: "Interpolation Search", description: "Every ID from 101 to 170", input: "101 ... 170", expected: "All 70 IDs found at correct index", run: () => searchAllIds() },
  { id: "IS-11", group: "Interpolation Search", description: "Single-element array, key absent", input: "101 in [105]", expected: "Not Found", run: () => describeIndexSearch([105], 101) },
  { id: "IS-12", group: "Interpolation Search", description: "Key below minimum in an array with gaps", input: "100 in [101, 105, 110, 120]", expected: "Not Found", run: () => describeIndexSearch(gappedIds, 100) },

  // Input Validation
  { id: "VAL-01", group: "Validation", description: "Empty input", input: "(empty)", expected: "Invalid", run: () => describeValidation("") },
  { id: "VAL-02", group: "Validation", description: "Only spaces", input: "(three spaces)", expected: "Invalid", run: () => describeValidation("   ") },
  { id: "VAL-03", group: "Validation", description: "Alphabetic input", input: "abc", expected: "Invalid", run: () => describeValidation("abc") },
  { id: "VAL-04", group: "Validation", description: "Letters mixed with digits", input: "12abc", expected: "Invalid", run: () => describeValidation("12abc") },
  { id: "VAL-05", group: "Validation", description: "Decimal coordinate", input: "12.5", expected: "Invalid", run: () => describeValidation("12.5") },
  { id: "VAL-06", group: "Validation", description: "Special characters", input: "@#$", expected: "Invalid", run: () => describeValidation("@#$") },
  { id: "VAL-07", group: "Validation", description: "Plus sign", input: "+5", expected: "Invalid", run: () => describeValidation("+5") },
  { id: "VAL-08", group: "Validation", description: "Negative whole number", input: "-15", expected: "Valid (-15)", run: () => describeValidation("-15") },
  { id: "VAL-09", group: "Validation", description: "Positive whole number", input: "42", expected: "Valid (42)", run: () => describeValidation("42") },
  { id: "VAL-10", group: "Validation", description: "Minus sign only", input: "-", expected: "Invalid", run: () => describeValidation("-") },
  { id: "VAL-11", group: "Validation", description: "Leading zeros", input: "007", expected: "Valid (7)", run: () => describeValidation("007") },
  { id: "VAL-12", group: "Validation", description: "Surrounding spaces are trimmed", input: "(space)42(space)", expected: "Valid (42)", run: () => describeValidation(" 42 ") },
  { id: "VAL-13", group: "Validation", description: "Exponent form", input: "1e3", expected: "Invalid", run: () => describeValidation("1e3") }
];

// The original test suite is read-only: freeze the list and every case.
for (const test of testCases) {
  Object.freeze(test);
}
Object.freeze(testCases);

export const ORIGINAL_TEST_COUNT = testCases.length;

// Runs every test and returns the summary plus individual results
export function runAllTests() {
  const results = [];
  let passed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const test = testCases[i];
    let actual;
    try {
      actual = test.run();
    } catch (error) {
      actual = "Error: " + error.message;
    }
    const didPass = actual === test.expected;
    if (didPass) {
      passed++;
    }
    results.push({
      id: test.id,
      group: test.group,
      description: test.description,
      input: test.input,
      expected: test.expected,
      actual: actual,
      passed: didPass
    });
  }

  return { total: results.length, passed: passed, failed: results.length - passed, results: results };
}
