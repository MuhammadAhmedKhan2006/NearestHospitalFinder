# Nearest Hospital Finder

**Course:** CT-363 Design and Analysis of Algorithms (DAA) - university project

A small web application that stores 70 fictional hospitals on a 2D grid and demonstrates two algorithms:

- **Brute Force (Chapter 3)** - finds the hospital nearest to a user-entered point.
- **Interpolation Search (Chapter 4)** - finds a hospital by its ID.

> All coordinates are **fictional Cartesian coordinates** for academic testing. They are not real geographical locations.
> The 55 hospitals with IDs 116 to 170 are **fictional sample hospitals** added for this project.

## Technology

HTML5, CSS3 and vanilla JavaScript (ES6 modules). No frameworks, libraries, external APIs, database or Supabase. No installation or build step.

## How to Run (VS Code Live Server)

JavaScript ES modules do not work when `index.html` is opened by double-clicking (`file://`), so use a local server:

1. Extract `nearest-hospital-finder.zip`.
2. Open VS Code, then **File > Open Folder** and select the `nearest-hospital-finder` folder.
3. Install the **Live Server** extension (by Ritwick Dey) if you do not have it.
4. Right-click `index.html` and choose **Open with Live Server** (or click **Go Live** in the status bar).
5. The app opens in your browser, normally at `http://127.0.0.1:5500/`.

## Features

| Page | What it does |
|---|---|
| Dashboard | Title, introduction, total hospital counter (70), ID range, navigation cards |
| Find Nearest Hospital | Enter X and Y, runs Brute Force, shows the nearest hospital and a full distance table with the nearest row highlighted |
| Search by ID | Enter an ID, runs Interpolation Search, shows Found / Not Found, details and the search steps |
| Hospital Directory | All 70 hospitals in ascending ID order |
| Algorithms | Explanation of Brute Force, Closest-Pair adaptation, Euclidean distance, Interpolation Search, Variable-Size-Decrease, and complexity analysis |
| Tests | Runs 27 executable tests and shows totals and individual PASS/FAIL results |

## Input Rules

Coordinates and IDs must be **whole numbers**. A leading minus sign is allowed (e.g. `-5`). Empty values, letters, decimals (`12.5`), special characters, `+5` and `1e3` are rejected with an error message.

## Folder Structure

```text
nearest-hospital-finder/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── hospitals.js     (70 hospital records)
│   ├── algorithms.js    (Brute Force + Interpolation Search)
│   ├── validation.js    (input validation)
│   ├── tests.js         (executable tests)
│   └── app.js           (UI and event handling)
├── README.md
├── TEST_CASES.md
└── PROJECT_REPORT.md
```

## Algorithms in Brief

- **Brute Force:** compares the squared Euclidean distance `d² = (x1-x2)² + (y1-y2)²` against all n hospitals. The square root is taken only to display the final distance. Ties go to the smaller ID. Time O(n), auxiliary space O(1).
- **Interpolation Search:** `x = l + ⌊((v - A[l]) × (r - l)) / (A[r] - A[l])⌋`, with `A` = sorted ID array, `l` = lower index, `r` = upper index, `v` = search key, `x` = estimated position. Average O(log log n) for roughly uniform IDs, worst case O(n).

## Documentation

- `TEST_CASES.md` - all test cases and their recorded results.
- `PROJECT_REPORT.md` - detailed project documentation for writing the formal university report.
