# Test Cases - Nearest Hospital Finder

All tests are implemented in `js/tests.js` and execute the **real** functions `findNearestHospital`, `searchHospitalById`, `interpolationSearch` and `validateWholeNumber`. "Expected" values are written by hand; "Actual" values are produced by running the code. A test is PASS only when Actual equals Expected exactly.

To run them yourself: open the app with Live Server and click **Tests** (they run when the page opens, and again with **Run All Tests**).

## Summary of the Recorded Run

| Total tests | Passed | Failed |
|---:|---:|---:|
| 27 | 27 | 0 |

The results below were recorded by running `js/tests.js` under Node.js with the project's files. The same 27 tests also run in the browser Tests page, which showed the same totals in a headless Chromium check.

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

## Notes on Specific Tests

- **BF-03** uses the dataset: the point (11, 19) is exactly equal in distance (d² = 2) to hospital 101 at (10, 20) and hospital 105 at (12, 18). The expected winner is the smaller ID, 101.
- **BF-04** tests the tie rule independently of the dataset order. The hospital with the *larger* ID (9) is listed first, and both hospitals are at distance 5 from (0, 0). The expected winner is ID 4.
- **IS-06 / IS-07 / IS-08 / IS-09** call `interpolationSearch` directly with custom arrays. The real dataset has every ID from 101 to 170 with no gaps, so a "missing ID between existing IDs" can only be tested with an array that has gaps (`[101, 105, 110, 120]`). IS-08 covers division by zero (`A[r] - A[l] = 0`) and IS-09 covers an empty range.
- **IS-10** searches all 70 IDs and checks that each one is found at the correct index.
- **VAL-xx** tests use the label "Value"; the same function validates X, Y and ID inputs in the app.
