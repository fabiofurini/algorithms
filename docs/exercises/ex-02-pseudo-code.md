---
title: "Exercises · Pseudo-code"
---

# Exercises · Pseudo-code

<div class="info-capitolo" markdown>

**Exercises · Chapter 2** · each solution opens with a click · [:material-book-open-variant: Chapter 2](../foundations/02-pseudo-code.md) · [:material-file-pdf-box: Exercises, volume 1 (PDF)](../pdf/exercises-1-foundations.pdf)

</div>

<a id="esercizio-2-1"></a>

!!! esercizio "Exercise 2.1: Pseudo-code (E1)"

    Given an array $a[1..n]$ of $n \ge 1$ integer numbers, consider the problem of determining the minimum value in the array.

    **Questions**

    1. Write the pseudo-code of an algorithm that finds the minimum value in an array $a$ of $n$ integer numbers. The algorithm should:

        - take as input an array $a[1..n]$ of $n \ge 1$ integer numbers;

        - return the minimum value $min$ in the array;

        - use a single pass through the array.

    2. Execute the algorithm step by step on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$;

        - Instance 2: $a = [15, 7, 22, 4]$ with $n=4$;

        - Instance 3: $a = [100]$ with $n=1$.

        For each instance, show the initial state of the variables, their state after each iteration, and the final result.

    3. Write the pseudo-code of an algorithm that finds both the maximum and the minimum values in a single pass through the array.

