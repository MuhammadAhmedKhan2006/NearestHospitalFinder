# PROJECT REPORT REFERENCE - Nearest Hospital Finder

*This file documents what is actually implemented in this project. It is meant to be used later as the main reference for writing the formal university report. No screenshots are included, and nothing here describes features that do not exist, except the clearly labelled "Future Enhancements" section.*

---

## 1. Project Title and Course Information

- **Project title:** Nearest Hospital Finder
- **Course:** CT-363 Design and Analysis of Algorithms (DAA)
- **Project type:** University academic project (not a commercial hospital management system)
- **Chapters covered:** Chapter 3 (Brute Force) and Chapter 4 (Interpolation Search, Variable-Size-Decrease)
- **Student name, roll number, instructor, submission date:** to be filled in by the student when writing the report.

## 2. Project Overview and Introduction

Nearest Hospital Finder is a browser-based application that starts with 70 hospitals and lets the user add more. Each hospital has an ID, a name and an (X, Y) position on a fictional 2D grid. The user can:

1. enter a point (X, Y) and find the nearest hospital using a **Brute Force** algorithm,
2. enter a hospital ID and find that hospital using **Interpolation Search**, and
3. add hospitals from the directory; saved additions immediately join the active dataset.

The project demonstrates, in a simple and visible way, how these two algorithms work, how their complexity is analysed, and how they can be tested with executable test cases. The interface includes a persistent light/dark theme and a responsive medical-dashboard design.

All coordinates are **fictional Cartesian coordinates for academic testing**. They are not real geographical coordinates.

## 3. Problem Statement

Given a set of n hospitals with known positions and unique IDs:

- **Problem A (nearest neighbour):** for a user-supplied point, determine which hospital is closest, and report its name, ID, coordinates and distance. If two hospitals are equally close, the one with the smaller ID must be chosen.
- **Problem B (search):** for a user-supplied ID, determine whether a hospital with that ID exists and, if so, return its details, using Interpolation Search on the sorted ID list.

## 4. Project Objectives

1. Implement the Brute Force strategy (Chapter 3) for a nearest-point problem.
2. Implement Interpolation Search (Chapter 4) using the exact formula and notation from the lecture slides.
3. Analyse the time and auxiliary space complexity of both algorithms.
4. Validate user input so that only whole numbers are accepted.
5. Verify the algorithms with executable test cases that run the real code.
6. Allow users to extend the active hospital dataset and persist those additions.
7. Present the work in a polished, responsive web interface with light and dark themes.

## 5. Project Scope

**In scope:** 70 predefined hospitals (IDs 101-170); adding new hospital records with validation; localStorage persistence of added hospitals; nearest-hospital search by coordinates; search by ID; dynamic hospital directory; algorithm explanations; complexity analysis; input validation; 34 read-only original tests; user-created custom tests with add / view / edit / delete; localStorage persistence of custom tests; separate and combined test runs; execution-step traces; light/dark themes with persistence; responsive layout; documentation.

**Out of scope:** real maps or real coordinates; editing or deleting hospital records; user accounts; databases or Supabase; external APIs; sharing custom tests or added hospitals between browsers or users; saving search results between sessions (custom test definitions, added hospitals and the theme choice are saved in localStorage).

## 6. Functional Requirements

| No. | Requirement | Where implemented |
|---|---|---|
| FR1 | Dashboard with title, introduction, overview and navigation | Dashboard view |
| FR2 | Show the current active hospital count and ID range | Dashboard `Total Hospitals` and `ID Range` cards |
| FR3 | Accept user X and Y through input fields | Find Nearest Hospital view |
| FR4 | Brute Force nearest search over all active hospitals | `findNearestHospital` |
| FR5 | Show nearest hospital name, ID, coordinates, actual distance | Nearest result card |
| FR6 | Distance comparison table with step numbers and nearest row highlighted | Nearest view table |
| FR7 | Tie-breaking by smaller ID | `findNearestHospital` |
| FR8 | Search by ID with an input and a button | Search by ID view |
| FR9 | Interpolation Search using the lecture-slide formula | `interpolationSearch` |
| FR10 | Show name, ID, X, Y and Found / Not Found | Search result card |
| FR11 | Directory of all hospitals in ascending ID order | Hospital Directory view |
| FR12 | Algorithm explanations | Algorithms view |
| FR13 | Complexity analysis | Algorithms view |
| FR14 | Input validation (reject empty, letters, decimals, invalid characters; accept negative whole numbers) | `validateWholeNumber` |
| FR15 | Executable tests for Brute Force, Interpolation Search and validation | `runAllTests` |
| FR16 | Test summary (total, passed, failed) and individual PASS/FAIL | Tests view |
| FR17 | Navigation between six views | Navigation bar |
| FR18 | Success, error and not-found messages | Message boxes |
| FR19 | Responsive layout | `css/style.css` |
| FR20 | Documentation files | README, TEST_CASES, PROJECT_REPORT |
| FR21 | Add custom Brute Force and Interpolation Search tests through the UI | Tests view, custom test form |
| FR22 | View, edit and delete custom tests | Tests view, custom test table |
| FR23 | Save custom tests in the browser | `localStorage` key `nhf.customTests.v1` |
| FR24 | Custom tests execute the real production algorithms | `customTests.js` calls `findNearestHospital` / `searchHospitalById` |
| FR25 | Run original tests, custom tests, or both; original tests are protected | Three run buttons; frozen original test list |
| FR26 | Display actual execution steps for both algorithms | Brute Force step trace; Interpolation Search probe table |
| FR27 | Add a hospital with a unique positive ID, name and whole-number coordinates | Hospital Directory add form |
| FR28 | Reject duplicate IDs, blank names and invalid coordinates with clear messages | `createAddedHospital` in `hospitalStore.js` |
| FR29 | Persist user-added hospitals in the browser | `localStorage` key `nhf.addedHospitals.v1` |
| FR30 | Merge original and added hospitals in ascending ID order for both algorithms | `mergeHospitals` / `sortHospitalsById` |
| FR31 | Show light and dark themes with a persistent choice | Theme toggle; `localStorage` key `nhf.theme.v1` |
| FR32 | Provide a polished responsive layout with consistent rounded buttons | `css/style.css` |

