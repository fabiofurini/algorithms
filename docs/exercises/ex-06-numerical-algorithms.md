---
title: "Exercises · Numerical algorithms"
---

# Exercises · Numerical algorithms

<div class="info-capitolo" markdown>

**Exercises · Chapter 6** · each solution opens with a click · [:material-book-open-variant: Chapter 6](../foundations/06-numerical-algorithms.md) · [:material-file-pdf-box: Exercises, volume 1 (PDF)](../pdf/exercises-1-foundations.pdf)

</div>

The exercises of this chapter apply the four algorithms of the chapter «Numerical algorithms»: ChangeOfBase, BasicPrimalityTest and PrimalityTest, SieveOfEratosthenes, EuclideanAlgorithm. The following facts of the chapter are used in the solutions.

!!! nota ""

    <strong>Division with remainder.</strong> For every natural number $n$ and every natural number $b \ge 1$:

    $$
    n = \lfloor n/b \rfloor \; b + (n \bmod b) \qquad \text{with} \qquad 0 \le n \bmod b < b .
    $$

    <strong>Change of base.</strong> If $n = (d_{k-1} \dots d_1 d_0)_b$, then $n \bmod b = d_0$ and $\lfloor n/b \rfloor = (d_{k-1} \dots d_1)_b$; the number of digits is $\lfloor \log_b n \rfloor + 1$. ChangeOfBase stores the digit $d_{k-1}$ in the entry $d[k]$.

!!! nota ""

    <strong>Primality.</strong> A natural number $n \ge 2$ is prime if and only if no natural number in $\{2, 3, \dots, \lfloor \sqrt{n} \rfloor\}$ is a divisor of $n$.

    <strong>Sieve.</strong> The marking of the multiples of a prime $p$ starts at $p^2$, and the outer loop stops at $\lfloor \sqrt{n} \rfloor$. In the trace tables, blue cells are the entries just set to $0$ and red cells the current value of $p$.

!!! nota ""

    <strong>Greatest common divisor.</strong> For every pair of natural numbers $n, m \ge 1$:

    $$
    \gcd(n, m) = \gcd(m,\ n \bmod m) \qquad \text{and} \qquad \gcd(n, 0) = n .
    $$

    Two natural numbers are coprime if and only if their greatest common divisor is $1$.

<a id="esercizio-6-1"></a>

!!! esercizio "Exercise 6.1: Numerical algorithms (E1)"

    Consider the following natural number, written as a sequence of digits in base ten:

    $$
    (16)_{10}
    $$

    **Questions**

    1. Convert the number into base $b=2$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    2. Convert the number into base $b=3$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    3. Convert the number into base $b=4$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    4. Convert the number into base $b=5$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    5. Convert the number into base $b=6$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

??? soluzione "Solution"

    1. Translation of $16$ into base $b=2$:

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
        <td><span class="arithmatex">&#92;(16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(16/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;4&#93; = d&#95;{3}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;5&#93; = d&#95;{4}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $16$ in base $2$ is $(10000)_{2}$, with $nd = \lfloor \log_{2} 16 \rfloor + 1 = 5$ digits.

    2. Translation of $16$ into base $b=3$:

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
        <td><span class="arithmatex">&#92;(16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(16/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $16$ in base $3$ is $(121)_{3}$, with $nd = \lfloor \log_{3} 16 \rfloor + 1 = 3$ digits.

    3. Translation of $16$ into base $b=4$:

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
        <td><span class="arithmatex">&#92;(16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(16/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $16$ in base $4$ is $(100)_{4}$, with $nd = \lfloor \log_{4} 16 \rfloor + 1 = 3$ digits.

    4. Translation of $16$ into base $b=5$:

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
        <td><span class="arithmatex">&#92;(16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(16/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $16$ in base $5$ is $(31)_{5}$, with $nd = \lfloor \log_{5} 16 \rfloor + 1 = 2$ digits.

    5. Translation of $16$ into base $b=6$:

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
        <td><span class="arithmatex">&#92;(16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(16/6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2/6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $16$ in base $6$ is $(24)_{6}$, with $nd = \lfloor \log_{6} 16 \rfloor + 1 = 2$ digits.

<a id="esercizio-6-2"></a>

!!! esercizio "Exercise 6.2: Numerical algorithms (E2)"

    Consider the following natural number, written as a sequence of digits in base ten:

    $$
    (25)_{10}
    $$

    **Questions**

    1. Convert the number into base $b=2$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    2. Convert the number into base $b=3$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    3. Convert the number into base $b=4$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    4. Convert the number into base $b=5$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    5. Convert the number into base $b=7$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

??? soluzione "Solution"

    1. Translation of $25$ into base $b=2$:

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
        <td><span class="arithmatex">&#92;(25/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;4&#93; = d&#95;{3}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;5&#93; = d&#95;{4}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $25$ in base $2$ is $(11001)_{2}$, with $nd = \lfloor \log_{2} 25 \rfloor + 1 = 5$ digits.

    2. Translation of $25$ into base $b=3$:

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

    3. Translation of $25$ into base $b=4$:

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
        <td><span class="arithmatex">&#92;(25/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $25$ in base $4$ is $(121)_{4}$, with $nd = \lfloor \log_{4} 25 \rfloor + 1 = 3$ digits.

    4. Translation of $25$ into base $b=5$:

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
        <td><span class="arithmatex">&#92;(25/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $25$ in base $5$ is $(100)_{5}$, with $nd = \lfloor \log_{5} 25 \rfloor + 1 = 3$ digits.

    5. Translation of $25$ into base $b=7$:

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
        <td><span class="arithmatex">&#92;(25/7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3/7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $25$ in base $7$ is $(34)_{7}$, with $nd = \lfloor \log_{7} 25 \rfloor + 1 = 2$ digits.

<a id="esercizio-6-3"></a>

!!! esercizio "Exercise 6.3: Numerical algorithms (E3)"

    Consider the following natural number, written as a sequence of digits in base ten:

    $$
    (42)_{10}
    $$

    **Questions**

    1. Convert the number into base $b=2$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    2. Convert the number into base $b=3$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    3. Convert the number into base $b=5$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    4. Convert the number into base $b=6$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    5. Convert the number into base $b=8$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

??? soluzione "Solution"

    1. Translation of $42$ into base $b=2$:

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
        <td><span class="arithmatex">&#92;(42&#92;)</span></td>
        <td><span class="arithmatex">&#92;(42/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(21&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(21&#92;)</span></td>
        <td><span class="arithmatex">&#92;(21/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;4&#93; = d&#95;{3}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;5&#93; = d&#95;{4}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;6&#93; = d&#95;{5}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $42$ in base $2$ is $(101010)_{2}$, with $nd = \lfloor \log_{2} 42 \rfloor + 1 = 6$ digits.

    2. Translation of $42$ into base $b=3$:

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
        <td><span class="arithmatex">&#92;(42&#92;)</span></td>
        <td><span class="arithmatex">&#92;(42/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(14&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(14&#92;)</span></td>
        <td><span class="arithmatex">&#92;(14/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;4&#93; = d&#95;{3}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $42$ in base $3$ is $(1120)_{3}$, with $nd = \lfloor \log_{3} 42 \rfloor + 1 = 4$ digits.

    3. Translation of $42$ into base $b=5$:

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
        <td><span class="arithmatex">&#92;(42&#92;)</span></td>
        <td><span class="arithmatex">&#92;(42/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $42$ in base $5$ is $(132)_{5}$, with $nd = \lfloor \log_{5} 42 \rfloor + 1 = 3$ digits.

    4. Translation of $42$ into base $b=6$:

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
        <td><span class="arithmatex">&#92;(42&#92;)</span></td>
        <td><span class="arithmatex">&#92;(42/6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7/6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $42$ in base $6$ is $(110)_{6}$, with $nd = \lfloor \log_{6} 42 \rfloor + 1 = 3$ digits.

    5. Translation of $42$ into base $b=8$:

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
        <td><span class="arithmatex">&#92;(42&#92;)</span></td>
        <td><span class="arithmatex">&#92;(42/8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5/8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $42$ in base $8$ is $(52)_{8}$, with $nd = \lfloor \log_{8} 42 \rfloor + 1 = 2$ digits.

<a id="esercizio-6-4"></a>

!!! esercizio "Exercise 6.4: Numerical algorithms (E4)"

    Consider the following natural number, written as a sequence of digits in base ten:

    $$
    (63)_{10}
    $$

    **Questions**

    1. Convert the number into base $b=2$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    2. Convert the number into base $b=4$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    3. Convert the number into base $b=7$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    4. Convert the number into base $b=8$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    5. Convert the number into base $b=9$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

