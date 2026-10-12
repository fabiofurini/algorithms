---
title: "Exercises · Input size"
---

# Exercises · Input size

<div class="info-capitolo" markdown>

**Exercises · Chapter 11** · each solution opens with a click · [:material-book-open-variant: Chapter 11: Input size](../analysis/11-input-size.md) · [:material-file-pdf-box: Exercises, volume 4 (PDF)](../pdf/exercises-4-analysis.pdf)

</div>

In the exercises of this chapter the input size is computed with the formulas of the chapter «Input size», summarized below.

!!! nota ""

    The input size $|I|$ of an instance $I$ is the total number of bits needed to represent $I$ in binary:

    - one natural number $n\ge 1$:

        $$
        |I|=\lfloor\log_2 n\rfloor+1=\Theta(\log_2 n);
        $$

    - two natural numbers $n,m\ge 1$:

        $$
        |I|=\big(\lfloor\log_2 n\rfloor+1\big)+\big(\lfloor\log_2 m\rfloor+1\big)=\Theta\big(\log_2 \max\{n,m\}\big);
        $$

    - an array $a[1..n]$ of natural numbers (an entry equal to $0$ uses $1$ bit):

        $$
        |I|=\sum_{i=1}^{n}\big(\lfloor\log_2(\max\{1,a[i]\})\rfloor+1\big),
        \qquad
        n \le |I| \le n(1+\log_2 M),
        $$

        where $M=\max\{1,a[1],a[2],\dots,a[n]\}$.

    A natural number is written with exactly $k$ bits if and only if $2^{k-1}\le n\le 2^k-1$.

<a id="esercizio-11-1"></a>

!!! esercizio "Exercise 11.1: Input size (E1)"

    Consider the following input instances:

    - **(a)** the natural numbers $n=1$, $n=13$, $n=255$, $n=256$, $n=1000$, $n=10^6$;

    - **(b)** the pairs of natural numbers $(n,m)=(48,18)$ and $(n,m)=(1000,7)$;

    - **(c)** the arrays $[5,2,4,1,3]$, $[1,1,1,1]$, $[1024,1,1]$, $[0,7,8]$.

    **Questions**

    1. Compute the input size $|I|$ of every instance in (a), and write the binary representation of $13$, $255$ and $256$.

    2. Compute the input size of the two instances in (b).

    3. Compute the input size of the four arrays in (c). For each array compare $|I|$ with the number $n$ of entries and with the upper bound $n(1+\log_2 M)$, where $M=\max\{1,a[1],a[2],\dots,a[n]\}$.

    4. What is the largest natural number that can be represented with $|I|=k$ bits? And the smallest natural number $n\ge 1$ whose input size is $k$?