## 7. Non-Functional Requirements

- **Simplicity:** beginner-friendly, readable code that can be explained in a viva.
- **Portability:** runs in a modern browser through VS Code Live Server; no installation or build step.
- **Correctness:** algorithms follow the lecture/textbook definitions; tests run real functions.
- **Usability:** clear labels, clear error and success messages, accessible focus states, and a polished responsive layout.
- **Responsiveness:** usable on desktop, tablet and mobile screen widths.
- **Maintainability:** algorithms, validation, data, tests and UI code are in separate files.

## 8. Technology Stack

- HTML5, CSS3, vanilla JavaScript (ES6) using ES modules (`import` / `export`).
- Browser `localStorage` stores user-created custom tests under `nhf.customTests.v1`, added hospitals under `nhf.addedHospitals.v1`, and the theme choice under `nhf.theme.v1`.
- Runs with VS Code Live Server or any static HTTP server (ES modules need an http server, not `file://`).
- Not used: React, TypeScript, Node.js in the project, frameworks, external APIs, databases, Supabase.

## 9. System Features and Descriptions

1. **Dashboard** - introduction, dynamic total hospital count, ID range, user-added count, and cards that open each feature.
2. **Find Nearest Hospital** - two text inputs (X, Y). On submit the inputs are validated, Brute Force runs over the active dataset, and the result card and distance trace are shown. The first column is the actual comparison step; the nearest row is highlighted and carries a "Nearest" badge. The baseline trace has 70 rows and grows when hospitals are added.
3. **Search by ID** - one text input. On submit the ID is validated and Interpolation Search runs over the active sorted ID array. The result shows a Found / Not Found status, ID, name, X and Y. A "Search Steps" table shows every actual probe (l, r, x, A[x]).
4. **Hospital Directory** - a table of all active hospitals sorted by ID, with a column saying whether each is an original record, a fictional sample hospital or a user-added hospital. The add form validates and persists new records.
5. **Algorithms** - explanations of Brute Force, Euclidean distance, Closest-Pair adaptation, Interpolation Search, Variable-Size-Decrease, and a complexity table.
6. **Tests** - runs 34 read-only original tests, user-created custom tests, or both. The page shows a run summary, the original results, and the custom results with PASS / FAIL status. Custom tests use the active dataset, including added hospitals, and call the real production algorithms.
7. **Theme and layout** - a light/dark theme toggle applies immediately, persists across refreshes, and restyles the whole interface. The responsive dashboard uses consistent rounded buttons, cards, tables, inputs and messages.
8. **Messages** - green success messages, red error messages (invalid input, duplicate hospital ID, ID not found), and persistence warnings.

## 10. Complete Folder Structure

```text
NearestHospitalFinder/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── hospitals.js
│   ├── hospitalStore.js
│   ├── algorithms.js
│   ├── validation.js
│   ├── tests.js
│   ├── customTests.js
│   └── app.js
├── README.md
├── TEST_CASES.md
└── PROJECT_REPORT.md
```

## 11. Baseline Hospital Dataset and All 70 Records

- The baseline contains exactly **70 hospitals**, IDs **101 to 170**, sequential and sorted in ascending order. Because these IDs are consecutive, they are perfectly evenly spread, which is the best case for Interpolation Search.
- Each baseline record has: unique integer `id`, `name`, integer `x`, integer `y`, and a `type` field (`original` or `sample`).
- IDs 101-115 are the **15 original records** supplied with the project brief and are unchanged.
- IDs 116-170 are **55 fictional sample hospitals**. The names are invented, use Karachi-style area names where practical, and do not refer to real institutions. They are identified in the directory as "Fictional sample hospital".
- All baseline records are written explicitly in `js/hospitals.js`. No random data generation is used.
- Users may add records at runtime. Added records are stored separately in localStorage with `type: "added"`, merged with the baseline in ascending ID order, and marked in the directory as "User-added hospital". The active dataset is therefore 70 hospitals initially and grows as records are added.
- The baseline coordinates are fictional Cartesian values (range 2-100), not geographical coordinates. All 70 baseline coordinate pairs are distinct.

