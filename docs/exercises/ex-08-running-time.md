---
title: "Exercises · Running time"
---

# Exercises · Running time

<div class="info-capitolo" markdown>

**Exercises · Chapter 8** · each solution opens with a click · [:material-book-open-variant: Chapter 8](../analysis-recursion/08-running-time.md) · [:material-file-pdf-box: Exercises, volume 2 (PDF)](../pdf/exercises-2-analysis-recursion.pdf)

</div>

In the exercises of this chapter the steps are counted with the conventions of the chapter «Running time»: every execution of a numbered line of pseudo-code (including the lines <code>return</code>) is one step, the condition of a <code>while</code> loop whose body is executed $k$ times is evaluated $k+1$ times, and the lines of a branch that is not taken are not executed. After the number of steps $S(n)$, the running time is expressed as a function of the input size $|I|$ with one of the following two rules.

!!! nota ""

    <strong>Rule (A): the input is a natural number $n$.</strong> Then $|I|=\Theta(\log_2 n)$: there exist constants $c_1,c_2>0$ such that, for all sufficiently large $n$,

    $$
    c_1\log_2 n \le |I| \le c_2\log_2 n
    \qquad\Longleftrightarrow\qquad
    2^{\frac{1}{c_2}|I|}\le n \le 2^{\frac{1}{c_1}|I|},
    $$

    since $x\mapsto 2^x$ is strictly increasing and $2^{\log_2 n}=n$. If $S(n)=\Theta(n)$, there exist constants $a_1,a_2>0$ such that $a_1 n \le S(n) \le a_2 n$ for all sufficiently large $n$, and therefore

    $$
    a_1\, 2^{\frac{1}{c_2}|I|}
    \le
    S(n)
    \le
    a_2\, 2^{\frac{1}{c_1}|I|},
    \qquad\text{that is,}\qquad
    T(|I|)=2^{\Theta(|I|)}.
    $$

!!! nota ""

    <strong>Rule (B): the input is an array $a[1..n]$ whose entries use a fixed constant number of bits.</strong> Then $|I|=\Theta(n)$: there exist constants $c_1,c_2>0$ such that, for all sufficiently large $n$,

    $$
    c_1 n \le |I| \le c_2 n
    \qquad\Longleftrightarrow\qquad
    \frac{1}{c_2}|I| \le n \le \frac{1}{c_1}|I|.
    $$

    If $S(n)=\Theta(n^k)$ for a constant $k\ge 1$, there exist constants $a_1,a_2>0$ such that $a_1 n^k \le S(n) \le a_2 n^k$ for all sufficiently large $n$, and therefore

    $$
    \frac{a_1}{c_2^{k}}\,|I|^k
    \le
    S(n)
    \le
    \frac{a_2}{c_1^{k}}\,|I|^k,
    \qquad\text{that is,}\qquad
    T(|I|)=\Theta(|I|^k).
    $$

<a id="esercizio-8-1"></a>

