---
title: "Correctness"
---

# Correctness

<div class="info-capitolo" markdown>

**Part 2 · Analysis and recursion · Chapter 9** · [:material-file-pdf-box: Lecture notes, volume 2 (PDF)](../pdf/lecture-notes-2-analysis-recursion.pdf) · [:material-pencil: Exercises](../exercises/ex-09-correctness.md)

</div>

## 9.1 Correctness of an algorithm

- The previous chapters measured how much an algorithm costs: the size of its input and its running time. Before asking how fast an algorithm is, however, we must be sure that it does what it promises. This chapter presents the standard tool to prove it, the <strong>loop invariant</strong>, and applies it to algorithms already met in the chapters «Sorting», «Linear and binary search» and «Numerical algorithms»: Find Maximum, Insertion Sort, Binary Search and the Euclidean algorithm.

- The first part of the analysis of an algorithm consists in determining its <strong>correctness</strong>, i.e., proving that it computes the correct output for every possible input instance.

- Testing an algorithm on some instances can show that it is wrong (one counterexample is enough), but it can never show that it is correct: there are infinitely many input instances. Correctness must be <strong>proved</strong>.

<a id="box-1-defCorrectAlgorithm"></a>

!!! definizione "Definition 9.1: correct algorithm"

    An algorithm is <strong>correct</strong> if, for every input instance $I$ of the problem, it <strong>terminates</strong> after a finite number of steps and it <strong>returns the correct output</strong> for $I$.

- The algorithms we consider consist of sequences of instructions and of loops. Sequences of instructions are easy to analyse, while a loop executes the same instructions a number of times that depends on the input.

!!! chiave ""

    The correctness of an algorithm is based on the correctness of its loops. The correctness of a loop is proved by means of a <strong>loop invariant</strong>.

### 9.1.1 Loop invariants

<a id="box-2-defLoopInvariant"></a>

!!! definizione "Definition 9.2: loop invariant"

    A <strong>loop invariant</strong> is a property of the variables of an algorithm that is true every time the condition of a loop is evaluated, i.e., before the first iteration of the loop and after each iteration of the loop.

- To prove the correctness of an algorithm by means of a loop invariant, we must show three things:

    1. <strong>Initialization</strong>: the loop invariant is true before the first iteration of the loop.

    2. <strong>Maintenance</strong>: if the loop invariant is true before an iteration of the loop, then it remains true at the end of the iteration, or equivalently, it is true before the next iteration.

    3. <strong>Termination</strong>: the loop terminates after a finite number of iterations. When the loop terminates, the loop invariant, together with the fact that the condition of the loop is false, gives a useful property that shows that the algorithm is correct.

- Note the similarity with <strong>mathematical induction</strong>, where to prove that a property holds it is necessary to prove a base case and an inductive step:

    - showing that the invariant holds before the first iteration corresponds to the <strong>base case</strong>;

    - showing that the invariant holds from iteration to iteration corresponds to the <strong>inductive step</strong>.

    !!! chiave ""

        The termination property differs from the usual use of mathematical induction, in which the inductive step is applied infinitely many times: here, we stop the “induction” when the loop terminates.

- To prove that a loop terminates, we usually identify a natural number (for example, $n-i+1$ or the length of a sub-array) that strictly decreases at every iteration and that must be positive for the loop to continue. Since a natural number cannot decrease forever, the loop terminates.

!!! chiave ""

    <strong>Scheme of a correctness proof with a loop invariant</strong>

    1. State the invariant: a property of the variables, true every time the condition of the loop is evaluated.

    2. <strong>Initialization</strong>: check it with the values assigned before the loop.

    3. <strong>Maintenance</strong>: assume it and the condition of the loop, execute the body once, and check it with the new values.

    4. <strong>Termination</strong>: find a natural number that strictly decreases at each iteration; then combine the invariant with the negated condition of the loop to obtain the correct output.

## 9.2 Correctness of Find Maximum

!!! chiave ""

    Given an array $a[1..n]$ of $n$ integer numbers, with $n \ge 1$, consider the problem of determining the maximum value in the array.

- The first example is the simplest loop: a single scan of the array. This is the pseudo-code of the <code>FindMaximum</code> algorithm.

!!! algoritmo "Algorithm: FindMaximum"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> integer numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The maximum value in array <span class="arithmatex">&#92;(a&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FindMaximum(a, n)</span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-fm-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(max := a&#91;1&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-fm-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 2&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-fm-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-fm-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; max&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-fm-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(max &#92;leftarrow a&#91;i&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-fm-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-fm-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(max&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- The <strong>loop invariant</strong> of the while loop of <code>FindMaximum</code> is:

