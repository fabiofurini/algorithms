---
title: "Exercises · Recursive versus iterative algorithms"
---

# Exercises · Recursive versus iterative algorithms

<div class="info-capitolo" markdown>

**Exercises · Chapter 18** · each solution opens with a click · [:material-book-open-variant: Chapter 18](../analysis-recursion/18-recursive-vs-iterative.md) · [:material-file-pdf-box: Exercises, volume 4 (PDF)](../pdf/exercises-4-analysis-recursion.pdf)

</div>

<a id="esercizio-18-1"></a>

!!! esercizio "Exercise 18.1: Recursive versus iterative algorithms (E1)"

    Consider the following two recursive algorithms.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> GCDRec</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(a&#92;)</span> and <span class="arithmatex">&#92;(b&#92;)</span>, not both equal to <span class="arithmatex">&#92;(0&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The greatest common divisor of <span class="arithmatex">&#92;(a&#92;)</span> and <span class="arithmatex">&#92;(b&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> GCDRec(a, b)</span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvione-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(b = 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvione-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(a&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvione-c"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;texttt{GCDRec}(b,~ a &#92;bmod b)&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> RecBinarySearch</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A sorted sub-array <span class="arithmatex">&#92;(a&#91;l..r&#93;&#92;)</span> and a target value <span class="arithmatex">&#92;(m&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>An index of <span class="arithmatex">&#92;(m&#92;)</span> in <span class="arithmatex">&#92;(a&#91;l..r&#93;&#92;)</span>, or <span class="arithmatex">&#92;(-1&#92;)</span> if <span class="arithmatex">&#92;(m&#92;)</span> is not present</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> RecBS(a, l, r, m)</span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvione-d"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(l &gt; r&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(-1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(mid := l + &#92;lfloor (r-l)/2 &#92;rfloor&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;mid&#93; = m&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(mid&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;mid&#93; &lt; m&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvione-e"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;texttt{RecBS}(a, mid+1, r, m)&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>else</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvione-f"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;texttt{RecBS}(a, l, mid-1, m)&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. Are <code>GCDRec</code> and <code>RecBS</code> tail recursive? Justify the answer.

    2. Transform <code>GCDRec</code> into an equivalent iterative algorithm <code>GCDIt</code>, applying the mechanical elimination of the tail recursion step by step. Then execute both algorithms with $(a,b)=(1071,462)$, listing the values of the parameters in each call and in each iteration.

    3. Transform <code>RecBS</code> into an equivalent iterative algorithm <code>ItBS</code>. Then execute both algorithms on the array $a=[2,5,8,12,16,23,38,56,72,91]$ (with $l=1$, $r=10$) for $m=23$ and for $m=4$.

    4. Compare the recursive and the iterative versions of the two algorithms in terms of time and space. In particular, determine the depth of the recursion of <code>GCDRec</code>$(89,55)$ and the maximum depth of the recursion of <code>RecBS</code> on an array of $n=10^6$ elements.

??? soluzione "Solution"

    1. Both algorithms are tail recursive.

        - In <code>GCDRec</code> the only recursive call is at line [5](#riga-ex-18-recursive-vs-iterative-exrvione-c): its result is returned as it is, without any further operation.

        - In <code>RecBS</code> the recursive calls are at lines [10](#riga-ex-18-recursive-vs-iterative-exrvione-e) and [12](#riga-ex-18-recursive-vs-iterative-exrvione-f): in both cases the result of the call is returned as it is.

        Hence, after each recursive call, nothing remains to be done in the calling function: its frame is not needed anymore, and the call can be replaced by an update of the parameters.

    2. We apply the three rules of the mechanical elimination of tail recursion.

        - The base-case condition is $b=0$ (line [2](#riga-ex-18-recursive-vs-iterative-exrvione-a)): the loop condition is $b\neq 0$.

        - The tail call $\texttt{GCDRec}(b,\, a\bmod b)$ becomes<br> the simultaneous assignment $(a,b)\leftarrow(b, a\bmod b)$. Since the new value of $b$ must be computed with the old value of $a$, we use a temporary variable $r$.

        - The return of the base case (<strong>return</strong> $a$, line [3](#riga-ex-18-recursive-vs-iterative-exrvione-b)) is moved after the loop.

        !!! algoritmo "Algorithm: GCDIt"

            <div class="pseudocodice" markdown="0">
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> GCDIt(a, b)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(b &#92;neq 0&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(r := a &#92;bmod b&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a &#92;leftarrow b&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(b &#92;leftarrow r&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(a&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        Execution with $(a,b)=(1071,462)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th colspan="4"><code>GCDRec</code></th>
        <th colspan="4"><code>GCDIt</code></th>
        </tr>
        <tr>
        <td>call</td>
        <td><span class="arithmatex">&#92;(a&#92;)</span></td>
        <td><span class="arithmatex">&#92;(b&#92;)</span></td>
        <td><span class="arithmatex">&#92;(a &#92;bmod b&#92;)</span></td>
        <td>iteration</td>
        <td><span class="arithmatex">&#92;(a&#92;)</span></td>
        <td><span class="arithmatex">&#92;(b&#92;)</span></td>
        <td><span class="arithmatex">&#92;(r&#92;)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1071</td>
        <td>462</td>
        <td>147</td>
        <td>1</td>
        <td>1071</td>
        <td>462</td>
        <td>147</td>
        </tr>
        <tr>
        <td>2</td>
        <td>462</td>
        <td>147</td>
        <td>21</td>
        <td>2</td>
        <td>462</td>
        <td>147</td>
        <td>21</td>
        </tr>
        <tr>
        <td>3</td>
        <td>147</td>
        <td>21</td>
        <td>0</td>
        <td>3</td>
        <td>147</td>
        <td>21</td>
        <td>0</td>
        </tr>
        <tr>
        <td>4</td>
        <td>21</td>
        <td>0</td>
        <td>–</td>
        <td>end</td>
        <td>21</td>
        <td>0</td>
        <td>–</td>
        </tr>
        </table></div>

        Both algorithms go through the same pairs $(1071,462)$, $(462,147)$, $(147,21)$, $(21,0)$ and return $21$. <code>GCDRec</code> executes $4$ calls (all active at the same time when the base case is reached); <code>GCDIt</code> executes $3$ iterations.

    3. The base-case condition $l>r$ becomes the loop condition $l\le r$; the second base case ($a[mid]=m$) stays inside the loop as a return; the tail call at line [10](#riga-ex-18-recursive-vs-iterative-exrvione-e) becomes $l\leftarrow mid+1$ and the tail call at line [12](#riga-ex-18-recursive-vs-iterative-exrvione-f) becomes $r\leftarrow mid-1$ (the parameters $a$ and $m$ do not change); the return of $-1$ is moved after the loop.

        !!! algoritmo "Algorithm: ItBinarySearch"

            <div class="pseudocodice" markdown="0">
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ItBS(a, l, r, m)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(l &#92;le r&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(mid := l + &#92;lfloor (r-l)/2 &#92;rfloor&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;mid&#93; = m&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(mid&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;mid&#93; &lt; m&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(l &#92;leftarrow mid+1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>else</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(r &#92;leftarrow mid-1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(-1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        The two algorithms go through the same values of $(l,r)$; for <code>RecBS</code> each row is a call, for <code>ItBS</code> each row is an iteration (the last row with $l>r$ is the final test of the loop).

        - $m=23$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th>call / iteration</th>
            <th><span class="arithmatex">&#92;(l&#92;)</span></th>
            <th><span class="arithmatex">&#92;(r&#92;)</span></th>
            <th><span class="arithmatex">&#92;(mid&#92;)</span></th>
            <th><span class="arithmatex">&#92;(a&#91;mid&#93;&#92;)</span></th>
            </tr>
            <tr>
            <td>1</td>
            <td>1</td>
            <td>10</td>
            <td>5</td>
            <td><span class="arithmatex">&#92;(16&lt;23&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <span class="arithmatex">&#92;(l=6&#92;)</span></td>
            </tr>
            <tr>
            <td>2</td>
            <td>6</td>
            <td>10</td>
            <td>8</td>
            <td><span class="arithmatex">&#92;(56&gt;23&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <span class="arithmatex">&#92;(r=7&#92;)</span></td>
            </tr>
            <tr>
            <td>3</td>
            <td>6</td>
            <td>7</td>
            <td>6</td>
            <td><span class="arithmatex">&#92;(23=m&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> return <span class="arithmatex">&#92;(6&#92;)</span></td>
            </tr>
            </table></div>

        - $m=4$:

            <div class="tabella" markdown="0"><table>
            <tr>
            <th>call / iteration</th>
            <th><span class="arithmatex">&#92;(l&#92;)</span></th>
            <th><span class="arithmatex">&#92;(r&#92;)</span></th>
            <th><span class="arithmatex">&#92;(mid&#92;)</span></th>
            <th><span class="arithmatex">&#92;(a&#91;mid&#93;&#92;)</span></th>
            </tr>
            <tr>
            <td>1</td>
            <td>1</td>
            <td>10</td>
            <td>5</td>
            <td><span class="arithmatex">&#92;(16&gt;4&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <span class="arithmatex">&#92;(r=4&#92;)</span></td>
            </tr>
            <tr>
            <td>2</td>
            <td>1</td>
            <td>4</td>
            <td>2</td>
            <td><span class="arithmatex">&#92;(5&gt;4&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <span class="arithmatex">&#92;(r=1&#92;)</span></td>
            </tr>
            <tr>
            <td>3</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td><span class="arithmatex">&#92;(2&lt;4&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <span class="arithmatex">&#92;(l=2&#92;)</span></td>
            </tr>
            <tr>
            <td>4</td>
            <td>2</td>
            <td>1</td>
            <td>–</td>
            <td><span class="arithmatex">&#92;(l&gt;r&#92;)</span> <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> return <span class="arithmatex">&#92;(-1&#92;)</span></td>
            </tr>
            </table></div>

        For $m=23$ <code>RecBS</code> executes $3$ calls and <code>ItBS</code> $3$ iterations; for $m=4$ <code>RecBS</code> executes $4$ calls and <code>ItBS</code> $3$ iterations plus the final test.

    4. <strong>Time.</strong> The iterative versions go through exactly the same values of the parameters as the recursive ones, with a constant number of steps for each call / iteration. Hence the number of steps has the same order of growth: $\Theta(\log\min(a,b))$ in the worst case for the GCD and $\Theta(\log_2 n)$ in the worst case for the binary search. The recursive versions only pay the (constant) overhead of the calls.

        <strong>Space.</strong> The iterative versions use $\Theta(1)$ extra memory (the parameters and the variables $r$ or $mid$). In the recursive versions all the calls stay active until the base case is reached, so the stack contains as many frames as the depth of the recursion.

        - <code>GCDRec</code>$(89,55)$ goes through the pairs

            $$
            (89,55),(55,34),(34,21),(21,13),(13,8),(8,5),(5,3),(3,2),(2,1),(1,0),
            $$

            so the depth of the recursion is $10$. Consecutive Fibonacci numbers are the worst case of Euclid's algorithm: the depth is $\Theta(\log\min(a,b))$.

        - For <code>RecBS</code> on $n$ elements the maximum depth is $\lfloor\log_2 n\rfloor+2$ (the sizes of the sub-arrays are at most $n,\lfloor n/2\rfloor,\dots,1$, plus the final call on the empty sub-array). For $n=10^6$: $\lfloor\log_2 10^6\rfloor+2=19+2=21$.

        !!! chiave ""

            For both algorithms, recursion gives <strong>no gain</strong> in time and a (small, logarithmic) <strong>loss</strong> in space. Since they are tail recursive, the recursion can be eliminated mechanically, obtaining loops with $\Theta(1)$ extra memory.

<a id="esercizio-18-2"></a>

!!! esercizio "Exercise 18.2: Recursive versus iterative algorithms (E2)"

    Consider the following recursive algorithms and input sizes.

    - **(a)** $\texttt{Fact}(n)$: returns $1$ if $n=0$, otherwise $n\cdot\texttt{Fact}(n-1)$; with $n=1000$.

    - **(b)** $\texttt{SumDecrease}(a,n)$: returns $0$ if $n=0$, otherwise $\texttt{SumDecrease}(a,n-1)+a[n]$; with $n=10^6$.

    - **(c)** $\texttt{SumHalving}(a,l,r)$: returns $a[l]$ if $l=r$, otherwise $\texttt{SumHalving}(a,l,mid)+\texttt{SumHalving}(a,mid+1,r)$ with $mid=\lfloor(l+r)/2\rfloor$; on an array of $n=10^6$ elements.

    - **(d)** Merge Sort on an array of $n=1000$ elements (base case: sub-arrays of one element).

    - **(e)** Tower of Hanoi with $n=20$ disks (base case: $0$ disks).

    - **(f)** $\texttt{FibRec}(n)$: returns $n$ if $n\le 1$, otherwise $\texttt{FibRec}(n-1)+\texttt{FibRec}(n-2)$; with $n=30$.

    - **(g)** Recursive fast power $x^n$ (base case: $n=0$; recursive call on $\lfloor n/2\rfloor$); with $n=10^9$.

    Assume that every stack frame occupies $48$ bytes and that the call stack has a size of $8$ MB $=8\cdot 2^{20}=8\,388\,608$ bytes.

    **Questions**

    1. Determine the depth of the recursion of each algorithm for the given input size.

    2. Determine the memory occupied by the call stack at its maximum, and say which executions cause a stack overflow.

    3. Determine the largest $n$ for which $\texttt{SumDecrease}(a,n)$ does not cause a stack overflow, and the depth of $\texttt{SumHalving}$ for the same $n$.

    4. For $\texttt{FibRec}(30)$, compare the depth of the recursion with the total number of calls. Is the problem of this algorithm the space or the time?

??? soluzione "Solution"

    1. The depth of the recursion is the maximum number of calls active at the same time, i.e., the number of calls on the longest path from the root to a leaf of the recursion tree.

        - **(a)** The active calls are $\texttt{Fact}(1000),\texttt{Fact}(999),\dots,\texttt{Fact}(0)$: depth $n+1=1001$.

        - **(b)** The active calls are $\texttt{SumDecrease}(a,10^6),\dots,\texttt{SumDecrease}(a,0)$: depth $n+1=1\,000\,001$.

        - **(c)** The largest sub-array at level $t$ of the tree has $\lceil n/2^t\rceil$ elements, which becomes $1$ for $t=\lceil\log_2 n\rceil$. Depth $\lceil\log_2 n\rceil+1$; since $2^{19}=524\,288<10^6\le 2^{20}=1\,048\,576$, we have $\lceil\log_2 10^6\rceil=20$ and the depth is $21$.

        - **(d)** As in (c): $\lceil\log_2 1000\rceil+1=10+1=11$ (since $2^9=512<1000\le 2^{10}=1024$).

        - **(e)** The active calls are $\texttt{Hanoi}(20),\texttt{Hanoi}(19),\dots,\texttt{Hanoi}(0)$: depth $n+1=21$.

        - **(f)** The longest path is $\texttt{FibRec}(30),\texttt{FibRec}(29),\dots,\texttt{FibRec}(1)$: depth $n=30$.

        - **(g)** The exponent goes through the values $n,\lfloor n/2\rfloor,\dots,1,0$, i.e., the depth is $\lfloor\log_2 n\rfloor+2$. Since $2^{29}=536\,870\,912\le 10^9<2^{30}$, we have $\lfloor\log_2 10^9\rfloor=29$ and the depth is $31$.

    2. The memory of the stack at its maximum is $48$ bytes times the depth:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th>algorithm</th>
        <th>depth</th>
        <th>stack (bytes)</th>
        <th>overflow?</th>
        </tr>
        <tr>
        <td>(a)</td>
        <td><code>Fact</code><span class="arithmatex">&#92;((1000)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;,001&#92;)</span></td>
        <td><span class="arithmatex">&#92;(48&#92;,048&#92;)</span></td>
        <td>no</td>
        </tr>
        <tr>
        <td>(b)</td>
        <td><code>SumDecrease</code>, <span class="arithmatex">&#92;(n=10^6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;,000&#92;,001&#92;)</span></td>
        <td><span class="arithmatex">&#92;(48&#92;,000&#92;,048&#92;)</span></td>
        <td><span style="color:#e03131">yes</span></td>
        </tr>
        <tr>
        <td>(c)</td>
        <td><code>SumHalving</code>, <span class="arithmatex">&#92;(n=10^6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(21&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;,008&#92;)</span></td>
        <td>no</td>
        </tr>
        <tr>
        <td>(d)</td>
        <td>Merge Sort, <span class="arithmatex">&#92;(n=1000&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11&#92;)</span></td>
        <td><span class="arithmatex">&#92;(528&#92;)</span></td>
        <td>no</td>
        </tr>
        <tr>
        <td>(e)</td>
        <td>Hanoi, <span class="arithmatex">&#92;(n=20&#92;)</span></td>
        <td><span class="arithmatex">&#92;(21&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;,008&#92;)</span></td>
        <td>no</td>
        </tr>
        <tr>
        <td>(f)</td>
        <td><code>FibRec</code><span class="arithmatex">&#92;((30)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(30&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;,440&#92;)</span></td>
        <td>no</td>
        </tr>
        <tr>
        <td>(g)</td>
        <td>fast power, <span class="arithmatex">&#92;(n=10^9&#92;)</span></td>
        <td><span class="arithmatex">&#92;(31&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;,488&#92;)</span></td>
        <td>no</td>
        </tr>
        </table></div>

        Only (b) causes a stack overflow: $48\,000\,048>8\,388\,608$ bytes (about $46$ MB against $8$ MB).

    3. The stack contains at most $\lfloor 8\,388\,608/48\rfloor=174\,762$ frames. $\texttt{SumDecrease}(a,n)$ needs $n+1$ frames, so it does not overflow if and only if

        $$
        n+1\le 174\,762 \quad\Longleftrightarrow\quad n\le 174\,761.
        $$

        For $n=174\,761$, since $2^{17}=131\,072<n\le 2^{18}=262\,144$, $\texttt{SumHalving}$ has depth $\lceil\log_2 n\rceil+1=18+1=19$, i.e., $912$ bytes of stack. Both algorithms execute $\Theta(n)$ steps: the halving version uses an exponentially smaller stack.

    4. $\texttt{FibRec}(30)$ has depth $30$ (only $1\,440$ bytes of stack), but it executes

        $$
        2F(31)-1=2\cdot 1\,346\,269-1=2\,692\,537
        $$

        calls. The problem of <code>FibRec</code> is the <strong>time</strong>, $\Theta(\varphi^n)$, not the space, $\Theta(n)$: the depth of the recursion and the number of calls are two very different quantities.

        !!! chiave ""

            A depth of the recursion $\Theta(\log_2 n)$ is never a problem in practice; a depth $\Theta(n)$ (decrease by one) causes a stack overflow already for $n$ of the order of $10^5$–$10^6$, while the corresponding loop uses $\Theta(1)$ memory.

<a id="esercizio-18-3"></a>

!!! esercizio "Exercise 18.3: Recursive versus iterative algorithms (E3)"

    Consider the following four recursive algorithms.

    <div class="minipage" style="width:48%" markdown>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> A: MaxDecrease</div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> MaxDec(a, n)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n = 1&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(a&#91;1&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;max(&#92;texttt{MaxDec}(a, n-1),~ a&#91;n&#93;)&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:48%" markdown>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> B: MaxHalving</div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> MaxHalf(a, l, r)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(l = r&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(a&#91;l&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(mid := &#92;lfloor (l+r)/2 &#92;rfloor&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;max(&#92;texttt{MaxHalf}(a,l,mid),&#92;)</span><br> <span class="arithmatex">&#92;(&#92;texttt{MaxHalf}(a,mid+1,r))&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:48%" markdown>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> C: PowerDecrease</div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> PowDec(x, n)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n = 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(x&#92;cdot &#92;texttt{PowDec}(x, n-1)&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:48%" markdown>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> D: Tribonacci</div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Trib(n)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &#92;le 2&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;lfloor n/2 &#92;rfloor&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;texttt{Trib}(n-1)+&#92;texttt{Trib}(n-2)&#92;)</span><br> <span class="arithmatex">&#92;(+&#92;,&#92;texttt{Trib}(n-3)&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <code>MaxDec</code> and <code>MaxHalf</code> compute the maximum of an array $a[1..n]$ (<code>MaxHalf</code> is called as $\texttt{MaxHalf}(a,1,n)$); <code>PowDec</code> computes $x^n$; <code>Trib</code> computes the Tribonacci numbers $T(0)=0$, $T(1)=0$, $T(2)=1$, $T(n)=T(n-1)+T(n-2)+T(n-3)$.

    **Questions**

    For each of the four algorithms:

    1. write the recurrence of the number of steps $S(n)$ and determine its order of growth;

    2. determine the depth of the recursion and the extra memory used;

    3. indicate the best iterative algorithm seen in the course for the same problem, with its time and space;

    4. decide whether recursion gains, is equivalent, or loses, justifying the answer.

??? soluzione "Solution"

    ### A: MaxDecrease

    1. Each call executes a constant number $c$ of steps besides the recursive call on $n-1$ elements:

        $$
        S(n)=S(n-1)+c,\qquad S(1)=d.
        $$

        Unrolling, $S(n)=d+c\,(n-1)=\Theta(n)$.

    2. The calls $\texttt{MaxDec}(a,n),\dots,\texttt{MaxDec}(a,1)$ are all active at the same time: depth $n$, extra memory $\Theta(n)$. The algorithm is not tail recursive (the maximum is computed after the call returns).

    3. <code>FindMaximum</code> (chapter «Running time»): a loop with $S(n)=4n-1=\Theta(n)$ steps and $\Theta(1)$ extra memory.

    4. <span style="color:#1971c2"><strong>SAME</strong></span> time, <span style="color:#e03131"><strong>LOSS</strong></span> in space: the decrease-by-one recursion is a loop in disguise, with a call overhead and a risk of stack overflow for large $n$.

    ### B: MaxHalving

    1. Two recursive calls on halves, plus a constant number of steps:

        $$
        S(n)=2S(n/2)+\Theta(1).
        $$

        Master Theorem: $a=2$, $b=2$, $f(n)=\Theta(1)$; $n^{\log_b a}=n^{\log_2 2}=n$. Since $f(n)=\Theta(1)=O(n^{1-\varepsilon})$ with $\varepsilon=1$, case 1 gives $S(n)=\Theta(n)$.

    2. Depth $\lceil\log_2 n\rceil+1$, extra memory $\Theta(\log_2 n)$.

    3. Again <code>FindMaximum</code>: $\Theta(n)$ time, $\Theta(1)$ space.

    4. <span style="color:#1971c2"><strong>SAME</strong></span> time, small <span style="color:#e03131"><strong>LOSS</strong></span> in space ($\Theta(\log_2 n)$). Divide and conquer does not help here: the recursion tree has $2n-1$ nodes, each with constant work, so the total work is still $\Theta(n)$. No algorithm can do better, because every element must be examined at least once. Divide and conquer gives a gain only when it reduces the total work, as in Merge Sort, where the combination of the halves costs $\Theta(n)$ instead of the $\Theta(n^2)$ of the iterative algorithms.

    ### C: PowerDecrease

    1. $S(n)=S(n-1)+c$, $S(0)=d$ $\Rightarrow$ $S(n)=c\,n+d=\Theta(n)$.

    2. Depth $n+1$ (calls with exponent $n,n-1,\dots,0$), extra memory $\Theta(n)$.

    3. The loop with $n$ multiplications has $\Theta(n)$ time and $\Theta(1)$ space; the iterative square-and-multiply algorithm <code>PowerIt</code> has $\Theta(\log_2 n)$ time and $\Theta(1)$ space.

    4. <span style="color:#e03131"><strong>LOSS</strong></span>: same time as the simple loop and $\Theta(n)$ memory; compared with the square-and-multiply loop it is even exponentially slower in terms of $\log_2 n$. Recursion is convenient for the power only when it <strong>halves</strong> the exponent (fast power): $S(n)=S(n/2)+\Theta(1)=\Theta(\log_2 n)$.

    ### D: Tribonacci

    1. Let $C(n)$ be the number of calls; then $C(0)=C(1)=C(2)=1$ and

        $$
        C(n)=1+C(n-1)+C(n-2)+C(n-3),\qquad n\ge 3,
        $$

        and $S(n)=\Theta(C(n))$, since each call executes a constant number of steps. The function $C$ is non-decreasing, so for $n\ge 3$

        $$
        C(n)\ge 3\,C(n-3)\ge 3^2C(n-6)\ge\cdots\ge 3^{\lfloor n/3\rfloor}.
        $$

        Hence $S(n)=\Omega(3^{n/3})=\Omega(1.442^n)$: the algorithm is exponential. (For example $C(10)=289$, $C(20)=128\,287$, $C(25)=2\,700\,421$.) In the same way, $C(n)\le 3C(n-1)+1$ gives $S(n)=O(3^n)$.

    2. The longest path in the recursion tree is $\texttt{Trib}(n),\texttt{Trib}(n-1),\dots,\texttt{Trib}(2)$: depth $n-1$, extra memory $\Theta(n)$.

    3. A loop that computes $T(3),T(4),\dots,T(n)$ keeping only the last three values in three variables: $\Theta(n)$ time and $\Theta(1)$ space.

    4. Huge <span style="color:#e03131"><strong>LOSS</strong></span>: the subproblems <strong>overlap</strong> (for example $\texttt{Trib}(n-1)$ and $\texttt{Trib}(n-2)$ both call $\texttt{Trib}(n-3)$), so the same values are recomputed an exponential number of times. Memoization or the bottom-up loop (Dynamic Programming) bring the time back to $\Theta(n)$.

    !!! chiave ""

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th colspan="2">recursive</th>
        <th>best iterative</th>
        <th>verdict</th>
        </tr>
        <tr>
        <td></td>
        <td>time</td>
        <td>space</td>
        <td>time, space</td>
        <td></td>
        </tr>
        <tr>
        <td>A</td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span>, <span class="arithmatex">&#92;(&#92;Theta(1)&#92;)</span></td>
        <td>same time, loss in space</td>
        </tr>
        <tr>
        <td>B</td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;Theta(&#92;log&#95;2 n)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span>, <span class="arithmatex">&#92;(&#92;Theta(1)&#92;)</span></td>
        <td>same time, small loss</td>
        </tr>
        <tr>
        <td>C</td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;Theta(&#92;log&#95;2 n)&#92;)</span>, <span class="arithmatex">&#92;(&#92;Theta(1)&#92;)</span></td>
        <td>loss</td>
        </tr>
        <tr>
        <td>D</td>
        <td>exponential</td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span>, <span class="arithmatex">&#92;(&#92;Theta(1)&#92;)</span></td>
        <td>huge loss</td>
        </tr>
        </table></div>

<a id="esercizio-18-4"></a>

!!! esercizio "Exercise 18.4: Recursive versus iterative algorithms (E4)"

    The binomial coefficients satisfy, for $0<k<n$, the recurrence (Pascal's rule)

    $$
    \binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k},\qquad \binom{n}{0}=\binom{n}{n}=1.
    $$

    Consider the following recursive algorithm.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> BinomRec</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(n&#92;)</span> and <span class="arithmatex">&#92;(k&#92;)</span> with <span class="arithmatex">&#92;(0&#92;le k&#92;le n&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The binomial coefficient <span class="arithmatex">&#92;(&#92;binom{n}{k}&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> BinomRec(n, k)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(k = 0&#92;)</span> <strong>or</strong> <span class="arithmatex">&#92;(k = n&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;texttt{BinomRec}(n-1, k-1) + &#92;texttt{BinomRec}(n-1, k)&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. Draw the recursion tree of $\texttt{BinomRec}(4,2)$, count the calls and indicate the subproblems that are solved more than once.

    2. Prove that the number of calls executed by $\texttt{BinomRec}(n,k)$ is $N(n,k)=2\binom{n}{k}-1$.

    3. Compute $N(10,5)$, $N(30,15)$ and $N(40,20)$, and estimate the time needed by $\texttt{BinomRec}(40,20)$ on a computer that executes $10^9$ calls per second.

    4. Write a memoized version <code>BinomMemo</code> and prove that, for $0<k<n$, it executes exactly $2k(n-k)+1$ calls. Compute this number for the three cases of question 3.

    5. Write an iterative algorithm that computes $\binom{n}{k}$ row by row (Pascal's triangle), and give its time and space.

??? soluzione "Solution"

    1. Each node is a call, labelled with $(n,k)$; the leaves are base cases ($k=0$ or $k=n$) and return $1$.

        ![Figure 1](../img/ex-18-recursive-vs-iterative/fig01.svg){ .fig loading=lazy  }

        The tree has $11$ nodes, i.e., $11$ calls, and $6=\binom{4}{2}$ leaves. The subproblem $(2,1)$ is solved <span style="color:#e03131">twice</span> (and so are its sub-calls $(1,0)$ and $(1,1)$).

    2. Every call is either a leaf (base case, returns $1$) or an internal node with exactly two children. The value returned by a call is the sum of the values returned by the leaves of its sub-tree, i.e., the number of its leaves. Hence the tree of $\texttt{BinomRec}(n,k)$ has $\binom{n}{k}$ leaves.

        In a tree in which every internal node has exactly two children, the number of internal nodes is the number of leaves minus one (by induction: a single leaf has $0$ internal nodes; joining two such trees with $L_1$ and $L_2$ leaves under a new root gives $(L_1-1)+(L_2-1)+1=(L_1+L_2)-1$ internal nodes). Therefore

        $$
        N(n,k)=\binom{n}{k}+\left(\binom{n}{k}-1\right)=2\binom{n}{k}-1.
        $$

        For example $N(4,2)=2\cdot 6-1=11$, as in question 1.

    3.

        $$
        N(10,5)=2\cdot 252-1=503,\qquad N(30,15)=2\cdot 155\,117\,520-1=310\,235\,039,
        $$

        $$
        N(40,20)=2\cdot 137\,846\,528\,820-1=275\,693\,057\,639.
        $$

        At $10^9$ calls per second, $\texttt{BinomRec}(40,20)$ needs about $275.7$ seconds, i.e., more than $4.5$ minutes, to compute a number that can be obtained with a few hundred additions (see questions 4 and 5). Since $\binom{2m}{m}\ge \frac{4^m}{2m+1}$, the number of calls grows exponentially.

    4. We store the values already computed in a table $memo$, indexed by the pair $(i,j)$:

        !!! algoritmo "Algorithm: BinomMemo"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>Natural numbers <span class="arithmatex">&#92;(0&#92;le k&#92;le n&#92;)</span> and a table <span class="arithmatex">&#92;(memo&#92;)</span> whose entries are all <em>undefined</em></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The binomial coefficient <span class="arithmatex">&#92;(&#92;binom{n}{k}&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> BinomMemo(n, k, memo)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(k = 0&#92;)</span> <strong>or</strong> <span class="arithmatex">&#92;(k = n&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(memo&#91;n&#93;&#91;k&#93;&#92;)</span> is <em>undefined</em> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(memo&#91;n&#93;&#91;k&#93; &#92;leftarrow &#92;texttt{BinomMemo}(n-1,k-1,memo)+&#92;texttt{BinomMemo}(n-1,k,memo)&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(memo&#91;n&#93;&#91;k&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        <em>Number of calls.</em> Starting from $(n,k)$, a call reaches the pairs $(n-s,\,k-t)$, where $s$ is the number of steps down and $t\le s$ is the number of these steps in which $k$ decreases. Let $u=s-t$ be the number of steps in which $k$ does not decrease. A pair is <strong>internal</strong> (not a base case) if $k-t\ge 1$ and $(n-s)-(k-t)\ge 1$, i.e.,

        $$
        0\le t\le k-1 \qquad\text{and}\qquad 0\le u\le n-k-1,
        $$

        so there are exactly $k(n-k)$ internal subproblems, and all of them are reached. The body of each internal subproblem (the two recursive calls) is executed only the <strong>first</strong> time it is called; the following times the value is read from $memo$. Every call, except the first one, is made by the body of an internal subproblem, which makes exactly $2$ calls. Therefore the number of calls is

        $$
        1+2k(n-k).
        $$

        For the three cases:

        $$
        (10,5):~1+2\cdot 25=51,\qquad (30,15):~1+2\cdot 225=451,\qquad (40,20):~1+2\cdot 400=801,
        $$

        against $503$, $310\,235\,039$ and $275\,693\,057\,639$ calls of <code>BinomRec</code>. The time is $\Theta(k(n-k))$ and the memory is $\Theta(k(n-k))$ for the table plus $\Theta(n)$ for the stack (depth $\le n$).

    5. Row $i$ of Pascal's triangle is computed from row $i-1$. Keeping a single array $c[0..k]$ and updating it from right to left (so that $c[j-1]$ still contains the value of the previous row when $c[j]$ is updated):

        !!! algoritmo "Algorithm: BinomIt"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two natural numbers <span class="arithmatex">&#92;(n&#92;)</span> and <span class="arithmatex">&#92;(k&#92;)</span> with <span class="arithmatex">&#92;(0&#92;le k&#92;le n&#92;)</span></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The binomial coefficient <span class="arithmatex">&#92;(&#92;binom{n}{k}&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> BinomIt(n, k)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c&#91;0&#93; := 1&#92;)</span>; <span class="arithmatex">&#92;(c&#91;1..k&#93; := 0&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := &#92;min(i,k)&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;ge 1&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c&#91;j&#93; &#92;leftarrow c&#91;j&#93; + c&#91;j-1&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j &#92;leftarrow j-1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(c&#91;k&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        After the $i$-th iteration of the outer loop, $c[j]=\binom{i}{j}$ for $0\le j\le \min(i,k)$. The inner loop is executed at most $k$ times for each of the $n$ rows: time $O(n\,k)$ (and $\Theta(nk)$ when $k\le n/2$), extra memory $\Theta(k)$, no recursion. For $(40,20)$ the algorithm executes $\sum_{i=1}^{40}\min(i,20)=210+400=610$ additions.

        !!! chiave ""

            The naive recursion is exponential because the subproblems overlap; memoization (top-down) and the iterative Pascal's triangle (bottom-up) solve each subproblem once, with a polynomial number of steps. This is the idea of Dynamic Programming.

<a id="esercizio-18-5"></a>

!!! esercizio "Exercise 18.5: Recursive versus iterative algorithms (E5)"

    Consider the two following algorithms for the Fibonacci numbers ($F(0)=0$, $F(1)=1$, $F(n)=F(n-1)+F(n-2)$).

    <div class="minipage" style="width:44%" markdown>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> FibRec</div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FibRec(n)</span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &#92;le 1&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(n&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-c"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;texttt{FibRec}(n-1)&#92;)</span><br><span class="arithmatex">&#92;(+&#92;,&#92;texttt{FibRec}(n-2)&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:49%" markdown>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> FibIt</div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FibIt(n)</span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-d"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &#92;le 1&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(n&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-e"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(prev := 0&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-f"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(curr := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-g"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 2&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-h"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-i"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(next := prev + curr&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-j"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(prev &#92;leftarrow curr&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-k"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(curr &#92;leftarrow next&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-l"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-18-recursive-vs-iterative-exrvifive-m"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(curr&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    Assume that every line executed counts as one step (line [5](#riga-ex-18-recursive-vs-iterative-exrvifive-c) counts as one step, besides the steps of the two sub-calls) and that the computer executes $10^9$ steps per second.

    **Questions**

    1. Determine the exact number of steps $S_{it}(n)$ executed by <code>FibIt</code> for $n\ge 2$.

    2. Determine the exact number of steps $S_{rec}(n)$ executed by <code>FibRec</code>, using the fact that <code>FibRec</code>$(n)$ executes $2F(n+1)-1$ calls.

    3. Estimate the running times of the two algorithms for $n=50$, knowing that

        $$
        F(51)=20\,365\,011\,074.
        $$

    4. Estimate the running time of <code>FibRec</code> for $n=60$ and $n=100$, knowing that

        $$
        F(61)=2\,504\,730\,781\,961 \qquad\text{and}\qquad F(101)\approx 5.73\cdot 10^{20}.
        $$

    5. Determine the largest $n$ for which <code>FibRec</code> terminates within one hour, knowing that

        $$
        F(58)=591\,286\,729\,879\qquad\text{and}\qquad F(59)=956\,722\,026\,041.
        $$

??? soluzione "Solution"

    1. For $n\ge 2$ the number of times each line of <code>FibIt</code> is executed is:

        - <span style="color:#e03131">Line</span> [2](#riga-ex-18-recursive-vs-iterative-exrvifive-d) is executed $1$ time (the return in the next line is not executed)

        - <span style="color:#e03131">Lines</span> [5](#riga-ex-18-recursive-vs-iterative-exrvifive-e), [6](#riga-ex-18-recursive-vs-iterative-exrvifive-f), [7](#riga-ex-18-recursive-vs-iterative-exrvifive-g) are executed $1$ time each

        - <span style="color:#e03131">Line</span> [8](#riga-ex-18-recursive-vs-iterative-exrvifive-h) is executed $n$ times ($i=2,3,\dots,n+1$)

        - <span style="color:#e03131">Lines</span> [9](#riga-ex-18-recursive-vs-iterative-exrvifive-i), [10](#riga-ex-18-recursive-vs-iterative-exrvifive-j), [11](#riga-ex-18-recursive-vs-iterative-exrvifive-k), [12](#riga-ex-18-recursive-vs-iterative-exrvifive-l) are executed $n-1$ times each

        - <span style="color:#e03131">Line</span> [14](#riga-ex-18-recursive-vs-iterative-exrvifive-m) is executed $1$ time

        Therefore

        $$
        S_{it}(n)=1+3+n+4(n-1)+1=5n+1=\Theta(n).
        $$

    2. Every call of <code>FibRec</code> executes exactly $2$ steps of its own: line [2](#riga-ex-18-recursive-vs-iterative-exrvifive-a) and then either line [3](#riga-ex-18-recursive-vs-iterative-exrvifive-b) (base case) or line [5](#riga-ex-18-recursive-vs-iterative-exrvifive-c). Since $\texttt{FibRec}(n)$ executes $2F(n+1)-1$ calls,

        $$
        S_{rec}(n)=2\big(2F(n+1)-1\big)=4F(n+1)-2=\Theta(\varphi^n).
        $$

    3. For $n=50$:

        $$
        S_{it}(50)=5\cdot 50+1=251 \text{ steps}\quad\Longrightarrow\quad \frac{251}{10^9}\text{ s}=251\text{ ns},
        $$

        $$
        S_{rec}(50)=4\cdot 20\,365\,011\,074-2=81\,460\,044\,294 \text{ steps}\quad\Longrightarrow\quad \approx 81.5 \text{ s}.
        $$

        The recursive algorithm is about $3\cdot 10^8$ times slower.

    4. For $n=60$:

        $$
        S_{rec}(60)=4\cdot 2\,504\,730\,781\,961-2=10\,018\,923\,127\,842\text{ steps}\quad\Longrightarrow\quad\approx 10\,019\text{ s}\approx 2.8\text{ hours}.
        $$

        For $n=100$:

        $$
        S_{rec}(100)\approx 4\cdot 5.73\cdot 10^{20}\approx 2.29\cdot 10^{21}\text{ steps}\quad\Longrightarrow\quad\approx 2.29\cdot 10^{12}\text{ s}.
        $$

        Since one year has about $3.156\cdot 10^7$ seconds, this is about $7.3\cdot 10^4$ years. Meanwhile, <code>FibIt</code>$(100)$ executes $501$ steps, i.e., about half a microsecond.

    5. One hour corresponds to $3600\cdot 10^9=3.6\cdot 10^{12}$ steps. We need

        $$
        4F(n+1)-2\le 3.6\cdot 10^{12}\quad\Longleftrightarrow\quad F(n+1)\le 9\cdot 10^{11}+0.5.
        $$

        Since $F(58)=591\,286\,729\,879\le 9\cdot 10^{11}<F(59)=956\,722\,026\,041$, the condition holds for $n+1\le 58$. The largest $n$ is $n=57$, with

        $$
        S_{rec}(57)=4\cdot 591\,286\,729\,879-2=2\,365\,146\,919\,514\text{ steps}\approx 39\text{ minutes},
        $$

        while $n=58$ already needs $4F(59)-2\approx 3.83\cdot 10^{12}$ steps, i.e., about $64$ minutes. Every time $n$ increases by $1$, the time of <code>FibRec</code> is multiplied by about $\varphi\approx 1.618$: a computer $10$ times faster would only allow to increase $n$ by $\log_\varphi 10\approx 4.8$.

        !!! chiave ""

            With an exponential algorithm, faster computers do not help: the size of the problems that can be solved grows only by an additive constant. The iterative algorithm, with $5n+1$ steps, computes $F(57)$ in less than $0.3$ microseconds.
