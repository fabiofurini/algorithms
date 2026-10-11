---
hide:
  - navigation
---

# Interactive lab

Here you can watch the algorithms at work. Pick an app: it opens full page, with **sliders** and buttons.
Drag the sliders, or press ▶ to run one step at a time and «Run» for the animation. The notation is that
of the lecture notes: arrays \(a[1..n]\) indexed from 1, the same names of algorithms and variables.

## Basic algorithms

<div class="grid cards" markdown>

-   :material-numeric: **Number representation**

    ---

    The same integer in binary, two's complement, sign-magnitude and IEEE 754: change the number and watch the bits.

    [Open the app →](number-representation.md)

-   :material-sort-ascending: **Sorting step by step**

    ---

    Insertion, exchange and selection sort: comparisons and moves one step at a time, with the pseudo-code line being executed.

    [Open the app →](sorting.md)

-   :material-magnify: **Linear and binary search**

    ---

    The same sorted array searched in two ways: count how many comparisons linear and binary search need.

    [Open the app →](search.md)

-   :material-grid: **Euclid and the sieve of Eratosthenes**

    ---

    The greatest common divisor through successive remainders, and the primes that emerge by crossing out multiples.

    [Open the app →](euclid-sieve.md)

</div>

## Asymptotic notation and growth

<div class="grid cards" markdown>

-   :material-chart-line: **Orders of growth**

    ---

    Logarithm, polynomials, exponential: how many steps (and how much time) are needed as n grows, comparing the functions.

    [Open the app →](growth.md)

</div>

## Analysis and recursion

<div class="grid cards" markdown>

-   :material-check-decagram: **The loop invariant**

    ---

    FindMaximum iteration by iteration: check that the invariant holds at the start, at every step and at the end.

    [Open the app →](invariant.md)

-   :material-file-tree: **Recursion trees**

    ---

    The tree of calls of a recursive function and the stack: nodes count the steps, depth counts the memory.

    [Open the app →](recursion-trees.md)

-   :material-layers-triple: **The Master Theorem**

    ---

    The recurrence T(n) = a T(n/b) + n^d level by level: the cost of the levels is a geometric progression and decides the order of T(n).

    [Open the app →](master-theorem.md)

-   :material-call-merge: **Merge sort**

    ---

    Divide down to one element, then merge the sorted halves with Merge: watch calls and merges one at a time.

    [Open the app →](merge-sort.md)

</div>
