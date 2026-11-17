# Report Update Guide — Brute Force Closest-Pair Added

This guide is matched to your **actual report** (Sections 1–15, Tables 1–23,
Figures 1–10). Everything marked **PASTE** is ready to drop into the Word file.
Only the code was extended — `findNearestHospital()` and `interpolationSearch()`
were not changed.

---

## A. Global edits (do these everywhere first)

| Find | Replace with |
|---|---|
| `34 tests`, `34 original tests`, `All 34 original tests pass` | `41 tests (34 core + 7 Closest-Pair)` |
| `34 total / 34 passed / 0 failed` | `41 total / 41 passed / 0 failed` |
| `34  34 PASSED  100% PASS RATE` | `41  41 PASSED  100% PASS RATE` |
| `two algorithms` / `both algorithms` (where it refers to the whole project) | `three algorithms` / `all three algorithms` |
| `The Closest-Pair idea is adapted to one query point against n hospitals, reducing Θ(n²) to Θ(n)` | See the corrected Conclusion in Section N below |
| Figure 8 (Interpolation/complexity) | Figure 9 |
| Figure 9 (Tests page) | Figure 10 |
| Figure 10 (test summary) | Figure 11 |

Note: the UI button reads **Run Original Tests (41)** because all 41 frozen tests
live in the same `testCases` array. In the report, describe them as
"41 read-only tests: 34 core tests + 7 Closest-Pair tests" to stay accurate.

---

## B. Cover page / front matter — PASTE

Subtitle:

```text
Brute Force Nearest-Neighbour Search, Brute Force Closest-Pair,
and Interpolation Search in a Live Web Application
```

Project Information table rows:

| Item | Replacement text |
|---|---|
| Chapters covered | Chapter 3 (Brute Force: Nearest-Neighbour and Closest-Pair); Chapter 4 (Interpolation Search, Variable-Size-Decrease) [3] |
| Project type | University academic project with live public deployment; Closest-Pair added in the current build (redeploy before submission) |

Deployment note: redeploy to Vercel, otherwise `nearest-hospital-finder-lake.vercel.app`
still serves the old build. Capture new screenshots locally at
`http://127.0.0.1:8123/#algorithms` and `http://127.0.0.1:8123/#tests`.

---

## C. Table of Contents / List of Figures / List of Tables — PASTE entries

```text
8   Brute Force Algorithm ......................................... 10
    8.1 Overview
    8.2 Nearest-Neighbour and Closest-Pair
    8.3 Brute Force Closest-Pair (NEW)
    8.4 Euclidean and Squared Distance
    8.5 Steps
    8.6 Pseudocode
    8.7 Complexity Analysis
```

List of Figures — insert and renumber:

```text
Figure 7: Algorithms page: Brute Force, Euclidean distance and the two Closest-Pair views.
Figure 8: Algorithms page with the Closest-Pair card and its result (IDs 101 and 105, 2.83 units, 2415 pairs compared). (NEW)
Figure 9: Algorithms page: Interpolation Search and complexity analysis. (was 8)
Figure 10: Tests page with run controls, a passing summary and the custom-test form. (was 9)
Figure 11: Test summary (41 total / 41 passed / 0 failed) and the test results table. (was 10)
```

Fix the typo `FigureFigure 8` in the current List of Figures.

List of Tables — insert:

```text
Table 9b: Complexity of the Brute Force Closest-Pair search.
Table 9c: Closest-Pair vs Nearest-Neighbour.
Table 18b: Closest-Pair tests (CP-01 to CP-07).
```

Tables 19–23 keep their numbers.

---

## D. Abstract — PASTE (replace whole paragraph)