| ID | Hospital | X | Y | Record Type |
|---|---|---:|---:|---|
| 101 | Jinnah Hospital | 10 | 20 | Original record |
| 102 | Civil Hospital | 15 | 25 | Original record |
| 103 | Aga Khan Hospital | 30 | 40 | Original record |
| 104 | Liaquat National Hospital | 50 | 60 | Original record |
| 105 | Indus Hospital | 12 | 18 | Original record |
| 106 | Ziauddin Hospital | 70 | 80 | Original record |
| 107 | Abbasi Shaheed Hospital | 25 | 35 | Original record |
| 108 | South City Hospital | 40 | 45 | Original record |
| 109 | Patel Hospital | 60 | 30 | Original record |
| 110 | National Medical Centre | 80 | 20 | Original record |
| 111 | Medicare Cardiac Centre | 35 | 55 | Original record |
| 112 | PNS Shifa Hospital | 55 | 65 | Original record |
| 113 | Darul Sehat Hospital | 90 | 40 | Original record |
| 114 | Hill Park General Hospital | 20 | 70 | Original record |
| 115 | Burhani Hospital | 65 | 15 | Original record |
| 116 | Clifton Care Hospital | 45 | 10 | Fictional sample hospital |
| 117 | Gulshan Medical Complex | 75 | 50 | Fictional sample hospital |
| 118 | Korangi Community Hospital | 85 | 70 | Fictional sample hospital |
| 119 | Saddar City Hospital | 28 | 12 | Fictional sample hospital |
| 120 | Malir Valley Hospital | 95 | 60 | Fictional sample hospital |
| 121 | North Nazimabad Hospital | 18 | 45 | Fictional sample hospital |
| 122 | DHA Wellness Hospital | 52 | 8 | Fictional sample hospital |
| 123 | Lyari General Care Hospital | 5 | 30 | Fictional sample hospital |
| 124 | Orangi Town Hospital | 8 | 62 | Fictional sample hospital |
| 125 | Landhi Relief Hospital | 88 | 25 | Fictional sample hospital |
| 126 | Scheme 33 Medical Centre | 72 | 35 | Fictional sample hospital |
| 127 | Gulistan-e-Jauhar Hospital | 68 | 55 | Fictional sample hospital |
| 128 | PECHS Family Hospital | 38 | 28 | Fictional sample hospital |
| 129 | Tariq Road Clinic Hospital | 42 | 62 | Fictional sample hospital |
| 130 | Defence Phase 8 Hospital | 58 | 5 | Fictional sample hospital |
| 131 | Baldia Health Hospital | 3 | 48 | Fictional sample hospital |
| 132 | Keamari Harbour Hospital | 22 | 3 | Fictional sample hospital |
| 133 | Shah Faisal Colony Hospital | 78 | 12 | Fictional sample hospital |
| 134 | Federal B Area Hospital | 32 | 68 | Fictional sample hospital |
| 135 | Nazimabad Care Hospital | 14 | 55 | Fictional sample hospital |
| 136 | Bahadurabad Medical Hospital | 48 | 38 | Fictional sample hospital |
| 137 | Clifton Block 5 Hospital | 62 | 22 | Fictional sample hospital |
| 138 | Karsaz Road Hospital | 82 | 45 | Fictional sample hospital |
| 139 | Gizri Community Hospital | 56 | 14 | Fictional sample hospital |
| 140 | University Road Hospital | 66 | 72 | Fictional sample hospital |
| 141 | Hawksbay Care Hospital | 2 | 10 | Fictional sample hospital |
| 142 | Manghopir Hospital | 26 | 78 | Fictional sample hospital |
| 143 | Surjani Town Hospital | 36 | 85 | Fictional sample hospital |
| 144 | Gadap Rural Health Hospital | 92 | 90 | Fictional sample hospital |
| 145 | Bin Qasim Medical Hospital | 98 | 30 | Fictional sample hospital |
| 146 | Garden West Hospital | 24 | 50 | Fictional sample hospital |
| 147 | Jamshed Road Hospital | 46 | 52 | Fictional sample hospital |
| 148 | Soldier Bazaar Hospital | 34 | 14 | Fictional sample hospital |
| 149 | Ibrahim Hyderi Hospital | 100 | 8 | Fictional sample hospital |
| 150 | Super Highway Hospital | 74 | 92 | Fictional sample hospital |
| 151 | Mauripur Hospital | 16 | 8 | Fictional sample hospital |
| 152 | Shireen Jinnah Colony Hospital | 53 | 25 | Fictional sample hospital |
| 153 | Frere Town Hospital | 41 | 33 | Fictional sample hospital |
| 154 | Mehmoodabad Hospital | 63 | 42 | Fictional sample hospital |
| 155 | Akhtar Colony Hospital | 71 | 24 | Fictional sample hospital |
| 156 | Golimar Hospital | 21 | 36 | Fictional sample hospital |
| 157 | Liaquatabad Hospital | 29 | 58 | Fictional sample hospital |
| 158 | Azizabad Hospital | 39 | 72 | Fictional sample hospital |
| 159 | Buffer Zone Hospital | 13 | 80 | Fictional sample hospital |
| 160 | Metroville Hospital | 7 | 70 | Fictional sample hospital |
| 161 | Pakistan Quarters Hospital | 49 | 77 | Fictional sample hospital |
| 162 | Gulberg Care Hospital | 57 | 47 | Fictional sample hospital |
| 163 | Zamzama Medical Hospital | 61 | 10 | Fictional sample hospital |
| 164 | Kharadar Hospital | 31 | 4 | Fictional sample hospital |
| 165 | Mithadar Hospital | 19 | 22 | Fictional sample hospital |
| 166 | Nursery Hospital | 44 | 20 | Fictional sample hospital |
| 167 | Tipu Sultan Road Hospital | 77 | 66 | Fictional sample hospital |
| 168 | Sharea Faisal Hospital | 69 | 85 | Fictional sample hospital |
| 169 | Askari Hospital | 86 | 56 | Fictional sample hospital |
| 170 | Malir Cantt Hospital | 94 | 76 | Fictional sample hospital |

## 12. Explanation of the Brute Force Algorithm

Brute Force (Chapter 3) solves a problem by directly examining every possibility, without any clever shortcut. Its advantages are simplicity and guaranteed correctness. Its disadvantage is that the running time grows with the amount of input. For the nearest-hospital problem, the possibilities are the n hospitals: the algorithm computes the distance to each one and remembers the smallest.

## 13. Closest-Pair Concept and Its Adaptation

The **Closest-Pair Problem** asks for the two closest points in a set of n points. The brute-force solution computes the distance for every pair of points, which is n(n-1)/2 pairs, giving **O(n²)** time.

This project **adapts** the idea: instead of comparing all pairs, it compares **one** user point against the n hospitals. Only n distances are needed, so the correct complexity is **O(n)**, not O(n²). The comparison "keep the smallest distance seen so far" is the same idea used in the closest-pair brute-force algorithm.

## 14. Euclidean and Squared-Distance Formulas

Euclidean distance between (x1, y1) and (x2, y2):

```
d = sqrt( (x1 - x2)² + (y1 - y2)² )
```

Squared distance (used for comparing):

```
d² = (x1 - x2)² + (y1 - y2)²
```

Since the square root is an increasing function, d1² < d2² exactly when d1 < d2. Comparing squared distances therefore gives the same result, avoids repeated square-root calculations, and keeps all values as exact integers. In the code, `Math.sqrt` is called only when the final actual distance is displayed (and for the per-row distance column of the comparison table).

## 15. Step-by-Step Brute Force Algorithm

