---
title: "Exercises · Representation of numbers"
---

# Exercises · Representation of numbers

<div class="info-capitolo" markdown>

**Exercises · Chapter 1** · each solution opens with a click · [:material-book-open-variant: Chapter 1: Representation of numbers](../basic-algorithms/01-number-representation.md) · [:material-file-pdf-box: Exercises, volume 1 (PDF)](../pdf/exercises-1-basic-algorithms.pdf)

</div>

In the exercises of this chapter numbers are represented only with the definitions and observations of the chapter «Representation of numbers», summarized by the following formulas.

!!! nota ""

    <strong>Natural numbers</strong> with $k$ digits in base $b$:

    \begin{align*}
    (d_{k-1} \dots d_1 d_0)_b &= \sum_{i=0}^{k-1} d_i\, b^i
    && \text{(value of a sequence of digits)}\\[1ex]
    &[0,\, b^k-1]
    && \text{(representation interval)}\\[1ex]
    &\lfloor \log_b n \rfloor + 1
    && \text{(minimum number of digits of } n \ge 1\text{)}
    \end{align*}

!!! nota ""

    <strong>Integer numbers</strong> with $k$ bits:

    \begin{align*}
    &\big[-(2^{k-1}-1),\, 2^{k-1}-1\big]
    && \text{(sign-magnitude interval)}\\[1ex]
    &\big[-2^{k-1},\, 2^{k-1}-1\big]
    && \text{(two's complement interval)}\\[1ex]
    &n < 0 \;\longmapsto\; 2^k + n
    && \text{(two's complement of a negative } n\text{)}
    \end{align*}

    In two's complement, the representation of a negative $n$ is also obtained by inverting the bits of $|n|$ and adding $1$; a sum overflows if and only if two operands with the same sign give a result with the opposite sign bit.

!!! nota ""

    <strong>Real numbers</strong> in IEEE 754 single precision ($1$ sign bit $s$, $8$ bits of biased exponent $E$, $23$ bits of fraction $f$), for $1 \le E \le 254$:

    $$
    x = (-1)^{s} \cdot (1.f_1 f_2 \dots f_{23})_2 \cdot 2^{E - 127}
    $$

    Double precision: $1 + 11 + 52$ bits, bias $1023$.

<a id="esercizio-1-1"></a>

!!! esercizio "Exercise 1.1: Representation of numbers (E1)"

    Consider the representation of natural numbers in the binary system (base $b=2$): representation intervals and minimum number of digits.

    **Questions**

    1. Compute the largest natural number that can be represented with $k=6$ digits in binary and determine the associated representation interval.

    2. For the following values of $k$ (number of digits), determine the representation interval $[0, b^k-1]$ in base $b=2$:

        $$
        k=4, \qquad k=8, \qquad k=10, \qquad k=16
        $$

    3. Determine the minimum number of digits needed to represent each of the following numbers in binary, using the formula $\lfloor \log_b n\rfloor +1$:

        $$
        n=64, \qquad n=128, \qquad n=256, \qquad n=512
        $$

    4. Given $k=12$ bits:

        1. determine the representation interval;

        2. verify that $n=2{,}048$ can be represented with $k=12$ bits;

        3. compute the minimum number of bits needed to represent $n=2{,}048$.

??? soluzione "Solution"

    1. The largest natural number that can be represented with $k=6$ digits in base $b=2$ is:

        $$
        b^k - 1 = 2^6 - 1 = 64 - 1 = 63
        $$

        This corresponds to the binary sequence $(111111)_2$. The associated representation interval is:

        $$
        [0, 2^6 - 1] = [0, 63]
        $$

    2. Representation intervals for the different values of $k$:

        \begin{align*}
        k=4: &\quad [0, 2^4-1] = [0, 16-1] = [0, 15]\\[1ex]
        k=8: &\quad [0, 2^8-1] = [0, 256-1] = [0, 255]\\[1ex]
        k=10: &\quad [0, 2^{10}-1] = [0, 1{,}024-1] = [0, 1{,}023]\\[1ex]
        k=16: &\quad [0, 2^{16}-1] = [0, 65{,}536-1] = [0, 65{,}535]
        \end{align*}

    3. The minimum number of digits for each number:

        \begin{align*}
        n=64 = 2^6: &\quad \lfloor \log_2 64\rfloor +1 = \lfloor 6 \rfloor +1 = 6 + 1 = 7\\[1ex]
        n=128 = 2^7: &\quad \lfloor \log_2 128\rfloor +1 = \lfloor 7 \rfloor +1 = 7 + 1 = 8\\[1ex]
        n=256 = 2^8: &\quad \lfloor \log_2 256\rfloor +1 = \lfloor 8 \rfloor +1 = 8 + 1 = 9\\[1ex]
        n=512 = 2^9: &\quad \lfloor \log_2 512\rfloor +1 = \lfloor 9 \rfloor +1 = 9 + 1 = 10
        \end{align*}

        For powers of $2$, i.e., $n=2^m$, we have $\log_2 n = m$, and therefore the minimum number of bits is $m+1$.

    4. For $k=12$ bits:

        1. the representation interval is:

            $$
            [0, 2^{12}-1] = [0, 4{,}096-1] = [0, 4{,}095]
            $$

        2. since $n=2{,}048 = 2^{11}$ and $2{,}048 \le 4{,}095$, we have $2{,}048 \in [0, 4{,}095]$: the number $n=2{,}048$ can be represented with $k=12$ bits;

        3. the minimum number of bits needed to represent $n=2{,}048 = 2^{11}$ is:

            $$
            \lfloor \log_2 2{,}048\rfloor +1 = \lfloor 11 \rfloor +1 = 12
            $$

        We need exactly $12$ bits to represent $2{,}048 = 2^{11}$, because its binary representation is one digit $1$ followed by eleven digits $0$:

        $$
        2{,}048 = (100000000000)_2
        $$

<a id="esercizio-1-2"></a>

!!! esercizio "Exercise 1.2: Representation of numbers (E2)"

    Consider the representation intervals and the minimum number of digits of natural numbers in the binary system (base $b=2$).

    **Questions**

    1. Complete the following table of representation intervals in binary:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(k&#92;)</span> (digits)</th>
        <th><span class="arithmatex">&#92;(b&#92;)</span> (base)</th>
        <th><span class="arithmatex">&#92;(b^k-1&#92;)</span></th>
        <th>representation interval</th>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>8</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>10</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>12</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        </table></div>

    2. For each natural number $n$ in the table below, compute the minimum number of digits needed to represent it in base $b=2$, using the formula $\lfloor \log_b n\rfloor +1$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;log&#95;b n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;b n&#92;rfloor +1&#92;)</span></th>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>15</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>31</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>100</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>255</td>
        <td>2</td>
        <td></td>
        <td></td>
        </tr>
        </table></div>

    3. Using the relationship between bytes and bits, complete the table:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>bytes</th>
        <th>bits (<span class="arithmatex">&#92;(k&#92;)</span>)</th>
        <th><span class="arithmatex">&#92;(2^k&#92;)</span></th>
        <th>representation interval</th>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(2^8=256&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#91;0,255&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td>4</td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
        </table></div>

    4. Convert $(11011011)_2$ to base ten, writing the complete sum $\sum_{i=0}^{k-1} d_i \cdot 2^i$.

??? soluzione "Solution"

    1. Representation intervals in binary:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(k&#92;)</span> (digits)</th>
        <th><span class="arithmatex">&#92;(b&#92;)</span> (base)</th>
        <th><span class="arithmatex">&#92;(b^k-1&#92;)</span></th>
        <th>representation interval</th>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(2^5-1=31&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#91;0,31&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(2^8-1=255&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#91;0,255&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(2^{10}-1=1{,}023&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#91;0,1{,}023&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>12</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(2^{12}-1=4{,}095&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#91;0,4{,}095&#93;&#92;)</span></td>
        </tr>
        </table></div>

    2. Minimum number of digits for each natural number:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">&#92;(n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;log&#95;b n&#92;)</span></th>
        <th><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;b n&#92;rfloor +1&#92;)</span></th>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;log&#95;2 7 &#92;approx 2.807&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;lfloor 2.807 &#92;rfloor +1 = 3&#92;)</span></td>
        </tr>
        <tr>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;log&#95;2 15 &#92;approx 3.907&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;lfloor 3.907 &#92;rfloor +1 = 4&#92;)</span></td>
        </tr>
        <tr>
        <td>31</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;log&#95;2 31 &#92;approx 4.954&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;lfloor 4.954 &#92;rfloor +1 = 5&#92;)</span></td>
        </tr>
        <tr>
        <td>100</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;log&#95;2 100 &#92;approx 6.644&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;lfloor 6.644 &#92;rfloor +1 = 7&#92;)</span></td>
        </tr>
        <tr>
        <td>255</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(&#92;log&#95;2 255 &#92;approx 7.994&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;lfloor 7.994 &#92;rfloor +1 = 8&#92;)</span></td>
        </tr>
        </table></div>

        For the numbers of the form $2^k - 1$ we need exactly $k$ bits: $2^k-1$ is the largest natural number with $k$ bits.

    3. Since $1$ byte $= 8$ bits:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>bytes</th>
        <th>bits (<span class="arithmatex">&#92;(k&#92;)</span>)</th>
        <th><span class="arithmatex">&#92;(2^k&#92;)</span></th>
        <th>representation interval</th>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td><span class="arithmatex">&#92;(2^8=256&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#91;0,255&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>16</td>
        <td><span class="arithmatex">&#92;(2^{16}=65{,}536&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#91;0,65{,}535&#93;&#92;)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>32</td>
        <td><span class="arithmatex">&#92;(2^{32}=4{,}294{,}967{,}296&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#91;0,4{,}294{,}967{,}295&#93;&#92;)</span></td>
        </tr>
        </table></div>

    4. The sequence has $k=8$ digits: $d_7=1$, $d_6=1$, $d_5=0$, $d_4=1$, $d_3=1$, $d_2=0$, $d_1=1$, $d_0=1$. Hence:

        \begin{align*}
        (11011011)_2 &= \sum_{i=0}^{7} d_i \cdot 2^i \\
        &= d_0 \cdot 2^0 + d_1 \cdot 2^1 + d_2 \cdot 2^2 + d_3 \cdot 2^3 + d_4 \cdot 2^4 + d_5 \cdot 2^5 + d_6 \cdot 2^6 + d_7 \cdot 2^7 \\
        &= 1 \cdot 1 + 1 \cdot 2 + 0 \cdot 4 + 1 \cdot 8 + 1 \cdot 16 + 0 \cdot 32 + 1 \cdot 64 + 1 \cdot 128 \\
        &= 1 + 2 + 0 + 8 + 16 + 0 + 64 + 128 \\
        &= 219
        \end{align*}

        Therefore, $(11011011)_2 = (219)_{10}$.

<a id="esercizio-1-3"></a>

!!! esercizio "Exercise 1.3: Representation of numbers (E3)"

    Consider the complete enumeration of the sequences of digits in binary for a given number of bits, and the binary representation of some natural numbers.

    **Questions**

    1. Complete the table of all the sequences of $k=5$ digits in binary (base $2$) and their decimal values. Show the detailed calculation for at least the first three and the last three sequences:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Sequence of digits</th>
        <th><span class="arithmatex">&#92;(b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(k&#92;)</span></th>
        <th>decimal representation</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00000)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00001)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00010)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00011)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((11101)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((11110)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((11111)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td></td>
        </tr>
        </table></div>

    2. How many different sequences are possible with $k=5$ bits? Verify the answer with the formula $b^k$, where $b=2$.

    3. Find the binary representation of the following decimal numbers, by determining which powers of $2$ sum to the given value:

        $$
        n=21, \qquad n=50, \qquad n=63
        $$

    4. For each sequence below, determine whether it represents a power of $2$ and, if so, which power:

        $$
        (10000)_2, \qquad (10101)_2, \qquad (100000000)_2
        $$

??? soluzione "Solution"

    1. All the sequences with $k=5$ bits:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Sequence of digits</th>
        <th><span class="arithmatex">&#92;(b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(k&#92;)</span></th>
        <th>decimal representation</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00000)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((0 &#92;cdot 2^4 + 0 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (0)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00001)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((0 &#92;cdot 2^4 + 0 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (1)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00010)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((0 &#92;cdot 2^4 + 0 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (2)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00011)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((3)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00100)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((4)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00101)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((5)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00110)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((6)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((00111)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((7)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((01000)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((8)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((01001)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((9)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></td>
        <td><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((11101)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((1 &#92;cdot 2^4 + 1 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (29)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((11110)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((1 &#92;cdot 2^4 + 1 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (30)&#95;{10}&#92;)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((11111)&#95;2&#92;)</span></td>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">&#92;((1 &#92;cdot 2^4 + 1 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (31)&#95;{10}&#92;)</span></td>
        </tr>
        </table></div>

    2. The total number of different sequences with $k=5$ bits in base $b=2$ is:

        $$
        b^k = 2^5 = 32
        $$

        Indeed, the sequences go from $(00000)_2 = 0$ to $(11111)_2 = 31$, which gives exactly $32$ different values (from $0$ to $31$ inclusive).

    3. Binary representation of the decimal numbers:

        - $n=21$: we look for the powers of $2$ that sum to $21$, starting from the largest power not greater than $21$:

            $$
            21 = 16 + 5 = 16 + 4 + 1 = 2^4 + 2^2 + 2^0
            $$

            Therefore $(21)_{10} = (10101)_2$.

        - $n=50$:

            $$
            50 = 32 + 18 = 32 + 16 + 2 = 2^5 + 2^4 + 2^1
            $$

            Therefore $(50)_{10} = (110010)_2$.

        - $n=63$:

            $$
            63 = 32 + 31 = 32 + 16 + 8 + 4 + 2 + 1 = 2^5 + 2^4 + 2^3 + 2^2 + 2^1 + 2^0
            $$

            Alternatively, $63 = 2^6 - 1$ is the largest natural number with $6$ bits, so all its $6$ bits are $1$. Therefore $(63)_{10} = (111111)_2$.

    4. Powers of $2$:

        - $(10000)_2 = 1 \cdot 2^4 + 0 \cdot 2^3 + 0 \cdot 2^2 + 0 \cdot 2^1 + 0 \cdot 2^0 = 2^4 = 16$: it is a power of $2$, namely $2^4$.

        - $(10101)_2 = 1 \cdot 2^4 + 0 \cdot 2^3 + 1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0 = 16 + 4 + 1 = 21$: it is not a power of $2$ (it is the sum of three different powers of $2$).

        - $(100000000)_2 = 1 \cdot 2^8 = 256$: it is a power of $2$, namely $2^8$.

        A sequence in binary represents a power of $2$ if and only if it has exactly one digit equal to $1$ and all the other digits equal to $0$.

<a id="esercizio-1-4"></a>

!!! esercizio "Exercise 1.4: Representation of numbers (E4)"

    Consider the two's complement representation of integer numbers in binary.

    **Questions**

    1. Determine the representation interval of the integers in two's complement with the following numbers of bits:

        $$
        k=4, \qquad k=8, \qquad k=16, \qquad k=32
        $$

    2. Complete the following table with all the two's complement representations with $k=4$ bits:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Binary</th>
        <th>Decimal</th>
        <th>Sign bit</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0000)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0001)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0010)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0011)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0100)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0101)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0110)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0111)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1000)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1001)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1010)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1011)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1100)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1101)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1110)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1111)&#95;2&#92;)</span></td>
        <td></td>
        <td></td>
        </tr>
        </table></div>

    3. Compute the two's complement representation of $-5$ with $8$ bits in three steps: (1) binary representation of $5$, (2) inversion of all the bits, (3) addition of $1$.

    4. Verify that with $k=5$ bits in two's complement we can represent the integer $-16$ but not the integer $16$.

