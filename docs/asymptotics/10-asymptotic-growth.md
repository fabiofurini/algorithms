---
title: "Asymptotic growth"
---

# Asymptotic growth

<div class="info-capitolo" markdown>

**Part 3 · Asymptotic notation and growth · Chapter 10** · [:material-file-pdf-box: Lecture notes, volume 3 (PDF)](../pdf/lecture-notes-3-asymptotic-notation.pdf) · [:material-pencil: Exercises: Asymptotic growth](../exercises/ex-10-asymptotic-growth.md) · [:material-gesture-tap: App: Orders of growth](../lab/growth.md)

</div>

## Introduction

The number of steps executed by an algorithm is a function of a natural number: the size of its input. Two algorithms that solve the same problem are compared by looking at how fast these functions grow when the input grows, and not at their values on a few small inputs. In this chapter we study the functions of a natural variable that appear in the analysis of algorithms and we compare their <strong>orders of growth</strong> with the asymptotic notations $o$, $\bigO$, $\Theta$, $\Omega$ and $\omega$ introduced in chapter 9 «Asymptotic notation».

The plan of the chapter is the following.

- In Section [10.1](#sez-gr-sec-families) we introduce the five families of increasing functions of a natural variable used in the course: logarithmic, power, exponential, factorial and self-power functions.

- In Section [10.2](#sez-gr-sec-limits) we recall the four limits that put these families in order (the <strong>hierarchy of infinities</strong>).

- In Section [10.3](#sez-gr-sec-comparison) we express the comparison of two orders of growth with the asymptotic notation, through the limit criterion of chapter 9 «Asymptotic notation». We then derive the hierarchy of the orders of growth, a classification of the orders of growth, and the properties of logarithmic, power, polynomial and exponential functions that are used in the analysis of algorithms.

!!! chiave ""

    <strong>Prerequisites.</strong> The functions of a natural variable are the <strong>sequences</strong> of the course <em>Mathematical Analysis 1</em> ([fabiofurini.github.io/mathematical-analysis-1/](https://fabiofurini.github.io/mathematical-analysis-1/), Italian version [fabiofurini.github.io/analisi-matematica-1/](https://fabiofurini.github.io/analisi-matematica-1/)). Their limits, and the theorems used to compute them, are not explained again in this chapter: we use them, and we refer to the part <em>Limits of sequences</em> of that course, in particular to the chapters <em>Computing limits of sequences</em> (comparison theorem), <em>Euler's number</em> and <em>Hierarchies of infinities and the ratio test</em>.

## 10.1 Families of increasing functions of a natural variable { #sez-gr-sec-families }

A function of a natural variable is defined on a set of natural numbers of the form $\N_{\ge n_0} = \{n_0, n_0+1, n_0+2, \dots\}$, and in the analysis of algorithms only its behaviour for large values of $n$ matters. In chapter 9 «Asymptotic notation» we called a function <strong>asymptotically positive</strong> if $f(n) > 0$ for all $n$ from some value onwards: in the course <em>Mathematical Analysis 1</em> such properties are said to hold <em>eventually</em>. The following definition describes another property of the same kind.

<a id="box-1-grDefIncreasing"></a>

!!! definizione "Definition 10.1: asymptotically increasing function"

    A function of a natural variable $f: \N_{\ge n_0} \rightarrow \R$ is <strong>asymptotically increasing</strong> if there exists $n_1 \in \N_{\ge n_0}$ such that:

    \begin{equation*}
    f(n) < f(n+1), \quad \forall n \in \N_{\ge n_1} \tag{10.1}
    \end{equation*}

- The principal families of asymptotically increasing functions of a natural variable are the following ones.

    1. The <strong>logarithmic</strong> functions of a natural variable:

        \begin{equation*}
        f: \N_{\ge 1} \rightarrow \R,~~~ f:n \mapsto \log_a n \quad \forall a \in \R_{>1} \tag{10.2}
        \end{equation*}

    2. The <strong>power</strong> functions of a natural variable:

        \begin{equation*}
        f: \N \rightarrow \R,~~~ f:n \mapsto n^{\alpha} \quad \forall \alpha \in \R_{>0} \tag{10.3}
        \end{equation*}

    3. The <strong>exponential</strong> functions of a natural variable:

        \begin{equation*}
        f: \N \rightarrow \R,~~~ f:n \mapsto b^{n} \quad \forall b \in \R_{>1} \tag{10.4}
        \end{equation*}

    4. The <strong>factorial</strong> function of a natural variable:

        \begin{equation*}
        f: \N \rightarrow \R,~~~ f:n \mapsto n! \tag{10.5}
        \end{equation*}

    5. The <strong>self-power</strong> function of a natural variable:

        \begin{equation*}
        f: \N \rightarrow \R,~~~ f:n \mapsto n^n \tag{10.6}
        \end{equation*}

        where, by convention, we set $0^0 = 1$.

- All these functions are asymptotically positive, and all of them diverge to $\ip$ as $n \rr \ip$. The factorial and the self-power functions are not increasing on their whole domain, since $0! = 1! = 1$ and $0^0 = 1^1 = 1$, but they are strictly increasing from $n = 1$ onwards: this is why we speak of <em>asymptotically</em> increasing functions.

- In these notes $\ln n = \log_e n$ denotes the natural logarithm, where $e$ is Euler's number.

<a id="box-2-gr-exTable"></a>

!!! esempio "Example 10.1: increasing functions of a natural variable"

    The table reports the values of some increasing functions of a natural variable, computed by increasing $n$ by one order of magnitude at a time, from $1$ to $100$ million. The values of $\ln n$ and the leading factors of $2^n$ and $n!$ are rounded to one decimal digit; the values of $n^2$ and $n^n$ are exact.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(n&#92;)</span></th>
    <th><span class="arithmatex">&#92;(&#92;ln n&#92;)</span></th>
    <th><span class="arithmatex">&#92;(n^2&#92;)</span></th>
    <th><span class="arithmatex">&#92;(2^n&#92;)</span></th>
    <th><span class="arithmatex">&#92;(n!&#92;)</span></th>
    <th><span class="arithmatex">&#92;(n^n&#92;)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1=10^0&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(10=10^1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 2.3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 1.0 &#92;cdot 10^{3}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 3.6&#92;cdot 10^{6}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{10}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(100=10^2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 4.6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 1.3 &#92;cdot 10^{30}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 9.3&#92;cdot 10^{157}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{200}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1{,}000=10^3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 6.9&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 1.1 &#92;cdot 10^{301}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 4.0&#92;cdot 10^{2{,}567}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{3{,}000}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(10{,}000=10^4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 9.2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 2.0 &#92;cdot 10^{3{,}010}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 2.8&#92;cdot 10^{35{,}659}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{40{,}000}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(100{,}000=10^5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 11.5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{10}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 1.0 &#92;cdot 10^{30{,}103}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 2.8&#92;cdot 10^{456{,}573}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{500{,}000}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(10^6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 13.8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{12}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 9.9 &#92;cdot 10^{301{,}029}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 8.3&#92;cdot 10^{5{,}565{,}708}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{6{,}000{,}000}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(10^7&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 16.1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{14}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 9.0 &#92;cdot 10^{3{,}010{,}299}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 1.2&#92;cdot 10^{65{,}657{,}059}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{70{,}000{,}000}&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(10^8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 18.4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{16}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 3.7 &#92;cdot 10^{30{,}102{,}999}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#92;approx 1.6&#92;cdot 10^{756{,}570{,}556}&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10^{800{,}000{,}000}&#92;)</span></td>
    </tr>
    </table></div>

    To appreciate these numbers, recall that the number of atoms in the observable universe is estimated at about $10^{82}$, and that a personal computer of 2024 executes about $10 \cdot 10^9 = 10^{10}$ operations per second ($10$ GFLOPS). An algorithm that executes $2^n$ operations on an input with $n = 100$ needs

    $$
    \frac{2^{100}}{10^{10}} \text{ seconds} \approx 1.3 \cdot 10^{20} \text{ seconds} \approx 4.0 \cdot 10^{12} \text{ years},
    $$

    while an algorithm that executes $n^2$ operations needs $10^{4}/10^{10} = 10^{-6}$ seconds.

- Figure [10.1](#box-3-gr-figFamilies) shows the first values of the same functions. Since the values grow very fast, the vertical axis is in logarithmic scale: each horizontal line of the grid corresponds to a multiplication by $100$.

<a id="box-3-gr-figFamilies"></a>

![Figure 1](../img/10-asymptotic-growth/fig01.svg){ .fig loading=lazy  }

<p class="didascalia"><strong>Figure 10.1:</strong> The values of <span class="arithmatex">&#92;(&#92;ln n&#92;)</span>, <span class="arithmatex">&#92;(n^2&#92;)</span>, <span class="arithmatex">&#92;(2^n&#92;)</span>, <span class="arithmatex">&#92;(n!&#92;)</span> and <span class="arithmatex">&#92;(n^n&#92;)</span> for <span class="arithmatex">&#92;(n &#92;in &#92;{1, 2, &#92;dots, 12&#92;}&#92;)</span> (vertical axis in logarithmic scale; the points are joined by segments only for readability). For small values of <span class="arithmatex">&#92;(n&#92;)</span> the order of the functions can be different from the final one: <span class="arithmatex">&#92;(2^3 = 8 &lt; 9 = 3^2&#92;)</span>, and <span class="arithmatex">&#92;(2^n &gt; n!&#92;)</span> for <span class="arithmatex">&#92;(n &#92;in &#92;{1, 2, 3&#92;}&#92;)</span>.</p>

## 10.2 The hierarchy of infinities { #sez-gr-sec-limits }

The five families of Section [10.1](#sez-gr-sec-families) all diverge to $\ip$. To decide which one diverges faster, we compute the limit of the ratio of two of them. The limits of this section are the <em>hierarchy of infinities</em> for sequences of the course <em>Mathematical Analysis 1</em> (chapter <em>Hierarchies of infinities and the ratio test</em>), where they are proved; here we recall them, together with the idea of their proofs, and we extend the first one to the powers of the logarithms.

- Given $a \in \R_{>1}$ and $\beta \in \R_{>0}$, the asymptotically increasing function of a natural variable

    \begin{equation*}
    f: \N_{\ge 1} \rightarrow \R,~~~ f:n \mapsto \log^{\beta}_a n = \big(\log_a n\big)^{\beta} \tag{10.7}
    \end{equation*}

    is called a <strong>polylogarithmic</strong> function of a natural variable.

<a id="box-4-grPropLogPower"></a>

!!! teorema "Proposition 10.2: logarithms and powers"

    For every $\alpha \in \R_{>0}$, $\beta \in \R_{>0}$ and $a \in \R_{>1}$, we have:

    \begin{equation*}
    \lim_{n \rr \ip} \frac{\log_a^\beta n}{n^\alpha} = 0^+ \tag{10.8}
    \end{equation*}

??? dimostrazione "Proof"

    For $\beta = 1$ this is the hierarchy of infinities (part I) of the course <em>Mathematical Analysis 1</em>:

    $$
    \lim_{n \rr \ip} \frac{\log_a n}{n^\alpha} = 0^+, \quad \forall \alpha \in \R_{>0},~ \forall a \in \R_{>1}.
    $$

    It is proved with the inequality $\log_a x < x \, \log_a 2$, valid for every $x \in \R_{>0}$ (a consequence of Bernoulli's inequality), applied to $x = n^{\alpha/2}$, and with the comparison theorem.

    For every $\beta \in \R_{>0}$, since $\frac{\alpha}{\beta} \in \R_{>0}$, we then have:

    $$
    \lim_{n \rr \ip} \frac{\log_a^\beta n}{n^\alpha}
    = \lim_{n \rr \ip} \Bigg( \underbrace{\frac{\log_a n}{n^{\alpha/\beta}}}_{\rr\, 0^+} \Bigg)^{\beta}
    = 0^+
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-5-grPropPowerExp"></a>

!!! teorema "Proposition 10.3: powers and exponentials"

    For every $\alpha \in \R_{>0}$ and $b \in \R_{>1}$, we have:

    \begin{equation*}
    \lim_{n \rr \ip} \frac{n^{\alpha}}{b^{n}} = 0^+ \tag{10.9}
    \end{equation*}

- This is the hierarchy of infinities (part II). It follows from [Proposition 10.2](#box-4-grPropLogPower) by replacing $n$ with $2^n$, which gives $\frac{n}{(2^{\mu})^n} \rr 0^+$ for every $\mu \in \R_{>0}$, hence $\frac{n}{b^n} \rr 0^+$ for every $b \in \R_{>1}$ (choose $\mu$ such that $2^{\mu} = b$); the general case follows from the identity

    $$
    \frac{n^\alpha}{b^n} = \left( \frac{n}{\big(b^{1/\alpha}\big)^n} \right)^{\alpha}, \qquad b^{1/\alpha} \in \R_{>1}.
    $$

<a id="box-6-grPropExpFact"></a>

!!! teorema "Proposition 10.4: exponentials and factorial"

    For every $b \in \R_{>1}$, we have:

    \begin{equation*}
    \lim_{n \rr \ip} \frac{b^{n}}{n!} = 0^+ \tag{10.10}
    \end{equation*}

- This is the hierarchy of infinities (part III). It follows from the ratio test, since

    $$
    \frac{b^{n+1}}{(n+1)!} \; \frac{n!}{b^n} = \frac{b}{n+1} \rr 0^+ < 1.
    $$

<a id="box-7-grPropFactSelf"></a>

!!! teorema "Proposition 10.5: factorial and self-power"

    \begin{equation*}
    \lim_{n \rr \ip} \frac{n!}{n^n} = 0^+ \tag{10.11}
    \end{equation*}

- This is the hierarchy of infinities (part IV). It follows from the ratio test, since

    $$
    \frac{(n+1)!}{(n+1)^{n+1}} \; \frac{n^n}{n!} = \left( \frac{n}{n+1}\right)^n = \frac{1}{\left( 1 + \frac{1}{n} \right)^n} \rr \frac{1}{e} < 1.
    $$

!!! chiave ""

    Polylogarithmic functions (with base greater than one) diverge more slowly than power functions (with positive exponent), which diverge more slowly than exponential functions (with base greater than one), which diverge more slowly than the factorial function, which diverges more slowly than the self-power function.

## 10.3 Comparison of orders of growth { #sez-gr-sec-comparison }

- The <strong>order of growth</strong> of an asymptotically increasing function of a natural variable describes how rapidly its values increase compared to the values of another asymptotically increasing function of a natural variable.

- We compare orders of growth with the asymptotic notations $o$, $\bigO$, $\Theta$, $\Omega$ and $\omega$ of chapter 9 «Asymptotic notation». For the functions of this chapter the ratio $\frac{f(n)}{g(n)}$ always has a limit, and the notations that hold are decided by the <strong>limit criterion</strong> proved there, which we recall.

<a id="box-8-grPropLimit"></a>

!!! teorema "Proposition 10.6: limit criterion"

    Let $f$ and $g$ be two asymptotically positive functions of a natural variable such that the limit

    $$
    L = \lim_{n \rr \ip} \frac{f(n)}{g(n)}
    $$

    exists ($L = 0^+$, $L \in \R_{>0}$ or $L = \ip$). Then:

    \begin{align*}
    f(n) = o\big(g(n)\big) &~~\Longleftrightarrow~~ L = 0^+,\\
    f(n) = \bigO\big(g(n)\big) &~~\Longleftrightarrow~~ L = 0^+ \ \text{ or } \ L \in \R_{>0},\\
    f(n) = \Theta\big(g(n)\big) &~~\Longleftrightarrow~~ L \in \R_{>0},\\
    f(n) = \Omega\big(g(n)\big) &~~\Longleftrightarrow~~ L \in \R_{>0} \ \text{ or } \ L = \ip,\\
    f(n) = \omega\big(g(n)\big) &~~\Longleftrightarrow~~ L = \ip.
    \end{align*}

- The proof is in chapter 9 «Asymptotic notation» (Proposition «limit criterion»), where the five notations are defined through positive constants and a threshold. In this chapter we compute the limit of the ratio and apply [Proposition 10.6](#box-8-grPropLimit).

!!! chiave ""

    Given two asymptotically increasing functions of a natural variable $f$ and $g$:

    - if $f(n) = o\big(g(n)\big)$, $f$ has a strictly <strong>smaller order of growth</strong> than $g$, $\rightsquigarrow$ the function $f$ <strong>grows slower than</strong> the function $g$;

    - if $f(n) = \bigO\big(g(n)\big)$, $f$ has a <strong>smaller or equal order of growth</strong> compared to $g$, $\rightsquigarrow$ the function $f$ <strong>grows at most as fast as</strong> the function $g$;

    - if $f(n) = \Theta\big(g(n)\big)$, $f$ has the <strong>same order of growth</strong> as $g$, $\rightsquigarrow$ the function $f$ <strong>grows as fast as</strong> the function $g$;

    - if $f(n) = \Omega\big(g(n)\big)$, $f$ has a <strong>greater or equal order of growth</strong> compared to $g$, $\rightsquigarrow$ the function $f$ <strong>grows at least as fast as</strong> the function $g$;

    - if $f(n) = \omega\big(g(n)\big)$, $f$ has a strictly <strong>greater order of growth</strong> than $g$, $\rightsquigarrow$ the function $f$ <strong>grows faster than</strong> the function $g$.

- The notations do not depend on the values of $f$ and $g$ on finitely many natural numbers: changing them changes neither the limit of the ratio nor, with a larger threshold, the inequalities of the definitions.

- By the relational properties of chapter 9 «Asymptotic notation» (symmetry and transpose symmetry), exchanging the two functions exchanges $o$ with $\omega$ and $\bigO$ with $\Omega$, while $\Theta$ does not change:

    $$
    f(n) = o\big(g(n)\big) \iff g(n) = \omega\big(f(n)\big), \qquad
    f(n) = \Theta\big(g(n)\big) \iff g(n) = \Theta\big(f(n)\big).
    $$

    All five notations are also transitive: for example, $f(n) = o\big(g(n)\big)$ and $g(n) = o\big(h(n)\big)$ give $f(n) = o\big(h(n)\big)$.

<a id="box-9-gr-exRatios"></a>

!!! esempio "Example 10.2: the limit of the ratio"

    We compare three pairs of functions; the three ratios are drawn in Figure [10.2](#box-10-gr-figRatios).

    - We have $\ln n = o\big(\sqrt{n}\big)$, since by [Proposition 10.2](#box-4-grPropLogPower) (with $a = e$, $\beta = 1$, $\alpha = \frac{1}{2}$):

        $$
        \lim_{n \rr \ip} \frac{\ln n}{\sqrt n} = 0^+
        $$

    - We have $2n^2 + 3n = \Theta(n^2)$, since:

        $$
        \lim_{n \rr \ip} \frac{2n^2+3n}{n^2} = \lim_{n \rr \ip} \Big( 2 + \underbrace{\frac{3}{n}}_{\rr\, 0} \Big) = 2 \in \R_{>0}
        $$

    - We have $n \ln n = \omega(n)$, since:

        $$
        \lim_{n \rr \ip} \frac{n \ln n}{n} = \lim_{n \rr \ip} \ln n = \ip
        $$

    The first ratio is not monotone: it increases up to its largest value, about $0.74$, reached for $n = 7$, and only then it decreases towards $0$.

<a id="box-10-gr-figRatios"></a>

![Figure 2](../img/10-asymptotic-growth/fig02.svg){ .fig loading=lazy  }

<p class="didascalia"><strong>Figure 10.2:</strong> The three ratios of [Example 10.2](#box-9-gr-exRatios) for <span class="arithmatex">&#92;(n &#92;in &#92;{1, 2, &#92;dots, 100&#92;}&#92;)</span> (the points are joined by segments). The first one tends to <span class="arithmatex">&#92;(0&#92;)</span>, the second one to <span class="arithmatex">&#92;(2&#92;)</span> (dashed line), the third one diverges to <span class="arithmatex">&#92;(&#92;ip&#92;)</span>.</p>

- [Proposition 10.6](#box-8-grPropLimit) requires the limit of the ratio to exist. For example, for $f(n) = n$ if $n$ is even and $f(n) = 2n$ if $n$ is odd, the ratio $\frac{f(n)}{n}$ takes alternately the values $1$ and $2$ and has no limit; nevertheless $f(n) = \Theta(n)$, by the definition of chapter 9 «Asymptotic notation» with $c_1 = 1$, $c_2 = 2$ and $n_1 = 0$, since $0 \le n \le f(n) \le 2n$ for every $n \in \N$. All the comparisons of this chapter are made between functions whose ratio has a limit.

### 10.3.1 Hierarchy of the orders of growth { #sez-gr-sec-hierarchy }

By [Proposition 10.6](#box-8-grPropLimit), the limits of Section [10.2](#sez-gr-sec-limits) translate directly into relations $o$ between the families.

- Any polylogarithmic function of a natural variable with a base strictly greater than one is $o$ of any power function of a natural variable with a positive exponent.

<a id="box-11-grObsLogPower"></a>

!!! teorema "Observation 10.7: polylogarithms and powers"

    For every $\alpha \in \R_{>0}$, $\beta \in \R_{>0}$ and $a \in \R_{>1}$, we have $\log^{\beta}_a n = o(n^{\alpha})$.

??? dimostrazione "Proof"

    By [Proposition 10.2](#box-4-grPropLogPower), for every $\alpha \in \R_{>0}$, $\beta \in \R_{>0}$ and $a \in \R_{>1}$, we have:

    $$
    \lim_{n \rr \ip} \frac{\log^{\beta}_a n}{n^{\alpha}} = 0^+
    $$

    and the claim follows from [Proposition 10.6](#box-8-grPropLimit). <span class="qed">□</span>

- Any power function of a natural variable with a positive exponent is $o$ of any exponential function of a natural variable with a base strictly greater than one.

<a id="box-12-grObsPowerExp"></a>

!!! teorema "Observation 10.8: powers and exponentials"

    For every $\alpha \in \R_{>0}$ and $b \in \R_{>1}$, we have $n^{\alpha} = o(b^{n})$.

??? dimostrazione "Proof"

    By [Proposition 10.3](#box-5-grPropPowerExp), for every $\alpha \in \R_{>0}$ and $b \in \R_{>1}$, we have:

    $$
    \lim_{n \rr \ip} \frac{n^{\alpha}}{b^{n}} = 0^+
    $$

    and the claim follows from [Proposition 10.6](#box-8-grPropLimit). <span class="qed">□</span>

<a id="box-13-gr-exCompare1"></a>

!!! esempio "Example 10.3: comparison of orders of growth"

    - We have $\ln^6 n + 2 + 2^{1/n} + 3^{-n} + 9\,n^2 = o(n^3)$, since:

        $$
        \lim_{n \rr \ip} \frac{\ln^6 n + 2 + 2^{1/n} + 3^{-n} + 9\,n^2}{n^3}
        = \lim_{n \rr \ip} \Bigg( \underbrace{\frac{\ln^6 n}{n^3}}_{\rr\, 0^+} + \underbrace{\frac{2}{n^3}}_{\rr\, 0^+} + \underbrace{\frac{2^{1/n}}{n^3}}_{\rr\, 0^+} + \underbrace{\frac{3^{-n}}{n^3}}_{\rr\, 0^+} + \underbrace{\frac{9}{n}}_{\rr\, 0^+} \Bigg) = 0^+
        $$

    - We have $3n^2 + \sqrt{n} + \ln n + 5 + 4^{-n} + 10\,n^{1/3} = o(n^3)$, since:

        $$
        \lim_{n \rr \ip} \frac{3n^2 + \sqrt{n} + \ln n + 5 + 4^{-n} + 10\,n^{1/3}}{n^3}
        = \lim_{n \rr \ip} \Bigg(
        \underbrace{\frac{3}{n}}_{\rr\, 0^+} +
        \underbrace{\frac{1}{n^{5/2}}}_{\rr\, 0^+} +
        \underbrace{\frac{\ln n}{n^3}}_{\rr\, 0^+} +
        \underbrace{\frac{5}{n^3}}_{\rr\, 0^+} +
        \underbrace{\frac{4^{-n}}{n^3}}_{\rr\, 0^+} +
        \underbrace{\frac{10}{n^{8/3}}}_{\rr\, 0^+}
        \Bigg) = 0^+
        $$

    - We have $n^{1/4} + \ln^2 n + \frac{7}{\sqrt{n}} + e^{-n} + 20\,n^{1/2} = o(n^2)$, since:

        $$
        \lim_{n \rr \ip} \frac{n^{1/4} + \ln^2 n + \frac{7}{\sqrt{n}} + e^{-n} + 20\,n^{1/2}}{n^2}
        = \lim_{n \rr \ip} \Bigg(
        \underbrace{\frac{1}{n^{7/4}}}_{\rr\, 0^+} +
        \underbrace{\frac{\ln^2 n}{n^2}}_{\rr\, 0^+} +
        \underbrace{\frac{7}{n^{5/2}}}_{\rr\, 0^+} +
        \underbrace{\frac{e^{-n}}{n^2}}_{\rr\, 0^+} +
        \underbrace{\frac{20}{n^{3/2}}}_{\rr\, 0^+}
        \Bigg) = 0^+
        $$

    In each case the terms with a logarithm go to $0^+$ by [Proposition 10.2](#box-4-grPropLogPower), the other terms by elementary limits, and the claim follows from [Proposition 10.6](#box-8-grPropLimit).

- Any exponential function of a natural variable with a base strictly greater than one is $o$ of the factorial function of a natural variable.

<a id="box-14-grObsExpFact"></a>

!!! teorema "Observation 10.9: exponentials and factorial"

    For every $b \in \R_{>1}$, we have $b^{n} = o(n!)$.

??? dimostrazione "Proof"

    By [Proposition 10.4](#box-6-grPropExpFact), for every $b \in \R_{>1}$, we have:

    $$
    \lim_{n \rr \ip} \frac{b^{n}}{n!} = 0^+
    $$

    and the claim follows from [Proposition 10.6](#box-8-grPropLimit). <span class="qed">□</span>

- The factorial function of a natural variable is $o$ of the self-power function of a natural variable.

<a id="box-15-grObsFactSelf"></a>

!!! teorema "Observation 10.10: factorial and self-power"

    We have $n! = o(n^n)$.

??? dimostrazione "Proof"

    By [Proposition 10.5](#box-7-grPropFactSelf), we have:

    $$
    \lim_{n \rr \ip} \frac{n!}{n^n} = 0^+
    $$

    and the claim follows from [Proposition 10.6](#box-8-grPropLimit). <span class="qed">□</span>

<a id="box-16-gr-exCompare2"></a>

!!! esempio "Example 10.4: comparison with the self-power function"

    We have $n! + 2^n + \sqrt{n} + \ln^3 n + n^{n-1} + \frac{1}{n} = o(n^n)$, since:

    $$
    \lim_{n \rr \ip} \frac{n! + 2^n + \sqrt{n} + \ln^3 n + n^{n-1} + \frac{1}{n}}{n^{n}}
    = \lim_{n \rr \ip} \Bigg(
    \underbrace{\frac{n!}{n^{n}}}_{\rr\, 0^+} +
    \underbrace{\frac{2^n}{n^{n}}}_{\rr\, 0^+} +
    \underbrace{\frac{\sqrt{n}}{n^{n}}}_{\rr\, 0^+} +
    \underbrace{\frac{\ln^3 n}{n^{n}}}_{\rr\, 0^+} +
    \underbrace{\frac{1}{n}}_{\rr\, 0^+} +
    \underbrace{\frac{1}{n^{n+1}}}_{\rr\, 0^+}
    \Bigg) = 0^+
    $$

    For example, $\frac{2^n}{n^n} = \frac{2^n}{n!} \, \frac{n!}{n^n}$ is the product of two functions that tend to $0^+$, by Propositions [10.4](#box-6-grPropExpFact) and [Proposition 10.5](#box-7-grPropFactSelf).

!!! chiave ""

    <strong>Hierarchy of the orders of growth.</strong> For every $a \in \R_{>1}$, $\beta \in \R_{>0}$, $\alpha \in \R_{>0}$ and $b \in \R_{>1}$, we have

    $$
    \log_a^\beta n = o(n^\alpha), \qquad n^\alpha = o(b^n), \qquad b^n = o(n!), \qquad n! = o(n^n).
    $$

    By the transitivity of $o$ (chapter 9 «Asymptotic notation»), each function of the chain is $o$ of all the functions that follow it, for example $\log_a^\beta n = o(n!)$.

### 10.3.2 Classification of orders of growth { #sez-gr-sec-classification }

The families of the hierarchy are used as yardsticks to classify the order of growth of any other function.

<a id="box-17-grDefBounded"></a>

!!! definizione "Definition 10.11: bounded orders of growth"

    An asymptotically increasing function of a natural variable $f$ has:

    - a <strong>polylogarithmically bounded order of growth</strong>, if there exists $\beta \in \R_{>0}$ such that $f(n) = \bigO(\ln^{\beta} n)$; and a <strong>logarithmically bounded order of growth</strong>, if $f(n) = \bigO(\ln n)$;

    - a <strong>polynomially bounded order of growth</strong>, if there exists $\alpha \in \R_{>0}$ such that $f(n) = \bigO(n^{\alpha})$;

    - an <strong>exponentially bounded order of growth</strong>, if there exists $b \in \R_{>1}$ such that $f(n) = \bigO(b^{n})$;

    - a <strong>factorially bounded order of growth</strong>, if $f(n) = \bigO(n!)$.

<a id="box-18-grDefLinear"></a>

!!! definizione "Definition 10.12: linear, sub-linear and super-linear order of growth"

    An asymptotically increasing function of a natural variable $f$ has:

    - a <strong>sub-linear order of growth</strong>, if $f(n) = o(n)$;

    - a <strong>linear order of growth</strong>, if $f(n) = \Theta(n)$;

    - a <strong>super-linear order of growth</strong>, if $f(n) = \omega(n)$.

- By the hierarchy of the orders of growth, a function with a polylogarithmically bounded order of growth has also a polynomially bounded order of growth, which in turn is also exponentially bounded and factorially bounded. For example, $f(n) = \bigO(\ln^{\beta} n)$ and $\ln^{\beta} n = o(n)$ give $f(n) = \bigO(n)$, since $o$ implies $\bigO$ and $\bigO$ is transitive (chapter 9 «Asymptotic notation»).

<a id="box-19-gr-exClassify"></a>

!!! esempio "Example 10.5: classification of orders of growth"

    We classify four functions, drawn in Figure [10.3](#box-20-gr-figLinear).

    - $\sqrt n = o(n)$, since $\frac{\sqrt n}{n} = \frac{1}{\sqrt n} \rr 0^+$: a sub-linear order of growth. It has a polynomially bounded order of growth, since $\sqrt n = \bigO(n^{1/2})$, but not a polylogarithmically bounded one: since $\frac{\ln^{\beta} n}{\sqrt n} \rr 0^+$ ([Proposition 10.2](#box-4-grPropLogPower)), we have $\frac{\sqrt n}{\ln^{\beta} n} \rr \ip$, that is, $\sqrt n = \omega(\ln^{\beta} n)$ and $\sqrt n \neq \bigO(\ln^{\beta} n)$ for every $\beta \in \R_{>0}$ ([Proposition 10.6](#box-8-grPropLimit)).

    - $n = \Theta(n)$: a linear order of growth.

    - $n \ln n = \omega(n)$, since $\frac{n \ln n}{n} = \ln n \rr \ip$: a super-linear order of growth. It has a polynomially bounded order of growth, since $\frac{n \ln n}{n^2} = \frac{\ln n}{n} \rr 0^+$, so that $n \ln n = o(n^2)$ and $n \ln n = \bigO(n^2)$.

    - $n^2 = \omega(n)$, since $\frac{n^2}{n} = n \rr \ip$: a super-linear order of growth. It has a polynomially bounded order of growth, since $n^2 = \bigO(n^2)$.

<a id="box-20-gr-figLinear"></a>

![Figure 3](../img/10-asymptotic-growth/fig03.svg){ .fig loading=lazy  }

<p class="didascalia"><strong>Figure 10.3:</strong> A sub-linear function (<span class="arithmatex">&#92;(&#92;sqrt n&#92;)</span>), the linear function <span class="arithmatex">&#92;(n&#92;)</span> and two super-linear functions (<span class="arithmatex">&#92;(n &#92;ln n&#92;)</span> and <span class="arithmatex">&#92;(n^2&#92;)</span>) for <span class="arithmatex">&#92;(n &#92;in &#92;{1, 2, &#92;dots, 16&#92;}&#92;)</span> (<span class="arithmatex">&#92;(n^2&#92;)</span> only up to <span class="arithmatex">&#92;(n = 8&#92;)</span>, where it reaches <span class="arithmatex">&#92;(64&#92;)</span>; the points are joined by segments).</p>

### 10.3.3 Properties of logarithmic functions { #sez-gr-sec-log }

In the proofs of this subsection and of the following ones we compute the limit of the ratio of the two functions and we apply [Proposition 10.6](#box-8-grPropLimit).

- Any two logarithmic functions of a natural variable with bases strictly greater than one are $\Theta$ of each other; multiplying the argument by a positive constant does not change the order of growth either.

<a id="box-21-grObsLogBase"></a>

!!! teorema "Observation 10.13: change of base"

    For every $a \in \R_{>1}$, $c \in \R_{>1}$ and $\lambda \in \R_{>0}$, we have $\log_{a} (\lambda\, n) = \Theta(\log_{c} n)$.

??? dimostrazione "Proof"

    For every $a,c \in \R_{>1}$ and $\lambda \in \R_{>0}$, since $\log_a (\lambda\, n) = \log_a \lambda + \log_a n$ and $\log_a n = \frac{\log_c n}{\log_c a}$, we have:

    $$
    \lim_{n \rr \ip} \frac{\log_{a}(\lambda\, n)}{\log_c n}
    = \lim_{n \rr \ip} \Bigg( \underbrace{\frac{\log_a \lambda}{\log_c n}}_{\rr\, 0} + \frac{\frac{\log_c n}{\log_c a}}{\log_c n} \Bigg)
    = \frac{1}{\log_c a} \in \R_{>0}
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- For this reason, when only the order of growth matters, the base of a logarithm is often omitted. For example, $\log_2 n = \Theta(\ln n)$, and $\lim_{n \rr \ip} \frac{\log_2 n}{\ln n} = \frac{1}{\ln 2} \approx 1.44$.

- Adding a positive constant to the argument of a logarithmic function of a natural variable does not change its order of growth.

<a id="box-22-grObsLogShift"></a>

!!! teorema "Observation 10.14: shift of the argument"

    For every $a \in \R_{>1}$ and $\lambda \in \R_{>0}$, we have $\log_{a} (n+\lambda) = \Theta(\log_{a} n)$.

??? dimostrazione "Proof"

    For every $a \in \R_{>1}$ and $\lambda \in \R_{>0}$, we have:

    $$
    \lim_{n \rr \ip} \frac{\log_a (n+\lambda)}{\log_a n}
    = \lim_{n \rr \ip} \frac{\log_a \left(n \left(1 + \frac{\lambda}{n} \right)\right)}{\log_a n}
    = \lim_{n \rr \ip} \frac{\log_a n + \overbrace{\log_a \left(1+\frac{\lambda}{n}\right)}^{\rr\, 0}}{\log_a n}
    = 1
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- The <strong>quasi-linear</strong> function of a natural variable $n \mapsto n \log_a n$ is $o$ of any power function of a natural variable with exponent strictly greater than one.

<a id="box-23-grObsQuasiPower"></a>

!!! teorema "Observation 10.15: quasi-linear and powers"

    For every $\alpha \in \R_{>1}$ and $a \in \R_{>1}$, we have $n \log_a n = o(n^{\alpha})$.

??? dimostrazione "Proof"

    For every $\alpha \in \R_{>1}$ and $a \in \R_{>1}$, we have $\alpha - 1 \in \R_{>0}$ and, by [Proposition 10.2](#box-4-grPropLogPower):

    $$
    \lim_{n \rr \ip} \frac{n \log_a n}{n^{\alpha}} = \lim_{n \rr \ip} \frac{\log_a n}{n^{\alpha-1}} = 0^+
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- The quasi-linear function of a natural variable $n \mapsto n \log_a n$ is $\omega$ of the linear function of a natural variable: it has a super-linear order of growth.

<a id="box-24-grObsQuasiLinear"></a>

!!! teorema "Observation 10.16: quasi-linear and linear"

    For every $a \in \R_{>1}$, we have $n \log_a n = \omega(n)$.

??? dimostrazione "Proof"

    For every $a \in \R_{>1}$, we have:

    $$
    \lim_{n \rr \ip} \frac{n \log_a n}{n} = \lim_{n \rr \ip} \log_a n = \ip
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

### 10.3.4 Properties of power functions { #sez-gr-sec-power }

- Adding a positive constant to the argument of a power function of a natural variable does not change its order of growth.

<a id="box-25-grObsPowerShift"></a>

!!! teorema "Observation 10.17: shift of the argument"

    For every $\alpha \in \R_{>0}$ and $\lambda \in \R_{>0}$, we have $(n+\lambda)^{\alpha} = \Theta(n^{\alpha})$.

??? dimostrazione "Proof"

    For every $\alpha \in \R_{>0}$ and $\lambda \in \R_{>0}$, we have:

    $$
    \lim_{n \rr \ip} \frac{(n+\lambda)^{\alpha}}{n^{\alpha}} = \lim_{n \rr \ip} \Big(1 + \underbrace{\frac{\lambda}{n}}_{\rr\, 0} \Big)^{\alpha} = 1
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- Multiplying the argument of a power function of a natural variable by a positive constant does not change its order of growth.

<a id="box-26-grObsPowerScale"></a>

!!! teorema "Observation 10.18: scaling of the argument"

    For every $\alpha \in \R_{>0}$ and $\lambda \in \R_{>0}$, we have $(\lambda\, n)^{\alpha} = \Theta(n^{\alpha})$.

??? dimostrazione "Proof"

    For every $\alpha \in \R_{>0}$ and $\lambda \in \R_{>0}$, we have:

    $$
    \lim_{n \rr \ip} \frac{(\lambda\, n)^{\alpha}}{n^{\alpha}} = \lim_{n \rr \ip} \frac{\lambda^{\alpha}\, n^{\alpha}}{n^{\alpha}} = \lambda^{\alpha} \in \R_{>0}
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- The order of growth of a power function of a natural variable, compared to the linear function of a natural variable, depends on whether the exponent is greater or smaller than one.

<a id="box-27-grObsPowerLinear"></a>

!!! teorema "Observation 10.19: powers and the linear function"

    For every $\alpha \in \R_{>0}$, we have:

    - $n^{\alpha} = \omega(n)$ (super-linear order of growth), if $\alpha > 1$;

    - $n^{\alpha} = o(n)$ (sub-linear order of growth), if $\alpha < 1$.

??? dimostrazione "Proof"

    For every $\alpha \in \R_{>0}$, we have:

    $$
    \lim_{n \rr \ip} \frac{n^{\alpha}}{n} = \lim_{n \rr \ip} n^{\alpha - 1} =
    \begin{cases}
    \ip & \text{if} ~~~ \alpha > 1\\[1ex]
    0^+ & \text{if} ~~~ \alpha < 1
    \end{cases}
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

### 10.3.5 Properties of polynomial functions { #sez-gr-sec-poly }

- Any polynomial function of a natural variable of degree $k$ with a positive leading coefficient is $\Theta(n^k)$: it has the same order of growth as its leading term.

<a id="box-28-grObsPoly"></a>

!!! teorema "Observation 10.20: polynomials"

    For every $k \in \N_{\ge 1}$ and every $a_0, a_1, \dots, a_k \in \R$ with $a_k \in \R_{>0}$, we have $\sum_{i=0}^{k} a_i \, n^i = \Theta(n^k)$.

??? dimostrazione "Proof"

    We have:

    $$
    \lim_{n \rr \ip} \frac{\sum_{i=0}^{k} a_i \, n^i}{n^{k}} = a_k + \lim_{n \rr \ip} \sum_{i=0}^{k-1} \underbrace{\frac{a_i}{n^{k-i}}}_{\rr\, 0} = a_k \in \R_{>0}
    $$

    In particular, the polynomial is asymptotically positive, so [Proposition 10.6](#box-8-grPropLimit) applies. <span class="qed">□</span>

### 10.3.6 Properties of exponential functions { #sez-gr-sec-exp }

- Any exponential function of a natural variable with a base strictly greater than one is $\omega$ of the exponential functions of a natural variable with a smaller base, and $o$ of the exponential functions of a natural variable with a greater base.

<a id="box-29-grObsExpBase"></a>

!!! teorema "Observation 10.21: different bases"

    For every $b \in \R_{>1}$ and $c \in \R_{>1}$, we have:

    - $b^n = \omega(c^n)$, if $b > c$;

    - $b^n = o(c^n)$, if $b < c$.

??? dimostrazione "Proof"

    For every $b \in \R_{>1}$ and $c \in \R_{>1}$, since $b = c^{\log_c b}$, we have:

    $$
    \lim_{n \rr \ip} \frac{b^n}{c^n} = \lim_{n \rr \ip} \frac{c^{n \log_c b}}{c^n} = \lim_{n \rr \ip} \Big(c^{\log_c b-1}\Big)^{n} =
    \begin{cases}
    \ip & \text{if} ~~~ b > c\\[1ex]
    0^+ & \text{if} ~~~ b < c
    \end{cases}
    $$

    since $c^{\log_c b - 1} = \frac{b}{c}$ is greater than one if $b > c$ and belongs to $(0,1)$ if $b < c$ (limit of the geometric progression). <span class="qed">□</span>

- Multiplying the exponent of an exponential function of a natural variable by a positive constant changes its order of growth, unless the constant is equal to one.

<a id="box-30-grObsExpScale"></a>

!!! teorema "Observation 10.22: scaling of the exponent"

    For every $b \in \R_{>1}$ and $\lambda \in \R_{>0}$, we have:

    - $b^{\lambda n} = \omega(b^n)$, if $\lambda > 1$;

    - $b^{\lambda n} = o(b^n)$, if $0 < \lambda < 1$.

??? dimostrazione "Proof"

    For every $b \in \R_{>1}$ and $\lambda \in \R_{>0}$, we have:

    $$
    \lim_{n \rr \ip} \frac{b^{\lambda n}}{b^n}
    = \lim_{n \rr \ip} \left(\frac{b^{\lambda}}{b}\right)^n
    = \lim_{n \rr \ip} \left(b^{\lambda-1}\right)^n
    =
    \begin{cases}
    \ip & \text{if} ~~~ \lambda > 1\\[1ex]
    0^+ & \text{if} ~~~ 0 < \lambda < 1
    \end{cases}
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- An alternative proof is based on the fact that

    $$
    b^{\lambda n} = \big( b^{\lambda} \big)^n
    \qquad \text{and} \qquad
    b^{\lambda}
    \begin{cases}
    > b & \text{if} ~~~ \lambda > 1\\[1ex]
    < b & \text{if} ~~~ 0 < \lambda < 1
    \end{cases}
    $$

    Accordingly, by [Observation 10.21](#box-29-grObsExpBase) applied to the bases $b^{\lambda}$ and $b$, we have $b^{\lambda n} = \omega(b^n)$ if $\lambda > 1$, and $b^{\lambda n} = o(b^n)$ if $0 < \lambda < 1$.

<a id="box-31-gr-exExpScale"></a>

!!! esempio "Example 10.6: scaling the exponent"

    - We have $2^{n/2} = o(2^n)$, since

        $$
        2^{n/2} = \big(2^{1/2}\big)^{n} \qquad \text{and} \qquad 2^{1/2} = \sqrt 2 < 2.
        $$

    - We have $2^{3n/2} = \omega(2^n)$, since

        $$
        2^{3n/2} = \big(2^{3/2}\big)^{n} \qquad \text{and} \qquad 2^{3/2} = 2\sqrt 2 > 2.
        $$

- Shifting the exponent of an exponential function of a natural variable by a constant does not change its order of growth.

<a id="box-32-grObsExpShift"></a>

!!! teorema "Observation 10.23: shift of the exponent"

    For every $b \in \R_{>1}$ and $\lambda \in \R$, we have $b^{n+\lambda} = \Theta(b^{n})$.

??? dimostrazione "Proof"

    For every $b \in \R_{>1}$ and $\lambda \in \R$, we have:

    $$
    \lim_{n \rr \ip} \frac{b^{n+\lambda}}{b^n} = \lim_{n \rr \ip} \frac{b^{n}\, b^{\lambda}}{b^n} = b^{\lambda} \in \R_{>0}
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- For example, $2^{n+10} = 1024 \cdot 2^n = \Theta(2^n)$, while $2^{2n} = 4^n = \omega(2^n)$: a constant added to the exponent is a constant factor, a constant factor in the exponent changes the base.

!!! chiave ""

    <strong>Key points of the chapter</strong>

    - The functions of a natural variable used in the analysis of algorithms are logarithmic ($\log_a n$), power ($n^\alpha$), exponential ($b^n$), factorial ($n!$) and self-power ($n^n$) functions, together with their sums and products.

    - The orders of growth are compared with the asymptotic notation of chapter 9 «Asymptotic notation». When the limit of $\frac{f(n)}{g(n)}$ exists it decides (limit criterion): $0^+$ gives $f(n) = o\big(g(n)\big)$, a positive real number gives $f(n) = \Theta\big(g(n)\big)$, $\ip$ gives $f(n) = \omega\big(g(n)\big)$.

    - Hierarchy (with $a, b > 1$ and $\alpha, \beta > 0$): $\log_a^\beta n = o(n^\alpha)$, $n^\alpha = o(b^n)$, $b^n = o(n!)$, $n! = o(n^n)$.

    - The base of a logarithm, a constant added to the argument of a logarithm or of a power, a constant factor in the argument of a power, and a constant added to the exponent of an exponential do not change the order of growth (the two functions are $\Theta$ of each other); a polynomial of degree $k$ with positive leading coefficient is $\Theta(n^k)$.

    - A constant factor in the exponent of an exponential, and a different base of an exponential, do change the order of growth: for example $2^{n/2} = o(2^n)$ and $3^n = \omega(2^n)$.

    - A function has a sub-linear, linear or super-linear order of growth if it is $o(n)$, $\Theta(n)$ or $\omega(n)$; for example $\sqrt n$, $5n+3$ and $n \ln n$.

---

**Exercises on this chapter:** [:material-pencil: Asymptotic growth](../exercises/ex-10-asymptotic-growth.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

## Interactive lab { #interactive-lab }

The algorithm of the chapter, one step at a time: move the sliders and press ▶.
The same graph full page, with the other ones of the course, is in the [interactive lab](../lab/growth.md).

<div class="gi" data-grafico="crescita"></div>