1. Start with the first hospital as the current nearest hospital and calculate its squared distance as the current minimum.
2. For each remaining hospital, calculate the squared distance from the user's point.
3. Compare it with the current minimum distance.
4. If it is smaller, update the nearest hospital and the minimum.
5. If it is equal, keep the hospital with the smaller ID.
6. After all hospitals have been compared, report the nearest hospital and take the square root of the minimum squared distance as the actual distance.

## 16. Brute Force Pseudocode

```
ALGORITHM FindNearestHospital(userX, userY, H[0..n-1])
    nearest <- H[0]
    minSquared <- (userX - H[0].x)^2 + (userY - H[0].y)^2
    for i <- 1 to n - 1 do
        current <- H[i]
        d2 <- (userX - current.x)^2 + (userY - current.y)^2
        if d2 < minSquared then
            nearest <- current
            minSquared <- d2
        else if d2 = minSquared and current.id < nearest.id then
            nearest <- current
            minSquared <- d2
    return nearest, sqrt(minSquared)
```

## 17. Brute Force Complexity Analysis

- **Basic operation:** calculating one squared distance (2 subtractions, 2 multiplications, 1 addition) and one comparison.
- **Time complexity:** the loop runs n - 1 times (n distance calculations in total, where n is the active hospital count; 70 initially), so T(n) = n, which is **O(n)** in all cases (best, average and worst). There is no early exit.
- **Auxiliary space complexity:** only a few variables (`nearest`, `minSquared`, `d2`, loop counter) are used, so **O(1)**.
- **Comparison:** the general Closest-Pair brute force is O(n²); this adaptation is O(n) because only one query point is involved.
- *Implementation note:* the function also returns a `rows` array (one entry per hospital) so the interface can display the comparison table. This is display output; the algorithm itself does not need it. The auxiliary-space figure refers to the algorithm, not this display data.

## 18. Explanation of Interpolation Search

Interpolation Search (Chapter 4) searches a **sorted** array. Binary Search always probes the middle element. Interpolation Search instead **estimates** where the key should be by assuming the values grow roughly evenly, similar to how a person looks up a name near the end of a phone book by opening the book near the end. If the values are roughly uniformly distributed, the estimate is very close and the search finishes in very few steps.

## 19. Variable-Size-Decrease Concept

In **decrease-and-conquer** algorithms, a problem is reduced to a smaller instance of the same problem. In a **variable-size-decrease** algorithm, the amount by which the problem shrinks is not constant. In Interpolation Search the range `l..r` is reduced by an amount that depends on the key and on the array values (through the estimated position `x`). Binary Search, by comparison, always halves the range (decrease by a constant factor).

## 20. Lecture-Slide Interpolation Search Formula

```
x = l + floor( ((v - A[l]) * (r - l)) / (A[r] - A[l]) )
```

JavaScript used in `js/algorithms.js`:

```js
x = l + Math.floor(((v - A[l]) * (r - l)) / (A[r] - A[l]));
```

| Symbol | Meaning |
|---|---|
| `x` | estimated position |
| `l` | lower index of the current range |
| `r` | upper index of the current range |
| `v` | search key (the hospital ID being searched) |
| `A` | sorted array of hospital IDs |

## 21. Step-by-Step Interpolation Search Algorithm

1. Keep the hospital IDs sorted in ascending order (the dataset is stored sorted).
2. Set `l = 0` and `r = n - 1`.
3. While `l <= r` and `v` lies between `A[l]` and `A[r]`, calculate the estimated position `x` with the formula.
4. Compare `v` with `A[x]`.
5. If they are equal, the hospital is found; return it.
6. If `v < A[x]`, set `r = x - 1`.
7. If `v > A[x]`, set `l = x + 1`.
8. Repeat until the hospital is found or the search range becomes invalid. Then report Not Found.

**Special cases handled:**

- *Empty range:* the loop condition `l <= r` fails immediately, so Not Found is returned.
- *ID smaller than the minimum / greater than the maximum:* the condition `v >= A[l] and v <= A[r]` fails, so the formula is never evaluated and Not Found is returned.
- *Division by zero:* if `A[r] = A[l]` the denominator would be 0, so the code sets `x = l` instead of using the formula.
- *Invalid input:* rejected by `validateWholeNumber` before the search runs.

## 22. Interpolation Search Pseudocode

```
ALGORITHM InterpolationSearch(A[0..n-1], v)
    l <- 0
    r <- n - 1
    while l <= r and v >= A[l] and v <= A[r] do
        if A[r] = A[l] then
            x <- l
        else
            x <- l + floor( ((v - A[l]) * (r - l)) / (A[r] - A[l]) )
        if A[x] = v then
            return x
        else if v < A[x] then
            r <- x - 1
        else
            l <- x + 1
    return -1      // not found
```

## 23. Average and Worst-Case Complexity Analysis

- **Average case: O(log log n)**, assuming the IDs are approximately uniformly distributed. The baseline IDs are consecutive (101 to 170), which is a very uniform distribution; in that baseline the formula gives x = index of v exactly, so a stored ID is found in a single estimate. User-added IDs can introduce gaps, but the array remains sorted and the algorithm remains correct. (The actual probes are visible in the Search Steps table.)
- **Worst case: O(n)**, when the values are highly non-uniform (for example, growing exponentially), so each estimate only eliminates a single element.
- **Best case:** O(1), when the first estimate lands on the key.
- **Auxiliary space: O(1)** - only `l`, `r`, `x` and `v` are needed. The `steps` list recorded for display is extra output and is not part of the algorithm.
- **Precondition:** the array must be sorted. `hospitalStore.js` merges original and user-added records with a manual insertion sort before the ID array is built, so this precondition holds for the active dataset.

## 24. Input Validation Approach

Implemented in `js/validation.js` as `validateWholeNumber(rawText, label)`. The input fields are plain text fields (not `type="number"`) so that invalid characters can be typed and the program's own validation and messages can be demonstrated. Rules, applied in order:

1. Trim spaces; an empty result is rejected ("... is required.").
2. Any value containing `.` is rejected (decimals are not allowed).
3. The text must match `^-?[0-9]+$` (optional leading minus followed by digits only). This rejects letters, special characters, `+5`, `1e3` and a lone `-`.
4. The converted number must be a safe integer (`Number.isSafeInteger`).

