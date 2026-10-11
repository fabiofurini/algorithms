---
title: "Exercises · Sorting algorithms"
---

# Exercises · Sorting algorithms

<div class="info-capitolo" markdown>

**Exercises · Chapter 3** · each solution opens with a click · [:material-book-open-variant: Chapter 3](../basic-algorithms/03-sorting.md) · [:material-file-pdf-box: Exercises, volume 1 (PDF)](../pdf/exercises-1-basic-algorithms.pdf)

</div>

The exercises of this chapter use the three algorithms of the chapter «Sorting algorithms» (Insertion Sort, Exchange Sort and Selection Sort) in their pseudo-code version, with arrays indexed from $1$. The following conventions hold in all the solutions.

!!! nota ""

    - In a trace table, each row shows the state of the array <em>after</em> the operation described in the last column. The current key of Insertion Sort is highlighted in <mark style="background:color-mix(in srgb, #e03131 30%, transparent);color:inherit">red</mark>; the cells modified by a shift, an insertion or a swap are highlighted in <mark style="background:color-mix(in srgb, #1971c2 30%, transparent);color:inherit">blue</mark>.

    - A <strong>key comparison</strong> is the evaluation of a comparison between two keys: $a[j] > \mathit{key}$ in Insertion Sort (evaluated only when $j \ge 1$), $a[i] > a[j]$ in Exchange Sort, $a[j] < a[\mathit{minIdx}]$ in Selection Sort.

    - A <strong>step</strong> is the execution of one line of the pseudo-code; the evaluation of the condition of a <strong>while</strong> loop counts as one step each time it is evaluated, including the last one, which ends the loop.

    - For every $n \in \Z_{\ge 1}$:

        $$
        \sum_{k=1}^{n-1} k = 1 + 2 + \dots + (n-1) = \frac{n(n-1)}{2}.
        $$

<a id="esercizio-3-1"></a>

!!! esercizio "Exercise 3.1: Sorting algorithms (E1)"

    Consider the arrays

    $$
    a=[3,1,2] \qquad \text{and} \qquad b=[2,1,2]
    $$

    and the rearrangements of an array, as in the definition of the sorting problem.

    **Questions**

    1. List all the rearrangements of $a$ and of $b$. Which of them are sorted in non-decreasing order?

    2. Explain why the output of the sorting problem is not just any array sorted in non-decreasing order: give an example of an array that is sorted in non-decreasing order but is not a correct output for $a$.

    3. How many rearrangements has an array of $n$ distinct elements? Compute the number for $n=5$, $n=10$ and $n=20$.

    4. Consider the algorithm <code>BruteForceSort</code> that generates the rearrangements of the array one by one and stops when it finds a sorted one. How many rearrangements may it examine in the worst case for an array of $n$ distinct elements? Compare with the $\frac{n(n-1)}{2}$ shifts executed in the worst case by Insertion Sort.

??? soluzione "Solution"

    1. The array $a=[3,1,2]$ has $3!=6$ rearrangements:

        $$
        [1,2,3],\ [1,3,2],\ [2,1,3],\ [2,3,1],\ [3,1,2],\ [3,2,1].
        $$

        Only $[1,2,3]$ is sorted in non-decreasing order.

        The array $b=[2,1,2]$ contains the value $2$ twice, so exchanging the two $2$'s gives the same array. Its distinct rearrangements are only $3$:

        $$
        [1,2,2],\ [2,1,2],\ [2,2,1],
        $$

        and only $[1,2,2]$ is sorted. In both cases the sorted rearrangement is <strong>unique</strong>: the output of the sorting problem is uniquely determined by the input.

    2. The output must be a sorted <strong>rearrangement of the input</strong>. For example, the arrays $[1,1,1]$ and $[1,2,4]$ are sorted, but they are not a correct output for $a=[3,1,2]$, since they do not contain the same elements. An “algorithm” that overwrites all the entries with $0$ produces a sorted array, but it does not solve the sorting problem. This is why, when we argue that a sorting algorithm is correct, we must also show that the final array contains the original elements.

    3. An array of $n$ distinct elements has

        $$
        n!=n\cdot(n-1)\cdots 2\cdot 1
        $$

        rearrangements: there are $n$ choices for the first position, $n-1$ for the second one, and so on. Hence

        $$
        5!=120,\qquad 10!=3\,628\,800,\qquad 20!=2\,432\,902\,008\,176\,640\,000\approx 2.4\cdot 10^{18}.
        $$

    4. In the worst case the sorted rearrangement is the last one generated, so <code>BruteForceSort</code> may examine all the $n!$ rearrangements (and checking each of them requires up to $n-1$ comparisons). Insertion Sort executes at most $\frac{n(n-1)}{2}$ shifts:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n!&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;frac{n(n-1)}{2}&#92;)</span></th>
        </tr>
        <tr>
        <td>5</td>
        <td>120</td>
        <td>10</td>
        </tr>
        <tr>
        <td>10</td>
        <td>3 628 800</td>
        <td>45</td>
        </tr>
        <tr>
        <td>20</td>
        <td>2 432 902 008 176 640 000</td>
        <td>190</td>
        </tr>
        </table></div>

        Since $n!\ge 2^{n-1}$ for every $n\ge 1$, the number of rearrangements examined by the brute-force approach grows at least exponentially with $n$, while the number of shifts of Insertion Sort grows only quadratically. Already for $n=20$, even examining $10^9$ rearrangements per second, <code>BruteForceSort</code> could need

        $$
        \frac{2.43\cdot 10^{18}}{10^{9}} \text{ s} \approx 2.43\cdot 10^{9} \text{ s} \approx 77 \text{ years}.
        $$

<a id="esercizio-3-2"></a>

!!! esercizio "Exercise 3.2: Sorting algorithms (E2)"

    Consider the problem of <strong>checking</strong> whether an array $a[1..n]$ of $n\ge 1$ natural numbers is sorted in non-decreasing order, and the following algorithm.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> IsSorted</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> natural numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><code>true</code> if <span class="arithmatex">&#92;(a&#91;1&#93;&#92;le a&#91;2&#93;&#92;le&#92;cdots&#92;le a&#91;n&#93;&#92;)</span>, <code>false</code> otherwise</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> IsSorted(a, n)</span></span></div>
    <div class="pc-riga" id="riga-ex-03-sorting-exs2-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-03-sorting-exs2-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n-1&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-03-sorting-exs2-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; a&#91;i+1&#93;&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-03-sorting-exs2-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>false</code></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-03-sorting-exs2-e"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-03-sorting-exs2-f"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>true</code></span></span></div>
    <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. Apply <code>IsSorted</code> to the arrays $[1,3,3,7,9]$, $[2,5,4,8]$, $[9,1,2,3]$ and $[1]$. For each array give the output and the number of steps executed.

    2. Is <code>IsSorted</code> a comparison-based algorithm? How many key comparisons does it perform in the worst case?

    3. Let $S(n)$ be the number of steps executed by <code>IsSorted</code> in the worst case, for an array of $n$ elements. Compute $S(n)$, and compare the number of key comparisons of <code>IsSorted</code> with the worst-case number of key comparisons of the sorting algorithms of the chapter.

    4. Prove that <code>IsSorted</code> returns <code>true</code> if and only if the array $a[1..n]$ is sorted in non-decreasing order.

