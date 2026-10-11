---
title: "Running time"
---

# Running time

<div class="info-capitolo" markdown>

**Part 4 · Analysis of algorithms · Chapter 12** · [:material-file-pdf-box: Lecture notes, volume 4 (PDF)](../pdf/lecture-notes-4-analysis.pdf) · [:material-pencil: Exercises](../exercises/ex-12-running-time.md)

</div>

In the chapter «Input size» we learned how to measure the size $|I|$ of an input instance $I$, that is, the number of bits needed to represent it. In this chapter we use this measure to answer the central question of the analysis of algorithms: <strong>how does the time needed by an algorithm grow when the input grows?</strong>

The plan of the chapter is the following.

- In Section [12.1](#sez-sec-rt-definition) we define the running time of an algorithm, the primitive operations (<strong>steps</strong>) that it executes, and the <strong>worst case</strong>. We also fix the conventions used to count the steps of a pseudo-code line by line.

- In Sections [12.2](#sez-sec-rt-findmax)–[12.5](#sez-sec-rt-primality) we apply the method to four algorithms already met in the previous chapters: <code>FindMaximum</code>, <code>InsertionSort</code>, <code>ChangeToBase2</code> and <code>PrimalityTest</code>. For each of them we first count the number of steps $S(n)$ as a function of a natural parameter $n$, and then we express the order of growth as a function of the input size $|I|$.

- The four analyses lead to four different behaviours (linear, quadratic, linear in $|I|$ although logarithmic in $n$, exponential in $|I|$ although only $\Theta(\sqrt n)$ in $n$), which are compared in Section [12.6](#sez-sec-rt-summary).

## 12.1 Running time of an algorithm { #sez-sec-rt-definition }

<a id="box-1-defRunningTime"></a>

!!! definizione "Definition 12.1: running time"

    The <strong>running time</strong> of an algorithm is an estimate of the time needed to execute it, as a function of the <strong>input size</strong> $|I|$.

- We are not interested in the exact time in seconds, which depends on the computer, on the compiler and on many other details, but in the <strong>order of growth</strong> of the running time, expressed with the asymptotic notation $O$, $\Omega$ and $\Theta$ (chapter 9 «Asymptotic notation», recalled in the chapter «Input size»).

- The running time of an algorithm depends on the number of <strong>primitive operations</strong> executed by the algorithm on an input of a given size.

### 12.1.1 Primitive operations

<a id="box-2-defPrimitiveOperation"></a>

!!! definizione "Definition 12.2: primitive operation"

    A <strong>primitive operation</strong> is a single operation that can be performed on a computer.

- The principal primitive operations are the following:

    1. arithmetic operations on fixed-size numbers;

    2. comparison of two fixed-size numbers;

    3. assignment of a value to a variable;

    4. accessing an element of an array by index;

    5. control-flow operations (for example, evaluating a condition in an <code>if</code> statement, or iterating in a loop).

!!! chiave ""

    We make the assumption that a <strong>constant amount of time</strong> is required to execute each primitive operation of an algorithm. In this way the analysis is as machine-independent as possible.

- For short, we call each primitive operation a <strong>step</strong>.

### 12.1.2 Counting the steps of a pseudo-code

- Every line of the pseudo-codes of these notes executes a <strong>constant</strong> number of primitive operations (a few comparisons, arithmetic operations and assignments). Since we are interested in the order of growth, we count <strong>one step for each execution of a line</strong>: this changes the number of steps only by a constant factor.

- To count the steps we determine, for every line, how many times it is executed, and we add up these numbers. The following conventions are used in all the chapter (and in its exercises).

!!! chiave ""

    <strong>Line-by-line counting.</strong>

    - Every execution of a numbered line is <strong>one step</strong>, including the lines <code>return</code>.

    - The condition of a <code>while</code> loop whose body is executed $k$ times is evaluated $k+1$ times: the last evaluation is the one that finds the condition false and ends the loop.

    - The condition of an <code>if</code> is evaluated every time the line is reached; the lines of the branch that is not taken are not executed.

    - When the number of executions of a line depends on the specific input (and not only on its size), we describe it with an auxiliary function, usually denoted by $t$, and then we look for the input that makes the total number of steps as large as possible.

### 12.1.3 Worst-case running time

- Even for inputs of a given size, the running time of an algorithm may depend on which specific input of that size is given.

- Typically, in the analysis of algorithms, the worst possible case is considered, since it determines the longest running time for any input of a given size.

<a id="box-3-defWorstCaseRunningTime"></a>

!!! definizione "Definition 12.3: worst-case running time"

    The <strong>worst-case running time</strong> $T(|I|)$ of an algorithm is the maximum number of steps executed by the algorithm on any input $I$ of a given input size $|I|$.

- It is usually easier to count the steps as a function of a <strong>natural parameter</strong> of the input, such as the number $n$ of entries of an array, or the value $n$ of the input number. The input size $|I|$, instead, is the number of bits of the input. This leads to the method followed in all the examples of the chapter.

!!! chiave ""

    <strong>The two steps of the analysis.</strong>

    1. Count the number of steps $S(n)$ executed in the worst case, as a function of the natural parameter $n$, and determine its order of growth (for example $S(n)=\Theta(n^2)$).

    2. Determine the relation between $n$ and the input size $|I|$ (for example $|I|=\Theta(n)$, or $|I|=\Theta(\log_2 n)$), and use it to express the order of growth of the worst-case running time $T(|I|)$.

- The second step is not a formality: as we shall see, the same number of steps $\Theta(n)$ corresponds to a running time that is linear in $|I|$ if $n$ is the number of entries of an array, and exponential in $|I|$ if $n$ is the value of the input number.

## 12.2 Find maximum { #sez-sec-rt-findmax }

!!! chiave ""

    Given an array $a[1..n]$ of $n \ge 1$ integer numbers, consider the problem of determining the maximum value in the array.

- This is the pseudo-code of a simple algorithm, called <code>FindMaximum</code>, that solves this problem.

!!! algoritmo "Algorithm: FindMaximum"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The maximum value in array <span class="arithmatex">&#92;(a&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FindMaximum(a, n)</span></span></div>
    <div class="pc-riga" id="riga-12-running-time-line-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(max := a&#91;1&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-line-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 2&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-line-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-line-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; max&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-line-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(max &#92;leftarrow a&#91;i&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-line-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-line-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(max&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/FindMaximum_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of FindMaximum in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/FindMaximum_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of FindMaximum in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/FindMaximum_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of FindMaximum in Google Colab">Java</a></div>

### 12.2.1 Number of steps

- Let $S(n)$ denote the number of steps executed by <code>FindMaximum</code> in the worst case, where $n$ is the size of the array.

- The body of the loop is executed for $i=2,3,\dots,n$, that is, $n-1$ times, so the condition of line [4](#riga-12-running-time-line-c) is evaluated $n$ times. The execution of line [6](#riga-12-running-time-line-e), instead, depends on the iteration. We define a function

    $$
    t:\{2,3,\dots,n\}\to\{0,1\},
    $$

    where $t(i)=1$ if line [6](#riga-12-running-time-line-e) is executed at iteration $i$, and $t(i)=0$ otherwise.

- The number of times each line of code is executed is:

<div class="tabella" markdown="0"><table>
<tr>
<th>line</th>
<th>number of executions</th>
</tr>
<tr>
<td>[2](#riga-12-running-time-line-a)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
</tr>
<tr>
<td>[3](#riga-12-running-time-line-b)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
</tr>
<tr>
<td>[4](#riga-12-running-time-line-c)</td>
<td><span class="arithmatex">&#92;(n&#92;)</span></td>
</tr>
<tr>
<td>[5](#riga-12-running-time-line-d)</td>
<td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
</tr>
<tr>
<td>[6](#riga-12-running-time-line-e)</td>
<td><span class="arithmatex">&#92;(&#92;sum&#95;{i=2}^{n} t(i)&#92;)</span></td>
</tr>
<tr>
<td>[8](#riga-12-running-time-line-f)</td>
<td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
</tr>
<tr>
<td>[10](#riga-12-running-time-line-g)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
</tr>
</table></div>

- Therefore, the total number of steps is

    $$
    1+1+n+(n-1)+\sum_{i=2}^{n}t(i)+(n-1)+1
    =
    3n+1+\sum_{i=2}^{n}t(i).
    $$

- The value of $t(i)$ depends on the specific input array, so we analyse the worst possible case. The worst possible case is when the elements of the array are in increasing order, that is,

    $$
    a[1]<a[2]<\cdots<a[n].
    $$

    Then $t(i)=1$ for every $i \in \{2,3,\dots,n\}$: we enter the <code>if</code> at every iteration, and we update the maximum value each time. The total number of steps in the worst case is

    $$
    3n+1+\sum_{i=2}^{n}1
    =
    3n+1+(n-1)
    =
    4n.
    $$

- Therefore,

    $$
    S(n)=4n=\Theta(n).
    $$

    Thus, $S(n)$ grows linearly in $n$. Indeed,

    $$
    \lim_{n\to\infty}\frac{4n}{n}
    =
    4\in\R_{>0}.
    $$

<a id="box-4-exStepsFindMax"></a>

!!! esempio "Example 12.1: counting the steps of FindMaximum"

    Consider the array $a[1..4]=(3,1,4,5)$.

    - Iteration $i=2$: $a[2]=1 > 3$ is false, so $t(2)=0$.

    - Iteration $i=3$: $a[3]=4 > 3$ is true, $max$ becomes $4$, so $t(3)=1$.

    - Iteration $i=4$: $a[4]=5 > 4$ is true, $max$ becomes $5$, so $t(4)=1$.

    The algorithm returns $5$ after

    $$
    3\cdot 4+1+\big(t(2)+t(3)+t(4)\big)=13+2=15
    $$

    steps. On the increasing array $(1,2,3,4)$, instead, $t(2)=t(3)=t(4)=1$ and the algorithm executes $S(4)=4\cdot 4=16$ steps, the maximum for $n=4$.

### 12.2.2 Running time as a function of the input size

- We now determine the worst-case running time of the algorithm by expressing the order of growth of the number of steps as a function of the input size $|I|$.

<strong>General case.</strong> Since the input of the algorithm consists of an array $a[1..n]$ of $n$ integer numbers, the input size satisfies

$$
|I|=\Omega(n),
$$

because the input must contain at least the $n$ array entries. This means that, for some constant $c>0$ and for all sufficiently large $n$,

$$
|I|\ge c\,n.
$$

Equivalently,

$$
n\le \frac{1}{c}|I|,
$$

and hence $n=O(|I|)$. Since $S(n)=\Theta(n)$, there exists a constant $a>0$ such that

$$
S(n)\le a\,n
$$

for all sufficiently large $n$. Since $n\le \frac{1}{c}|I|$, we obtain

$$
S(n)\le \frac{a}{c}|I|.
$$

Thus, the number of steps is bounded above by a constant times the input size.

!!! chiave ""

    The worst-case running time of the <code>FindMaximum</code> algorithm, as a function of the input size $|I|$, is

    $$
    T(|I|)=O(|I|).
    $$

    Thus, in the general case, the worst-case running time is at most linear in the input size.

<strong>Entries with a fixed number of bits.</strong> We often make the hypothesis that all input values can be stored using a fixed constant number of bits, for example $32$ bits. Under this hypothesis, the input size satisfies

$$
|I|=\Theta(n),
$$

because the input consists of $n$ array entries and each entry requires a constant number of bits. This means that there exist constants $c_1,c_2>0$ such that, for all sufficiently large $n$,

$$
c_1 n \le |I| \le c_2 n.
$$

Equivalently,

$$
\frac{1}{c_2}|I| \le n \le \frac{1}{c_1}|I|,
$$

that is, $n=\Theta(|I|)$. Since $S(n)=\Theta(n)$, there exist constants $a_1,a_2>0$ such that, for all sufficiently large $n$,

$$
a_1 n \le S(n) \le a_2 n.
$$

Using the bounds on $n$ in terms of $|I|$, we obtain

$$
\frac{a_1}{c_2}|I| \le S(n) \le \frac{a_2}{c_1}|I|,
$$

that is, $S(n)=\Theta(|I|)$.

!!! chiave ""

    If all input values use a fixed constant number of bits, then the worst-case running time of the <code>FindMaximum</code> algorithm is

    $$
    T(|I|)=\Theta(|I|).
    $$

    Thus, under this hypothesis, the algorithm is linear in the input size.

## 12.3 Insertion sort { #sez-sec-rt-insertion }

- In <code>FindMaximum</code> the loop body executes a constant number of steps. In <code>InsertionSort</code> the body of the outer loop contains another loop, whose number of iterations depends on the input: this produces a quadratic number of steps.

!!! chiave ""

    Given an array $a[1..n]$ of $n$ natural numbers, consider the problem of sorting the array in non-decreasing order:

    $$
    a[1] \le a[2] \le \cdots \le a[n].
    $$

- This is the pseudo-code of the <code>InsertionSort</code> algorithm.

!!! algoritmo "Algorithm: InsertionSort"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> natural numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The array <span class="arithmatex">&#92;(a&#92;)</span> sorted in non-decreasing order</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> InsertionSort(a, n)</span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 2&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(key := a&#91;i&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := i - 1&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;ge 1&#92;)</span> <strong>and</strong> <span class="arithmatex">&#92;(a&#91;j&#93; &gt; key&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;j+1&#93; &#92;leftarrow a&#91;j&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-g"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j &#92;leftarrow j - 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-h"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;j+1&#93; &#92;leftarrow key&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-ins-i"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/InsertionSort_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of InsertionSort in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/InsertionSort_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of InsertionSort in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/InsertionSort_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of InsertionSort in Google Colab">Java</a></div>

### 12.3.1 Number of steps

- Let $S(n)$ denote the number of steps executed by <code>InsertionSort</code> in the worst case, where $n$ is the size of the array.

- The execution of lines [7](#riga-12-running-time-ins-f)–[8](#riga-12-running-time-ins-g) depends on the iteration. We define a function

    $$
    t:\{2,3,\dots,n\}\to\{0,1,\dots,n-1\},
    $$

    where $t(i)$ denotes the number of times the body of the inner loop (lines [7](#riga-12-running-time-ins-f)–[8](#riga-12-running-time-ins-g)) is executed during the iteration $i$ of the outer loop. The condition of the inner loop (line [6](#riga-12-running-time-ins-e)) is then evaluated $t(i)+1$ times during the same iteration.

- The number of times each line of code is executed is:

<div class="tabella" markdown="0"><table>
<tr>
<th>line</th>
<th>number of executions</th>
</tr>
<tr>
<td>[2](#riga-12-running-time-ins-a)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
</tr>
<tr>
<td>[3](#riga-12-running-time-ins-b)</td>
<td><span class="arithmatex">&#92;(n&#92;)</span></td>
</tr>
<tr>
<td>[4](#riga-12-running-time-ins-c)</td>
<td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
</tr>
<tr>
<td>[5](#riga-12-running-time-ins-d)</td>
<td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
</tr>
<tr>
<td>[6](#riga-12-running-time-ins-e)</td>
<td><span class="arithmatex">&#92;(&#92;displaystyle(n-1)+&#92;sum&#95;{i=2}^{n}t(i)&#92;)</span></td>
</tr>
<tr>
<td>[7](#riga-12-running-time-ins-f)</td>
<td><span class="arithmatex">&#92;(&#92;displaystyle&#92;sum&#95;{i=2}^{n}t(i)&#92;)</span></td>
</tr>
<tr>
<td>[8](#riga-12-running-time-ins-g)</td>
<td><span class="arithmatex">&#92;(&#92;displaystyle&#92;sum&#95;{i=2}^{n}t(i)&#92;)</span></td>
</tr>
<tr>
<td>[10](#riga-12-running-time-ins-h)</td>
<td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
</tr>
<tr>
<td>[11](#riga-12-running-time-ins-i)</td>
<td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
</tr>
</table></div>

- Therefore, the total number of steps is

    $$
    \begin{aligned}
    &1 + n + (n-1) + (n-1) + \left((n-1)+\sum_{i=2}^{n}t(i)\right) + \sum_{i=2}^{n}t(i) + \sum_{i=2}^{n}t(i) + (n-1) + (n-1)\\
    &\qquad =
    6n - 4 + 3\sum_{i=2}^{n}t(i).
    \end{aligned}
    $$

- The value of $t(i)$ depends on the specific input array, so we analyse the worst possible case. Since $j$ starts from $i-1$ and decreases down to $0$ at most, we always have $t(i)\le i-1$. The worst possible case is when the elements of the array are in strictly decreasing order, that is,

    $$
    a[1]>a[2]>\cdots>a[n].
    $$

    In this case, at every outer iteration $i$, the element $key=a[i]$ is smaller than all elements before it. Hence the inner while loop runs to completion:

    $$
    t(i)=i-1
    \qquad
    \forall i \in \{2,3,\dots,n\}.
    $$

    Therefore,

    $$
    \sum_{i=2}^{n}t(i)=\sum_{i=2}^{n}(i-1)
    =
    1+2+\cdots+(n-1)
    =\frac{n(n-1)}{2}.
    $$

- The total number of steps in the worst case is

    $$
    6n-4+3\cdot\frac{n(n-1)}{2}
    =
    \frac{12n-8+3n^2-3n}{2}
    =
    \frac{3n^2+9n-8}{2}.
    $$

    Therefore,

    $$
    S(n)=\frac{3n^2+9n-8}{2}=\Theta(n^2).
    $$

    Thus, $S(n)$ grows quadratically in $n$. Indeed,

    $$
    \lim_{n\to\infty}
    \frac{3n^2+9n-8}{2n^2}
    =
    \lim_{n\to\infty}
    \frac{1}{2}\left(3+\frac{9}{n}-\frac{8}{n^2}\right)
    =
    \frac{3}{2}\in\R_{>0}.
    $$

<a id="box-5-exStepsInsertion"></a>

!!! esempio "Example 12.2: the function $t$ of InsertionSort"

    Consider the array $a[1..6]=(5,2,4,6,1,3)$. At each iteration $i$, $t(i)$ is the number of elements of $a[1..i-1]$ that are larger than $key=a[i]$, i.e., the number of elements shifted one position to the right.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(key&#92;)</span></th>
    <th><span class="arithmatex">&#92;(t(i)&#92;)</span></th>
    <th>array after the iteration</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;((2,5,4,6,1,3)&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;((2,4,5,6,1,3)&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td><span class="arithmatex">&#92;((2,4,5,6,1,3)&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1,2,4,5,6,3)&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1,2,3,4,5,6)&#92;)</span></td>
    </tr>
    </table></div>

    We have $\sum_{i=2}^{6} t(i)=9$, hence the algorithm executes

    $$
    6\cdot 6-4+3\cdot 9=59
    $$

    steps. On a decreasing array of $6$ elements, instead, $\sum_{i=2}^{6} t(i)=1+2+3+4+5=15$ and the algorithm executes

    $$
    S(6)=\frac{3\cdot 36+9\cdot 6-8}{2}=77
    $$

    steps.

### 12.3.2 Running time as a function of the input size

- We now determine the worst-case running time of the algorithm by expressing the order of growth of the number of steps as a function of the input size $|I|$.

<strong>General case.</strong> Since the input of the algorithm consists of an array $a[1..n]$ of $n$ natural numbers, the input size satisfies

$$
|I|=\Omega(n),
$$

because the input must contain at least the $n$ array entries. This means that, for some constant $c>0$ and for all sufficiently large $n$,

$$
|I|\ge c\,n.
$$

Equivalently,

$$
n\le \frac{1}{c}|I|,
$$

and hence $n=O(|I|)$. Since $S(n)=\Theta(n^2)$, there exists a constant $a>0$ such that

$$
S(n)\le a\,n^2
$$

for all sufficiently large $n$. Since $n\le \frac{1}{c}|I|$, we obtain

$$
S(n)\le a\left(\frac{1}{c}|I|\right)^2
=
\frac{a}{c^2}|I|^2.
$$

Thus, the number of steps is bounded above by a constant times $|I|^2$.

!!! chiave ""

    The worst-case running time of the <code>InsertionSort</code> algorithm, as a function of the input size $|I|$, is

    $$
    T(|I|)=O(|I|^2).
    $$

    Thus, in the general case, the worst-case running time is at most quadratic in the input size.

<strong>Entries with a fixed number of bits.</strong> We often make the hypothesis that all input values can be stored using a fixed constant number of bits, for example $32$ bits. Under this hypothesis, the input size satisfies

$$
|I|=\Theta(n),
$$

because the input consists of $n$ array entries and each entry requires a constant number of bits. This means that there exist constants $c_1,c_2>0$ such that, for all sufficiently large $n$,

$$
c_1 n \le |I| \le c_2 n.
$$

Equivalently,

$$
\frac{1}{c_2}|I| \le n \le \frac{1}{c_1}|I|.
$$

Since $S(n)=\Theta(n^2)$, there exist constants $a_1,a_2>0$ such that, for all sufficiently large $n$,

$$
a_1 n^2 \le S(n) \le a_2 n^2.
$$

Using the bounds on $n$ in terms of $|I|$, we obtain

$$
a_1\left(\frac{1}{c_2}|I|\right)^2
\le S(n) \le
a_2\left(\frac{1}{c_1}|I|\right)^2,
\qquad\text{that is,}\qquad
\frac{a_1}{c_2^2}|I|^2
\le S(n) \le
\frac{a_2}{c_1^2}|I|^2.
$$

Thus, $S(n)=\Theta(|I|^2)$.

!!! chiave ""

    If all input values use a fixed constant number of bits, then the worst-case running time of the <code>InsertionSort</code> algorithm is

    $$
    T(|I|)=\Theta(|I|^2).
    $$

    Thus, under this hypothesis, the algorithm is quadratic in the input size.

## 12.4 Change of base { #sez-sec-rt-changebase }

- In the first two examples the input is an array and the natural parameter $n$ is the number of its entries. We now consider an algorithm whose input is a <strong>single number</strong> $n$: the parameter $n$ is now a value, and the relation between $n$ and $|I|$ changes completely.

!!! chiave ""

    Given a natural number $n \ge 1$ represented in base $10$, consider the problem of converting $n$ to base $2$.

- This is the pseudo-code of the <code>ChangeToBase2</code> algorithm. It is the algorithm <code>ChangeOfBase</code> of the chapter «Numerical algorithms», with base $b=2$. The binary digits are stored in an array $d[0..nd-1]$ indexed from $0$, so that $d[k]$ is the digit of weight $2^k$.

!!! algoritmo "Algorithm: ChangeToBase2"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> in base <span class="arithmatex">&#92;(10&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>An array <span class="arithmatex">&#92;(d&#92;)</span> of binary digits and the number of digits <span class="arithmatex">&#92;(nd&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ChangeToBase2(n)</span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(nd := &#92;lfloor &#92;log&#95;2 n &#92;rfloor + 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d :=&#92;)</span> new array<span class="arithmatex">&#92;(&#91;0..nd-1&#93;&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(k := 0&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(n &gt; 0&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(q := &#92;lfloor n / 2 &#92;rfloor&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(r := n &#92;bmod 2&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-g"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d&#91;k&#93; &#92;leftarrow r&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-h"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(n &#92;leftarrow q&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-i"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(k &#92;leftarrow k + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-cob-j"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(d, nd&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/ChangeToBase2_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of ChangeToBase2 in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/ChangeToBase2_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of ChangeToBase2 in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/ChangeToBase2_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of ChangeToBase2 in Google Colab">Java</a></div>

### 12.4.1 Number of steps

- Let $S(n)$ denote the number of steps executed by <code>ChangeToBase2</code>, where $n$ is the input value to be converted. There is only one input for each value of $n$, so there is no distinction between the worst case and the other cases.

- The number of digits needed to represent $n$ in base $2$ is

    $$
    \lfloor\log_2 n\rfloor+1.
    $$

    At every iteration of the while loop, the current value of $n$ is replaced by $\lfloor n/2\rfloor$. After $s$ iterations, the current value is

    $$
    \left\lfloor \frac{n}{2^s}\right\rfloor.
    $$

    The loop stops when this value becomes $0$, that is, when

    $$
    \left\lfloor \frac{n}{2^s}\right\rfloor=0.
    $$

    This happens exactly when $2^s>n$. The smallest integer $s$ such that $2^s>n$ is

    $$
    s=\lfloor\log_2 n\rfloor+1.
    $$

    Therefore, the body of the while loop is executed exactly $\lfloor\log_2 n\rfloor+1$ times (one iteration for each binary digit), and its condition is evaluated $\lfloor\log_2 n\rfloor+2$ times.

- The number of times each line of code is executed is:

<div class="tabella" markdown="0"><table>
<tr>
<th>line</th>
<th>number of executions</th>
</tr>
<tr>
<td>[2](#riga-12-running-time-cob-a), [3](#riga-12-running-time-cob-b), [4](#riga-12-running-time-cob-c)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span> each</td>
</tr>
<tr>
<td>[5](#riga-12-running-time-cob-d)</td>
<td><span class="arithmatex">&#92;(&#92;lfloor&#92;log&#95;2 n&#92;rfloor+2&#92;)</span></td>
</tr>
<tr>
<td>[6](#riga-12-running-time-cob-e), [7](#riga-12-running-time-cob-f), [8](#riga-12-running-time-cob-g), [9](#riga-12-running-time-cob-h), [10](#riga-12-running-time-cob-i)</td>
<td><span class="arithmatex">&#92;(&#92;lfloor&#92;log&#95;2 n&#92;rfloor+1&#92;)</span> each</td>
</tr>
<tr>
<td>[12](#riga-12-running-time-cob-j)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
</tr>
</table></div>

- Therefore, the total number of steps is

    $$
    1+1+1+(\lfloor\log_2 n\rfloor+2)+5(\lfloor\log_2 n\rfloor+1)+1
    =
    6(\lfloor\log_2 n\rfloor+1)+5
    =
    6\lfloor\log_2 n\rfloor+11.
    $$

    Therefore,

    $$
    S(n)=6\lfloor\log_2 n\rfloor+11=\Theta(\log_2 n).
    $$

    In words, the number of steps grows logarithmically in the numerical value $n$.

- Indeed, for $n>1$,

    $$
    \log_2 n -1
    <
    \lfloor \log_2 n \rfloor
    \le
    \log_2 n.
    $$

    Dividing by $\log_2 n>0$, we obtain

    $$
    1-\frac{1}{\log_2 n}
    <
    \frac{\lfloor \log_2 n \rfloor}{\log_2 n}
    \le
    1.
    $$

    Since both $1-\frac{1}{\log_2 n}$ and $1$ converge to $1$, by the squeeze theorem,

    $$
    \lim_{n\to\infty}
    \frac{\lfloor \log_2 n \rfloor}{\log_2 n}
    =1.
    $$

    Therefore,

    $$
    \lim_{n\to\infty}
    \frac{6\lfloor\log_2 n\rfloor+11}{\log_2 n}
    =
    \lim_{n\to\infty}
    \left(
    6\,\frac{\lfloor\log_2 n\rfloor}{\log_2 n}
    +
    \frac{11}{\log_2 n}
    \right)
    =
    6\cdot 1+0
    =
    6\in\R_{>0}.
    $$

<a id="box-6-exStepsChangeBase"></a>

!!! esempio "Example 12.3: ChangeToBase2 on $n=13$"

    We have $\lfloor\log_2 13\rfloor+1=4$, so the array $d[0..3]$ is created and the loop executes $4$ iterations:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iteration</th>
    <th><span class="arithmatex">&#92;(n&#92;)</span></th>
    <th><span class="arithmatex">&#92;(q=&#92;lfloor n/2&#92;rfloor&#92;)</span></th>
    <th><span class="arithmatex">&#92;(r=n &#92;bmod 2&#92;)</span></th>
    <th>assignment</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(13&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(d&#91;0&#93;=1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td><span class="arithmatex">&#92;(d&#91;1&#93;=0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(d&#91;2&#93;=1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(d&#91;3&#93;=1&#92;)</span></td>
    </tr>
    </table></div>

    After the fourth iteration $n=0$: the condition of line [5](#riga-12-running-time-cob-d) is evaluated for the fifth time, it is false, and the algorithm returns the digits of $13=(1101)_2$. The number of steps is

    $$
    S(13)=3+5+5\cdot 4+1=29=6\cdot 3+11.
    $$

### 12.4.2 Running time as a function of the input size

- We now express the running time as a function of the input size $|I|$. This is the delicate change of variable.

- The input is not the abstract value $n$, but a representation of $n$. Since $n$ is represented in base $10$, the number of digits needed to write $n$ is

    $$
    \lfloor\log_{10} n\rfloor+1.
    $$

    Each decimal digit requires a constant number of bits. Hence the input size satisfies

    $$
    |I|=\Theta(\lfloor\log_{10} n\rfloor+1)=\Theta(\log_{10} n).
    $$

    Since the base of a logarithm changes it only by a constant factor ($\log_{10} n=\log_2 n/\log_2 10$), we get

    $$
    |I|=\Theta(\log_2 n),
    $$

    the same order of growth obtained in the chapter «Input size» for a number written in binary. This means that there exist constants $c_1,c_2>0$ such that, for all sufficiently large $n$,

    $$
    c_1\log_2 n \le |I| \le c_2\log_2 n.
    $$

    Equivalently,

    $$
    \frac{1}{c_2}|I| \le \log_2 n \le \frac{1}{c_1}|I|.
    $$

- Since $S(n)=\Theta(\log_2 n)$, there exist constants $a_1,a_2>0$ such that, for all sufficiently large $n$,

    $$
    a_1\log_2 n \le S(n) \le a_2\log_2 n.
    $$

    Using the bounds on $\log_2 n$ in terms of $|I|$, we obtain

    $$
    \frac{a_1}{c_2}|I| \le S(n) \le \frac{a_2}{c_1}|I|,
    $$

    that is, $S(n)=\Theta(|I|)$.

!!! chiave ""

    The running time of the <code>ChangeToBase2</code> algorithm is

    $$
    T(|I|)=\Theta(|I|).
    $$

    Thus, the algorithm is logarithmic in the numerical value $n$, but linear in the input size $|I|$, because the input size is itself proportional to $\log_2 n$.

## 12.5 Primality test { #sez-sec-rt-primality }

- The input of the last example is again a single number $n$, but now the number of steps grows as $\sqrt{n}$, much faster than $\log_2 n$. We shall see that this makes the algorithm exponential in the input size.

!!! chiave ""

    Given a natural number $n$, consider the problem of determining whether $n$ is a prime number.

- This is the pseudo-code of the <code>PrimalityTest</code> algorithm of the chapter «Numerical algorithms».

!!! algoritmo "Algorithm: PrimalityTest"

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><code>true</code> if <span class="arithmatex">&#92;(n&#92;)</span> is prime, <code>false</code> otherwise</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> PrimalityTest(n)</span></span></div>
    <div class="pc-riga" id="riga-12-running-time-pt-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &lt; 2&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-pt-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>false</code></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-pt-c"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d := 2&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-pt-d"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(d &#92;le &#92;lfloor&#92;sqrt{n}&#92;rfloor&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-pt-e"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &#92;bmod d = 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-pt-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>false</code></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-pt-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(d &#92;leftarrow d + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
    <div class="pc-riga" id="riga-12-running-time-pt-h"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>true</code></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/PrimalityTest_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of PrimalityTest in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/PrimalityTest_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of PrimalityTest in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch12_running_time/PrimalityTest_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of PrimalityTest in Google Colab">Java</a></div>

### 12.5.1 Number of steps

- Let $S(n)$ denote the number of steps executed by <code>PrimalityTest</code> in the worst case, where $n$ is the input value. We assume $n \ge 2$, since for $n<2$ the algorithm stops after $2$ steps.

- <strong>The worst case is when $n$ is prime.</strong> In this case the algorithm never returns early at line [8](#riga-12-running-time-pt-f), so the while loop runs to completion. The variable $d$ takes the values

    $$
    2,3,\dots,\lfloor\sqrt{n}\rfloor,
    $$

    hence the body of the while loop is executed $\lfloor\sqrt{n}\rfloor-1$ times. The condition of the while loop is evaluated once more, when $d=\lfloor\sqrt{n}\rfloor+1$, so line [6](#riga-12-running-time-pt-d) is executed $\lfloor\sqrt{n}\rfloor$ times.

- The number of times each line of code is executed in the worst case is:

<div class="tabella" markdown="0"><table>
<tr>
<th>line</th>
<th>number of executions (<span class="arithmatex">&#92;(n&#92;)</span> prime)</th>
</tr>
<tr>
<td>[2](#riga-12-running-time-pt-a)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
</tr>
<tr>
<td>[3](#riga-12-running-time-pt-b)</td>
<td><span class="arithmatex">&#92;(0&#92;)</span>   (since <span class="arithmatex">&#92;(n &#92;ge 2&#92;)</span>)</td>
</tr>
<tr>
<td>[5](#riga-12-running-time-pt-c)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
</tr>
<tr>
<td>[6](#riga-12-running-time-pt-d)</td>
<td><span class="arithmatex">&#92;(&#92;lfloor&#92;sqrt{n}&#92;rfloor&#92;)</span></td>
</tr>
<tr>
<td>[7](#riga-12-running-time-pt-e)</td>
<td><span class="arithmatex">&#92;(&#92;lfloor&#92;sqrt{n}&#92;rfloor-1&#92;)</span></td>
</tr>
<tr>
<td>[8](#riga-12-running-time-pt-f)</td>
<td><span class="arithmatex">&#92;(0&#92;)</span>   (since <span class="arithmatex">&#92;(n&#92;)</span> is prime)</td>
</tr>
<tr>
<td>[10](#riga-12-running-time-pt-g)</td>
<td><span class="arithmatex">&#92;(&#92;lfloor&#92;sqrt{n}&#92;rfloor-1&#92;)</span></td>
</tr>
<tr>
<td>[12](#riga-12-running-time-pt-h)</td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
</tr>
</table></div>

- Therefore, the total number of steps in the worst case is

    $$
    1 + 1 + \lfloor\sqrt{n}\rfloor
    + (\lfloor\sqrt{n}\rfloor-1)
    + (\lfloor\sqrt{n}\rfloor-1)
    + 1
    =
    3\lfloor\sqrt{n}\rfloor + 1.
    $$

- This is indeed the worst case. If $n \ge 2$ is not prime, let $p$ be its smallest divisor larger than $1$: then $p \le \lfloor\sqrt{n}\rfloor$, and the algorithm returns <code>false</code> at line [8](#riga-12-running-time-pt-f) when $d=p$. Line [6](#riga-12-running-time-pt-d) is executed $p-1$ times, line [7](#riga-12-running-time-pt-e) $p-1$ times, line [10](#riga-12-running-time-pt-g) $p-2$ times, and lines [2](#riga-12-running-time-pt-a), [5](#riga-12-running-time-pt-c), [8](#riga-12-running-time-pt-f) once each, for a total of

    $$
    3p-1 \;\le\; 3\lfloor\sqrt{n}\rfloor-1 \;<\; 3\lfloor\sqrt{n}\rfloor+1
    $$

    steps.

- Therefore,

    $$
    S(n)=3\lfloor\sqrt{n}\rfloor + 1=\Theta(\sqrt{n}).
    $$

    Thus, $S(n)$ grows as the square root of $n$. Indeed,

    $$
    \sqrt{n}-1 < \lfloor\sqrt{n}\rfloor \le \sqrt{n}.
    $$

    Dividing by $\sqrt{n}>0$, we obtain

    $$
    1-\frac{1}{\sqrt{n}}
    <
    \frac{\lfloor\sqrt{n}\rfloor}{\sqrt{n}}
    \le
    1.
    $$

    Since both $1-\frac{1}{\sqrt{n}}$ and $1$ converge to $1$, by the squeeze theorem,

    $$
    \lim_{n\to\infty}
    \frac{\lfloor\sqrt{n}\rfloor}{\sqrt{n}}
    =1.
    $$

    Therefore,

    $$
    \lim_{n\to\infty}
    \frac{3\lfloor\sqrt{n}\rfloor+1}{\sqrt{n}}
    =
    \lim_{n\to\infty}
    \left(
    3\,\frac{\lfloor\sqrt{n}\rfloor}{\sqrt{n}}
    +
    \frac{1}{\sqrt{n}}
    \right)
    =
    3\cdot 1+0
    =
    3\in\R_{>0}.
    $$

<a id="box-7-exStepsPrimality"></a>

!!! esempio "Example 12.4: PrimalityTest on a prime and on a composite number"

    - $n=97$ is prime and $\lfloor\sqrt{97}\rfloor=9$. The algorithm tries the divisors $d=2,3,\dots,9$ ($8$ iterations), finds no divisor, evaluates the condition of line [6](#riga-12-running-time-pt-d) a ninth time with $d=10$, and returns <code>true</code> after

        $$
        S(97)=3\cdot 9+1=28
        $$

        steps.

    - $n=91=7\cdot 13$ is not prime, and its smallest divisor larger than $1$ is $p=7$. The algorithm tries $d=2,3,\dots,6$ without success, finds $91 \bmod 7=0$, and returns <code>false</code> after

        $$
        3\cdot 7-1=20
        $$

        steps, although $\lfloor\sqrt{91}\rfloor=9$ as for $97$.

### 12.5.2 Running time as a function of the input size

- We now determine the worst-case running time by expressing the order of growth of the number of steps as a function of the input size $|I|$.

- The input is a single natural number $n$. To represent $n$ in binary, we need $\lfloor\log_2 n\rfloor+1$ bits, so the input size satisfies

    $$
    |I| = \Theta(\log_2 n).
    $$

    This means that there exist constants $c_1,c_2>0$ such that, for all sufficiently large $n$,

    $$
    c_1\log_2 n \le |I| \le c_2\log_2 n.
    $$

    Equivalently,

    $$
    \frac{1}{c_2}|I| \le \log_2 n \le \frac{1}{c_1}|I|.
    $$

    The function $x \mapsto 2^x$ is strictly increasing. Hence, applying $2^x$ to all terms of the inequality preserves the order:

    $$
    2^{\frac{1}{c_2}|I|}
    \le
    2^{\log_2 n}
    \le
    2^{\frac{1}{c_1}|I|}.
    $$

    Since $2^{\log_2 n}=n$, we obtain

    $$
    2^{\frac{1}{c_2}|I|}
    \le
    n
    \le
    2^{\frac{1}{c_1}|I|}.
    $$

    Moreover, $\sqrt{n}=n^{1/2}$. Taking the square root of all terms, which again preserves the order because all terms are positive, and using $(2^x)^{1/2}=2^{x/2}$, we get

    $$
    2^{\frac{1}{2c_2}|I|}
    \le
    \sqrt{n}
    \le
    2^{\frac{1}{2c_1}|I|}.
    $$

- Since $S(n)=\Theta(\sqrt{n})$, there exist constants $a_1,a_2>0$ such that, for all sufficiently large $n$,

    $$
    a_1\sqrt{n}
    \le
    S(n)
    \le
    a_2\sqrt{n}.
    $$

    Using the bounds on $\sqrt{n}$ in terms of $|I|$, we obtain

    $$
    a_1\, 2^{\frac{1}{2c_2}|I|}
    \le
    S(n)
    \le
    a_2\, 2^{\frac{1}{2c_1}|I|}.
    $$

    Thus,

    $$
    S(n)=2^{\Theta(|I|)}.
    $$

- The worst case is attained on prime numbers, and there are prime numbers of every size: for every $k \ge 2$ there is a prime number with exactly $k$ binary digits, i.e., between $2^{k-1}$ and $2^k$ (Bertrand's postulate). Hence, for every input size, the maximum number of steps is attained by a prime $n$ and it satisfies the bounds above.

!!! chiave ""

    The worst-case running time of the <code>PrimalityTest</code> algorithm, as a function of the input size $|I|$, is

    $$
    T(|I|) = 2^{\Theta(|I|)}.
    $$

    Accordingly, the order of growth of the worst-case running time of the <code>PrimalityTest</code> algorithm is <strong>exponential</strong> in the input size.

## 12.6 Summary { #sez-sec-rt-summary }

- The following table collects the results of the chapter. For the two algorithms on arrays, the running time is given under the hypothesis that all entries use a fixed constant number of bits.

<div class="tabella" markdown="0"><table>
<tr>
<th>algorithm</th>
<th>parameter <span class="arithmatex">&#92;(n&#92;)</span></th>
<th>worst-case steps <span class="arithmatex">&#92;(S(n)&#92;)</span></th>
<th>input size <span class="arithmatex">&#92;(|I|&#92;)</span></th>
<th>running time <span class="arithmatex">&#92;(T(|I|)&#92;)</span></th>
</tr>
<tr>
<td><code>FindMaximum</code></td>
<td>entries of the array</td>
<td><span class="arithmatex">&#92;(4n=&#92;Theta(n)&#92;)</span></td>
<td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span></td>
<td><span class="arithmatex">&#92;(&#92;Theta(|I|)&#92;)</span></td>
</tr>
<tr>
<td><code>InsertionSort</code></td>
<td>entries of the array</td>
<td><span class="arithmatex">&#92;(&#92;frac{3n^2+9n-8}{2}=&#92;Theta(n^2)&#92;)</span></td>
<td><span class="arithmatex">&#92;(&#92;Theta(n)&#92;)</span></td>
<td><span class="arithmatex">&#92;(&#92;Theta(|I|^2)&#92;)</span></td>
</tr>
<tr>
<td><code>ChangeToBase2</code></td>
<td>value of the number</td>
<td><span class="arithmatex">&#92;(6&#92;lfloor&#92;log&#95;2 n&#92;rfloor+11=&#92;Theta(&#92;log&#95;2 n)&#92;)</span></td>
<td><span class="arithmatex">&#92;(&#92;Theta(&#92;log&#95;2 n)&#92;)</span></td>
<td><span class="arithmatex">&#92;(&#92;Theta(|I|)&#92;)</span></td>
</tr>
<tr>
<td><code>PrimalityTest</code></td>
<td>value of the number</td>
<td><span class="arithmatex">&#92;(3&#92;lfloor&#92;sqrt{n}&#92;rfloor+1=&#92;Theta(&#92;sqrt{n})&#92;)</span></td>
<td><span class="arithmatex">&#92;(&#92;Theta(&#92;log&#95;2 n)&#92;)</span></td>
<td><span class="arithmatex">&#92;(2^{&#92;Theta(|I|)}&#92;)</span></td>
</tr>
</table></div>

!!! chiave ""

    <strong>Key points.</strong>

    - The running time is measured in <strong>steps</strong> (primitive operations, each executed in constant time); we count one step for each execution of a line of pseudo-code.

    - We consider the <strong>worst case</strong>: the maximum number of steps over all inputs of a given size. When the number of executions of a line depends on the input, an auxiliary function $t$ describes it, and we look for the input that maximizes the total.

    - The analysis has <strong>two steps</strong>: first the number of steps $S(n)$ as a function of a natural parameter $n$, then the running time $T(|I|)$ as a function of the input size.

    - If $n$ is the number of entries of an array (with entries of fixed size), then $|I|=\Theta(n)$ and the order of growth does not change: $S(n)=\Theta(n^k)$ gives $T(|I|)=\Theta(|I|^k)$.

    - If $n$ is the <strong>value</strong> of the input number, then $|I|=\Theta(\log_2 n)$, i.e., $n=2^{\Theta(|I|)}$: a number of steps $\Theta(\log_2 n)$ is linear in $|I|$, while any number of steps $\Theta(\sqrt{n})$ or $\Theta(n)$ is <strong>exponential</strong> in $|I|$.