Negative whole numbers (e.g. `-15`) are accepted as coordinates. The same function validates X, Y, search IDs and the fields in the add-hospital form. Coordinates have no upper or lower limit, so a point far from all hospitals is valid. A search ID that is not in the active dataset is valid input but produces a Not Found result. When adding a hospital, the ID must also be positive and unique; blank names and non-integer coordinates are rejected.

## 25. Test Cases and Actual Test Results

| Total tests | Passed | Failed |
|---:|---:|---:|
| 34 | 34 | 0 |

| Test Case ID | Category | Description | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| BF-01 | Brute Force | Exact coordinate match | (30, 40) | ID 103, distance 0.00 | ID 103, distance 0.00 | PASS |
| BF-02 | Brute Force | Nearest hospital | (52, 62) | ID 104, distance 2.83 | ID 104, distance 2.83 | PASS |
| BF-03 | Brute Force | Equal-distance tie (dataset) | (11, 19) | ID 101, distance 1.41 | ID 101, distance 1.41 | PASS |
| BF-04 | Brute Force | Equal-distance tie, larger ID listed first | (0, 0) with IDs 9 and 4 | ID 4, distance 5.00 | ID 4, distance 5.00 | PASS |
| BF-05 | Brute Force | Negative coordinates | (-5, -5) | ID 141, distance 16.55 | ID 141, distance 16.55 | PASS |
| BF-06 | Brute Force | Far away from all hospitals | (1000, 1000) | ID 144, distance 1285.52 | ID 144, distance 1285.52 | PASS |
| BF-07 | Brute Force | All hospitals are compared | (50, 50) | 70 comparisons | 70 comparisons | PASS |
| BF-08 | Brute Force | Empty hospital list | (1, 2) with no hospitals | null | null | PASS |
| BF-09 | Brute Force | Three-way tie, smallest ID wins | (0, 0) with IDs 9, 4 and 2 | ID 2, distance 5.00 | ID 2, distance 5.00 | PASS |
| IS-01 | Interpolation Search | First hospital ID | 101 | Found ID 101 (Jinnah Hospital) | Found ID 101 (Jinnah Hospital) | PASS |
| IS-02 | Interpolation Search | Last hospital ID | 170 | Found ID 170 (Malir Cantt Hospital) | Found ID 170 (Malir Cantt Hospital) | PASS |
| IS-03 | Interpolation Search | Existing middle ID | 135 | Found ID 135 (Nazimabad Care Hospital) | Found ID 135 (Nazimabad Care Hospital) | PASS |
| IS-04 | Interpolation Search | ID smaller than minimum | 100 | Not Found | Not Found | PASS |
| IS-05 | Interpolation Search | ID greater than maximum | 171 | Not Found | Not Found | PASS |
| IS-06 | Interpolation Search | Missing ID between existing IDs | 107 in [101, 105, 110, 120] | Not Found | Not Found | PASS |
| IS-07 | Interpolation Search | Existing ID in an array with gaps | 110 in [101, 105, 110, 120] | Found at index 2 | Found at index 2 | PASS |
| IS-08 | Interpolation Search | Single-element array (A[r] - A[l] = 0) | 105 in [105] | Found at index 0 | Found at index 0 | PASS |
| IS-09 | Interpolation Search | Empty array | 105 in [] | Not Found | Not Found | PASS |
| IS-10 | Interpolation Search | Every ID from 101 to 170 | 101 ... 170 | All 70 IDs found at correct index | All 70 IDs found at correct index | PASS |
| IS-11 | Interpolation Search | Single-element array, key absent | 101 in [105] | Not Found | Not Found | PASS |
| IS-12 | Interpolation Search | Key below minimum in an array with gaps | 100 in [101, 105, 110, 120] | Not Found | Not Found | PASS |
| VAL-01 | Validation | Empty input | (empty) | Invalid | Invalid | PASS |
| VAL-02 | Validation | Only spaces | (three spaces) | Invalid | Invalid | PASS |
| VAL-03 | Validation | Alphabetic input | abc | Invalid | Invalid | PASS |
| VAL-04 | Validation | Letters mixed with digits | 12abc | Invalid | Invalid | PASS |
| VAL-05 | Validation | Decimal coordinate | 12.5 | Invalid | Invalid | PASS |
| VAL-06 | Validation | Special characters | @#$ | Invalid | Invalid | PASS |
| VAL-07 | Validation | Plus sign | +5 | Invalid | Invalid | PASS |
| VAL-08 | Validation | Negative whole number | -15 | Valid (-15) | Valid (-15) | PASS |
| VAL-09 | Validation | Positive whole number | 42 | Valid (42) | Valid (42) | PASS |
| VAL-10 | Validation | Minus sign only | - | Invalid | Invalid | PASS |
| VAL-11 | Validation | Leading zeros | 007 | Valid (7) | Valid (7) | PASS |
| VAL-12 | Validation | Surrounding spaces are trimmed | (space)42(space) | Valid (42) | Valid (42) | PASS |
| VAL-13 | Validation | Exponent form | 1e3 | Invalid | Invalid | PASS |

The 34 rows above are the read-only original suite. They execute the real functions; expected values are written by hand and compared with the actual output. Full details are in `TEST_CASES.md`. The results above come from an actual run of `js/tests.js`.

### Custom tests

The Tests page additionally lets the user create tests that are not part of the fixed 34. Each custom test stores its type, input, expected output and a generated ID. `js/customTests.js` computes the actual output by calling the production `findNearestHospital` or `searchHospitalById` function and compares it with the expected text using exact equality. A wrong expected value therefore produces FAIL.

Custom tests are saved in `localStorage` (key `nhf.customTests.v1`) and survive a page refresh. The original 34 tests are frozen with `Object.freeze` and have no edit or delete controls, so they cannot be changed through the UI.

### Verification performed