> The project demonstrates, in a visible and testable way, how three algorithms from
> the CT-363 syllabus solve practical lookup problems [3]. The application stores 70
> hospitals, each with a unique ID, a name and an (X, Y) position on a fictional grid.
> Users can find the hospital nearest to any point (Nearest-Neighbour, O(n)), find the
> **two closest hospitals among all n hospitals** (Brute Force Closest-Pair, O(n²)),
> look a hospital up by its ID (Interpolation Search), browse and extend the directory,
> read the algorithm explanations, and run 41 executable tests. Both distance-based
> algorithms reuse the same squared-distance optimisation: no square root is taken
> inside either loop. The two problems are implemented as separate functions so their
> different goals and complexities can be compared directly.

---

## E. Problem Statement (§2) and Objectives (§3) — PASTE

Add after Problem B:

```text
P R O B L E M  C · C L O S E S T  P A I R
Given the same n hospitals and their coordinates, find the unordered pair (i, j),
i < j, with the smallest Euclidean distance. Return both hospitals, the squared
distance, the actual distance and the number of pairs compared. If n < 2, return null.
```

Add one sentence: Problem A compares one user point with n hospitals; Problem C
compares every hospital with every other hospital — 2415 pairs for n = 70.

Objectives currently end with item 6 (deploy publicly [10]). **Append:**

```text
7. Implement the classical Brute Force Closest-Pair algorithm [3] using exhaustive
   pair enumeration with a deterministic tie-break on the sum of IDs.
8. Compare Closest-Pair O(n²) with Nearest-Neighbour O(n) and verify both with
   executable tests that call the real production functions.
```

---

## F. §4 Scope — PASTE bullet

In scope, add:

```text
• Closest-Pair search over all 70 hospitals (2415 unordered pairs)
• 34 core tests plus 7 Closest-Pair tests plus user-defined custom tests
```

Out of scope, add:

```text
• Divide-and-conquer Closest-Pair (O(n log n)) and spatial indexes
```

---

## G. §5 Requirements — PASTE table rows

Table 3 (Functional requirements) — change FR15 and append FR19–FR21:

| No. | Requirement | Where implemented |
|---|---|---|
| FR15 | Run 41 read-only tests (34 core + 7 Closest-Pair) and user-defined custom tests | Tests view, `js/tests.js`, `js/customTests.js` |
| FR19 | Compute the two closest hospitals over all n(n−1)/2 pairs, with tie-break on smaller ID sum | `findClosestPair` in `js/algorithms.js` |
| FR20 | Display both names, IDs, coordinates, squared distance, actual distance and comparison count | Closest-Pair result card in `index.html`; `handleClosestPairClick` in `js/app.js` |
| FR21 | Allow a `closestpair` custom test type executed against the active dataset | `js/customTests.js` (`CUSTOM_TEST_TYPES`, `describeCustomActual`) |

FR2 note: the "Algorithms Used" dashboard card is still hardcoded to **2**.
Either leave it and do not claim three in §11.1, or make the one-line HTML change
`<span class="stat-value">2</span>` → `3` and update §11.1 accordingly.

Non-functional requirements (Table 4): no change needed; add to Correctness:
"verified by 41 tests that call the real functions, including the 7 Closest-Pair cases".

---

## H. §6 Technology Stack and Architecture — PASTE

Table 5, Structure row: unchanged (no new files).

Table 6 — replace these rows:

| File | Replacement responsibility |
|---|---|
| `index.html` | Page structure: six views; Closest-Pair explanation card, button and result list; fourth custom-test option; updated complexity row |
| `js/algorithms.js` | `squaredDistance`, `findNearestHospital` (O(n)), `findClosestPair` (O(n²)), `interpolationSearch`, `searchHospitalById` |
| `js/tests.js` | `testCases` array of 41 frozen tests (BF, IS, VAL and CP-01…CP-07), `runAllTests`, description helpers |
| `js/customTests.js` | Custom test storage, validation and execution with four types: `nearest`, `search`, `closestpair` |
| `js/app.js` | Navigation, form handling, rendering, theme toggle and the `Run Closest-Pair` button handler |

Figure 1 caption: add "The Closest-Pair function is imported from the same algorithm
module; no new module was added."

