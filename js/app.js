// app.js
// UI interactions only. The algorithms live in algorithms.js, validation in validation.js.

import { HOSPITALS } from "./hospitals.js";
import { findNearestHospital, searchHospitalById } from "./algorithms.js";
import { validateWholeNumber } from "./validation.js";
import { runAllTests } from "./tests.js";

const VIEW_NAMES = ["dashboard", "nearest", "search", "directory", "algorithms", "tests"];
let testsHaveRun = false;

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
    button.classList.toggle("active", button.dataset.view === name);
  }
  if (location.hash !== "#" + name) {
    history.replaceState(null, "", "#" + name);
  }
  if (name === "tests" && !testsHaveRun) {
    showTestResults();
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
  byId("total-hospitals").textContent = HOSPITALS.length;
  byId("id-range").textContent = HOSPITALS[0].id + " - " + HOSPITALS[HOSPITALS.length - 1].id;
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

  const result = findNearestHospital(xCheck.value, yCheck.value);
  const nearest = result.hospital;

  byId("nearest-name").textContent = nearest.name;
  byId("nearest-id").textContent = nearest.id;
  byId("nearest-coords").textContent = "(" + nearest.x + ", " + nearest.y + ")";
  byId("nearest-distance").textContent = result.distance.toFixed(2) + " units";
  byId("nearest-squared").textContent = result.squaredDistance;
  byId("nearest-comparisons").textContent = result.comparisons;

  let rowsHtml = "";
  for (const row of result.rows) {
    const h = row.hospital;
    const isNearest = h.id === nearest.id;
    rowsHtml +=
      '<tr class="' + (isNearest ? "highlight" : "") + '">' +
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
  const result = searchHospitalById(id);

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
      "Hospital ID " + id + " was not found. Valid IDs are " + HOSPITALS[0].id + " to " + HOSPITALS[HOSPITALS.length - 1].id + "."
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
  for (const h of HOSPITALS) {
    const typeText = h.type === "sample" ? "Fictional sample hospital" : "Original record";
    rowsHtml +=
      "<tr><td>" + h.id + "</td><td>" + escapeHtml(h.name) + "</td><td>" + h.x + "</td><td>" + h.y + "</td><td>" + typeText + "</td></tr>";
  }
  byId("directory-body").innerHTML = rowsHtml;
}

// ---------- tests ----------
function showTestResults() {
  const summary = runAllTests();
  testsHaveRun = true;

  byId("tests-total").textContent = summary.total;
  byId("tests-passed").textContent = summary.passed;
  byId("tests-failed").textContent = summary.failed;

  let rowsHtml = "";
  for (const t of summary.results) {
    rowsHtml +=
      "<tr><td>" + t.id + "</td><td>" + t.group + "</td><td>" + escapeHtml(t.description) + "</td>" +
      "<td>" + escapeHtml(t.input) + "</td><td>" + escapeHtml(t.expected) + "</td><td>" + escapeHtml(t.actual) + "</td>" +
      '<td><span class="badge ' + (t.passed ? "badge-found" : "badge-missing") + '">' + (t.passed ? "PASS" : "FAIL") + "</span></td></tr>";
  }
  byId("tests-body").innerHTML = rowsHtml;
  byId("tests-output").hidden = false;

  if (summary.failed === 0) {
    showMessage("tests-message", "success", "All " + summary.total + " tests passed.");
  } else {
    showMessage("tests-message", "error", summary.failed + " of " + summary.total + " tests failed.");
  }
}

// ---------- start ----------
function startApp() {
  setupNavigation();
  setupDashboard();
  buildDirectory();
  byId("nearest-form").addEventListener("submit", handleNearestSubmit);
  byId("search-form").addEventListener("submit", handleSearchSubmit);
  byId("run-tests-btn").addEventListener("click", showTestResults);
  showView(location.hash.replace("#", ""));
}

startApp();
