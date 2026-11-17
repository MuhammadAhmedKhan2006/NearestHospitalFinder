// algorithms.js
// Manual implementations of the two required algorithms.
// No UI code here. No built-in sort / search / nearest-neighbour methods are used.

import { HOSPITALS } from "./hospitals.js";

// Squared Euclidean distance: d^2 = (x1 - x2)^2 + (y1 - y2)^2
// The square root is NOT taken here (it is only taken for the final display).
export function squaredDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return dx * dx + dy * dy;
}

// ---------------------------------------------------------------
// A. BRUTE FORCE (Chapter 3)
// One user point is compared against every hospital -> O(n) time, O(1) auxiliary space.
// (rows is extra output for the comparison table; it is not needed by the algorithm itself.)
// ---------------------------------------------------------------
export function findNearestHospital(userX, userY, hospitals = HOSPITALS) {
  if (hospitals.length === 0) {
    return null;
  }

  // Step 1: start with the first hospital as the current nearest hospital
  let nearest = hospitals[0];
  let minSquared = squaredDistance(userX, userY, nearest.x, nearest.y);
  const rows = [{ hospital: nearest, squaredDistance: minSquared }];

  // Step 2-6: check every remaining hospital
  for (let i = 1; i < hospitals.length; i++) {
    const current = hospitals[i];
    const currentSquared = squaredDistance(userX, userY, current.x, current.y);
    rows.push({ hospital: current, squaredDistance: currentSquared });

    if (currentSquared < minSquared) {
      // Step 4: a smaller distance was found
      nearest = current;
      minSquared = currentSquared;
    } else if (currentSquared === minSquared && current.id < nearest.id) {
      // Step 5: tie -> choose the hospital with the smaller ID
      nearest = current;
      minSquared = currentSquared;
    }
  }

  return {
    hospital: nearest,
    squaredDistance: minSquared,
    distance: Math.sqrt(minSquared), // square root only for the final actual distance
    comparisons: hospitals.length,
    rows: rows
  };
}

// ---------------------------------------------------------------
// B. INTERPOLATION SEARCH (Chapter 4) - variable-size-decrease
// Lecture-slide notation:
//   A = sorted array of IDs, l = lower index, r = upper index,
//   v = search key, x = estimated position
//   x = l + floor( ((v - A[l]) * (r - l)) / (A[r] - A[l]) )
// Returns the index of v in A, or -1 (found = false) if it is missing.
// ---------------------------------------------------------------
export function interpolationSearch(A, v) {
  let l = 0;
  let r = A.length - 1;
  const steps = []; // records each probe, for display only

  // The loop stops when the range is empty (l > r) or v lies outside A[l]..A[r]
  // (this also handles IDs smaller than the minimum and greater than the maximum).
  while (l <= r && v >= A[l] && v <= A[r]) {
    let x;

    if (A[r] === A[l]) {
      // Division by zero guard: all values in the range are equal
      x = l;
    } else {
      x = l + Math.floor(((v - A[l]) * (r - l)) / (A[r] - A[l]));
    }

    steps.push({ l: l, r: r, x: x, value: A[x] });

    if (A[x] === v) {
      return { found: true, index: x, steps: steps };
    } else if (v < A[x]) {
      r = x - 1; // search the lower part
    } else {
      l = x + 1; // search the upper part
    }
  }

  return { found: false, index: -1, steps: steps };
}

// Searches the hospital list by ID using Interpolation Search.
export function searchHospitalById(id, hospitals = HOSPITALS) {
  // Build the sorted ID array A (the hospital list is already sorted by ID)
  const A = [];
  for (let i = 0; i < hospitals.length; i++) {
    A.push(hospitals[i].id);
  }

  const result = interpolationSearch(A, id);
  return {
    found: result.found,
    hospital: result.found ? hospitals[result.index] : null,
    index: result.index,
    steps: result.steps
  };
}

// ===== NEW CODE START =====
// ---------------------------------------------------------------
// C. CLOSEST-PAIR ALGORITHM (Chapter 3 - Brute Force Closest-Pair)
// Finds the TWO closest hospitals among n hospitals.
// Checks every pair (i, j) where i < j -> n(n-1)/2 comparisons -> O(n^2) time.
// Auxiliary space: O(1).
// Tie-breaking rule: if two pairs have equal distance, keep the pair
//   with the smaller sum of IDs (hospital1.id + hospital2.id).
// Uses the existing squaredDistance() helper.
// No Math.sqrt in the loop — only for the final distance display.
// ---------------------------------------------------------------
export function findClosestPair(hospitals = HOSPITALS) {
  // Edge cases: need at least 2 hospitals to form a pair
  if (!hospitals || hospitals.length < 2) {
    return null;
  }

  let bestI = 0;
  let bestJ = 1;
  let minSquared = squaredDistance(hospitals[0].x, hospitals[0].y, hospitals[1].x, hospitals[1].y);
  let bestSum = hospitals[0].id + hospitals[1].id;
  let comparisons = 0;

  // Check every pair (i, j) where i < j
  for (let i = 0; i < hospitals.length - 1; i++) {
    for (let j = i + 1; j < hospitals.length; j++) {
      comparisons++;
      const currentSquared = squaredDistance(hospitals[i].x, hospitals[i].y, hospitals[j].x, hospitals[j].y);

      if (currentSquared < minSquared) {
        // Found a smaller distance
        minSquared = currentSquared;
        bestI = i;
        bestJ = j;
        bestSum = hospitals[i].id + hospitals[j].id;
      } else if (currentSquared === minSquared) {
        // Tie: keep the pair with the smaller sum of IDs
        const currentSum = hospitals[i].id + hospitals[j].id;
        if (currentSum < bestSum) {
          bestI = i;
          bestJ = j;
          bestSum = currentSum;
        }
      }
    }
  }

  // comparisons was counted manually: n(n-1)/2 pairs were checked

  return {
    hospital1: hospitals[bestI],
    hospital2: hospitals[bestJ],
    squaredDistance: minSquared,
    distance: Math.sqrt(minSquared), // square root only for the final display
    comparisons: comparisons
  };
}
// ===== NEW CODE END =====
