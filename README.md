# Nearest Hospital Finder

**Course:** CT-363 Design and Analysis of Algorithms (DAA) - university project

A responsive web application that starts with 70 fictional hospitals on a 2D grid and demonstrates two algorithms:

- **Brute Force (Chapter 3)** - finds the hospital nearest to a user-entered point.
- **Interpolation Search (Chapter 4)** - finds a hospital by its ID.

You can add hospitals from the Hospital Directory. Added records are validated, stored in the browser, and immediately included in both algorithms and in custom tests. The interface supports a persistent light/dark theme.

> All coordinates are **fictional Cartesian coordinates** for academic testing. They are not real geographical locations.
> The 55 hospitals with IDs 116 to 170 are **fictional sample hospitals** added for this project. Hospitals added through the UI are marked as user-added records.

## Technology

HTML5, CSS3 and vanilla JavaScript (ES6 modules). No frameworks, libraries, external APIs, database or Supabase. No installation or build step. The browser's `localStorage` stores custom tests, user-added hospitals and the selected theme.

## How to Run (VS Code Live Server)

JavaScript ES modules do not work when `index.html` is opened by double-clicking (`file://`), so use a local server:

1. Extract the project archive (if you received one).
2. Open VS Code, then **File > Open Folder** and select the `NearestHospitalFinder` folder.
3. Install the **Live Server** extension (by Ritwick Dey) if you do not have it.
4. Right-click `index.html` and choose **Open with Live Server** (or click **Go Live** in the status bar).
5. The app opens in your browser, normally at `http://127.0.0.1:5500/`.

Alternatively, from the project folder run `python -m http.server 5500 --bind 127.0.0.1` and open `http://127.0.0.1:5500/`.

## Features

| Page | What it does |
|---|---|
| Dashboard | Introduction, dynamic total hospital count, ID range, user-added count, and navigation cards |
| Find Nearest Hospital | Enter X and Y; runs Brute Force over the active dataset and shows the nearest hospital plus the actual distance trace with the nearest row highlighted |
| Search by ID | Enter an ID; runs Interpolation Search and shows Found / Not Found, details and the actual probe steps (`l`, `r`, `x`, `A[x]`) |
| Hospital Directory | All active hospitals in ascending ID order, plus a validated Add New Hospital form |
| Algorithms | Explanation of Brute Force, Closest-Pair adaptation, Euclidean distance, Interpolation Search, Variable-Size-Decrease, and complexity analysis |
| Tests | Runs the 34 read-only original tests, user-saved custom tests, or both; custom tests use the active dataset including added hospitals |

The header includes a **Light mode / Dark mode** toggle. The choice applies immediately, restyles every component, and persists after refresh.

## Input Rules

Coordinates and IDs must be **whole numbers**. A leading minus sign is allowed for coordinates (e.g. `-5`). Empty values, letters, decimals (`12.5`), special characters, `+5` and `1e3` are rejected with an error message.

When adding a hospital:

- the ID must be a **positive whole number** and must not duplicate any active hospital;
- the name is required and limited to 80 characters;
- X and Y must be whole numbers (negative coordinates are allowed).

## Adding Hospitals

Open **Hospital Directory** and use the **Add New Hospital** form. For example:

| ID | Name | X | Y |
|---:|---|---:|---:|
| 171 | Ahmed Medical Center | 20 | 30 |

After adding, the dashboard total becomes 71, the directory and search range update, and both algorithms use the new record. A Brute Force query at `(20, 30)` returns `ID 171, distance 0.00`; Interpolation Search for `171` returns `Found ID 171 (Ahmed Medical Center)`. Added hospitals are saved under the localStorage key `nhf.addedHospitals.v1`.

## Folder Structure

```text
NearestHospitalFinder/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── hospitals.js     (70 baseline hospital records)
│   ├── hospitalStore.js (added-hospital validation, merge and localStorage)
│   ├── algorithms.js    (Brute Force + Interpolation Search)
│   ├── validation.js    (input validation)
│   ├── tests.js         (34 read-only original tests)
│   ├── customTests.js   (custom test storage and execution)
│   └── app.js           (UI, theme and event handling)
├── README.md
├── TEST_CASES.md
└── PROJECT_REPORT.md
```

## Custom Tests

The Tests page lets you add, view, edit and delete your own test cases. Each custom test is either:

- **Brute Force** - enter X and Y; the actual output is produced by the real `findNearestHospital` function, for example `ID 103, distance 0.00`.
- **Interpolation Search** - enter a hospital ID; the actual output is produced by the real `searchHospitalById` function, for example `Found ID 135 (Nazimabad Care Hospital)` or `Not Found`.

Expected output is compared with the actual output exactly. An incorrect expected value therefore produces **FAIL**. Custom tests are saved in `localStorage` under `nhf.customTests.v1`, so they survive a page refresh in the same browser. They execute against the active dataset, so a test can target a user-added hospital such as `ID 171, distance 0.00`. The 34 original tests are read-only and cannot be edited or deleted. Tests can be run as **original only**, **custom only**, or **all together**.

## Algorithm Notes

- **Brute Force:** compares the squared Euclidean distance `d² = (x1-x2)² + (y1-y2)²` against all n active hospitals. The square root is taken only to display the final distance. Ties go to the smaller ID. Time O(n), auxiliary space O(1).
- **Interpolation Search:** `x = l + ⌊((v - A[l]) × (r - l)) / (A[r] - A[l])⌋`, with `A` = sorted ID array, `l` = lower index, `r` = upper index, `v` = search key, `x` = estimated position. Average O(log log n) for roughly uniform IDs, worst case O(n).

## Documentation

- `TEST_CASES.md` - all original test cases, custom-test behaviour, and recorded verification checks.
- `PROJECT_REPORT.md` - detailed project documentation for writing the formal university report.