| Check | Result |
|---|---|
| Original suite under Node.js | 34 / 34 PASS |
| Browser smoke test (original suite) | 34 / 34 PASS |
| Add custom Brute Force test through the UI | PASS |
| Add custom Interpolation Search test through the UI | PASS |
| Custom tests call the production algorithms | PASS |
| Correct expected output produces PASS | PASS |
| Incorrect expected output produces FAIL | PASS |
| Edit a custom test and rerun | PASS |
| Delete a custom test | PASS |
| Run original and custom tests separately | PASS |
| Run original and custom tests together | PASS |
| Original tests remain read-only and unchanged | PASS |
| Custom tests persist after refresh | PASS |
| Deletion persists after refresh | PASS |
| Brute Force step trace (70 actual steps) | PASS |
| Interpolation Search probe trace (actual l, r, x, A[x]) | PASS |
| Add hospital 171 (Ahmed Medical Center, 20, 30) through the UI | PASS |
| Reject duplicate IDs, non-positive IDs, blank names and decimal coordinates | PASS |
| Dynamic total, range and directory counts update after adding | PASS |
| Brute Force on the 71-hospital dataset finds ID 171 at distance 0.00 | PASS |
| Interpolation Search finds the added ID 171 | PASS |
| Custom tests execute against the active dataset and pass for hospital 171 | PASS |
| Added hospital persists after refresh | PASS |
| Light/dark theme toggles all surfaces and persists after refresh | PASS |
| Rounded button treatment is consistent | PASS |
| Desktop layout has no horizontal overflow and all controls render | PASS |
| Mobile layout has no horizontal overflow; cards, forms and navigation fit | PASS |

The interactive checks were run in headless Microsoft Edge through the Chrome DevTools Protocol against the final files: 23 custom-test feature checks, 7 execution-trace checks, 26 hospital/theme checks and 8 responsive-layout checks passed.

## 26. System Workflow

1. The browser loads `index.html`, which loads `js/app.js` as an ES module.
2. `app.js` imports the baseline dataset, hospital store, algorithms, validation, original tests and custom-test helpers, shows the Dashboard (or the view named in the URL hash), builds the directory table, loads saved custom tests and saved hospitals, applies the saved theme, and attaches event listeners.
3. **Nearest search:** form submit -> `validateWholeNumber` for X and Y -> if invalid, show an error message -> otherwise `findNearestHospital` on the active dataset -> display result card, distance trace and success message.
4. **ID search:** form submit -> `validateWholeNumber` -> if invalid, show an error -> otherwise `searchHospitalById` on the active dataset (builds the sorted ID array and calls `interpolationSearch`) -> display Found / Not Found, details and probe steps.
5. **Add hospital:** form submit -> validate ID, name, X and Y -> `createAddedHospital` rejects duplicates and invalid values -> append and sort the added record -> rebuild the active dataset -> save to localStorage -> refresh dashboard and directory counts -> clear stale search/nearest results -> show success or storage warning.
6. **Navigation:** clicking a navigation button or dashboard card shows one view and hides the others.
7. **Theme:** the head script applies the saved theme before CSS paints; the header toggle switches light/dark, updates the label and theme-color, and saves the choice.
8. **Custom test add:** form submit -> validate type-specific inputs and expected output -> build the test record -> append it -> `saveCustomTests` writes the array to localStorage -> rerun all tests against the active dataset -> show a success or storage warning message.
9. **Custom test edit:** clicking Edit loads the record into the form and changes the button to Update Test; submitting replaces the same record while keeping its ID and creation time. **Delete** removes the record after confirmation. Both actions save and rerun the tests.
10. **Test runs:** `runOriginalOnly`, `runCustomOnly` and `runEverything` call the original suite and/or the custom runner, rerender both tables, and update the summary. The Tests view runs everything when first opened.
11. **Persistence:** on every page load, `loadCustomTests` reads `nhf.customTests.v1`, `loadAddedHospitals` reads `nhf.addedHospitals.v1`, and the theme script reads `nhf.theme.v1`. Malformed, duplicate or original-colliding stored hospitals are filtered out before rendering.

## 27. Implementation Details for Each Project File

| File | Responsibility |
|---|---|
| `index.html` | Page structure: header navigation, six view sections, forms, tables, footer; loads `css/style.css` and `js/app.js` (module). |
| `css/style.css` | Responsive medical-dashboard design with CSS variables for light and dark themes, gradient page background, rounded cards/buttons, accessible focus states, sticky table headers, and tablet/mobile breakpoints. |
| `js/hospitals.js` | Exports `HOSPITALS`, the 70 explicit baseline records sorted by ID. |
| `js/hospitalStore.js` | Exports `ADDED_HOSPITALS_STORAGE_KEY`, `isValidAddedHospital`, `loadAddedHospitals`, `saveAddedHospitals`, `mergeHospitals`, `sortHospitalsById` and `createAddedHospital`. Validates added records, removes duplicates/collisions, sorts by ID, and merges baseline and added records. |
| `js/algorithms.js` | Exports `squaredDistance`, `findNearestHospital` (Brute Force), `interpolationSearch` (works on any sorted array) and `searchHospitalById`. Both query functions accept an optional active hospital array. No UI code. |
| `js/validation.js` | Exports `validateWholeNumber`. |
| `js/tests.js` | Exports `runAllTests` and `ORIGINAL_TEST_COUNT`; runs the 34 read-only original tests and returns totals plus individual results. The test list and every case are frozen. |
| `js/customTests.js` | Exports `CUSTOM_TEST_TYPES`, `STORAGE_KEY`, `isValidCustomTest`, `loadCustomTests`, `saveCustomTests`, `createCustomTestId`, `formatCustomInput`, `describeCustomActual`, `runCustomTest` and `runCustomTests`. Accepts the active hospital array so custom tests include user additions. |
| `js/app.js` | Navigation, theme handling, hospital management, all forms, custom-test management, rendering of results/tables/traces/messages, and the three test-run modes. Calls the other modules; contains no algorithm logic. |
| `README.md` | Overview and Live Server instructions. |
| `TEST_CASES.md` | Test documentation with recorded results. |
| `PROJECT_REPORT.md` | This file. |

