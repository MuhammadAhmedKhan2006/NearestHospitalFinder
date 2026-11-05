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

Nearest Hospital Finder is a browser-based application that stores a fixed list of 70 hospitals. Each hospital has an ID, a name and an (X, Y) position on a fictional 2D grid. The user can:

1. enter a point (X, Y) and find the nearest hospital using a **Brute Force** algorithm, and
2. enter a hospital ID and find that hospital using **Interpolation Search**.

The project demonstrates, in a simple and visible way, how these two algorithms work, how their complexity is analysed, and how they can be tested with executable test cases.

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
6. Present the work in a simple, clean, responsive web interface.

## 5. Project Scope

**In scope:** 70 predefined hospitals (IDs 101-170); nearest-hospital search by coordinates; search by ID; hospital directory; algorithm explanations; complexity analysis; input validation; executable tests; responsive layout; documentation.

**Out of scope:** real maps or real coordinates; adding, editing or deleting hospitals; user accounts; databases or Supabase; external APIs; saving results between sessions.

## 6. Functional Requirements

| No. | Requirement | Where implemented |
|---|---|---|
| FR1 | Dashboard with title, introduction, overview and navigation | Dashboard view |
| FR2 | Show total hospital count (70) | Dashboard `Total Hospitals` card |
| FR3 | Accept user X and Y through input fields | Find Nearest Hospital view |
| FR4 | Brute Force nearest search over all 70 hospitals | `findNearestHospital` |
| FR5 | Show nearest hospital name, ID, coordinates, actual distance | Nearest result card |
| FR6 | Distance comparison table with nearest row highlighted | Nearest view table |
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

## 7. Non-Functional Requirements

- **Simplicity:** beginner-friendly, readable code that can be explained in a viva.
- **Portability:** runs in a modern browser through VS Code Live Server; no installation or build step.
- **Correctness:** algorithms follow the lecture/textbook definitions; tests run real functions.
- **Usability:** clear labels, clear error and success messages, minimal layout.
- **Responsiveness:** usable on desktop, tablet and mobile screen widths.
- **Maintainability:** algorithms, validation, data, tests and UI code are in separate files.

## 8. Technology Stack

- HTML5, CSS3, vanilla JavaScript (ES6) using ES modules (`import` / `export`).
- Runs with VS Code Live Server (ES modules need an http server, not `file://`).
- Not used: React, TypeScript, Node.js in the project, frameworks, external APIs, databases, Supabase.

## 9. System Features and Descriptions

1. **Dashboard** - introduction, hospital counter (70), ID range (101 - 170), and cards that open each feature.
2. **Find Nearest Hospital** - two text inputs (X, Y). On submit the inputs are validated, Brute Force runs, and the result card and a 70-row distance table are shown. The nearest row is highlighted and carries a "Nearest" badge.
3. **Search by ID** - one text input. On submit the ID is validated and Interpolation Search runs. The result shows a Found / Not Found status, ID, name, X and Y. A "Search Steps" table shows each estimate (l, r, x, A[x]).
4. **Hospital Directory** - a table of all 70 hospitals sorted by ID, with a column saying whether each is an original record or a fictional sample hospital.
5. **Algorithms** - explanations of Brute Force, Euclidean distance, Closest-Pair adaptation, Interpolation Search, Variable-Size-Decrease, and a complexity table.
6. **Tests** - runs 27 executable tests, shows total / passed / failed counts and a table of individual results.
7. **Messages** - green success messages, red error messages (invalid input, ID not found).

## 10. Complete Folder Structure

```text
nearest-hospital-finder/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── hospitals.js
│   ├── algorithms.js
│   ├── validation.js
│   ├── tests.js
│   └── app.js
├── README.md
├── TEST_CASES.md
└── PROJECT_REPORT.md
```

## 11. Hospital Dataset Description and All 70 Records

- Exactly **70 hospitals**, IDs **101 to 170**, sequential and sorted in ascending order. Because the IDs are consecutive, they are perfectly evenly spread, which is the best case for Interpolation Search.
- Each record has: unique integer `id`, `name`, integer `x`, integer `y`, and a `type` field (`original` or `sample`).
- IDs 101-115 are the **15 original records** supplied with the project brief and are unchanged.
- IDs 116-170 are **55 fictional sample hospitals**. The names are invented, use Karachi-style area names where practical, and do not refer to real institutions. They are identified in the directory as "Fictional sample hospital".
- All records are written explicitly in `js/hospitals.js`. No random data generation is used.
- All coordinates are fictional Cartesian values (range 2-100), not geographical coordinates. All 70 coordinate pairs are distinct.

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
- **Time complexity:** the loop runs n - 1 times (n distance calculations in total, n = 70), so T(n) = n, which is **O(n)** in all cases (best, average and worst). There is no early exit.
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

