<h3 align="center">Teaching material by
<a href="https://fabiofurini.github.io/">Fabio Furini</a></h3>
<p align="center">
  Associate Professor of Operations Research ·
  <a href="https://www.diag.uniroma1.it/">DIAG</a>, Sapienza University of Rome ·
  <a href="https://fabiofurini.github.io/">personal website</a>
</p>

# Algorithms

The lecture notes of the Algorithms course online: definitions, theorems with their proofs,
pseudo-code with numbered lines, C++ code, examples executed step by step and exercises with
solutions, with the same numbering and colors as the PDFs, and an **interactive lab** that runs the
algorithms step by step. **The site is under construction**: the slides will follow.

**📖 Website: [fabiofurini.github.io/algorithms](https://fabiofurini.github.io/algorithms/)**

## Contents

| Part | Topics |
|---|---|
| 1 · Foundations and basic algorithms | representation of numbers, pseudo-code, introduction to C++, sorting (insertion, exchange, selection sort), linear and binary search, numerical algorithms (change of base, primality, sieve of Eratosthenes, GCD) |
| 2 · Analysis and recursion | input size, running time and asymptotic notation, correctness and loop invariants, recursion, recurrence relations, the Master Theorem, recursive algorithms (array sum, merge sort, binary search, maximum subarray), recursive versus iterative algorithms |
| Exercises | exercises for every chapter, with worked solutions |
| Lab | interactive graphs: representation of numbers, sorting, searching, Euclid and the sieve, orders of growth, loop invariants, recursion trees, the Master Theorem, merge sort |

The lecture notes and the exercise books in PDF (two volumes each) can be downloaded from the
[downloads page](https://fabiofurini.github.io/algorithms/downloads/).

## How it is built

Pages, figures and PDFs are generated locally from the (private) LaTeX sources of the
notes; this repository contains the generated website (`docs/`, `mkdocs.yml`).
To preview it locally:

```bash
python3 -m pip install mkdocs-material
python3 -m mkdocs serve            # preview at http://127.0.0.1:8000
```

## License

- **Text and figures** (`docs/`): [CC BY 4.0](LICENSE).
- **Code** (the C++ code in the pages and `docs/javascripts/`): [MIT](LICENSE-CODE).

To cite this material, see [`CITATION.cff`](CITATION.cff).

## Versione italiana

Il corso sarà disponibile anche in italiano:
**[fabiofurini.github.io/algoritmi](https://fabiofurini.github.io/algoritmi/)**
([repository](https://github.com/fabiofurini/algoritmi)).

## Same series

- [Linear Programming](https://fabiofurini.github.io/linear-programming/)
- [Operations Research Lab](https://fabiofurini.github.io/operations-research-lab/)
- [MIP Modelling](https://fabiofurini.github.io/mip-modelling/)
- [Mathematical Analysis 1](https://fabiofurini.github.io/mathematical-analysis-1/)
- [Linear Algebra](https://fabiofurini.github.io/linear-algebra/)
- [Convex Optimization](https://fabiofurini.github.io/convex-optimization/)

---

Teaching material by [Fabio Furini](https://fabiofurini.github.io/) — [DIAG](https://www.diag.uniroma1.it/), Sapienza University of Rome.