??? soluzione "Solution"

    1. Translation of $63$ into base $b=2$:

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
        <td><span class="arithmatex">&#92;(63&#92;)</span></td>
        <td><span class="arithmatex">&#92;(63/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(31&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(31&#92;)</span></td>
        <td><span class="arithmatex">&#92;(31/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(15&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(15&#92;)</span></td>
        <td><span class="arithmatex">&#92;(15/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;4&#93; = d&#95;{3}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;5&#93; = d&#95;{4}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;6&#93; = d&#95;{5}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $63$ in base $2$ is $(111111)_{2}$, with $nd = \lfloor \log_{2} 63 \rfloor + 1 = 6$ digits.

    2. Translation of $63$ into base $b=4$:

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
        <td><span class="arithmatex">&#92;(63&#92;)</span></td>
        <td><span class="arithmatex">&#92;(63/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(15&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(15&#92;)</span></td>
        <td><span class="arithmatex">&#92;(15/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3/4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $63$ in base $4$ is $(333)_{4}$, with $nd = \lfloor \log_{4} 63 \rfloor + 1 = 3$ digits.

    3. Translation of $63$ into base $b=7$:

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
        <td><span class="arithmatex">&#92;(63&#92;)</span></td>
        <td><span class="arithmatex">&#92;(63/7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(9/7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $63$ in base $7$ is $(120)_{7}$, with $nd = \lfloor \log_{7} 63 \rfloor + 1 = 3$ digits.

    4. Translation of $63$ into base $b=8$:

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
        <td><span class="arithmatex">&#92;(63&#92;)</span></td>
        <td><span class="arithmatex">&#92;(63/8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7/8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $63$ in base $8$ is $(77)_{8}$, with $nd = \lfloor \log_{8} 63 \rfloor + 1 = 2$ digits.

    5. Translation of $63$ into base $b=9$:

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
        <td><span class="arithmatex">&#92;(63&#92;)</span></td>
        <td><span class="arithmatex">&#92;(63/9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7/9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $63$ in base $9$ is $(70)_{9}$, with $nd = \lfloor \log_{9} 63 \rfloor + 1 = 2$ digits.

<a id="esercizio-6-5"></a>

!!! esercizio "Exercise 6.5: Numerical algorithms (E5)"

    Consider the following natural number, written as a sequence of digits in base ten:

    $$
    (100)_{10}
    $$

    **Questions**

    1. Convert the number into base $b=2$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    2. Convert the number into base $b=3$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    3. Convert the number into base $b=5$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    4. Convert the number into base $b=8$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

    5. Convert the number into base $b=16$ with the algorithm ChangeOfBase, showing the quotient and the remainder of every division.

??? soluzione "Solution"

    1. Translation of $100$ into base $b=2$:

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
        <td><span class="arithmatex">&#92;(100/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(50&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(50&#92;)</span></td>
        <td><span class="arithmatex">&#92;(50/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(25&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(25&#92;)</span></td>
        <td><span class="arithmatex">&#92;(25/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;4&#93; = d&#95;{3}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;5&#93; = d&#95;{4}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;6&#93; = d&#95;{5}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;7&#93; = d&#95;{6}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $100$ in base $2$ is $(1100100)_{2}$, with $nd = \lfloor \log_{2} 100 \rfloor + 1 = 7$ digits.

    2. Translation of $100$ into base $b=3$:

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
        <td><span class="arithmatex">&#92;(100/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(33&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(33&#92;)</span></td>
        <td><span class="arithmatex">&#92;(33/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;4&#93; = d&#95;{3}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1/3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;5&#93; = d&#95;{4}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $100$ in base $3$ is $(10201)_{3}$, with $nd = \lfloor \log_{3} 100 \rfloor + 1 = 5$ digits.

    3. Translation of $100$ into base $b=5$:

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
        <td><span class="arithmatex">&#92;(100/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(20&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(20&#92;)</span></td>
        <td><span class="arithmatex">&#92;(20/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4/5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;3&#93; = d&#95;{2}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $100$ in base $5$ is $(400)_{5}$, with $nd = \lfloor \log_{5} 100 \rfloor + 1 = 3$ digits.

    4. Translation of $100$ into base $b=8$:

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

    5. Translation of $100$ into base $b=16$:

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
        <td><span class="arithmatex">&#92;(100/16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;1&#93; = d&#95;{0}&#92;)</span> (LSD)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6/16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d&#91;2&#93; = d&#95;{1}&#92;)</span> (MSD)</td>
        </tr>
        </table></div>

        Accordingly, $100$ in base $16$ is $(64)_{16}$, with $nd = \lfloor \log_{16} 100 \rfloor + 1 = 2$ digits.

<a id="esercizio-6-6"></a>

!!! esercizio "Exercise 6.6: Numerical algorithms (E6)"

    Consider the following natural numbers:

    $$
    n \in \{2,\ 7,\ 9,\ 11,\ 25\}
    $$

    **Questions**

    1. Apply the algorithm PrimalityTest to each number in the list. For each $n$, show the execution step by step, indicating the value of $\lfloor\sqrt{n}\rfloor$, the values of $d$ tested, and the result of each test $n \bmod d = 0$.

