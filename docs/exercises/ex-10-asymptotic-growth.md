---
title: "Exercises · Asymptotic growth"
---

# Exercises · Asymptotic growth

<div class="info-capitolo" markdown>

**Exercises · Chapter 10** · each solution opens with a click · [:material-book-open-variant: Chapter 10](../asymptotics/10-asymptotic-growth.md) · [:material-file-pdf-box: Exercises, volume 3 (PDF)](../pdf/exercises-3-asymptotic-notation.pdf)

</div>

In the exercises of this chapter the orders of growth are compared with the asymptotic notation of chapter 9 «Asymptotic notation» and with the results of the chapter «Asymptotic growth», summarized below. The limits of functions of a natural variable (sequences) are computed with the results of the course <em>Mathematical Analysis 1</em>, at the address [fabiofurini.github.io/mathematical-analysis-1/](https://fabiofurini.github.io/mathematical-analysis-1/).

!!! nota ""

    <strong>Limit criterion.</strong> Given two asymptotically positive functions of a natural variable $f$ and $g$ such that the limit $L = \lim_{n \rr \ip} \frac{f(n)}{g(n)}$ exists:

    - $f(n) = o\big(g(n)\big)$ if and only if $L = 0^+$: $f$ has a strictly <strong>smaller order of growth</strong> than $g$ ($f$ grows slower than $g$);

    - $f(n) = \bigO\big(g(n)\big)$ if and only if $L = 0^+$ or $L \in \R_{>0}$: $f$ has a <strong>smaller or equal order of growth</strong> compared to $g$;

    - $f(n) = \Theta\big(g(n)\big)$ if and only if $L \in \R_{>0}$: $f$ has the <strong>same order of growth</strong> as $g$ ($f$ grows as fast as $g$);

    - $f(n) = \Omega\big(g(n)\big)$ if and only if $L \in \R_{>0}$ or $L = \ip$: $f$ has a <strong>greater or equal order of growth</strong> compared to $g$;

    - $f(n) = \omega\big(g(n)\big)$ if and only if $L = \ip$: $f$ has a strictly <strong>greater order of growth</strong> than $g$ ($f$ grows faster than $g$).

!!! nota ""

    - <strong>Definition of $\Theta$.</strong> We have $f(n) = \Theta\big(g(n)\big)$ if and only if there exist $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c_1 \, g(n) \le f(n) \le c_2 \, g(n), \quad \forall n \in \N_{\ge n_1}.
        $$

        Accordingly, if such constants do not exist, $f(n) \neq \Theta\big(g(n)\big)$.

    - <strong>Hierarchy.</strong> For every $a, b \in \R_{>1}$ and $\alpha, \beta \in \R_{>0}$:

        $$
        \log_a^\beta n = o(n^\alpha), \qquad n^\alpha = o(b^n), \qquad b^n = o(n!), \qquad n! = o(n^n).
        $$

<a id="esercizio-10-1"></a>

!!! esercizio "Exercise 10.1: Asymptotic growth (E1)"

    Given $\lambda \in \R_{>0}$ and $\alpha \in \R_{>0}$, consider the following asymptotically positive function of a natural variable:

    $$
    f: \N \rightarrow \R, ~~f: n \mapsto (n+\lambda)^{\alpha}
    $$

    !!! chiave ""

        Given $b \in \R_{>1}$ and $\lambda \in \R_{>0}$, consider the following asymptotically positive function of a natural variable:

        $$
        f: \N \rightarrow \R, ~~f: n \mapsto b^{\lambda n}
        $$

    !!! chiave ""

        Given $a \in \R_{>1}$, consider the following asymptotically positive function of a natural variable:

        $$
        f: \N_{\ge 1} \rightarrow \R, ~~f: n \mapsto n \log_a n
        $$

    **Questions**

    1. Prove that there exist $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c_1 \, n^{\alpha} \le (n+\lambda)^{\alpha} \le c_2 \, n^{\alpha}, \quad \forall n \in \N_{\ge n_1},
        $$

        that is, that $(n+\lambda)^{\alpha} = \Theta(n^{\alpha})$, and verify the result with the limit criterion, computing the limit of the ratio.

    2. Prove that, for every $\lambda \in \R_{>0}$ with $\lambda \neq 1$, there exist no $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c_1 \, b^{n} \le b^{\lambda n} \le c_2 \, b^{n}, \quad \forall n \in \N_{\ge n_1},
        $$

        and accordingly that $b^{\lambda n} \neq \Theta(b^{n})$.

    3. Prove that, for every $\alpha \in \R_{>1}$, there exist no $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N_{\ge 1}$ such that

        $$
        0 \le c_1 \, n^{\alpha} \le n \log_a n \le c_2 \, n^{\alpha}, \quad \forall n \in \N_{\ge n_1},
        $$

        and accordingly that $n \log_a n \neq \Theta(n^{\alpha})$.

??? soluzione "Solution"

    1. We look for constants $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c_1 \, n^{\alpha} \le (n+\lambda)^{\alpha} \le c_2 \, n^{\alpha}, \quad \forall n \in \N_{\ge n_1}.
        $$

        Since $\lambda > 0$, we have

        $$
        0 \le \frac{n}{2} \le n + \lambda \quad \forall n \in \N
        \qquad\text{and}\qquad
        n + \lambda \le 2\, n \quad \text{if } n \ge \lambda,
        $$

        so that, for every $n \ge 2\lambda$ (which implies $n \ge \lambda$), we have:

        $$
        0 \le \frac{n}{2} \le n + \lambda \le 2\,n
        $$

        Since $\alpha > 0$, the function $x \mapsto x^\alpha$ is increasing on $\R_{\ge 0}$, and we can raise the three terms to the power $\alpha$ without changing the inequalities:

        $$
        \left(\frac{n}{2}\right)^{\alpha} \le (n+\lambda)^{\alpha} \le (2\,n)^{\alpha}
        \quad \Longleftrightarrow \quad
        \frac{1}{2^{\alpha}}\, n^{\alpha} \le (n+\lambda)^{\alpha} \le 2^{\alpha}\, n^{\alpha}
        $$

        Thus, choosing for example $c_1 = \frac{1}{2^{\alpha}} > 0$, $c_2 = 2^{\alpha} > 0$ and $n_1 = \lceil 2\lambda \rceil \ge 1$, we have:

        $$
        0 \le \frac{1}{2^{\alpha}}\, n^{\alpha} \le (n+\lambda)^{\alpha} \le 2^{\alpha}\, n^{\alpha}, \quad \forall n \in \N_{\ge \lceil 2\lambda \rceil}
        $$

        By the definition of $\Theta$, these constants prove that $(n+\lambda)^{\alpha} = \Theta(n^{\alpha})$. We verify the result with the limit of the ratio:

        $$
        \lim_{n \rr \ip} \frac{(n+\lambda)^{\alpha}}{n^{\alpha}} = \lim_{n \rr \ip} \Big(1 + \underbrace{\frac{\lambda}{n}}_{\rr\, 0}\Big)^{\alpha} = 1 \in \R_{>0}
        $$

        and the limit criterion gives again $(n+\lambda)^{\alpha} = \Theta(n^{\alpha})$.

    2. We proceed by contradiction, and we suppose that there exist $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c_1 \, b^{n} \le b^{\lambda n} \le c_2 \, b^{n}, \quad \forall n \in \N_{\ge n_1}.
        $$

        Since $b^n > 0$ for every $n \in \N$ (because $b \in \R_{>1}$), dividing by $b^n$ we obtain the equivalent inequalities

        $$
        0 < c_1 \le \underbrace{\frac{b^{\lambda n}}{b^n}}_{=\left(\frac{b^{\lambda}}{b}\right)^n = \left(b^{\lambda-1}\right)^n} \le c_2, \quad \forall n \in \N_{\ge n_1},
        $$

        which cannot hold for arbitrarily large $n$, since $c_1$ and $c_2$ are positive constants and:

        - if $\lambda > 1$, then $b^{\lambda - 1} > 1$ and $\lim_{n \rr \ip} \left(b^{\lambda-1}\right)^n = \ip$, so the inequality on the right is violated for $n$ large enough;

        - if $0 < \lambda < 1$, then $0 < b^{\lambda - 1} < 1$ and $\lim_{n \rr \ip} \left(b^{\lambda-1}\right)^n = 0^+$, so the inequality on the left is violated for $n$ large enough.

        It follows that, for every $b \in \R_{>1}$ and every $\lambda \in \R_{>0}$ with $\lambda \neq 1$, we have $b^{\lambda n} \neq \Theta(b^{n})$, since the constants required by the definition of $\Theta$ do not exist.

    3. We proceed by contradiction, and we suppose that there exist $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N_{\ge 1}$ such that

        $$
        0 \le c_1 \, n^{\alpha} \le n \log_a n \le c_2 \, n^{\alpha}, \quad \forall n \in \N_{\ge n_1}.
        $$

        Since $n^{\alpha} > 0$ for every $n \in \N_{\ge 1}$, dividing by $n^{\alpha}$ we obtain the equivalent inequalities

        $$
        0 < c_1 \le \underbrace{\frac{n \log_a n}{n^{\alpha}}}_{= \frac{\log_a n}{n^{\alpha-1}}} \le c_2, \quad \forall n \in \N_{\ge n_1},
        $$

        which cannot hold for arbitrarily large $n$, since $c_1$ is a positive constant and, by the hierarchy of the orders of growth (since $a > 1$ and $\alpha - 1 > 0$):

        $$
        \lim_{n \rr \ip} \frac{\log_a n}{n^{\alpha-1}} = 0^+
        $$

        It follows that, for every $\alpha \in \R_{>1}$ and every $a \in \R_{>1}$, we have $n \log_a n \neq \Theta(n^{\alpha})$: the same limit shows, by the limit criterion, that $n \log_a n = o(n^{\alpha})$.

<a id="esercizio-10-2"></a>

!!! esercizio "Exercise 10.2: Asymptotic growth (E2)"

    Consider the following function of a natural variable:

    $$
    f: \N_{\ge 2} \rightarrow \R, ~~f: n \mapsto \ln\big(\ln n\big)
    $$

    **Questions**

    1. Prove that the function $f$ is asymptotically positive and asymptotically increasing.

    2. Prove that $\ln(\ln n) = o(\ln n)$.

??? soluzione "Solution"

    1. The function $x \mapsto \ln x$ is strictly increasing on $\R_{>0}$, so $n \mapsto \ln(\ln n)$ is strictly increasing on $\N_{\ge 2}$. It is not positive on its whole domain, since $\ln 2 < 1$ and therefore $f(2) = \ln(\ln 2) < 0$; but $\ln 3 > 1$, hence

        $$
        f(n) = \ln(\ln n) \ge \ln(\ln 3) > 0, \quad \forall n \in \N_{\ge 3}.
        $$

        The function $f$ is therefore asymptotically positive (with $n_1 = 3$) and asymptotically increasing.

    2. Both functions are positive for every $n \in \N_{\ge 3}$. We compute the limit of the ratio by extending the domain to the real numbers, that is, by computing the limit of the function of a real variable $x \mapsto \frac{\ln(\ln x)}{\ln x}$ as $x \rr \ip$: if this limit exists, the limit of the function of a natural variable is the same. Since both the numerator and the denominator tend to $\ip$, we can use L'Hôpital's rule (course <em>Mathematical Analysis 1</em>, chapter <em>L'Hôpital's rule and differentiability</em>):

        $$
        \lim_{x \rr \ip} \frac{\ln\big(\ln x\big)}{\ln x} = \lim_{x \rr \ip} \frac{\frac{d}{dx}\left[\ln\big(\ln x\big)\right]}{\frac{d}{dx}\left[\ln x\right]}
        $$

        The derivative of the numerator is

        $$
        \frac{d}{dx}\left[\ln\big(\ln x\big)\right] = \frac{1}{\ln x} \cdot \frac{1}{x} = \frac{1}{x \ln x},
        $$

        and the derivative of the denominator is

        $$
        \frac{d}{dx}\left[\ln x\right] = \frac{1}{x}.
        $$

        Substituting, we have:

        $$
        \lim_{x \rr \ip} \frac{\ln\big(\ln x\big)}{\ln x} = \lim_{x \rr \ip} \frac{\frac{1}{x \ln x}}{\frac{1}{x}} = \lim_{x \rr \ip} \frac{1}{\ln x} = 0^+
        $$

        It follows that

        $$
        \lim_{n \rr \ip} \frac{\ln\big(\ln n\big)}{\ln n} = 0^+,
        $$

        that is, by the limit criterion, $\ln(\ln n) = o(\ln n)$.

<a id="esercizio-10-3"></a>

!!! esercizio "Exercise 10.3: Asymptotic growth (E3)"

    Consider the following twelve functions of a natural variable, defined for $n \in \N_{\ge 1}$:

    $$
    \begin{array}{llll}
    f_1(n) = \log_2\big(n^5\big) & f_2(n) = \ln^3 n & f_3(n) = \sqrt n & f_4(n) = n \ln n \\[1ex]
    f_5(n) = (n+7)^2 & f_6(n) = 3n^2 + 100\,n & f_7(n) = n^{10} & f_8(n) = 2^{n/2} \\[1ex]
    f_9(n) = 2^{n+10} & f_{10}(n) = 3^n & f_{11}(n) = n! & f_{12}(n) = n^n
    \end{array}
    $$

    **Questions**

    1. Sort the twelve functions by increasing order of growth, grouping together the functions $f_i$ and $f_j$ such that $f_i(n) = \Theta\big(f_j(n)\big)$. Justify each comparison between two consecutive groups with the results of the chapter «Asymptotic growth».

    2. Classify each function: does it have a sub-linear, linear or super-linear order of growth? Which functions have a polylogarithmically bounded order of growth, and which ones a polynomially bounded order of growth?

    3. The order of growth describes the behaviour of the functions for large values of $n$. Verify that $f_2(4) > f_3(4)$ and that $f_7(n) > f_8(n)$ for $n = 100$, and explain why this does not contradict the answer to the first question.

??? soluzione "Solution"

    1. The order is the following (functions in the same group are $\Theta$ of each other):

        $$
        f_1 \;\prec\; f_2 \;\prec\; f_3 \;\prec\; f_4 \;\prec\; \{f_5, f_6\} \;\prec\; f_7 \;\prec\; f_8 \;\prec\; f_9 \;\prec\; f_{10} \;\prec\; f_{11} \;\prec\; f_{12}
        $$

        where here $f \prec g$ is a shorthand for $f(n) = o\big(g(n)\big)$. The justifications are the following.

        - $f_1(n) = \log_2(n^5) = 5\log_2 n = \Theta(\ln n)$ (change of base). Moreover $\frac{f_1(n)}{f_2(n)} = \frac{5 \log_2 n}{\ln^3 n} = \frac{5}{\ln 2} \cdot \frac{1}{\ln^2 n} \rr 0^+$, so $f_1 \prec f_2$.

        - $f_2 \prec f_3$: polylogarithms and powers, with $\beta = 3$ and $\alpha = \frac{1}{2}$.

        - $f_3 \prec f_4$: $\frac{\sqrt n}{n \ln n} = \frac{1}{\sqrt n \, \ln n} \rr 0^+$.

        - $f_4 \prec f_5$: by the quasi-linear and powers property (with $\alpha = 2$) and the shift of the argument of a power,

            $$
            \frac{n \ln n}{(n+7)^2} = \underbrace{\frac{n \ln n}{n^2}}_{\rr\, 0^+} \cdot \underbrace{\frac{n^2}{(n+7)^2}}_{\rr\, 1} \rr 0^+.
            $$

        - $f_5(n) = \Theta\big(f_6(n)\big)$: both are $\Theta(n^2)$ (shift of the argument; polynomial with leading term $3n^2$), and indeed

            $$
            \lim_{n \rr \ip} \frac{(n+7)^2}{3n^2+100\,n} = \lim_{n \rr \ip} \frac{1 + \frac{14}{n} + \frac{49}{n^2}}{3 + \frac{100}{n}} = \frac{1}{3} \in \R_{>0}.
            $$

        - $f_6 \prec f_7$: $\frac{3n^2+100\,n}{n^{10}} = \frac{3}{n^8} + \frac{100}{n^9} \rr 0^+$.

        - $f_7 \prec f_8$: powers and exponentials, since $2^{n/2} = \big(\sqrt 2\big)^n$ with base $\sqrt 2 > 1$.

        - $f_8 \prec f_9$: $f_9(n) = 2^{n+10} = \Theta(2^n)$ (shift of the exponent), and $2^{n/2} = o(2^n)$ (scaling of the exponent with $\lambda = \frac{1}{2}$); directly,

            $$
            \frac{2^{n/2}}{2^{n+10}} = \frac{1}{1024} \left(\frac{1}{\sqrt 2}\right)^{n} \rr 0^+.
            $$

        - $f_9 \prec f_{10}$: $\frac{2^{n+10}}{3^n} = 1024 \left(\frac{2}{3}\right)^n \rr 0^+$ (different bases).

        - $f_{10} \prec f_{11} \prec f_{12}$: exponentials and factorial, factorial and self-power.

    2. Comparing each function with $n$:

        - $f_1$, $f_2$ and $f_3$ are $o(n)$, a sub-linear order of growth ($f_1 \prec f_2 \prec f_3$ and $\frac{\sqrt n}{n} \rr 0^+$);

        - no function of the list is $\Theta(n)$, a linear order of growth;

        - $f_4, f_5, \dots, f_{12}$ are $\omega(n)$, a super-linear order of growth ($f_4$ is quasi-linear, and all the others are $\omega$ of $f_4$).

        The functions $f_1$ (logarithmically bounded, with $\beta = 1$) and $f_2$ (with $\beta = 3$) have a polylogarithmically bounded order of growth; $f_3$ does not, since $f_3(n) = \omega(\ln^{\beta} n)$ for every $\beta \in \R_{>0}$. The functions $f_1, f_2, \dots, f_7$ have a polynomially bounded order of growth (for example $f_4$ with $\alpha = 2$, and $f_7$ with $\alpha = 10$); the functions $f_8, f_9, \dots, f_{12}$ do not, since they are $\omega(n^{\alpha})$ for every $\alpha \in \R_{>0}$. Among them, $f_8$, $f_9$ and $f_{10}$ have an exponentially bounded order of growth.

    3. For $n = 4$ we have

        $$
        f_2(4) = \ln^3 4 \approx 2.66 > 2 = \sqrt 4 = f_3(4),
        $$

        and for $n = 100$ we have

        $$
        f_7(100) = 100^{10} = 10^{20} > 2^{50} \approx 1.1 \cdot 10^{15} = f_8(100).
        $$

        This does not contradict the first answer: the comparison of the orders of growth concerns the limit of the ratio, that is, the behaviour for large $n$. The inequality $\ln^3 n \ge \sqrt n$ holds for every $n$ from $4$ to $24{,}128{,}091$, and $\ln^3 n < \sqrt n$ for every $n \ge 24{,}128{,}092$; similarly, $n^{10} \ge 2^{n/2}$ holds for every $n$ from $2$ to $143$, and $n^{10} < 2^{n/2}$ for every $n \ge 144$. These thresholds have been computed numerically.

<a id="esercizio-10-4"></a>

!!! esercizio "Exercise 10.4: Asymptotic growth (E4)"

    Consider the following pairs of functions of a natural variable $(f, g)$, defined for $n \in \N_{\ge 1}$:

    $$
    \begin{array}{lll}
    \text{(a)}~~ f(n) = 2^{n/2}, & g(n) = 2^n; & \qquad \text{(b)}~~ f(n) = 2^{3n/2}, ~~ g(n) = 2^n; \\[1ex]
    \text{(c)}~~ f(n) = 4^n, & g(n) = 2^{2n}; & \qquad \text{(d)}~~ f(n) = \log_2 n, ~~ g(n) = \log_{10} n; \\[1ex]
    \text{(e)}~~ f(n) = \ln\big(n^2+1\big), & g(n) = \ln n; & \qquad \text{(f)}~~ f(n) = n \ln n, ~~ g(n) = n^{3/2}.
    \end{array}
    $$

    **Questions**

    1. For each pair, compute $\lim_{n \rr \ip} \frac{f(n)}{g(n)}$ (for the pair (d), consider $n \in \N_{\ge 2}$, where $g(n) > 0$) and determine, with the limit criterion, whether $f(n) = o\big(g(n)\big)$, $f(n) = \Theta\big(g(n)\big)$ or $f(n) = \omega\big(g(n)\big)$.

    2. For each pair, indicate, when possible, which property of the chapter «Asymptotic growth» gives the same answer without computing the limit.

??? soluzione "Solution"

    1. The limits are the following.

        - **(a)** $\displaystyle \lim_{n \rr \ip} \frac{2^{n/2}}{2^n} = \lim_{n \rr \ip} \left(\frac{1}{\sqrt 2}\right)^{n} = 0^+$: $f(n) = o\big(g(n)\big)$.

        - **(b)** $\displaystyle \lim_{n \rr \ip} \frac{2^{3n/2}}{2^n} = \lim_{n \rr \ip} \big(\sqrt 2\big)^{n} = \ip$: $f(n) = \omega\big(g(n)\big)$.

        - **(c)** $4^n = \big(2^2\big)^n = 2^{2n}$, so $\displaystyle \lim_{n \rr \ip} \frac{4^n}{2^{2n}} = 1$: $f(n) = \Theta\big(g(n)\big)$ (they are the same function).

        - **(d)** Since $\log_2 n = \frac{\log_{10} n}{\log_{10} 2}$, we have $\displaystyle \lim_{n \rr \ip} \frac{\log_2 n}{\log_{10} n} = \frac{1}{\log_{10} 2} = \log_2 10 \approx 3.32$: $f(n) = \Theta\big(g(n)\big)$.

        - **(e)** Since $\ln(n^2+1) = \ln\big(n^2 (1 + \frac{1}{n^2})\big) = 2\ln n + \ln\big(1+\frac{1}{n^2}\big)$, we have

            $$
            \lim_{n \rr \ip} \frac{\ln(n^2+1)}{\ln n} = \lim_{n \rr \ip} \Bigg( 2 + \frac{\overbrace{\ln\left(1+\frac{1}{n^2}\right)}^{\rr\, 0}}{\ln n} \Bigg) = 2:
            $$

            $f(n) = \Theta\big(g(n)\big)$.

        - **(f)** $\displaystyle \lim_{n \rr \ip} \frac{n \ln n}{n^{3/2}} = \lim_{n \rr \ip} \frac{\ln n}{n^{1/2}} = 0^+$: $f(n) = o\big(g(n)\big)$.

    2. The properties are the following.

        - **(a), (b)** Scaling of the exponent of an exponential, with $\lambda = \frac{1}{2} < 1$ and $\lambda = \frac{3}{2} > 1$ (or different bases, $\sqrt 2 < 2$ and $2\sqrt 2 > 2$).

        - **(c)** Scaling of the exponent with $\lambda = 2$ would say that $2^{2n} = \omega(2^n)$; here, instead, the base $4 = 2^2$ already absorbs the factor $2$, and the two functions coincide.

        - **(d)** Change of base of a logarithm.

        - **(e)** No property of the chapter applies directly, since the argument $n^2+1$ is neither of the form $n+\lambda$ nor of the form $\lambda\, n$. The identity $\ln(n^2+1) = 2\ln n + \ln\big(1+\frac{1}{n^2}\big)$ of the first answer plays the same role as the shift of the argument: the term $\ln\big(1+\frac{1}{n^2}\big)$ tends to $0$, and what remains, $2 \ln n$, is $\Theta(\ln n)$.

        - **(f)** Quasi-linear function and powers, with $\alpha = \frac{3}{2} > 1$.