No built-in sorting or searching methods (`sort`, `find`, `indexOf`, etc.) and no built-in nearest-neighbour methods are used to implement the two required algorithms.

## 28. UI Design Description

- The interface is a responsive medical dashboard with a light clinical palette and a matching dark theme.
- A translucent sticky header contains the brand mark, six navigation pills and a theme toggle. The active navigation item is highlighted and marked with `aria-current="page"`.
- CSS variables control every surface, border, text, accent, status colour and shadow, so switching `data-theme` restyles the entire application rather than only the text.
- Cards use generous spacing, rounded corners and layered shadows. Statistics use large accent numbers and subtle decorative circles.
- Buttons consistently use a fully rounded pill shape with hover, active, focus-visible and disabled-safe styles. Primary, secondary and danger variants share the same geometry.
- The Directory has an add-hospital card with labelled fields, a primary submit button, and a dedicated success/error message area.
- Tables use uppercase column headers, sticky header cells, row hover feedback and contained scrolling on narrow screens.
- The Tests page keeps its builder card, three run buttons, read-only badge on the original results, and small rounded Edit/Delete actions for custom rows.
- Responsive behaviour: the header stacks, navigation becomes horizontally scrollable, statistics/action cards become one column, form fields and primary buttons fill the width, and tables scroll inside their wrappers.
- Motion is limited to short colour/transform transitions and is disabled when the user prefers reduced motion.

## 29. Project Limitations and Assumptions

- Coordinates are fictional Cartesian values, not real geographical coordinates; distances are in abstract "units".
- The 70 baseline records are fixed in `js/hospitals.js`; users can add records but cannot edit or delete them from the UI.
- Names for IDs 116-170 are invented sample records.
- Only whole-number input is accepted.
- The 70 baseline IDs are consecutive, so Interpolation Search performs in its best-behaved case; user-added IDs may introduce gaps. The worst case O(n) is explained theoretically but not demonstrated by this dataset.
- Input fields have no upper or lower coordinate limit.
- Custom tests, added hospitals and the theme choice are stored in `localStorage`, which is per browser, per device and per origin. They are not shared between browsers, users or devices, and they can be lost if browser storage is cleared.
- Search results and original test results are not stored between sessions. Only custom test definitions, added hospitals and the theme choice are persisted.
- Custom expected output uses exact text matching, so a correct result written with different spacing or wording is reported as FAIL by design.
- Brute Force is used by design (Chapter 3); faster spatial structures are outside the scope of the project.
- The UI, hospital-management, theme and custom-test features were checked in headless Microsoft Edge through the Chrome DevTools Protocol (navigation, forms, messages, add / edit / delete, duplicate and invalid input, dynamic counts, separate and combined runs, persistence after refresh, PASS / FAIL behaviour, theme contrast, rounded buttons, and both execution traces). It was not checked on physical devices or browsers other than Edge.

## 30. Conclusion

The project implements a complete, working application that applies Brute Force (Chapter 3) to a nearest-point problem and Interpolation Search (Chapter 4) to an ID search, with the Closest-Pair idea adapted to one query point against n hospitals (O(n) instead of O(n²)). Both algorithms are implemented manually, kept separate from the interface, and documented with their complexity analysis. The baseline dataset can be extended from the Hospital Directory; additions are validated, merged into sorted order, and saved in localStorage so both algorithms and custom tests use the active dataset immediately. The 34 original tests are frozen and read-only, while users can add, view, edit and delete their own Brute Force and Interpolation Search tests. The interface includes a persistent light/dark theme, a responsive medical-dashboard redesign, and consistent rounded controls. Both algorithms expose their actual execution steps in the UI. The original suite passes 34/34 under Node.js and in a browser smoke test, and all custom-test, execution-trace, hospital-management and theme checks passed in headless Edge.

## 31. Custom Test Builder, Execution and Persistence

### Data model

A custom test is a plain object stored in a JSON array. A Brute Force record has this shape:

```json
{
  "id": "CUS-mwday5c3-fox",
  "type": "nearest",
  "x": 30,
  "y": 40,
  "expected": "ID 103, distance 0.00",
  "createdAt": "2026-11-12T00:00:00.000Z"
}
```

An Interpolation Search record uses `"type": "search"` and a `key` instead of `x` and `y`. IDs are generated by `createCustomTestId`, which combines a timestamp and a random suffix and checks for collisions.

### Add, edit and delete

- The custom form has a type selector. Choosing Brute Force shows X and Y fields; choosing Interpolation Search shows the hospital ID field.
- Inputs are validated with the same `validateWholeNumber` function used by the main forms, and the expected output is required.
- **Add** appends a new record and immediately reruns all tests so the new PASS/FAIL status is visible.
- **Edit** loads the record into the form, keeps its ID and `createdAt`, and replaces the record in place.
- **Delete** asks for confirmation, removes the record from the array, saves, and reruns the tests.
- Every change is written with `saveCustomTests`. If localStorage is unavailable (for example, storage is blocked), the UI keeps the change in memory and warns that it will be lost on refresh.

### Execution against production algorithms

`describeCustomActual(test)` calls the real production functions:

- Brute Force: `findNearestHospital(test.x, test.y)` and formats `ID <id>, distance <d>`.
- Interpolation Search: `searchHospitalById(test.key)` and formats `Found ID <id> (<name>)` or `Not Found`.

`runCustomTest` compares this actual text with the stored expected text using strict equality. There is no separate or simplified algorithm for custom tests.

### Persistence

- Storage key: `nhf.customTests.v1`.
- `loadCustomTests` reads the key, parses the JSON array and filters out records that fail `isValidCustomTest` (wrong type, missing ID, non-integer coordinates, empty expected output).
- `saveCustomTests` serializes the whole array after every add, edit or delete.
- The tests were refreshed in the browser after adding and deleting records; both the records and their absence persisted.

### Protection of the original suite

`js/tests.js` freezes every original test object and the containing array with `Object.freeze`. The original results table has no edit or delete controls. All modification actions operate only on the separate `customTests` array, so the 34 original tests remain unchanged.

