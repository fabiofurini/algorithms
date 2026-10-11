---
title: "Numerical algorithms"
---

# Numerical algorithms

<div class="info-capitolo" markdown>

**Part 1 · Basic algorithms · Chapter 5** · [:material-file-pdf-box: Lecture notes, volume 1 (PDF)](../pdf/lecture-notes-1-basic-algorithms.pdf) · [:material-pencil: Exercises](../exercises/ex-05-numerical-algorithms.md)

</div>

## Introduction

In this chapter we study four classical algorithms that work on natural numbers:

- the <strong>change of base</strong>, which writes a natural number given in base ten as a sequence of digits in another base $b$;

- the <strong>primality test</strong>, which decides whether a natural number is prime;

- the <strong>Sieve of Eratosthenes</strong>, which finds all the prime numbers up to a given natural number;

- the <strong>Euclidean algorithm</strong>, which computes the greatest common divisor of two natural numbers.

All four algorithms are built on one elementary operation, the <strong>division with remainder</strong>: the change of base reads the digits as remainders, the primality test and the sieve look for remainders equal to zero, and the Euclidean algorithm replaces a pair of numbers with a smaller pair through a remainder. For each algorithm we give the pseudo-code (with arrays indexed from $1$), an execution step by step, and a <code>C++</code> implementation (with arrays indexed from $0$), together with its execution on the same inputs.

## 5.1 Change of base

In the chapter «Representation of numbers» we saw that a sequence of $k$ digits $(d_{k-1} \dots d_1 d_0)_b$ in base $b$ represents the natural number $\sum_{i=0}^{k-1} d_i \, b^i$, and that $\lfloor \log_b n \rfloor + 1$ digits are needed to write a natural number $n \ge 1$ in base $b$. In this section we solve the inverse problem: given $n$ in base ten, we compute its digits in base $b$.

### 5.1.1 Division with remainder

<a id="box-1-ch6-defDivision"></a>

!!! definizione "Definition 5.1: division with remainder"

    Given a natural number $n$ and a natural number $b \ge 1$, the <strong>division with remainder</strong> (or Euclidean division) of $n$ by $b$ computes the two natural numbers $q$ and $r$ such that

    $$
    n = q \; b + r \qquad \text{with} \qquad 0 \le r < b .
    $$

    The number $n$ is called the <strong>dividend</strong>, $b$ the <strong>divisor</strong>, $q$ the <strong>quotient</strong> and $r$ the <strong>remainder</strong>. The two numbers $q$ and $r$ are unique, and we write

    $$
    q = \lfloor n / b \rfloor \qquad \text{and} \qquad r = n \bmod b .
    $$

The key fact behind the change of base is that one division by $b$ extracts the least significant digit of $n$ in base $b$, and leaves as quotient the number formed by the remaining digits.

<a id="box-2-ch6-obsLastDigit"></a>

!!! teorema "Observation 5.2"

    Let $n \ge 1$ be a natural number whose representation in base $b \ge 2$ is $(d_{k-1} \dots d_1 d_0)_b$. Then

    $$
    n \bmod b = d_0
    \qquad \text{and} \qquad
    \lfloor n / b \rfloor = \sum_{i=1}^{k-1} d_i \, b^{i-1} = (d_{k-1} \dots d_1)_b ,
    $$

    where the quotient is $0$ if $k = 1$.

??? dimostrazione "Proof"

    Collecting the factor $b$ from all the terms with $i \ge 1$, we obtain

    $$
    n = \sum_{i=0}^{k-1} d_i \, b^i = \Big( \sum_{i=1}^{k-1} d_i \, b^{i-1} \Big) \, b + d_0 .
    $$

    Since $d_0$ is a digit in base $b$, we have $0 \le d_0 < b$. By the uniqueness of the quotient and of the remainder of the division with remainder, the quotient of $n$ divided by $b$ is $\sum_{i=1}^{k-1} d_i \, b^{i-1}$ and the remainder is $d_0$. <span class="qed">□</span>

!!! chiave ""

    Dividing $n$ by $b$, the remainder is the least significant digit $d_0$, and the quotient is the number written with the other digits $(d_{k-1} \dots d_1)_b$. Dividing the quotient again by $b$ gives $d_1$, and so on: repeating the division until the quotient is $0$ produces all the digits of $n$ in base $b$, from the least significant to the most significant one, in exactly $\lfloor \log_b n \rfloor + 1$ divisions.

### 5.1.2 The algorithm

!!! chiave ""

    Given a natural number $n>0$ represented in base 10 (decimal) and a target base $b \geq 2$, we consider the problem of converting $n$ to base $b$.

- Pseudo-code of the algorithm to convert sequences of digits from base ten into base $b$:

!!! algoritmo "Algorithm: ChangeOfBase"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> (in base 10) and a base <span class="arithmatex">&#92;(b &#92;ge 2&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>An array <span class="arithmatex">&#92;(d&#91;1..nd&#93;&#92;)</span> of digits in base <span class="arithmatex">&#92;(b&#92;)</span> and the number of digits <span class="arithmatex">&#92;(nd&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ChangeOfBase(n, b)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(nd&#92;)</span> := <span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;b n &#92;rfloor + 1&#92;)</span></span><span class="pc-c">// Number of digits needed</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d&#92;)</span> := new array<span class="arithmatex">&#92;(&#91;1..nd&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(k&#92;)</span> := <span class="arithmatex">&#92;(1&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(n &gt; 0&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(q&#92;)</span> := <span class="arithmatex">&#92;(&#92;lfloor n / b &#92;rfloor&#92;)</span></span><span class="pc-c">// Quotient</span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(r&#92;)</span> := <span class="arithmatex">&#92;(n &#92;bmod b&#92;)</span></span><span class="pc-c">// Remainder (digit in base <span class="arithmatex">&#92;(b&#92;)</span>)</span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d&#91;k&#93;&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(r&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(n&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(q&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(k&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(k + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(d, nd&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- <strong>Explanation:</strong>

    - The algorithm calculates the number of digits $nd$ needed to represent $n$ in base $b$ using the formula $\lfloor \log_b n \rfloor + 1$.

    - It initializes an array $d[1..nd]$ to store the digits and a counter $k$ to track the current position.

    - The main loop repeatedly divides $n$ by $b$ to extract the digits from right to left (from the least significant to the most significant one).

    - At each iteration, the remainder $r = n \bmod b$ gives the next digit, which is stored in $d[k]$.

    - The quotient $q = \lfloor n / b \rfloor$ becomes the new value of $n$ for the next iteration.

    - The algorithm terminates when $n = 0$, returning the array $d$ and the total number of digits $nd$.

    - The digits in $d$ are stored in reverse order: the entry $d[k]$ is the digit $d_{k-1}$ of weight $b^{k-1}$, so $d[1] = d_0$ is the least significant digit (rightmost) and $d[nd] = d_{nd-1}$ is the most significant digit (leftmost).