??? soluzione "Solution"

    1. Pseudo-code for finding the minimum value in an array:

        !!! algoritmo "Algorithm: FindMinimum"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The minimum value in the array <span class="arithmatex">&#92;(a&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FindMinimum(a, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(min := a&#91;1&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 2&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &lt; min&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(min &#92;leftarrow a&#91;i&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(min&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        - We initialize $min$ to $a[1]$, the first element (it exists, since $n \ge 1$).

        - We iterate through each remaining element of the array, comparing it with the current minimum.

        - If the current element is smaller, we update the minimum.

        - Finally, we return the minimum value found.

    2. Step-by-step execution on the instances.

        <strong>Instance 1:</strong> $a = [9, 12, 3, 16, 19, 11, 12]$, $n=7$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93; &lt; min&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(min&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(16&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(19&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $min = 3$

        <strong>Instance 2:</strong> $a = [15, 7, 22, 4]$, $n=4$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93; &lt; min&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(min&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(15&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(22&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $min = 4$

        <strong>Instance 3:</strong> $a = [100]$, $n=1$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93; &lt; min&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(min&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(100&#92;)</span></td>
        </tr>
        <tr>
        <td colspan="4">no iterations: the loop starts at <span class="arithmatex">&#92;(i = 2 &gt; n = 1&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $min = 100$

    3. Pseudo-code to find both the maximum and the minimum in a single pass:

        !!! algoritmo "Algorithm: FindMaxMin"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The pair <span class="arithmatex">&#92;((max, min)&#92;)</span>, where <span class="arithmatex">&#92;(max&#92;)</span> is the maximum and <span class="arithmatex">&#92;(min&#92;)</span> is the minimum of <span class="arithmatex">&#92;(a&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FindMaxMin(a, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(max := a&#91;1&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(min := a&#91;1&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 2&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; max&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(max &#92;leftarrow a&#91;i&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &lt; min&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(min &#92;leftarrow a&#91;i&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(max&#92;)</span>, <span class="arithmatex">&#92;(min&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        For example, on Instance 1 ($a = [9, 12, 3, 16, 19, 11, 12]$) the algorithm returns $(19, 3)$.

<a id="esercizio-2-2"></a>

!!! esercizio "Exercise 2.2: Pseudo-code (E2)"

    Given an array $a[1..n]$ of $n \ge 1$ integer numbers, consider the problem of computing the sum of its values.

    **Questions**

    1. Write the pseudo-code of an algorithm that computes the sum of all the elements of an array $a$ of $n$ integer numbers. The algorithm should:

        - take as input an array $a[1..n]$ of $n \ge 1$ integer numbers;

        - return the sum $sum$ of all the elements;

        - initialize a variable $sum$ to $0$ and add each element to it.

    2. Execute the algorithm step by step on the following instances:

        - Instance 1: $a = [5, 12, 3, 8]$ with $n=4$;

        - Instance 2: $a = [10, 20, 30]$ with $n=3$;

        - Instance 3: $a = [7]$ with $n=1$.

        For each instance, show the initial value of the sum, its value after adding each element, and the final result.

    3. Modify the pseudo-code to compute both the sum and the average $avg = \frac{sum}{n}$ of the elements, with a single pass through the array.

??? soluzione "Solution"

    1. Pseudo-code for computing the sum of all the elements of an array:

        !!! algoritmo "Algorithm: ArraySum"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The sum of all the elements of the array <span class="arithmatex">&#92;(a&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ArraySum(a, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum &#92;leftarrow sum + a&#91;i&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(sum&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        - We initialize $sum$ to $0$.

        - We iterate through each element of the array, adding it to the running $sum$.

        - Finally, we return the total $sum$.

    2. Step-by-step execution on the instances.

        <strong>Instance 1:</strong> $a = [5, 12, 3, 8]$, $n=4$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(sum&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12&#92;)</span></td>
        <td><span class="arithmatex">&#92;(17&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(20&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(28&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $sum = 28$

        <strong>Instance 2:</strong> $a = [10, 20, 30]$, $n=3$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(sum&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(20&#92;)</span></td>
        <td><span class="arithmatex">&#92;(30&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(30&#92;)</span></td>
        <td><span class="arithmatex">&#92;(60&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $sum = 60$

        <strong>Instance 3:</strong> $a = [7]$, $n=1$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(sum&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $sum = 7$

    3. Pseudo-code to compute both the sum and the average:

        !!! algoritmo "Algorithm: ArraySumAndAverage"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The pair <span class="arithmatex">&#92;((sum, avg)&#92;)</span>, where <span class="arithmatex">&#92;(sum&#92;)</span> is the total and <span class="arithmatex">&#92;(avg&#92;)</span> is the average of the elements</span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ArraySumAndAverage(a, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum &#92;leftarrow sum + a&#91;i&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(avg := sum / n&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(sum&#92;)</span>, <span class="arithmatex">&#92;(avg&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        The precondition $n \ge 1$ guarantees that the division $sum / n$ is defined. For example, on Instance 1 ($a = [5, 12, 3, 8]$, $n=4$) the algorithm returns $(28, 7)$, since the sum is $28$ and the average is $28/4 = 7$.

<a id="esercizio-2-3"></a>

!!! esercizio "Exercise 2.3: Pseudo-code (E3)"

    Given a two-dimensional array $b[1..m][1..n]$ of $m \times n$ integer numbers and a threshold value $k$, consider the problem of counting the number of its values strictly greater than $k$.

    **Questions**

    1. Write the pseudo-code of an algorithm that counts how many elements of $b$ are strictly greater than the threshold $k$. The algorithm should:

        - take as input a two-dimensional array $b[1..m][1..n]$, the dimensions $m$ and $n$, and the threshold $k$;

        - return the number of elements satisfying $b[i][j] > k$;

        - scan all the entries of the array with two nested loops.

    2. Execute the algorithm step by step on the following instances, showing the value of $count$ after each update:

        - Instance 1: $b = \begin{bmatrix} 3 & 7 & 1 \\ 5 & 2 & 8 \end{bmatrix}$, $m=2$, $n=3$, $k=4$;

        - Instance 2: $b = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}$, $m=3$, $n=3$, $k=5$.

    3. Modify the pseudo-code so that, in addition to the count, the algorithm also returns an array of pairs $(i, j)$ listing the positions of all the elements of the two-dimensional array greater than $k$.

??? soluzione "Solution"

    1. Pseudo-code for counting the elements greater than a threshold:

        !!! algoritmo "Algorithm: CountGreaterThan"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>A two-dimensional array <span class="arithmatex">&#92;(b&#91;1..m&#93;&#91;1..n&#93;&#92;)</span>, the dimensions <span class="arithmatex">&#92;(m&#92;)</span> and <span class="arithmatex">&#92;(n&#92;)</span>, and a threshold <span class="arithmatex">&#92;(k&#92;)</span></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The number <span class="arithmatex">&#92;(count&#92;)</span> of elements with <span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &gt; k&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> CountGreaterThan(b, m, n, k)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(count := 0&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(m&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &gt; k&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(count &#92;leftarrow count + 1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(count&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        - We initialize $count$ to $0$.

        - The outer loop iterates over the rows $i = 1, 2, \dots, m$, the inner loop over the columns $j = 1, 2, \dots, n$.

        - For each entry $b[i][j]$, if it exceeds $k$ we increase $count$.

        - Finally, we return $count$.

    2. Step-by-step execution on the instances.

        <strong>Instance 1:</strong> $b = \begin{bmatrix} 3 & 7 & 1 \\ 5 & 2 & 8 \end{bmatrix}$, $m=2$, $n=3$, $k=4$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &gt; 4&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(count&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $count = 3$ (elements $7$, $5$, $8$)

        <strong>Instance 2:</strong> $b = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}$, $m=3$, $n=3$, $k=5$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &gt; 5&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(count&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $count = 4$ (elements $6$, $7$, $8$, $9$)

    3. Pseudo-code returning also the positions of the elements greater than $k$. The array $pos$ is declared with $m \cdot n$ elements, the largest possible number of positions; only its first $count$ elements are used.

        !!! algoritmo "Algorithm: CountAndListGreaterThan"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>A two-dimensional array <span class="arithmatex">&#92;(b&#91;1..m&#93;&#91;1..n&#93;&#92;)</span>, the dimensions <span class="arithmatex">&#92;(m&#92;)</span> and <span class="arithmatex">&#92;(n&#92;)</span>, and a threshold <span class="arithmatex">&#92;(k&#92;)</span></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The number <span class="arithmatex">&#92;(count&#92;)</span> and the array <span class="arithmatex">&#92;(pos&#91;1..count&#93;&#92;)</span> of the pairs <span class="arithmatex">&#92;((i,j)&#92;)</span> with <span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &gt; k&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> CountAndListGreaterThan(b, m, n, k)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(count := 0&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(pos := &#92;text{new array}&#91;1..m &#92;cdot n&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(m&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &gt; k&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(count &#92;leftarrow count + 1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(pos&#91;count&#93; &#92;leftarrow (i, j)&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(count&#92;)</span>, <span class="arithmatex">&#92;(pos&#91;1..count&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        For Instance 1, the algorithm returns $count=3$ and $pos = [(1,2),(2,1),(2,3)]$; for Instance 2, it returns $count = 4$ and $pos = [(2,3),(3,1),(3,2),(3,3)]$.

<a id="esercizio-2-4"></a>

!!! esercizio "Exercise 2.4: Pseudo-code (E4)"

    Given a two-dimensional array $b[1..m][1..n]$ of $m \times n$ integer numbers, with $m \ge 1$ and $n \ge 1$, consider the problem of finding the minimum value of each column.

    **Questions**

    1. Write the pseudo-code of an algorithm that computes the minimum of each column of the two-dimensional array $b$. The algorithm should:

        - take as input a two-dimensional array $b[1..m][1..n]$ and the dimensions $m$, $n$;

        - return an array $colMin[1..n]$, where the element $colMin[j]$ is the minimum of the column $j$;

        - iterate over the columns and the rows with two nested loops.

    2. Execute the algorithm step by step on the following instances, showing each update of the array $colMin$:

        - Instance 1: $b = \begin{bmatrix} 4 & 9 & 2 \\ 7 & 1 & 6 \\ 3 & 5 & 8 \end{bmatrix}$, $m=3$, $n=3$;

        - Instance 2: $b = \begin{bmatrix} 8 & 3 \\ 5 & 7 \\ 2 & 4 \end{bmatrix}$, $m=3$, $n=2$.

    3. Modify the pseudo-code so that, in addition to the minimum value of each column, the algorithm also returns the first row index $rowIdx[j]$ where the minimum of column $j$ is located.

??? soluzione "Solution"

    1. Pseudo-code for computing the column minima:

        !!! algoritmo "Algorithm: ColumnMinima"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>A two-dimensional array <span class="arithmatex">&#92;(b&#91;1..m&#93;&#91;1..n&#93;&#92;)</span>, the dimensions <span class="arithmatex">&#92;(m &#92;ge 1&#92;)</span> and <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>An array <span class="arithmatex">&#92;(colMin&#91;1..n&#93;&#92;)</span>, where <span class="arithmatex">&#92;(colMin&#91;j&#93;&#92;)</span> is the minimum of column <span class="arithmatex">&#92;(j&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ColumnMinima(b, m, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(colMin := &#92;text{new array}&#91;1..n&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(colMin&#91;j&#93; &#92;leftarrow b&#91;1&#93;&#91;j&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 2&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(m&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &lt; colMin&#91;j&#93;&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(colMin&#91;j&#93; &#92;leftarrow b&#91;i&#93;&#91;j&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(colMin&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        - The outer loop iterates over the columns $j = 1, 2, \dots, n$.

        - We initialize $colMin[j]$ to $b[1][j]$, the first element of column $j$.

        - The inner loop scans the rows $i = 2, 3, \dots, m$, comparing each entry with the current minimum of the column, and updates $colMin[j]$ when a smaller element is found.

        - Finally, we return the array $colMin$.

    2. Step-by-step execution on the instances.

        <strong>Instance 1:</strong> $b = \begin{bmatrix} 4 & 9 & 2 \\ 7 & 1 & 6 \\ 3 & 5 & 8 \end{bmatrix}$, $m=3$, $n=3$

        <div class="minipage" style="width:32%" markdown>

        Column $j=1$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&lt;&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(colMin&#91;1&#93;&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:32%" markdown>

        Column $j=2$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&lt;&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(colMin&#91;2&#93;&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(9&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:32%" markdown>

        Column $j=3$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;3&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&lt;&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(colMin&#91;3&#93;&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        The column $<$? reports the outcome of the comparison $b[i][j] < colMin[j]$.

        <strong>Return:</strong> $colMin = [3, 1, 2]$

        <strong>Instance 2:</strong> $b = \begin{bmatrix} 8 & 3 \\ 5 & 7 \\ 2 & 4 \end{bmatrix}$, $m=3$, $n=2$

        <div class="minipage" style="width:48%" markdown>

        Column $j=1$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;1&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&lt;&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(colMin&#91;1&#93;&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td>Yes</td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <div class="minipage" style="width:48%" markdown>

        Column $j=2$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;2&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&lt;&#92;)</span>?</th>
        <th><span class="arithmatex">&#92;(colMin&#91;2&#93;&#92;)</span></th>
        </tr>
        <tr>
        <td>–</td>
        <td>–</td>
        <td>–</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td>No</td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        </tr>
        </table></div>

        </div>

        <strong>Return:</strong> $colMin = [2, 3]$

    3. Pseudo-code returning also the row index of each column minimum. The update uses the strict comparison $<$, so in case of ties the first row is kept.

        !!! algoritmo "Algorithm: ColumnMinimaWithIndex"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>A two-dimensional array <span class="arithmatex">&#92;(b&#91;1..m&#93;&#91;1..n&#93;&#92;)</span>, the dimensions <span class="arithmatex">&#92;(m &#92;ge 1&#92;)</span> and <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The arrays <span class="arithmatex">&#92;(colMin&#91;1..n&#93;&#92;)</span> and <span class="arithmatex">&#92;(rowIdx&#91;1..n&#93;&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ColumnMinimaWithIndex(b, m, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(colMin := &#92;text{new array}&#91;1..n&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(rowIdx := &#92;text{new array}&#91;1..n&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(colMin&#91;j&#93; &#92;leftarrow b&#91;1&#93;&#91;j&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(rowIdx&#91;j&#93; &#92;leftarrow 1&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 2&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(m&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &lt; colMin&#91;j&#93;&#92;)</span> <strong>then</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(colMin&#91;j&#93; &#92;leftarrow b&#91;i&#93;&#91;j&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(rowIdx&#91;j&#93; &#92;leftarrow i&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(colMin&#92;)</span>, <span class="arithmatex">&#92;(rowIdx&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        For Instance 1, the algorithm returns $colMin = [3,1,2]$ and $rowIdx = [3,2,1]$; for Instance 2, it returns $colMin = [2, 3]$ and $rowIdx = [3, 1]$.

<a id="esercizio-2-5"></a>

!!! esercizio "Exercise 2.5: Pseudo-code (E5)"

    Given a two-dimensional array $b[1..m][1..n]$ of $m \times n$ integer numbers, consider the problem of computing its transposed two-dimensional array, i.e., the two-dimensional array $c[1..n][1..m]$ with $c[j][i] = b[i][j]$.

    **Questions**

    1. Write the pseudo-code of an algorithm that computes the transpose of a two-dimensional array $b[1..m][1..n]$. The algorithm should:

        - take as input a two-dimensional array $b[1..m][1..n]$ and the dimensions $m$, $n$;

        - allocate a new two-dimensional array $c[1..n][1..m]$ for the result;

        - return the transposed two-dimensional array $c$, such that $c[j][i] = b[i][j]$.

    2. Execute the algorithm step by step on the following instances, showing the two-dimensional array $c$ being filled entry by entry:

        - Instance 1: $b = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$, $m=2$, $n=3$;

        - Instance 2: $b = \begin{bmatrix} 7 & 2 \\ 3 & 8 \\ 1 & 5 \end{bmatrix}$, $m=3$, $n=2$.

    3. For a square two-dimensional array ($m = n$), write the pseudo-code of an algorithm that performs the transposition in place (without allocating a new two-dimensional array), by exchanging the elements $b[i][j]$ and $b[j][i]$ for all $i < j$.

??? soluzione "Solution"

    1. Pseudo-code for the transposition of a two-dimensional array:

        !!! algoritmo "Algorithm: Transpose"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>A two-dimensional array <span class="arithmatex">&#92;(b&#91;1..m&#93;&#91;1..n&#93;&#92;)</span>, the dimensions <span class="arithmatex">&#92;(m&#92;)</span> and <span class="arithmatex">&#92;(n&#92;)</span></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The transposed two-dimensional array <span class="arithmatex">&#92;(c&#91;1..n&#93;&#91;1..m&#93;&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Transpose(b, m, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c := &#92;text{new array}&#91;1..n&#93;&#91;1..m&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(m&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c&#91;j&#93;&#91;i&#93; &#92;leftarrow b&#91;i&#93;&#91;j&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(c&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        - We allocate $c$ as a new $n \times m$ two-dimensional array.

        - The outer loop iterates over the rows $i = 1, 2, \dots, m$ of $b$, the inner loop over the columns $j = 1, 2, \dots, n$ of $b$.

        - Each entry $b[i][j]$ is copied to the position $c[j][i]$; every entry of $c$ is assigned exactly once.

        - Finally, we return the transposed two-dimensional array $c$.

    2. Step-by-step execution on the instances.

        <strong>Instance 1:</strong> $b = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$, $m=2$, $n=3$, so $c$ is $3 \times 2$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93;&#92;)</span></th>
        <th>assignment</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;1&#93;&#91;1&#93; &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;2&#93;&#91;1&#93; &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;3&#93;&#91;1&#93; &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;1&#93;&#91;2&#93; &#92;leftarrow 4&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;2&#93;&#91;2&#93; &#92;leftarrow 5&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;3&#93;&#91;2&#93; &#92;leftarrow 6&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $c = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}$

        <strong>Instance 2:</strong> $b = \begin{bmatrix} 7 & 2 \\ 3 & 8 \\ 1 & 5 \end{bmatrix}$, $m=3$, $n=2$, so $c$ is $2 \times 3$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93;&#92;)</span></th>
        <th>assignment</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;1&#93;&#91;1&#93; &#92;leftarrow 7&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;2&#93;&#91;1&#93; &#92;leftarrow 2&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;1&#93;&#91;2&#93; &#92;leftarrow 3&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;2&#93;&#91;2&#93; &#92;leftarrow 8&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;1&#93;&#91;3&#93; &#92;leftarrow 1&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(c&#91;2&#93;&#91;3&#93; &#92;leftarrow 5&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $c = \begin{bmatrix} 7 & 3 & 1 \\ 2 & 8 & 5 \end{bmatrix}$

    3. In-place transposition of a square two-dimensional array ($m = n$):

        !!! algoritmo "Algorithm: TransposeInPlace"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>A square two-dimensional array <span class="arithmatex">&#92;(b&#91;1..n&#93;&#91;1..n&#93;&#92;)</span>, the dimension <span class="arithmatex">&#92;(n&#92;)</span></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The two-dimensional array <span class="arithmatex">&#92;(b&#92;)</span>, transposed in place</span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> TransposeInPlace(b, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n-1&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := i+1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(tmp := b&#91;i&#93;&#91;j&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &#92;leftarrow b&#91;j&#93;&#91;i&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(b&#91;j&#93;&#91;i&#93; &#92;leftarrow tmp&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(b&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        The inner loop starts at $j = i+1$, so that each pair of symmetric positions is exchanged exactly once (exchanging it twice would restore the original array) and the elements $b[i][i]$ on the diagonal are never moved. For $i = n$ the inner loop would be empty, so the outer loop stops at $n-1$. For example, on $b = \begin{bmatrix} 4 & 1 \\ 9 & 6 \end{bmatrix}$ ($n=2$) the only iteration exchanges $b[1][2]=1$ and $b[2][1]=9$, giving $b = \begin{bmatrix} 4 & 9 \\ 1 & 6 \end{bmatrix}$.

<a id="esercizio-2-6"></a>

!!! esercizio "Exercise 2.6: Pseudo-code (E6)"

    Given a two-dimensional array $a[1..m][1..p]$ of $m \times p$ integer numbers and a two-dimensional array $b[1..p][1..n]$ of $p \times n$ integer numbers, consider the problem of computing their product, i.e., the two-dimensional array $c[1..m][1..n]$ with:

    $$
    c[i][j] = \sum_{k=1}^{p} a[i][k] \cdot b[k][j]
    $$

    **Questions**

    1. Write the pseudo-code of an algorithm that computes the product $c = a \cdot b$. The algorithm should:

        - take as input the two-dimensional arrays $a[1..m][1..p]$ and $b[1..p][1..n]$, and the dimensions $m$, $p$, $n$;

        - allocate a new two-dimensional array $c[1..m][1..n]$, initialized to zero;

        - use three nested loops (over $i$, $j$, $k$) to compute the product with the formula above;

        - return the product two-dimensional array $c$.

    2. Execute the algorithm step by step on the following instances, showing the values of $k$ and $c[i][j]$ at each step of the innermost loop:

        - Instance 1: $a = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $b = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$, $m=p=n=2$;

        - Instance 2: $a = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 2 & 3 \end{bmatrix}$, $b = \begin{bmatrix} 4 & 5 \\ 6 & 7 \end{bmatrix}$, $m=3$, $p=2$, $n=2$.

??? soluzione "Solution"

    1. Pseudo-code for the product of two two-dimensional arrays:

        !!! algoritmo "Algorithm: MatrixProduct"

            <div class="pseudocodice" markdown="0">
            <div class="pc-io"><span class="pc-kw">Input:</span> <span>The two-dimensional arrays <span class="arithmatex">&#92;(a&#91;1..m&#93;&#91;1..p&#93;&#92;)</span> and <span class="arithmatex">&#92;(b&#91;1..p&#93;&#91;1..n&#93;&#92;)</span>, the dimensions <span class="arithmatex">&#92;(m&#92;)</span>, <span class="arithmatex">&#92;(p&#92;)</span>, <span class="arithmatex">&#92;(n&#92;)</span></span></div>
            <div class="pc-io"><span class="pc-kw">Output:</span> <span>The product two-dimensional array <span class="arithmatex">&#92;(c&#91;1..m&#93;&#91;1..n&#93;&#92;)</span></span></div>
            <div class="pc-sep"></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
            <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> MatrixProduct(a, b, m, p, n)</span></span></div>
            <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c := &#92;text{new array}&#91;1..m&#93;&#91;1..n&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(m&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c&#91;i&#93;&#91;j&#93; &#92;leftarrow 0&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
            <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(m&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(k := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(p&#92;)</span> <strong>do</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c&#91;i&#93;&#91;j&#93; &#92;leftarrow c&#91;i&#93;&#91;j&#93; + a&#91;i&#93;&#91;k&#93; &#92;cdot b&#91;k&#93;&#91;j&#93;&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
            <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(c&#92;)</span></span></span></div>
            <div class="pc-riga"><span class="pc-n">16</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
            </div>

        - We allocate $c$ as an $m \times n$ two-dimensional array and initialize all its elements to zero with two nested loops.

        - The outer loop iterates over the rows of $c$, $i = 1, 2, \dots, m$, and the middle loop over its columns, $j = 1, 2, \dots, n$.

        - The inner loop computes the sum $\sum_{k=1}^{p} a[i][k] \cdot b[k][j]$, adding one product at each iteration.

        - Finally, we return $c$.

    2. Step-by-step execution on the instances.

        <strong>Instance 1:</strong> $a = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $b = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$, $m=p=n=2$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(k&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93;&#91;k&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;k&#93;&#91;j&#93;&#92;)</span></th>
        <th>product</th>
        <th><span class="arithmatex">&#92;(c&#91;i&#93;&#91;j&#93;&#92;)</span> (after)</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;cdot 5 = 5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2 &#92;cdot 7 = 14&#92;)</span></td>
        <td><span class="arithmatex">&#92;(19&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1 &#92;cdot 6 = 6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2 &#92;cdot 8 = 16&#92;)</span></td>
        <td><span class="arithmatex">&#92;(22&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3 &#92;cdot 5 = 15&#92;)</span></td>
        <td><span class="arithmatex">&#92;(15&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4 &#92;cdot 7 = 28&#92;)</span></td>
        <td><span class="arithmatex">&#92;(43&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3 &#92;cdot 6 = 18&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4 &#92;cdot 8 = 32&#92;)</span></td>
        <td><span class="arithmatex">&#92;(50&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $c = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$

        <strong>Instance 2:</strong> $a = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 2 & 3 \end{bmatrix}$, $b = \begin{bmatrix} 4 & 5 \\ 6 & 7 \end{bmatrix}$, $m=3$, $p=2$, $n=2$

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(i&#92;)</span></th>
        <th><span class="arithmatex">&#92;(j&#92;)</span></th>
        <th><span class="arithmatex">&#92;(k&#92;)</span></th>
        <th><span class="arithmatex">&#92;(a&#91;i&#93;&#91;k&#93;&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#91;k&#93;&#91;j&#93;&#92;)</span></th>
        <th>product</th>
        <th><span class="arithmatex">&#92;(c&#91;i&#93;&#91;j&#93;&#92;)</span> (after)</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(18&#92;)</span></td>
        <td><span class="arithmatex">&#92;(26&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(21&#92;)</span></td>
        <td><span class="arithmatex">&#92;(31&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Return:</strong> $c = \begin{bmatrix} 4 & 5 \\ 6 & 7 \\ 26 & 31 \end{bmatrix}$

        The first two rows of $a$ form the identity, so the first two rows of $c$ are equal to the two rows of $b$.
