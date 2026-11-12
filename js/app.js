// app.js
// UI interactions only. The algorithms live in algorithms.js, validation in validation.js.

import { findNearestHospital, searchHospitalById } from "./algorithms.js";
import { validateWholeNumber } from "./validation.js";
import { runAllTests, ORIGINAL_TEST_COUNT } from "./tests.js";
import {
  loadAddedHospitals,
  saveAddedHospitals,
  mergeHospitals,
  createAddedHospital,
  sortHospitalsById
} from "./hospitalStore.js";
import {
  CUSTOM_TEST_TYPES,
  loadCustomTests,
  saveCustomTests,
  createCustomTestId,
  formatCustomInput,
  runCustomTests as executeCustomTests
} from "./customTests.js";

const VIEW_NAMES = ["dashboard", "nearest", "search", "directory", "algorithms", "tests"];
const THEME_STORAGE_KEY = "nhf.theme.v1";
let testsHaveRun = false;
let customTests = loadCustomTests();
let editingCustomId = null;
let addedHospitals = loadAddedHospitals();
let activeHospitals = mergeHospitals(addedHospitals);

// ---------- small helpers ----------
function byId(id) {
  return document.getElementById(id);
}

// Escapes text before placing it in HTML
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showMessage(elementId, type, text) {
  const box = byId(elementId);
  box.textContent = text;
  box.className = "message " + type; // type: success, error, info
  box.hidden = false;
}

function hideMessage(elementId) {
  byId(elementId).hidden = true;
}

function hospitalRangeText() {
  if (activeHospitals.length === 0) {
    return "No hospitals";
  }
  return activeHospitals[0].id + " - " + activeHospitals[activeHospitals.length - 1].id;
}

function clearHospitalResults() {
  byId("nearest-result").hidden = true;
  byId("search-result").hidden = true;
  hideMessage("nearest-message");
  hideMessage("search-message");
}

// ---------- theme ----------
function applyTheme(theme, persist) {
  const selected = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", selected);
  byId("theme-toggle").setAttribute("aria-pressed", selected === "dark" ? "true" : "false");
  byId("theme-toggle-label").textContent = selected === "dark" ? "Light mode" : "Dark mode";
  byId("theme-toggle").setAttribute("aria-label", selected === "dark" ? "Switch to light mode" : "Switch to dark mode");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor !== null) {
    themeColor.setAttribute("content", selected === "dark" ? "#0b1220" : "#f4f8f7");
  }
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, selected);
    } catch (error) {
      // Theme still applies for this session when storage is unavailable.
    }
  }
}

function setupTheme() {
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(current, false);
  byId("theme-toggle").addEventListener("click", function () {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next, true);
  });
}

// ---------- navigation ----------
function showView(name) {
  if (!VIEW_NAMES.includes(name)) {
    name = "dashboard";
  }
  for (const viewName of VIEW_NAMES) {
    byId("view-" + viewName).hidden = viewName !== name;
  }
  const navButtons = document.querySelectorAll(".nav-link");
  for (const button of navButtons) {
    const isActive = button.dataset.view === name;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  }
  if (location.hash !== "#" + name) {
    history.replaceState(null, "", "#" + name);
  }
  if (name === "tests" && !testsHaveRun) {
    runEverything();
  }
  window.scrollTo(0, 0);
}

function setupNavigation() {
  // every element with data-view (nav buttons and dashboard cards)
  const links = document.querySelectorAll("[data-view]");
  for (const link of links) {
    link.addEventListener("click", function () {
      showView(link.dataset.view);
    });
  }
  window.addEventListener("hashchange", function () {
    showView(location.hash.replace("#", ""));
  });
}

// ---------- dashboard ----------
function setupDashboard() {
  byId("total-hospitals").textContent = activeHospitals.length;
  byId("id-range").textContent = hospitalRangeText();
  byId("directory-count").textContent = activeHospitals.length;
  byId("directory-action-count").textContent = activeHospitals.length;
  byId("search-id-range").textContent = hospitalRangeText();
  byId("added-hospital-count").textContent = addedHospitals.length;
}

