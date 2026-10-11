---
title: "Representation of numbers"
---

# Representation of numbers

<div class="info-capitolo" markdown>

**Part 1 · Basic algorithms · Chapter 1** · [:material-file-pdf-box: Lecture notes, volume 1 (PDF)](../pdf/lecture-notes-1-basic-algorithms.pdf) · [:material-pencil: Exercises](../exercises/ex-01-number-representation.md)

</div>

## Introduction

An algorithm manipulates data, and before we can describe how an algorithm works we have to agree on how its data are written down. For numbers, this question has a precise answer: a computer stores every number as a finite sequence of symbols, and only finitely many numbers can be written with a given number of symbols. This simple fact has important consequences: every representation has a <strong>representation interval</strong>, outside of which numbers cannot be stored, and the representation of real numbers is, in general, only approximate.

In this chapter we study three representations:

- the representation of <strong>natural numbers</strong> in a positional numeral system with base $b$, in particular the binary system used by computers;

- the representation of <strong>integer numbers</strong>, first in sign-magnitude and then in two's complement, which is the representation used by modern computers;

- the representation of <strong>real numbers</strong> in floating point, according to the IEEE 754 standard.

For each representation we compute the largest and the smallest number that can be represented with a given number of digits, and the minimum number of digits needed to represent a given number.

## 1.1 Representation of natural numbers

### 1.1.1 Positional numeral systems

We are used to writing numbers in the decimal system, where the same digit has a different value depending on where it appears: in $555$ the three digits are equal, but they stand for $500$, $50$ and $5$. This is the idea of a positional numeral system.

<a id="box-1-defPNS"></a>

!!! definizione "Definition 1.1: positional numeral system"

    A <strong>positional numeral system</strong> is a way to encode the natural numbers using a <strong>sequence of digits</strong>, where each digit (single symbol) contributes differently depending on its position.

<a id="box-2-defBase"></a>

!!! definizione "Definition 1.2: base of a positional numeral system"

    The number of different digits in a positional numeral system is called the <strong>base</strong> $b$ of the system.

- The base $b$ of a positional numeral system must be greater than or equal to two.

- The unary system is not a positional numeral system: natural numbers are represented by repeating the digit $1$ as many times as necessary (e.g., $3$ is represented as $111$).

- Some of the principal positional numeral systems are:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Positional numeral system</th>
    <th>base <span class="arithmatex">&#92;(b&#92;)</span></th>
    <th>different digits</th>
    </tr>
    <tr>
    <td>Binary system</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(0,~1&#92;)</span></td>
    </tr>
    <tr>
    <td>Octal system</td>
    <td>8</td>
    <td><span class="arithmatex">&#92;(0,~1,~2,~3,~4,~5,~6,~7&#92;)</span></td>
    </tr>
    <tr>
    <td>Decimal system</td>
    <td>10</td>
    <td><span class="arithmatex">&#92;(0,~1,~2,~3,~4,~5,~6,~7,~8,~9&#92;)</span></td>
    </tr>
    <tr>
    <td>Hexadecimal system</td>
    <td>16</td>
    <td><span class="arithmatex">&#92;(0,~1,~2,~3,~4,~5,~6,~7,~8,~9,~A,~B,~C,~D,~E,~F&#92;)</span></td>
    </tr>
    </table></div>

- In the hexadecimal system the six letters $A$, $B$, $C$, $D$, $E$, $F$ are digits, with the values $10$, $11$, $12$, $13$, $14$, $15$.

<a id="box-3-defSeqDigits"></a>

!!! definizione "Definition 1.3: sequence of digits"

    A <strong>sequence of $k$ digits</strong> representing a natural number in base $b$ is denoted as:

    \begin{equation*}
    \left(
    \begin{matrix}
    d_{k-1} & d_{k-2} & \dots & d_2 & d_1 & d_0
    \end{matrix}
    \right)_b \tag{1.1}
    \end{equation*}

    where the positions are counted from right to left, starting at $0$ and increasing up to $k-1$. The <strong>Least Significant Digit</strong> (LSD) is $d_0$. The <strong>Most Significant Digit</strong> (MSD) is $d_{k-1}$.

The digit in position $i$ is multiplied by the $i$-th power of the base. Summing all these contributions we obtain the number represented by the sequence.

!!! chiave ""

    Given a sequence of $k$ digits in a positional numeral system in base $b$, the natural number it represents in base ten is given by the following sequence of digits:

    \begin{equation*}
    \label{eq:value}
    \left(~\sum_{i=0}^{k-1} d_i \; b^i ~\right)_{10} \tag{1.2}
    \end{equation*}

<a id="box-4-texexpbox1"></a>

!!! esempio "Example 1.1: sequences of digits"

    The number one hundred written in the four positional numeral systems of the table above. The value of each sequence is computed with formula $\eqref{eq:value}$, position by position, starting from the least significant digit $d_0$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Sequence of digits</th>
    <th><span class="arithmatex">&#92;(b&#92;)</span></th>
    <th><span class="arithmatex">&#92;(k&#92;)</span></th>
    <th>decimal representation</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((100)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^0 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^2)&#95;{10} = (4)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1100100)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^0 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^2 + 0 &#92;cdot 2^3 + 0 &#92;cdot 2^4 + 1 &#92;cdot 2^5 + 1 &#92;cdot 2^6)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">&#92;(= (4 + 32 + 64)&#95;{10} = (100)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((144)&#95;8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;((4 &#92;cdot 8^0 + 4 &#92;cdot 8^1 + 1 &#92;cdot 8^2)&#95;{10} = (4 + 32 + 64)&#95;{10} = (100)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((100)&#95;{10}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 10^0 + 0 &#92;cdot 10^1 + 1 &#92;cdot 10^2)&#95;{10} = (100)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((64)&#95;{16}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(16&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;((4 &#92;cdot 16^0 + 6 &#92;cdot 16^1)&#95;{10} = (4 + 96)&#95;{10} = (100)&#95;{10}&#92;)</span></td>
    </tr>
    </table></div>

    The same sequence of digits $100$ represents different numbers in different bases, and the same number needs more digits when the base is smaller.

<a id="box-5-texexpbox2"></a>

!!! esempio "Example 1.2: all the sequences of four binary digits"

    With $k=4$ binary digits we can write $2^4 = 16$ different sequences, which represent the natural numbers from $0$ to $15$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Sequence of digits</th>
    <th><span class="arithmatex">&#92;(b&#92;)</span></th>
    <th><span class="arithmatex">&#92;(k&#92;)</span></th>
    <th>decimal representation</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0000)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (0)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0001)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (1)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0010)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (2)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0011)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (3)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0100)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (4)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0101)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (5)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0110)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (6)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0111)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((0 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (7)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1000)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (8)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1001)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (9)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1010)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (10)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1011)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1 &#92;cdot 2^3 + 0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (11)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1100)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (12)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1101)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (13)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1110)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0)&#95;{10} = (14)&#95;{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1111)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;((1 &#92;cdot 2^3 + 1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0)&#95;{10} = (15)&#95;{10}&#92;)</span></td>
    </tr>
    </table></div>