- **Average case: O(log log n)**, assuming the IDs are approximately uniformly distributed. The dataset IDs are consecutive (101 to 170), which is a very uniform distribution. In this dataset the formula gives x = index of v exactly, so a stored ID is found in a single estimate. (This is a property of this specific dataset and is visible in the Search Steps table.)
- **Worst case: O(n)**, when the values are highly non-uniform (for example, growing exponentially), so each estimate only eliminates a single element.
- **Best case:** O(1), when the first estimate lands on the key.
- **Auxiliary space: O(1)** - only `l`, `r`, `x` and `v` are needed. The `steps` list recorded for display is extra output and is not part of the algorithm.
- **Precondition:** the array must be sorted. Sorting is not performed by the program because the dataset is stored in ascending order.

## 24. Input Validation Approach

Implemented in `js/validation.js` as `validateWholeNumber(rawText, label)`. The input fields are plain text fields (not `type="number"`) so that invalid characters can be typed and the program's own validation and messages can be demonstrated. Rules, applied in order:

1. Trim spaces; an empty result is rejected ("... is required.").
2. Any value containing `.` is rejected (decimals are not allowed).
3. The text must match `^-?[0-9]+$` (optional leading minus followed by digits only). This rejects letters, special characters, `+5`, `1e3` and a lone `-`.
4. The converted number must be a safe integer (`Number.isSafeInteger`).

Negative whole numbers (e.g. `-15`) are accepted as coordinates. The same function validates X, Y and the hospital ID. Coordinates have no upper or lower limit, so a point far from all hospitals is valid. An ID outside 101-170 is valid input but produces a Not Found result.

## 25. Test Cases and Actual Test Results

| Total tests | Passed | Failed |
|---:|---:|---:|
| 27 | 27 | 0 |

| Test Case ID | Category | Description | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| BF-01 | Brute Force | Exact coordinate match | (30, 40) | ID 103, distance 0.00 | ID 103, distance 0.00 | PASS |
| BF-02 | Brute Force | Nearest hospital | (52, 62) | ID 104, distance 2.83 | ID 104, distance 2.83 | PASS |
| BF-03 | Brute Force | Equal-distance tie (dataset) | (11, 19) | ID 101, distance 1.41 | ID 101, distance 1.41 | PASS |
| BF-04 | Brute Force | Equal-distance tie, larger ID listed first | (0, 0) with IDs 9 and 4 | ID 4, distance 5.00 | ID 4, distance 5.00 | PASS |
| BF-05 | Brute Force | Negative coordinates | (-5, -5) | ID 141, distance 16.55 | ID 141, distance 16.55 | PASS |
| BF-06 | Brute Force | Far away from all hospitals | (1000, 1000) | ID 144, distance 1285.52 | ID 144, distance 1285.52 | PASS |
| BF-07 | Brute Force | All hospitals are compared | (50, 50) | 70 comparisons | 70 comparisons | PASS |
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
| VAL-01 | Validation | Empty input | (empty) | Invalid | Invalid | PASS |
| VAL-02 | Validation | Only spaces | (three spaces) | Invalid | Invalid | PASS |
| VAL-03 | Validation | Alphabetic input | abc | Invalid | Invalid | PASS |
| VAL-04 | Validation | Letters mixed with digits | 12abc | Invalid | Invalid | PASS |
| VAL-05 | Validation | Decimal coordinate | 12.5 | Invalid | Invalid | PASS |
| VAL-06 | Validation | Special characters | @#$ | Invalid | Invalid | PASS |
| VAL-07 | Validation | Plus sign / exponent form | +5 | Invalid | Invalid | PASS |
| VAL-08 | Validation | Negative whole number | -15 | Valid (-15) | Valid (-15) | PASS |
| VAL-09 | Validation | Positive whole number | 42 | Valid (42) | Valid (42) | PASS |
| VAL-10 | Validation | Minus sign only | - | Invalid | Invalid | PASS |

The tests execute the real functions; expected values are written by hand and compared with the actual output. Full details are in `TEST_CASES.md`. The results above come from an actual run of `js/tests.js`.

## 26. System Workflow

