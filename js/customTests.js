// customTests.js
// User-defined test cases for the Tests page.
// Custom tests call the real production algorithms and are saved in localStorage.

import { HOSPITALS } from "./hospitals.js";
import { findNearestHospital, searchHospitalById } from "./algorithms.js";

export const STORAGE_KEY = "nhf.customTests.v1";

export const CUSTOM_TEST_TYPES = {
  nearest: "Brute Force",
  search: "Interpolation Search"
};

export function isValidCustomTest(test) {
  if (!test || typeof test !== "object") {
    return false;
  }
  if (typeof test.id !== "string" || test.id.trim() === "") {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(CUSTOM_TEST_TYPES, test.type)) {
    return false;
  }
  if (typeof test.expected !== "string" || test.expected.trim() === "") {
    return false;
  }
  if (test.type === "nearest") {
    return Number.isInteger(test.x) && Number.isInteger(test.y);
  }
  return Number.isInteger(test.key);
}

export function loadCustomTests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isValidCustomTest);
  } catch (error) {
    return [];
  }
}

export function saveCustomTests(tests) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tests));
    return true;
  } catch (error) {
    return false;
  }
}

export function createCustomTestId(tests) {
  let id;
  do {
    id = "CUS-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 100000).toString(36);
  } while (tests.some(function (test) { return test.id === id; }));
  return id;
}

export function formatCustomInput(test) {
  if (test.type === "nearest") {
    return "(" + test.x + ", " + test.y + ")";
  }
  return String(test.key);
}

export function describeCustomActual(test, hospitals = HOSPITALS) {
  if (test.type === "nearest") {
    const result = findNearestHospital(test.x, test.y, hospitals);
    if (result === null) {
      return "No hospitals available";
    }
    return "ID " + result.hospital.id + ", distance " + result.distance.toFixed(2);
  }

  const result = searchHospitalById(test.key, hospitals);
  if (!result.found) {
    return "Not Found";
  }
  return "Found ID " + result.hospital.id + " (" + result.hospital.name + ")";
}

export function runCustomTest(test, hospitals = HOSPITALS) {
  let actual;
  try {
    actual = describeCustomActual(test, hospitals);
  } catch (error) {
    actual = "Error: " + error.message;
  }
  return {
    actual: actual,
    expected: test.expected,
    passed: actual === test.expected
  };
}

export function runCustomTests(tests, hospitals = HOSPITALS) {
  const results = [];
  let passed = 0;

  for (const test of tests) {
    const outcome = runCustomTest(test, hospitals);
    if (outcome.passed) {
      passed++;
    }
    results.push({
      test: test,
      expected: outcome.expected,
      actual: outcome.actual,
      passed: outcome.passed
    });
  }

  return { total: results.length, passed: passed, failed: results.length - passed, results: results };
}