??? soluzione "Solution"

    1. Execution of PrimalityTest on each number.

        <strong>Check $n = 2$:</strong> $\lfloor\sqrt{2}\rfloor = 1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(2 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td colspan="3">The loop is not executed, since <span class="arithmatex">&#92;(2 &gt; 1&#92;)</span>.</td>
        </tr>
        <tr>
        <td colspan="3">Return <code>true</code>: <strong>2 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 7$:</strong> $\lfloor\sqrt{7}\rfloor = 2$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(7 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>7 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 9$:</strong> $\lfloor\sqrt{9}\rfloor = 3$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(9 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>9 is not prime</strong> (<span class="arithmatex">&#92;(9 = 3 &#92;cdot 3&#92;)</span>).</td>
        </tr>
        </table></div>

        <strong>Check $n = 11$:</strong> $\lfloor\sqrt{11}\rfloor = 3$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(11 &#92;bmod d&#92;)</span></th>
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
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>11 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 25$:</strong> $\lfloor\sqrt{25}\rfloor = 5$.

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

<a id="esercizio-6-7"></a>

!!! esercizio "Exercise 6.7: Numerical algorithms (E7)"

    Consider the following natural numbers:

    $$
    n \in \{4,\ 13,\ 17,\ 49,\ 97\}
    $$

    **Questions**

    1. Apply the algorithm PrimalityTest to each number in the list. For each $n$, show the execution step by step, indicating the value of $\lfloor\sqrt{n}\rfloor$, the values of $d$ tested, and the result of each test $n \bmod d = 0$.

??? soluzione "Solution"

    1. Execution of PrimalityTest on each number.

        <strong>Check $n = 4$:</strong> $\lfloor\sqrt{4}\rfloor = 2$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(4 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>4 is not prime</strong> (<span class="arithmatex">&#92;(4 = 2 &#92;cdot 2&#92;)</span>).</td>
        </tr>
        </table></div>

        <strong>Check $n = 13$:</strong> $\lfloor\sqrt{13}\rfloor = 3$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(13 &#92;bmod d&#92;)</span></th>
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
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>13 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 17$:</strong> $\lfloor\sqrt{17}\rfloor = 4$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(17 &#92;bmod d&#92;)</span></th>
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
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>17 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 49$:</strong> $\lfloor\sqrt{49}\rfloor = 7$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(49 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(4 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>49 is not prime</strong> (<span class="arithmatex">&#92;(49 = 7 &#92;cdot 7&#92;)</span>).</td>
        </tr>
        </table></div>

        <strong>Check $n = 97$:</strong> $\lfloor\sqrt{97}\rfloor = 9$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(97 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(2 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>97 is prime</strong>.</td>
        </tr>
        </table></div>

<a id="esercizio-6-8"></a>

!!! esercizio "Exercise 6.8: Numerical algorithms (E8)"

    Consider the following natural numbers:

    $$
    n \in \{1,\ 3,\ 15,\ 23,\ 36\}
    $$

    **Questions**

    1. Apply the algorithm PrimalityTest to each number in the list. For each $n$, show the execution step by step, indicating the value of $\lfloor\sqrt{n}\rfloor$, the values of $d$ tested, and the result of each test $n \bmod d = 0$.

??? soluzione "Solution"

    1. Execution of PrimalityTest on each number.

        <strong>Check $n = 1$:</strong> $n < 2$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(1 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td colspan="3"><span class="arithmatex">&#92;(n = 1 &lt; 2&#92;)</span>: return <code>false</code> immediately.</td>
        </tr>
        <tr>
        <td colspan="3"><strong>1 is not prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 3$:</strong> $\lfloor\sqrt{3}\rfloor = 1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(3 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td colspan="3">The loop is not executed, since <span class="arithmatex">&#92;(2 &gt; 1&#92;)</span>.</td>
        </tr>
        <tr>
        <td colspan="3">Return <code>true</code>: <strong>3 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 15$:</strong> $\lfloor\sqrt{15}\rfloor = 3$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(15 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>15 is not prime</strong> (<span class="arithmatex">&#92;(15 = 3 &#92;cdot 5&#92;)</span>).</td>
        </tr>
        </table></div>

        <strong>Check $n = 23$:</strong> $\lfloor\sqrt{23}\rfloor = 4$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(23 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(3 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>23 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 36$:</strong> $\lfloor\sqrt{36}\rfloor = 6$.

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

<a id="esercizio-6-9"></a>

!!! esercizio "Exercise 6.9: Numerical algorithms (E9)"

    Consider the natural numbers $n = 29$ and $n = 49$.

    **Questions**

    1. For each number $n$, apply both the algorithm BasicPrimalityTest (loop up to $\lfloor n/2 \rfloor$) and the algorithm PrimalityTest (loop up to $\lfloor\sqrt{n}\rfloor$). Show the step-by-step execution of each algorithm.

    2. For each number, count the number of iterations performed by each algorithm and compare.

??? soluzione "Solution"

    1. Step-by-step execution.

        <strong>Case $n = 29$.</strong>

        <em>BasicPrimalityTest</em> ($\lfloor 29/2 \rfloor = 14$):

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
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        <td><span class="arithmatex">&#92;(9 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(11&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(13&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(14&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>29 is prime</strong>. (13 iterations)</td>
        </tr>
        </table></div>

        <em>PrimalityTest</em> ($\lfloor\sqrt{29}\rfloor = 5$):

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
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>29 is prime</strong>. (4 iterations)</td>
        </tr>
        </table></div>

        <strong>Case $n = 49$.</strong>

        <em>BasicPrimalityTest</em> ($\lfloor 49/2 \rfloor = 24$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(49 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(4 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>49 is not prime</strong> (<span class="arithmatex">&#92;(49 = 7 &#92;cdot 7&#92;)</span>). (6 iterations)</td>
        </tr>
        </table></div>

        <em>PrimalityTest</em> ($\lfloor\sqrt{49}\rfloor = 7$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(49 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(4 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>49 is not prime</strong> (<span class="arithmatex">&#92;(49 = 7 &#92;cdot 7&#92;)</span>). (6 iterations)</td>
        </tr>
        </table></div>

    2. Comparison of the iterations:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;lfloor n/2 &#92;rfloor&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;lfloor&#92;sqrt{n}&#92;rfloor&#92;)</span></th>
        <th>BasicPrimalityTest</th>
        <th>PrimalityTest</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(29&#92;)</span></td>
        <td><span class="arithmatex">&#92;(14&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(13&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(49&#92;)</span></td>
        <td><span class="arithmatex">&#92;(24&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        </tr>
        </table></div>

        For $n = 29$ (prime), PrimalityTest performs only $4$ iterations instead of $13$: both algorithms must test all their candidates, and PrimalityTest has far fewer. For $n = 49$ (composite, with smallest divisor $7 = \sqrt{49}$), both algorithms stop at the same divisor $d = 7$, so the number of iterations is the same.

<a id="esercizio-6-10"></a>

!!! esercizio "Exercise 6.10: Numerical algorithms (E10)"

    Consider the natural numbers $n \in \{2, 3, 4, \dots, 30\}$.

    **Questions**

    1. Apply the algorithm PrimalityTest to each natural number $n \in \{2, 3, \dots, 30\}$ and determine which numbers are prime. For each $n$, report the value of $\lfloor\sqrt{n}\rfloor$, whether a divisor was found (and which one), and the result.

    2. List all the prime numbers in $\{2, 3, \dots, 30\}$ and count them.

??? soluzione "Solution"

    1. Summary of the executions of PrimalityTest (the divisor reported is the first one found, that is, the value of $d$ for which the function returns <code>false</code>):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;lfloor&#92;sqrt{n}&#92;rfloor&#92;)</span></th>
        <th>first divisor found</th>
        <th>result</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>none (loop not executed)</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>none (loop not executed)</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(4 = 2 &#92;cdot 2&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td>none</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(6 = 2 &#92;cdot 3&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td>none</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(8 = 2 &#92;cdot 4&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 3&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(9 = 3 &#92;cdot 3&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(10 = 2 &#92;cdot 5&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(11&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td>none</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(12 = 2 &#92;cdot 6&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(13&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td>none</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(14&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(14 = 2 &#92;cdot 7&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(15&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 3&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(15 = 3 &#92;cdot 5&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(16 = 2 &#92;cdot 8&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(17&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td>none</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(18 = 2 &#92;cdot 9&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(19&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td>none</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(20&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(20 = 2 &#92;cdot 10&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(21&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 3&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(21 = 3 &#92;cdot 7&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(22&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(22 = 2 &#92;cdot 11&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(23&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td>none</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(24&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(24 = 2 &#92;cdot 12&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(25&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 5&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(25 = 5 &#92;cdot 5&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(26&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(26 = 2 &#92;cdot 13&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(27&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 3&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(27 = 3 &#92;cdot 9&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(28&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(28 = 2 &#92;cdot 14&#92;)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(29&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td>none</td>
        <td><strong>prime</strong></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(30&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(d = 2&#92;)</span></td>
        <td>not prime (<span class="arithmatex">&#92;(30 = 2 &#92;cdot 15&#92;)</span>)</td>
        </tr>
        </table></div>

    2. The prime numbers in $\{2, 3, \dots, 30\}$ are

        $$
        2,\ 3,\ 5,\ 7,\ 11,\ 13,\ 17,\ 19,\ 23,\ 29
        $$

        There are $10$ prime numbers in $\{2, 3, \dots, 30\}$.

<a id="esercizio-6-11"></a>

!!! esercizio "Exercise 6.11: Numerical algorithms (E11)"

    Consider the following natural numbers:

    $$
    n \in \{6,\ 19,\ 49,\ 53,\ 91\}
    $$

    **Questions**

    1. Apply the algorithm PrimalityTest to each number in the list. For each $n$, show the execution step by step, indicating the value of $\lfloor\sqrt{n}\rfloor$, the values of $d$ tested, and the result of each test $n \bmod d = 0$.

??? soluzione "Solution"

    1. Execution of PrimalityTest on each number.

        <strong>Check $n = 6$:</strong> $\lfloor\sqrt{6}\rfloor = 2$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(6 &#92;bmod d&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>6 is not prime</strong> (<span class="arithmatex">&#92;(6 = 2 &#92;cdot 3&#92;)</span>).</td>
        </tr>
        </table></div>

        <strong>Check $n = 19$:</strong> $\lfloor\sqrt{19}\rfloor = 4$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(19 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(3 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>19 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 49$:</strong> $\lfloor\sqrt{49}\rfloor = 7$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(49 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(4 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>49 is not prime</strong> (<span class="arithmatex">&#92;(49 = 7 &#92;cdot 7&#92;)</span>).</td>
        </tr>
        </table></div>

        <strong>Check $n = 53$:</strong> $\lfloor\sqrt{53}\rfloor = 7$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(53 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(3 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td colspan="3">Loop ends. Return <code>true</code>: <strong>53 is prime</strong>.</td>
        </tr>
        </table></div>

        <strong>Check $n = 91$:</strong> $\lfloor\sqrt{91}\rfloor = 9$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(d&#92;)</span></th>
        <th><span class="arithmatex">&#92;(91 &#92;bmod d&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(3 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;ne 0&#92;)</span></td>
        <td>continue</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td>return <code>false</code></td>
        </tr>
        <tr>
        <td colspan="3"><strong>91 is not prime</strong> (<span class="arithmatex">&#92;(91 = 7 &#92;cdot 13&#92;)</span>).</td>
        </tr>
        </table></div>

<a id="esercizio-6-12"></a>

!!! esercizio "Exercise 6.12: Numerical algorithms (E12)"

    Consider the natural number $n = 15$.

    **Questions**

    1. Apply the algorithm SieveOfEratosthenes for $n = 15$. Show the execution step by step: indicate the value of $\lfloor\sqrt{15}\rfloor$, and for each prime $p$ found, list the values of $j$ in the inner loop and the corresponding assignments $prime[j] \leftarrow 0$.

    2. List all the prime numbers $\le 15$.

??? soluzione "Solution"

    1. We have $n = 15$ and $\lfloor\sqrt{15}\rfloor = 3$. The array $prime[1..15]$ is initialized to $1$ and then $prime[1] \leftarrow 0$. Each row of the table shows the state of the array after the assignment $prime[j] \leftarrow 0$ (blue: entry just set to $0$; red: current value of $p$).

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th></th>
        <th colspan="15"><span class="arithmatex">&#92;(prime&#91;1..15&#93;&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(prime&#91;14&#93; &#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>16</td>
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
        <td><span class="arithmatex">&#92;(j = 16 &gt; 15&#92;)</span>: stop</td>
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
        <td><span class="arithmatex">&#92;(prime&#91;15&#93; &#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>18</td>
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
        <td><span class="arithmatex">&#92;(j = 18 &gt; 15&#92;)</span>: stop</td>
        </tr>
        <tr>
        <td colspan="18">Outer loop ends: <span class="arithmatex">&#92;(p = 4 &gt; &#92;lfloor&#92;sqrt{15}&#92;rfloor = 3&#92;)</span>.</td>
        </tr>
        </table></div>

    2. The prime numbers $\le 15$ are $2,\ 3,\ 5,\ 7,\ 11,\ 13$.

<a id="esercizio-6-13"></a>

!!! esercizio "Exercise 6.13: Numerical algorithms (E13)"

    Consider the natural number $n = 30$.

    **Questions**

    1. Apply the algorithm SieveOfEratosthenes for $n = 30$. Show the execution step by step: indicate the value of $\lfloor\sqrt{30}\rfloor$, and for each prime $p$ found, list the values of $j$ in the inner loop and the corresponding assignments $prime[j] \leftarrow 0$.

    2. List all the prime numbers $\le 30$.

??? soluzione "Solution"

    1. We have $n = 30$ and $\lfloor\sqrt{30}\rfloor = 5$. The array $prime[1..30]$ is initialized to $1$ and then $prime[1] \leftarrow 0$.

        - <strong>Iteration $p = 2$</strong>: $prime[2] = 1$, so $2$ is prime. Inner loop from $j = p^2 = 4$ with step $2$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th><span class="arithmatex">&#92;(j&#92;)</span></th>
            <th>assignment</th>
            <th>note</th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(4&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;4&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(6&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;6&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(8&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;8&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(10&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;10&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(12&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(14&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;14&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(16&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;16&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(18&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;18&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(20&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;20&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(22&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;22&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(24&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;24&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(26&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;26&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(28&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;28&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(30&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;30&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(32&#92;)</span></td>
            <td></td>
            <td><span class="arithmatex">&#92;(j = 32 &gt; 30&#92;)</span>: stop</td>
            </tr>
            </table></div>

        - <strong>Iteration $p = 3$</strong>: $prime[3] = 1$, so $3$ is prime. Inner loop from $j = p^2 = 9$ with step $3$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th><span class="arithmatex">&#92;(j&#92;)</span></th>
            <th>assignment</th>
            <th>note</th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(9&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;9&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(12&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span></td>
            <td>already <span class="arithmatex">&#92;(0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(15&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;15&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(18&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;18&#93; &#92;leftarrow 0&#92;)</span></td>
            <td>already <span class="arithmatex">&#92;(0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(21&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;21&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(24&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;24&#93; &#92;leftarrow 0&#92;)</span></td>
            <td>already <span class="arithmatex">&#92;(0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(27&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;27&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(30&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;30&#93; &#92;leftarrow 0&#92;)</span></td>
            <td>already <span class="arithmatex">&#92;(0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(33&#92;)</span></td>
            <td></td>
            <td><span class="arithmatex">&#92;(j = 33 &gt; 30&#92;)</span>: stop</td>
            </tr>
            </table></div>

        - <strong>Iteration $p = 4$</strong>: $prime[4] = 0$, so $4$ is not prime: skip.

        - <strong>Iteration $p = 5$</strong>: $prime[5] = 1$, so $5$ is prime. Inner loop from $j = p^2 = 25$ with step $5$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th><span class="arithmatex">&#92;(j&#92;)</span></th>
            <th>assignment</th>
            <th>note</th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(25&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;25&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(30&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;30&#93; &#92;leftarrow 0&#92;)</span></td>
            <td>already <span class="arithmatex">&#92;(0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(35&#92;)</span></td>
            <td></td>
            <td><span class="arithmatex">&#92;(j = 35 &gt; 30&#92;)</span>: stop</td>
            </tr>
            </table></div>

        - Outer loop ends: $p = 6 > \lfloor\sqrt{30}\rfloor = 5$.

        Final state of the array $prime[1..30]$ (the entries equal to $1$ are in blue):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>10</th>
        <th>11</th>
        <th>12</th>
        <th>13</th>
        <th>14</th>
        <th>15</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(prime&#91;i&#93;&#92;)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(i&#92;)</span></td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>
        <td>22</td>
        <td>23</td>
        <td>24</td>
        <td>25</td>
        <td>26</td>
        <td>27</td>
        <td>28</td>
        <td>29</td>
        <td>30</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(prime&#91;i&#93;&#92;)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        </tr>
        </table></div>

    2. The prime numbers $\le 30$ are $2,\ 3,\ 5,\ 7,\ 11,\ 13,\ 17,\ 19,\ 23,\ 29$.

<a id="esercizio-6-14"></a>

!!! esercizio "Exercise 6.14: Numerical algorithms (E14)"

    Consider the following execution trace of the algorithm SieveOfEratosthenes for $n = 12$, where some entries have been replaced by a question mark.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th></th>
    <th></th>
    <th colspan="12"><span class="arithmatex">&#92;(prime&#91;1..12&#93;&#92;)</span></th>
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
    <td>initialization</td>
    </tr>
    <tr>
    <td class="cella-rossa">2</td>
    <td>4</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>?</td>
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
    <td>?</td>
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
    <td>?</td>
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
    <td>?</td>
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
    <td>?</td>
    <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td>14</td>
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
    <td><span class="arithmatex">&#92;(j = 14 &gt; 12&#92;)</span>: stop</td>
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
    <td>?</td>
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
    <td>?</td>
    <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span> (already <span class="arithmatex">&#92;(0&#92;)</span>)</td>
    </tr>
    <tr>
    <td></td>
    <td>15</td>
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
    <td><span class="arithmatex">&#92;(j = 15 &gt; 12&#92;)</span>: stop</td>
    </tr>
    <tr>
    <td colspan="15">Outer loop ends: <span class="arithmatex">&#92;(p = 4 &gt; &#92;lfloor&#92;sqrt{12}&#92;rfloor = ?&#92;)</span>.</td>
    </tr>
    </table></div>

    **Questions**

    1. Fill in all the entries marked with a question mark in the table.

    2. What is the value of $\lfloor\sqrt{12}\rfloor$? Why can the outer loop stop when $p = 4$?

    3. List all the prime numbers $\le 12$.

??? soluzione "Solution"

    1. Completed table:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th></th>
        <th colspan="12"><span class="arithmatex">&#92;(prime&#91;1..12&#93;&#92;)</span></th>
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
        <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>14</td>
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
        <td><span class="arithmatex">&#92;(j = 14 &gt; 12&#92;)</span>: stop</td>
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
        <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span> (already <span class="arithmatex">&#92;(0&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>15</td>
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
        <td><span class="arithmatex">&#92;(j = 15 &gt; 12&#92;)</span>: stop</td>
        </tr>
        <tr>
        <td colspan="15">Outer loop ends: <span class="arithmatex">&#92;(p = 4 &gt; &#92;lfloor&#92;sqrt{12}&#92;rfloor = 3&#92;)</span>.</td>
        </tr>
        </table></div>

        Every question mark is the entry $prime[j]$ of the row with index $j$: it is $0$ after the assignment $prime[j] \leftarrow 0$ (in the row $p = 3$, $j = 12$, the entry was already $0$).

    2. $\lfloor\sqrt{12}\rfloor = 3$. The outer loop runs for $p = 2, 3$ and stops when $p = 4 > 3$. Every composite number $m \le 12$ has a prime divisor not larger than $\lfloor\sqrt{12}\rfloor = 3$ (chapter «Numerical algorithms», section «Sieve of Eratosthenes»), so all the composite numbers have already been marked: $4, 6, 8, 10, 12$ by $p = 2$ and $9$ by $p = 3$.

    3. The prime numbers $\le 12$ are $2,\ 3,\ 5,\ 7,\ 11$.

<a id="esercizio-6-15"></a>

!!! esercizio "Exercise 6.15: Numerical algorithms (E15)"

    Consider the algorithm SieveOfEratosthenes applied to $n = 25$.

    **Questions**

    1. Apply the algorithm SieveOfEratosthenes for $n = 25$. Show the execution step by step, indicating the value of $\lfloor\sqrt{25}\rfloor$, and for each prime $p$ the values of $j$ tested in the inner loop and the corresponding assignments $prime[j] \leftarrow 0$.

    2. For $p = 5$: what is the first value of $j$ processed by the inner loop? Why is $p^2 = 25$ the starting point and not $2p = 10$?

    3. List all the prime numbers $\le 25$.

??? soluzione "Solution"

    1. We have $n = 25$ and $\lfloor\sqrt{25}\rfloor = 5$. The array $prime[1..25]$ is initialized to $1$ and then $prime[1] \leftarrow 0$.

        - <strong>Iteration $p = 2$</strong>: $prime[2] = 1$, so $2$ is prime. Inner loop from $j = p^2 = 4$ with step $2$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th><span class="arithmatex">&#92;(j&#92;)</span></th>
            <th>assignment</th>
            <th>note</th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(4&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;4&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(6&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;6&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(8&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;8&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(10&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;10&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(12&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(14&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;14&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(16&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;16&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(18&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;18&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(20&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;20&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(22&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;22&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(24&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;24&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(26&#92;)</span></td>
            <td></td>
            <td><span class="arithmatex">&#92;(j = 26 &gt; 25&#92;)</span>: stop</td>
            </tr>
            </table></div>

        - <strong>Iteration $p = 3$</strong>: $prime[3] = 1$, so $3$ is prime. Inner loop from $j = p^2 = 9$ with step $3$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th><span class="arithmatex">&#92;(j&#92;)</span></th>
            <th>assignment</th>
            <th>note</th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(9&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;9&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(12&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;12&#93; &#92;leftarrow 0&#92;)</span></td>
            <td>already <span class="arithmatex">&#92;(0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(15&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;15&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(18&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;18&#93; &#92;leftarrow 0&#92;)</span></td>
            <td>already <span class="arithmatex">&#92;(0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(21&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;21&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(24&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;24&#93; &#92;leftarrow 0&#92;)</span></td>
            <td>already <span class="arithmatex">&#92;(0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(27&#92;)</span></td>
            <td></td>
            <td><span class="arithmatex">&#92;(j = 27 &gt; 25&#92;)</span>: stop</td>
            </tr>
            </table></div>

        - <strong>Iteration $p = 4$</strong>: $prime[4] = 0$, so $4$ is not prime: skip.

        - <strong>Iteration $p = 5$</strong>: $prime[5] = 1$, so $5$ is prime. Inner loop from $j = p^2 = 25$ with step $5$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th><span class="arithmatex">&#92;(j&#92;)</span></th>
            <th>assignment</th>
            <th>note</th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(25&#92;)</span></td>
            <td><span class="arithmatex">&#92;(prime&#91;25&#93; &#92;leftarrow 0&#92;)</span></td>
            <td></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(30&#92;)</span></td>
            <td></td>
            <td><span class="arithmatex">&#92;(j = 30 &gt; 25&#92;)</span>: stop</td>
            </tr>
            </table></div>

        - Outer loop ends: $p = 6 > \lfloor\sqrt{25}\rfloor = 5$.

        Final state of the array $prime[1..25]$ (the entries equal to $1$ are in blue):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>10</th>
        <th>11</th>
        <th>12</th>
        <th>13</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(prime&#91;i&#93;&#92;)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(i&#92;)</span></td>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>
        <td>22</td>
        <td>23</td>
        <td>24</td>
        <td>25</td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(prime&#91;i&#93;&#92;)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td></td>
        </tr>
        </table></div>

    2. For $p = 5$, the inner loop starts at $j = p^2 = 25$. All the smaller multiples of $5$ larger than $5$, namely $10, 15, 20$, have already been set to $0$: $10 = 2 \cdot 5$ and $20 = 2 \cdot 10$ when $p = 2$, and $15 = 3 \cdot 5$ when $p = 3$. In general, every multiple $m$ of $p$ with $p < m < p^2$ has a divisor $d$ with $2 \le d < p$, hence a prime divisor smaller than $p$, which has already marked it.

    3. The prime numbers $\le 25$ are $2,\ 3,\ 5,\ 7,\ 11,\ 13,\ 17,\ 19,\ 23$.

<a id="esercizio-6-16"></a>

!!! esercizio "Exercise 6.16: Numerical algorithms (E16)"

    Consider the natural number $n = 50$.

    **Questions**

    1. Apply the algorithm SieveOfEratosthenes for $n = 50$. For each value of $p$ of the outer loop, report the value of $prime[p]$ and, when $p$ is prime, all the values of $j$ processed by the inner loop (the multiples of $p$ from $p^2$ to $50$), distinguishing the entries newly set to $0$ from those already equal to $0$.

    2. List all the prime numbers $\le 50$ and count them.

??? soluzione "Solution"

    1. We have $n = 50$ and $\lfloor\sqrt{50}\rfloor = 7$. The array $prime[1..50]$ is initialized to $1$ and then $prime[1] \leftarrow 0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(p&#92;)</span></th>
        <th><span class="arithmatex">&#92;(prime&#91;p&#93;&#92;)</span></th>
        <th>values of <span class="arithmatex">&#92;(j&#92;)</span></th>
        <th>newly set to <span class="arithmatex">&#92;(0&#92;)</span></th>
        <th>already <span class="arithmatex">&#92;(0&#92;)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (prime)</td>
        <td><span class="arithmatex">&#92;(4, 6, &#92;dots, 50&#92;)</span></td>
        <td>4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50</td>
        <td>—</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (prime)</td>
        <td><span class="arithmatex">&#92;(9, 12, &#92;dots, 48&#92;)</span></td>
        <td>9, 15, 21, 27, 33, 39, 45</td>
        <td>12, 18, 24, 30, 36, 42, 48</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (skip)</td>
        <td>—</td>
        <td>—</td>
        <td>—</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (prime)</td>
        <td><span class="arithmatex">&#92;(25, 30, &#92;dots, 50&#92;)</span></td>
        <td>25, 35</td>
        <td>30, 40, 45, 50</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (skip)</td>
        <td>—</td>
        <td>—</td>
        <td>—</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (prime)</td>
        <td><span class="arithmatex">&#92;(49&#92;)</span></td>
        <td>49</td>
        <td>—</td>
        </tr>
        <tr>
        <td colspan="5">Outer loop ends: <span class="arithmatex">&#92;(p = 8 &gt; &#92;lfloor&#92;sqrt{50}&#92;rfloor = 7&#92;)</span>.</td>
        </tr>
        </table></div>

        Final state of the array $prime[1..50]$ (the entries equal to $1$ are in blue):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>10</th>
        <th>11</th>
        <th>12</th>
        <th>13</th>
        <th>14</th>
        <th>15</th>
        <th>16</th>
        <th>17</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(prime&#91;i&#93;&#92;)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(i&#92;)</span></td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
        <td>21</td>
        <td>22</td>
        <td>23</td>
        <td>24</td>
        <td>25</td>
        <td>26</td>
        <td>27</td>
        <td>28</td>
        <td>29</td>
        <td>30</td>
        <td>31</td>
        <td>32</td>
        <td>33</td>
        <td>34</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(prime&#91;i&#93;&#92;)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(i&#92;)</span></td>
        <td>35</td>
        <td>36</td>
        <td>37</td>
        <td>38</td>
        <td>39</td>
        <td>40</td>
        <td>41</td>
        <td>42</td>
        <td>43</td>
        <td>44</td>
        <td>45</td>
        <td>46</td>
        <td>47</td>
        <td>48</td>
        <td>49</td>
        <td>50</td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(prime&#91;i&#93;&#92;)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td></td>
        </tr>
        </table></div>

    2. The prime numbers $\le 50$ are

        $$
        2,\ 3,\ 5,\ 7,\ 11,\ 13,\ 17,\ 19,\ 23,\ 29,\ 31,\ 37,\ 41,\ 43,\ 47
        $$

        There are $15$ prime numbers $\le 50$.

<a id="esercizio-6-17"></a>

!!! esercizio "Exercise 6.17: Numerical algorithms (E17)"

    Consider the following pairs of natural numbers $(n,m)$:

    1. $(1071,\ 462)$

    2. $(100,\ 75)$

    3. $(17,\ 5)$

    4. $(89,\ 55)$

    5. $(30,\ 84)$

    **Questions**

    1. Apply the algorithm EuclideanAlgorithm to compute $\gcd(n,m)$ for all the pairs. For each pair, show the execution step by step in a table, indicating at each step the values of $n$, $m$ and $r=n\bmod m$, and give the number of iterations of the while loop.

    2. Which pairs are coprime?

    3. In pair 5 we have $n<m$. What happens in the first iteration?

??? soluzione "Solution"

    1. Executions of the Euclidean algorithm.

        1. Compute $\gcd(1071,462)$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th>step</th>
            <th><span class="arithmatex">&#92;(n&#92;)</span></th>
            <th><span class="arithmatex">&#92;(m&#92;)</span></th>
            <th><span class="arithmatex">&#92;(r = n &#92;bmod m&#92;)</span></th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(1071&#92;)</span></td>
            <td><span class="arithmatex">&#92;(462&#92;)</span></td>
            <td><span class="arithmatex">&#92;(1071 &#92;bmod 462 = 147&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(462&#92;)</span></td>
            <td><span class="arithmatex">&#92;(147&#92;)</span></td>
            <td><span class="arithmatex">&#92;(462 &#92;bmod 147 = 21&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(3&#92;)</span></td>
            <td><span class="arithmatex">&#92;(147&#92;)</span></td>
            <td><span class="arithmatex">&#92;(21&#92;)</span></td>
            <td><span class="arithmatex">&#92;(147 &#92;bmod 21 = 0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(4&#92;)</span></td>
            <td><span class="arithmatex">&#92;(21&#92;)</span></td>
            <td><span class="arithmatex">&#92;(0&#92;)</span></td>
            <td>— (loop ends)</td>
            </tr>
            </table></div>

            <strong>Result:</strong> $\gcd(1071, 462) = 21$, with $3$ iterations of the while loop.

        2. Compute $\gcd(100,75)$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th>step</th>
            <th><span class="arithmatex">&#92;(n&#92;)</span></th>
            <th><span class="arithmatex">&#92;(m&#92;)</span></th>
            <th><span class="arithmatex">&#92;(r = n &#92;bmod m&#92;)</span></th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(100&#92;)</span></td>
            <td><span class="arithmatex">&#92;(75&#92;)</span></td>
            <td><span class="arithmatex">&#92;(100 &#92;bmod 75 = 25&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(75&#92;)</span></td>
            <td><span class="arithmatex">&#92;(25&#92;)</span></td>
            <td><span class="arithmatex">&#92;(75 &#92;bmod 25 = 0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(3&#92;)</span></td>
            <td><span class="arithmatex">&#92;(25&#92;)</span></td>
            <td><span class="arithmatex">&#92;(0&#92;)</span></td>
            <td>— (loop ends)</td>
            </tr>
            </table></div>

            <strong>Result:</strong> $\gcd(100, 75) = 25$, with $2$ iterations of the while loop.

        3. Compute $\gcd(17,5)$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th>step</th>
            <th><span class="arithmatex">&#92;(n&#92;)</span></th>
            <th><span class="arithmatex">&#92;(m&#92;)</span></th>
            <th><span class="arithmatex">&#92;(r = n &#92;bmod m&#92;)</span></th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(17&#92;)</span></td>
            <td><span class="arithmatex">&#92;(5&#92;)</span></td>
            <td><span class="arithmatex">&#92;(17 &#92;bmod 5 = 2&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(5&#92;)</span></td>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(5 &#92;bmod 2 = 1&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(3&#92;)</span></td>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(2 &#92;bmod 1 = 0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(4&#92;)</span></td>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(0&#92;)</span></td>
            <td>— (loop ends)</td>
            </tr>
            </table></div>

            <strong>Result:</strong> $\gcd(17, 5) = 1$, with $3$ iterations of the while loop.

        4. Compute $\gcd(89,55)$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th>step</th>
            <th><span class="arithmatex">&#92;(n&#92;)</span></th>
            <th><span class="arithmatex">&#92;(m&#92;)</span></th>
            <th><span class="arithmatex">&#92;(r = n &#92;bmod m&#92;)</span></th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(89&#92;)</span></td>
            <td><span class="arithmatex">&#92;(55&#92;)</span></td>
            <td><span class="arithmatex">&#92;(89 &#92;bmod 55 = 34&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(55&#92;)</span></td>
            <td><span class="arithmatex">&#92;(34&#92;)</span></td>
            <td><span class="arithmatex">&#92;(55 &#92;bmod 34 = 21&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(3&#92;)</span></td>
            <td><span class="arithmatex">&#92;(34&#92;)</span></td>
            <td><span class="arithmatex">&#92;(21&#92;)</span></td>
            <td><span class="arithmatex">&#92;(34 &#92;bmod 21 = 13&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(4&#92;)</span></td>
            <td><span class="arithmatex">&#92;(21&#92;)</span></td>
            <td><span class="arithmatex">&#92;(13&#92;)</span></td>
            <td><span class="arithmatex">&#92;(21 &#92;bmod 13 = 8&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(5&#92;)</span></td>
            <td><span class="arithmatex">&#92;(13&#92;)</span></td>
            <td><span class="arithmatex">&#92;(8&#92;)</span></td>
            <td><span class="arithmatex">&#92;(13 &#92;bmod 8 = 5&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(6&#92;)</span></td>
            <td><span class="arithmatex">&#92;(8&#92;)</span></td>
            <td><span class="arithmatex">&#92;(5&#92;)</span></td>
            <td><span class="arithmatex">&#92;(8 &#92;bmod 5 = 3&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(7&#92;)</span></td>
            <td><span class="arithmatex">&#92;(5&#92;)</span></td>
            <td><span class="arithmatex">&#92;(3&#92;)</span></td>
            <td><span class="arithmatex">&#92;(5 &#92;bmod 3 = 2&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(8&#92;)</span></td>
            <td><span class="arithmatex">&#92;(3&#92;)</span></td>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(3 &#92;bmod 2 = 1&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(9&#92;)</span></td>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(2 &#92;bmod 1 = 0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(10&#92;)</span></td>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(0&#92;)</span></td>
            <td>— (loop ends)</td>
            </tr>
            </table></div>

            <strong>Result:</strong> $\gcd(89, 55) = 1$, with $9$ iterations of the while loop.

            The numbers $89, 55, 34, 21, 13, 8, 5, 3, 2, 1$ are consecutive Fibonacci numbers: at every step the quotient is $1$, and the remainders decrease as slowly as possible.

        5. Compute $\gcd(30,84)$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th>step</th>
            <th><span class="arithmatex">&#92;(n&#92;)</span></th>
            <th><span class="arithmatex">&#92;(m&#92;)</span></th>
            <th><span class="arithmatex">&#92;(r = n &#92;bmod m&#92;)</span></th>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(1&#92;)</span></td>
            <td><span class="arithmatex">&#92;(30&#92;)</span></td>
            <td><span class="arithmatex">&#92;(84&#92;)</span></td>
            <td><span class="arithmatex">&#92;(30 &#92;bmod 84 = 30&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(2&#92;)</span></td>
            <td><span class="arithmatex">&#92;(84&#92;)</span></td>
            <td><span class="arithmatex">&#92;(30&#92;)</span></td>
            <td><span class="arithmatex">&#92;(84 &#92;bmod 30 = 24&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(3&#92;)</span></td>
            <td><span class="arithmatex">&#92;(30&#92;)</span></td>
            <td><span class="arithmatex">&#92;(24&#92;)</span></td>
            <td><span class="arithmatex">&#92;(30 &#92;bmod 24 = 6&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(4&#92;)</span></td>
            <td><span class="arithmatex">&#92;(24&#92;)</span></td>
            <td><span class="arithmatex">&#92;(6&#92;)</span></td>
            <td><span class="arithmatex">&#92;(24 &#92;bmod 6 = 0&#92;)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">&#92;(5&#92;)</span></td>
            <td><span class="arithmatex">&#92;(6&#92;)</span></td>
            <td><span class="arithmatex">&#92;(0&#92;)</span></td>
            <td>— (loop ends)</td>
            </tr>
            </table></div>

            <strong>Result:</strong> $\gcd(30, 84) = 6$, with $4$ iterations of the while loop.

    2. Two numbers are coprime if and only if their greatest common divisor is $1$. Hence the coprime pairs are $(17,5)$ and $(89,55)$. The pairs $(1071,462)$, $(100,75)$ and $(30,84)$ are not coprime.

    3. Since $30<84$, we have $30\bmod 84=30$, so the first iteration replaces $(30,84)$ with $(84,30)$: it simply <strong>swaps</strong> the two numbers. From the second iteration on, the execution is the same as for $(84,30)$, which needs $3$ iterations. Therefore the assumption $n\ge m$ is not needed for correctness: if $n<m$, the algorithm only executes one extra iteration.

<a id="esercizio-6-18"></a>

!!! esercizio "Exercise 6.18: Numerical algorithms (E18)"

    Consider the following <strong>naive</strong> algorithm for the greatest common divisor, which tries all the candidate divisors from $\min\{n,m\}$ down to $1$.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> NaiveGCD</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(n, m &#92;ge 1&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><span class="arithmatex">&#92;(&#92;gcd(n, m)&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> NaiveGCD(<span class="arithmatex">&#92;(n&#92;)</span>, <span class="arithmatex">&#92;(m&#92;)</span>)</span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd2-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d := &#92;min&#92;{n,m&#92;}&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd2-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(n &#92;bmod d &#92;ne 0&#92;)</span> <strong>or</strong> <span class="arithmatex">&#92;(m &#92;bmod d &#92;ne 0&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd2-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d &#92;leftarrow d - 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd2-d"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(d&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    Questions 2–4 use the notions of loop invariant, number of steps and input size $|I|$ (chapters «Input size», «Running time» and «Correctness»).

    1. Apply NaiveGCD to $(48,18)$ and $(35,12)$. How many iterations of the while loop are executed? Compare with the number of iterations of the Euclidean algorithm on the same pairs.

    2. Prove that NaiveGCD is correct, using a loop invariant.

    3. Compute the number of steps $S$ of NaiveGCD as a function of $n$, $m$ and $\gcd(n,m)$, counting one step for each execution of a line. Which inputs give the worst case? Compare the two algorithms on $(1000,999)$.

    4. Show that NaiveGCD is exponential in the input size $|I|$.

??? soluzione "Solution"

    1. For $(48,18)$: $d$ starts from $\min\{48,18\}=18$, and the candidates are checked in the order

        $$
        18,17,16,15,14,13,12,11,10,9,8,7,6.
        $$

        The first common divisor is $d=6$ ($48=8\cdot 6$, $18=3\cdot 6$). The while loop body is executed $18-6=12$ times. The Euclidean algorithm needs only $3$ iterations ($48\bmod 18=12$, $18\bmod 12=6$, $12\bmod 6=0$).

        For $(35,12)$: $d$ goes from $12$ down to $1$, since $35$ and $12$ are coprime: $12-1=11$ iterations. The Euclidean algorithm needs $3$ iterations ($35\bmod 12=11$, $12\bmod 11=1$, $11\bmod 1=0$).

    2. Loop invariant:

        !!! chiave ""

            Every time the condition at line [3](#riga-ex-06-numerical-algorithms-exgcd2-b) is evaluated, $1\le \gcd(n,m)\le d\le\min\{n,m\}$, i.e., no number $d'$ with $d<d'\le\min\{n,m\}$ is a common divisor of $n$ and $m$.

        - <strong>Initialization.</strong> $d=\min\{n,m\}$, and every common divisor is at most $\min\{n,m\}$.

        - <strong>Maintenance.</strong> If the condition is true, $d$ is not a common divisor; since no larger number up to $\min\{n,m\}$ is a common divisor, $\gcd(n,m)<d$, i.e., $\gcd(n,m)\le d-1$. Line [4](#riga-ex-06-numerical-algorithms-exgcd2-c) sets $d\leftarrow d-1$, and the invariant holds.

        - <strong>Termination.</strong> $d$ decreases by $1$ at every iteration and, by the invariant, it can never become smaller than $\gcd(n,m)\ge 1$; when $d=\gcd(n,m)$ the condition is false. Hence the loop terminates, and when it terminates $d$ is a common divisor with $d\ge\gcd(n,m)$, hence $d=\gcd(n,m)$, which is returned.

    3. Let $k=\min\{n,m\}-\gcd(n,m)$ be the number of iterations. Lines [2](#riga-ex-06-numerical-algorithms-exgcd2-a) and [6](#riga-ex-06-numerical-algorithms-exgcd2-d) are executed once, line [3](#riga-ex-06-numerical-algorithms-exgcd2-b) $k+1$ times, line [4](#riga-ex-06-numerical-algorithms-exgcd2-c) $k$ times:

        $$
        S=1+(k+1)+k+1=2k+3=2\big(\min\{n,m\}-\gcd(n,m)\big)+3.
        $$

        The worst case is when $n$ and $m$ are coprime: $S=2\min\{n,m\}+1$. For $(1000,999)$ (consecutive numbers are always coprime) NaiveGCD executes $999-1=998$ iterations, while the Euclidean algorithm executes only $2$ ($1000\bmod 999=1$, $999\bmod 1=0$).

    4. Consider the pairs $(n,m)=(M,M-1)$, with $M\ge 3$: they are coprime, so $S=2(M-1)+1=2M-1=\Theta(M)$. The input consists of two natural numbers, so $|I|=\Theta(\log_2 M)$ with $M=\max\{n,m\}$, i.e., there exist $c_1,c_2>0$ such that

        $$
        2^{\frac{1}{c_2}|I|}\le M\le 2^{\frac{1}{c_1}|I|}.
        $$

        Hence, on these inputs, $S=2^{\Theta(|I|)}$, and the worst-case running time satisfies $T(|I|)=2^{\Theta(|I|)}$ (it is also at most $2M+1$ on every input).

        !!! chiave ""

            NaiveGCD is exponential in the input size, while the Euclidean algorithm executes $O(\log_2 m)$ iterations (see the next exercise): for numbers with hundreds of digits, only the Euclidean algorithm can be used.

<a id="esercizio-6-19"></a>

!!! esercizio "Exercise 6.19: Numerical algorithms (E19)"

    Consider the Euclidean algorithm.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> EuclideanAlgorithm</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(n, m &#92;ge 1&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><span class="arithmatex">&#92;(&#92;gcd(n, m)&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> EuclideanAlgorithm(<span class="arithmatex">&#92;(n&#92;)</span>, <span class="arithmatex">&#92;(m&#92;)</span>)</span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd3-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(m &#92;ne 0&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd3-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(r := n &#92;bmod m&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd3-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(n &#92;leftarrow m&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd3-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m &#92;leftarrow r&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd3-e"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(n&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    The Fibonacci numbers are $F_1=F_2=1$ and $F_{k}=F_{k-1}+F_{k-2}$ for $k\ge 3$:

    $$
    1,1,2,3,5,8,13,21,34,55,89,144,233,\dots
    $$

    **Questions**

    Question 4 uses the notions of running time and input size $|I|$ (chapters «Input size» and «Running time»).

    1. Count the number of iterations of the while loop for the pairs of consecutive Fibonacci numbers $(5,3)$, $(8,5)$, $(13,8)$, $(21,13)$, $(34,21)$, $(55,34)$, $(89,55)$, $(144,89)$, $(233,144)$.

    2. Prove that, for every $n\ge m\ge 1$,

        $$
        n\bmod m<\frac n2.
        $$

    3. Using point 2, prove that the number $t$ of iterations of the while loop on input $(n_0,m_0)$ satisfies

        $$
        t<2\log_2 m_0+2.
        $$

    4. Assuming that each arithmetic operation is a step, determine the worst-case running time $T(|I|)$ of the Euclidean algorithm. Is it polynomial?

??? soluzione "Solution"

    1. For a pair $(F_{k+1},F_k)$ with $k\ge 3$ we have $F_k < F_{k+1} < 2F_k$, hence $F_{k+1}\bmod F_k=F_{k+1}-F_k=F_{k-1}$: each iteration moves to the previous pair of consecutive Fibonacci numbers, until $(2,1)\to(1,0)$. The number of iterations is:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;((n, m)&#92;)</span></th>
        <th>iterations <span class="arithmatex">&#92;(t&#92;)</span></th>
        <th><span class="arithmatex">&#92;(2 &#92;log&#95;2 m + 2&#92;)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((5, 3)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;approx 5.17&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((8, 5)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;approx 6.64&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((13, 8)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((21, 13)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;approx 9.40&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((34, 21)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;approx 10.78&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((55, 34)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;approx 12.17&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((89, 55)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;approx 13.56&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((144, 89)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;approx 14.95&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((233, 144)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;approx 16.34&#92;)</span></td>
        </tr>
        </table></div>

        For example, $(89,55)\to(55,34)\to(34,21)\to(21,13)\to(13,8)\to(8,5)\to(5,3)\to(3,2)\to(2,1)\to(1,0)$: $9$ iterations. The number of iterations grows by $1$ each time $m$ is multiplied by about $1.618$: it grows logarithmically in $m$. (Consecutive Fibonacci numbers are, in fact, the worst case of the Euclidean algorithm.)

    2. Let $n\ge m\ge 1$. Two cases:

        - if $m\le\frac n2$, then $n\bmod m<m\le\frac n2$;

        - if $m>\frac n2$, then $m\le n<2m$, so the quotient of $n$ divided by $m$ is $1$ and $n\bmod m=n-m<n-\frac n2=\frac n2$.

    3. Denote by $m_s$ the value of $m$ after $s$ iterations ($m_0$ is the input). In iteration $s+1$ the pair $(n,m)$ becomes $(m,\ n\bmod m)$, so after iteration $s+1$ the variable $n$ is equal to $m_s$ and $m_{s+1}<m_s$. Therefore, if iteration $s+2$ is executed,

        $$
        m_{s+2}=m_s\bmod m_{s+1}
        \quad\text{with}\quad m_s> m_{s+1}\ge 1,
        $$

        and by point 2, $m_{s+2}<\dfrac{m_s}{2}$: every two iterations the value of $m$ is at least halved. By induction on $k$,

        $$
        m_{2k}<\frac{m_0}{2^k}\qquad\text{whenever iteration }2k\text{ is executed}, \ k\ge 1.
        $$

        If $t\le 2$ the bound holds: $t=1<2\le 2\log_2 m_0+2$, and $t=2$ is possible only if $m_0\ge 2$ (for $m_0=1$ the first remainder is $0$), so $2<2\log_2 m_0+2$. Let $t\ge 3$ and let $k=\lfloor (t-1)/2\rfloor\ge 1$. Since $2k\le t-1$, iteration $2k+1$ is executed, hence $m_{2k}\ge 1$. Therefore

        $$
        1\le m_{2k}<\frac{m_0}{2^k}
        \quad\Longrightarrow\quad
        2^k<m_0
        \quad\Longrightarrow\quad
        k<\log_2 m_0 .
        $$

        Since $k\ge\frac{t-2}{2}$, we get $\frac{t-2}{2}<\log_2 m_0$, i.e.,

        $$
        t<2\log_2 m_0+2.
        $$

        The values in the table of point 1 respect this bound.

    4. Each iteration executes a constant number of steps (lines [2](#riga-ex-06-numerical-algorithms-exgcd3-a)–[5](#riga-ex-06-numerical-algorithms-exgcd3-d)), so the number of steps satisfies $S=O(t)=O(\log_2 m_0)$. The input consists of two natural numbers, hence $|I|=\Theta(\log_2 M)$ with $M=\max\{n_0,m_0\}\ge m_0$: there is $c>0$ such that $\log_2 m_0\le\log_2 M\le\frac1c|I|$ for all sufficiently large inputs. Therefore

        $$
        T(|I|)=O(|I|).
        $$

        !!! chiave ""

            The Euclidean algorithm executes $O(\log_2 m)$ iterations, and its worst-case running time is $T(|I|)=O(|I|)$: it is polynomial (linear) in the input size.

        Remark: if the numbers are very large, an operation $n\bmod m$ is not a single step, but it can be executed in a number of steps polynomial in $|I|$; hence the algorithm remains polynomial.

<a id="esercizio-6-20"></a>

!!! esercizio "Exercise 6.20: Numerical algorithms (E20)"

    Consider the following variant of the Euclidean algorithm, which uses only subtractions (this is the version originally described by Euclid).

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> SubtractiveGCD</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(n, m &#92;ge 1&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><span class="arithmatex">&#92;(&#92;gcd(n, m)&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> SubtractiveGCD(<span class="arithmatex">&#92;(n&#92;)</span>, <span class="arithmatex">&#92;(m&#92;)</span>)</span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd4-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(n &#92;ne m&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd4-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &gt; m&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd4-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(n &#92;leftarrow n - m&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>else</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd4-d"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m &#92;leftarrow m - n&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-06-numerical-algorithms-exgcd4-e"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(n&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    Questions 3 and 4 use the notions of loop invariant, running time and input size $|I|$ (chapters «Input size», «Running time» and «Correctness»).

    1. Apply SubtractiveGCD to $(48,18)$, showing the values of $n$ and $m$ at every iteration. Compare with the Euclidean algorithm.

    2. Prove that, for every $n>m\ge 1$, $\gcd(n,m)=\gcd(n-m,m)$.

    3. Prove the correctness of SubtractiveGCD using a loop invariant.

    4. How many iterations are executed on the input $(n,1)$? Is SubtractiveGCD polynomial in the input size?

??? soluzione "Solution"

    1. Execution on $(48,18)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>iteration</th>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(m&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(48&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n &gt; m&#92;)</span>: <span class="arithmatex">&#92;(n &#92;leftarrow 48 - 18 = 30&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(30&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n &gt; m&#92;)</span>: <span class="arithmatex">&#92;(n &#92;leftarrow 30 - 18 = 12&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n &lt; m&#92;)</span>: <span class="arithmatex">&#92;(m &#92;leftarrow 18 - 12 = 6&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n &gt; m&#92;)</span>: <span class="arithmatex">&#92;(n &#92;leftarrow 12 - 6 = 6&#92;)</span></td>
        </tr>
        <tr>
        <td>—</td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n = m&#92;)</span>: loop ends, return <span class="arithmatex">&#92;(6&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Result:</strong> $\gcd(48,18)=6$, with $4$ iterations. The Euclidean algorithm computes $48\bmod 18=12$ in a single step: subtracting $18$ from $48$ as long as possible (iterations 1–2) gives exactly the remainder $12$. In general, a sequence of consecutive subtractions of the same number is one step of the Euclidean algorithm.

    2. Let $n>m\ge 1$. If $d$ is a common divisor of $n$ and $m$, then $n=k_1d$ and $m=k_2d$, so $n-m=(k_1-k_2)d$, with $k_1-k_2\ge 1$ since $n>m$: $d$ is a common divisor of $n-m$ and $m$. Conversely, if $n-m=k_1d$ and $m=k_2d$, then $n=(n-m)+m=(k_1+k_2)d$: $d$ is a common divisor of $n$ and $m$. The two pairs have the same common divisors, hence the same greatest common divisor.

    3. Denote by $n_0,m_0$ the input values. Loop invariant:

        !!! chiave ""

            Every time the condition at line [2](#riga-ex-06-numerical-algorithms-exgcd4-a) is evaluated, $n\ge 1$, $m\ge 1$ and $\gcd(n,m)=\gcd(n_0,m_0)$.

        - <strong>Initialization.</strong> $n=n_0\ge 1$, $m=m_0\ge 1$.

        - <strong>Maintenance.</strong> Assume the invariant and $n\neq m$. If $n>m$, line [4](#riga-ex-06-numerical-algorithms-exgcd4-c) replaces $n$ with $n-m\ge 1$ and, by point 2, $\gcd(n-m,m)=\gcd(n,m)$. If $n<m$, line [7](#riga-ex-06-numerical-algorithms-exgcd4-d) replaces $m$ with $m-n\ge 1$ and, by point 2 with the roles exchanged, $\gcd(n,m-n)=\gcd(n,m)$. In both cases the invariant still holds.

        - <strong>Termination.</strong> The natural number $n+m$ decreases by at least $1$ at every iteration (we subtract a number $\ge 1$), and it is always at least $2$. Hence the loop terminates, and it terminates when $n=m$. Then

            $$
            \gcd(n_0,m_0)=\gcd(n,n)=n,
            $$

            which is returned at line [10](#riga-ex-06-numerical-algorithms-exgcd4-e).

    4. On $(n,1)$ with $n\ge 2$, every iteration executes $n\leftarrow n-1$, until $n=1$: the loop executes $n-1$ iterations (e.g., $(7,1)$ needs $6$ iterations), while the Euclidean algorithm needs only $1$ iteration ($n\bmod 1=0$). Each iteration executes a constant number of steps, so on the inputs $(M,1)$ we have $S=\Theta(M)$. The input size is $|I|=(\lfloor\log_2 M\rfloor+1)+1=\Theta(\log_2 M)$, hence $M=2^{\Theta(|I|)}$ and

        $$
        T(|I|)=2^{\Theta(|I|)}.
        $$

        !!! chiave ""

            SubtractiveGCD is correct, but it is exponential in the input size. Replacing the repeated subtractions with a single $\bmod$ operation gives the Euclidean algorithm, which is polynomial.
