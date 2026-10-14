---
title: Algorithms
hide:
  - navigation
  - toc
---

<div class="hero" markdown>

![Under construction: the website and the course material are still being written](img/under-construction.svg){ width="560" }

**Website under construction.** The material is still being written: the slides will
follow later; the interactive lab is already open and will grow.

# Algorithms

Teaching material conceived and developed by **[Fabio Furini](https://fabiofurini.github.io/)**, associate
professor at [DIAG](https://www.diag.uniroma1.it/), Sapienza University of Rome.

**The course lecture notes, online**, in four parts: basic algorithms (representation of numbers,
pseudo-code, sorting, searching, numerical algorithms), programming languages (C++, Python and
Java), asymptotic notation and growth, analysis and recursion (running time, correctness,
recurrence relations, the Master Theorem), with definitions, theorems with their proofs,
pseudo-code, examples executed step by step, Colab notebooks in Python, C++ and Java and
exercises with solutions.

[Start with the basic algorithms :material-arrow-right:](basic-algorithms/index.md){ .md-button .md-button--primary }
[The exercises](exercises/index.md){ .md-button }
[Explore the interactive lab](lab/index.md){ .md-button }
[:material-download: Download the lecture notes (PDF)](downloads.md){ .md-button }

</div>

## How each chapter is organized

Each chapter is one of the course notes, with the same numbers and the same colors as the
lecture notes: on the website and in the PDF you find everything in the same place.

<div class="grid" markdown>

!!! definizione "Definition"
    The precise meaning of a new concept.

!!! teorema "Theorem, proposition, observation"
    A result to remember, with its hypotheses.

!!! esempio "Example"
    A computation worked out in full, one step at a time.

!!! chiave ""
    **In green** the key point to take away.

!!! algoritmo "Algorithm"
    The pseudo-code, with the lines numbered as in the lecture notes.

!!! codice "Code"
    The programs in C++, Python and Java in the chapters on the languages; the algorithms run
    in the Colab notebooks, with the buttons below the pseudo-code.

</div>

??? dimostrazione "Proof — opens with a click"
    All proofs are included, but folded: first read the statement, then open
    the proof when you want to study it. The same holds for the solutions of the exercises.

## The parts of the course

<div class="grid cards" markdown>

-   :material-code-braces: **1 · Basic algorithms**

    ---

    The representation of numbers and pseudo-code, the language in which all the algorithms of the course are written; the first algorithms: sorting (insertion, exchange and selection sort), linear and binary search, numerical algorithms (change of base, primality test, sieve of Eratosthenes, greatest common divisor). Every algorithm with its pseudo-code and examples executed step by step.

    1\. Representation of numbers · 2\. Pseudo-code · 3\. Sorting algorithms · 4\. Linear and binary search · 5\. Numerical algorithms

    [:octicons-arrow-right-24: The chapters](basic-algorithms/index.md)

-   :material-console: **2 · Programming languages**

    ---

    From pseudo-code to programs: three programming languages, C++ (compiled), Python (interpreted) and Java (compiled to bytecode and run by a virtual machine). For each: variables and data types, input and output, operators, conditional statements, loops, arrays and lists, functions, bitwise operators and a complete algorithm, with the comparison of the three languages.

    6\. Introduction to C++ · 7\. Introduction to Python · 8\. Introduction to Java

    [:octicons-arrow-right-24: The chapters](languages/index.md)

-   :material-chart-line: **3 · Asymptotic notation and growth**

    ---

    How the functions of a natural variable that count the steps of an algorithm are compared: the asymptotic notations Theta, big O, Omega, little o and omega, their properties and the limit criterion; then the families of increasing functions (logarithms, powers, exponentials, factorial), the hierarchy of infinities and the comparison of orders of growth written with the symbols. Limits and functions of a natural variable are taken from the course of Mathematical Analysis 1.

    9\. Asymptotic notation · 10\. Asymptotic growth

    [:octicons-arrow-right-24: The chapters](asymptotics/index.md)

-   :material-timer-sand: **4 · Analysis of algorithms**

    ---

    The analysis of algorithms: the input size, the running time in the best, worst and average case, and correctness proved with loop invariants.

    11\. Input size · 12\. Running time · 13\. Correctness

    [:octicons-arrow-right-24: The chapters](analysis/index.md)

-   :material-file-tree: **5 · Recursion**

    ---

    Recursion: classical recursive algorithms, recurrence relations, the Master Theorem, recursive algorithms (array sum, merge sort, binary search, maximum subarray) and the comparison between recursive and iterative versions.

    14\. Recursion · 15\. Recurrences · 16\. The Master Theorem · 17\. Recursive algorithms · 18\. Recursive versus iterative algorithms

    [:octicons-arrow-right-24: The chapters](recursion/index.md)

</div>

## Don't miss

<div class="grid cards" markdown>

-   :material-pencil-box-multiple: **Exercises with solutions**

    ---

    Exercises for every chapter, each with a worked solution that opens with a click.

    [:octicons-arrow-right-24: The exercises](exercises/index.md)

-   :material-gesture-tap: **Interactive lab**

    ---

    Run the algorithms one step at a time: sorting, searching, Euclid and the sieve,
    the bits of numbers, growth of functions, recursion trees and the Master Theorem.

    [:octicons-arrow-right-24: The graphs](lab/index.md)

-   :simple-googlecolab: **Notebooks in Python, C++ and Java**

    ---

    The algorithms of every chapter, to run in Google Colab in the language you prefer.

    [:octicons-arrow-right-24: The notebooks](notebooks.md)

-   :material-download: **Lecture notes and exercise books in PDF**

    ---

    Five volumes of lecture notes and five exercise books, with the same numbering as the website.

    [:octicons-arrow-right-24: Downloads](downloads.md)

-   :material-format-list-numbered: **Full index**

    ---

    All chapters with their sections, on one page.

    [:octicons-arrow-right-24: The index](indice.md)

</div>

---

By the same author:

- **[Linear Programming](https://fabiofurini.github.io/linear-programming/)** — polyhedra, the simplex algorithm, duality and the dual simplex, with the interactive lab;
- **[Convex Optimization](https://fabiofurini.github.io/convex-optimization/)** — convex sets and functions, convex optimization problems, with interactive graphs;
- **[Integer Linear Programming](https://fabiofurini.github.io/integer-linear-programming/)** — LP relaxation, valid inequalities, cutting planes, branch-and-bound and branch-and-cut;
- **[Combinatorial Optimization](https://fabiofurini.github.io/combinatorial-optimization/)** — knapsack, bin packing, coloring, TSP, scheduling and lot sizing, solved in every way;
- **[Network Optimization](https://fabiofurini.github.io/network-optimization/)** — graphs, spanning trees, shortest paths, network flows, the network simplex and project management;
- **[MIP Modelling](https://fabiofurini.github.io/mip-modelling/)** — integer linear programming models, from the formulation to the solution with solvers;
- **[Operations Research Lab](https://fabiofurini.github.io/operations-research-lab/)** — modelling and solving optimization problems with Python and solvers;
- **[Mathematical Analysis 1](https://fabiofurini.github.io/mathematical-analysis-1/)** — real numbers, functions, limits, derivatives and series, with interactive graphs;
- **[Linear Algebra](https://fabiofurini.github.io/linear-algebra/)** — vectors, matrices, determinants, linear systems and eigenvalues, with the computation lab.

Teaching material by **[Fabio Furini](https://fabiofurini.github.io/)** —
[DIAG](https://www.diag.uniroma1.it/), Sapienza University of Rome.

*Questo sito è disponibile anche in [italiano](https://fabiofurini.github.io/algoritmi/).*