// ---------- find nearest hospital ----------
function handleNearestSubmit(event) {
  event.preventDefault();
  byId("nearest-result").hidden = true;

  const xCheck = validateWholeNumber(byId("user-x").value, "X coordinate");
  const yCheck = validateWholeNumber(byId("user-y").value, "Y coordinate");

  if (!xCheck.valid || !yCheck.valid) {
    const problems = [];
    if (!xCheck.valid) problems.push(xCheck.message);
    if (!yCheck.valid) problems.push(yCheck.message);
    showMessage("nearest-message", "error", problems.join(" "));
    return;
  }

  const result = findNearestHospital(xCheck.value, yCheck.value, activeHospitals);
  const nearest = result.hospital;

  byId("nearest-name").textContent = nearest.name;
  byId("nearest-id").textContent = nearest.id;
  byId("nearest-coords").textContent = "(" + nearest.x + ", " + nearest.y + ")";
  byId("nearest-distance").textContent = result.distance.toFixed(2) + " units";
  byId("nearest-squared").textContent = result.squaredDistance;
  byId("nearest-comparisons").textContent = result.comparisons;

  let rowsHtml = "";
  let step = 0;
  for (const row of result.rows) {
    step++;
    const h = row.hospital;
    const isNearest = h.id === nearest.id;
    rowsHtml +=
      '<tr class="' + (isNearest ? "highlight" : "") + '">' +
      "<td>" + step + "</td>" +
      "<td>" + h.id + "</td>" +
      "<td>" + escapeHtml(h.name) + (isNearest ? ' <span class="badge">Nearest</span>' : "") + "</td>" +
      "<td>" + h.x + "</td>" +
      "<td>" + h.y + "</td>" +
      "<td>" + row.squaredDistance + "</td>" +
      "<td>" + Math.sqrt(row.squaredDistance).toFixed(2) + "</td>" +
      "</tr>";
  }
  byId("nearest-table-body").innerHTML = rowsHtml;

  byId("nearest-result").hidden = false;
  showMessage(
    "nearest-message",
    "success",
    "Nearest hospital found: " + nearest.name + " (ID " + nearest.id + "), " + result.distance.toFixed(2) + " units away."
  );
}

// ---------- search by ID ----------
function handleSearchSubmit(event) {
  event.preventDefault();
  byId("search-result").hidden = true;

  const idCheck = validateWholeNumber(byId("search-id").value, "Hospital ID");
  if (!idCheck.valid) {
    showMessage("search-message", "error", idCheck.message);
    return;
  }

  const id = idCheck.value;
  const result = searchHospitalById(id, activeHospitals);

  const statusBox = byId("search-status");
  if (result.found) {
    const h = result.hospital;
    statusBox.innerHTML = '<span class="badge badge-found">Found</span>';
    byId("search-result-id").textContent = h.id;
    byId("search-result-name").textContent = h.name;
    byId("search-result-x").textContent = h.x;
    byId("search-result-y").textContent = h.y;
    showMessage("search-message", "success", "Hospital found: " + h.name + " (ID " + h.id + ").");
  } else {
    statusBox.innerHTML = '<span class="badge badge-missing">Not Found</span>';
    byId("search-result-id").textContent = id;
    byId("search-result-name").textContent = "-";
    byId("search-result-x").textContent = "-";
    byId("search-result-y").textContent = "-";
    showMessage(
      "search-message",
      "error",
      "Hospital ID " + id + " was not found. Stored IDs range from " + activeHospitals[0].id + " to " + activeHospitals[activeHospitals.length - 1].id + "."
    );
  }

  let stepsHtml = "";
  if (result.steps.length === 0) {
    stepsHtml = '<tr><td colspan="5">No estimate was needed: the ID is outside the range of stored IDs.</td></tr>';
  }
  for (let i = 0; i < result.steps.length; i++) {
    const s = result.steps[i];
    stepsHtml += "<tr><td>" + (i + 1) + "</td><td>" + s.l + "</td><td>" + s.r + "</td><td>" + s.x + "</td><td>" + s.value + "</td></tr>";
  }
  byId("search-steps-body").innerHTML = stepsHtml;
  byId("search-result").hidden = false;
}

