---
title: "Exercises · Correctness"
---

# Exercises · Correctness

<div class="info-capitolo" markdown>

**Exercises · Chapter 9** · each solution opens with a click · [:material-book-open-variant: Chapter 9](../analysis-recursion/09-correctness.md) · [:material-file-pdf-box: Exercises, volume 2 (PDF)](../pdf/exercises-2-analysis-recursion.pdf)

</div>

In the exercises of this chapter the correctness of a loop is proved with a loop invariant, as in the chapter «Correctness», following the scheme below.

!!! nota ""

    A loop invariant is a property of the variables that is true every time the condition of the loop is evaluated. To prove the correctness of the loop:

    1. <strong>Initialization</strong>: the invariant is true before the first iteration;

    2. <strong>Maintenance</strong>: if the invariant is true before an iteration, it is true before the next one;

    3. <strong>Termination</strong>: the loop terminates after a finite number of iterations (a natural number strictly decreases at each iteration), and the invariant, together with the negated condition of the loop, gives the correct output.

    A sub-array $a[l..r]$ with $l>r$ is empty, and an empty sum is equal to $0$. To show that an algorithm is <strong>wrong</strong>, one counterexample is enough.

<a id="esercizio-9-1"></a>

!!! esercizio "Exercise 9.1: Correctness (E1)"

    Consider the following algorithm, which computes the minimum value of an array $a[1..n]$ of $n\ge 1$ natural numbers.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> FindMinimum</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> natural numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The minimum value in array <span class="arithmatex">&#92;(a&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FindMinimum(a, n)</span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc1-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(min := a&#91;1&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc1-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 2&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc1-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc1-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &lt; min&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc1-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(min &#92;leftarrow a&#91;i&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc1-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc1-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(min&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. State a loop invariant for the while loop of <code>FindMinimum</code>.

    2. Verify the loop invariant on the array $a=[7,3,9,2,5,2]$, showing the values of $i$ and $min$ every time the condition at line [4](#riga-ex-09-correctness-exc1-c) is evaluated.

    3. Prove the correctness of <code>FindMinimum</code> (initialization, maintenance, termination).

    4. A student replaces line [2](#riga-ex-09-correctness-exc1-a) with $min := 0$. Show, with a counterexample, that the new algorithm is wrong, and indicate which property of the loop invariant fails.

??? soluzione "Solution"

    1. Loop invariant:

        !!! chiave ""

            Every time the condition at line [4](#riga-ex-09-correctness-exc1-c) is evaluated,

            $$
            min=\min\{a[1],a[2],\dots,a[i-1]\}.
            $$

    2. For $a=[7,3,9,2,5,2]$ ($n=6$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(min&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1..i-1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;min&#92;{a&#91;1&#93;,&#92;dots,a&#91;i-1&#93;&#92;}&#92;)</span></th>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td><span class="arithmatex">&#92;(&#91;7&#93;&#92;)</span></td>
        <td>7</td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#91;7,3&#93;&#92;)</span></td>
        <td>3</td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#91;7,3,9&#93;&#92;)</span></td>
        <td>3</td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#91;7,3,9,2&#93;&#92;)</span></td>
        <td>2</td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#91;7,3,9,2,5&#93;&#92;)</span></td>
        <td>2</td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#91;7,3,9,2,5,2&#93;&#92;)</span></td>
        <td>2   (loop ends)</td>
        </tr>
        </table></div>

        The invariant holds at every evaluation, and the algorithm returns $2$.

    3. Proof of correctness.

        - <strong>Initialization.</strong> Before the first iteration $min=a[1]$ and $i=2$. The sub-array $a[1..1]$ has the single element $a[1]$, whose minimum is $a[1]=min$.

        - <strong>Maintenance.</strong> Assume $min=\min\{a[1],\dots,a[i-1]\}$ and $i\le n$. If $a[i]<min$, line [6](#riga-ex-09-correctness-exc1-e) sets $min\leftarrow a[i]$, which is smaller than all the elements of $a[1..i-1]$; otherwise $min\le a[i]$ and $min$ is not changed. In both cases $min=\min\{a[1],\dots,a[i]\}$. Line [8](#riga-ex-09-correctness-exc1-f) sets $i\leftarrow i+1$, so the invariant holds with the new value of $i$.

        - <strong>Termination.</strong> The variable $i$ starts from $2\le n+1$ and increases by $1$ at every iteration, so the loop terminates after $n-1$ iterations, when $i=n+1$. Substituting $i=n+1$ in the invariant:

            $$
            min=\min\{a[1],\dots,a[n]\},
            $$

            which is returned at line [10](#riga-ex-09-correctness-exc1-g). Hence the algorithm is correct.

    4. With $min:=0$, consider $a=[3,5]$. Since no element is smaller than $0$, line [6](#riga-ex-09-correctness-exc1-e) is never executed and the algorithm returns $0$, while the correct output is $3$. Hence the algorithm is wrong.

        The property that fails is the <strong>initialization</strong>: before the first iteration $i=2$ and $min=0$, while $\min\{a[1]\}=a[1]=3\neq 0$. Maintenance is still true (if the invariant held, it would continue to hold), but since it is false at the beginning, the termination argument cannot be applied. In fact, since the entries are natural numbers, the algorithm always returns $\min\{0,a[2],\dots,a[n]\}=0$, which is correct only if at least one entry of the array is equal to $0$.

<a id="esercizio-9-2"></a>

!!! esercizio "Exercise 9.2: Correctness (E2)"

    Consider the following algorithm.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> ArraySum</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;ge 1&#92;)</span> natural numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(s&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ArraySum(a, n)</span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc2-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s := 0&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc2-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc2-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc2-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s &#92;leftarrow s + a&#91;i&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc2-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc2-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(s&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. What does the algorithm compute? State a loop invariant for its while loop.

    2. Verify the loop invariant on the array $a=[4,1,7,3]$, showing the values of $i$ and $s$ every time the condition at line [4](#riga-ex-09-correctness-exc2-c) is evaluated.

    3. Prove the correctness of <code>ArraySum</code>.

    4. A student modifies line [3](#riga-ex-09-correctness-exc2-b) into $i:=0$ and line [4](#riga-ex-09-correctness-exc2-c) into “<strong>while</strong> $i<n$”, keeping $a[i]$ at line [5](#riga-ex-09-correctness-exc2-d). Is the new algorithm correct?

??? soluzione "Solution"

    1. The algorithm computes the sum of the elements of the array:

        $$
        s=\sum_{k=1}^{n}a[k].
        $$

        Loop invariant:

        !!! chiave ""

            Every time the condition at line [4](#riga-ex-09-correctness-exc2-c) is evaluated,

            $$
            s=\sum_{k=1}^{i-1}a[k],
            $$

            where an empty sum ($i=1$) is equal to $0$.

    2. For $a=[4,1,7,3]$ ($n=4$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(s&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;sum&#95;{k=1}^{i-1}a&#91;k&#93;&#92;)</span></th>
        </tr>
        <tr>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (empty sum)</td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(4+1=5&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>12</td>
        <td><span class="arithmatex">&#92;(4+1+7=12&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>15</td>
        <td><span class="arithmatex">&#92;(4+1+7+3=15&#92;)</span>   (loop ends)</td>
        </tr>
        </table></div>

        The algorithm returns $15$.

    3. Proof of correctness.

        - <strong>Initialization.</strong> Before the first iteration $s=0$ and $i=1$; the sum $\sum_{k=1}^{0}a[k]$ is empty, hence equal to $0=s$.

        - <strong>Maintenance.</strong> Assume $s=\sum_{k=1}^{i-1}a[k]$ and $i\le n$. Line [5](#riga-ex-09-correctness-exc2-d) gives

            $$
            s+a[i]=\sum_{k=1}^{i-1}a[k]+a[i]=\sum_{k=1}^{i}a[k],
            $$

            and line [6](#riga-ex-09-correctness-exc2-e) increases $i$ by $1$, so the invariant holds with the new value of $i$.

        - <strong>Termination.</strong> The variable $i$ starts from $1$ and increases by $1$ at every iteration, so the loop terminates after $n$ iterations, when $i=n+1$. Substituting $i=n+1$ in the invariant gives $s=\sum_{k=1}^{n}a[k]$, which is returned at line [8](#riga-ex-09-correctness-exc2-f). Hence the algorithm is correct.

    4. No. With $i:=0$ the first iteration accesses $a[0]$, which does not exist in an array $a[1..n]$; moreover, the condition $i<n$ stops the loop when $i=n$, so $a[n]$ is never added. In terms of the invariant, the natural invariant of the new loop is $s=\sum_{k=0}^{i-1}a[k]$, and at termination ($i=n$) it gives $s=\sum_{k=0}^{n-1}a[k]\neq\sum_{k=1}^{n}a[k]$: the termination step does not give the required property. For example, on $a=[4,1,7,3]$ the element $a[4]=3$ is never added, so even ignoring the invalid access the result cannot be $15$. This is a typical error obtained by mixing $0$-indexed code (as in C++) with $1$-indexed pseudo-code.

<a id="esercizio-9-3"></a>

!!! esercizio "Exercise 9.3: Correctness (E3)"

    Consider the <code>SelectionSort</code> algorithm, which sorts an array $a[1..n]$ of $n\ge 1$ natural numbers in non-decreasing order.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> SelectionSort</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> natural numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The array <span class="arithmatex">&#92;(a&#92;)</span> sorted in non-decreasing order</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> SelectionSort(a, n)</span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n-1&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(&#92;mathit{minIdx} := i&#92;)</span></span><span class="pc-c">// index of the minimum in <span class="arithmatex">&#92;(a&#91;i..n&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := i+1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;j&#93; &lt; a&#91;&#92;mathit{minIdx}&#93;&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-g"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(&#92;mathit{minIdx} &#92;leftarrow j&#92;)</span></span><span class="pc-c">// new minimum found</span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-h"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j &#92;leftarrow j + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-i"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(&#92;mathit{minIdx} &#92;neq i&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-j"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(&#92;mathit{tmp} &#92;leftarrow a&#91;i&#93;&#92;)</span></span><span class="pc-c">// swap <span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span> and <span class="arithmatex">&#92;(a&#91;&#92;mathit{minIdx}&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-k"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;i&#93; &#92;leftarrow a&#91;&#92;mathit{minIdx}&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-l"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;&#92;mathit{minIdx}&#93; &#92;leftarrow &#92;mathit{tmp}&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">16</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc3-m"><span class="pc-n">17</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">18</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">19</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. State a loop invariant for the inner while loop (line [6](#riga-ex-09-correctness-exc3-e)) and prove it.

    2. State a loop invariant for the outer while loop (line [3](#riga-ex-09-correctness-exc3-b)).

    3. Verify the invariant of the outer loop on the array $a=[29,10,14,37,13]$.

    4. Prove the correctness of <code>SelectionSort</code>.

??? soluzione "Solution"

    1. Consider an iteration of the outer loop with a given value of $i$. The inner loop does not modify the array. Its invariant is:

        !!! chiave ""

            Every time the condition at line [6](#riga-ex-09-correctness-exc3-e) is evaluated, $i\le \mathit{minIdx}\le j-1$ and

            $$
            a[\mathit{minIdx}]=\min\{a[i],a[i+1],\dots,a[j-1]\}.
            $$

        - <strong>Initialization.</strong> Lines [4](#riga-ex-09-correctness-exc3-c)–[5](#riga-ex-09-correctness-exc3-d) set $\mathit{minIdx}=i$ and $j=i+1$: the sub-array $a[i..j-1]=a[i..i]$ has the single element $a[i]=a[\mathit{minIdx}]$.

        - <strong>Maintenance.</strong> Assume the invariant and $j\le n$. If $a[j]<a[\mathit{minIdx}]$, then $a[j]$ is smaller than all the elements of $a[i..j-1]$ and line [8](#riga-ex-09-correctness-exc3-g) sets $\mathit{minIdx}\leftarrow j$; otherwise $a[\mathit{minIdx}]\le a[j]$. In both cases $a[\mathit{minIdx}]=\min\{a[i],\dots,a[j]\}$ and $i\le\mathit{minIdx}\le j$. Line [10](#riga-ex-09-correctness-exc3-h) sets $j\leftarrow j+1$, so the invariant holds with the new $j$.

        - <strong>Termination.</strong> $j$ increases by $1$ from $i+1\le n$, so the loop stops when $j=n+1$. Then $a[\mathit{minIdx}]=\min\{a[i],\dots,a[n]\}$: $\mathit{minIdx}$ is the index of a minimum element of $a[i..n]$.

    2. Invariant of the outer loop:

        !!! chiave ""

            Every time the condition at line [3](#riga-ex-09-correctness-exc3-b) is evaluated:

            - **(P1)** the array $a[1..n]$ contains the original elements (it is a rearrangement of the input);

            - **(P2)** the sub-array $a[1..i-1]$ is sorted in non-decreasing order;

            - **(P3)** every element of $a[1..i-1]$ is $\le$ every element of $a[i..n]$.

    3. For $a=[29,10,14,37,13]$ ($n=5$); the sorted prefix $a[1..i-1]$ is highlighted in <mark style="background:color-mix(in srgb, #1971c2 30%, transparent);color:inherit">blue</mark>:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;4&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;5&#93;&#92;)</span></th>
        <th>minimum of <span class="arithmatex">&#92;(a&#91;i..n&#93;&#92;)</span></th>
        </tr>
        <tr>
        <td>1</td>
        <td>29</td>
        <td>10</td>
        <td>14</td>
        <td>37</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=10&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;1&#93;,a&#91;2&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td class="cella-blu">10</td>
        <td>29</td>
        <td>14</td>
        <td>37</td>
        <td>13</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=13&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;2&#93;,a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">13</td>
        <td>14</td>
        <td>37</td>
        <td>29</td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=14&#92;)</span>: no swap</td>
        </tr>
        <tr>
        <td>4</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">13</td>
        <td class="cella-blu">14</td>
        <td>37</td>
        <td>29</td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=29&#92;)</span>: swap <span class="arithmatex">&#92;(a&#91;4&#93;,a&#91;5&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">13</td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">29</td>
        <td>37</td>
        <td>loop ends (<span class="arithmatex">&#92;(i=n&#92;)</span>)</td>
        </tr>
        </table></div>

        At every row the blue prefix is sorted, and each blue element is $\le$ every non-blue element: e.g. for $i=4$, $\max\{10,13,14\}=14\le\min\{37,29\}=29$.

    4. Proof of correctness.

        - <strong>Initialization.</strong> Before the first iteration $i=1$ and nothing has been modified: (P1) holds, and $a[1..0]$ is empty, so (P2) and (P3) hold trivially.

        - <strong>Maintenance.</strong> Assume (P1)–(P3) and $i\le n-1$. By point 1, after the inner loop

            $$
            a[\mathit{minIdx}]=\min\{a[i],\dots,a[n]\}.
            $$

            Lines [12](#riga-ex-09-correctness-exc3-i)–[15](#riga-ex-09-correctness-exc3-l) swap $a[i]$ and $a[\mathit{minIdx}]$ (if they are different positions). A swap only exchanges two elements, so (P1) still holds. Now $a[i]$ is the minimum of $a[i..n]$, so:

            - by (P3), $a[i]\ge$ every element of $a[1..i-1]$, and since $a[1..i-1]$ is sorted (P2), $a[1..i]$ is sorted;

            - $a[i]\le$ every element of $a[i+1..n]$, because $a[i]$ is the minimum of $a[i..n]$ and the swap only rearranges the values in positions $i..n$; for the same reason, by (P3) every element of $a[1..i-1]$ is $\le$ every element of $a[i+1..n]$. Hence every element of $a[1..i]$ is $\le$ every element of $a[i+1..n]$.

            Line [17](#riga-ex-09-correctness-exc3-m) sets $i\leftarrow i+1$, so (P1)–(P3) hold with the new value of $i$.

        - <strong>Termination.</strong> The inner loop always terminates (point 1), and $i$ increases by $1$ from $1$; the outer loop stops when $i=n$ for the first time (after $n-1$ iterations; if $n=1$ it is never executed and $i=1=n$). Substituting $i=n$: $a[1..n-1]$ is sorted (P2) and every element of $a[1..n-1]$ is $\le a[n]$ (P3); hence the whole array $a[1..n]$ is sorted and, by (P1), it contains the original elements. Hence the algorithm is correct.

        Note that the outer loop needs only $n-1$ iterations: when the first $n-1$ positions are correct, the last element is automatically in its correct position.

<a id="esercizio-9-4"></a>

!!! esercizio "Exercise 9.4: Correctness (E4)"

    Consider the <code>LinearSearch</code> algorithm, which determines if a target value $m$ is one of the elements of an array $a[1..n]$ of $n$ natural numbers (not necessarily sorted).

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> LinearSearch</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> natural numbers and a target value <span class="arithmatex">&#92;(m&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>Index of <span class="arithmatex">&#92;(m&#92;)</span> in <span class="arithmatex">&#92;(a&#92;)</span>, or <span class="arithmatex">&#92;(-1&#92;)</span> if not found</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> LinearSearch(a, n, m)</span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc4-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc4-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc4-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; = m&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc4-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(i&#92;)</span></span><span class="pc-c">// Element found at index <span class="arithmatex">&#92;(i&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc4-e"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc4-f"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(-1&#92;)</span></span><span class="pc-c">// Element not found</span></span></div>
    <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. State a loop invariant for the while loop of <code>LinearSearch</code>.

    2. Verify the loop invariant on the array $a=[8,3,6,3,9]$ for $m=6$ and for $m=5$.

    3. Prove that <code>LinearSearch</code> is correct. Prove also that, when $m$ is in the array, the returned index is the <strong>smallest</strong> index $k$ such that $a[k]=m$.

    4. A student swaps lines [4](#riga-ex-09-correctness-exc4-c)–[5](#riga-ex-09-correctness-exc4-d) and line [7](#riga-ex-09-correctness-exc4-e), i.e., the body of the loop first increases $i$ and then checks whether $a[i]=m$. Find a counterexample showing that the new algorithm is wrong, and indicate which property of the loop invariant fails.

??? soluzione "Solution"

    1. Loop invariant:

        !!! chiave ""

            Every time the condition at line [3](#riga-ex-09-correctness-exc4-b) is evaluated, $1\le i\le n+1$ and $m$ is <strong>not</strong> in the sub-array $a[1..i-1]$:

            $$
            a[k]\neq m\qquad \text{for every } k\in\{1, 2, \dots, i-1\}.
            $$

    2. For $a=[8,3,6,3,9]$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(m&#92;)</span></th>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;1..i-1&#93;&#92;)</span></th>
        <th>action</th>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#91;&#92; &#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=8&#92;neq 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#91;8&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&#92;neq 6&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#91;8,3&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6=m&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> return <span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(&#91;&#92; &#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a&#91;1&#93;=8&#92;neq 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#91;8&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a&#91;2&#93;=3&#92;neq 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(&#91;8,3&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a&#91;3&#93;=6&#92;neq 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#91;8,3,6&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a&#91;4&#93;=3&#92;neq 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(&#91;8,3,6,3&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a&#91;5&#93;=9&#92;neq 5&#92;)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td><span class="arithmatex">&#92;(&#91;8,3,6,3,9&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(i&gt;n&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> return <span class="arithmatex">&#92;(-1&#92;)</span></td>
        </tr>
        </table></div>

        At every evaluation, $m$ does not appear in $a[1..i-1]$.

    3. Proof of correctness.

        - <strong>Initialization.</strong> Before the first iteration $i=1$ and $a[1..0]$ is empty, so it does not contain $m$.

        - <strong>Maintenance.</strong> Assume the invariant and $i\le n$. If $a[i]=m$, the algorithm returns $i$ (line [5](#riga-ex-09-correctness-exc4-d)), which is a correct output. Otherwise $a[i]\neq m$, so $m$ is not in $a[1..i]$; line [7](#riga-ex-09-correctness-exc4-e) sets $i\leftarrow i+1$ and the invariant holds with the new value of $i$.

        - <strong>Termination.</strong> $i$ increases by $1$ from $1$, so the loop executes at most $n$ iterations. The algorithm ends in one of two ways:

            - it returns $i$ with $a[i]=m$: correct. Moreover, by the invariant $a[k]\neq m$ for all $k<i$, so $i$ is the smallest index with $a[i]=m$;

            - the condition at line [3](#riga-ex-09-correctness-exc4-b) is false, i.e., $i=n+1$: by the invariant $m$ is not in $a[1..n]$, and the algorithm correctly returns $-1$.

            Hence the algorithm is correct.

    4. The new body is: $i\leftarrow i+1$; <strong>if</strong> $a[i]=m$ <strong>then return</strong> $i$. Consider $a=[6,3]$ and $m=6$. In the first iteration $i$ becomes $2$ and $a[2]=3\neq 6$; in the second iteration $i$ becomes $3$ and the algorithm accesses $a[3]$, which is outside the array; in any case $a[1]=6$ is <strong>never</strong> checked, so the algorithm cannot return $1$.

        The property that fails is the <strong>maintenance</strong>: if $m$ is not in $a[1..i-1]$ at the beginning of the iteration, after the body we only know that $m$ is not in $a[1..i-1]$ and that $a[i+1]\neq m$, but nothing is known about $a[i]$. With the new value $i+1$, the invariant would require $m$ not in $a[1..i]$, which is not guaranteed: in the example, before the second evaluation of the condition $i=2$ and $a[1]=6=m$.

<a id="esercizio-9-5"></a>

!!! esercizio "Exercise 9.5: Correctness (E5)"

    Consider the following two algorithms, which should compute $x^n$ for two natural numbers $x\ge 1$ and $n\ge 0$ (recall that $x^0=1$).

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> Power</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(x&#92;ge 1&#92;)</span> and <span class="arithmatex">&#92;(n&#92;ge 0&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><span class="arithmatex">&#92;(x^n&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Power(x, n)</span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(p := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(p &#92;leftarrow p &#92;cdot x&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(p&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> WrongPower</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(x&#92;ge 1&#92;)</span> and <span class="arithmatex">&#92;(n&#92;ge 0&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><span class="arithmatex">&#92;(x^n&#92;)</span> (?)</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> WrongPower(x, n)</span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5w-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(p := x&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5w-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5w-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5w-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(p &#92;leftarrow p &#92;cdot x&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5w-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-09-correctness-exc5w-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(p&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. State a loop invariant for the while loop of <code>Power</code> and verify it for $x=3$, $n=4$.

    2. Prove the correctness of <code>Power</code>, including the case $n=0$.

    3. Show that the same invariant is <strong>not</strong> a loop invariant of <code>WrongPower</code>: which of the three properties fails? Give a counterexample showing that <code>WrongPower</code> is wrong, with a trace for $x=2$, $n=3$.

    4. Find the correct loop invariant of <code>WrongPower</code> and use it to determine exactly what <code>WrongPower</code> computes. For which inputs is its output correct?

??? soluzione "Solution"

    1. Loop invariant of <code>Power</code>:

        !!! chiave ""

            Every time the condition at line [4](#riga-ex-09-correctness-exc5-c) is evaluated, $1\le i\le n+1$ and

            $$
            p=x^{\,i-1}.
            $$

        For $x=3$, $n=4$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(p&#92;)</span></th>
        <th><span class="arithmatex">&#92;(x^{i-1}&#92;)</span></th>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(3^0=1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(3^1=3&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>9</td>
        <td><span class="arithmatex">&#92;(3^2=9&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>27</td>
        <td><span class="arithmatex">&#92;(3^3=27&#92;)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>81</td>
        <td><span class="arithmatex">&#92;(3^4=81&#92;)</span>   (loop ends)</td>
        </tr>
        </table></div>

        The algorithm returns $81=3^4$.

    2. Proof of correctness of <code>Power</code>.

        - <strong>Initialization.</strong> Before the first iteration $p=1$ and $i=1$, so $p=x^0=x^{i-1}$; moreover $1\le i\le n+1$ since $n\ge 0$.

        - <strong>Maintenance.</strong> Assume $p=x^{i-1}$ and $i\le n$. Line [5](#riga-ex-09-correctness-exc5-d) gives $p\cdot x=x^{i-1}\cdot x=x^{i}$, and line [6](#riga-ex-09-correctness-exc5-e) sets $i\leftarrow i+1\le n+1$. With the new value of $i$, $p=x^{i-1}$.

        - <strong>Termination.</strong> $i$ increases by $1$ from $1\le n+1$, so the loop terminates after exactly $n$ iterations, when $i=n+1$. Substituting $i=n+1$: $p=x^{n}$, which is returned at line [8](#riga-ex-09-correctness-exc5-f).

        If $n=0$, the condition $1\le 0$ is false at the first evaluation, the loop is never executed and the algorithm returns $p=1=x^0$, in agreement with the proof (initialization and termination coincide, with $i=1=n+1$).

    3. For <code>WrongPower</code>, the <strong>initialization</strong> fails: before the first iteration $i=1$ and $p=x$, while $x^{i-1}=x^0=1$. Hence $p\neq x^{i-1}$ whenever $x\ge 2$. (Maintenance is still true: if $p=x^{i-1}$ held, the body would preserve it; but the “induction” has no valid base case.)

        Counterexample: $x=2$, $n=3$, for which $x^n=8$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(p&#92;)</span></th>
        <th><span class="arithmatex">&#92;(x^{i-1}&#92;)</span></th>
        <th><span class="arithmatex">&#92;(x^{i}&#92;)</span></th>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        </tr>
        <tr>
        <td>3</td>
        <td>8</td>
        <td>4</td>
        <td>8</td>
        </tr>
        <tr>
        <td>4</td>
        <td>16</td>
        <td>8</td>
        <td>16   (loop ends)</td>
        </tr>
        </table></div>

        <code>WrongPower</code> returns $16\neq 8=2^3$, so it is wrong.

    4. The table suggests the invariant $p=x^{\,i}$, which is a correct loop invariant of <code>WrongPower</code>:

        - <strong>Initialization:</strong> $p=x=x^1=x^i$ with $i=1$;

        - <strong>Maintenance:</strong> if $p=x^i$ and $i\le n$, after the body $p=x^{i+1}$ and $i$ is increased by $1$;

        - <strong>Termination:</strong> the loop ends with $i=n+1$, so $p=x^{n+1}$.

        Therefore <code>WrongPower</code> computes $x^{n+1}$. Its output is correct, i.e., $x^{n+1}=x^n$, if and only if $x^n(x-1)=0$, that is (since $x\ge 1$) if and only if $x=1$. For every $x\ge 2$ and every $n\ge 0$ it is wrong: one counterexample is enough to show that an algorithm is not correct.
