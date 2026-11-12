# Test Cases - Nearest Hospital Finder

The 34 original tests are implemented in `js/tests.js` and execute the **real** functions `findNearestHospital`, `searchHospitalById`, `interpolationSearch` and `validateWholeNumber`. "Expected" values are written by hand; "Actual" values are produced by running the code. A test is PASS only when Actual equals Expected exactly.

Custom tests created through the Tests page are stored in `localStorage` and also execute the real production functions against the active dataset, including user-added hospitals. They are compared with their expected output using the same exact-match rule.

To run them yourself: open the app with Live Server and click **Tests**. The page runs all tests when first opened; the **Run Original Tests**, **Run Custom Tests** and **Run All Tests** buttons run each group separately or together.

## Summary of the Recorded Run

| Total tests | Passed | Failed |
|---:|---:|---:|
| 34 | 34 | 0 |

The results below were recorded by running `js/tests.js` under Node.js with the project's files. The same 34 tests also run in the browser Tests page.

## Test Results

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

## Notes on Specific Tests

- **BF-03** uses the dataset: the point (11, 19) is exactly equal in distance (d² = 2) to hospital 101 at (10, 20) and hospital 105 at (12, 18). The expected winner is the smaller ID, 101.
- **BF-04** tests the tie rule independently of the dataset order. The hospital with the *larger* ID (9) is listed first, and both hospitals are at distance 5 from (0, 0). The expected winner is ID 4.
- **BF-08** calls `findNearestHospital` with an empty hospital list and expects `null` (the function's defined behaviour for no data).
- **BF-09** extends the tie rule to three hospitals listed in decreasing ID order, all at distance 5 from (0, 0); the expected winner is the smallest ID, 2.
- **IS-06 / IS-07 / IS-08 / IS-09 / IS-11 / IS-12** call `interpolationSearch` directly with custom arrays. The real dataset has every ID from 101 to 170 with no gaps, so a "missing ID between existing IDs" can only be tested with an array that has gaps (`[101, 105, 110, 120]`). IS-08 covers division by zero (`A[r] - A[l] = 0`), IS-09 covers an empty range, IS-11 covers a single-element array whose only value does not match, and IS-12 covers a key below the minimum of a gapped array.
- **IS-10** searches all 70 IDs and checks that each one is found at the correct index.
- **VAL-xx** tests use the label "Value"; the same function validates X, Y and ID inputs in the app. VAL-11 confirms leading zeros are accepted as a whole number, VAL-12 confirms surrounding spaces are trimmed, and VAL-13 rejects exponent notation (`1e3`).

## Custom Test Cases

The Tests page provides a custom test builder. Each custom test has a type, an input and an expected output:

- **Brute Force:** X and Y input; actual output is `ID <id>, distance <d>` from the production `findNearestHospital` function.
- **Interpolation Search:** hospital ID input; actual output is `Found ID <id> (<name>)` or `Not Found` from the production `searchHospitalById` function.

Custom tests can be added, viewed, edited and deleted. They call the active dataset, so after adding hospital 171 a custom Brute Force test for `(20, 30)` can expect `ID 171, distance 0.00`. They are saved in `localStorage` under the key `nhf.customTests.v1`, so they remain after a page refresh. The original 34 tests are frozen and read-only; no UI control can edit or delete them.

## Verification of the Custom-Test Features

These browser checks were run with a real browser automation session against the final implementation:

| Check | Result |
|---|---|
| Add a Brute Force custom test through the UI | PASS |
| Add an Interpolation Search custom test through the UI | PASS |
| Custom Brute Force test calls the production algorithm | PASS |
| Custom Interpolation Search test calls the production algorithm | PASS |
| Incorrect expected output produces FAIL | PASS |
| Correct expected output produces PASS | PASS |
| Run custom tests separately | PASS |
| Run original tests separately | PASS |
| Run original and custom tests together | PASS |
| Original tests remain read-only and unchanged | PASS |
| Edit a custom test and rerun | PASS |
| Delete a custom test | PASS |
| Custom tests persist after refresh | PASS |
| Deletion persists after refresh | PASS |

## Verification of Dynamic Hospitals and Themes

The feature harness ran 26 browser checks, and a separate layout harness ran 8 checks, against the final implementation in headless Microsoft Edge. All 34 passed.

| Check | Result |
|---|---|
| Baseline dataset still starts at 70 records | PASS |
| Initial total, range and directory counts are 70 / 101 - 170 | PASS |
| Duplicate hospital ID is rejected | PASS |
| Non-positive hospital ID is rejected | PASS |
| Blank hospital name is rejected | PASS |
| Decimal coordinate is rejected | PASS |
| Hospital 171 (Ahmed Medical Center, 20, 30) is added through the UI | PASS |
| Added hospital is sorted and marked as a user-added record | PASS |
| Dashboard total, ID range and directory counters update to 71 / 101 - 171 | PASS |
| Added hospital is saved under `nhf.addedHospitals.v1` | PASS |
| Brute Force on 71 hospitals finds ID 171 at distance 0.00 | PASS |
| Brute Force compares all 71 active hospitals and highlights the new row | PASS |
| Interpolation Search finds ID 171 with the real probe trace | PASS |
| Custom Brute Force and Interpolation Search tests use the active dataset | PASS |
| Combined original + custom suite passes 36 / 36 after the addition | PASS |
| Dark theme applies to body, cards and active navigation surfaces | PASS |
| Dark-theme choice is stored and the toggle label updates | PASS |
| Primary, secondary, danger and theme buttons share rounded pill geometry | PASS |
| Hospital 171 persists after a page refresh | PASS |
| Dark theme persists after a page refresh | PASS |
| Custom tests persist after a page refresh | PASS |
| Persisted hospital still blocks a duplicate ID | PASS |
| Light theme applies and persists after refresh | PASS |
| Existing 34 original tests still pass under Node.js | PASS |
| Existing 23 custom-test browser checks still pass | PASS |
| Existing 7 execution-trace browser checks still pass | PASS |
| Desktop layout has no horizontal page overflow and renders all controls | PASS |
| Mobile 390 px layout has no horizontal page overflow | PASS |
| Mobile statistics and action cards stack in one column | PASS |
| Mobile cards and form controls fit inside the viewport | PASS |
| Mobile navigation is horizontally contained and the theme control stays visible | PASS |

Recorded results: **26/26 feature checks** and **8/8 layout checks** passed. Existing suites: **34/34 original**, **23/23 custom-test checks**, **7/7 trace checks**.