// ---------- directory ----------
function buildDirectory() {
  let rowsHtml = "";
  for (const h of activeHospitals) {
    let typeText = "Original record";
    if (h.type === "sample") {
      typeText = "Fictional sample hospital";
    } else if (h.type === "added") {
      typeText = "User-added hospital";
    }
    rowsHtml +=
      "<tr><td>" + h.id + "</td><td>" + escapeHtml(h.name) + "</td><td>" + h.x + "</td><td>" + h.y + "</td><td>" + typeText + "</td></tr>";
  }
  byId("directory-body").innerHTML = rowsHtml;
}

function handleAddHospitalSubmit(event) {
  event.preventDefault();

  const idCheck = validateWholeNumber(byId("hospital-id").value, "Hospital ID");
  const xCheck = validateWholeNumber(byId("hospital-x").value, "X coordinate");
  const yCheck = validateWholeNumber(byId("hospital-y").value, "Y coordinate");

  if (!idCheck.valid || !xCheck.valid || !yCheck.valid) {
    const problems = [];
    if (!idCheck.valid) problems.push(idCheck.message);
    if (!xCheck.valid) problems.push(xCheck.message);
    if (!yCheck.valid) problems.push(yCheck.message);
    showMessage("add-hospital-message", "error", problems.join(" "));
    return;
  }

  const outcome = createAddedHospital(
    {
      id: idCheck.value,
      name: byId("hospital-name").value,
      x: xCheck.value,
      y: yCheck.value
    },
    activeHospitals
  );

  if (!outcome.valid) {
    showMessage("add-hospital-message", "error", outcome.message);
    return;
  }

  addedHospitals.push(outcome.hospital);
  addedHospitals = sortHospitalsById(addedHospitals);
  activeHospitals = mergeHospitals(addedHospitals);
  const saved = saveAddedHospitals(addedHospitals);

  byId("add-hospital-form").reset();
  setupDashboard();
  buildDirectory();
  clearHospitalResults();
  if (testsHaveRun) {
    runEverything();
  }

  if (saved) {
    showMessage(
      "add-hospital-message",
      "success",
      "Hospital added and saved in localStorage: ID " + outcome.hospital.id + " (" + outcome.hospital.name + ")."
    );
  } else {
    showMessage(
      "add-hospital-message",
      "error",
      "Hospital added for this session, but localStorage is unavailable. It will be lost on refresh."
    );
  }
}

// ---------- tests ----------
let lastCustomResults = [];

function statusBadge(passed) {
  return '<span class="badge ' + (passed ? "badge-found" : "badge-missing") + '">' + (passed ? "PASS" : "FAIL") + "</span>";
}

function setTestsSummary(total, passed, failed, type, text) {
  byId("tests-total").textContent = total;
  byId("tests-passed").textContent = passed;
  byId("tests-failed").textContent = failed;
  byId("tests-output").hidden = false;
  showMessage("tests-message", type, text);
}

function renderOriginalTests(results) {
  let rowsHtml = "";
  for (const t of results) {
    rowsHtml +=
      "<tr><td>" + t.id + "</td><td>" + t.group + "</td><td>" + escapeHtml(t.description) + "</td>" +
      "<td>" + escapeHtml(t.input) + "</td><td>" + escapeHtml(t.expected) + "</td><td>" + escapeHtml(t.actual) + "</td>" +
      "<td>" + statusBadge(t.passed) + "</td></tr>";
  }
  if (rowsHtml === "") {
    rowsHtml = '<tr><td colspan="7">No original tests were run.</td></tr>';
  }
  byId("tests-body").innerHTML = rowsHtml;
}

function renderCustomTests(results) {
  if (results.length === 0) {
    byId("custom-tests-body").innerHTML =
      '<tr><td colspan="7">No custom tests yet. Add one above; it will be saved in localStorage.</td></tr>';
    return;
  }

  let rowsHtml = "";
  for (const r of results) {
    const t = r.test;
    rowsHtml +=
      "<tr><td>" + escapeHtml(t.id) + "</td>" +
      "<td>" + CUSTOM_TEST_TYPES[t.type] + "</td>" +
      "<td>" + escapeHtml(formatCustomInput(t)) + "</td>" +
      "<td>" + escapeHtml(r.expected) + "</td>" +
      "<td>" + escapeHtml(r.actual) + "</td>" +
      "<td>" + statusBadge(r.passed) + "</td>" +
      '<td><button type="button" class="btn btn-small btn-secondary" data-edit-custom="' + escapeHtml(t.id) + '">Edit</button> ' +
      '<button type="button" class="btn btn-small btn-danger" data-delete-custom="' + escapeHtml(t.id) + '">Delete</button></td></tr>';
  }
  byId("custom-tests-body").innerHTML = rowsHtml;
}