??? soluzione "Solution"

    1. Using $|I|=\lfloor\log_2 n\rfloor+1$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th>powers of 2</th>
        <th><span class="arithmatex">&#92;(&#92;lfloor&#92;log&#95;2 n&#92;rfloor&#92;)</span></th>
        <th><span class="arithmatex">&#92;(|I|&#92;)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2^0&#92;le 1&lt;2^1&#92;)</span></td>
        <td>0</td>
        <td>1</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(13&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2^3&#92;le 13&lt;2^4&#92;)</span></td>
        <td>3</td>
        <td>4</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(255&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2^7&#92;le 255&lt;2^8&#92;)</span></td>
        <td>7</td>
        <td>8</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(256&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2^8&#92;le 256&lt;2^9&#92;)</span></td>
        <td>8</td>
        <td>9</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(1000&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2^9&#92;le 1000&lt;2^{10}&#92;)</span></td>
        <td>9</td>
        <td>10</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(10^6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2^{19}&#92;le 10^6&lt;2^{20}&#92;)</span></td>
        <td>19</td>
        <td>20</td>
        </tr>
        </table></div>

        Binary representations: $13=(1101)_2$ (4 bits), $255=(11111111)_2$ (8 bits), $256=(100000000)_2$ (9 bits). Note that $255$ and $256$ differ by $1$, but their input sizes differ by one bit, because $256=2^8$ is a power of $2$.

    2. For $(48,18)$: $2^5\le 48<2^6$ and $2^4\le 18<2^5$, so

        $$
        |I|=(5+1)+(4+1)=6+5=11.
        $$

        For $(1000,7)$: $2^9\le 1000<2^{10}$ and $2^2\le 7<2^3$, so

        $$
        |I|=(9+1)+(2+1)=10+3=13.
        $$

    3. Bits of each entry and total:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>array</th>
        <th>bits per entry</th>
        <th><span class="arithmatex">&#92;(|I|&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n(1+&#92;log&#95;2 M)&#92;)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(&#91;5,2,4,1,3&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3+2+3+1+2&#92;)</span></td>
        <td>11</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;(5(1+&#92;log&#95;2 5)&#92;approx 16.61&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(&#91;1,1,1,1&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1+1+1+1&#92;)</span></td>
        <td>4</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(4(1+0)=4&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(&#91;1024,1,1&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11+1+1&#92;)</span></td>
        <td>13</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(3(1+10)=33&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(&#91;0,7,8&#93;&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1+3+4&#92;)</span></td>
        <td>8</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(3(1+3)=12&#92;)</span></td>
        </tr>
        </table></div>

        In all cases $n\le|I|\le n(1+\log_2 M)$, in agreement with $|I|=\Omega(n)$ and $|I|=O(n(1+\log_2 M))$. The upper bound is tight for $[1,1,1,1]$ (all entries equal), while it is far from $|I|$ for $[1024,1,1]$, where only one entry is large.

    4. With $k$ bits the largest representable number is

        $$
        (\underbrace{11\dots1}_{k})_2=2^k-1,
        $$

        and the smallest number $n\ge 1$ with $\lfloor\log_2 n\rfloor+1=k$ is $n=2^{k-1}=(1\underbrace{0\dots0}_{k-1})_2$. Hence the numbers with input size exactly $k$ are those with

        $$
        2^{k-1}\le n\le 2^k-1.
        $$

        For example, for $k=8$ these are the numbers from $128$ to $255$.

<a id="esercizio-11-2"></a>

!!! esercizio "Exercise 11.2: Input size (E2)"

    Consider the following families of input instances, parametrized by a natural number $n\ge 1$ (or $k\ge 1$):

    - **(a)** the single natural number $2^k$, and the single natural number $2^k-1$;

    - **(b)** the array $a[1..n]$ with $a[i]=i$ for every $i\in\{1, 2, \dots, n\}$;

    - **(c)** the array $a[1..n]$ with $a[i]=2^i$ for every $i\in\{1, 2, \dots, n\}$;

    - **(d)** the array $a[1..n]$ with $a[i]=n$ for every $i\in\{1, 2, \dots, n\}$;

    - **(e)** an array $a[1..n]$ whose entries are natural numbers smaller than $2^{32}$, so that each of them can be written with at most $32$ bits.

    **Questions**

    1. Compute exactly the input size of the instances in (a), as a function of $k$.

    2. Compute exactly the input size of the arrays in (c), and express it asymptotically as a function of $n$.

    3. Express asymptotically the input size of the arrays in (d) and (e).

    4. For the arrays in (b), compute $|I|$ for $n=1,2,3,4,8,16$, and prove that $|I|=\Theta(n\log_2 n)$.

??? soluzione "Solution"

    1. Since $\log_2 2^k=k$, the number $2^k$ has input size

        $$
        |I|=\lfloor\log_2 2^k\rfloor+1=k+1.
        $$

        Since $2^{k-1}\le 2^k-1<2^k$, we have $\lfloor\log_2(2^k-1)\rfloor=k-1$ and

        $$
        |I|=k.
        $$

        In both cases $|I|=\Theta(k)$, while the numerical value is $\Theta(2^k)$: the value is exponential in the input size.

    2. The entry $a[i]=2^i$ requires $\lfloor\log_2 2^i\rfloor+1=i+1$ bits, so

        $$
        |I|=\sum_{i=1}^{n}(i+1)=\frac{n(n+1)}{2}+n=\frac{n(n+3)}{2}.
        $$

        For example, for $n=4$: $2+3+4+5=14=\frac{4\cdot 7}{2}$. Since

        $$
        \lim_{n\to\infty}\frac{n(n+3)/2}{n^2}=\lim_{n\to\infty}\frac{1}{2}\left(1+\frac{3}{n}\right)=\frac12\in\R_{>0},
        $$

        we have $|I|=\Theta(n^2)$ by the limit criterion. Directly, since $n^2 \le n(n+3) \le 4n^2$ for every $n \ge 1$, the constants $c_1=\frac12$, $c_2=2$ and $n_1=1$ give $\frac12 n^2\le|I|\le 2n^2$. Here the entries do <strong>not</strong> use a constant number of bits, and the input size is quadratic in the number of entries.

    3. (d) Every entry is equal to $n$ and uses $\lfloor\log_2 n\rfloor+1$ bits, so

        $$
        |I|=n\big(\lfloor\log_2 n\rfloor+1\big)=\Theta(n\log_2 n),
        $$

        because $\lfloor\log_2 n\rfloor+1=\Theta(\log_2 n)$ (Observation on one natural number), multiplied by $n$.

        (e) Every entry uses at least $1$ and at most $32$ bits, so

        $$
        n\le|I|\le 32n,
        $$

        and $|I|=\Theta(n)$. This is the hypothesis “every entry uses a constant number of bits” of the corollary on entries of constant size. (If every entry is stored in a memory word of exactly $32$ bits, the number of stored bits is $32n$, again $\Theta(n)$.)

    4. The entry $a[i]=i$ uses $\lfloor\log_2 i\rfloor+1$ bits:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(|I|&#92;)</span></th>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">&#92;(1+2=3&#92;)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">&#92;(1+2+2=5&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">&#92;(1+2+2+3=8&#92;)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">&#92;(1+2+2+3+3+3+3+4=21&#92;)</span></td>
        </tr>
        <tr>
        <td>16</td>
        <td><span class="arithmatex">&#92;(21+7&#92;cdot 4+5=54&#92;)</span></td>
        </tr>
        </table></div>

        <strong>Upper bound.</strong> Since $i\le n$, each entry uses at most $\lfloor\log_2 n\rfloor+1\le\log_2 n+1\le 2\log_2 n$ bits for $n\ge 2$, so

        $$
        |I|\le 2n\log_2 n,\qquad \forall n\ge 2.
        $$

        <strong>Lower bound.</strong> Each entry uses at least $\log_2 i$ bits (since $\lfloor\log_2 i\rfloor+1\ge\log_2 i$). Keeping only the indices $i\ge \lceil n/2\rceil$, which are at least $n/2$ and are at least $n/2$ in number,

        $$
        |I|\ge\sum_{i=\lceil n/2\rceil}^{n}\log_2 i\ge \frac n2\log_2\frac n2=\frac n2(\log_2 n-1)\ge \frac n4\log_2 n,
        $$

        where the last inequality holds when $\log_2 n-1\ge\frac12\log_2 n$, i.e., for $n\ge 4$.

        Therefore, with $c_1=\frac14$, $c_2=2$ and $n_1=4$,

        $$
        0\le \frac14\,n\log_2 n\le |I|\le 2\,n\log_2 n,\qquad\forall n\ge 4,
        $$

        i.e., $|I|=\Theta(n\log_2 n)$. (Check: for $n=16$, $\frac14\cdot 16\cdot 4=16\le 54\le 2\cdot 16\cdot 4=128$.)

<a id="esercizio-11-3"></a>

!!! esercizio "Exercise 11.3: Input size (E3)"

    Consider the following algorithm, and recall the <code>PrimalityTest</code> algorithm (trial division by $d = 2, 3, \dots, \lfloor\sqrt n\rfloor$), whose number of steps in the worst case ($n$ prime) is $S(n)=3\lfloor\sqrt n\rfloor+1$, with the body of its while loop executed $\lfloor\sqrt n\rfloor-1$ times.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> SumUpTo</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;ge 1&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span><span class="arithmatex">&#92;(1+2+&#92;cdots+n&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> SumUpTo(n)</span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis3-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s := 0&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis3-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis3-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis3-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s &#92;leftarrow s + i&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis3-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis3-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(s&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. Compute the number of steps $S(n)$ of <code>SumUpTo</code> and determine its worst-case running time $T(|I|)$. Is the algorithm polynomial?

    2. Propose an algorithm that computes the same output with a constant number of steps (assume that arithmetic operations take a constant number of steps). Is it polynomial?

    3. Prove that <code>PrimalityTest</code> is exponential in $|I|$, even though $S(n)=\Theta(\sqrt n)$ is “sub-linear” in the value $n$.

    4. Give an upper bound on the number of iterations of the while loop of <code>PrimalityTest</code> for a prime number $n$ of $32$ bits and of $64$ bits. What happens to the number of iterations when the input size doubles?

??? soluzione "Solution"

    1. The number of times each line of code is executed is:

        - <span style="color:#e03131">Line</span> [2](#riga-ex-11-input-size-exis3-a) is executed $1$ time

        - <span style="color:#e03131">Line</span> [3](#riga-ex-11-input-size-exis3-b) is executed $1$ time

        - <span style="color:#e03131">Line</span> [4](#riga-ex-11-input-size-exis3-c) is executed $n+1$ times

        - <span style="color:#e03131">Line</span> [5](#riga-ex-11-input-size-exis3-d) is executed $n$ times

        - <span style="color:#e03131">Line</span> [6](#riga-ex-11-input-size-exis3-e) is executed $n$ times

        - <span style="color:#e03131">Line</span> [8](#riga-ex-11-input-size-exis3-f) is executed $1$ time

        Therefore

        $$
        S(n)=1+1+(n+1)+n+n+1=3n+4=\Theta(n).
        $$

        The input is a single natural number, so $|I|=\lfloor\log_2 n\rfloor+1=\Theta(\log_2 n)$: there exist $c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        c_1\log_2 n\le|I|\le c_2\log_2 n
        \quad\Longleftrightarrow\quad
        2^{\frac{1}{c_2}|I|}\le n\le 2^{\frac{1}{c_1}|I|}.
        $$

        Since $a_1n\le S(n)\le a_2 n$ for some $a_1,a_2>0$,

        $$
        a_1 2^{\frac{1}{c_2}|I|}\le S(n)\le a_2 2^{\frac{1}{c_1}|I|},
        \qquad\text{hence}\qquad T(|I|)=2^{\Theta(|I|)},
        $$

        since the constant factors $a_1$ and $a_2$ are absorbed in the exponent (Observation «constant factors in the exponent» of the chapter). The worst case can also be computed exactly. The inputs of size $|I|$ are the numbers $n$ with $2^{|I|-1}\le n\le 2^{|I|}-1$, and $S(n)=3n+4$ is largest for $n=2^{|I|}-1$, so

        $$
        T(|I|)=3\big(2^{|I|}-1\big)+4=3\cdot 2^{|I|}+1 .
        $$

        !!! chiave ""

            <code>SumUpTo</code> is linear in the value $n$ but <strong>exponential</strong> in the input size: it is not polynomial.

    2. By Gauss' formula, $1+2+\cdots+n=\dfrac{n(n+1)}{2}$. The algorithm “<strong>return</strong> $n(n+1)/2$” executes a constant number of steps (one sum, one product, one division, one return), so $T(|I|)=\Theta(1)=O(|I|^0)$: it is polynomial.

    3. The input is a single natural number, so as above $2^{\frac{1}{c_2}|I|}\le n\le 2^{\frac{1}{c_1}|I|}$. Taking square roots (all terms are positive),

        $$
        2^{\frac{1}{2c_2}|I|}\le\sqrt n\le 2^{\frac{1}{2c_1}|I|}.
        $$

        Since $S(n)=\Theta(\sqrt n)$, there exist $a_1,a_2>0$ with $a_1\sqrt n\le S(n)\le a_2\sqrt n$, hence

        $$
        a_1 2^{\frac{1}{2c_2}|I|}\le S(n)\le a_2 2^{\frac{1}{2c_1}|I|},
        \qquad\text{hence}\qquad T(|I|)=2^{\Theta(|I|)},
        $$

        since the constant factors $a_1$ and $a_2$ are absorbed in the exponent (Observation «constant factors in the exponent» of the chapter). Being sub-linear in $n$ does not help: $\sqrt n=2^{\frac12\log_2 n}$ is still exponential in the number of bits $\log_2 n$. The algorithm is not polynomial: for every constant $k$, $\lim_{|I|\to\infty}2^{c|I|}/|I|^k=+\infty$ for any $c>0$.

    4. The while loop is executed $\lfloor\sqrt n\rfloor-1$ times for a prime $n$.

        - $32$ bits: $n<2^{32}$, so $\sqrt n<2^{16}=65\,536$ and the loop executes fewer than $65\,536$ iterations.

        - $64$ bits: $n<2^{64}$, so $\sqrt n<2^{32}=4\,294\,967\,296$ and the loop executes up to about $4.3\cdot 10^{9}$ iterations.

        When the input size doubles (from $32$ to $64$ bits) the bound on the number of iterations is <strong>squared</strong> ($2^{16}\to 2^{32}$), while for a polynomial algorithm with $T(|I|)=\Theta(|I|^k)$ it would only be multiplied by the constant $2^k$.

<a id="esercizio-11-4"></a>

!!! esercizio "Exercise 11.4: Input size (E4)"

    Consider the following two algorithms. Both contain two nested loops.

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> CountPairs</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;ge 1&#92;)</span></span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The number of pairs <span class="arithmatex">&#92;((i,j)&#92;)</span> with <span class="arithmatex">&#92;(i,j&#92;in&#92;{1, 2, &#92;dots, n&#92;}&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> CountPairs(n)</span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c := 0&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c &#92;leftarrow c + 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-g"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j &#92;leftarrow j + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-h"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4-i"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(c&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <div class="pseudocodice" markdown="0"><div class="pc-titolo"><strong>Algorithm:</strong> CountInversions</div>
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;ge 1&#92;)</span> natural numbers</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>The number of pairs <span class="arithmatex">&#92;(i&lt;j&#92;)</span> with <span class="arithmatex">&#92;(a&#91;i&#93;&gt;a&#91;j&#93;&#92;)</span></span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> CountInversions(a, n)</span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c := 0&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n-1&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := i+1&#92;)</span></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; a&#91;j&#93;&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-g"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c &#92;leftarrow c + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-h"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j &#92;leftarrow j + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-i"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga" id="riga-ex-11-input-size-exis4b-j"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(c&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    **Questions**

    1. Compute the number of steps $S(n)$ of <code>CountPairs</code> and its worst-case running time $T(|I|)$.

    2. Compute the number of steps $S(n)$ of <code>CountInversions</code> in the worst case and its worst-case running time $T(|I|)$, in general and under the hypothesis that every entry uses a constant number of bits.

    3. Both algorithms have $S(n)=\Theta(n^2)$. Explain why one is polynomial and the other is exponential in the input size.

    4. Suppose that <code>CountInversions</code> also receives the number $n$ as part of the input. Compute $|I|$ for $n=5$, $a=[5,2,4,1,3]$, and explain why the conclusion of question 2 does not change.

??? soluzione "Solution"

    1. The number of times each line of code is executed is:

        - <span style="color:#e03131">Lines</span> [2](#riga-ex-11-input-size-exis4-a), [3](#riga-ex-11-input-size-exis4-b) and [12](#riga-ex-11-input-size-exis4-i) are executed $1$ time each

        - <span style="color:#e03131">Line</span> [4](#riga-ex-11-input-size-exis4-c) is executed $n+1$ times

        - <span style="color:#e03131">Lines</span> [5](#riga-ex-11-input-size-exis4-d) and [10](#riga-ex-11-input-size-exis4-h) are executed $n$ times each

        - <span style="color:#e03131">Line</span> [6](#riga-ex-11-input-size-exis4-e) is executed $n(n+1)$ times

        - <span style="color:#e03131">Lines</span> [7](#riga-ex-11-input-size-exis4-f) and [8](#riga-ex-11-input-size-exis4-g) are executed $n^2$ times each

        Therefore

        $$
        S(n)=3+(n+1)+2n+n(n+1)+2n^2=3n^2+4n+4=\Theta(n^2).
        $$

        The input is a single natural number, so $|I|=\Theta(\log_2 n)$ and, as for every single-number input, $2^{\frac{1}{c_2}|I|}\le n\le 2^{\frac{1}{c_1}|I|}$ for some $c_1,c_2>0$. Squaring,

        $$
        2^{\frac{2}{c_2}|I|}\le n^2\le 2^{\frac{2}{c_1}|I|},
        $$

        and since $a_1n^2\le S(n)\le a_2n^2$ for some $a_1,a_2>0$, absorbing the constant factors in the exponent (Observation «constant factors in the exponent» of the chapter) we obtain

        $$
        T(|I|)=2^{\Theta(|I|)}:
        $$

        <code>CountPairs</code> is exponential in the input size.

    2. In the worst case (array in strictly decreasing order) line [8](#riga-ex-11-input-size-exis4b-g) is executed at every iteration of the inner loop. For a fixed $i$, the inner loop executes $n-i$ iterations, for a total of $\sum_{i=1}^{n-1}(n-i)=\frac{n(n-1)}{2}$. The number of times each line is executed is:

        - <span style="color:#e03131">Lines</span> [2](#riga-ex-11-input-size-exis4b-a), [3](#riga-ex-11-input-size-exis4b-b) and [14](#riga-ex-11-input-size-exis4b-j) are executed $1$ time each

        - <span style="color:#e03131">Line</span> [4](#riga-ex-11-input-size-exis4b-c) is executed $n$ times

        - <span style="color:#e03131">Lines</span> [5](#riga-ex-11-input-size-exis4b-d) and [12](#riga-ex-11-input-size-exis4b-i) are executed $n-1$ times each

        - <span style="color:#e03131">Line</span> [6](#riga-ex-11-input-size-exis4b-e) is executed $\frac{n(n-1)}{2}+(n-1)$ times

        - <span style="color:#e03131">Lines</span> [7](#riga-ex-11-input-size-exis4b-f), [8](#riga-ex-11-input-size-exis4b-g) and [10](#riga-ex-11-input-size-exis4b-h) are executed $\frac{n(n-1)}{2}$ times each

        Therefore

        $$
        S(n)=3+n+3(n-1)+4\cdot\frac{n(n-1)}{2}=2n^2+2n=\Theta(n^2).
        $$

        The input is an array, so $|I|=\Omega(n)$, i.e., $n\le\frac1c|I|$, and

        $$
        S(n)\le a\,n^2\le\frac{a}{c^2}|I|^2
        \quad\Longrightarrow\quad
        T(|I|)=O(|I|^2).
        $$

        If every entry uses at most $c$ bits, with $c$ a constant, then $|I|=\Theta(n)$, and more precisely $n\ge\frac1c|I|$. For a lower bound, note that only line [8](#riga-ex-11-input-size-exis4b-g) depends on the values: even if it is never executed, the algorithm executes

        $$
        2n^2+2n-\frac{n(n-1)}{2}=\frac{3n^2+5n}{2}\ge\frac32\,n^2\ge\frac{3}{2c^2}\,|I|^2
        $$

        steps. Every input of size $|I|$ requires at least this number of steps, so $T(|I|)=\Omega(|I|^2)$ and, together with the upper bound,

        $$
        T(|I|)=\Theta(|I|^2).
        $$

        In both cases <code>CountInversions</code> is polynomial (quadratic).

    3. The number of steps is the same function of $n$, but $n$ has a different relation with the input size:

        - in <code>CountPairs</code>, $n$ is the <strong>value</strong> of the input, which is written with only $\Theta(\log_2 n)$ bits, so $n=2^{\Theta(|I|)}$;

        - in <code>CountInversions</code>, $n$ is the <strong>number of entries</strong> of the array, and each entry needs at least one bit, so $n=O(|I|)$.

        !!! chiave ""

            The same $S(n)$ can correspond to a polynomial or to an exponential running time: it depends on how the parameter $n$ is related to the input size $|I|$.

    4. The bits of $n=5$ are $\lfloor\log_2 5\rfloor+1=3$, and the bits of the array are $3+2+3+1+2=11$, so

        $$
        |I|=3+11=14.
        $$

        In general $|I|=(\lfloor\log_2 n\rfloor+1)+\sum_{i=1}^{n}(\lfloor\log_2 a[i]\rfloor+1)\ge n$, so still $|I|=\Omega(n)$ and $T(|I|)=O(|I|^2)$. With entries of constant size, $|I|=\Theta(\log_2 n)+\Theta(n)=\Theta(n)$, so $T(|I|)=\Theta(|I|^2)$ as before: adding $n$ to the input adds only $\Theta(\log_2 n)$ bits, which is negligible with respect to the $\Omega(n)$ bits of the array.