!!! esercizio "Exercise 8.1: Running time (E1)"

    Consider the following algorithm, whose input is a natural number $n$.

    !!! algoritmo "Algorithm: Algorithm 1"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(m&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm1(n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m := 0&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m &#92;leftarrow m+2&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(m&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm adds $2$ to $m$ exactly $n$ times, starting from $m=0$: it determines the double of $n$, that is $2n$.

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm1</code>, where $n$ is the natural number given in input. There is only one input for each value of $n$, so this is also the worst case. The body of the loop is executed for $i=1,2,\dots,n$, that is $n$ times, and the condition of line [4](#riga-ex-08-running-time-l-c) is evaluated $n+1$ times:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n+1&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        S(n)=1+1+(n+1)+n+n+1=3n+4=\Theta(n).
        $$

        We now express the running time as a function of the input size. The input is the natural number $n$, hence $|I|=\Theta(\log_2 n)$, and $S(n)=3n+4=\Theta(n)$. By rule (A) of the introduction to the exercises, there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        a_1\, 2^{\frac{1}{c_2}|I|}
        \le
        S(n)
        \le
        a_2\, 2^{\frac{1}{c_1}|I|},
        \qquad\text{hence}\qquad
        T(|I|)=2^{\Theta(|I|)}.
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm1</code>, as a function of the input size $|I|$, is $T(|I|)=2^{\Theta(|I|)}$: it is <strong>exponential</strong> in $|I|$, although the number of steps is linear in the value $n$.

<a id="esercizio-8-2"></a>

!!! esercizio "Exercise 8.2: Running time (E2)"

    Consider the following algorithm, whose input is a natural number $n$.

    !!! algoritmo "Algorithm: Algorithm 2"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(m&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm2(n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(n &#92;bmod 2 = 0&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m := 0&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m &#92;leftarrow m+2&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>else</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m := n&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-h"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(m&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm returns the double $2n$ of $n$ if $n$ is even. If $n$ is odd, it returns $n$ unchanged.

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm2</code>, where $n$ is the natural number given in input. The execution of lines [3](#riga-ex-08-running-time-l-b)–[7](#riga-ex-08-running-time-l-f) depends on the specific input value $n$: before executing the algorithm, we do not know whether $n$ is even or odd. We define a function

        $$
        t:\N\to\{0,1\},
        $$

        where $t(n)=1$ if $n \bmod 2 = 0$, and $t(n)=0$ otherwise. In other words, $t(n)$ is an oracle that tells us whether the input number $n$ is even. The number of times each line is executed is:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(t(n)&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(t(n)&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(t(n)&#92;,(n+1)&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(t(n)&#92;,n&#92;)</span></td>
        </tr>
        <tr>
        <td>[7](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(t(n)&#92;,n&#92;)</span></td>
        </tr>
        <tr>
        <td>[10](#riga-ex-08-running-time-l-g)</td>
        <td><span class="arithmatex">&#92;(1-t(n)&#92;)</span></td>
        </tr>
        <tr>
        <td>[12](#riga-ex-08-running-time-l-h)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        1+t(n)+t(n)+t(n)(n+1)+t(n)\,n+t(n)\,n+\big(1-t(n)\big)+1=3n\,t(n)+2\,t(n)+3.
        $$

        The worst possible case is when $n$ is even: then $t(n)=1$ and the algorithm executes $3n+5$ steps, while for $n$ odd it executes only $3$ steps. Every input size of at least two bits is the size of some even numbers, so in the worst case

        $$
        S(n)=3n+5=\Theta(n).
        $$

        We now express the running time as a function of the input size. The input is the natural number $n$, hence $|I|=\Theta(\log_2 n)$, and $S(n)=3n+5=\Theta(n)$. By rule (A) of the introduction to the exercises, there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        a_1\, 2^{\frac{1}{c_2}|I|}
        \le
        S(n)
        \le
        a_2\, 2^{\frac{1}{c_1}|I|},
        \qquad\text{hence}\qquad
        T(|I|)=2^{\Theta(|I|)}.
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm2</code>, as a function of the input size $|I|$, is $T(|I|)=2^{\Theta(|I|)}$: it is <strong>exponential</strong> in $|I|$, although the number of steps is linear in the value $n$.

<a id="esercizio-8-3"></a>

!!! esercizio "Exercise 8.3: Running time (E3)"

    Consider the following algorithm, whose input is a natural number $n$.

    !!! algoritmo "Algorithm: Algorithm 3"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(s&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm3(n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s := 0&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s &#92;leftarrow s+i&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(s&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm determines the sum of the first $n$ positive natural numbers:

        $$
        1+2+\cdots+n=\frac{n(n+1)}{2}.
        $$

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm3</code>, where $n$ is the natural number given in input (there is only one input for each value of $n$). The body of the loop is executed $n$ times and its condition $n+1$ times:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n+1&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        S(n)=1+1+(n+1)+n+n+1=3n+4=\Theta(n).
        $$

        We now express the running time as a function of the input size. The input is the natural number $n$, hence $|I|=\Theta(\log_2 n)$, and $S(n)=3n+4=\Theta(n)$. By rule (A) of the introduction to the exercises, there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        a_1\, 2^{\frac{1}{c_2}|I|}
        \le
        S(n)
        \le
        a_2\, 2^{\frac{1}{c_1}|I|},
        \qquad\text{hence}\qquad
        T(|I|)=2^{\Theta(|I|)}.
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm3</code>, as a function of the input size $|I|$, is $T(|I|)=2^{\Theta(|I|)}$: it is <strong>exponential</strong> in $|I|$, although the number of steps is linear in the value $n$.

<a id="esercizio-8-4"></a>

!!! esercizio "Exercise 8.4: Running time (E4)"

    Consider the following algorithm, whose input is a natural number $n$.

    !!! algoritmo "Algorithm: Algorithm 4"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(p&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm4(n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(p := 1&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(p &#92;leftarrow p &#92;cdot i&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(p&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm determines the product

        $$
        1\cdot 2\cdot \ldots \cdot n=n!
        $$

        (with $0!=1$, returned for $n=0$).

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm4</code>, where $n$ is the natural number given in input (there is only one input for each value of $n$). The body of the loop is executed $n$ times and its condition $n+1$ times:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n+1&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        S(n)=1+1+(n+1)+n+n+1=3n+4=\Theta(n).
        $$

        We now express the running time as a function of the input size. The input is the natural number $n$, hence $|I|=\Theta(\log_2 n)$, and $S(n)=3n+4=\Theta(n)$. By rule (A) of the introduction to the exercises, there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        a_1\, 2^{\frac{1}{c_2}|I|}
        \le
        S(n)
        \le
        a_2\, 2^{\frac{1}{c_1}|I|},
        \qquad\text{hence}\qquad
        T(|I|)=2^{\Theta(|I|)}.
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm4</code>, as a function of the input size $|I|$, is $T(|I|)=2^{\Theta(|I|)}$: it is <strong>exponential</strong> in $|I|$, although the number of steps is linear in the value $n$.

<a id="esercizio-8-5"></a>

!!! esercizio "Exercise 8.5: Running time (E5)"

    Consider the following algorithm, whose input is a natural number $n$.

    !!! algoritmo "Algorithm: Algorithm 5"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(c&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm5(n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c := 0&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(i &#92;bmod 2 = 0&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c &#92;leftarrow c+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(c&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm determines how many natural numbers between $1$ and $n$ are even, that is $\lfloor n/2\rfloor$.

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm5</code>, where $n$ is the natural number given in input. Line [6](#riga-ex-08-running-time-l-e) is executed only when $i$ is even, that is $\lfloor n/2\rfloor$ times. The number of times each line is executed is:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n+1&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(&#92;lfloor n/2&#92;rfloor&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[10](#riga-ex-08-running-time-l-g)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        S(n)=1+1+(n+1)+n+\lfloor n/2\rfloor+n+1=3n+\lfloor n/2\rfloor+4.
        $$

        Since $\frac{n-1}{2}\le\lfloor n/2\rfloor\le \frac{n}{2}$, we have $\frac{7}{2}n+\frac{7}{2}\le S(n)\le \frac{7}{2}n+4$, hence $S(n)=\Theta(n)$.

        We now express the running time as a function of the input size. The input is the natural number $n$, hence $|I|=\Theta(\log_2 n)$, and $S(n)=3n+\lfloor n/2\rfloor+4=\Theta(n)$. By rule (A) of the introduction to the exercises, there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        a_1\, 2^{\frac{1}{c_2}|I|}
        \le
        S(n)
        \le
        a_2\, 2^{\frac{1}{c_1}|I|},
        \qquad\text{hence}\qquad
        T(|I|)=2^{\Theta(|I|)}.
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm5</code>, as a function of the input size $|I|$, is $T(|I|)=2^{\Theta(|I|)}$: it is <strong>exponential</strong> in $|I|$, although the number of steps is linear in the value $n$.

<a id="esercizio-8-6"></a>

!!! esercizio "Exercise 8.6: Running time (E6)"

    Consider the following algorithm, whose input is a natural number $n$.

    !!! algoritmo "Algorithm: Algorithm 6"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>A natural number <span class="arithmatex">&#92;(n&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(q&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm6(n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(q := 0&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(q &#92;leftarrow q+n&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(q&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm adds $n$ to $q$ exactly $n$ times, starting from $q=0$: it determines $n\cdot n=n^2$.

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm6</code>, where $n$ is the natural number given in input (there is only one input for each value of $n$). The body of the loop is executed $n$ times and its condition $n+1$ times:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n+1&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        S(n)=1+1+(n+1)+n+n+1=3n+4=\Theta(n).
        $$

        We now express the running time as a function of the input size. The input is the natural number $n$, hence $|I|=\Theta(\log_2 n)$, and $S(n)=3n+4=\Theta(n)$. By rule (A) of the introduction to the exercises, there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        a_1\, 2^{\frac{1}{c_2}|I|}
        \le
        S(n)
        \le
        a_2\, 2^{\frac{1}{c_1}|I|},
        \qquad\text{hence}\qquad
        T(|I|)=2^{\Theta(|I|)}.
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm6</code>, as a function of the input size $|I|$, is $T(|I|)=2^{\Theta(|I|)}$: it is <strong>exponential</strong> in $|I|$, although the number of steps is linear in the value $n$.

<a id="esercizio-8-7"></a>

!!! esercizio "Exercise 8.7: Running time (E7)"

    Consider the following algorithm, whose input is an array $a[1..n]$ of $n$ integer numbers.

    !!! algoritmo "Algorithm: Algorithm 7"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> integer numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>An integer number <span class="arithmatex">&#92;(s&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm7(a, n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s := 0&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; 0&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s &#92;leftarrow s+a&#91;i&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(s&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm determines the sum of the positive values in the array $a[1..n]$.

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm7</code> in the worst case, where $n$ is the size of the array. The execution of line [6](#riga-ex-08-running-time-l-e) depends on the input array. We define a function

        $$
        t:\{1,2,\dots,n\}\to\{0,1\},
        $$

        where $t(i)=1$ if $a[i]>0$, and $t(i)=0$ otherwise. The number of times each line is executed is:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n+1&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(&#92;sum&#95;{i=1}^{n}t(i)&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[10](#riga-ex-08-running-time-l-g)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        1+1+(n+1)+n+\sum_{i=1}^{n}t(i)+n+1=3n+4+\sum_{i=1}^{n}t(i).
        $$

        The worst possible case is when all entries are positive. Then $t(i)=1$ for every $i \in \{1,2,\dots,n\}$, and

        $$
        S(n)=3n+4+\sum_{i=1}^{n}1=4n+4=\Theta(n).
        $$

        We now express the running time as a function of the input size. If all input values use a fixed constant number of bits, then $|I|=\Theta(n)$, and $S(n)=\Theta(n)$. By rule (B) of the introduction to the exercises (with $k=1$), there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        \frac{a_1}{c_2}\,|I|
        \le
        S(n)
        \le
        \frac{a_2}{c_1}\,|I|,
        \qquad\text{hence}\qquad
        T(|I|)=\Theta(|I|).
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm7</code>, as a function of the input size $|I|$, is $T(|I|)=\Theta(|I|)$: it is <strong>linear</strong> in $|I|$.

<a id="esercizio-8-8"></a>

!!! esercizio "Exercise 8.8: Running time (E8)"

    Consider the following algorithm, whose input is an array $a[1..n]$ of $n$ integer numbers.

    !!! algoritmo "Algorithm: Algorithm 8"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> integer numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(c&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm8(a, n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c := 0&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &#92;bmod 2 = 0&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c &#92;leftarrow c+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(c&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm determines the number of even values in the array $a[1..n]$.

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm8</code> in the worst case, where $n$ is the size of the array. The execution of line [6](#riga-ex-08-running-time-l-e) depends on the input array. We define a function

        $$
        t:\{1,2,\dots,n\}\to\{0,1\},
        $$

        where $t(i)=1$ if $a[i] \bmod 2 = 0$, and $t(i)=0$ otherwise. The number of times each line is executed is:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n+1&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(&#92;sum&#95;{i=1}^{n}t(i)&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[10](#riga-ex-08-running-time-l-g)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        1+1+(n+1)+n+\sum_{i=1}^{n}t(i)+n+1=3n+4+\sum_{i=1}^{n}t(i).
        $$

        The worst possible case is when all entries are even. Then $t(i)=1$ for every $i \in \{1,2,\dots,n\}$, and

        $$
        S(n)=3n+4+\sum_{i=1}^{n}1=4n+4=\Theta(n).
        $$

        We now express the running time as a function of the input size. If all input values use a fixed constant number of bits, then $|I|=\Theta(n)$, and $S(n)=\Theta(n)$. By rule (B) of the introduction to the exercises (with $k=1$), there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        \frac{a_1}{c_2}\,|I|
        \le
        S(n)
        \le
        \frac{a_2}{c_1}\,|I|,
        \qquad\text{hence}\qquad
        T(|I|)=\Theta(|I|).
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm8</code>, as a function of the input size $|I|$, is $T(|I|)=\Theta(|I|)$: it is <strong>linear</strong> in $|I|$.

<a id="esercizio-8-9"></a>

!!! esercizio "Exercise 8.9: Running time (E9)"

    Consider the following algorithm, whose input is an array $a[1..n]$ of $n \ge 1$ integer numbers.

    !!! algoritmo "Algorithm: Algorithm 9"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>An integer number <span class="arithmatex">&#92;(m&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm9(a, n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m := a&#91;1&#93;&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 2&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &lt; m&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m &#92;leftarrow a&#91;i&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-g"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(m&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm determines the minimum value in the array $a[1..n]$.

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm9</code> in the worst case, where $n$ is the size of the array. The body of the loop is executed for $i=2,3,\dots,n$, that is $n-1$ times. We define

        $$
        t:\{2,3,\dots,n\}\to\{0,1\},
        $$

        where $t(i)=1$ if line [6](#riga-ex-08-running-time-l-e) is executed at iteration $i$, and $t(i)=0$ otherwise. The number of times each line is executed is:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(&#92;sum&#95;{i=2}^{n}t(i)&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
        </tr>
        <tr>
        <td>[10](#riga-ex-08-running-time-l-g)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        1+1+n+(n-1)+\sum_{i=2}^{n}t(i)+(n-1)+1=3n+1+\sum_{i=2}^{n}t(i).
        $$

        The worst possible case is when

        $$
        a[1]>a[2]>\cdots>a[n].
        $$

        Then $t(i)=1$ for every $i\in\{2,3,\dots,n\}$, and

        $$
        S(n)=3n+1+\sum_{i=2}^{n}1=3n+1+(n-1)=4n=\Theta(n).
        $$

        We now express the running time as a function of the input size. If all input values use a fixed constant number of bits, then $|I|=\Theta(n)$, and $S(n)=\Theta(n)$. By rule (B) of the introduction to the exercises (with $k=1$), there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        \frac{a_1}{c_2}\,|I|
        \le
        S(n)
        \le
        \frac{a_2}{c_1}\,|I|,
        \qquad\text{hence}\qquad
        T(|I|)=\Theta(|I|).
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm9</code>, as a function of the input size $|I|$, is $T(|I|)=\Theta(|I|)$: it is <strong>linear</strong> in $|I|$.

<a id="esercizio-8-10"></a>

!!! esercizio "Exercise 8.10: Running time (E10)"

    Consider the following algorithm, whose input is an array $a[1..n]$ of $n \ge 1$ integer numbers.

    !!! algoritmo "Algorithm: Algorithm 10"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span><code>true</code> or <code>false</code></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm10(a, n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &lt; n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93;=a&#91;i+1&#93;&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>true</code></span></span></div>
        <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <code>false</code></span></span></div>
        <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm determines whether the array contains two consecutive equal values: it returns <code>true</code> if $a[i]=a[i+1]$ for some $i\in\{1,2,\dots,n-1\}$, and <code>false</code> otherwise.

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm10</code> in the worst case, where $n$ is the size of the array. If the first pair of consecutive equal values is found at iteration $k$, the algorithm stops at line [5](#riga-ex-08-running-time-l-d) after $1+k+k+(k-1)+1=3k+1\le 3(n-1)+1$ steps. The worst possible case is therefore when no two consecutive values are equal: line [5](#riga-ex-08-running-time-l-d) is never executed, and the algorithm checks all the $n-1$ consecutive pairs. The number of times each line is executed in this case is:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        </tr>
        <tr>
        <td>[7](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
        </tr>
        <tr>
        <td>[9](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        S(n)=1+n+(n-1)+(n-1)+1=3n=\Theta(n).
        $$

        (and $3n>3(n-1)+1$, so this is indeed the worst case).

        We now express the running time as a function of the input size. If all input values use a fixed constant number of bits, then $|I|=\Theta(n)$, and $S(n)=\Theta(n)$. By rule (B) of the introduction to the exercises (with $k=1$), there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        \frac{a_1}{c_2}\,|I|
        \le
        S(n)
        \le
        \frac{a_2}{c_1}\,|I|,
        \qquad\text{hence}\qquad
        T(|I|)=\Theta(|I|).
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm10</code>, as a function of the input size $|I|$, is $T(|I|)=\Theta(|I|)$: it is <strong>linear</strong> in $|I|$.

<a id="esercizio-8-11"></a>

!!! esercizio "Exercise 8.11: Running time (E11)"

    Consider the following algorithm, whose input is an array $a[1..n]$ of $n \ge 1$ integer numbers.

    !!! algoritmo "Algorithm: Algorithm 11"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>A natural number <span class="arithmatex">&#92;(c&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> Algorithm11(a, n)</span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c := 0&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-c"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;leq n-1&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-d"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := i+1&#92;)</span></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-e"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;leq n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-f"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &lt; a&#91;j&#93;&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-g"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(c &#92;leftarrow c+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-h"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j &#92;leftarrow j+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-i"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span></span></div>
        <div class="pc-riga" id="riga-ex-08-running-time-l-j"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(c&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What does the algorithm determine?

    2. Determine the worst-case running time of the algorithm.

??? soluzione "Solution"

    1. The algorithm determines the number of pairs of positions $(i,j)$, with $1\leq i<j\leq n$, such that

        $$
        a[i]<a[j].
        $$

    2. Let $S(n)$ denote the number of steps executed by <code>Algorithm11</code> in the worst case, where $n$ is the size of the array. The outer loop is executed for $i=1,2,\dots,n-1$ (its condition is evaluated $n$ times), and for each $i$ the inner loop is executed for $j=i+1,\dots,n$, that is $n-i$ times (its condition is evaluated $n-i+1$ times). Hence the body of the inner loop is executed once for every pair $(i,j)$ with $1\le i<j\le n$, and the number of such pairs is

        $$
        P=(n-1)+(n-2)+\cdots+1=\frac{n(n-1)}{2}.
        $$

        We define $t(i,j)=1$ if line [8](#riga-ex-08-running-time-l-g) is executed for the pair $(i,j)$, and $t(i,j)=0$ otherwise. The number of times each line is executed is:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>line</th>
        <th>number of executions</th>
        </tr>
        <tr>
        <td>[2](#riga-ex-08-running-time-l-a)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[3](#riga-ex-08-running-time-l-b)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        <tr>
        <td>[4](#riga-ex-08-running-time-l-c)</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        </tr>
        <tr>
        <td>[5](#riga-ex-08-running-time-l-d)</td>
        <td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
        </tr>
        <tr>
        <td>[6](#riga-ex-08-running-time-l-e)</td>
        <td><span class="arithmatex">&#92;(&#92;sum&#95;{i=1}^{n-1}(n-i+1)=P+(n-1)&#92;)</span></td>
        </tr>
        <tr>
        <td>[7](#riga-ex-08-running-time-l-f)</td>
        <td><span class="arithmatex">&#92;(P&#92;)</span></td>
        </tr>
        <tr>
        <td>[8](#riga-ex-08-running-time-l-g)</td>
        <td><span class="arithmatex">&#92;(&#92;sum&#95;{1&#92;le i&lt;j&#92;le n}t(i,j)&#92;)</span></td>
        </tr>
        <tr>
        <td>[10](#riga-ex-08-running-time-l-h)</td>
        <td><span class="arithmatex">&#92;(P&#92;)</span></td>
        </tr>
        <tr>
        <td>[12](#riga-ex-08-running-time-l-i)</td>
        <td><span class="arithmatex">&#92;(n-1&#92;)</span></td>
        </tr>
        <tr>
        <td>[14](#riga-ex-08-running-time-l-j)</td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        </tr>
        </table></div>

        Therefore, the total number of steps is

        $$
        1+1+n+(n-1)+\big(P+(n-1)\big)+P+\sum_{1\le i<j\le n}t(i,j)+P+(n-1)+1=4n+3P+\sum_{1\le i<j\le n}t(i,j).
        $$

        The worst possible case for line [8](#riga-ex-08-running-time-l-g) is when

        $$
        a[1]<a[2]<\cdots<a[n]:
        $$

        then $t(i,j)=1$ for every pair, and

        $$
        S(n)=4n+4P=4n+2n(n-1)=2n^2+2n=\Theta(n^2).
        $$

        For example, for $n=4$ and $a[1..4]=(1,2,3,4)$ the algorithm returns $c=6$ after $S(4)=2\cdot 16+8=40$ steps.

        We now express the running time as a function of the input size. If all input values use a fixed constant number of bits, then $|I|=\Theta(n)$, and $S(n)=\Theta(n^2)$. By rule (B) of the introduction to the exercises (with $k=2$), there exist constants $a_1,a_2,c_1,c_2>0$ such that, for all sufficiently large $n$,

        $$
        \frac{a_1}{c_2^{2}}\,|I|^2
        \le
        S(n)
        \le
        \frac{a_2}{c_1^{2}}\,|I|^2,
        \qquad\text{hence}\qquad
        T(|I|)=\Theta(|I|^2).
        $$

        !!! chiave ""

            The worst-case running time of <code>Algorithm11</code>, as a function of the input size $|I|$, is $T(|I|)=\Theta(|I|^2)$: it is <strong>quadratic</strong> in $|I|$.