function runOriginalOnly() {
  const summary = runAllTests();
  const customSummary = executeCustomTests(customTests, activeHospitals);
  lastCustomResults = customSummary.results;
  renderOriginalTests(summary.results);
  renderCustomTests(lastCustomResults);

  if (summary.failed === 0) {
    setTestsSummary(summary.total, summary.passed, summary.failed, "success", "All " + summary.total + " original tests passed.");
  } else {
    setTestsSummary(summary.total, summary.passed, summary.failed, "error", summary.failed + " of " + summary.total + " original tests failed.");
  }
  testsHaveRun = true;
}

function runCustomOnly() {
  const summary = executeCustomTests(customTests, activeHospitals);
  lastCustomResults = summary.results;
  renderOriginalTests(runAllTests().results);
  renderCustomTests(lastCustomResults);

  if (summary.total === 0) {
    setTestsSummary(0, 0, 0, "info", "No custom tests yet. Add one above.");
  } else if (summary.failed === 0) {
    setTestsSummary(summary.total, summary.passed, summary.failed, "success", "All " + summary.total + " custom tests passed.");
  } else {
    setTestsSummary(summary.total, summary.passed, summary.failed, "error", summary.failed + " of " + summary.total + " custom tests failed.");
  }
  testsHaveRun = true;
}

function runEverything() {
  const originalSummary = runAllTests();
  const customSummary = executeCustomTests(customTests, activeHospitals);
  lastCustomResults = customSummary.results;
  renderOriginalTests(originalSummary.results);
  renderCustomTests(lastCustomResults);

  const total = originalSummary.total + customSummary.total;
  const passed = originalSummary.passed + customSummary.passed;
  const failed = originalSummary.failed + customSummary.failed;

  if (failed === 0) {
    setTestsSummary(
      total,
      passed,
      failed,
      "success",
      "All " + total + " tests passed (" + originalSummary.total + " original, " + customSummary.total + " custom)."
    );
  } else {
    setTestsSummary(total, passed, failed, "error", failed + " of " + total + " tests failed.");
  }
  testsHaveRun = true;
}

function findCustomTest(id) {
  for (const test of customTests) {
    if (test.id === id) {
      return test;
    }
  }
  return null;
}

function updateCustomTypeFields() {
  const isNearest = byId("custom-type").value === "nearest";
  byId("custom-x-field").hidden = !isNearest;
  byId("custom-y-field").hidden = !isNearest;
  byId("custom-key-field").hidden = isNearest;
  byId("custom-expected").placeholder = isNearest
    ? "ID 103, distance 0.00"
    : "Found ID 135 (Nazimabad Care Hospital) or Not Found";
}

function resetCustomForm() {
  byId("custom-test-form").reset();
  editingCustomId = null;
  byId("custom-submit-btn").textContent = "Add Test";
  byId("custom-cancel-btn").hidden = true;
  updateCustomTypeFields();
}