1. The browser loads `index.html`, which loads `js/app.js` as an ES module.
2. `app.js` imports the dataset, algorithms, validation and tests, shows the Dashboard (or the view named in the URL hash), builds the directory table, and attaches event listeners.
3. **Nearest search:** form submit -> `validateWholeNumber` for X and Y -> if invalid, show an error message -> otherwise `findNearestHospital` -> display result card, distance table and success message.
4. **ID search:** form submit -> `validateWholeNumber` -> if invalid, show an error -> otherwise `searchHospitalById` (builds the ID array and calls `interpolationSearch`) -> display Found / Not Found, details and steps.
5. **Navigation:** clicking a navigation button or dashboard card shows one view and hides the others.
6. **Tests:** `runAllTests` runs when the Tests view first opens and on every click of "Run All Tests".

## 27. Implementation Details for Each Project File

| File | Responsibility |
|---|---|
| `index.html` | Page structure: header navigation, six view sections, forms, tables, footer; loads `css/style.css` and `js/app.js` (module). |
| `css/style.css` | Minimal white theme: white background, soft blue and teal accents, grey borders, light card shadows; responsive rules for tablet (900px) and mobile (600px); tables scroll horizontally inside a wrapper. |
| `js/hospitals.js` | Exports `HOSPITALS`, the 70 explicit records sorted by ID. |
| `js/algorithms.js` | Exports `squaredDistance`, `findNearestHospital` (Brute Force), `interpolationSearch` (works on any sorted array) and `searchHospitalById`. No UI code. |
| `js/validation.js` | Exports `validateWholeNumber`. |
| `js/tests.js` | Exports `runAllTests`, which runs 27 tests and returns totals plus individual results. |
| `js/app.js` | Navigation, form handling, rendering of results/tables/messages. Calls the other modules; contains no algorithm logic. |
| `README.md` | Overview and Live Server instructions. |
| `TEST_CASES.md` | Test documentation with recorded results. |
| `PROJECT_REPORT.md` | This file. |

No built-in sorting or searching methods (`sort`, `find`, `indexOf`, etc.) and no built-in nearest-neighbour methods are used to implement the two required algorithms.

## 28. UI Design Description

- White page background, dark readable text, subtle grey borders, white cards with very light shadows.
- Soft blue used for the active navigation item and information highlights; teal used for buttons, key numbers and the highlighted nearest row.
- Green and red are used only for success and error / Not Found messages and PASS / FAIL badges.
- Six-item navigation bar at the top; the active item is highlighted.
- Tables sit in scrollable wrappers so they do not break the layout on small screens.
- Responsive: the statistics grid becomes one column on mobile, inputs and buttons become full width, and the navigation wraps.
- No dark theme, no heavy gradients, and no animations.

## 29. Project Limitations and Assumptions

- Coordinates are fictional Cartesian values, not real geographical coordinates; distances are in abstract "units".
- Hospital data is fixed in `js/hospitals.js`; the user cannot add or edit records.
- Names for IDs 116-170 are invented sample records.
- Only whole-number input is accepted.
- The dataset IDs are consecutive, so Interpolation Search performs in its best-behaved case; the worst case O(n) is explained theoretically but not demonstrated by this dataset.
- Input fields have no upper or lower coordinate limit.
- Nothing is stored between sessions.
- Brute Force is used by design (Chapter 3); faster spatial structures are outside the scope of the project.
- The UI was checked by running it in a headless Chromium browser (navigation, forms, messages, tests page, and absence of horizontal scrolling at mobile and tablet widths). It was not checked on physical devices or other browsers.

## 30. Conclusion

The project implements a complete, working application that applies Brute Force (Chapter 3) to a nearest-point problem and Interpolation Search (Chapter 4) to an ID search, with the Closest-Pair idea adapted to one query point against n hospitals (O(n) instead of O(n²)). Both algorithms are implemented manually, kept separate from the interface, validated against 27 executable tests, and documented with their complexity analysis.

## 31. Future Enhancements

*The following are ideas only. None of them are implemented in the current version.*

- Store hospital records in a database (for example Supabase) instead of a fixed JavaScript file; the algorithm functions already accept a hospitals array, which would make this easier.
- Add, edit and delete hospital records.
- Show the points on a simple 2D grid or chart.
- Return the k nearest hospitals.
- Add a larger or non-uniform dataset to demonstrate the O(n) worst case of Interpolation Search.
- Use real map coordinates and geographical distance formulas.