??? soluzione "Solution"

    1. Executions:

        - $[1,3,3,7,9]$ ($n=5$): the comparisons $1\le 3$, $3\le 3$, $3\le 7$, $7\le 9$ are all satisfied; the loop ends when $i=5$ and the output is <code>true</code>. Steps: line [2](#riga-ex-03-sorting-exs2-a) once, line [3](#riga-ex-03-sorting-exs2-b) $5$ times, lines [4](#riga-ex-03-sorting-exs2-c) and [7](#riga-ex-03-sorting-exs2-e) $4$ times each, line [9](#riga-ex-03-sorting-exs2-f) once:

            $$
            1+5+4+4+1=15.
            $$

        - $[2,5,4,8]$ ($n=4$): $a[1]=2\le 5$; then $a[2]=5>a[3]=4$, so the output is <code>false</code> at $i=2$. Steps: line [2](#riga-ex-03-sorting-exs2-a) once, line [3](#riga-ex-03-sorting-exs2-b) twice, line [4](#riga-ex-03-sorting-exs2-c) twice, line [7](#riga-ex-03-sorting-exs2-e) once, line [5](#riga-ex-03-sorting-exs2-d) once:

            $$
            1+2+2+1+1=7.
            $$

        - $[9,1,2,3]$ ($n=4$): $a[1]=9>a[2]=1$, so the output is <code>false</code> at $i=1$. Steps: lines [2](#riga-ex-03-sorting-exs2-a), [3](#riga-ex-03-sorting-exs2-b), [4](#riga-ex-03-sorting-exs2-c), [5](#riga-ex-03-sorting-exs2-d) once each:

            $$
            1+1+1+1=4.
            $$

        - $[1]$ ($n=1$): the condition $1\le 0$ is false and the output is <code>true</code>. Steps: lines [2](#riga-ex-03-sorting-exs2-a), [3](#riga-ex-03-sorting-exs2-b), [9](#riga-ex-03-sorting-exs2-f) once each:

            $$
            1+1+1=3.
            $$

    2. Yes: the algorithm accesses the keys only to compare two of them (line [4](#riga-ex-03-sorting-exs2-c)); it never modifies them and never performs arithmetic on them. In the worst case it performs $n-1$ key comparisons, one for each pair of consecutive positions.

    3. The worst case is when the algorithm never returns at line [5](#riga-ex-03-sorting-exs2-d), i.e., when the array <strong>is</strong> sorted. The number of times each line is executed is:

        - line [2](#riga-ex-03-sorting-exs2-a) is executed $1$ time;

        - line [3](#riga-ex-03-sorting-exs2-b) is executed $n$ times;

        - line [4](#riga-ex-03-sorting-exs2-c) is executed $n-1$ times;

        - line [5](#riga-ex-03-sorting-exs2-d) is not executed;

        - line [7](#riga-ex-03-sorting-exs2-e) is executed $n-1$ times;

        - line [9](#riga-ex-03-sorting-exs2-f) is executed $1$ time.

        Therefore

        $$
        S(n)=1+n+(n-1)+(n-1)+1=3n,
        $$

        in agreement with point 1 ($15=3\cdot 5$ for the sorted array of $5$ elements, $3=3\cdot 1$ for $n=1$).

        !!! chiave ""

            Checking whether an array is sorted requires at most $n-1$ key comparisons, a number that grows linearly with $n$, while Insertion Sort, Exchange Sort and Selection Sort perform $\frac{n(n-1)}{2}$ key comparisons in the worst case, a number that grows quadratically with $n$. For $n=100$: $99$ comparisons against $4\,950$.

    4. The algorithm returns <code>false</code> only at line [5](#riga-ex-03-sorting-exs2-d), and only after finding an index $i$ with $a[i] > a[i+1]$: in this case the array is not sorted, since two consecutive elements are in the wrong order. Hence, if the array is sorted, the algorithm never returns <code>false</code>; since $i$ increases by $1$ at every iteration, the loop ends after $n-1$ iterations and the algorithm returns <code>true</code> at line [9](#riga-ex-03-sorting-exs2-f).

        Conversely, if the algorithm returns <code>true</code>, the loop has been completed, so the comparison at line [4](#riga-ex-03-sorting-exs2-c) was false for every $i \in \{1, 2, \dots, n-1\}$:

        $$
        a[1] \le a[2], \quad a[2] \le a[3], \quad \dots, \quad a[n-1] \le a[n].
        $$

        Chaining these inequalities, $a[1] \le a[2] \le \dots \le a[n]$: the array is sorted. Hence <code>IsSorted</code> returns <code>true</code> if and only if the array is sorted in non-decreasing order.

<a id="esercizio-3-3"></a>

!!! esercizio "Exercise 3.3: Sorting algorithms (E3)"

    Consider the array of records $(\mathit{key},\ \mathit{label})$, in which only the keys are compared,

    $$
    a=[(3,A),\ (1,B),\ (3,C),\ (2,D),\ (1,E)],
    $$

    and the algorithms Insertion Sort and Selection Sort of the chapter (Insertion Sort shifts $a[j]$ to the right while $a[j]>\mathit{key}$; Selection Sort swaps $a[i]$ with the minimum of $a[i..n]$, choosing the first minimum found).

    **Questions**

    1. Apply Insertion Sort to $a$, showing the array after each iteration of the outer loop. Is the result stable?

    2. Apply Selection Sort to $a$, showing the array after each iteration of the outer loop. Is the result stable?

    3. A student replaces the condition $a[j]>\mathit{key}$ of Insertion Sort with $a[j]\ge \mathit{key}$. Is the new algorithm still correct? Is it stable?

    4. Are Insertion Sort and Selection Sort in-place? Describe a sorting method that is not in-place.

??? soluzione "Solution"

    1. Insertion Sort (the inserted key is highlighted in <mark style="background:color-mix(in srgb, #e03131 30%, transparent);color:inherit">red</mark>):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        </tr>
        <tr>
        <td>initial</td>
        <td><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa"><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td class="cella-rossa"><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td class="cella-rossa"><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td class="cella-rossa"><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        </tr>
        </table></div>

        For $i=3$, $a[2]=(3,A)$ is not $>3$, so $(3,C)$ stays after $(3,A)$; for $i=5$, the shifts stop at $(1,B)$, since $1>1$ is false. In the output $B$ precedes $E$ and $A$ precedes $C$, as in the input: the result is <strong>stable</strong>. In general, Insertion Sort is stable, because a key is never moved before an equal key (the shift condition is a strict inequality).

    2. Selection Sort (the two swapped positions are highlighted in <mark style="background:color-mix(in srgb, #1971c2 30%, transparent);color:inherit">blue</mark>):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        </tr>
        <tr>
        <td>initial</td>
        <td><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu"><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        <td>2</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td>5</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td class="cella-blu"><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td>4</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;((1,B)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((1,E)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((2,D)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,C)&#92;)</span></td>
        <td><span class="arithmatex">&#92;((3,A)&#92;)</span></td>
        <td>4 (no swap)</td>
        </tr>
        </table></div>

        The keys are sorted, but $(3,C)$ precedes $(3,A)$, while in the input $A$ preceded $C$: the result is <strong>not stable</strong>. The swap at $i=2$ moved $(3,A)$ from position $2$ to position $5$, “jumping over” $(3,C)$. Hence Selection Sort is not stable (an even smaller counterexample is $[(2,A),(2,B),(1,C)]$, which becomes $[(1,C),(2,B),(2,A)]$).

    3. With $a[j]\ge \mathit{key}$ the algorithm is still <strong>correct</strong>: the keys are still sorted, because $\mathit{key}$ is inserted after all the elements $<\mathit{key}$ and before all the elements $\ge \mathit{key}$. However, it is <strong>not stable</strong>, since $\mathit{key}$ is moved before the equal keys. On $a$:

        $$
        [(3,A),(1,B),(3,C),(2,D),(1,E)]\ \longrightarrow\ [(1,E),(1,B),(2,D),(3,C),(3,A)],
        $$

        where both pairs of equal keys are inverted. Moreover, it executes more shifts than necessary when there are equal keys.

    4. Both algorithms are <strong>in-place</strong>: they rearrange the elements inside the array $a$, and they use only a constant number of auxiliary variables ($i$, $j$, $\mathit{key}$ for Insertion Sort; $i$, $j$, $\mathit{minIdx}$, $\mathit{tmp}$ for Selection Sort), independently of $n$.

        A method that is <strong>not</strong> in-place: create a new array $b[1..n]$; for $k \in \{1, 2, \dots, n\}$, find the minimum among the elements of $a$ not yet copied, copy it into $b[k]$ and mark it as used (for example with an array of $n$ boolean flags); finally return $b$. This method uses extra memory proportional to $n$ (the array $b$ and the flags), so it is not in-place.

<a id="esercizio-3-4"></a>

!!! esercizio "Exercise 3.4: Sorting algorithms (E4)"

    Consider the following arrays of natural numbers:

    1. $a = [5, 2, 4, 6, 1, 3]$

    2. $a = [8, 3, 7, 4, 9, 2]$

    3. $a = [6, 5, 4, 3, 2, 1]$

    4. $a = [1, 2, 3, 4, 5, 6]$

    5. $a = [10, 5, 15, 3]$

    **Questions**

    1. Apply the <code>InsertionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the key being inserted, every shift performed by the inner loop and the state of the array after the insertion.

    2. For each array, count the key comparisons $a[j] > \mathit{key}$ and the shifts performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [5, 2, 4, 6, 1, 3]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">2</td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>2</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">4</td>
        <td>2</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>4</td>
        <td>2</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=5&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le 4&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">6</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=6&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&#92;le 6&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=1&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 2&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>5</td>
        <td class="cella-rossa">3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;6&#93;=3&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=6&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=5&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le 3&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 3&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">5</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>insert 2 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>insert 4 between 2 and 5</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">6</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>6 already in position</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>3</td>
        <td>insert 1 at the beginning</td>
        </tr>
        <tr>
        <td>6</td>
        <td class="cella-rossa">3</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>insert 3 between 2 and 4</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 12 key comparisons and 9 shifts, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    2. Array $a = [8, 3, 7, 4, 9, 2]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">3</td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=3&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>3</td>
        <td>8</td>
        <td class="cella-blu">8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=8&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 8&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">7</td>
        <td>3</td>
        <td>8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=7&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>7</td>
        <td>3</td>
        <td>8</td>
        <td class="cella-blu">8</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=8&gt;7&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 8&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td>8</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le 7&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 7&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">4</td>
        <td>3</td>
        <td>7</td>
        <td>8</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td>8</td>
        <td class="cella-blu">8</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=8&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 8&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">7</td>
        <td>8</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 7&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le 4&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">9</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=9&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td class="cella-blu">9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=8&#92;le 9&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 9&#92;)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>5</td>
        <td class="cella-rossa">2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;6&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=9&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td class="cella-blu">8</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=8&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 8&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td class="cella-blu">7</td>
        <td>8</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=7&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 7&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">3</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td>insert 3 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">7</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">8</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td>insert 7 between 3 and 8</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">4</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">8</td>
        <td>9</td>
        <td>2</td>
        <td>insert 4 between 3 and 7</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">9</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>2</td>
        <td>9 already in position</td>
        </tr>
        <tr>
        <td>6</td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">9</td>
        <td>insert 2 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 12 key comparisons and 9 shifts, and the sorted array is

        $$
        [2, 3, 4, 7, 8, 9].
        $$

    3. Array $a = [6, 5, 4, 3, 2, 1]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">5</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=5&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>5</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=6&gt;5&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">4</td>
        <td>5</td>
        <td>6</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=3&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=5&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=4&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>5</td>
        <td class="cella-rossa">1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;6&#93;=1&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=6&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=5&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 2&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 1&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">5</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>insert 5 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">4</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>insert 4 at the beginning</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">3</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>2</td>
        <td>1</td>
        <td>insert 3 at the beginning</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>1</td>
        <td>insert 2 at the beginning</td>
        </tr>
        <tr>
        <td>6</td>
        <td class="cella-rossa">1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>insert 1 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 15 shifts, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    4. Array $a = [1, 2, 3, 4, 5, 6]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le 2&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=3&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le 3&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;le 4&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=5&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;le 5&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>5</td>
        <td class="cella-rossa">6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;6&#93;=6&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;le 6&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftarrow 6&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>2 already in position</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>3 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>4 already in position</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>5 already in position</td>
        </tr>
        <tr>
        <td>6</td>
        <td class="cella-rossa">6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>6 already in position</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 5 key comparisons and 0 shifts, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    5. Array $a = [10, 5, 15, 3]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">5</td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=5&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>5</td>
        <td>10</td>
        <td class="cella-blu">10</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=10&gt;5&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 10&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>10</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">15</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=15&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>15</td>
        <td>5</td>
        <td>10</td>
        <td class="cella-blu">15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;le 15&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 15&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=3&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td class="cella-blu">15</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 15&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td class="cella-blu">10</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 10&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>3</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>10</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 3&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">5</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">10</td>
        <td>15</td>
        <td>3</td>
        <td>insert 5 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">15</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>3</td>
        <td>15 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">3</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td>insert 3 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 5 key comparisons and 4 shifts, and the sorted array is

        $$
        [3, 5, 10, 15].
        $$

<a id="esercizio-3-5"></a>

!!! esercizio "Exercise 3.5: Sorting algorithms (E5)"

    Consider the following arrays of natural numbers:

    1. $a = [7, 2, 9, 4]$

    2. $a = [15, 10, 5]$

    3. $a = [3, 1, 4, 1, 5, 9, 2, 6]$

    4. $a = [20, 18, 16, 14]$

    5. $a = [11, 11, 11]$

    **Questions**

    1. Apply the <code>InsertionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the key being inserted, every shift performed by the inner loop and the state of the array after the insertion.

    2. For each array, count the key comparisons $a[j] > \mathit{key}$ and the shifts performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [7, 2, 9, 4]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">2</td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>2</td>
        <td>7</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=7&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 7&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">9</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=9&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>2</td>
        <td>7</td>
        <td class="cella-blu">9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&#92;le 9&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 9&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">4</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>4</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=9&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>4</td>
        <td>2</td>
        <td>7</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 7&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le 4&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>4</td>
        <td>insert 2 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">9</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td>9 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td>insert 4 between 2 and 7</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 5 key comparisons and 3 shifts, and the sorted array is

        $$
        [2, 4, 7, 9].
        $$

    2. Array $a = [15, 10, 5]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">10</td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=10&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>10</td>
        <td>15</td>
        <td class="cella-blu">15</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=15&gt;10&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 15&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td class="cella-blu">10</td>
        <td>15</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 10&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">5</td>
        <td>10</td>
        <td>15</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=5&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td class="cella-blu">15</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=15&gt;5&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 15&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>5</td>
        <td>10</td>
        <td class="cella-blu">10</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=10&gt;5&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 10&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>10</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 5&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">10</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td>5</td>
        <td>insert 10 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">5</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td>insert 5 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 3 shifts, and the sorted array is

        $$
        [5, 10, 15].
        $$

    3. Array $a = [3, 1, 4, 1, 5, 9, 2, 6]$ ($n=8$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;7&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;8&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">1</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=1&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">4</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&#92;le 4&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=1&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le 1&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">5</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=5&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;le 5&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>5</td>
        <td class="cella-rossa">9</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;6&#93;=9&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;le 9&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftarrow 9&#92;)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>6</td>
        <td class="cella-rossa">2</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;7&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=9&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;7&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=1&#92;le 2&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>7</td>
        <td class="cella-rossa">6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;8&#93;=6&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 7&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=9&gt;6&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;8&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=5&#92;le 6&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;7&#93;&#92;leftarrow 6&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;7&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;8&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>insert 1 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">4</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>4 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">1</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>insert 1 between 1 and 3</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">5</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>5 already in position</td>
        </tr>
        <tr>
        <td>6</td>
        <td class="cella-rossa">9</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>9 already in position</td>
        </tr>
        <tr>
        <td>7</td>
        <td class="cella-rossa">2</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">9</td>
        <td>6</td>
        <td>insert 2 between 1 and 3</td>
        </tr>
        <tr>
        <td>8</td>
        <td class="cella-rossa">6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td>insert 6 between 5 and 9</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 14 key comparisons and 8 shifts, and the sorted array is

        $$
        [1, 1, 2, 3, 4, 5, 6, 9].
        $$

    4. Array $a = [20, 18, 16, 14]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">18</td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=18&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>18</td>
        <td>20</td>
        <td class="cella-blu">20</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=20&gt;18&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 20&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>18</td>
        <td class="cella-blu">18</td>
        <td>20</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 18&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">16</td>
        <td>18</td>
        <td>20</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=16&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>16</td>
        <td>18</td>
        <td>20</td>
        <td class="cella-blu">20</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=20&gt;16&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 20&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>16</td>
        <td>18</td>
        <td class="cella-blu">18</td>
        <td>20</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=18&gt;16&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 18&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>16</td>
        <td class="cella-blu">16</td>
        <td>18</td>
        <td>20</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 16&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">14</td>
        <td>16</td>
        <td>18</td>
        <td>20</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=14&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>14</td>
        <td>16</td>
        <td>18</td>
        <td>20</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=20&gt;14&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 20&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>14</td>
        <td>16</td>
        <td>18</td>
        <td class="cella-blu">18</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=18&gt;14&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 18&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>14</td>
        <td>16</td>
        <td class="cella-blu">16</td>
        <td>18</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=16&gt;14&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 16&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td class="cella-blu">14</td>
        <td>16</td>
        <td>18</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 14&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">18</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">20</td>
        <td>16</td>
        <td>14</td>
        <td>insert 18 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">16</td>
        <td class="cella-blu">16</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">20</td>
        <td>14</td>
        <td>insert 16 at the beginning</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">14</td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">16</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">20</td>
        <td>insert 14 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 6 shifts, and the sorted array is

        $$
        [14, 16, 18, 20].
        $$

    5. Array $a = [11, 11, 11]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">11</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=11&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td class="cella-blu">11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=11&#92;le 11&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 11&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">11</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=11&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td class="cella-blu">11</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=11&#92;le 11&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 11&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">11</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>11 already in position</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">11</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>11 already in position</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 2 key comparisons and 0 shifts, and the sorted array is

        $$
        [11, 11, 11].
        $$

<a id="esercizio-3-6"></a>

!!! esercizio "Exercise 3.6: Sorting algorithms (E6)"

    Consider the following arrays of natural numbers:

    1. $a = [9, 3, 7, 2]$

    2. $a = [12, 4, 18, 6, 10]$

    3. $a = [5, 4, 3, 2, 1]$

    4. $a = [100, 50, 25]$

    5. $a = [8]$

    **Questions**

    1. Apply the <code>InsertionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the key being inserted, every shift performed by the inner loop and the state of the array after the insertion.

    2. For each array, count the key comparisons $a[j] > \mathit{key}$ and the shifts performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [9, 3, 7, 2]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">3</td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=3&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>3</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=9&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>9</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">7</td>
        <td>3</td>
        <td>9</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=7&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>7</td>
        <td>3</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=9&gt;7&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le 7&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 7&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=9&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 7&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">3</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">9</td>
        <td>7</td>
        <td>2</td>
        <td>insert 3 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">7</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td>2</td>
        <td>insert 7 between 3 and 9</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td>insert 2 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 5 shifts, and the sorted array is

        $$
        [2, 3, 7, 9].
        $$

    2. Array $a = [12, 4, 18, 6, 10]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">4</td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>4</td>
        <td>12</td>
        <td class="cella-blu">12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=12&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 12&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">18</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=18&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>18</td>
        <td>4</td>
        <td>12</td>
        <td class="cella-blu">18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=12&#92;le 18&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 18&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">6</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=6&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>6</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td class="cella-blu">18</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=18&gt;6&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 18&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>6</td>
        <td>4</td>
        <td>12</td>
        <td class="cella-blu">12</td>
        <td>18</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=12&gt;6&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 12&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td>12</td>
        <td>18</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=4&#92;le 6&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">10</td>
        <td>4</td>
        <td>6</td>
        <td>12</td>
        <td>18</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=10&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>10</td>
        <td>4</td>
        <td>6</td>
        <td>12</td>
        <td>18</td>
        <td class="cella-blu">18</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=18&gt;10&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 18&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>10</td>
        <td>4</td>
        <td>6</td>
        <td>12</td>
        <td class="cella-blu">12</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=12&gt;10&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 12&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">10</td>
        <td>12</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&#92;le 10&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 10&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">4</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>insert 4 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">18</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>18 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">6</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">18</td>
        <td>10</td>
        <td>insert 6 between 4 and 12</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">10</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">18</td>
        <td>insert 10 between 6 and 12</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 8 key comparisons and 5 shifts, and the sorted array is

        $$
        [4, 6, 10, 12, 18].
        $$

    3. Array $a = [5, 4, 3, 2, 1]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">4</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">3</td>
        <td>4</td>
        <td>5</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=3&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=5&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=4&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=1&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=5&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 5&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 4&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 2&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 1&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">4</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>insert 4 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">3</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>2</td>
        <td>1</td>
        <td>insert 3 at the beginning</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>1</td>
        <td>insert 2 at the beginning</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>insert 1 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 10 shifts, and the sorted array is

        $$
        [1, 2, 3, 4, 5].
        $$

    4. Array $a = [100, 50, 25]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">50</td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=50&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>50</td>
        <td>100</td>
        <td class="cella-blu">100</td>
        <td>25</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=100&gt;50&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 100&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>50</td>
        <td class="cella-blu">50</td>
        <td>100</td>
        <td>25</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 50&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">25</td>
        <td>50</td>
        <td>100</td>
        <td>25</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=25&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>25</td>
        <td>50</td>
        <td>100</td>
        <td class="cella-blu">100</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=100&gt;25&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 100&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>25</td>
        <td>50</td>
        <td class="cella-blu">50</td>
        <td>100</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=50&gt;25&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 50&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>25</td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td>100</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 25&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">50</td>
        <td class="cella-blu">50</td>
        <td class="cella-blu">100</td>
        <td>25</td>
        <td>insert 50 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">25</td>
        <td class="cella-blu">25</td>
        <td class="cella-blu">50</td>
        <td class="cella-blu">100</td>
        <td>insert 25 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 3 shifts, and the sorted array is

        $$
        [25, 50, 100].
        $$

    5. Array $a = [8]$ ($n=1$).

        The array has a single element: the outer loop is not executed and the array is already sorted.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td>8</td>
        <td>initial state: <span class="arithmatex">&#92;(n=1&#92;)</span>, the outer loop is not executed</td>
        </tr>
        </table></div>

        The sorted array is $[8]$, obtained with no key comparison and no shift.

<a id="esercizio-3-7"></a>

!!! esercizio "Exercise 3.7: Sorting algorithms (E7)"

    Consider the following arrays of natural numbers:

    1. $a = [6, 1, 8, 2, 5]$

    2. $a = [13, 11, 9, 7]$

    3. $a = [2, 8, 4, 6]$

    4. $a = [30, 20, 10]$

    5. $a = [5, 10, 15, 20]$

    **Questions**

    1. Apply the <code>InsertionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the key being inserted, every shift performed by the inner loop and the state of the array after the insertion.

    2. For each array, count the key comparisons $a[j] > \mathit{key}$ and the shifts performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [6, 1, 8, 2, 5]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">1</td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=1&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>1</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=6&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">8</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=8&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>8</td>
        <td>1</td>
        <td>6</td>
        <td class="cella-blu">8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&#92;le 8&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 8&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">2</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td class="cella-blu">8</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=8&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 8&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>6</td>
        <td>8</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le 2&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">5</td>
        <td>1</td>
        <td>2</td>
        <td>6</td>
        <td>8</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=5&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>6</td>
        <td>8</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=8&gt;5&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 8&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&gt;5&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le 5&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 5&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>insert 1 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">8</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>8 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td>5</td>
        <td>insert 2 between 1 and 6</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">5</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td>insert 5 between 2 and 6</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 8 key comparisons and 5 shifts, and the sorted array is

        $$
        [1, 2, 5, 6, 8].
        $$

    2. Array $a = [13, 11, 9, 7]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">11</td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=11&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>11</td>
        <td>13</td>
        <td class="cella-blu">13</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=13&gt;11&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 13&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td class="cella-blu">11</td>
        <td>13</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 11&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">9</td>
        <td>11</td>
        <td>13</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=9&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>9</td>
        <td>11</td>
        <td>13</td>
        <td class="cella-blu">13</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=13&gt;9&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 13&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>9</td>
        <td>11</td>
        <td class="cella-blu">11</td>
        <td>13</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=11&gt;9&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 11&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td>11</td>
        <td>13</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 9&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">7</td>
        <td>9</td>
        <td>11</td>
        <td>13</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=7&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>11</td>
        <td>13</td>
        <td class="cella-blu">13</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=13&gt;7&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 13&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>7</td>
        <td>9</td>
        <td>11</td>
        <td class="cella-blu">11</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=11&gt;7&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 11&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>7</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td>11</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=9&gt;7&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>11</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 7&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">11</td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">13</td>
        <td>9</td>
        <td>7</td>
        <td>insert 11 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">9</td>
        <td class="cella-blu">9</td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">13</td>
        <td>7</td>
        <td>insert 9 at the beginning</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">7</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">13</td>
        <td>insert 7 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 6 shifts, and the sorted array is

        $$
        [7, 9, 11, 13].
        $$

    3. Array $a = [2, 8, 4, 6]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">8</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=8&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>8</td>
        <td>2</td>
        <td class="cella-blu">8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le 8&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 8&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">4</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=4&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>4</td>
        <td>2</td>
        <td>8</td>
        <td class="cella-blu">8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=8&gt;4&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 8&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le 4&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">6</td>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=6&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>6</td>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=8&gt;6&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 8&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&#92;le 6&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 6&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">8</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td>8 already in position</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">8</td>
        <td>6</td>
        <td>insert 4 between 2 and 8</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">6</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td>insert 6 between 4 and 8</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 5 key comparisons and 2 shifts, and the sorted array is

        $$
        [2, 4, 6, 8].
        $$

    4. Array $a = [30, 20, 10]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">20</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=20&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>20</td>
        <td>30</td>
        <td class="cella-blu">30</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=30&gt;20&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 30&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td class="cella-blu">20</td>
        <td>30</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 20&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">10</td>
        <td>20</td>
        <td>30</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=10&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td class="cella-blu">30</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=30&gt;10&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 30&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>10</td>
        <td>20</td>
        <td class="cella-blu">20</td>
        <td>30</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=20&gt;10&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 20&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td class="cella-blu">10</td>
        <td>20</td>
        <td>30</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 10&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">20</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td>10</td>
        <td>insert 20 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">10</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td>insert 10 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 3 shifts, and the sorted array is

        $$
        [10, 20, 30].
        $$

    5. Array $a = [5, 10, 15, 20]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">10</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=10&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>5</td>
        <td class="cella-blu">10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&#92;le 10&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 10&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">15</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=15&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>15</td>
        <td>5</td>
        <td>10</td>
        <td class="cella-blu">15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;le 15&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 15&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">20</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=20&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;le 20&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 20&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">10</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>10 already in position</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">15</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>15 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">20</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>20 already in position</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 0 shifts, and the sorted array is

        $$
        [5, 10, 15, 20].
        $$

<a id="esercizio-3-8"></a>

!!! esercizio "Exercise 3.8: Sorting algorithms (E8)"

    Consider the following arrays of natural numbers:

    1. $a = [14, 7, 21, 3, 18]$

    2. $a = [40, 30, 20, 10]$

    3. $a = [3, 6, 1, 9, 2]$

    4. $a = [25, 12, 50]$

    5. $a = [17, 17, 17, 17]$

    **Questions**

    1. Apply the <code>InsertionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the key being inserted, every shift performed by the inner loop and the state of the array after the insertion.

    2. For each array, count the key comparisons $a[j] > \mathit{key}$ and the shifts performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [14, 7, 21, 3, 18]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">7</td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=7&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">14</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=14&gt;7&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 14&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td class="cella-blu">7</td>
        <td>14</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 7&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">21</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=21&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>21</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=14&#92;le 21&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 21&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=3&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td class="cella-blu">21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=21&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 21&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">14</td>
        <td>21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=14&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 14&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">7</td>
        <td>14</td>
        <td>21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=7&gt;3&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 7&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">18</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=18&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>18</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td class="cella-blu">21</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=21&gt;18&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 21&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>18</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">18</td>
        <td>21</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=14&#92;le 18&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 18&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">7</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">14</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td>insert 7 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">21</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td>21 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">3</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">21</td>
        <td>18</td>
        <td>insert 3 at the beginning</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">18</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">21</td>
        <td>insert 18 between 14 and 21</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 7 key comparisons and 5 shifts, and the sorted array is

        $$
        [3, 7, 14, 18, 21].
        $$

    2. Array $a = [40, 30, 20, 10]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">30</td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=30&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>30</td>
        <td>40</td>
        <td class="cella-blu">40</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=40&gt;30&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 40&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>30</td>
        <td class="cella-blu">30</td>
        <td>40</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 30&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">20</td>
        <td>30</td>
        <td>40</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=20&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>20</td>
        <td>30</td>
        <td>40</td>
        <td class="cella-blu">40</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=40&gt;20&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 40&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>20</td>
        <td>30</td>
        <td class="cella-blu">30</td>
        <td>40</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=30&gt;20&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 30&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td class="cella-blu">20</td>
        <td>30</td>
        <td>40</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 20&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">10</td>
        <td>20</td>
        <td>30</td>
        <td>40</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=10&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td>40</td>
        <td class="cella-blu">40</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=40&gt;10&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 40&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td class="cella-blu">30</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=30&gt;10&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 30&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>10</td>
        <td>20</td>
        <td class="cella-blu">20</td>
        <td>30</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=20&gt;10&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 20&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td class="cella-blu">10</td>
        <td>20</td>
        <td>30</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 10&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">30</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">40</td>
        <td>20</td>
        <td>10</td>
        <td>insert 30 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">20</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">40</td>
        <td>10</td>
        <td>insert 20 at the beginning</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">10</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">40</td>
        <td>insert 10 at the beginning</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 6 shifts, and the sorted array is

        $$
        [10, 20, 30, 40].
        $$

    3. Array $a = [3, 6, 1, 9, 2]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">6</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=6&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>3</td>
        <td class="cella-blu">6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le 6&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">1</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=1&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;1&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>3</td>
        <td>6</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">9</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=9&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td class="cella-blu">9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&#92;le 9&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 9&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td class="cella-rossa">2</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;5&#93;=2&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>9</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=9&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftarrow 9&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td class="cella-blu">6</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 6&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&gt;2&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 3&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>6</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le 2&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 2&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">6</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td>6 already in position</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">6</td>
        <td>9</td>
        <td>2</td>
        <td>insert 1 at the beginning</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">9</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>9</td>
        <td>2</td>
        <td>9 already in position</td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-rossa">2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td>insert 2 between 1 and 3</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 8 key comparisons and 5 shifts, and the sorted array is

        $$
        [1, 2, 3, 6, 9].
        $$

    4. Array $a = [25, 12, 50]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">12</td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=12&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>0</td>
        <td>12</td>
        <td>25</td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=25&gt;12&#92;)</span>: shift <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 25&#92;)</span>; <span class="arithmatex">&#92;(j&#92;leftarrow 0&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>12</td>
        <td class="cella-blu">12</td>
        <td>25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(j=0&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftarrow 12&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">50</td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=50&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>50</td>
        <td>12</td>
        <td>25</td>
        <td class="cella-blu">50</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=25&#92;le 50&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 50&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">12</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td>insert 12 at the beginning</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">50</td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td>50 already in position</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 2 key comparisons and 1 shift, and the sorted array is

        $$
        [12, 25, 50].
        $$

    5. Array $a = [17, 17, 17, 17]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-rossa">17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;2&#93;=17&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td class="cella-blu">17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=17&#92;le 17&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftarrow 17&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td class="cella-rossa">17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;3&#93;=17&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td class="cella-blu">17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=17&#92;le 17&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftarrow 17&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td class="cella-rossa">17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{key} &#92;leftarrow a&#91;4&#93;=17&#92;)</span>; <span class="arithmatex">&#92;(j &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td class="cella-blu">17</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=17&#92;le 17&#92;)</span>: exit; insert <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftarrow 17&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{key}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-rossa">17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17 already in position</td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-rossa">17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17 already in position</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-rossa">17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17 already in position</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 0 shifts, and the sorted array is

        $$
        [17, 17, 17, 17].
        $$

<a id="esercizio-3-9"></a>

!!! esercizio "Exercise 3.9: Sorting algorithms (E9)"

    Consider the following arrays of natural numbers:

    1. $a = [5, 2, 4, 6, 1, 3]$

    2. $a = [8, 3, 7, 4, 9, 2]$

    3. $a = [6, 5, 4, 3, 2, 1]$

    4. $a = [1, 2, 3, 4, 5, 6]$

    5. $a = [10, 5, 15, 3]$

    **Questions**

    1. Apply the <code>ExchangeSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every comparison, say whether a swap is performed and give the state of the array after the comparison.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [5, 2, 4, 6, 1, 3]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">5</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&gt;a&#91;2&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le a&#91;3&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le a&#91;4&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td class="cella-blu">1</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&gt;a&#91;5&#93;=1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;6&#93;=3&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=5&gt;a&#91;3&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&#92;le a&#91;4&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>5</td>
        <td>6</td>
        <td class="cella-blu">4</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&gt;a&#91;5&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le a&#91;6&#93;=3&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&#92;le a&#91;4&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&gt;a&#91;5&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;a&#91;6&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&gt;a&#91;5&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=5&gt;a&#91;6&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=6&gt;a&#91;6&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">5</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..6&#93;)=1&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td class="cella-blu">4</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..6&#93;)=2&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..6&#93;)=3&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..6&#93;)=4&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..6&#93;)=5&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 9 swaps, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    2. Array $a = [8, 3, 7, 4, 9, 2]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=8&gt;a&#91;2&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le a&#91;3&#93;=7&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le a&#91;4&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le a&#91;5&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td class="cella-blu">2</td>
        <td>8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;a&#91;6&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>2</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">8</td>
        <td>4</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=8&gt;a&#91;3&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>8</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&gt;a&#91;4&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td>7</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&#92;le a&#91;5&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>8</td>
        <td>7</td>
        <td>9</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&gt;a&#91;6&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">8</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=8&gt;a&#91;4&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=7&#92;le a&#91;5&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>8</td>
        <td>9</td>
        <td class="cella-blu">7</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=7&gt;a&#91;6&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>8</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=8&#92;le a&#91;5&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=8&gt;a&#91;6&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=9&gt;a&#91;6&#93;=8&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">8</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..6&#93;)=2&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..6&#93;)=3&#92;)</span> (3 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">8</td>
        <td>9</td>
        <td class="cella-blu">7</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..6&#93;)=4&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..6&#93;)=7&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..6&#93;)=8&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 9 swaps, and the sorted array is

        $$
        [2, 3, 4, 7, 8, 9].
        $$

    3. Array $a = [6, 5, 4, 3, 2, 1]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=6&gt;a&#91;2&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&gt;a&#91;3&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=4&gt;a&#91;4&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td class="cella-blu">2</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;a&#91;5&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&gt;a&#91;6&#93;=1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&gt;a&#91;3&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=5&gt;a&#91;4&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&gt;a&#91;5&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&gt;a&#91;6&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&gt;a&#91;4&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&gt;a&#91;5&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;a&#91;6&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&gt;a&#91;5&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=5&gt;a&#91;6&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=6&gt;a&#91;6&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..6&#93;)=1&#92;)</span> (5 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..6&#93;)=2&#92;)</span> (4 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..6&#93;)=3&#92;)</span> (3 swaps)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..6&#93;)=4&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..6&#93;)=5&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 15 swaps, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    4. Array $a = [1, 2, 3, 4, 5, 6]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;2&#93;=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;3&#93;=3&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;4&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;6&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le a&#91;3&#93;=3&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le a&#91;4&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le a&#91;6&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;le a&#91;4&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;le a&#91;6&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;le a&#91;6&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;le a&#91;6&#93;=6&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..6&#93;)=1&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..6&#93;)=2&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..6&#93;)=3&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..6&#93;)=4&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..6&#93;)=5&#92;)</span> (0 swaps)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 0 swaps, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    5. Array $a = [10, 5, 15, 3]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">10</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=10&gt;a&#91;2&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&#92;le a&#91;3&#93;=15&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>10</td>
        <td>15</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&gt;a&#91;4&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>3</td>
        <td>10</td>
        <td>15</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;le a&#91;3&#93;=15&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td class="cella-blu">5</td>
        <td>15</td>
        <td class="cella-blu">10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&gt;a&#91;4&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&gt;a&#91;4&#93;=10&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">10</td>
        <td>15</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=3&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">5</td>
        <td>15</td>
        <td class="cella-blu">10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=5&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=10&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 4 swaps, and the sorted array is

        $$
        [3, 5, 10, 15].
        $$

<a id="esercizio-3-10"></a>

!!! esercizio "Exercise 3.10: Sorting algorithms (E10)"

    Consider the following arrays of natural numbers:

    1. $a = [7, 2, 9, 4]$

    2. $a = [15, 10, 5]$

    3. $a = [3, 1, 4, 1, 5, 9, 2, 6]$

    4. $a = [20, 18, 16, 14]$

    5. $a = [11, 11, 11]$

    **Questions**

    1. Apply the <code>ExchangeSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every comparison, say whether a swap is performed and give the state of the array after the comparison.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [7, 2, 9, 4]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=7&gt;a&#91;2&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le a&#91;3&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le a&#91;4&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&#92;le a&#91;3&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>9</td>
        <td class="cella-blu">7</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&gt;a&#91;4&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=9&gt;a&#91;4&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=2&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>9</td>
        <td class="cella-blu">7</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=4&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=7&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 3 swaps, and the sorted array is

        $$
        [2, 4, 7, 9].
        $$

    2. Array $a = [15, 10, 5]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=15&gt;a&#91;2&#93;=10&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">5</td>
        <td>15</td>
        <td class="cella-blu">10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=10&gt;a&#91;3&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=15&gt;a&#91;3&#93;=10&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">15</td>
        <td class="cella-blu">10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=5&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=10&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 3 swaps, and the sorted array is

        $$
        [5, 10, 15].
        $$

    3. Array $a = [3, 1, 4, 1, 5, 9, 2, 6]$ ($n=8$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;7&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;8&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;a&#91;2&#93;=1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;3&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;4&#93;=1&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;6&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;7&#93;=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;8&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&#92;le a&#91;3&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&gt;a&#91;4&#93;=1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=1&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=1&#92;le a&#91;6&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=1&#92;le a&#91;7&#93;=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=1&#92;le a&#91;8&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;a&#91;4&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;le a&#91;6&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&gt;a&#91;7&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>3</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=2&#92;le a&#91;8&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>3</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>3</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;le a&#91;6&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>9</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&gt;a&#91;7&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=3&#92;le a&#91;8&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;le a&#91;6&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>9</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&gt;a&#91;7&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>9</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=4&#92;le a&#91;8&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>6</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=9&gt;a&#91;7&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=5&#92;le a&#91;8&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>7</td>
        <td>8</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=9&gt;a&#91;8&#93;=6&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;7&#93;&#92;leftrightarrow a&#91;8&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;7&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;8&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..8&#93;)=1&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..8&#93;)=1&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>9</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..8&#93;)=2&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>9</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..8&#93;)=3&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>9</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..8&#93;)=4&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=&#92;min(a&#91;6..8&#93;)=5&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=&#92;min(a&#91;7..8&#93;)=6&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 28 key comparisons and 8 swaps, and the sorted array is

        $$
        [1, 1, 2, 3, 4, 5, 6, 9].
        $$

    4. Array $a = [20, 18, 16, 14]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">20</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=20&gt;a&#91;2&#93;=18&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">16</td>
        <td>20</td>
        <td class="cella-blu">18</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=18&gt;a&#91;3&#93;=16&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td class="cella-blu">14</td>
        <td>20</td>
        <td>18</td>
        <td class="cella-blu">16</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=16&gt;a&#91;4&#93;=14&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>14</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">20</td>
        <td>16</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=20&gt;a&#91;3&#93;=18&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>14</td>
        <td class="cella-blu">16</td>
        <td>20</td>
        <td class="cella-blu">18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=18&gt;a&#91;4&#93;=16&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>14</td>
        <td>16</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=20&gt;a&#91;4&#93;=18&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">16</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=14&#92;)</span> (3 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>14</td>
        <td class="cella-blu">16</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=16&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>14</td>
        <td>16</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=18&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 6 swaps, and the sorted array is

        $$
        [14, 16, 18, 20].
        $$

    5. Array $a = [11, 11, 11]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=11&#92;le a&#91;2&#93;=11&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=11&#92;le a&#91;3&#93;=11&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=11&#92;le a&#91;3&#93;=11&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=11&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=11&#92;)</span> (0 swaps)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 0 swaps, and the sorted array is

        $$
        [11, 11, 11].
        $$

<a id="esercizio-3-11"></a>

!!! esercizio "Exercise 3.11: Sorting algorithms (E11)"

    Consider the following arrays of natural numbers:

    1. $a = [9, 3, 7, 2]$

    2. $a = [12, 4, 18, 6, 10]$

    3. $a = [5, 4, 3, 2, 1]$

    4. $a = [100, 50, 25]$

    5. $a = [8]$

    **Questions**

    1. Apply the <code>ExchangeSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every comparison, say whether a swap is performed and give the state of the array after the comparison.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [9, 3, 7, 2]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">9</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=9&gt;a&#91;2&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>9</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le a&#91;3&#93;=7&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td class="cella-blu">2</td>
        <td>9</td>
        <td>7</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;a&#91;4&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>2</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=9&gt;a&#91;3&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>9</td>
        <td class="cella-blu">7</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&gt;a&#91;4&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=9&gt;a&#91;4&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">9</td>
        <td>7</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=2&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">9</td>
        <td class="cella-blu">7</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=3&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=7&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 5 swaps, and the sorted array is

        $$
        [2, 3, 7, 9].
        $$

    2. Array $a = [12, 4, 18, 6, 10]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=12&gt;a&#91;2&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=4&#92;le a&#91;3&#93;=18&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=4&#92;le a&#91;4&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=4&#92;le a&#91;5&#93;=10&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=12&#92;le a&#91;3&#93;=18&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td>18</td>
        <td class="cella-blu">12</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=12&gt;a&#91;4&#93;=6&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>18</td>
        <td>12</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&#92;le a&#91;5&#93;=10&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">18</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=18&gt;a&#91;4&#93;=12&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">10</td>
        <td>18</td>
        <td class="cella-blu">12</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=12&gt;a&#91;5&#93;=10&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>10</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">18</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=18&gt;a&#91;5&#93;=12&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=4&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td>18</td>
        <td class="cella-blu">12</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=6&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">12</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=10&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>6</td>
        <td>10</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">18</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=12&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 5 swaps, and the sorted array is

        $$
        [4, 6, 10, 12, 18].
        $$

    3. Array $a = [5, 4, 3, 2, 1]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&gt;a&#91;2&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=4&gt;a&#91;3&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td class="cella-blu">2</td>
        <td>5</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;a&#91;4&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td class="cella-blu">1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&gt;a&#91;5&#93;=1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=5&gt;a&#91;3&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&gt;a&#91;4&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>5</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&gt;a&#91;5&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&gt;a&#91;4&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;a&#91;5&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=5&gt;a&#91;5&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=1&#92;)</span> (4 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=2&#92;)</span> (3 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=3&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=4&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 10 swaps, and the sorted array is

        $$
        [1, 2, 3, 4, 5].
        $$

    4. Array $a = [100, 50, 25]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">50</td>
        <td class="cella-blu">100</td>
        <td>25</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=100&gt;a&#91;2&#93;=50&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">25</td>
        <td>100</td>
        <td class="cella-blu">50</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=50&gt;a&#91;3&#93;=25&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>25</td>
        <td class="cella-blu">50</td>
        <td class="cella-blu">100</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=100&gt;a&#91;3&#93;=50&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">25</td>
        <td class="cella-blu">100</td>
        <td class="cella-blu">50</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=25&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>25</td>
        <td class="cella-blu">50</td>
        <td class="cella-blu">100</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=50&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 3 swaps, and the sorted array is

        $$
        [25, 50, 100].
        $$

    5. Array $a = [8]$ ($n=1$).

        The array has a single element: the outer loop is not executed and the array is already sorted.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td>8</td>
        <td>initial state: <span class="arithmatex">&#92;(n=1&#92;)</span>, the outer loop is not executed</td>
        </tr>
        </table></div>

        The sorted array is $[8]$, obtained with no key comparison and no swap.

<a id="esercizio-3-12"></a>

!!! esercizio "Exercise 3.12: Sorting algorithms (E12)"

    Consider the following arrays of natural numbers:

    1. $a = [6, 1, 8, 2, 5]$

    2. $a = [13, 11, 9, 7]$

    3. $a = [2, 8, 4, 6]$

    4. $a = [30, 20, 10]$

    5. $a = [5, 10, 15, 20]$

    **Questions**

    1. Apply the <code>ExchangeSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every comparison, say whether a swap is performed and give the state of the array after the comparison.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [6, 1, 8, 2, 5]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=6&gt;a&#91;2&#93;=1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;3&#93;=8&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;4&#93;=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&#92;le a&#91;3&#93;=8&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>8</td>
        <td class="cella-blu">6</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&gt;a&#91;4&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>6</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le a&#91;5&#93;=5&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=8&gt;a&#91;4&#93;=6&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td>8</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&gt;a&#91;5&#93;=5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=8&gt;a&#91;5&#93;=6&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=1&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>8</td>
        <td class="cella-blu">6</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=2&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=5&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=6&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 5 swaps, and the sorted array is

        $$
        [1, 2, 5, 6, 8].
        $$

    2. Array $a = [13, 11, 9, 7]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">13</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=13&gt;a&#91;2&#93;=11&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">9</td>
        <td>13</td>
        <td class="cella-blu">11</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=11&gt;a&#91;3&#93;=9&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td class="cella-blu">7</td>
        <td>13</td>
        <td>11</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=9&gt;a&#91;4&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">13</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=13&gt;a&#91;3&#93;=11&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>7</td>
        <td class="cella-blu">9</td>
        <td>13</td>
        <td class="cella-blu">11</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=11&gt;a&#91;4&#93;=9&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>9</td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">13</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=13&gt;a&#91;4&#93;=11&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">13</td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=7&#92;)</span> (3 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td class="cella-blu">9</td>
        <td class="cella-blu">13</td>
        <td class="cella-blu">11</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=9&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">13</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=11&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 6 swaps, and the sorted array is

        $$
        [7, 9, 11, 13].
        $$

    3. Array $a = [2, 8, 4, 6]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le a&#91;2&#93;=8&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le a&#91;3&#93;=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;le a&#91;4&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=8&gt;a&#91;3&#93;=4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&#92;le a&#91;4&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=8&gt;a&#91;4&#93;=6&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=2&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=4&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=6&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 2 swaps, and the sorted array is

        $$
        [2, 4, 6, 8].
        $$

    4. Array $a = [30, 20, 10]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=30&gt;a&#91;2&#93;=20&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">10</td>
        <td>30</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=20&gt;a&#91;3&#93;=10&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>10</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=30&gt;a&#91;3&#93;=20&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=10&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>10</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=20&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 3 swaps, and the sorted array is

        $$
        [10, 20, 30].
        $$

    5. Array $a = [5, 10, 15, 20]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&#92;le a&#91;2&#93;=10&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&#92;le a&#91;3&#93;=15&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=5&#92;le a&#91;4&#93;=20&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;le a&#91;3&#93;=15&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;le a&#91;4&#93;=20&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;le a&#91;4&#93;=20&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=5&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=10&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=15&#92;)</span> (0 swaps)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 0 swaps, and the sorted array is

        $$
        [5, 10, 15, 20].
        $$

<a id="esercizio-3-13"></a>

!!! esercizio "Exercise 3.13: Sorting algorithms (E13)"

    Consider the following arrays of natural numbers:

    1. $a = [14, 7, 21, 3, 18]$

    2. $a = [40, 30, 20, 10]$

    3. $a = [3, 6, 1, 9, 2]$

    4. $a = [25, 12, 50]$

    5. $a = [17, 17, 17, 17]$

    **Questions**

    1. Apply the <code>ExchangeSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every comparison, say whether a swap is performed and give the state of the array after the comparison.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [14, 7, 21, 3, 18]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">14</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=14&gt;a&#91;2&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=7&#92;le a&#91;3&#93;=21&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>14</td>
        <td>21</td>
        <td class="cella-blu">7</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=7&gt;a&#91;4&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>14</td>
        <td>21</td>
        <td>7</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le a&#91;5&#93;=18&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>3</td>
        <td>14</td>
        <td>21</td>
        <td>7</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=14&#92;le a&#91;3&#93;=21&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td>21</td>
        <td class="cella-blu">14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=14&gt;a&#91;4&#93;=7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&#92;le a&#91;5&#93;=18&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=21&gt;a&#91;4&#93;=14&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=14&#92;le a&#91;5&#93;=18&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">21</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=21&gt;a&#91;5&#93;=18&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">14</td>
        <td>21</td>
        <td class="cella-blu">7</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=3&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">7</td>
        <td>21</td>
        <td class="cella-blu">14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=7&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=14&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">21</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=18&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 5 swaps, and the sorted array is

        $$
        [3, 7, 14, 18, 21].
        $$

    2. Array $a = [40, 30, 20, 10]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">40</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=40&gt;a&#91;2&#93;=30&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">20</td>
        <td>40</td>
        <td class="cella-blu">30</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=30&gt;a&#91;3&#93;=20&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td class="cella-blu">10</td>
        <td>40</td>
        <td>30</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=20&gt;a&#91;4&#93;=10&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>10</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">40</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=40&gt;a&#91;3&#93;=30&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>10</td>
        <td class="cella-blu">20</td>
        <td>40</td>
        <td class="cella-blu">30</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=30&gt;a&#91;4&#93;=20&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>10</td>
        <td>20</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">40</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=40&gt;a&#91;4&#93;=30&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">40</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=10&#92;)</span> (3 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>10</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">40</td>
        <td class="cella-blu">30</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=20&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>10</td>
        <td>20</td>
        <td class="cella-blu">30</td>
        <td class="cella-blu">40</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=30&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 6 swaps, and the sorted array is

        $$
        [10, 20, 30, 40].
        $$

    3. Array $a = [3, 6, 1, 9, 2]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;le a&#91;2&#93;=6&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td class="cella-blu">3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=3&gt;a&#91;3&#93;=1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>6</td>
        <td>3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;4&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>6</td>
        <td>3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;le a&#91;5&#93;=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">6</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&gt;a&#91;3&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&#92;le a&#91;4&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>6</td>
        <td>9</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&gt;a&#91;5&#93;=2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>6</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&#92;le a&#91;4&#93;=9&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>9</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&gt;a&#91;5&#93;=3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=9&gt;a&#91;5&#93;=6&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td class="cella-blu">3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=1&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">6</td>
        <td>9</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=2&#92;)</span> (2 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>9</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=3&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=6&#92;)</span> (1 swap)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 5 swaps, and the sorted array is

        $$
        [1, 2, 3, 6, 9].
        $$

    4. Array $a = [25, 12, 50]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=25&gt;a&#91;2&#93;=12&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=12&#92;le a&#91;3&#93;=50&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=25&#92;le a&#91;3&#93;=50&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=12&#92;)</span> (1 swap)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=25&#92;)</span> (0 swaps)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 1 swap, and the sorted array is

        $$
        [12, 25, 50].
        $$

    5. Array $a = [17, 17, 17, 17]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=17&#92;le a&#91;2&#93;=17&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=17&#92;le a&#91;3&#93;=17&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=17&#92;le a&#91;4&#93;=17&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=17&#92;le a&#91;3&#93;=17&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=17&#92;le a&#91;4&#93;=17&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=17&#92;le a&#91;4&#93;=17&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=17&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=17&#92;)</span> (0 swaps)</td>
        </tr>
        <tr>
        <td>3</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=17&#92;)</span> (0 swaps)</td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 0 swaps, and the sorted array is

        $$
        [17, 17, 17, 17].
        $$

<a id="esercizio-3-14"></a>

!!! esercizio "Exercise 3.14: Sorting algorithms (E14)"

    Consider the following arrays of natural numbers:

    1. $a = [5, 2, 4, 6, 1, 3]$

    2. $a = [8, 3, 7, 4, 9, 2]$

    3. $a = [6, 5, 4, 3, 2, 1]$

    4. $a = [1, 2, 3, 4, 5, 6]$

    5. $a = [10, 5, 15, 3]$

    **Questions**

    1. Apply the <code>SelectionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the index $\mathit{minIdx}$ of the minimum found by the inner loop and say whether a swap is performed.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [5, 2, 4, 6, 1, 3]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&lt;a&#91;1&#93;=5&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=1&lt;a&#91;2&#93;=2&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>5</td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=3&#92;ge a&#91;5&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=3&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=4&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&#92;ge a&#91;3&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;3&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=3&lt;a&#91;3&#93;=4&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=6&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=6&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&lt;a&#91;4&#93;=6&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=4&lt;a&#91;5&#93;=5&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=6&#92;ne 4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=5&#92;)</span> (<span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;5&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">5</td>
        <td>3</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..6&#93;)=1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>3</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..6&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>5</td>
        <td class="cella-blu">4</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..6&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..6&#93;)=4&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..6&#93;)=5&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 3 swaps, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    2. Array $a = [8, 3, 7, 4, 9, 2]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=8&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&lt;a&#91;1&#93;=8&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=7&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=9&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>6</td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=2&lt;a&#91;2&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=6&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=7&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=9&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=8&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=7&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&lt;a&#91;3&#93;=7&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=9&#92;ge a&#91;4&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=8&#92;ge a&#91;4&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=7&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=9&#92;ge a&#91;4&#93;=7&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=8&#92;ge a&#91;4&#93;=7&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=5&#92;)</span> (<span class="arithmatex">&#92;(a&#91;5&#93;=9&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>9</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=8&lt;a&#91;5&#93;=9&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=6&#92;ne 5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>8</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td class="cella-blu">8</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..6&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>4</td>
        <td>9</td>
        <td>8</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..6&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>8</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..6&#93;)=4&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td>9</td>
        <td>8</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..6&#93;)=7&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>7</td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">9</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..6&#93;)=8&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 3 swaps, and the sorted array is

        $$
        [2, 3, 4, 7, 8, 9].
        $$

    3. Array $a = [6, 5, 4, 3, 2, 1]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=6&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=5&lt;a&#91;1&#93;=6&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&lt;a&#91;2&#93;=5&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=3&lt;a&#91;3&#93;=4&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=2&lt;a&#91;4&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>6</td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=1&lt;a&#91;5&#93;=2&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=6&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&lt;a&#91;2&#93;=5&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=3&lt;a&#91;3&#93;=4&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=2&lt;a&#91;4&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>5</td>
        <td>1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;5&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>4</td>
        <td>3</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=4&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=3&lt;a&#91;3&#93;=4&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;4&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=5&#92;)</span> (<span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;5&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td class="cella-blu">1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td class="cella-blu">6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;6&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..6&#93;)=1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>4</td>
        <td>3</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..6&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..6&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..6&#93;)=4&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..6&#93;)=5&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 3 swaps, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    4. Array $a = [1, 2, 3, 4, 5, 6]$ ($n=6$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=1&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;ge a&#91;1&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;ge a&#91;1&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;ge a&#91;1&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;1&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;1&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=1&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;ge a&#91;3&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;3&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;3&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;4&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=5&#92;)</span> (<span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=6&#92;ge a&#91;5&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..6&#93;)=1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..6&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..6&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..6&#93;)=4&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..6&#93;)=5&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 15 key comparisons and 0 swaps, and the sorted array is

        $$
        [1, 2, 3, 4, 5, 6].
        $$

    5. Array $a = [10, 5, 15, 3]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=10&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=5&lt;a&#91;1&#93;=10&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;ge a&#91;2&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=3&lt;a&#91;2&#93;=5&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>15</td>
        <td class="cella-blu">10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>15</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>15</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;ge a&#91;2&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>15</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=10&#92;ge a&#91;2&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>5</td>
        <td>15</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>3</td>
        <td>5</td>
        <td>15</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>15</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=10&lt;a&#91;3&#93;=15&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>5</td>
        <td>15</td>
        <td>3</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>15</td>
        <td class="cella-blu">10</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>15</td>
        <td>10</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=5&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">15</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=10&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 2 swaps, and the sorted array is

        $$
        [3, 5, 10, 15].
        $$

<a id="esercizio-3-15"></a>

!!! esercizio "Exercise 3.15: Sorting algorithms (E15)"

    Consider the following arrays of natural numbers:

    1. $a = [7, 2, 9, 4]$

    2. $a = [15, 10, 5]$

    3. $a = [3, 1, 4, 1, 5, 9, 2, 6]$

    4. $a = [20, 18, 16, 14]$

    5. $a = [11, 11, 11]$

    **Questions**

    1. Apply the <code>SelectionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the index $\mathit{minIdx}$ of the minimum found by the inner loop and say whether a swap is performed.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [7, 2, 9, 4]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=7&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&lt;a&#91;1&#93;=7&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=9&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;ge a&#91;2&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=7&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=9&#92;ge a&#91;2&#93;=7&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&lt;a&#91;2&#93;=7&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>9</td>
        <td class="cella-blu">7</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>2</td>
        <td>4</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=9&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=7&lt;a&#91;3&#93;=9&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">7</td>
        <td>9</td>
        <td>4</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td>9</td>
        <td class="cella-blu">7</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=4&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">9</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=7&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 3 swaps, and the sorted array is

        $$
        [2, 4, 7, 9].
        $$

    2. Array $a = [15, 10, 5]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=15&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&lt;a&#91;1&#93;=15&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=5&lt;a&#91;2&#93;=10&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">5</td>
        <td>10</td>
        <td class="cella-blu">15</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;ge a&#91;2&#93;=10&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>15</td>
        <td>10</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">5</td>
        <td>10</td>
        <td class="cella-blu">15</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=5&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=10&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 1 swap, and the sorted array is

        $$
        [5, 10, 15].
        $$

    3. Array $a = [3, 1, 4, 1, 5, 9, 2, 6]$ ($n=8$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;7&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;8&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=1&lt;a&#91;1&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=1&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=9&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=2&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;8&#93;=6&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=1&lt;a&#91;2&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>4</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=9&#92;ge a&#91;4&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>4</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=2&#92;ge a&#91;4&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>4</td>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;8&#93;=6&#92;ge a&#91;4&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=4&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=3&lt;a&#91;3&#93;=4&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=9&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=2&lt;a&#91;4&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 7&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;8&#93;=6&#92;ge a&#91;7&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=7&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=9&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=4&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;8&#93;=6&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=5&#92;)</span> (<span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;6&#93;=9&#92;ge a&#91;5&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=4&lt;a&#91;5&#93;=5&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 7&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;8&#93;=6&#92;ge a&#91;7&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>9</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=7&#92;ne 5&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>9</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=6&#92;)</span> (<span class="arithmatex">&#92;(a&#91;6&#93;=9&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>7</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>9</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;7&#93;=5&lt;a&#91;6&#93;=9&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 7&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>9</td>
        <td>5</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;8&#93;=6&#92;ge a&#91;7&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=7&#92;ne 6&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=7&#92;)</span> (<span class="arithmatex">&#92;(a&#91;7&#93;=9&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>8</td>
        <td>8</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;8&#93;=6&lt;a&#91;7&#93;=9&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 8&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=8&#92;ne 7&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;7&#93;&#92;leftrightarrow a&#91;8&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;6&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;7&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;8&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">3</td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..8&#93;)=1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>5</td>
        <td>9</td>
        <td>2</td>
        <td>6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..8&#93;)=1&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td class="cella-blu">4</td>
        <td>6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..8&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..8&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>9</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;5&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;5&#93;=&#92;min(a&#91;5..8&#93;)=4&#92;)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>7</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">9</td>
        <td>6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;6&#93;&#92;leftrightarrow a&#91;7&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;6&#93;=&#92;min(a&#91;6..8&#93;)=5&#92;)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>8</td>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;7&#93;&#92;leftrightarrow a&#91;8&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;7&#93;=&#92;min(a&#91;7..8&#93;)=6&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 28 key comparisons and 6 swaps, and the sorted array is

        $$
        [1, 1, 2, 3, 4, 5, 6, 9].
        $$

    4. Array $a = [20, 18, 16, 14]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=20&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=18&lt;a&#91;1&#93;=20&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=16&lt;a&#91;2&#93;=18&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=14&lt;a&#91;3&#93;=16&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">14</td>
        <td>18</td>
        <td>16</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>14</td>
        <td>18</td>
        <td>16</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=18&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>14</td>
        <td>18</td>
        <td>16</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=16&lt;a&#91;2&#93;=18&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>14</td>
        <td>18</td>
        <td>16</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=20&#92;ge a&#91;3&#93;=16&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td class="cella-blu">16</td>
        <td class="cella-blu">18</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>14</td>
        <td>16</td>
        <td>18</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=18&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>14</td>
        <td>16</td>
        <td>18</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=20&#92;ge a&#91;3&#93;=18&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td>16</td>
        <td>18</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>20</td>
        <td>18</td>
        <td>16</td>
        <td>14</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td class="cella-blu">14</td>
        <td>18</td>
        <td>16</td>
        <td class="cella-blu">20</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=14&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>14</td>
        <td class="cella-blu">16</td>
        <td class="cella-blu">18</td>
        <td>20</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=16&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>14</td>
        <td>16</td>
        <td>18</td>
        <td>20</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=18&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 2 swaps, and the sorted array is

        $$
        [14, 16, 18, 20].
        $$

    5. Array $a = [11, 11, 11]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=11&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=11&#92;ge a&#91;1&#93;=11&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=11&#92;ge a&#91;1&#93;=11&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=1&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=11&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=11&#92;ge a&#91;2&#93;=11&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=11&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>11</td>
        <td>11</td>
        <td>11</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=11&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 0 swaps, and the sorted array is

        $$
        [11, 11, 11].
        $$

<a id="esercizio-3-16"></a>

!!! esercizio "Exercise 3.16: Sorting algorithms (E16)"

    Consider the following arrays of natural numbers:

    1. $a = [9, 3, 7, 2]$

    2. $a = [12, 4, 18, 6, 10]$

    3. $a = [5, 4, 3, 2, 1]$

    4. $a = [100, 50, 25]$

    5. $a = [8]$

    **Questions**

    1. Apply the <code>SelectionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the index $\mathit{minIdx}$ of the minimum found by the inner loop and say whether a swap is performed.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [9, 3, 7, 2]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=9&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&lt;a&#91;1&#93;=9&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=7&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=2&lt;a&#91;2&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=7&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=9&#92;ge a&#91;2&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=7&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=9&#92;ge a&#91;3&#93;=7&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>9</td>
        <td>3</td>
        <td>7</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">9</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=7&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 1 swap, and the sorted array is

        $$
        [2, 3, 7, 9].
        $$

    2. Array $a = [12, 4, 18, 6, 10]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=12&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&lt;a&#91;1&#93;=12&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=18&#92;ge a&#91;2&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&#92;ge a&#91;2&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=10&#92;ge a&#91;2&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=12&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=18&#92;ge a&#91;2&#93;=12&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&lt;a&#91;2&#93;=12&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>4</td>
        <td>12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=10&#92;ge a&#91;4&#93;=6&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td>18</td>
        <td class="cella-blu">12</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>4</td>
        <td>6</td>
        <td>18</td>
        <td>12</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=18&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>4</td>
        <td>6</td>
        <td>18</td>
        <td>12</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=12&lt;a&#91;3&#93;=18&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>18</td>
        <td>12</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=10&lt;a&#91;4&#93;=12&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">10</td>
        <td>12</td>
        <td class="cella-blu">18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>4</td>
        <td>6</td>
        <td>10</td>
        <td>12</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=12&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>4</td>
        <td>6</td>
        <td>10</td>
        <td>12</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=18&#92;ge a&#91;4&#93;=12&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>6</td>
        <td>10</td>
        <td>12</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>12</td>
        <td>4</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">12</td>
        <td>18</td>
        <td>6</td>
        <td>10</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=4&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td>18</td>
        <td class="cella-blu">12</td>
        <td>10</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=6&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td class="cella-blu">10</td>
        <td>12</td>
        <td class="cella-blu">18</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=10&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>4</td>
        <td>6</td>
        <td>10</td>
        <td>12</td>
        <td>18</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=12&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 3 swaps, and the sorted array is

        $$
        [4, 6, 10, 12, 18].
        $$

    3. Array $a = [5, 4, 3, 2, 1]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=4&lt;a&#91;1&#93;=5&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&lt;a&#91;2&#93;=4&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=2&lt;a&#91;3&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=1&lt;a&#91;4&#93;=2&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">1</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=4&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&lt;a&#91;2&#93;=4&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=2&lt;a&#91;3&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;ge a&#91;3&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;3&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=4&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td class="cella-blu">1</td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td class="cella-blu">4</td>
        <td>5</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=4&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 2 swaps, and the sorted array is

        $$
        [1, 2, 3, 4, 5].
        $$

    4. Array $a = [100, 50, 25]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=100&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=50&lt;a&#91;1&#93;=100&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=25&lt;a&#91;2&#93;=50&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td class="cella-blu">100</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>25</td>
        <td>50</td>
        <td>100</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=50&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>25</td>
        <td>50</td>
        <td>100</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=100&#92;ge a&#91;2&#93;=50&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>25</td>
        <td>50</td>
        <td>100</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>100</td>
        <td>50</td>
        <td>25</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td class="cella-blu">100</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=25&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>25</td>
        <td>50</td>
        <td>100</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=50&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 1 swap, and the sorted array is

        $$
        [25, 50, 100].
        $$

    5. Array $a = [8]$ ($n=1$).

        The array has a single element: the outer loop is not executed and the array is already sorted.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td>8</td>
        <td>initial state: <span class="arithmatex">&#92;(n=1&#92;)</span>, the outer loop is not executed</td>
        </tr>
        </table></div>

        The sorted array is $[8]$, obtained with no key comparison and no swap.

<a id="esercizio-3-17"></a>

!!! esercizio "Exercise 3.17: Sorting algorithms (E17)"

    Consider the following arrays of natural numbers:

    1. $a = [6, 1, 8, 2, 5]$

    2. $a = [13, 11, 9, 7]$

    3. $a = [2, 8, 4, 6]$

    4. $a = [30, 20, 10]$

    5. $a = [5, 10, 15, 20]$

    **Questions**

    1. Apply the <code>SelectionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the index $\mathit{minIdx}$ of the minimum found by the inner loop and say whether a swap is performed.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [6, 1, 8, 2, 5]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=6&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=1&lt;a&#91;1&#93;=6&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=8&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=2&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;2&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=6&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=8&#92;ge a&#91;2&#93;=6&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=2&lt;a&#91;2&#93;=6&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&#92;ge a&#91;4&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>8</td>
        <td class="cella-blu">6</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>6</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=8&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>6</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&lt;a&#91;3&#93;=8&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>6</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=5&lt;a&#91;4&#93;=6&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=6&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=8&#92;ge a&#91;4&#93;=6&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>6</td>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">6</td>
        <td>8</td>
        <td>2</td>
        <td>5</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>8</td>
        <td class="cella-blu">6</td>
        <td>5</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">5</td>
        <td>6</td>
        <td class="cella-blu">8</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=5&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>8</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=6&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 3 swaps, and the sorted array is

        $$
        [1, 2, 5, 6, 8].
        $$

    2. Array $a = [13, 11, 9, 7]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=13&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=11&lt;a&#91;1&#93;=13&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=9&lt;a&#91;2&#93;=11&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=7&lt;a&#91;3&#93;=9&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">7</td>
        <td>11</td>
        <td>9</td>
        <td class="cella-blu">13</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>7</td>
        <td>11</td>
        <td>9</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=11&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>7</td>
        <td>11</td>
        <td>9</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=9&lt;a&#91;2&#93;=11&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td>11</td>
        <td>9</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=13&#92;ge a&#91;3&#93;=9&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td class="cella-blu">9</td>
        <td class="cella-blu">11</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td>11</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=11&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td>11</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=13&#92;ge a&#91;3&#93;=11&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>7</td>
        <td>9</td>
        <td>11</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>13</td>
        <td>11</td>
        <td>9</td>
        <td>7</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td class="cella-blu">7</td>
        <td>11</td>
        <td>9</td>
        <td class="cella-blu">13</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=7&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">9</td>
        <td class="cella-blu">11</td>
        <td>13</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=9&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>7</td>
        <td>9</td>
        <td>11</td>
        <td>13</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=11&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 2 swaps, and the sorted array is

        $$
        [7, 9, 11, 13].
        $$

    3. Array $a = [2, 8, 4, 6]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=2&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=8&#92;ge a&#91;1&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&#92;ge a&#91;1&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&#92;ge a&#91;1&#93;=2&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=1&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=8&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&lt;a&#91;2&#93;=8&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&#92;ge a&#91;3&#93;=4&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=8&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=6&lt;a&#91;3&#93;=8&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>4</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>2</td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">8</td>
        <td>6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=4&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">8</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=6&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 2 swaps, and the sorted array is

        $$
        [2, 4, 6, 8].
        $$

    4. Array $a = [30, 20, 10]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=30&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=20&lt;a&#91;1&#93;=30&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=10&lt;a&#91;2&#93;=20&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">10</td>
        <td>20</td>
        <td class="cella-blu">30</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=20&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=30&#92;ge a&#91;2&#93;=20&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">10</td>
        <td>20</td>
        <td class="cella-blu">30</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=10&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=20&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 1 swap, and the sorted array is

        $$
        [10, 20, 30].
        $$

    5. Array $a = [5, 10, 15, 20]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=5&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;ge a&#91;1&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;ge a&#91;1&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=20&#92;ge a&#91;1&#93;=5&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=1&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;ge a&#91;2&#93;=10&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=20&#92;ge a&#91;2&#93;=10&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=15&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=20&#92;ge a&#91;3&#93;=15&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=5&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=10&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>15</td>
        <td>20</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=15&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 0 swaps, and the sorted array is

        $$
        [5, 10, 15, 20].
        $$

<a id="esercizio-3-18"></a>

!!! esercizio "Exercise 3.18: Sorting algorithms (E18)"

    Consider the following arrays of natural numbers:

    1. $a = [14, 7, 21, 3, 18]$

    2. $a = [40, 30, 20, 10]$

    3. $a = [3, 6, 1, 9, 2]$

    4. $a = [25, 12, 50]$

    5. $a = [17, 17, 17, 17]$

    **Questions**

    1. Apply the <code>SelectionSort</code> algorithm to each array, to sort it in non-decreasing order. Show the execution step by step: for every iteration of the outer loop, give the index $\mathit{minIdx}$ of the minimum found by the inner loop and say whether a swap is performed.

    2. For each array, count the key comparisons and the swaps performed by the algorithm.

??? soluzione "Solution"

    The trace tables follow the conventions stated in the introduction to the exercises of this chapter. Each item answers both questions.

    1. Array $a = [14, 7, 21, 3, 18]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=14&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=7&lt;a&#91;1&#93;=14&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=21&#92;ge a&#91;2&#93;=7&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=3&lt;a&#91;2&#93;=7&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=18&#92;ge a&#91;4&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">3</td>
        <td>7</td>
        <td>21</td>
        <td class="cella-blu">14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=7&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=21&#92;ge a&#91;2&#93;=7&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=14&#92;ge a&#91;2&#93;=7&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=18&#92;ge a&#91;2&#93;=7&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=21&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=14&lt;a&#91;3&#93;=21&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=18&#92;ge a&#91;4&#93;=14&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 3&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=21&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td>21</td>
        <td>18</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=18&lt;a&#91;4&#93;=21&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">21</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;ne 4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>14</td>
        <td>7</td>
        <td>21</td>
        <td>3</td>
        <td>18</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td class="cella-blu">3</td>
        <td>7</td>
        <td>21</td>
        <td class="cella-blu">14</td>
        <td>18</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>21</td>
        <td>14</td>
        <td>18</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=7&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">21</td>
        <td>18</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;3&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=14&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">21</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=18&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 3 swaps, and the sorted array is

        $$
        [3, 7, 14, 18, 21].
        $$

    2. Array $a = [40, 30, 20, 10]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=40&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=30&lt;a&#91;1&#93;=40&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=20&lt;a&#91;2&#93;=30&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>4</td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=10&lt;a&#91;3&#93;=20&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">10</td>
        <td>30</td>
        <td>20</td>
        <td class="cella-blu">40</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=4&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>10</td>
        <td>30</td>
        <td>20</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=30&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>10</td>
        <td>30</td>
        <td>20</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=20&lt;a&#91;2&#93;=30&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>10</td>
        <td>30</td>
        <td>20</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=40&#92;ge a&#91;3&#93;=20&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=30&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=40&#92;ge a&#91;3&#93;=30&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td>40</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>40</td>
        <td>30</td>
        <td>20</td>
        <td>10</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td class="cella-blu">10</td>
        <td>30</td>
        <td>20</td>
        <td class="cella-blu">40</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;4&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=10&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>10</td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">30</td>
        <td>40</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=20&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>10</td>
        <td>20</td>
        <td>30</td>
        <td>40</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=30&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 2 swaps, and the sorted array is

        $$
        [10, 20, 30, 40].
        $$

    3. Array $a = [3, 6, 1, 9, 2]$ ($n=5$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=6&#92;ge a&#91;1&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=1&lt;a&#91;1&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=9&#92;ge a&#91;3&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=2&#92;ge a&#91;3&#93;=1&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td class="cella-blu">3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>1</td>
        <td>6</td>
        <td>3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=6&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td>6</td>
        <td>3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=3&lt;a&#91;2&#93;=6&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>1</td>
        <td>6</td>
        <td>3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=9&#92;ge a&#91;3&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td>6</td>
        <td>3</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=2&lt;a&#91;3&#93;=3&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>9</td>
        <td class="cella-blu">6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;ne 2&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=3&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=9&#92;ge a&#91;3&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=6&#92;ge a&#91;3&#93;=3&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=4&#92;)</span> (<span class="arithmatex">&#92;(a&#91;4&#93;=9&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=6&lt;a&#91;4&#93;=9&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=5&#92;ne 4&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>9</td>
        <td>2</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td class="cella-blu">3</td>
        <td>9</td>
        <td>2</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;3&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..5&#93;)=1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>3</td>
        <td>9</td>
        <td class="cella-blu">6</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;2&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..5&#93;)=2&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>6</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..5&#93;)=3&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">9</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;4&#93;&#92;leftrightarrow a&#91;5&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;4&#93;=&#92;min(a&#91;4..5&#93;)=6&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 10 key comparisons and 3 swaps, and the sorted array is

        $$
        [1, 2, 3, 6, 9].
        $$

    4. Array $a = [25, 12, 50]$ ($n=3$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=25&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>2</td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=12&lt;a&#91;1&#93;=25&#92;)</span>: <span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=50&#92;ge a&#91;2&#93;=12&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;ne 1&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=25&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=50&#92;ge a&#91;2&#93;=25&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>25</td>
        <td>12</td>
        <td>50</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">25</td>
        <td>50</td>
        <td>swap <span class="arithmatex">&#92;(a&#91;1&#93;&#92;leftrightarrow a&#91;2&#93;&#92;)</span>: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..3&#93;)=12&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>12</td>
        <td>25</td>
        <td>50</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..3&#93;)=25&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 3 key comparisons and 1 swap, and the sorted array is

        $$
        [12, 25, 50].
        $$

    5. Array $a = [17, 17, 17, 17]$ ($n=4$).

        <div class="minipage" style="width:100%" markdown>

        <em>Detailed trace:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>1</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=1&#92;)</span> (<span class="arithmatex">&#92;(a&#91;1&#93;=17&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td>1</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=17&#92;ge a&#91;1&#93;=17&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>1</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=17&#92;ge a&#91;1&#93;=17&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>1</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=17&#92;ge a&#91;1&#93;=17&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=1&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>2</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=2&#92;)</span> (<span class="arithmatex">&#92;(a&#91;2&#93;=17&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td>2</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=17&#92;ge a&#91;2&#93;=17&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>2</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=17&#92;ge a&#91;2&#93;=17&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=2&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>3</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}:=3&#92;)</span> (<span class="arithmatex">&#92;(a&#91;3&#93;=17&#92;)</span>)</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td>3</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=17&#92;ge a&#91;3&#93;=17&#92;)</span>: no update</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td><span class="arithmatex">&#92;(&#92;mathit{minIdx}=3&#92;)</span>: no swap</td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:100%" markdown>

        <em>Array after each iteration of the outer loop:</em>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;mathit{minIdx}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th>Action</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td><span class="arithmatex">&#92;(-&#92;)</span></td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>initial state</td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;1&#93;=&#92;min(a&#91;1..4&#93;)=17&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;2&#93;=&#92;min(a&#91;2..4&#93;)=17&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>17</td>
        <td>no swap: <span class="arithmatex">&#92;(a&#91;3&#93;=&#92;min(a&#91;3..4&#93;)=17&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The algorithm performs 6 key comparisons and 0 swaps, and the sorted array is

        $$
        [17, 17, 17, 17].
        $$