function handleCustomSubmit(event) {
  event.preventDefault();

  const type = byId("custom-type").value;
  const expected = byId("custom-expected").value.trim();
  if (expected === "") {
    showMessage("custom-test-message", "error", "Expected output is required.");
    return;
  }

  const test = { type: type, expected: expected };
  if (type === "nearest") {
    const xCheck = validateWholeNumber(byId("custom-x").value, "X coordinate");
    const yCheck = validateWholeNumber(byId("custom-y").value, "Y coordinate");
    if (!xCheck.valid || !yCheck.valid) {
      const problems = [];
      if (!xCheck.valid) problems.push(xCheck.message);
      if (!yCheck.valid) problems.push(yCheck.message);
      showMessage("custom-test-message", "error", problems.join(" "));
      return;
    }
    test.x = xCheck.value;
    test.y = yCheck.value;
  } else {
    const keyCheck = validateWholeNumber(byId("custom-key").value, "Hospital ID");
    if (!keyCheck.valid) {
      showMessage("custom-test-message", "error", keyCheck.message);
      return;
    }
    test.key = keyCheck.value;
  }

  let action = "added";
  if (editingCustomId !== null) {
    const existing = findCustomTest(editingCustomId);
    if (existing === null) {
      resetCustomForm();
      showMessage("custom-test-message", "error", "The custom test being edited no longer exists.");
      return;
    }
    test.id = existing.id;
    test.createdAt = existing.createdAt;
    for (let i = 0; i < customTests.length; i++) {
      if (customTests[i].id === test.id) {
        customTests[i] = test;
      }
    }
    action = "updated";
  } else {
    test.id = createCustomTestId(customTests);
    test.createdAt = new Date().toISOString();
    customTests.push(test);
  }

  const saved = saveCustomTests(customTests);
  resetCustomForm();
  runEverything();

  if (saved) {
    showMessage("custom-test-message", "success", "Custom test " + action + " and saved in localStorage.");
  } else {
    showMessage("custom-test-message", "error", "Custom test " + action + " in memory, but localStorage is unavailable. It will be lost on refresh.");
  }
}

function beginEditCustomTest(id) {
  const test = findCustomTest(id);
  if (test === null) {
    return;
  }

  editingCustomId = id;
  byId("custom-type").value = test.type;
  if (test.type === "nearest") {
    byId("custom-x").value = test.x;
    byId("custom-y").value = test.y;
    byId("custom-key").value = "";
  } else {
    byId("custom-key").value = test.key;
    byId("custom-x").value = "";
    byId("custom-y").value = "";
  }
  byId("custom-expected").value = test.expected;
  updateCustomTypeFields();
  byId("custom-submit-btn").textContent = "Update Test";
  byId("custom-cancel-btn").hidden = false;
  hideMessage("custom-test-message");
  byId("custom-test-form").scrollIntoView({ block: "center" });
}

function deleteCustomTest(id) {
  if (findCustomTest(id) === null) {
    return;
  }
  if (!window.confirm("Delete custom test " + id + "?")) {
    return;
  }

  customTests = customTests.filter(function (test) {
    return test.id !== id;
  });
  if (editingCustomId === id) {
    resetCustomForm();
  }

  const saved = saveCustomTests(customTests);
  runEverything();
  if (saved) {
    showMessage("custom-test-message", "info", "Custom test " + id + " deleted.");
  } else {
    showMessage("custom-test-message", "error", "Custom test " + id + " deleted in memory, but localStorage is unavailable.");
  }
}

function setupCustomTestForm() {
  byId("custom-type").addEventListener("change", updateCustomTypeFields);
  byId("custom-test-form").addEventListener("submit", handleCustomSubmit);
  byId("custom-cancel-btn").addEventListener("click", function () {
    resetCustomForm();
    hideMessage("custom-test-message");
  });
  byId("custom-tests-body").addEventListener("click", function (event) {
    const editButton = event.target.closest("[data-edit-custom]");
    if (editButton !== null) {
      beginEditCustomTest(editButton.getAttribute("data-edit-custom"));
      return;
    }
    const deleteButton = event.target.closest("[data-delete-custom]");
    if (deleteButton !== null) {
      deleteCustomTest(deleteButton.getAttribute("data-delete-custom"));
    }
  });
  updateCustomTypeFields();
}

// ---------- start ----------
function startApp() {
  setupTheme();
  setupNavigation();
  setupDashboard();
  buildDirectory();
  byId("nearest-form").addEventListener("submit", handleNearestSubmit);
  byId("search-form").addEventListener("submit", handleSearchSubmit);
  byId("add-hospital-form").addEventListener("submit", handleAddHospitalSubmit);
  byId("run-original-tests-btn").textContent = "Run Original Tests (" + ORIGINAL_TEST_COUNT + ")";
  byId("run-original-tests-btn").addEventListener("click", runOriginalOnly);
  byId("run-custom-tests-btn").addEventListener("click", runCustomOnly);
  byId("run-all-tests-btn").addEventListener("click", runEverything);
  setupCustomTestForm();
  showView(location.hash.replace("#", ""));
}

startApp();