### Run modes

- **Run Original Tests:** runs only the frozen 34 and sets the summary to 34 / passed / failed.
- **Run Custom Tests:** runs only saved custom tests and sets the summary to the custom total.
- **Run All Tests:** runs both and sets the summary to the combined total. The message distinguishes original and custom counts.

## 32. Execution-Step Visualizations

The application displays traces produced during the real executions, not separate animations.

- **Brute Force trace:** `findNearestHospital` records one row for every hospital compared, in comparison order, including the computed squared distance. The nearest-view table shows these rows with a Step column from 1 to 70, the hospital details, squared distance and actual distance, and highlights the winning row. For the query (52, 62), the trace contains 70 steps and the highlighted row is step 4, hospital 104, squared distance 8, distance 2.83.
- **Interpolation Search trace:** `interpolationSearch` records `{l, r, x, value}` before each probe. The search-view table renders these actual probes. For ID 135 in the 101-170 dataset, the recorded trace is one row: step 1, l = 0, r = 69, x = 34, A[x] = 135.

## 33. Requirement Coverage Verification

| Requirement | Status | Evidence |
|---|---|---|
| 1. Add test cases through the UI | Implemented and verified | Custom test form; add checks passed in headless Edge |
| 2. View, edit and delete additional tests | Implemented and verified | Custom results table with Edit / Delete; edit and delete checks passed |
| 3. Save additional tests with localStorage or IndexedDB | Implemented and verified | `nhf.customTests.v1`; persistence after refresh passed |
| 4. Additional Brute Force tests run the production algorithm | Implemented and verified | `customTests.js` calls `findNearestHospital`; actual output matched |
| 5. Additional Interpolation Search tests run the production algorithm | Implemented and verified | `customTests.js` calls `searchHospitalById`; actual output matched |
| 6. Incorrect expected output produces FAIL | Implemented and verified | Deliberately wrong expected value produced FAIL before correction |
| 7. Original and additional tests run separately and together | Implemented and verified | Three run buttons; separate 34 / 2 and combined 36 totals passed |
| 8. Original tests protected and unchanged | Implemented and verified | Frozen objects and array; 34 rows; no edit/delete controls |
| 9. Visualizations show actual execution steps | Implemented and verified | 70-step Brute Force trace; real Interpolation Search probes |
| 10. Report documents every implemented feature accurately | Implemented and verified | This updated report; README and TEST_CASES also updated |

## 34. Dynamic Hospital Management and Theme Persistence

### Added-hospital data model

Only user-added hospitals are stored in localStorage, not the 70 baseline records. A stored record has this shape:

```json
{
  "id": 171,
  "name": "Ahmed Medical Center",
  "x": 20,
  "y": 30,
  "type": "added"
}
```

Storage key: `nhf.addedHospitals.v1`.

### Validation and merge rules

- `loadAddedHospitals` parses the stored array and filters out malformed records, non-positive IDs, duplicate IDs, and IDs that collide with a baseline hospital.
- `createAddedHospital` trims the name, requires 1-80 characters, requires integer X/Y coordinates, requires a positive integer ID, and rejects any ID already present in the active dataset.
- `sortHospitalsById` uses a manual insertion sort, keeping the ID array sorted for Interpolation Search without relying on built-in sorting methods.
- `mergeHospitals` copies the baseline records, appends added records and returns the manually sorted active dataset. The algorithms and custom runner receive this array explicitly.
- Adding a hospital refreshes the dashboard totals, ID range, directory table, search range label and all custom-test results; stale nearest/search output is cleared.

### Verified added-hospital example

The UI was tested with the record **ID 171, Ahmed Medical Center, (20, 30)**:

- Directory count changed from 70 to 71 and the ID range changed to **101 - 171**.
- Brute Force returned **ID 171, distance 0.00** after comparing all 71 active hospitals.
- Interpolation Search returned **Found ID 171 (Ahmed Medical Center)** with the real probe trace.
- Custom Brute Force and Interpolation Search tests for hospital 171 both passed (36/36 combined tests).
- The record survived a page refresh, and a second attempt to add ID 171 was rejected as a duplicate.

### Theme system

- The `<head>` contains a small pre-paint script that reads `nhf.theme.v1`. If no choice is saved, it follows the operating system preference.
- The chosen theme is written to the root element as `data-theme="light"` or `data-theme="dark"`.
- CSS variables define the background, surfaces, borders, text, accents, status colours and shadows for both themes. Because all components consume those variables, the whole interface updates, including cards, forms, tables, badges, messages and the header.
- The header toggle updates the accessible label, `aria-pressed`, visible icon and theme-color metadata, then stores the new choice.
- Verification confirmed that dark mode uses dark body/card/navigation surfaces (not merely dark text), that the choice survives refresh, that switching back to light persists, and that primary buttons, secondary buttons, danger buttons and the theme toggle all share the same rounded pill geometry.

### Verification summary

The new feature harness passed **26/26 checks**: initial 70-record state, invalid and duplicate rejection, add hospital 171, dynamic counts/range, localStorage persistence, Brute Force and Interpolation Search over 71 records, active-dataset custom tests, dark-theme surfaces, persistent dark/light choices, refresh persistence and consistent rounded buttons. A separate layout harness passed **8/8 checks** for desktop and 390 px mobile widths, including no horizontal page overflow, one-column mobile cards, contained navigation and fitting form controls. The pre-existing 23 custom-test checks and 7 trace checks also passed unchanged.

## 35. Future Enhancements

*The following are ideas only. None of them are implemented in the current version.*

- Store hospital records in a database (for example Supabase) instead of a fixed JavaScript file plus localStorage; the algorithm functions already accept a hospitals array, which would make this easier.
- Add edit and delete controls for user-added hospital records.
- Show the points on a simple 2D grid or chart.
- Return the k nearest hospitals.
- Add a larger or non-uniform dataset to demonstrate the O(n) worst case of Interpolation Search.
- Use real map coordinates and geographical distance formulas.