§6.2 workflow — insert after step 3 and renumber the later steps:

```text
4. Closest-Pair: click "Run Closest-Pair on Active Dataset" → findClosestPair is
   called with activeHospitals → the two closest hospitals, squared distance, actual
   distance and pair count are rendered in the Algorithms view.
```

Steps 4, 5, 6 become 5, 6, 7 (ID search, Add hospital, Tests).

---

## I. §7 Hospital Dataset — PASTE

Add a row to Table 7:

| Property | Value |
|---|---|
| Closest pair in the base dataset | IDs 101 (10, 20) and 105 (12, 18); d² = 8, d = 2.83; 2415 pairs checked |

Add below Table 8:

> The hand-computed closest pair in the table is Jinnah Hospital (101) and Indus
> Hospital (105): (10−12)² + (20−18)² = 4 + 4 = 8, so the distance is √8 = 2.83 units.
> Test CP-01 confirms the algorithm returns this exact pair.

---

## J. §8 Brute Force — the main new content

### J.1 Rename §8.2 and replace its last paragraph — PASTE

Heading: `8.2 Nearest-Neighbour and Closest-Pair`

Replacement paragraph:

> The classical Closest-Pair problem finds the two closest points among n points; its
> brute-force solution checks all n(n − 1)/2 pairs, giving Θ(n²) time [3], [5].
> Nearest-Neighbour is a different problem: it compares one user point with n
> hospitals, so only n distances are needed and the running time is Θ(n). **Both
> versions are now implemented**: `findNearestHospital()` for Nearest-Neighbour and
> `findClosestPair()` for the full Closest-Pair problem. The earlier O(n) adaptation is
> retained unchanged; the new function adds the genuine pairwise search instead of
> replacing it.

### J.2 Insert new §8.3 after §8.2 — PASTE all of it

```text
8.3 Brute Force Closest-Pair (NEW)

The algorithm enumerates every unordered pair of hospitals (i, j) with i < j. There
are exactly n(n-1)/2 such pairs: 2415 for n = 70. For each pair it computes the
squared distance with squaredDistance() and keeps the smallest value. A square root
is taken only once, after the loops, for the displayed distance.

Algorithm 1b · FindClosestPair — js/algorithms.js

  Step 1  If hospitals.length < 2, return null.
  Step 2  bestPair ← (0, 1); minSquared ← squaredDistance(h[0], h[1]);
          bestSum ← h[0].id + h[1].id.
  Step 3  for i ← 0 to n-2 do
            for j ← i+1 to n-1 do
              d2 ← (h[i].x - h[j].x)^2 + (h[i].y - h[j].y)^2
              if d2 < minSquared then
                minSquared ← d2; bestPair ← (i, j); bestSum ← h[i].id + h[j].id
              else if d2 = minSquared and h[i].id + h[j].id < bestSum then
                bestPair ← (i, j); bestSum ← h[i].id + h[j].id
  Step 4  return { hospital1, hospital2, squaredDistance: minSquared,
                   distance: sqrt(minSquared), comparisons: n(n-1)/2 }

Tie-breaking rule: when two pairs have equal distance, keep the pair with the smaller
sum of IDs. This makes the output deterministic regardless of input order.

Worked example: IDs 101 (10, 20) and 105 (12, 18) give
d2 = (10-12)^2 + (20-18)^2 = 4 + 4 = 8, d = sqrt(8) = 2.83 units, and the scan
performs 70 x 69 / 2 = 2415 comparisons. Test CP-01 verifies this result.
```

Then renumber old §8.3 → 8.4, §8.4 → 8.5, §8.5 → 8.6, §8.6 → 8.7.
Keep "Algorithm 1 · FindNearestHospital" and "Algorithm 2 · InterpolationSearch"
as they are; the new pseudocode is labelled **Algorithm 1b** so numbering stays stable.

### J.3 Old §8.6 (now §8.7) — append a new table after Table 9