??? soluzione "Solution"

    1. Representation intervals, with the formula $[-2^{k-1}, 2^{k-1}-1]$:

        \begin{align*}
        k=4: &\quad [-2^{4-1}, 2^{4-1}-1] = [-2^3, 2^3-1] = [-8, 7]\\[1ex]
        k=8: &\quad [-2^{8-1}, 2^{8-1}-1] = [-2^7, 2^7-1] = [-128, 127]\\[1ex]
        k=16: &\quad [-2^{16-1}, 2^{16-1}-1] = [-2^{15}, 2^{15}-1] = [-32{,}768,\, 32{,}767]\\[1ex]
        k=32: &\quad [-2^{32-1}, 2^{32-1}-1] = [-2^{31}, 2^{31}-1] = [-2{,}147{,}483{,}648,\, 2{,}147{,}483{,}647]
        \end{align*}

    2. All the two's complement representations with $k=4$ bits: a sequence with sign bit $1$ and natural value $r$ represents $r - 16$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Binary</th>
        <th>Decimal</th>
        <th>Sign bit</th>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0000)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0001)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0010)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0011)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0100)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0101)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0110)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((0111)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1000)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(8-16=-8&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1001)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(9-16=-7&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1010)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(10-16=-6&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1011)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(11-16=-5&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1100)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(12-16=-4&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1101)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(13-16=-3&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1110)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(14-16=-2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">&#92;((1111)&#95;2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(15-16=-1&#92;)</span></td>
        <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
        </tr>
        </table></div>

        The representation interval with $4$ bits is $[-8, 7]$.

    3. Two's complement representation of $-5$ with $8$ bits:

        - Step 1: binary representation of $5$ with $8$ bits: $(00000101)_2$.

        - Step 2: inversion of all the bits: $(11111010)_2$.

        - Step 3: addition of $1$ (the first row contains the carries; the carry above a column comes from the column on its right):

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>carry</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            </tr>
            <tr>
            <td></td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            </tr>
            <tr>
            <td>sum</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            </tr>
            </table></div>

        Therefore, the two's complement representation of $-5$ with $8$ bits is $(11111011)_2$. Check:

        $$
        2^8 - 5 = 256 - 5 = 251 = (11111011)_2
        $$

    4. With $k=5$ bits the representation interval is:

        $$
        [-2^{5-1}, 2^{5-1}-1] = [-2^4, 2^4-1] = [-16, 15]
        $$

        - Since $-16 \in [-16, 15]$, the integer $-16$ can be represented, and its representation is:

            $$
            2^5 - 16 = 32 - 16 = 16 = (10000)_2
            $$

        - Since $16 > 15$, we have $16 \notin [-16, 15]$: the integer $16$ cannot be represented with $5$ bits in two's complement.

        Two's complement represents one more negative integer than positive integers, because the interval $[-2^{k-1}, 2^{k-1}-1]$ is asymmetric.

<a id="esercizio-1-5"></a>

!!! esercizio "Exercise 1.5: Representation of numbers (E5)"

    Consider the addition of integer numbers in two's complement, the detection of overflows, and the comparison between sign-magnitude and two's complement.

    **Questions**

    1. Perform the following additions in two's complement with $k=5$ bits, showing the binary representations and the column addition, and verify the results:

        $$
        (-7) + 3, \qquad (-8) + 8, \qquad 5 + 6
        $$

    2. Determine whether an overflow occurs in the following additions with $k=5$ bits, and explain why:

        $$
        7 + 7, \qquad (-8) + (-8), \qquad 7 + (-8), \qquad 9 + 8
        $$

    3. Compare the sign-magnitude and the two's complement representations with $k=4$ bits:

        1. what is the representation interval of each?

        2. how many representations does zero have in each system?

        3. which system is better for arithmetic operations, and why?

    4. With $k=8$ bits in two's complement, compute the representations of $-64$ and $-128$, using the formula $2^k + n$ for the negative integers $n$.

??? soluzione "Solution"

    In the column additions, the first row contains the carries: the carry written above a column comes from the column on its right, and the leftmost column receives the carry out of the most significant position, which is discarded.

    1. With $k=5$ bits the representation interval is $[-16, 15]$.

        - $(-7) + 3 = -4$. Representations: $-7 \rightarrow 2^5 - 7 = 25 = (11001)_2$ and $3 = (00011)_2$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>carry</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            </tr>
            <tr>
            <td>sum</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            </tr>
            </table></div>

            The result $(11100)_2$ has natural value $28$, hence it represents $28 - 32 = -4$.

        - $(-8) + 8 = 0$. Representations: $-8 \rightarrow 2^5 - 8 = 24 = (11000)_2$ and $8 = (01000)_2$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>carry</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            </tr>
            <tr>
            <td>sum</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            </tr>
            </table></div>

            The result is $(00000)_2 = 0$.

        - $5 + 6 = 11$. Representations: $5 = (00101)_2$ and $6 = (00110)_2$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>carry</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>1</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            </tr>
            <tr>
            <td>sum</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            </tr>
            </table></div>

            The result is $(01011)_2 = 11$.

    2. Overflow detection with $k=5$ bits (interval $[-16, 15]$):

        - $7 + 7$ (expected $14$). Representations: $7 = (00111)_2$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>carry</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            </tr>
            <tr>
            <td>sum</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            </tr>
            </table></div>

            Result: $(01110)_2 = 14$: both operands are positive and the result is positive: no overflow ($14 \le 15$).

        - $(-8) + (-8)$ (expected $-16$). Representations: $-8 \rightarrow 2^5 - 8 = 24 = (11000)_2$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>carry</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            </tr>
            <tr>
            <td>sum</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            </tr>
            </table></div>

            Result: $(10000)_2 = -16$: both operands are negative and the result is negative: no overflow ($-16 \ge -16$). The carry out is discarded.

        - $7 + (-8)$ (expected $-1$). Representations: $7 = (00111)_2$ and $-8 \rightarrow 2^5 - 8 = 24 = (11000)_2$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>carry</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            </tr>
            <tr>
            <td>sum</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            </tr>
            </table></div>

            Result: $(11111)_2 = -1$: the operands have different signs, so an overflow cannot occur.

        - $9 + 8$ (expected $17$). Representations: $9 = (01001)_2$ and $8 = (01000)_2$.

            <div class="tabella" markdown="0"><table>
            <tr>
            <td>carry</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td></td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            </tr>
            <tr>
            <td></td>
            <td></td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            </tr>
            <tr>
            <td>sum</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            </tr>
            </table></div>

            Result: $(10001)_2 = -15$: both operands are positive, but the result has sign bit $1$: overflow. Indeed $9 + 8 = 17 > 15$ cannot be represented with $5$ bits.

        Rule: an overflow occurs only when two integers with the same sign are added and the result has the opposite sign bit.

    3. Comparison of sign-magnitude and two's complement with $k=4$ bits:

        1. representation intervals:

            \begin{align*}
            \text{sign-magnitude:} &\quad [-(2^{4-1}-1),\, 2^{4-1}-1] = [-7, 7]\\[1ex]
            \text{two's complement:} &\quad [-2^{4-1},\, 2^{4-1}-1] = [-8, 7]
            \end{align*}

            two's complement represents one more integer, $-8$;

        2. sign-magnitude has two representations of zero, $(0000)_2 = +0$ and $(1000)_2 = -0$; two's complement has only one, $(0000)_2 = 0$;

        3. two's complement is better for arithmetic operations, because:

            - zero has a unique representation;

            - addition and subtraction are performed as for natural numbers (modulo $2^k$), with the same circuits used for unsigned numbers;

            - the sign bit needs no special handling, so the circuits are simpler and more efficient.

    4. Representations with $k=8$ bits:

        \begin{align*}
        -64: &\quad 2^k + n = 2^8 + (-64) = 256 - 64 = 192 = (11000000)_2\\[1ex]
        -128: &\quad 2^k + n = 2^8 + (-128) = 256 - 128 = 128 = (10000000)_2
        \end{align*}

        The integer $-128 = -2^{8-1}$ is the smallest integer representable with $8$ bits in two's complement.

<a id="esercizio-1-6"></a>

!!! esercizio "Exercise 1.6: Representation of numbers (E6)"

    Consider the representation of real numbers in floating point, according to the IEEE 754 standard.

    **Questions**

    1. Write the real number $13.25$ in binary and in normalized binary scientific notation, and give its $32$ bits in IEEE 754 single precision.

    2. Determine the real number represented by the following $32$ bits in IEEE 754 single precision:

        $$
        0~~01111100~~01000000000000000000000
        $$

    3. Using the double precision format ($1$ bit of sign, $11$ bits of exponent with bias $1023$, $52$ bits of fraction), compute the largest finite number and the smallest positive normalized number. The values $E = 0$ and $E = 2^{11}-1 = 2{,}047$ of the biased exponent are reserved.

    4. In double precision, adding ten times the number $0.1$ to a variable initialized to $0$ gives $0.99999999999999989$ and not $1$. Explain why.

??? soluzione "Solution"

    1. Representation of $13.25$:

        - Step 1 (binary): $13.25 = 8 + 4 + 1 + 0.25 = 1 \cdot 2^3 + 1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0 + 0 \cdot 2^{-1} + 1 \cdot 2^{-2}$, hence:

            $$
            13.25 = (1101.01)_2
            $$

        - Step 2 (normalization): the point moves three positions to the left:

            $$
            (1101.01)_2 = (1.10101)_2 \cdot 2^3
            $$

            hence $s = 0$, $e = 3$ and the fraction starts with $10101$.

        - Step 3 (biased exponent): $E = e + 127 = 130 = 128 + 2 = (10000010)_2$.

        - Step 4 (fraction): $10101$ completed with zeros up to $23$ bits.

        The $32$ bits are:

        $$
        \underbrace{0}_{s}~~\underbrace{10000010}_{E}~~\underbrace{10101000000000000000000}_{f}
        $$

    2. Reading the $32$ bits:

        - Step 1 (sign): $s = 0$, the number is positive.

        - Step 2 (exponent): $E = (01111100)_2 = 64 + 32 + 16 + 8 + 4 = 124$, hence $e = E - 127 = -3$.

        - Step 3 (significand): $(1.01)_2 = 1 + 0.25 = 1.25$.

        - Step 4 (value):

            $$
            x = (-1)^0 \cdot 1.25 \cdot 2^{-3} = \frac{1.25}{8} = 0.15625
            $$

    3. In double precision a normalized number is $(-1)^s \cdot (1.f_1 f_2 \dots f_{52})_2 \cdot 2^{E - 1023}$ with $1 \le E \le 2{,}046$.

        - The largest finite number has $E = 2{,}046$, i.e., $e = 1{,}023$, and all the $52$ fraction bits equal to $1$, i.e., significand $\sum_{i=0}^{52} 2^{-i} = 2 - 2^{-52}$:

            $$
            (2 - 2^{-52}) \cdot 2^{1023} \approx 1.7976931349 \times 10^{308}
            $$

        - The smallest positive normalized number has $E = 1$, i.e., $e = -1{,}022$, and all the fraction bits equal to $0$:

            $$
            1 \cdot 2^{-1022} \approx 2.2250738585 \times 10^{-308}
            $$

    4. The decimal number $0.1$ has an infinite binary representation:

        $$
        0.1 = (0.0\,0011\,0011\,0011\dots)_2 = (1.1001\,1001\,1001\dots)_2 \cdot 2^{-4}
        $$

        so its fraction does not fit in $52$ bits and is rounded. The number actually stored is slightly different from $0.1$:

        $$
        0.1000000000000000055511151231\dots
        $$

        Moreover, the result of each addition is rounded again to the nearest number representable in double precision. The ten rounding errors accumulate, and the final result is not $1$ but:

        $$
        0.99999999999999989
        $$

        For this reason, two floating-point numbers should not be compared with the equality operator without care.