!!! chiave ""

    Every time the condition at line [4](#riga-09-correctness-line-fm-c) is evaluated, the variable $max$ is equal to the maximum value of the sub-array $a[1..i-1]$:

    $$
    max=\max\{a[1],a[2],\dots,a[i-1]\}.
    $$

<a id="box-3-exInvariantFindMax"></a>

!!! esempio "Example 9.1: Loop invariant of FindMaximum"

    Consider the array $a=[9, 12, 3, 16, 19, 11, 12]$ with $n=7$. The table shows the values of $i$ and $max$ every time the condition at line [4](#riga-09-correctness-line-fm-c) is evaluated:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(max&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;1..i-1&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(&#92;max&#92;{a&#91;1&#93;,&#92;dots,a&#91;i-1&#93;&#92;}&#92;)</span></th>
    </tr>
    <tr>
    <td>2</td>
    <td>9</td>
    <td><span class="arithmatex">&#92;(&#91;9&#93;&#92;)</span></td>
    <td>9</td>
    </tr>
    <tr>
    <td>3</td>
    <td>12</td>
    <td><span class="arithmatex">&#92;(&#91;9,12&#93;&#92;)</span></td>
    <td>12</td>
    </tr>
    <tr>
    <td>4</td>
    <td>12</td>
    <td><span class="arithmatex">&#92;(&#91;9,12,3&#93;&#92;)</span></td>
    <td>12</td>
    </tr>
    <tr>
    <td>5</td>
    <td>16</td>
    <td><span class="arithmatex">&#92;(&#91;9,12,3,16&#93;&#92;)</span></td>
    <td>16</td>
    </tr>
    <tr>
    <td>6</td>
    <td>19</td>
    <td><span class="arithmatex">&#92;(&#91;9,12,3,16,19&#93;&#92;)</span></td>
    <td>19</td>
    </tr>
    <tr>
    <td>7</td>
    <td>19</td>
    <td><span class="arithmatex">&#92;(&#91;9,12,3,16,19,11&#93;&#92;)</span></td>
    <td>19</td>
    </tr>
    <tr>
    <td>8</td>
    <td>19</td>
    <td><span class="arithmatex">&#92;(&#91;9,12,3,16,19,11,12&#93;&#92;)</span></td>
    <td>19   (loop ends)</td>
    </tr>
    </table></div>

    At every evaluation the invariant holds. When the loop ends $i=n+1=8$, and the algorithm returns $19$, the maximum of the whole array.

- Using the loop invariant we can prove the correctness of the <code>FindMaximum</code> algorithm, which is stated by the following observation.

<a id="box-4-obsCorrectFindMax"></a>

!!! teorema "Observation 9.3"

    Given an array $a[1..n]$ of $n \ge 1$ integer numbers, the <code>FindMaximum</code> algorithm terminates and returns

    $$
    \max\{a[1],a[2],\dots,a[n]\}.
    $$

??? dimostrazione "Proof"

    We prove the three properties of the loop invariant.

    - <strong>Initialization.</strong> Before the first iteration, lines [2](#riga-09-correctness-line-fm-a) and [3](#riga-09-correctness-line-fm-b) set $max=a[1]$ and $i=2$. The sub-array $a[1..i-1]=a[1..1]$ consists of the single element $a[1]$, whose maximum is $a[1]=max$. Hence the invariant holds.

    - <strong>Maintenance.</strong> Assume that, before an iteration, $max=\max\{a[1],\dots,a[i-1]\}$. The body of the loop compares $a[i]$ with $max$ (line [5](#riga-09-correctness-line-fm-d)):

        - if $a[i]>max$, then line [6](#riga-09-correctness-line-fm-e) sets $max \leftarrow a[i]$, and $a[i]$ is greater than all the elements of $a[1..i-1]$;

        - if $a[i]\le max$, then $max$ is not changed and it is greater than or equal to $a[i]$.

        In both cases, at the end of the body

        $$
        max=\max\{a[1],\dots,a[i-1],a[i]\}.
        $$

        Line [8](#riga-09-correctness-line-fm-f) increases $i$ by $1$, so that, with the new value of $i$, we have again $max=\max\{a[1],\dots,a[i-1]\}$. Hence the invariant holds before the next iteration.

    - <strong>Termination.</strong> The variable $i$ starts from $2\le n+1$ and increases by $1$ at every iteration, therefore the loop terminates after exactly $n-1$ iterations, when for the first time $i=n+1$. Substituting $i=n+1$ in the loop invariant we obtain

        $$
        max=\max\{a[1],a[2],\dots,a[n]\},
        $$

        which is the value returned at line [10](#riga-09-correctness-line-fm-g). Hence, the algorithm is correct.

    <p class="qed-riga"><span class="qed">□</span></p>

## 9.3 Correctness of Insertion Sort

!!! chiave ""

    Given an array $a[1..n]$ of $n$ natural numbers, with $n\ge 1$, consider the problem of rearranging the elements of the array in non-decreasing order:

    $$
    a[1] \le a[2] \le \cdots \le a[n].
    $$

- With two nested loops the proof needs two invariants, one for each loop. This is the pseudo-code of the <code>InsertionSort</code> algorithm.

!!! algoritmo "Algorithm: InsertionSort"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> natural numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The array <span class="arithmatex">&#92;(a&#92;)</span> sorted in non-decreasing order</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> InsertionSort(a, n)</span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 2&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(key := a&#91;i&#93;&#92;)</span></span><span class="pc-c">// Element to insert</span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := i - 1&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;ge 1&#92;)</span> <strong>and</strong> <span class="arithmatex">&#92;(a&#91;j&#93; &gt; key&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;j+1&#93;&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(a&#91;j&#93;&#92;)</span></span><span class="pc-c">// Shift element to the right</span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-g"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(j - 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-h"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;j+1&#93;&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(key&#92;)</span></span><span class="pc-c">// Insert key in correct position</span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-is-i"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- The condition at line [6](#riga-09-correctness-line-is-e) is evaluated from left to right, and the second part is evaluated only if the first one is true: when $j=0$ the condition is false and the non-existent element $a[0]$ is never accessed. The <code>C++</code> condition <code>i &gt; -1 and a[i] &gt; key</code> behaves in the same way.

- The algorithm contains two nested loops. We first prove what a single execution of the <strong>inner</strong> while loop (lines [6](#riga-09-correctness-line-is-e)–[8](#riga-09-correctness-line-is-g)) does, and then we use this result to prove the correctness of the <strong>outer</strong> while loop (lines [3](#riga-09-correctness-line-is-b)–[11](#riga-09-correctness-line-is-i)).

### 9.3.1 The inner loop

- Consider one iteration of the outer loop, with a given value of $i \in \{2,3,\dots,n\}$. We denote by

    $$
    b[1..i]
    $$

    the content of the sub-array $a[1..i]$ at the beginning of this iteration (i.e., when the condition at line [3](#riga-09-correctness-line-is-b) is true), and we assume that $b[1..i-1]$ is sorted in non-decreasing order. After line [4](#riga-09-correctness-line-is-c) we have $key=b[i]$.

- The <strong>loop invariant</strong> of the inner while loop is:

!!! chiave ""

    Every time the condition at line [6](#riga-09-correctness-line-is-e) is evaluated:

    - **(I1)** $a[1..j]=b[1..j]$ (the first $j$ elements have not been moved);

    - **(I2)** $a[j+2..i]=b[j+1..i-1]$ (the elements $b[j+1],\dots,b[i-1]$ have been shifted one position to the right);

    - **(I3)** every element of $a[j+2..i]$ is strictly greater than $key$.

    The entries $a[i+1..n]$ are never modified by the inner loop.

- The position $j+1$ is the “hole” in which $key$ will be inserted: its current content is a copy that will be overwritten. A sub-array $a[l..r]$ with $l>r$ is <strong>empty</strong>, and any property of all its elements is trivially true.

<a id="box-5-exInvariantInsInner"></a>

!!! esempio "Example 9.2: Loop invariant of the inner loop"

    Consider the array $a=[5,2,4,1,3]$ at the beginning of the iteration $i=5$ of the outer loop: $b[1..5]=[1,2,4,5,3]$ and $key=3$. The table shows the array every time the condition at line [6](#riga-09-correctness-line-is-e) is evaluated.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(j&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;1..j&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;j+2..5&#93;&#92;)</span></th>
    <th>condition</th>
    </tr>
    <tr>
    <td>4</td>
    <td>1</td>
    <td>2</td>
    <td>4</td>
    <td>5</td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(&#91;1,2,4,5&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;&#92; &#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(a&#91;4&#93;=5&gt;3&#92;)</span>: true</td>
    </tr>
    <tr>
    <td>3</td>
    <td>1</td>
    <td>2</td>
    <td>4</td>
    <td>5</td>
    <td class="cella-blu">5</td>
    <td><span class="arithmatex">&#92;(&#91;1,2,4&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;5&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(a&#91;3&#93;=4&gt;3&#92;)</span>: true</td>
    </tr>
    <tr>
    <td>2</td>
    <td>1</td>
    <td>2</td>
    <td>4</td>
    <td class="cella-blu">4</td>
    <td>5</td>
    <td><span class="arithmatex">&#92;(&#91;1,2&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;4,5&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(a&#91;2&#93;=2&#92;le 3&#92;)</span>: false</td>
    </tr>
    </table></div>

    At every evaluation $a[1..j]=b[1..j]$, $a[j+2..5]=b[j+1..4]$ and all the elements of $a[j+2..5]$ are greater than $3$. When the loop ends $j=2$, and line [10](#riga-09-correctness-line-is-h) sets $a[3]\leftarrow 3$, giving $a[1..5]=[1,2,3,4,5]$.

<a id="box-6-lemInsertionSortInner"></a>

!!! teorema "Lemma 9.4: inner loop of Insertion Sort"

    Consider an iteration of the outer loop of <code>InsertionSort</code> with $i\in\{2,\dots,n\}$, and let $b[1..i]$ be the content of $a[1..i]$ at the beginning of the iteration. If $b[1..i-1]$ is sorted in non-decreasing order, then the inner while loop terminates and, after line [10](#riga-09-correctness-line-is-h), the sub-array $a[1..i]$ contains the elements $b[1],\dots,b[i]$ sorted in non-decreasing order, while $a[i+1..n]$ is unchanged.

??? dimostrazione "Proof"

    We prove the three properties of the loop invariant (I1)–(I3).

    - <strong>Initialization.</strong> Before the first evaluation of the condition, $j=i-1$ and nothing has been modified. Hence $a[1..i-1]=b[1..i-1]$, i.e. (I1) holds. The sub-arrays $a[j+2..i]=a[i+1..i]$ and $b[j+1..i-1]=b[i..i-1]$ are both empty, so (I2) and (I3) hold trivially.

    - <strong>Maintenance.</strong> Assume that (I1)–(I3) hold and that the condition at line [6](#riga-09-correctness-line-is-e) is true, i.e., $j\ge 1$ and $a[j]>key$. By (I1), $a[j]=b[j]$, so $b[j]>key$. Line [7](#riga-09-correctness-line-is-f) sets $a[j+1]\leftarrow a[j]=b[j]$; therefore, by (I2),

        $$
        a[j+1..i]=b[j..i-1],
        $$

        and all these elements are greater than $key$ (by (I3) and $b[j]>key$). Positions $1,\dots,j$ are not modified. Line [8](#riga-09-correctness-line-is-g) sets $j\leftarrow j-1$. Denoting by $j'=j-1$ the new value, we have $a[1..j']=b[1..j']$, $a[j'+2..i]=a[j+1..i]=b[j..i-1]=b[j'+1..i-1]$, and all the elements of $a[j'+2..i]$ are greater than $key$. Hence (I1)–(I3) hold before the next evaluation of the condition.

    - <strong>Termination.</strong> The variable $j$ starts from $i-1$ and decreases by $1$ at every iteration; since the loop stops at the latest when $j=0$, the inner loop executes at most $i-1$ iterations and terminates. When it terminates, either $j=0$ or $a[j]=b[j]\le key$. By (I1)–(I3):

        - $a[1..j]=b[1..j]$ is sorted and, if $j\ge 1$, its largest element $b[j]$ is $\le key$;

        - $a[j+2..i]=b[j+1..i-1]$ is sorted and all its elements are $>key$.

        Line [10](#riga-09-correctness-line-is-h) sets $a[j+1]\leftarrow key=b[i]$. Therefore

        $$
        a[1..i]=\big[\,b[1],\dots,b[j],\ key,\ b[j+1],\dots,b[i-1]\,\big],
        $$

        which contains exactly the elements $b[1],\dots,b[i]$ and is sorted in non-decreasing order, because $b[1..j]$ is sorted, $b[j]\le key< b[j+1]$, and $b[j+1..i-1]$ is sorted. Positions $i+1,\dots,n$ are never accessed.

    <p class="qed-riga"><span class="qed">□</span></p>

### 9.3.2 The outer loop

- The <strong>loop invariant</strong> of the outer while loop is:

!!! chiave ""

    Every time the condition at line [3](#riga-09-correctness-line-is-b) is evaluated, the sub-array $a[1..i-1]$ consists of the elements originally in $a[1..i-1]$, but sorted in non-decreasing order, and the sub-array $a[i..n]$ is equal to the original sub-array $a[i..n]$.

<a id="box-7-exInvariantInsOuter"></a>

!!! esempio "Example 9.3: Loop invariant of the outer loop"

    Consider the array $a=[5,2,4,1,3]$ with $n=5$. The table shows the array every time the condition at line [3](#riga-09-correctness-line-is-b) is evaluated; the sorted sub-array $a[1..i-1]$ is highlighted in <mark style="background:color-mix(in srgb, #1971c2 30%, transparent);color:inherit">blue</mark>.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
    <th>original <span class="arithmatex">&#92;(a&#91;1..i-1&#93;&#92;)</span></th>
    </tr>
    <tr>
    <td>2</td>
    <td class="cella-blu">5</td>
    <td>2</td>
    <td>4</td>
    <td>1</td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(&#91;5&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>3</td>
    <td class="cella-blu">2</td>
    <td class="cella-blu">5</td>
    <td>4</td>
    <td>1</td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(&#91;5,2&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>4</td>
    <td class="cella-blu">2</td>
    <td class="cella-blu">4</td>
    <td class="cella-blu">5</td>
    <td>1</td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(&#91;5,2,4&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>5</td>
    <td class="cella-blu">1</td>
    <td class="cella-blu">2</td>
    <td class="cella-blu">4</td>
    <td class="cella-blu">5</td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(&#91;5,2,4,1&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>6</td>
    <td class="cella-blu">1</td>
    <td class="cella-blu">2</td>
    <td class="cella-blu">3</td>
    <td class="cella-blu">4</td>
    <td class="cella-blu">5</td>
    <td><span class="arithmatex">&#92;(&#91;5,2,4,1,3&#93;&#92;)</span>   (loop ends)</td>
    </tr>
    </table></div>

- Using the loop invariant and [Lemma 9.4](#box-6-lemInsertionSortInner) we can prove the correctness of the <code>InsertionSort</code> algorithm.

<a id="box-8-obsCorrectInsertionSort"></a>

!!! teorema "Observation 9.5"

    Given an array $a[1..n]$ of $n\ge 1$ natural numbers, the <code>InsertionSort</code> algorithm terminates and, at the end, the array $a[1..n]$ contains the original elements rearranged in non-decreasing order:

    $$
    a[1]\le a[2]\le\cdots\le a[n].
    $$

??? dimostrazione "Proof"

    We prove the three properties of the loop invariant of the outer loop.

    - <strong>Initialization.</strong> Before the first iteration, $i=2$ (line [2](#riga-09-correctness-line-is-a)) and the array has not been modified. The sub-array $a[1..i-1]=a[1..1]$ consists of the single original element $a[1]$, and it is trivially sorted. The sub-array $a[2..n]$ is the original one. Hence the invariant holds.

    - <strong>Maintenance.</strong> Assume that the invariant holds and that $i\le n$. Then $a[1..i-1]$ contains the original elements of $a[1..i-1]$ sorted, and $a[i]$ is the original element $a[i]$. By [Lemma 9.4](#box-6-lemInsertionSortInner), after line [10](#riga-09-correctness-line-is-h) the sub-array $a[1..i]$ contains these $i$ elements, i.e., the original elements of $a[1..i]$, sorted in non-decreasing order, and $a[i+1..n]$ is unchanged, hence still equal to the original one. Line [11](#riga-09-correctness-line-is-i) sets $i\leftarrow i+1$, so the invariant holds with the new value of $i$.

    - <strong>Termination.</strong> The variable $i$ starts from $2\le n+1$ and increases by $1$ at every iteration, and each inner loop terminates ([Lemma 9.4](#box-6-lemInsertionSortInner)). Therefore the outer loop terminates after exactly $n-1$ iterations, when $i=n+1$ for the first time. Substituting $i=n+1$ in the loop invariant, the sub-array $a[1..n]$, i.e., the entire array, consists of the original elements sorted in non-decreasing order. Hence, the algorithm is correct.

    <p class="qed-riga"><span class="qed">□</span></p>

## 9.4 Correctness of Binary Search

!!! chiave ""

    Given an array $a[1..n]$ of $n$ natural numbers sorted in non-decreasing order and a target natural number $m$, consider the problem of determining if $m$ is one of the elements of the array.

- In the previous two algorithms the loop always runs until its condition becomes false. Binary search can also stop early, with a <strong>return</strong> inside the loop, and the proof must take both exits into account. This is the pseudo-code of the (iterative) <code>BinarySearch</code> algorithm.

!!! algoritmo "Algorithm: BinarySearch"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> natural numbers sorted in non-decreasing order and a target value <span class="arithmatex">&#92;(m&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>Index of <span class="arithmatex">&#92;(m&#92;)</span> in <span class="arithmatex">&#92;(a&#92;)</span>, or <span class="arithmatex">&#92;(-1&#92;)</span> if not found</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> BinarySearch(a, n, m)</span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(left&#92;)</span> := <span class="arithmatex">&#92;(1&#92;)</span></span><span class="pc-c">// Left boundary</span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(right&#92;)</span> := <span class="arithmatex">&#92;(n&#92;)</span></span><span class="pc-c">// Right boundary</span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(left &#92;le right&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(mid&#92;)</span> := <span class="arithmatex">&#92;(left + &#92;lfloor (right - left) / 2 &#92;rfloor&#92;)</span></span><span class="pc-c">// Middle index</span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;mid&#93; = m&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(mid&#92;)</span></span><span class="pc-c">// Element found</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-g"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;mid&#93; &lt; m&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-h"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(left&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(mid + 1&#92;)</span></span><span class="pc-c">// Search in right half</span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>else</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-i"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(right&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(mid - 1&#92;)</span></span><span class="pc-c">// Search in left half</span></span></div>
    <div class="pc-riga"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-bs-j"><span class="pc-n">16</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(-1&#92;)</span></span><span class="pc-c">// Element not found</span></span></div>
    <div class="pc-riga"><span class="pc-n">17</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- The <strong>loop invariant</strong> of the while loop of <code>BinarySearch</code> is:

!!! chiave ""

    Every time the condition at line [4](#riga-09-correctness-line-bs-c) is evaluated:

    - **(I1)** $1\le left$ and $right\le n$;

    - **(I2)** if $m$ is in $a$, then $m$ is in $a[left..right]$, that is,

        $$
        m\in\{a[1],\dots,a[n]\}
        \ \Longrightarrow\
        m\in\{a[left],\dots,a[right]\}.
        $$

- In words: the algorithm never discards a portion of the array that may contain $m$. The sub-array $a[left..right]$ is called the <strong>search interval</strong> and it contains $right-left+1$ elements (it is empty if $left>right$).

<a id="box-9-exInvariantBinSearch"></a>

!!! esempio "Example 9.4: Loop invariant of BinarySearch"

    Search for $m=10$ in $a=[3, 9, 11, 12, 12, 16, 19]$ ($n=7$). The table shows the search interval every time the condition at line [4](#riga-09-correctness-line-bs-c) is evaluated.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(left&#92;)</span></th>
    <th><span class="arithmatex">&#92;(right&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;left..right&#93;&#92;)</span></th>
    <th>action</th>
    </tr>
    <tr>
    <td>1</td>
    <td>7</td>
    <td><span class="arithmatex">&#92;(&#91;3,9,11,12,12,16,19&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(mid=4&#92;)</span>, <span class="arithmatex">&#92;(a&#91;4&#93;=12&gt;10&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <span class="arithmatex">&#92;(right=3&#92;)</span></td>
    </tr>
    <tr>
    <td>1</td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(&#91;3,9,11&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(mid=2&#92;)</span>, <span class="arithmatex">&#92;(a&#91;2&#93;=9&lt;10&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <span class="arithmatex">&#92;(left=3&#92;)</span></td>
    </tr>
    <tr>
    <td>3</td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(&#91;11&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(mid=3&#92;)</span>, <span class="arithmatex">&#92;(a&#91;3&#93;=11&gt;10&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <span class="arithmatex">&#92;(right=2&#92;)</span></td>
    </tr>
    <tr>
    <td>3</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#91;&#92; &#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(left&gt;right&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> return <span class="arithmatex">&#92;(-1&#92;)</span></td>
    </tr>
    </table></div>

    Since $10$ is not in $a$, the invariant (I2) is trivially true; when the interval becomes empty the algorithm correctly returns $-1$.

<a id="box-10-obsCorrectBinarySearch"></a>

!!! teorema "Observation 9.6"

    Given an array $a[1..n]$ of $n$ natural numbers sorted in non-decreasing order and a natural number $m$, the <code>BinarySearch</code> algorithm terminates; it returns an index $k$ such that $a[k]=m$ if $m$ is in $a$, and it returns $-1$ otherwise.

??? dimostrazione "Proof"

    We prove the three properties of the loop invariant.

    - <strong>Initialization.</strong> Lines [2](#riga-09-correctness-line-bs-a) and [3](#riga-09-correctness-line-bs-b) set $left=1$ and $right=n$. Then (I1) holds, and $a[left..right]=a[1..n]$ is the whole array, so (I2) holds.

    - <strong>Maintenance.</strong> Assume that (I1)–(I2) hold and that $left\le right$. Line [5](#riga-09-correctness-line-bs-d) computes $mid=left+\lfloor(right-left)/2\rfloor$; since $0\le \lfloor(right-left)/2\rfloor\le right-left$, we have

        $$
        1\le left\le mid\le right\le n,
        $$

        so $a[mid]$ is a valid entry of the array. Three cases are possible.

        - $a[mid]=m$: the algorithm returns $mid$ at line [7](#riga-09-correctness-line-bs-f), which is a correct output.

        - $a[mid]<m$: since the array is sorted, for every $k\le mid$ we have $a[k]\le a[mid]<m$. Hence $m$ is not in $a[left..mid]$, and if $m$ is in $a[left..right]$ then it is in $a[mid+1..right]$. Line [10](#riga-09-correctness-line-bs-h) sets $left\leftarrow mid+1\ge 1$, so (I1) and (I2) still hold.

        - $a[mid]>m$: since the array is sorted, for every $k\ge mid$ we have $a[k]\ge a[mid]>m$. Hence, if $m$ is in $a[left..right]$, then it is in $a[left..mid-1]$. Line [13](#riga-09-correctness-line-bs-i) sets $right\leftarrow mid-1\le n$, so (I1) and (I2) still hold.

    - <strong>Termination.</strong> Consider the number of elements of the search interval, $right-left+1$. In the second case the new number is $right-mid\le right-left$, in the third case it is $mid-left\le right-left$: in both cases it decreases by at least $1$. Since the loop continues only while $right-left+1\ge 1$, the loop terminates after at most $n$ iterations. The algorithm ends in one of two ways:

        - it returns $mid$ with $a[mid]=m$, which is correct;

        - the condition $left\le right$ is false, i.e., the search interval $a[left..right]$ is empty. Since an empty sub-array does not contain $m$, by (I2) $m$ is not in $a$, and the algorithm correctly returns $-1$ at line [16](#riga-09-correctness-line-bs-j).

        Hence, the algorithm is correct.

    <p class="qed-riga"><span class="qed">□</span></p>

## 9.5 Correctness of the Euclidean algorithm

!!! chiave ""

    Given two natural numbers $n, m \ge 1$, consider the problem of computing their greatest common divisor $\gcd(n,m)$.

- In the last example the invariant is not a property of a portion of an array, but an equality between two numbers that never changes. This is the pseudo-code of the Euclidean algorithm.

!!! algoritmo "Algorithm: EuclideanAlgorithm"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(n, m &#92;ge 1&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><span class="arithmatex">&#92;(&#92;gcd(n, m)&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> EuclideanAlgorithm(<span class="arithmatex">&#92;(n&#92;)</span>, <span class="arithmatex">&#92;(m&#92;)</span>)</span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-eu-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(m &#92;ne 0&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-eu-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(r := n &#92;bmod m&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-eu-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(n &#92;leftarrow m&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-eu-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m &#92;leftarrow r&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-09-correctness-line-eu-e"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(n&#92;)</span></span><span class="pc-c">// <span class="arithmatex">&#92;(m = 0&#92;)</span>: <span class="arithmatex">&#92;(n&#92;)</span> is the GCD</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

- The proof is based on the following property of the greatest common divisor, proved in the chapter «Numerical algorithms»:

    $$
    \gcd(n, m) = \gcd(m,\ n \bmod m)\qquad \text{for every } n\ge 1,\ m \ge 1.
    $$

- We also use the convention $\gcd(n,0)=n$ for $n\ge 1$: every natural number divides $0$, so the common divisors of $n$ and $0$ are the divisors of $n$, and the greatest of them is $n$.

- We denote by $n_0$ and $m_0$ the values of $n$ and $m$ given in input. The <strong>loop invariant</strong> of the while loop is:

!!! chiave ""

    Every time the condition at line [2](#riga-09-correctness-line-eu-a) is evaluated, $n\ge 1$, $m\ge 0$, and

    $$
    \gcd(n,m)=\gcd(n_0,m_0).
    $$

<a id="box-11-exInvariantEuclid"></a>

!!! esempio "Example 9.5: Loop invariant of the Euclidean algorithm"

    Consider $n_0=252$ and $m_0=105$. The table shows the values of $n$ and $m$ every time the condition at line [2](#riga-09-correctness-line-eu-a) is evaluated:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(n&#92;)</span></th>
    <th><span class="arithmatex">&#92;(m&#92;)</span></th>
    <th><span class="arithmatex">&#92;(&#92;gcd(n,m)&#92;)</span></th>
    </tr>
    <tr>
    <td>252</td>
    <td>105</td>
    <td>21</td>
    </tr>
    <tr>
    <td>105</td>
    <td>42</td>
    <td>21</td>
    </tr>
    <tr>
    <td>42</td>
    <td>21</td>
    <td>21</td>
    </tr>
    <tr>
    <td>21</td>
    <td>0</td>
    <td>21   (loop ends)</td>
    </tr>
    </table></div>

    The value $\gcd(n,m)=21$ never changes, and when $m=0$ the algorithm returns $n=21=\gcd(252,105)$.

<a id="box-12-obsCorrectEuclid"></a>

!!! teorema "Observation 9.7"

    Given two natural numbers $n_0,m_0\ge 1$, the <code>EuclideanAlgorithm</code> terminates and returns $\gcd(n_0,m_0)$.

??? dimostrazione "Proof"

    We prove the three properties of the loop invariant.

    - <strong>Initialization.</strong> Before the first iteration $n=n_0\ge 1$ and $m=m_0\ge 1$, so trivially $\gcd(n,m)=\gcd(n_0,m_0)$.

    - <strong>Maintenance.</strong> Assume that the invariant holds and that $m\ne 0$, i.e., $m\ge 1$. Line [3](#riga-09-correctness-line-eu-b) computes $r=n\bmod m$, with $0\le r<m$. Lines [4](#riga-09-correctness-line-eu-c)–[5](#riga-09-correctness-line-eu-d) replace the pair $(n,m)$ with $(m,r)$. The new value of $n$ is $m\ge 1$, the new value of $m$ is $r\ge 0$, and, since $n,m\ge 1$,

        $$
        \gcd(m,r)=\gcd(m,\ n\bmod m)=\gcd(n,m)=\gcd(n_0,m_0).
        $$

        Hence the invariant holds before the next iteration.

    - <strong>Termination.</strong> At every iteration the value of $m$ is replaced by $r<m$, so $m$ is a natural number that strictly decreases. Therefore the loop terminates after at most $m_0$ iterations, when $m=0$. Substituting $m=0$ in the loop invariant we obtain

        $$
        \gcd(n_0,m_0)=\gcd(n,0)=n,
        $$

        which is the value returned at line [7](#riga-09-correctness-line-eu-e). Hence, the algorithm is correct.

    <p class="qed-riga"><span class="qed">□</span></p>

- The proof does not use the assumption $n_0\ge m_0$: if $n_0<m_0$, then $n_0\bmod m_0=n_0$ and the first iteration simply swaps the two numbers.

- The bound “at most $m_0$ iterations” is enough to prove termination, but it is very pessimistic: the number of iterations is actually $O(\log_2 m_0)$ (in the example, $3$ iterations for $m_0=105$).

## 9.6 Correctness of recursive algorithms

- Loop invariants are the tool to prove the correctness of <strong>iterative</strong> algorithms, i.e., algorithms based on loops.

- A <strong>recursive</strong> algorithm solves an instance of a problem by calling itself on one or more smaller instances. Its correctness is proved directly by <strong>mathematical induction</strong> on the size of the instance:

    - <strong>base case</strong>: the algorithm returns the correct output on the smallest instances, which are solved without recursive calls;

    - <strong>inductive step</strong>: under the inductive hypothesis that the recursive calls return the correct output on the smaller instances, the algorithm combines their results into the correct output for the current instance.

- Termination follows from the fact that every recursive call is made on a strictly smaller instance, so the base case is eventually reached.

!!! chiave ""

    The correctness of recursive algorithms is proved by induction on the size of the input. This technique is applied together with the study of recursive algorithms.

!!! chiave ""

    <strong>Key points of the chapter</strong>

    - An algorithm is correct if, for every input instance, it terminates and returns the correct output; testing can only show that an algorithm is wrong.

    - The correctness of a loop is proved with a loop invariant: initialization, maintenance and termination.

    - The invariant, together with the negated condition of the loop, gives the output: $i=n+1$ for Find Maximum and Insertion Sort, an empty search interval for Binary Search, $m=0$ for the Euclidean algorithm.

    - Nested loops need one invariant for each loop (Insertion Sort); a <strong>return</strong> inside the loop is a second exit that must be proved correct (Binary Search).

    - Recursive algorithms are proved correct by induction on the size of the input.

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

## Interactive lab { #interactive-lab }

The algorithm of the chapter, one step at a time: move the sliders and press ▶.
All the graphs of the course are in the [interactive lab](../lab/index.md#cap-9).

<div class="gi" data-grafico="invariante"></div>