**Table 9b — Complexity of the Brute Force Closest-Pair search**

| Measure | Analysis |
|---|---|
| Basic operation | One squared-distance calculation plus one comparison, for each unordered pair |
| Time complexity | Exactly n(n−1)/2 pairs, so T(n) = Θ(n²) in all cases; 2415 pairs for n = 70 [1], [3] |
| Auxiliary space | O(1): only indices, minSquared and bestSum are needed |
| Optimisation | No square root inside the loop; `Math.sqrt` is called once for the final display |

**Table 9c — Closest-Pair vs Nearest-Neighbour**

| Property | Nearest-Neighbour | Closest-Pair |
|---|---|---|
| Question | Nearest hospital to a user point | Two nearest hospitals to each other |
| Comparisons | n (70) | n(n−1)/2 (2415) |
| Time | Θ(n) | Θ(n²) |
| Space | O(1) | O(1) |
| Tie-break | Smaller hospital ID | Smaller sum of the two IDs |
| Function | `findNearestHospital` | `findClosestPair` |
| Test IDs | BF-01…BF-09 | CP-01…CP-07 |

Add: "Both are Brute Force Chapter 3 algorithms; the cost differs because one scans
n candidates while the other scans all n(n−1)/2 candidate pairs."

---

## K. §9 Interpolation Search — no change

Only note in §9.5 that its pseudocode remains "Algorithm 2"; the new Closest-Pair
pseudocode is "Algorithm 1b" (Chapter 3), so nothing in this section is renumbered.

---

## L. §10 Input Validation — one note

Add: "Closest-Pair requires no numeric input, so it does not call
`validateWholeNumber`; it uses the active dataset directly and returns `null`
when fewer than two hospitals are present."

---

## M. §11 User Interface and Live Deployment — PASTE

### M.1 §11.1 Dashboard

If the "Algorithms Used" card remains 2, leave the text as it is. If you changed it
to 3, state "three algorithms (Nearest-Neighbour, Closest-Pair, Interpolation Search)".

### M.2 §11.5 Algorithms — replace the paragraph and add a subsection

Replacement first paragraph:

> The Algorithms view explains Brute Force (Nearest-Neighbour and Closest-Pair),
> Euclidean and squared distance, Interpolation Search and variable-size-decrease,
> and it contains a complexity table. Both Chapter 3 algorithms are explicitly
> labelled as implemented.

New subsection after it:

```text
11.5.1 Closest-Pair Controls
The new card states that both algorithms are implemented and compares O(n) with
O(n²). The button "Run Closest-Pair on Active Dataset" calls
findClosestPair(activeHospitals) and renders both hospital names, IDs and coordinates,
the squared distance, the actual distance and the number of pairs compared. With
fewer than two hospitals an error message is displayed instead. User-added hospitals
are included because activeHospitals is used.

Figure 8: Algorithms page with the Closest-Pair result for the active dataset
(Jinnah Hospital ID 101 and Indus Hospital ID 105, 2.83 units, 2415 pairs compared).
```

Change old Figure 7 caption to "…Brute Force, Euclidean distance and Closest-Pair
adaptation" and renumber old Figures 8, 9, 10 → 9, 10, 11.

Add the new row to the complexity table on that page / in the report:

| Algorithm | Case | Time | Auxiliary Space |
|---|---|---|---|
| Closest-Pair (implemented — 2 closest among n) | All cases | O(n²) | O(1) |

### M.3 §11.6 Executable Tests

Replace the first sentence with:

> Three run buttons, a read-only table of 41 tests (BF, IS, VAL and CP), a custom-test
> form with **four** type options, a custom results table with edit/delete, and a
> summary of total, passed and failed counts.

Update Figure 11 caption: "Test summary (41 total / 41 passed / 0 failed) and the
test results table." Take a fresh screenshot showing the CP rows.

---

## N. §12 Testing — complete paste-ready replacement content