<a id="box-3-ch6-exConversion"></a>

!!! esempio "Example 5.1: conversion from base ten into base $b$"

    - Translation of $7$ into base $b=2$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration <span class="arithmatex">&#92;(k&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n/b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(q&#92;)</span></th>
        <th><span class="arithmatex">&#92;(r&#92;)</span></th>
        <th>digit</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $7$ in base $2$ is $(111)_{2}$, with $nd = \lfloor \log_{2} 7 \rfloor + 1 = 3$ digits.

    - Translation of $8$ into base $b=2$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration <span class="arithmatex">&#92;(k&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n/b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(q&#92;)</span></th>
        <th><span class="arithmatex">&#92;(r&#92;)</span></th>
        <th>digit</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;4&#93; = d&#95;{3}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $8$ in base $2$ is $(1000)_{2}$, with $nd = \lfloor \log_{2} 8 \rfloor + 1 = 4$ digits.

    - Translation of $25$ into base $b=3$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration <span class="arithmatex">&#92;(k&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n/b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(q&#92;)</span></th>
        <th><span class="arithmatex">&#92;(r&#92;)</span></th>
        <th>digit</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(25&#92;)</span></td>
        <td><span class="arithmatex">&#92;(25/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $25$ in base $3$ is $(221)_{3}$, with $nd = \lfloor \log_{3} 25 \rfloor + 1 = 3$ digits.

    - Translation of $100$ into base $b=8$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration <span class="arithmatex">&#92;(k&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n/b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(q&#92;)</span></th>
        <th><span class="arithmatex">&#92;(r&#92;)</span></th>
        <th>digit</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(100&#92;)</span></td>
        <td><span class="arithmatex">&#92;(100/8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12/8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $100$ in base $8$ is $(144)_{8}$, with $nd = \lfloor \log_{8} 100 \rfloor + 1 = 3$ digits.

### 5.1.3 <code>C++</code> implementation

- This is a <code>C++</code> implementation of the conversion algorithm from base ten into base $b$:

```cpp
// Convert a decimal number n to base b
// The function returns the number of digits nd in the result
// digits[i] stores the digit at position i (from right to left, starting at i=0)

int ChangeToBase(int n, int b, int *digits)
{
    int nd = 0;  // counter for the number of digits

    while (n > 0)
    {
        int q = n / b;  // quotient
        int r = n % b;  // remainder

        digits[nd] = r;  // store the digit at position nd
        n = q;           // update n to the quotient
        nd++;            // increment the counter
    }

    return nd;  // return the number of digits
}
```

- For two natural numbers <code>n</code> and <code>b</code> with <code>b</code> $\ge 1$, the <code>C++</code> operators <code>n / b</code> and <code>n % b</code> compute exactly the quotient $\lfloor n/b \rfloor$ and the remainder $n \bmod b$ of the division with remainder.

- The array <code>digits</code> is indexed from $0$: the entry <code>digits[i]</code> is the digit $d_i$ of weight $b^i$. The digit stored in the pseudo-code in $d[k]$ is stored in <code>C++</code> in <code>digits[k-1]</code>.

- The function does not compute $\lfloor \log_b n \rfloor + 1$: it counts the digits in the variable <code>nd</code> while it extracts them. This also avoids a subtle problem of floating point arithmetic: in double precision, <code>log(1000.0)/log(10.0)</code> evaluates to $2.9999999999999996$, so the formula would give $3$ digits instead of the $4$ digits of $(1000)_{10}$.

- The array <code>digits</code> must be declared by the caller with enough entries; for instance, $31$ entries are enough for every positive <code>int</code> (at most $2^{31}-1$) and every base $b \ge 2$.

<a id="box-4-ch6-exConversionCpp"></a>

!!! esempio "Example 5.2: execution of the <code>C++</code> function"

    Each row shows the values computed in one iteration of the while loop and the content of the array <code>digits</code> after the iteration (the entry just written is in blue; “–” denotes an entry not yet written).

    - Conversion of $n = 7$ into base $b = 2$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration</th>
        <th><code>q</code></th>
        <th><code>r</code></th>
        <th colspan="4"><code>digits</code></th>
        <th><code>n</code></th>
        <th><code>nd</code></th>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><code>[3]</code></td>
        <td><code>[2]</code></td>
        <td><code>[1]</code></td>
        <td><code>[0]</code></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>start</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>–</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        </table></div>

        The function returns <code>nd</code> $= 3$; reading <code>digits</code> from position <code>2</code> down to position <code>0</code> gives $(111)_{2}$.

    - Conversion of $n = 8$ into base $b = 2$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration</th>
        <th><code>q</code></th>
        <th><code>r</code></th>
        <th colspan="5"><code>digits</code></th>
        <th><code>n</code></th>
        <th><code>nd</code></th>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><code>[4]</code></td>
        <td><code>[3]</code></td>
        <td><code>[2]</code></td>
        <td><code>[1]</code></td>
        <td><code>[0]</code></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>start</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>–</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        </table></div>

        The function returns <code>nd</code> $= 4$; reading <code>digits</code> from position <code>3</code> down to position <code>0</code> gives $(1000)_{2}$.

    - Conversion of $n = 25$ into base $b = 3$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration</th>
        <th><code>q</code></th>
        <th><code>r</code></th>
        <th colspan="4"><code>digits</code></th>
        <th><code>n</code></th>
        <th><code>nd</code></th>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><code>[3]</code></td>
        <td><code>[2]</code></td>
        <td><code>[1]</code></td>
        <td><code>[0]</code></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>start</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(25&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td>–</td>
        <td class="cella-blu">2</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        </table></div>

        The function returns <code>nd</code> $= 3$; reading <code>digits</code> from position <code>2</code> down to position <code>0</code> gives $(221)_{3}$.

    - Conversion of $n = 100$ into base $b = 8$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration</th>
        <th><code>q</code></th>
        <th><code>r</code></th>
        <th colspan="4"><code>digits</code></th>
        <th><code>n</code></th>
        <th><code>nd</code></th>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><code>[3]</code></td>
        <td><code>[2]</code></td>
        <td><code>[1]</code></td>
        <td><code>[0]</code></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>start</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(100&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td>–</td>
        <td>–</td>
        <td class="cella-blu">4</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>–</td>
        <td class="cella-blu">1</td>
        <td>4</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        </table></div>

        The function returns <code>nd</code> $= 3$; reading <code>digits</code> from position <code>2</code> down to position <code>0</code> gives $(144)_{8}$.

!!! chiave ""

    <strong>Key points.</strong>

    - The remainder of the division of $n$ by $b$ is the least significant digit of $n$ in base $b$; the quotient is the number written with the other digits.

    - The algorithm performs one division for each digit: $\lfloor \log_b n \rfloor + 1$ iterations.

    - The digits are produced from the least significant to the most significant one, so the result is read backwards: from $d[nd]$ to $d[1]$ in the pseudo-code, from <code>digits[nd-1]</code> to <code>digits[0]</code> in <code>C++</code>.

## 5.2 Primality test

The change of base uses the remainder $n \bmod b$ to read a digit. A remainder equal to zero has a meaning of its own: it says that the division is exact, that is, that $b$ is a divisor of $n$. Counting divisors leads to the prime numbers.

<a id="box-5-ch6-defDivisor"></a>

!!! definizione "Definition 5.3: divisor"

    A natural number $d \ge 1$ is a <strong>divisor</strong> of a natural number $n$ if there exists a natural number $k$ such that $n = k \; d$:

    $$
    \text{$d$ is a divisor of $n$} \quad \Longleftrightarrow \quad \exists\, k \in \N,\ n = k \; d
    $$

    or equivalently, if $n \bmod d = 0$.

<a id="box-6-ch6-defPrime"></a>

!!! definizione "Definition 5.4: prime number"

    A natural number $n \ge 2$ is <strong>prime</strong> if its only divisors are $1$ and $n$ itself. A natural number $n \ge 2$ which is not prime is called <strong>composite</strong>: it has a divisor $d$ with $2 \le d \le n-1$. The numbers $0$ and $1$ are not prime.

!!! chiave ""

    Given a natural number $n$, we consider the problem of determining whether $n$ is a prime number.

### 5.2.1 A first algorithm

The definition suggests a direct algorithm: test, one by one, the candidate divisors of $n$ different from $1$ and $n$. The following observation shows that the candidates larger than $n/2$ can be skipped.

<a id="box-7-ch6-obsHalf"></a>

!!! teorema "Observation 5.5"

    For every natural number $n \ge 2$, if $d$ is a divisor of $n$ with $d < n$, then $d \le n/2$.

??? dimostrazione "Proof"

    Since $d$ is a divisor of $n$, there exists a natural number $k$ such that $n = k \; d$. Since $d < n$, we have $k \ge 2$, hence

    $$
    d = \frac{n}{k} \le \frac{n}{2} .
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- It follows that it suffices to check whether any natural number $d$ in $\{2, 3, \dots, \lfloor n/2 \rfloor\}$ is a divisor of $n$. If no such divisor exists, $n$ is prime.

- Pseudo-code of the Basic Primality Test algorithm:

!!! algoritmo "Algorithm: BasicPrimalityTest"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><code>true</code> if <span class="arithmatex">&#92;(n&#92;)</span> is prime, <code>false</code> otherwise</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> BasicPrimalityTest(n)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &lt; 2&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>false</code></span><span class="pc-c">// 0 and 1 are not prime</span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(d := 2&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(&#92;lfloor n/2 &#92;rfloor&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &#92;bmod d = 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>false</code></span><span class="pc-c">// <span class="arithmatex">&#92;(d&#92;)</span> divides <span class="arithmatex">&#92;(n&#92;)</span>: not prime</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>true</code></span><span class="pc-c">// No divisor found: <span class="arithmatex">&#92;(n&#92;)</span> is prime</span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- Explanation of the algorithm:

    - Numbers less than $2$ are not prime by definition.

    - The loop tests every candidate divisor $d$ from $2$ up to $\lfloor n/2 \rfloor$.

    - If $d$ is a divisor of $n$ (i.e., $n \bmod d = 0$), the function returns <code>false</code> immediately.

    - If the loop completes without finding a divisor, $n$ is prime and the function returns <code>true</code>.

- For a prime number the loop is executed completely: for $n = 29$ the algorithm tests the $13$ candidates $d = 2, 3, \dots, 14$. We now show that far fewer candidates are enough.

### 5.2.2 Testing the divisors up to $\sqrt{n}$

The divisors of a natural number come in pairs: $d$ and $n/d$. In each pair, one of the two numbers is at most $\sqrt{n}$.

<a id="box-8-ch6-obsPair"></a>

!!! teorema "Observation 5.6"

    For every natural number $n \ge 2$, if $d$ is a divisor of $n$ then $n/d$ is a divisor of $n$.

??? dimostrazione "Proof"

    If $d$ is a divisor of $n$, then there exists a natural number $k$ such that

    $$
    n = k \; d.
    $$

    Since $k = n/d$, it follows that $n/d$ is a natural number. Accordingly,

    $$
    n = d \left(\frac{n}{d}\right),
    $$

    so $n/d$ is also a divisor of $n$. <span class="qed">□</span>

<a id="box-9-ch6-obsSqrt"></a>

!!! teorema "Observation 5.7"

    For every natural number $n \ge 2$, if $d > \sqrt{n}$ then $n/d < \sqrt{n}$.

??? dimostrazione "Proof"

    If $d > \sqrt{n}$, dividing $n$ by both sides of this inequality, we obtain

    $$
    \frac{n}{d} < \frac{n}{\sqrt{n}} = \sqrt{n}.
    $$

    Therefore, $n/d$ is smaller than $\sqrt{n}$. <span class="qed">□</span>

<a id="box-10-ch6-corSqrt"></a>

!!! teorema "Corollary 5.8"

    Every composite natural number $n \ge 2$ has a divisor $d$ with $2 \le d \le \lfloor \sqrt{n} \rfloor$. Equivalently, a natural number $n \ge 2$ is prime if and only if no natural number in $\{2, 3, \dots, \lfloor \sqrt{n} \rfloor\}$ is a divisor of $n$.

??? dimostrazione "Proof"

    Since $n$ is composite, it has a divisor $d$ with $2 \le d \le n-1$. If $d \le \sqrt{n}$, then $d \le \lfloor \sqrt{n} \rfloor$, because $d$ is a natural number, and we are done. Otherwise $d > \sqrt{n}$: by the two previous observations, $n/d$ is a divisor of $n$ with $n/d < \sqrt{n}$, and $n/d \ge 2$ because $d < n$. Hence $n/d$ is a divisor of $n$ with $2 \le n/d \le \lfloor \sqrt{n} \rfloor$. <span class="qed">□</span>

!!! chiave ""

    From the previous observations, we know that for every natural number $n \ge 2$, if $d > \sqrt{n}$ is a divisor of $n$, then $n/d$ is also a divisor of $n$ and $n/d < \sqrt{n}$. It follows that every divisor of $n$ greater than $\sqrt{n}$ is paired with a divisor of $n$ smaller than $\sqrt{n}$. Therefore, if $n$ has any divisor at all (other than $1$ and $n$), at least one of them must be $\le \sqrt{n}$.

<a id="box-11-ch6-exPairs"></a>

!!! esempio "Example 5.3: illustration of the property"

    Let us consider $n = 36$: $\sqrt{36} = 6$. The divisors of $36$ other than $1$ and $36$ are $2, 3, 4, 6, 9, 12, 18$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>divisor <span class="arithmatex">&#92;(d &gt; &#92;sqrt{36}&#92;)</span></th>
    <th>paired divisor <span class="arithmatex">&#92;(36/d &lt; &#92;sqrt{36}&#92;)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    <td><span class="arithmatex">&#92;(36/9  = 4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    <td><span class="arithmatex">&#92;(36/12 = 3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(18&#92;)</span></td>
    <td><span class="arithmatex">&#92;(36/18 = 2&#92;)</span></td>
    </tr>
    </table></div>

    Every divisor $> 6$ is paired with a divisor $< 6$; the divisor $6 = \sqrt{36}$ is paired with itself.

- By the corollary, the loop of the basic algorithm can stop at $\lfloor \sqrt{n} \rfloor$ instead of $\lfloor n/2 \rfloor$.

- Pseudo-code of the Primality Test algorithm:

!!! algoritmo "Algorithm: PrimalityTest"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><code>true</code> if <span class="arithmatex">&#92;(n&#92;)</span> is prime, <code>false</code> otherwise</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> PrimalityTest(n)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &lt; 2&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>false</code></span><span class="pc-c">// 0 and 1 are not prime</span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d := 2&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(d &#92;le &#92;lfloor&#92;sqrt{n}&#92;rfloor&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &#92;bmod d = 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>false</code></span><span class="pc-c">// <span class="arithmatex">&#92;(d&#92;)</span> divides <span class="arithmatex">&#92;(n&#92;)</span>: not prime</span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d &#92;leftarrow d + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>true</code></span><span class="pc-c">// No divisor found: <span class="arithmatex">&#92;(n&#92;)</span> is prime</span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- Explanation of the algorithm:

    - Numbers less than $2$ are not prime by definition.

    - The loop tests every candidate divisor $d$ from $2$ up to $\lfloor\sqrt{n}\rfloor$.

    - If $d$ divides $n$ (i.e., $n \bmod d = 0$), the function returns <code>false</code> immediately.

    - If the loop completes without finding a divisor, then, by the corollary, $n$ is prime and the function returns <code>true</code>.

    - For $n = 2$ and $n = 3$ we have $\lfloor \sqrt{n} \rfloor = 1 < 2$: the loop is not executed and the function returns <code>true</code>.

<a id="box-12-ch6-exPrimality"></a>

!!! esempio "Example 5.4: primality test"

    - Check $n = 36$: $\lfloor\sqrt{36}\rfloor = 6$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(36 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>36 is not prime</strong> (<span class="arithmatex">&#92;(36 = 2 &#92;cdot 18&#92;)</span>).</td>
        </tr>
        </table></div>

    - Check $n = 29$: $\lfloor\sqrt{29}\rfloor = 5$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(29 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>29 is prime</strong>.</td>
        </tr>
        </table></div>

    - Check $n = 25$: $\lfloor\sqrt{25}\rfloor = 5$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(25 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>25 is not prime</strong> (<span class="arithmatex">&#92;(25 = 5 &#92;cdot 5&#92;)</span>).</td>
        </tr>
        </table></div>

    For the prime number $29$ the algorithm tests $4$ candidates, while the basic algorithm tests $13$.

### 5.2.3 <code>C++</code> implementation

- This is a <code>C++</code> implementation of the Primality Test algorithm:

```cpp
// Returns true if n is prime, false otherwise

bool PrimalityTest(int n)
{
    if (n < 2)
    {
        return false;  // 0 and 1 are not prime
    }

    for (int d = 2; d <= (int)sqrt((double)n); d++)
    {
        if (n % d == 0)
        {
            return false;  // d divides n: not prime
        }
    }

    return true;  // No divisor found: n is prime
}
```

- The function <code>sqrt</code> of the header <code>cmath</code> works on floating point numbers: the cast <code>(double)</code> converts <code>n</code> to a floating point number, and the cast <code>(int)</code> truncates the square root, so the test compares <code>d</code> with $\lfloor \sqrt{n} \rfloor$.

- The while loop of the pseudo-code becomes a for loop: the initialization <code>d = 2</code>, the test on <code>d</code> and the increment <code>d++</code> are written in its header.

<a id="box-13-ch6-exPrimalityCpp"></a>

!!! esempio "Example 5.5: execution of the <code>C++</code> function"

    The function executes, on the three numbers of the previous example, the same tests:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><code>n</code></th>
    <th><code>(int)sqrt((double)n)</code></th>
    <th>values of <code>d</code> tested</th>
    <th>returned value</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(36&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span> (with <code>36 % 2 == 0</code>)</td>
    <td><code>false</code>: <span class="arithmatex">&#92;(36&#92;)</span> is not prime</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(29&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2, 3, 4, 5&#92;)</span> (no remainder is <span class="arithmatex">&#92;(0&#92;)</span>)</td>
    <td><code>true</code>: <span class="arithmatex">&#92;(29&#92;)</span> is prime</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(25&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2, 3, 4, 5&#92;)</span> (with <code>25 % 5 == 0</code>)</td>
    <td><code>false</code>: <span class="arithmatex">&#92;(25&#92;)</span> is not prime</td>
    </tr>
    </table></div>

    For $n = 29$, after the iteration with <code>d = 5</code> the increment gives <code>d = 6</code>, the test $6 \le 5$ is false and the loop ends.

!!! chiave ""

    <strong>Key points.</strong>

    - The divisors of $n$ come in pairs $d$ and $n/d$, and in each pair one of the two numbers is at most $\sqrt{n}$.

    - Hence $n \ge 2$ is prime if and only if no natural number in $\{2, 3, \dots, \lfloor \sqrt{n} \rfloor\}$ divides it.

    - The Primality Test executes at most $\lfloor \sqrt{n} \rfloor - 1$ iterations, instead of the $\lfloor n/2 \rfloor - 1$ iterations of the basic algorithm.

## 5.3 Sieve of Eratosthenes

The Primality Test answers the question for one number. When we need all the prime numbers up to $n$, calling it on $2, 3, \dots, n$ repeats many divisions; the sieve works the other way around: instead of searching for the divisors of each number, it crosses out the multiples of each prime.

!!! chiave ""

    Given a natural number $n$, we consider the problem of determining all prime numbers smaller than or equal to $n$.

- The <strong>Sieve of Eratosthenes</strong> is an ancient algorithm (attributed to the Greek mathematician Eratosthenes of Cyrene, c. 276–194 BC) that computes all prime numbers up to a natural number $n$.

- The key idea is to start with all natural numbers from $2$ to $n$ marked as potentially prime, and then iteratively mark the multiples of each prime as composite.

<a id="box-14-ch6-defMultiple"></a>

!!! definizione "Definition 5.9: multiple"

    A natural number $m$ is a <strong>multiple</strong> of a natural number $p \ge 1$ if there exists a natural number $k$ such that $m = k \; p$:

    $$
    \text{$m$ is a multiple of $p$} \quad \Longleftrightarrow \quad \exists\, k \in \N,\ m = k \; p
    $$

    or equivalently, if $m \bmod p = 0$.

The first observation tells where the marking of the multiples of $p$ can start.

<a id="box-15-ch6-obsSieveStart"></a>

!!! teorema "Observation 5.10"

    For every natural number $p \ge 2$, if a natural number $m$ is a multiple of $p$ with $p < m < p^2$, then $m$ has a divisor $d$ with $2 \le d < p$.

??? dimostrazione "Proof"

    Since $m$ is a multiple of $p$, there exists a natural number $d$ such that $m = d \; p$. Then $d$ is a divisor of $m$.

    Moreover, since $m > p$ and $m = d \; p$, we have $d \ge 2$. Since $m < p^2$ and $m = d \; p$, we have $d < p$. Hence $2 \le d < p$. <span class="qed">□</span>

!!! chiave ""

    From the previous observation, for every prime $p$ and every multiple $m$ of $p$ with $p < m < p^2$, the number $m$ has a divisor $d$ with $2 \le d < p$. Hence $m$ also has a prime divisor $q$ with $2 \le q < p$, and was therefore already marked as composite when $q$ was processed. Thus, when marking the multiples of $p$, one can start with $p^2$.

<a id="box-16-ch6-exSieveStart"></a>

!!! esempio "Example 5.6: illustration of the property"

    Let $p = 5$. Its multiples between $p$ and $p^2 = 25$ are $m = 10, 15, 20$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>multiple <span class="arithmatex">&#92;(m&#92;)</span></th>
    <th><span class="arithmatex">&#92;(m = d &#92;cdot p&#92;)</span></th>
    <th>divisor <span class="arithmatex">&#92;(d &lt; p&#92;)</span></th>
    <th>already marked when</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10 = 2 &#92;cdot 5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(p = 2&#92;)</span> (from <span class="arithmatex">&#92;(j = 4&#92;)</span>, step <span class="arithmatex">&#92;(2&#92;)</span>)</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(15&#92;)</span></td>
    <td><span class="arithmatex">&#92;(15 = 3 &#92;cdot 5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(d = 3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(p = 3&#92;)</span> (from <span class="arithmatex">&#92;(j = 9&#92;)</span>, step <span class="arithmatex">&#92;(3&#92;)</span>)</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(20&#92;)</span></td>
    <td><span class="arithmatex">&#92;(20 = 4 &#92;cdot 5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(d = 4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(p = 2&#92;)</span> (from <span class="arithmatex">&#92;(j = 4&#92;)</span>, step <span class="arithmatex">&#92;(2&#92;)</span>)</td>
    </tr>
    </table></div>

    The number $20$ has the divisor $d = 4$, which is not prime, and also the prime divisor $2$, which marked it. The next multiple is $25 = 5 \cdot 5 = p^2$, which has not been marked by any previous prime number. Therefore, for $p = 5$, one can start marking numbers from $25$.

The second observation tells where the outer loop over $p$ can stop.

<a id="box-17-ch6-obsSieveStop"></a>

!!! teorema "Observation 5.11"

    For every natural number $n \ge 2$, every composite natural number $m \le n$ has a prime divisor $q$ with $q \le \lfloor \sqrt{n} \rfloor$.

??? dimostrazione "Proof"

    By the corollary of the section «Primality test», $m$ has a divisor $d$ with $2 \le d \le \lfloor \sqrt{m} \rfloor \le \lfloor \sqrt{n} \rfloor$. Let $q$ be the smallest divisor of $m$ with $q \ge 2$; then $q \le d \le \lfloor \sqrt{n} \rfloor$. The number $q$ is prime: if $q$ had a divisor $c$ with $2 \le c < q$, then $c$ would also be a divisor of $m$ (from $q = k_1 c$ and $m = k_2 q$ we get $m = k_2 k_1 c$), against the choice of $q$ as the smallest one. <span class="qed">□</span>

- Hence, after the multiples of all the primes $p \le \lfloor \sqrt{n} \rfloor$ have been marked, every composite number up to $n$ is marked, and the outer loop can stop.

- Pseudo-code of the Sieve of Eratosthenes:

!!! algoritmo "Algorithm: SieveOfEratosthenes"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>A boolean array <span class="arithmatex">&#92;(prime&#91;1..n&#93;&#92;)</span> where <span class="arithmatex">&#92;(prime&#91;i&#93; = 1&#92;)</span> if and only if <span class="arithmatex">&#92;(i&#92;)</span> is prime</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> SieveOfEratosthenes(<span class="arithmatex">&#92;(n&#92;)</span>)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(prime := &#92;text{new array}&#91;1..n&#93;&#92;)</span></span><span class="pc-c">// declare boolean array</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(prime &#92;leftarrow 1&#92;)</span></span><span class="pc-c">// initialize all entries to 1</span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(prime&#91;1&#93; &#92;leftarrow 0&#92;)</span></span><span class="pc-c">// 1 is not prime</span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(p := 2&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(p &#92;le &#92;lfloor&#92;sqrt{n}&#92;rfloor&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(prime&#91;p&#93; = 1&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := p^2&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(prime&#91;j&#93; &#92;leftarrow 0&#92;)</span></span><span class="pc-c">// <span class="arithmatex">&#92;(j&#92;)</span> not prime</span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j &#92;leftarrow j + p&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(p &#92;leftarrow p + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">16</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(prime&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">17</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- Explanation of the algorithm:

    - The array $prime$ is declared and all entries initialized to $1$; the entry $prime[1]$ is immediately set to $0$, since $1$ is not prime.

    - The outer loop iterates over each candidate prime $p$ from $2$ up to $\lfloor\sqrt{n}\rfloor$.

    - If $prime[p] = 1$, then $p$ is prime (a composite $p$ would have been marked by its smallest prime divisor), and all its multiples starting from $p^2$ are set to $0$.

    - The inner loop starts at $p^2$ because all smaller multiples $2p, 3p, \ldots, (p{-}1)p$ have already been set to $0$ when processing the smaller primes $2, 3, 5, 7, \ldots$.

    - After the execution of the algorithm, $prime[i] = 1$ if and only if $i$ is prime.

<a id="box-18-ch6-exSieve10"></a>

!!! esempio "Example 5.7: Sieve of Eratosthenes ($n=10$)"

    With $n=10$ ($\lfloor\sqrt{10}\rfloor = 3$), each row shows the state of the array $prime[1..10]$ after the assignment $prime[j] \leftarrow 0$. Blue cells indicate entries just set to $0$; red cells indicate the current value of $p$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th></th>
    <th></th>
    <th colspan="10"><span class="arithmatex">&#92;(prime&#91;1..10&#93;&#92;)</span></th>
    <th></th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(p&#92;)</span></td>
    <td><span class="arithmatex">&#92;(j&#92;)</span></td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <td>10</td>
    <td>action</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-&#92;)</span></td>
    <td><span class="arithmatex">&#92;(-&#92;)</span></td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>initialization</td>
    </tr>
    <tr>
    <td class="cella-rossa">2</td>
    <td>4</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;4&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>6</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;6&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>8</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;8&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>10</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td><span class="arithmatex">&#92;(prime&#91;10&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>12</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">&#92;(j = 12 &gt; 10&#92;)</span>: stop</td>
    </tr>
    <tr>
    <td class="cella-rossa">3</td>
    <td>9</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td class="cella-blu">0</td>
    <td>0</td>
    <td><span class="arithmatex">&#92;(prime&#91;9&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>12</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">&#92;(j = 12 &gt; 10&#92;)</span>: stop</td>
    </tr>
    <tr>
    <td colspan="13">Outer loop ends: <span class="arithmatex">&#92;(p = 4 &gt; &#92;lfloor&#92;sqrt{10}&#92;rfloor = 3&#92;)</span>.</td>
    </tr>
    </table></div>

    <strong>Result:</strong> the prime numbers $\le 10$ are $2,\ 3,\ 5,\ 7$.

<a id="box-19-ch6-exSieve20"></a>

!!! esempio "Example 5.8: Sieve of Eratosthenes ($n=20$)"

    With $n=20$ ($\lfloor\sqrt{20}\rfloor = 4$), each row shows the state of the array $prime[1..20]$ after the assignment $prime[j] \leftarrow 0$. Blue cells: entry just set to $0$; red cells: current value of $p$. When the entry is already $0$, the assignment does not change the array.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th></th>
    <th></th>
    <th colspan="20"><span class="arithmatex">&#92;(prime&#91;1..20&#93;&#92;)</span></th>
    <th></th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(p&#92;)</span></td>
    <td><span class="arithmatex">&#92;(j&#92;)</span></td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <td>10</td>
    <td>11</td>
    <td>12</td>
    <td>13</td>
    <td>14</td>
    <td>15</td>
    <td>16</td>
    <td>17</td>
    <td>18</td>
    <td>19</td>
    <td>20</td>
    <td>action</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-&#92;)</span></td>
    <td><span class="arithmatex">&#92;(-&#92;)</span></td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>initialization</td>
    </tr>
    <tr>
    <td class="cella-rossa">2</td>
    <td>4</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;4&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>6</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;6&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>8</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;8&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>10</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;10&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>12</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>14</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;14&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>16</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;16&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>18</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td>1</td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(prime&#91;18&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>20</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td class="cella-blu">0</td>
    <td><span class="arithmatex">&#92;(prime&#91;20&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>22</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">&#92;(j = 22 &gt; 20&#92;)</span>: stop</td>
    </tr>
    <tr>
    <td class="cella-rossa">3</td>
    <td>9</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td class="cella-blu">0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td><span class="arithmatex">&#92;(prime&#91;9&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>12</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span> (already <span class="arithmatex">&#92;(0&#92;)</span>)</td>
    </tr>
    <tr>
    <td></td>
    <td>15</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td class="cella-blu">0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td><span class="arithmatex">&#92;(prime&#91;15&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>18</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td><span class="arithmatex">&#92;(prime&#91;18&#93; &#92;leftarrow 0&#92;)</span> (already <span class="arithmatex">&#92;(0&#92;)</span>)</td>
    </tr>
    <tr>
    <td></td>
    <td>21</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">&#92;(j = 21 &gt; 20&#92;)</span>: stop</td>
    </tr>
    <tr>
    <td class="cella-rossa">4</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">&#92;(prime&#91;4&#93; = 0&#92;)</span>: skip</td>
    </tr>
    <tr>
    <td colspan="23">Outer loop ends: <span class="arithmatex">&#92;(p = 5 &gt; &#92;lfloor&#92;sqrt{20}&#92;rfloor = 4&#92;)</span>.</td>
    </tr>
    </table></div>

    <strong>Result:</strong> the prime numbers $\le 20$ are $2,\ 3,\ 5,\ 7,\ 11,\ 13,\ 17,\ 19$.

### 5.3.1 <code>C++</code> implementation

- This is a <code>C++</code> implementation of the Sieve of Eratosthenes:

```cpp
// the input array is supposed to be already declared with n+1 entries
// and initialized to 1, and n is at least 2
int SieveOfEratosthenes(int n, int *prime)
{
    prime[0] = 0;
    prime[1] = 0;

    for (int p = 2; p <= (int)sqrt((double)n); p++)
    {
        if (prime[p] == 1)
        {
            // Mark multiples of p starting from p*p
            for (int j = p * p; j <= n; j += p)
            {
                prime[j] = 0;  // j is not prime
            }
        }
    }

    return 1;
}
```

- In <code>C++</code> the array is indexed from $0$. To keep the entry <code>prime[i]</code> associated with the number $i$, the array has $n+1$ entries, <code>prime[0..n]</code>; the extra entry <code>prime[0]</code> refers to the number $0$, which is not prime, and is set to $0$.

- The two while loops of the pseudo-code become two for loops; the inner one advances with <code>j += p</code>.

<a id="box-20-ch6-exSieveCpp"></a>

!!! esempio "Example 5.9: execution of the <code>C++</code> function"

    Each row shows the array <code>prime[0..n]</code> at the end of an iteration of the outer loop, with the values of <code>j</code> of its inner loop; the entries changed in that iteration are in blue.

    - Execution for $n = 10$ (<code>(int)sqrt((double)10)</code> $= 3$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th colspan="11"><code>prime[0..10]</code></th>
        </tr>
        <tr>
        <td><code>p</code></td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        </tr>
        <tr>
        <td>start</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        </tr>
        </table></div>

        Values of <code>j</code> in the inner loop: for <code>p = 2</code>: <code>j</code> $= 4, 6, 8, 10$; for <code>p = 3</code>: <code>j</code> $= 9$.

    - Execution for $n = 20$ (<code>(int)sqrt((double)20)</code> $= 4$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th colspan="21"><code>prime[0..20]</code></th>
        </tr>
        <tr>
        <td><code>p</code></td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        </tr>
        <tr>
        <td>start</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td class="cella-blu">0</td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        </tr>
        <tr>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        </tr>
        </table></div>

        Values of <code>j</code> in the inner loop: for <code>p = 2</code>: <code>j</code> $= 4, 6, 8, 10, 12, 14, 16, 18, 20$; for <code>p = 3</code>: <code>j</code> $= 9, 12, 15, 18$; for <code>p = 4</code>: no inner loop, since <code>prime[4]</code> is $0$.

    The entries equal to $1$ at the end are those of the prime numbers: $2,\ 3,\ 5,\ 7$ for $n = 10$, and $2,\ 3,\ 5,\ 7,\ 11,\ 13,\ 17,\ 19$ for $n = 20$.

!!! chiave ""

    <strong>Key points.</strong>

    - The sieve does not divide: it marks as composite the multiples of each prime $p$.

    - The marking of the multiples of $p$ starts at $p^2$: the smaller multiples have a smaller prime divisor and are already marked.

    - The outer loop stops at $\lfloor \sqrt{n} \rfloor$: every composite number up to $n$ has a prime divisor not larger than $\lfloor \sqrt{n} \rfloor$.

## 5.4 Greatest common divisor

The last algorithm of the chapter deals with two numbers at once: we look for the divisors they have in common.

<a id="box-21-ch6-defGCD"></a>

!!! definizione "Definition 5.12: common divisor and greatest common divisor"

    Let $n, m$ be two natural numbers with $n, m \ge 1$.

    - A natural number $d \ge 1$ is a <strong>common divisor</strong> of $n$ and $m$ if $d$ is a divisor of both $n$ and $m$, that is, if there exist natural numbers $k_1, k_2$ such that

        $$
        n = k_1 \; d \qquad \text{and} \qquad m = k_2 \; d.
        $$

        Equivalently, $n \bmod d = 0$ and $m \bmod d = 0$.

    - The <strong>greatest common divisor</strong> of $n$ and $m$, denoted $\gcd(n, m)$, is the largest common divisor of $n$ and $m$.

- The greatest common divisor always exists: $1$ is a common divisor, and every common divisor is at most $\min\{n, m\}$.

- For instance, the common divisors of $48$ and $18$ are $1, 2, 3, 6$, hence $\gcd(48, 18) = 6$.

!!! chiave ""

    Given two natural numbers $n, m$ with $n, m \ge 1$, we consider the problem of computing their greatest common divisor.

The following observation replaces the pair $(n, m)$ with a pair of smaller numbers which has the same greatest common divisor.

<a id="box-22-ch6-obsEuclid"></a>

!!! teorema "Observation 5.13"

    For every pair of natural numbers $n \ge 1$ and $m \ge 1$,

    $$
    \gcd(n, m) = \gcd(m,\ n \bmod m).
    $$

??? dimostrazione "Proof"

    Let $q = \lfloor n/m \rfloor$, so that $n = q m + (n \bmod m)$.

    Let $d_1$ be a common divisor of $n$ and $m$. Then there exist natural numbers $k_1, k_2$ such that

    $$
    n = k_1 d_1 \qquad \text{and} \qquad m = k_2 d_1.
    $$

    Since $n \bmod m = n - qm$, we obtain

    $$
    n \bmod m = (k_1 - qk_2)\,d_1,
    $$

    where $k_1 - q k_2 \ge 0$ because $n \bmod m \ge 0$. So $d_1$ is also a divisor of $n \bmod m$. Hence $d_1$ is a common divisor of $m$ and $n \bmod m$.

    Conversely, let $d_2$ be a common divisor of $m$ and $n \bmod m$. Then there exist natural numbers $k_1, k_2$ such that

    $$
    m = k_1 d_2 \qquad \text{and} \qquad n \bmod m = k_2 d_2.
    $$

    Since $n = qm + (n \bmod m)$, we obtain

    $$
    n = (qk_1 + k_2)\,d_2,
    $$

    so $d_2$ is also a divisor of $n$. Hence $d_2$ is a common divisor of $n$ and $m$.

    Therefore, $n$ and $m$ have exactly the same common divisors as $m$ and $n \bmod m$, and hence

    $$
    \gcd(n,m)=\gcd(m,\,n \bmod m).
    $$

    In the right-hand side, $\gcd(m, 0)$ is understood as the largest divisor of $m$ (every $d \ge 1$ divides $0 = 0 \cdot d$), that is, $m$ itself. <span class="qed">□</span>

### 5.4.1 Euclidean algorithm

- The <strong>Euclidean algorithm</strong> (attributed to the ancient Greek mathematician Euclid, c. 300 BC) computes $\gcd(n, m)$ efficiently by repeatedly replacing the pair $(n,m)$ with $(m,\ n \bmod m)$.

- The algorithm does not need $n \ge m$: if $n < m$, then $n \bmod m = n$, and the first replacement simply swaps the two numbers, turning $(n, m)$ into $(m, n)$.

!!! chiave ""

    - From the previous observation, replacing $(n,m)$ with $(m,\ n \bmod m)$ does not change the greatest common divisor.

    - Since $n \bmod m < m$, the second argument strictly decreases at each replacement.

    - Therefore, the algorithm terminates when the remainder becomes $0$; at that point, the greatest common divisor is the other argument:

        $$
        \gcd(n,0)=n.
        $$

- Pseudo-code of the Euclidean algorithm:

!!! algoritmo "Algorithm: EuclideanAlgorithm"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(n, m &#92;ge 1&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><span class="arithmatex">&#92;(&#92;gcd(n, m)&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> EuclideanAlgorithm(<span class="arithmatex">&#92;(n&#92;)</span>, <span class="arithmatex">&#92;(m&#92;)</span>)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(m &#92;ne 0&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(r := n &#92;bmod m&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(n &#92;leftarrow m&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m &#92;leftarrow r&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(n&#92;)</span></span><span class="pc-c">// <span class="arithmatex">&#92;(m = 0&#92;)</span>: <span class="arithmatex">&#92;(n&#92;)</span> is the GCD</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- Explanation of the algorithm:

    - At each step, $(n, m)$ is replaced by $(m,\ n \bmod m)$.

    - By the previous observation, this replacement preserves the value of $\gcd(n,m)$: denoting by $n_0$ and $m_0$ the input values, at every iteration $\gcd(n, m) = \gcd(n_0, m_0)$.

    - Since $n \bmod m < m$, the value of $m$ strictly decreases at every iteration, so the algorithm terminates.

    - When $m = 0$, the equality $\gcd(n, m) = \gcd(n_0, m_0)$ together with $\gcd(n, 0) = n$ gives the result.

<a id="box-23-ch6-exGCD"></a>

!!! esempio "Example 5.10: GCD computation"

    - Compute $\gcd(48, 18)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>step</th>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(m&#92;)</span></th>
        <th><span class="arithmatex">&#92;(r = n &#92;bmod m&#92;)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(48&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        <td><span class="arithmatex">&#92;(48 &#92;bmod 18 = 12&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18 &#92;bmod 12 = 6&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12 &#92;bmod 6 = 0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>— (loop ends)</td>
        </tr>
        </table></div>

        <strong>Result:</strong> $\gcd(48, 18) = 6$.

    - Compute $\gcd(252, 105)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>step</th>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(m&#92;)</span></th>
        <th><span class="arithmatex">&#92;(r = n &#92;bmod m&#92;)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(252&#92;)</span></td>
        <td><span class="arithmatex">&#92;(105&#92;)</span></td>
        <td><span class="arithmatex">&#92;(252 &#92;bmod 105 = 42&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(105&#92;)</span></td>
        <td><span class="arithmatex">&#92;(42&#92;)</span></td>
        <td><span class="arithmatex">&#92;(105 &#92;bmod 42 = 21&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(42&#92;)</span></td>
        <td><span class="arithmatex">&#92;(21&#92;)</span></td>
        <td><span class="arithmatex">&#92;(42 &#92;bmod 21 = 0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(21&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>— (loop ends)</td>
        </tr>
        </table></div>

        <strong>Result:</strong> $\gcd(252, 105) = 21$.

### 5.4.2 Coprimality

<a id="box-24-ch6-defCoprime"></a>

!!! definizione "Definition 5.14: coprime numbers"

    Two natural numbers $n, m \ge 1$ are said to be <strong>coprime</strong> (or <strong>relatively prime</strong>) if they share no common divisor other than $1$:

    $$
    n \text{ and } m \text{ are coprime} \quad\Longleftrightarrow\quad \gcd(n, m) = 1 .
    $$

- Since the Euclidean algorithm computes $\gcd(n,m)$, to test coprimality it suffices to call the algorithm and check whether the result is equal to $1$.

<a id="box-25-ch6-exCoprime"></a>

!!! esempio "Example 5.11: coprimality test"

    - Compute $\gcd(35, 12)$: the Euclidean algorithm returns $1$. Therefore, $35$ and $12$ are <strong>coprime</strong>.

    - Compute $\gcd(48, 18)$: the Euclidean algorithm returns $6$. Therefore, $48$ and $18$ are <strong>not coprime</strong>.

### 5.4.3 <code>C++</code> implementation

- This is a <code>C++</code> implementation of the Euclidean algorithm:

```cpp
int EuclideanAlgorithm(int n, int m)
{
    while (m != 0)
    {
        int r = n % m;
        n = m;
        m = r;
    }
    return n;  // m == 0: n is the GCD
}
```

- The parameters <code>n</code> and <code>m</code> are passed by value: the function modifies its own copies, and the variables of the caller keep their values.

<a id="box-26-ch6-exGCDCpp"></a>

!!! esempio "Example 5.12: execution of the <code>C++</code> function"

    Each row shows the test of the while loop, the remainder computed and the values of <code>n</code> and <code>m</code> at the end of the iteration (in blue).

    - Execution for <code>n = 48</code>, <code>m = 18</code>:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration</th>
        <th>test <code>m != 0</code></th>
        <th><code>r = n % m</code></th>
        <th><code>n</code></th>
        <th><code>m</code></th>
        </tr>
        <tr>
        <td>start</td>
        <td></td>
        <td></td>
        <td><span class="arithmatex">&#92;(48&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18 &#92;ne 0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(48 &#92;bmod 18 = 12&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(18&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(12&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12 &#92;ne 0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18 &#92;bmod 12 = 6&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(6&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6 &#92;ne 0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12 &#92;bmod 6 = 0&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td colspan="5">Test <code>m != 0</code> false: the loop ends and the function returns <code>n</code> <span class="arithmatex">&#92;(= 6&#92;)</span>.</td>
        </tr>
        </table></div>

    - Execution for <code>n = 35</code>, <code>m = 12</code>:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration</th>
        <th>test <code>m != 0</code></th>
        <th><code>r = n % m</code></th>
        <th><code>n</code></th>
        <th><code>m</code></th>
        </tr>
        <tr>
        <td>start</td>
        <td></td>
        <td></td>
        <td><span class="arithmatex">&#92;(35&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12 &#92;ne 0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(35 &#92;bmod 12 = 11&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(11&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11 &#92;ne 0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12 &#92;bmod 11 = 1&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(11&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11 &#92;bmod 1 = 0&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td colspan="5">Test <code>m != 0</code> false: the loop ends and the function returns <code>n</code> <span class="arithmatex">&#92;(= 1&#92;)</span>.</td>
        </tr>
        </table></div>

    Hence $\gcd(48, 18) = 6$ and $\gcd(35, 12) = 1$.

!!! chiave ""

    <strong>Key points.</strong>

    - The pairs $(n, m)$ and $(m,\ n \bmod m)$ have the same common divisors, hence the same greatest common divisor.

    - The Euclidean algorithm repeats the replacement until the second number is $0$, and returns the first one, since $\gcd(n, 0) = n$.

    - Two numbers are coprime if and only if the Euclidean algorithm returns $1$.

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

## Interactive lab { #interactive-lab }

The algorithm of the chapter, one step at a time: move the sliders and press ▶.
All the graphs of the course are in the [interactive lab](../lab/index.md#cap-5).

<div class="gi" data-grafico="euclide-crivello"></div>
