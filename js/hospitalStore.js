// hospitalStore.js
// Merges the fixed original hospital records with user-added hospitals.
// User-added hospitals are validated, kept sorted by ID, and saved in localStorage.

import { HOSPITALS } from "./hospitals.js";

export const ADDED_HOSPITALS_STORAGE_KEY = "nhf.addedHospitals.v1";
const MAX_NAME_LENGTH = 80;

export function sortHospitalsById(hospitals) {
  const sorted = hospitals.slice();
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    let j = i - 1;
    while (j >= 0 && sorted[j].id > current.id) {
      sorted[j + 1] = sorted[j];
      j--;
    }
    sorted[j + 1] = current;
  }
  return sorted;
}

function originalIdSet() {
  const ids = new Set();
  for (const hospital of HOSPITALS) {
    ids.add(hospital.id);
  }
  return ids;
}

export function isValidAddedHospital(hospital) {
  if (!hospital || typeof hospital !== "object") {
    return false;
  }
  if (!Number.isInteger(hospital.id) || hospital.id <= 0) {
    return false;
  }
  if (typeof hospital.name !== "string" || hospital.name.trim() === "") {
    return false;
  }
  if (!Number.isInteger(hospital.x) || !Number.isInteger(hospital.y)) {
    return false;
  }
  return true;
}

export function loadAddedHospitals() {
  try {
    const raw = localStorage.getItem(ADDED_HOSPITALS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const originalIds = originalIdSet();
    const seenIds = new Set();
    const cleaned = [];
    for (const hospital of parsed) {
      if (!isValidAddedHospital(hospital)) {
        continue;
      }
      const id = hospital.id;
      if (originalIds.has(id) || seenIds.has(id)) {
        continue;
      }
      seenIds.add(id);
      cleaned.push({
        id: id,
        name: hospital.name.trim(),
        x: hospital.x,
        y: hospital.y,
        type: "added"
      });
    }
    return sortHospitalsById(cleaned);
  } catch (error) {
    return [];
  }
}

export function saveAddedHospitals(hospitals) {
  try {
    localStorage.setItem(ADDED_HOSPITALS_STORAGE_KEY, JSON.stringify(hospitals));
    return true;
  } catch (error) {
    return false;
  }
}

export function mergeHospitals(addedHospitals) {
  const combined = [];
  for (const hospital of HOSPITALS) {
    combined.push(hospital);
  }
  for (const hospital of addedHospitals) {
    combined.push(hospital);
  }
  return sortHospitalsById(combined);
}

export function createAddedHospital(candidate, existingHospitals) {
  if (!candidate || typeof candidate !== "object") {
    return { valid: false, message: "Hospital data is required." };
  }

  if (!Number.isInteger(candidate.id) || candidate.id <= 0) {
    return { valid: false, message: "Hospital ID must be a positive whole number." };
  }

  const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
  if (name === "") {
    return { valid: false, message: "Hospital name is required." };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { valid: false, message: "Hospital name must be " + MAX_NAME_LENGTH + " characters or fewer." };
  }
  if (!Number.isInteger(candidate.x) || !Number.isInteger(candidate.y)) {
    return { valid: false, message: "Both coordinates must be whole numbers." };
  }

  for (const hospital of existingHospitals) {
    if (hospital.id === candidate.id) {
      return { valid: false, message: "Hospital ID " + candidate.id + " is already in use." };
    }
  }

  return {
    valid: true,
    message: "",
    hospital: {
      id: candidate.id,
      name: name,
      x: candidate.x,
      y: candidate.y,
      type: "added"
    }
  };
}