This is the part to be most careful with: counts, table rows and rationale.

### N.1 Section opening

Replace `All 34 original tests pass. Tests are defined in js/tests.js and call the real production functions.` with:

> All 41 tests pass (34 core tests plus 7 Closest-Pair tests). They are defined in
> `js/tests.js`, frozen with `Object.freeze()` so the suite is read-only, and every
> test calls the real production function — no result is hardcoded as PASS.

### N.2 §12.1 Table 17 (Test categories) — full replacement

| Category | Count | Test IDs |
|---|---|---|
| Brute Force (Nearest-Neighbour) | 9 | BF-01 to BF-09 |
| Interpolation Search | 12 | IS-01 to IS-12 |
| Validation | 13 | VAL-01 to VAL-13 |
| Closest-Pair | 7 | CP-01 to CP-07 |
| **Total** | **41** | BF, IS, VAL, CP |

### N.3 §12.2 new Table 18b — insert after Table 18 (BF tests)

Expected and Actual columns are identical because every test passes.

| Test ID | Description | Input | Expected / Actual | Status |
|---|---|---|---|---|
| CP-01 | Closest pair in 70-hospital dataset | `HOSPITALS` (70 records) | `ID 101 and ID 105, distance 2.83` | PASS |
| CP-02 | Two identical-coordinate hospitals | `(10,20)` and `(10,20)` | `ID 1 and ID 2, distance 0.00` | PASS |
| CP-03 | Empty array | `[]` | `null` | PASS |
| CP-04 | Single hospital | `[ID 1 only]` | `null` | PASS |
| CP-05 | Two hospitals only | `(0,0)` and `(3,4)` | `ID 1 and ID 2, distance 5.00` | PASS |
| CP-06 | Tie: same distance, smaller ID sum wins | IDs 1, 5, 2, 3 (two pairs at d² = 25) | `ID 2 and ID 3, distance 5.00` | PASS |
| CP-07 | Comparison count | `HOSPITALS` (70 records) | `2415 comparisons` | PASS |

Caption: `Table 18b: Closest-Pair tests (CP-01 to CP-07).`

### N.4 §12.3 Table 21 (Rationale) — append these rows

| Test(s) | What it demonstrates |
|---|---|
| CP-01 | Hand-computed baseline on the real dataset: d² = 8 for IDs 101 and 105, so d = 2.83; confirms correctness on n = 70 |
| CP-02 | Zero-distance boundary case (identical coordinates) |
| CP-03, CP-04 | `null` result when fewer than two hospitals exist |
| CP-05 | Minimum valid input: the only possible pair is returned |
| CP-06 | Deterministic tie-break: pair (2,3) has ID sum 5 and beats pair (1,5) with sum 6 |
| CP-07 | Exact n(n−1)/2 = 2415 comparison count, proving exhaustive pairwise enumeration |

### N.5 §12.4 Custom Tests — replace bullet list

```text
• Users can now add four kinds of custom test: Brute Force (nearest), Interpolation
  Search (search), and Closest-Pair (closestpair), in the format type, input,
  expected output.
• Closest-Pair custom tests need no numeric input: they call findClosestPair on the
  active dataset, exactly like the original CP tests.
• Expected-output examples:
  Brute Force          ID 103, distance 0.00
  Interpolation Search Found ID 135 (Nazimabad Care Hospital) or Not Found
  Closest-Pair         ID 101 and ID 105, distance 2.83
• Custom tests call the real production algorithms with the active dataset,
  including user-added hospitals; they are saved in localStorage under
  nhf.customTests.v1 [12], can be edited/deleted, and can run alone or together
  with the 41 frozen tests.
```

### N.6 Summary graphic

Change `34 / 34 PASSED / 100% PASS RATE` to `41 / 41 PASSED / 100% PASS RATE`
and regenerate the Figure 11 screenshot.

---

## O. §13 Limitations — append bullets