!!! chiave ""

    Typically, for sequences of digits in base ten, the parentheses are omitted, and if no parentheses are present, the base is assumed to be ten.

### 1.1.2 Representation intervals

The table of [Example 1.2](#box-5-texexpbox2) stops at $15$: with four binary digits there is no way of writing $16$. In general, a fixed number $k$ of digits can only represent the natural numbers up to a certain bound, which we now compute.

<a id="box-6-obsLargestNatural"></a>

!!! teorema "Observation 1.4"

    Given $k$ digits in base $b$, the <strong>largest natural number</strong> that can be represented is:

    \begin{equation*}
    b^k-1 \tag{1.3}
    \end{equation*}

    and the associated <strong>representation interval</strong> for the natural numbers is:

    \begin{equation*}
    \big[~0,~b^k-1~ \big] \tag{1.4}
    \end{equation*}

??? dimostrazione "Proof"

    The largest natural number in base $b$ with $k$ digits consists of only the largest digit $(b-1)$ repeated $k$ times:

    $$
    \big(~(b-1)_{k-1} ~~ (b-1)_{k-2} ~~ \dots ~~ (b-1)_{1} ~~ (b-1)_{0}~\big)_b
    $$

    Accordingly, using the sum of the geometric progression $\sum_{i=0}^{k-1} b^i = \frac{b^k-1}{b-1}$ (valid since $b \ge 2$), the largest natural number in decimal is:

    $$
    \sum_{i=0}^{k-1} (b-1) \, b^i = (b-1) \sum_{i=0}^{k-1} b^i
    = (b-1)\; \frac{ b^{k}-1}{b-1}= b^{k}-1
    $$

    The smallest natural number is $0$, represented by $k$ digits equal to $0$. Every natural number between $0$ and $b^k-1$ can be represented: the $b^k$ different sequences of $k$ digits represent $b^k$ different numbers, all in the interval $[0, b^k-1]$, which contains exactly $b^k$ natural numbers. <span class="qed">□</span>

!!! chiave ""

    Digits in the binary system are called <strong>bits</strong> and $8$ bits are called a <strong>byte</strong>.

<a id="box-7-texexpbox3"></a>

!!! esempio "Example 1.3: representation intervals in binary"

    For $b=2$ the representation interval with $k$ bits is $[0, 2^k-1]$. The last three rows correspond to $1$, $2$, $4$ and $8$ bytes.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(k&#92;)</span></th>
    <th><span class="arithmatex">&#92;(b&#92;)</span></th>
    <th><span class="arithmatex">&#92;(b^k-1&#92;)</span></th>
    <th>representation interval</th>
    </tr>
    <tr>
    <td>1</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(2^1-1=1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;0,1&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>2</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(2^2-1=3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;0,3&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>3</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(2^3-1=7&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;0,7&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>4</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(2^4-1=15&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;0,15&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>8</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(2^8-1=255&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;0,255&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>16</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(2^{16}-1=65{,}535&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;0,65{,}535&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>32</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(2^{32}-1=4{,}294{,}967{,}295&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;0,4{,}294{,}967{,}295&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>64</td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(2^{64}-1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;0,2^{64}-1&#93;&#92;)</span></td>
    </tr>
    </table></div>

    <sup>1</sup> Representation interval of <code>unsigned int</code> in C and C++ (4 bytes).<br> <sup>2</sup> Representation interval of <code>unsigned long long int</code> in C and C++ (8 bytes); $2^{64}=18{,}446{,}744{,}073{,}709{,}551{,}616$.

The observation can also be read in the opposite direction: given a natural number $n$, how many digits do we need to write it?

<a id="box-8-obsMinDigits"></a>

!!! teorema "Observation 1.5"

    The minimum number of digits to write a natural number $n\ge 1$ in base $b$ is:

    \begin{equation*}
    \lfloor \log_b n\rfloor +1 \tag{1.5}
    \end{equation*}

??? dimostrazione "Proof"

    By [Observation 1.4](#box-6-obsLargestNatural), the number $n$ can be written with $k$ digits if and only if:

    $$
    n \le b^k-1 ~~~~~\Longleftrightarrow~~~~~ n < b^k ~~~~~\Longleftrightarrow~~~~~ \log_b n < k
    $$

    where the first equivalence holds because $n$ and $b^k$ are integers, and the second because the logarithm in base $b \ge 2$ is an increasing function. The smallest integer $k$ strictly greater than $\log_b n$ is $\lfloor \log_b n\rfloor +1$. Accordingly, $\lfloor \log_b n\rfloor +1$ is the minimum number of digits to write a natural number $n$ in base $b$. <span class="qed">□</span>

<a id="box-9-texexpbox4b"></a>

!!! esempio "Example 1.4: minimum number of digits of one hundred"

    We compute the minimum number of digits of $n = 100$ in base $2$ and in base $10$.

    - Step 1 (base $2$): since $2^6 = 64 \le 100 < 128 = 2^7$, we have $6 \le \log_2 100 < 7$ (indeed $\log_2 100 \approx 6.644$), hence:

        $$
        \lfloor \log_2 100\rfloor +1 = 6+1 = 7
        $$

    - Step 2 (base $10$): since $10^2 = 100$, we have $\log_{10} 100 = 2$, hence:

        $$
        \lfloor \log_{10} 100\rfloor +1 = 2+1 = 3
        $$

    Both results agree with [Example 1.1](#box-4-texexpbox1): $(1100100)_2$ has $7$ digits and $(100)_{10}$ has $3$ digits.

<a id="box-10-texexpbox4"></a>

!!! esempio "Example 1.5: minimum number of digits in binary"

    For the powers of two $n = 2^m$ we have $\log_2 n = m$, so the minimum number of bits is $m+1$: one digit $1$ followed by $m$ digits $0$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(n&#92;)</span></th>
    <th><span class="arithmatex">&#92;(b&#92;)</span></th>
    <th><span class="arithmatex">&#92;(&#92;log&#95;b n&#92;)</span></th>
    <th><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;b n&#92;rfloor +1&#92;)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2 = 2^1&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 2 = 1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 2&#92;rfloor +1=2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4 = 2^2&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 4 = 2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 4&#92;rfloor +1=3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(8 = 2^3&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 8 = 3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 8&#92;rfloor +1=4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(16 = 2^4&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 16 = 4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 16&#92;rfloor +1=5&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(32 = 2^5&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 32 = 5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 32&#92;rfloor +1=6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(64 = 2^6&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 64 = 6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 64&#92;rfloor +1=7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(128 = 2^7&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 128 = 7&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 128&#92;rfloor +1=8&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(256 = 2^8&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 256 = 8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 256&#92;rfloor +1=9&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(512 = 2^9&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 512 = 9&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 512&#92;rfloor +1=10&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1{,}024 = 2^{10}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 1{,}024 = 10&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 1{,}024&#92;rfloor +1=11&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2{,}048 = 2^{11}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 2{,}048 = 11&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 2{,}048&#92;rfloor +1=12&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4{,}096 = 2^{12}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 4{,}096 = 12&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 4{,}096&#92;rfloor +1=13&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(8{,}192 = 2^{13}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 8{,}192 = 13&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 8{,}192&#92;rfloor +1=14&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(16{,}384 = 2^{14}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 16{,}384 = 14&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 16{,}384&#92;rfloor +1=15&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(32{,}768 = 2^{15}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 32{,}768 = 15&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 32{,}768&#92;rfloor +1=16&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(65{,}536 = 2^{16}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 65{,}536 = 16&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 65{,}536&#92;rfloor +1=17&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(131{,}072 = 2^{17}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 131{,}072 = 17&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 131{,}072&#92;rfloor +1=18&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(262{,}144 = 2^{18}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 262{,}144 = 18&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 262{,}144&#92;rfloor +1=19&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(524{,}288 = 2^{19}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 524{,}288 = 19&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 524{,}288&#92;rfloor +1=20&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1{,}048{,}576 = 2^{20}&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(&#92;log&#95;2 1{,}048{,}576 = 20&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;lfloor &#92;log&#95;2 1{,}048{,}576&#92;rfloor +1=21&#92;)</span></td>
    </tr>
    </table></div>

!!! chiave ""

    <strong>Key points on natural numbers.</strong>

    - The sequence $(d_{k-1} \dots d_1 d_0)_b$ represents the natural number $\sum_{i=0}^{k-1} d_i\, b^i$.

    - With $k$ digits in base $b$ we represent exactly the $b^k$ natural numbers of the interval $[0, b^k-1]$.

    - A natural number $n \ge 1$ needs at least $\lfloor \log_b n\rfloor +1$ digits in base $b$.

## 1.2 Representation of integer numbers

Integer numbers include both positive and negative values, plus zero. With $k$ bits we still have only $2^k$ different sequences, but now we have to use them to represent the sign as well. Two approaches are studied: <strong>sign-magnitude</strong>, which is the most natural, and <strong>two's complement</strong>, which is the standard in modern computers because of its arithmetic advantages. In this section the base is always $b=2$.

### 1.2.1 Sign-magnitude representation

<a id="box-11-defSignMagnitude"></a>

!!! definizione "Definition 1.6: sign-magnitude representation"

    In the <strong>sign-magnitude representation</strong>, an integer number $n$ is represented using exactly $k \ge 2$ bits, where:

    - the most significant bit represents the <strong>sign</strong>: $0$ if $n \ge 0$ and $1$ if $n < 0$;

    - the remaining $k-1$ bits represent the <strong>magnitude</strong> $|n|$ (absolute value) in base $2$.

<a id="box-12-obsSignMagnitudeInterval"></a>

!!! teorema "Observation 1.7"

    Given $k$ bits, the <strong>largest integer number</strong> that can be represented in sign-magnitude is:

    \begin{equation*}
    2^{k-1}-1 \tag{1.6}
    \end{equation*}

    and the associated <strong>representation interval</strong> for the integer numbers is:

    \begin{equation*}
    \big[-(2^{k-1}-1),~2^{k-1}-1\big] \tag{1.7}
    \end{equation*}

??? dimostrazione "Proof"

    The magnitude is a natural number written with $k-1$ bits. By [Observation 1.4](#box-6-obsLargestNatural) with $b=2$ and $k-1$ digits, the largest magnitude consists of the digit $1$ repeated $k-1$ times:

    $$
    \sum_{i=0}^{k-2} 1 \cdot 2^i = \frac{ 2^{k-1}-1}{2-1}= 2^{k-1}-1
    $$

    With sign bit $0$ we obtain the largest integer $2^{k-1}-1$, and with sign bit $1$ the smallest integer $-(2^{k-1}-1)$. Every integer in between is represented, since its absolute value is at most $2^{k-1}-1$. <span class="qed">□</span>

<a id="box-13-texexpbox8"></a>

!!! esempio "Example 1.6: sign-magnitude with 4 bits"

    With $k=4$ bits, the first bit is the sign and the last three bits are the magnitude:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Binary</th>
    <th><span class="arithmatex">&#92;(k&#92;)</span></th>
    <th>Sign</th>
    <th>Decimal</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0000)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
    <td><span class="arithmatex">&#92;(+(0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0) = +0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0001)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
    <td><span class="arithmatex">&#92;(+(0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0) = 1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0010)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
    <td><span class="arithmatex">&#92;(+(0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0) = 2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0011)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
    <td><span class="arithmatex">&#92;(+(0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0) = 3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0100)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
    <td><span class="arithmatex">&#92;(+(1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0) = 4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0101)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
    <td><span class="arithmatex">&#92;(+(1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0) = 5&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0110)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
    <td><span class="arithmatex">&#92;(+(1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0) = 6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0111)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span> (non-negative)</td>
    <td><span class="arithmatex">&#92;(+(1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0) = 7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1000)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
    <td><span class="arithmatex">&#92;(-(0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0) = -0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1001)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
    <td><span class="arithmatex">&#92;(-(0 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0) = -1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1010)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
    <td><span class="arithmatex">&#92;(-(0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0) = -2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1011)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
    <td><span class="arithmatex">&#92;(-(0 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0) = -3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1100)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
    <td><span class="arithmatex">&#92;(-(1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 0 &#92;cdot 2^0) = -4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1101)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
    <td><span class="arithmatex">&#92;(-(1 &#92;cdot 2^2 + 0 &#92;cdot 2^1 + 1 &#92;cdot 2^0) = -5&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1110)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
    <td><span class="arithmatex">&#92;(-(1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 0 &#92;cdot 2^0) = -6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1111)&#95;2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span> (negative)</td>
    <td><span class="arithmatex">&#92;(-(1 &#92;cdot 2^2 + 1 &#92;cdot 2^1 + 1 &#92;cdot 2^0) = -7&#92;)</span></td>
    </tr>
    </table></div>

    The representation interval is $[-7, 7]$, as stated by [Observation 1.7](#box-12-obsSignMagnitudeInterval) with $2^{4-1}-1 = 7$.

The table of [Example 1.6](#box-13-texexpbox8) shows the two weak points of sign-magnitude.

- Zero has <strong>two representations</strong>: $(0000)_2 = +0$ and $(1000)_2 = -0$. Hence only $2^k-1$ different integers are represented with $2^k$ sequences.

- The addition of two integers cannot be performed as the addition of the two sequences seen as natural numbers. For example, $3 + (-1) = 2$, but adding $(0011)_2$ and $(1001)_2$ as natural numbers gives $3 + 9 = 12 = (1100)_2$, which in sign-magnitude represents $-4$. The sign bits must be handled separately, and this complicates arithmetic operations.

For these reasons sign-magnitude is not the standard representation of integers in computers.

### 1.2.2 Two's complement representation

Two's complement solves both problems: zero has a unique representation, and addition works exactly as for natural numbers.

<a id="box-14-defTwosComplement"></a>

!!! definizione "Definition 1.8: two's complement representation"

    In the <strong>two's complement representation</strong> (base $2$), an integer $n$ is represented using exactly $k$ bits as follows:

    - if $n \ge 0$, use the standard binary representation of $n$ with $k$ bits;

    - if $n < 0$, the representation of $n$ is the binary representation of the natural number $2^k+n$ with $k$ bits.

!!! chiave ""

    In two's complement, the most significant bit indicates the sign:

    - $0$: non-negative number;

    - $1$: negative number.

    To read a sequence whose most significant bit is $1$, compute its value $r$ as a natural number: the integer represented is $r - 2^k$.

- Zero has a unique representation: $(00\dots0)_2$.

- Addition and subtraction are performed in the same way as for natural numbers, modulo $2^k$.

- This is the standard representation used in modern computers.

<a id="box-15-texexpbox5"></a>

!!! esempio "Example 1.7: two's complement with 4 bits"

    With $k=4$ bits, the sequences with most significant bit $0$ represent $0, 1, \dots, 7$; the sequences with most significant bit $1$ represent their natural value minus $2^4 = 16$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Binary</th>
    <th><span class="arithmatex">&#92;(k&#92;)</span></th>
    <th>Sign</th>
    <th>Decimal</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0000)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>non-negative</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0001)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>non-negative</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0010)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>non-negative</td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0011)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>non-negative</td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0100)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>non-negative</td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0101)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>non-negative</td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0110)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>non-negative</td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((0111)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>non-negative</td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1000)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>negative</td>
    <td><span class="arithmatex">&#92;(8-16=-8&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1001)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>negative</td>
    <td><span class="arithmatex">&#92;(9-16=-7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1010)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>negative</td>
    <td><span class="arithmatex">&#92;(10-16=-6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1011)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>negative</td>
    <td><span class="arithmatex">&#92;(11-16=-5&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1100)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>negative</td>
    <td><span class="arithmatex">&#92;(12-16=-4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1101)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>negative</td>
    <td><span class="arithmatex">&#92;(13-16=-3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1110)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>negative</td>
    <td><span class="arithmatex">&#92;(14-16=-2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;((1111)&#95;2&#92;)</span></td>
    <td>4</td>
    <td>negative</td>
    <td><span class="arithmatex">&#92;(15-16=-1&#92;)</span></td>
    </tr>
    </table></div>

Figure [1.1](#box-16-fig-wheel) arranges the $16$ sequences of [Example 1.7](#box-15-texexpbox5) on a circle: moving one step clockwise adds $1$ to the natural value of the sequence, modulo $2^4=16$. The integers represented grow from $-8$ to $7$, and the only jump is between $(0111)_2 = 7$ and $(1000)_2 = -8$.

<a id="box-16-fig-wheel"></a>

![Figure 1](../img/01-number-representation/fig01.svg){ .fig loading=lazy  }

<p class="didascalia"><strong>Figure 1.1:</strong> The <span class="arithmatex">&#92;(16&#92;)</span> sequences of <span class="arithmatex">&#92;(4&#92;)</span> bits on a circle, with the integers they represent in two's complement: non-negative integers in blue (most significant bit <span class="arithmatex">&#92;(0&#92;)</span>), negative integers in red (most significant bit <span class="arithmatex">&#92;(1&#92;)</span>). The dashed mark between <span class="arithmatex">&#92;((0111)&#95;2 = 7&#92;)</span> and <span class="arithmatex">&#92;((1000)&#95;2 = -8&#92;)</span> is the only point where the integer represented jumps.</p>

Computing $2^k + n$ by a subtraction is not the only way to obtain the representation of a negative integer: the following observation gives a procedure that works directly on the bits.

<a id="box-17-obsInvertAddOne"></a>

!!! teorema "Observation 1.9"

    Let $n$ be an integer with $-2^{k-1} \le n < 0$. The two's complement representation of $n$ with $k$ bits is obtained from the binary representation of $|n|$ with $k$ bits in two steps:

    1. invert all the bits (each $0$ becomes $1$ and each $1$ becomes $0$);

    2. add $1$ to the result, as a natural number.

??? dimostrazione "Proof"

    Let $(d_{k-1} \dots d_1 d_0)_2$ be the binary representation of $|n|$ with $k$ bits. Inverting the bits gives the digits $1-d_i$, hence the natural number:

    $$
    \sum_{i=0}^{k-1} (1-d_i)\, 2^i = \sum_{i=0}^{k-1} 2^i - \sum_{i=0}^{k-1} d_i\, 2^i = (2^k - 1) - |n|
    $$

    Adding $1$ we obtain $2^k - |n| = 2^k + n$, which is the two's complement representation of $n$ by [Definition 1.8](#box-14-defTwosComplement). Since $1 \le |n| \le 2^{k-1}$, we have $2^{k-1} \le 2^k + n \le 2^k - 1$, so the result still has $k$ bits. <span class="qed">□</span>

<a id="box-18-texexpbox5b"></a>

!!! esempio "Example 1.8: two's complement of $-5$ with $8$ bits"

    We compute the representation of $n=-5$ with $k=8$ bits in both ways.

    - Step 1: binary representation of $|n| = 5$ with $8$ bits: $(00000101)_2$.

    - Step 2: invert all the bits: $(11111010)_2$, whose natural value is $250 = (2^8-1) - 5$.

    - Step 3: add $1$: $(11111010)_2 + 1 = (11111011)_2$.

    - Check with [Definition 1.8](#box-14-defTwosComplement): $2^8 + (-5) = 256 - 5 = 251 = 128+64+32+16+8+2+1 = (11111011)_2$.

### 1.2.3 Representation interval

<a id="box-19-obsTwosComplementInterval"></a>

!!! teorema "Observation 1.10"

    Given $k$ bits, the largest integer that can be represented in two's complement is:

    \begin{equation*}
    2^{k-1}-1 \tag{1.8}
    \end{equation*}

    the smallest integer that can be represented is:

    \begin{equation*}
    -2^{k-1} \tag{1.9}
    \end{equation*}

    and therefore the representation interval is:

    \begin{equation*}
    \big[-2^{k-1},\,2^{k-1}-1\big] \tag{1.10}
    \end{equation*}

??? dimostrazione "Proof"

    With $k$ bits, there are $2^k$ possible binary strings, whose natural values are $0, 1, \dots, 2^k-1$.

    The strings whose most significant bit is $0$ have natural values $0, 1, \dots, 2^{k-1}-1$ and represent the non-negative integers:

    $$
    0,1,2,\dots,2^{k-1}-1
    $$

    The strings whose most significant bit is $1$ have natural values $r = 2^{k-1}, \dots, 2^k-1$ and represent the integers $r - 2^k$, i.e., the negative integers:

    $$
    -2^{k-1},\,-2^{k-1}+1,\dots,-1
    $$

    Hence the largest representable integer is $2^{k-1}-1$, the smallest representable integer is $-2^{k-1}$, and the interval is:

    $$
    [-2^{k-1},\,2^{k-1}-1].
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

Compared with sign-magnitude, the interval contains one more integer, $-2^{k-1}$: the sequence $(10\dots0)_2$, which was $-0$ in sign-magnitude, now represents $-2^{k-1}$. All the $2^k$ sequences represent different integers.

<a id="box-20-texexpbox6"></a>

!!! esempio "Example 1.9: representation intervals in two's complement"

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(k&#92;)</span></th>
    <th><span class="arithmatex">&#92;(-2^{k-1}&#92;)</span></th>
    <th><span class="arithmatex">&#92;(2^{k-1}-1&#92;)</span></th>
    <th>representation interval</th>
    </tr>
    <tr>
    <td>1</td>
    <td><span class="arithmatex">&#92;(-1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;-1,0&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>2</td>
    <td><span class="arithmatex">&#92;(-2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;-2,1&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>3</td>
    <td><span class="arithmatex">&#92;(-4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;-4,3&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>4</td>
    <td><span class="arithmatex">&#92;(-8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;-8,7&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>8</td>
    <td><span class="arithmatex">&#92;(-128&#92;)</span></td>
    <td><span class="arithmatex">&#92;(127&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;-128,127&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>16</td>
    <td><span class="arithmatex">&#92;(-32{,}768&#92;)</span></td>
    <td><span class="arithmatex">&#92;(32{,}767&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;-32{,}768,&#92;,32{,}767&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>32</td>
    <td><span class="arithmatex">&#92;(-2{,}147{,}483{,}648&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2{,}147{,}483{,}647&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;-2{,}147{,}483{,}648,&#92;,2{,}147{,}483{,}647&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td>64</td>
    <td><span class="arithmatex">&#92;(-2^{63}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2^{63}-1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;-2^{63},&#92;,2^{63}-1&#93;&#92;)</span></td>
    </tr>
    </table></div>

    <sup>1</sup> Representation interval of <code>int</code> in C and C++ (4 bytes).<br> <sup>2</sup> Representation interval of <code>long long int</code> in C and C++ (8 bytes); $2^{63}=9{,}223{,}372{,}036{,}854{,}775{,}808$.

### 1.2.4 Minimum number of bits

<a id="box-21-obsMinBitsTwosComplement"></a>

!!! teorema "Observation 1.11"

    The minimum number of bits needed to represent an integer $n$ in two's complement is the smallest integer $k \ge 1$ such that

    \begin{equation*}
    -2^{k-1} \le n \le 2^{k-1}-1. \tag{1.11}
    \end{equation*}

??? dimostrazione "Proof"

    By [Observation 1.10](#box-19-obsTwosComplementInterval), an integer represented with $k$ bits in two's complement belongs to the interval

    $$
    [-2^{k-1},\,2^{k-1}-1],
    $$

    and every integer of this interval can be represented with $k$ bits. Therefore, the minimum number of bits required to represent $n$ is exactly the smallest $k$ for which

    $$
    -2^{k-1} \le n \le 2^{k-1}-1.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

As for the natural numbers, the condition of [Observation 1.11](#box-21-obsMinBitsTwosComplement) can be turned into an explicit formula with logarithms.

<a id="box-22-corMinBitsFormula"></a>

!!! teorema "Corollary 1.12"

    The minimum number of bits needed to represent an integer $n$ in two's complement is:

    $$
    k=
    \begin{cases}
    1 & \text{if } n=0 \text{ or } n=-1\\[1ex]
    \lfloor \log_2 n \rfloor +2 & \text{if } n>0\\[1ex]
    \lceil \log_2 |n| \rceil +1 & \text{if } n<0
    \end{cases}
    $$

??? dimostrazione "Proof"

    With $k=1$ the interval is $[-1, 0]$, which gives the first case.

    - If $n > 0$, the condition of [Observation 1.11](#box-21-obsMinBitsTwosComplement) reduces to $n \le 2^{k-1}-1$, i.e., $n < 2^{k-1}$, i.e., $\log_2 n < k-1$. The smallest integer $k-1$ strictly greater than $\log_2 n$ is $\lfloor \log_2 n \rfloor + 1$, hence $k = \lfloor \log_2 n \rfloor + 2$.

    - If $n < 0$, the condition reduces to $-2^{k-1} \le n$, i.e., $|n| \le 2^{k-1}$, i.e., $\log_2 |n| \le k-1$. The smallest integer $k-1$ greater than or equal to $\log_2 |n|$ is $\lceil \log_2 |n| \rceil$, hence $k = \lceil \log_2 |n| \rceil + 1$ (for $n=-1$ this gives $k=1$, in agreement with the first case).

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-23-texexpbox7"></a>

!!! esempio "Example 1.10: minimum number of bits in two's complement"

    The last column shows the representation of $n$ with the minimum number of bits.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(n&#92;)</span></th>
    <th>minimum number of bits</th>
    <th>representation</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-1&#92;)</span></td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td>1</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(01&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-2&#92;)</span></td>
    <td>2</td>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(010&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-4&#92;)</span></td>
    <td>3</td>
    <td><span class="arithmatex">&#92;(100&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td>4</td>
    <td><span class="arithmatex">&#92;(0100&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-8&#92;)</span></td>
    <td>4</td>
    <td><span class="arithmatex">&#92;(1000&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(8&#92;)</span></td>
    <td>5</td>
    <td><span class="arithmatex">&#92;(01000&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-16&#92;)</span></td>
    <td>5</td>
    <td><span class="arithmatex">&#92;(10000&#92;)</span></td>
    </tr>
    </table></div>

    For instance, for $n = 8$ [Corollary 1.12](#box-22-corMinBitsFormula) gives $\lfloor \log_2 8 \rfloor + 2 = 3 + 2 = 5$, and for $n=-16$ it gives $\lceil \log_2 16 \rceil + 1 = 4 + 1 = 5$.

### 1.2.5 Addition and overflow { #sez-sec-addition }

The main advantage of two's complement is that integers are added exactly as natural numbers: we add the two sequences of $k$ bits column by column, from right to left, with carries, and we discard the carry that goes out of the most significant position.

<a id="box-24-obsAddition"></a>

!!! teorema "Observation 1.13"

    Let $n_1$ and $n_2$ be two integers represented with $k$ bits in two's complement. Add their representations as natural numbers and keep only the $k$ least significant bits of the sum.

    - If $n_1 + n_2 \in [-2^{k-1}, 2^{k-1}-1]$, the result is the two's complement representation of $n_1 + n_2$.

    - Otherwise, the sum cannot be represented with $k$ bits and we have an <strong>overflow</strong>. An overflow occurs if and only if $n_1$ and $n_2$ have the same sign and the result has the opposite sign bit.

??? dimostrazione "Proof"

    Let $r_1$ and $r_2$ be the natural values of the two representations: by [Definition 1.8](#box-14-defTwosComplement), $r_j = n_j$ or $r_j = 2^k + n_j$, so $r_1 + r_2$ differs from $n_1 + n_2$ by $0$, $2^k$ or $2^{k+1}$. Keeping the $k$ least significant bits means subtracting $2^k$ when $r_1 + r_2 \ge 2^k$ (the discarded carry). Hence the result $r$ satisfies $r \in [0, 2^k-1]$ and $r - (n_1+n_2)$ is a multiple of $2^k$.

    If $n_1 + n_2 \in [-2^{k-1}, 2^{k-1}-1]$, its representation $\bar r$ also lies in $[0, 2^k-1]$ and $\bar r - (n_1+n_2)$ is $0$ or $2^k$. Then $r - \bar r$ is a multiple of $2^k$ with $|r - \bar r| \le 2^k - 1$, so $r = \bar r$.

    If $n_1$ and $n_2$ have different signs, $n_1 + n_2$ lies between $n_1$ and $n_2$, which belong to the interval: no overflow. If both are non-negative, $n_1+n_2 \in [0, 2^k-2]$, no carry is discarded and $r = n_1 + n_2$: an overflow occurs if and only if $n_1 + n_2 \ge 2^{k-1}$, i.e., if and only if the sign bit of $r$ is $1$. If both are negative, $r_1 + r_2 = 2^{k+1} + n_1 + n_2 \ge 2^k$, so $r = 2^k + n_1 + n_2$: an overflow occurs if and only if $n_1 + n_2 < -2^{k-1}$, i.e., if and only if $r < 2^{k-1}$, i.e., the sign bit of $r$ is $0$. <span class="qed">□</span>

In the examples, the first row of each addition contains the carries: the carry written above a column is the one coming from the column on its right. The leftmost column receives the carry out of the most significant position, which is discarded.

<a id="box-25-texexpbox9"></a>

!!! esempio "Example 1.11: addition without overflow"

    We compute $3 + (-1)$ with $k=4$ bits, interval $[-8, 7]$.

    - Step 1: representations: $3 = (0011)_2$ and $-1 \rightarrow 2^4 - 1 = 15 = (1111)_2$.

    - Step 2: column addition:

        <div class="tabella" markdown="0"><table>
        <tr>
        <td>carry</td>
        <td>1</td>
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
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        </tr>
        <tr>
        <td>sum</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        </tr>
        </table></div>

    - Step 3: discard the carry out: the result is $(0010)_2 = 2 = 3 + (-1)$.

<a id="box-26-texexpbox10"></a>

!!! esempio "Example 1.12: addition with overflow"

    We compute $6 + 3$ with $k=4$ bits, interval $[-8, 7]$. Since $6+3 = 9 > 7$, an overflow is expected.

    - Step 1: representations: $6 = (0110)_2$ and $3 = (0011)_2$.

    - Step 2: column addition:

        <div class="tabella" markdown="0"><table>
        <tr>
        <td>carry</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td></td>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        </tr>
        <tr>
        <td>sum</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        </tr>
        </table></div>

    - Step 3: the result $(1001)_2$ has sign bit $1$ and represents $9 - 16 = -7$, although both operands are positive: an overflow has occurred.

!!! chiave ""

    <strong>Key points on integer numbers.</strong>

    - Sign-magnitude with $k$ bits: interval $[-(2^{k-1}-1), 2^{k-1}-1]$, two representations of zero, addition requires a special treatment of the sign.

    - Two's complement with $k$ bits: a negative $n$ is represented by $2^k+n$ (equivalently: invert the bits of $|n|$ and add $1$); interval $[-2^{k-1}, 2^{k-1}-1]$; a unique zero.

    - In two's complement, addition is the addition of natural numbers modulo $2^k$; an overflow occurs only when two operands with the same sign give a result with the opposite sign.

## 1.3 Representation of real numbers

Natural and integer numbers are represented exactly, as long as they lie in the representation interval. Real numbers are different: between any two real numbers there are infinitely many others, and most real numbers (for instance $\frac{1}{3}$ or $\sqrt 2$) have infinitely many digits in any base. With a finite number of bits, a real number can therefore be represented, in general, only <strong>approximately</strong>. In this section we study the floating-point representation used by computers.

### 1.3.1 Digits after the point

Positional numeral systems extend to the digits after the point: the digits on the right of the point are multiplied by the negative powers of the base.

<a id="box-27-defFractional"></a>

!!! definizione "Definition 1.14: sequence of digits with a fractional part"

    A sequence of $k$ digits before the point and $h$ digits after the point in base $b$ is denoted as:

    \begin{equation*}
    \big(d_{k-1}\, \dots\, d_1\, d_0\, .\, d_{-1}\, d_{-2}\, \dots\, d_{-h}\big)_b \tag{1.12}
    \end{equation*}

    and represents the number:

    \begin{equation*}
    \sum_{i=-h}^{k-1} d_i \; b^i \tag{1.13}
    \end{equation*}

<a id="box-28-texexpbox11"></a>

!!! esempio "Example 1.13: binary numbers with a fractional part"

    - $(101.11)_2 = 1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0 + 1 \cdot 2^{-1} + 1 \cdot 2^{-2} = 4 + 1 + 0.5 + 0.25 = 5.75$

    - $(0.011)_2 = 0 \cdot 2^{-1} + 1 \cdot 2^{-2} + 1 \cdot 2^{-3} = 0.25 + 0.125 = 0.375$

    - The decimal number $0.1$ has no finite binary representation: its binary digits after the point repeat forever,

        $$
        0.1 = (0.0\,0011\,0011\,0011\dots)_2
        $$

Writing a number with a fixed number of digits before and after the point (<strong>fixed point</strong>) wastes digits: very large numbers need many digits before the point, very small numbers many digits after it. The floating-point representation lets the point “float”, as in the scientific notation $6.02 \times 10^{23}$.

<a id="box-29-defNormalized"></a>

!!! definizione "Definition 1.15: normalized binary scientific notation"

    Every real number $x \neq 0$ can be written in the <strong>normalized binary scientific notation</strong>:

    \begin{equation*}
    x = (-1)^{s} \cdot (1.f_1 f_2 f_3 \dots)_2 \cdot 2^{e} \tag{1.14}
    \end{equation*}

    where $s \in \{0, 1\}$ is the <strong>sign</strong>, the sequence $(1.f_1 f_2 f_3 \dots)_2$ is the <strong>significand</strong> (or <strong>mantissa</strong>), whose bits $f_1, f_2, f_3, \dots$ after the point form the <strong>fraction</strong>, and the integer $e$ is the <strong>exponent</strong>.

The significand is always between $1$ (included) and $2$ (excluded): its first digit is always $1$, so it does not need to be stored. For example, $5.75 = (101.11)_2 = (1.0111)_2 \cdot 2^2$: the point moves two positions to the left and the exponent is $2$.

### 1.3.2 The IEEE 754 standard

Computers store floating-point numbers according to the <strong>IEEE 754</strong> standard (IEEE: Institute of Electrical and Electronics Engineers). We describe its two most common formats, focusing on the 32-bit one.

<a id="box-30-defIEEE"></a>

!!! definizione "Definition 1.16: IEEE 754 single precision"

    In the <strong>IEEE 754 single precision</strong> format, a real number is stored with $32$ bits divided into three fields:

    - the <strong>sign</strong> $s$: $1$ bit;

    - the <strong>biased exponent</strong> $E$: $8$ bits, storing the natural number $E = e + 127$, where $e$ is the exponent and $127$ is the <strong>bias</strong>;

    - the <strong>fraction</strong> $f$: $23$ bits, storing the bits $f_1 f_2 \dots f_{23}$ of the significand after the point.

    For $1 \le E \le 254$ (<strong>normalized numbers</strong>), the number represented is:

    \begin{equation*}
    x = (-1)^{s} \cdot (1.f_1 f_2 \dots f_{23})_2 \cdot 2^{E - 127} \tag{1.15}
    \end{equation*}

<a id="box-31-fig-ieee"></a>

![Figure 2](../img/01-number-representation/fig02.svg){ .fig loading=lazy  }

<p class="didascalia"><strong>Figure 1.2:</strong> The <span class="arithmatex">&#92;(32&#92;)</span> bits of the IEEE 754 single precision format, numbered from <span class="arithmatex">&#92;(31&#92;)</span> (most significant) to <span class="arithmatex">&#92;(0&#92;)</span> (least significant).</p>

- The exponent is stored with a bias instead of in two's complement, so that $E$ is a natural number between $0$ and $255$.

- The two extreme values of $E$ are reserved. $E = 0$ is used for zero (all fraction bits equal to $0$; there are two zeros, $+0$ and $-0$, as in sign-magnitude) and for very small numbers called <em>subnormal</em>. $E = 255$ is used for $+\infty$ and $-\infty$ (fraction equal to $0$, e.g., the result of $1/0$) and for <em>NaN</em>, “Not a Number” (fraction different from $0$, e.g., the result of $0/0$).

- The <strong>double precision</strong> format has the same structure with $64$ bits: $1$ bit of sign, $11$ bits of exponent with bias $1023$, and $52$ bits of fraction.

<div class="tabella" markdown="0"><table>
<tr>
<th>Format</th>
<th>total bits</th>
<th>sign</th>
<th>exponent</th>
<th>fraction</th>
<th>bias</th>
</tr>
<tr>
<td>single precision (C++ <code>float</code>)</td>
<td><span class="arithmatex">&#92;(32&#92;)</span></td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
<td><span class="arithmatex">&#92;(8&#92;)</span></td>
<td><span class="arithmatex">&#92;(23&#92;)</span></td>
<td><span class="arithmatex">&#92;(127&#92;)</span></td>
</tr>
<tr>
<td>double precision (C++ <code>double</code>)</td>
<td><span class="arithmatex">&#92;(64&#92;)</span></td>
<td><span class="arithmatex">&#92;(1&#92;)</span></td>
<td><span class="arithmatex">&#92;(11&#92;)</span></td>
<td><span class="arithmatex">&#92;(52&#92;)</span></td>
<td><span class="arithmatex">&#92;(1023&#92;)</span></td>
</tr>
</table></div>

<a id="box-32-texexpbox12"></a>

!!! esempio "Example 1.14: from a real number to its IEEE 754 single precision representation"

    We represent $x = 5.75$ in single precision.

    - Step 1 (binary): $5.75 = 4 + 1 + 0.5 + 0.25 = (101.11)_2$.

    - Step 2 (normalization): $(101.11)_2 = (1.0111)_2 \cdot 2^2$, hence $s=0$, $e=2$ and the fraction starts with $0111$.

    - Step 3 (biased exponent): $E = e + 127 = 129 = 128 + 1 = (10000001)_2$.

    - Step 4 (fraction): the bits after the point, completed with zeros up to $23$ bits: $01110000000000000000000$.

    The $32$ bits are:

    $$
    \underbrace{0}_{s}~~\underbrace{10000001}_{E}~~\underbrace{01110000000000000000000}_{f}
    $$

<a id="box-33-texexpbox13"></a>

!!! esempio "Example 1.15: from an IEEE 754 single precision representation to a real number"

    We read the $32$ bits:

    $$
    \underbrace{1}_{s}~~\underbrace{10000010}_{E}~~\underbrace{01000000000000000000000}_{f}
    $$

    - Step 1 (sign): $s = 1$, the number is negative.

    - Step 2 (exponent): $E = (10000010)_2 = 128 + 2 = 130$, hence $e = E - 127 = 3$.

    - Step 3 (significand): $(1.01)_2 = 1 + 0.25 = 1.25$.

    - Step 4 (value): $x = (-1)^1 \cdot 1.25 \cdot 2^3 = -10$.

When the binary digits of a number do not fit in the $23$ bits of the fraction, the number is <strong>rounded</strong> to the nearest representable one.

<a id="box-34-texexpbox14"></a>

!!! esempio "Example 1.16: the number $0.1$ is not representable exactly"

    By [Example 1.13](#box-28-texexpbox11), $0.1 = (0.0\,0011\,0011\dots)_2 = (1.1001\,1001\,1001\dots)_2 \cdot 2^{-4}$, whose fraction never ends. In single precision the fraction is rounded to $23$ bits, and the bits stored are:

    $$
    \underbrace{0}_{s}~~\underbrace{01111011}_{E\,=\,123}~~\underbrace{10011001100110011001101}_{f}
    $$

    The number actually stored is $0.100000001490116119384765625$, not $0.1$. In double precision the error is smaller but still present: the stored value is $0.1000000000000000055511151231\dots$, and for this reason the computation $0.1 + 0.2$ in double precision gives $0.30000000000000004$ and not the double precision value of $0.3$.

### 1.3.3 Range and precision

The finite number of bits of the exponent limits the <strong>range</strong> of the representable numbers, and the finite number of bits of the fraction limits their <strong>precision</strong>.

<a id="box-35-obsFloatRange"></a>

!!! teorema "Observation 1.17"

    In IEEE 754 single precision:

    - the largest finite number is $(2 - 2^{-23}) \cdot 2^{127} \approx 3.4028235 \times 10^{38}$;

    - the smallest positive normalized number is $2^{-126} \approx 1.1754944 \times 10^{-38}$;

    - the distance between $1$ and the next representable number is $2^{-23} \approx 1.1920929 \times 10^{-7}$ (called the <strong>machine epsilon</strong>).

??? dimostrazione "Proof"

    The largest finite number has $s=0$, the largest normalized biased exponent $E = 254$, i.e., $e = 127$, and all $23$ fraction bits equal to $1$. Its significand is:

    $$
    (1.\underbrace{11\dots1}_{23})_2 = \sum_{i=0}^{23} 2^{-i} = 2 - 2^{-23}
    $$

    hence the number is $(2-2^{-23}) \cdot 2^{127}$. The smallest positive normalized number has $E=1$, i.e., $e = -126$, and all fraction bits equal to $0$, hence it is $1 \cdot 2^{-126}$. Finally, $1 = (1.00\dots0)_2 \cdot 2^0$, and the next representable number is obtained by setting to $1$ the last fraction bit, which has weight $2^{-23}$ when $e=0$: it is $1 + 2^{-23}$. <span class="qed">□</span>

The machine epsilon measures the <strong>relative precision</strong> of the format: single precision corresponds to about $7$ significant decimal digits, double precision (machine epsilon $2^{-52} \approx 2.2 \times 10^{-16}$) to about $16$. As a consequence, two expressions that are mathematically equal may give different floating-point results, and floating-point numbers should not be compared with the equality operator without care.

!!! chiave ""

    <strong>Key points on real numbers.</strong>

    - A floating-point number is stored as a sign, an exponent and a fraction: $x = (-1)^s \cdot (1.f)_2 \cdot 2^{E - \textrm{bias}}$.

    - IEEE 754 single precision: $1 + 8 + 23$ bits, bias $127$; double precision: $1 + 11 + 52$ bits, bias $1023$.

    - The exponent bits determine the range, the fraction bits the precision; most real numbers (for instance $0.1$) are stored with a rounding error.

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

## Interactive lab { #interactive-lab }

The algorithm of the chapter, one step at a time: move the sliders and press ▶.
The same graph full page, with the other ones of the course, is in the [interactive lab](../lab/number-representation.md).

<div class="gi" data-grafico="rappresentazione"></div>