```text
• Closest-Pair is Θ(n²): 2415 pairs is fine for 70 hospitals, but a much larger
  dataset would need a divide-and-conquer O(n log n) algorithm.
• The Closest-Pair tie-break uses the sum of two IDs; two distinct pairs can share
  the same sum, so a secondary tie-break would be required for full determinism.
• The Closest-Pair result depends on the active dataset, so a user-added hospital
  can change which pair is closest.
```

Keep the existing bullets (fictional coordinates, localStorage only, whole numbers,
single-probe IS, no k-d trees, manual loops).

---

## P. §14 Conclusion — PASTE (replace whole paragraph)

> The project delivers a complete, publicly deployed application that applies two
> Chapter 3 Brute Force algorithms and one Chapter 4 search algorithm [3].
> Nearest-Neighbour finds the hospital closest to a user point in Θ(n); the newly
> added Closest-Pair finds the two closest hospitals among all n hospitals in Θ(n²)
> by checking n(n−1)/2 pairs; and Interpolation Search finds every stored ID in a
> single estimate on the uniform dataset. On the 70-hospital dataset, Closest-Pair
> identifies Jinnah Hospital (101) and Indus Hospital (105) at 2.83 units after
> 2415 comparisons. Both distance algorithms reuse the squared-distance optimisation
> and are implemented by hand, kept separate from the interface code, and verified
> by 41 passing executable tests that call the real production functions. The
> application demonstrates the core CT-363 concepts in a visible, interactive and
> testable manner and is deployed publicly on Vercel for accessibility and evaluation.

---

## Q. §15 Future Enhancements — PASTE row for Table 22

| # | Enhancement |
|---|---|
| 7 | Replace Brute Force Closest-Pair with divide-and-conquer Closest-Pair (O(n log n)) so the pairwise feature scales to larger datasets |

Existing rows 1–6 stay unchanged; optionally amend row 3 to show the closest pair
on the interactive 2D grid.

---

## R. References and Table 23

No new reference is mandatory — Levitin [3] and Cormen et al. [1] already cover
Brute Force Closest-Pair and Θ(n²). If you want an explicit entry, add:

```text
[14] A. Levitin, Introduction to the Design and Analysis of Algorithms, 3rd ed.,
     Boston, MA, USA: Pearson, 2012 — Chapter 3, Brute Force Closest-Pair.
```

Table 23 updates:

| Report section | References | Replacement note |
|---|---|---|
| Brute Force (§8) | [1], [3], [5] | Include Closest-Pair, Θ(n) and Θ(n²) analyses |
| Closest-Pair (§8.3) — new row | [1], [3], [5] | Exhaustive pair enumeration, n(n−1)/2 comparisons, tie-breaking |
| Complexity notation (§8.7, §9.7) | [1]–[5] | Update section reference from §8.6 to §8.7 |
| Testing (§12) | [6], [8] | Add "frozen test suite, real function calls, 41 tests" |

---

## S. Submission checklist

- [ ] Every `34` is either removed or explicitly qualified as "core tests".
- [ ] Counts read 41 total / 41 passed / 0 failed / 100% in text, figure and graphic.
- [ ] §2 has Problem C; §3 has objectives 7–8; §4 has the new scope bullets.
- [ ] Table 3 has FR19–FR21; Table 6 updated; §6.2 has the Closest-Pair workflow step.
- [ ] Table 7 has the closest-pair row; §8.2 corrected; §8.3 and Tables 9b/9c pasted.
- [ ] Old §8.3–8.6 renumbered to §8.4–8.7; pseudocode labelled Algorithm 1b.
- [ ] §11.5 has the new card description and Figure 8; figures 8–10 renumbered to 9–11.
- [ ] Table 17 total 41; Table 18b pasted; Table 21 CP rows added; §12.4 has four types.
- [ ] §13, §14, §15 and Table 23 updated; Figure 1 typo/inconsistencies checked.
- [ ] Vercel redeployed and all screenshots regenerated from the new build.
