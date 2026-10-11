---
title: "Exercises · Asymptotic notation"
---

# Exercises · Asymptotic notation

<div class="info-capitolo" markdown>

**Exercises · Chapter 9** · each solution opens with a click · [:material-book-open-variant: Chapter 9](../asymptotics/09-asymptotic-notation.md) · [:material-file-pdf-box: Exercises, volume 3 (PDF)](../pdf/exercises-3-asymptotic-notation.pdf)

</div>

In the exercises of this chapter the asymptotic notations are used with the definitions and the limit criteria of the chapter «Asymptotic notation», summarized below. The limits of functions of a natural variable (sequences) are computed with the results of the course <em>Mathematical Analysis 1</em> ([fabiofurini.github.io/mathematical-analysis-1/](https://fabiofurini.github.io/mathematical-analysis-1/)).

!!! nota ""

    Given two functions $f$ and $g$ of a natural variable,

    - we write $f(n)=o\big(g(n)\big)$ if for all $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

        $$
        0 \le f(n) < c \: g(n),\qquad \forall n \ge n_1;
        $$

    - we write $f(n)=\bigO\big(g(n)\big)$ if there exist $c \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le f(n) \le c \: g(n),\qquad \forall n \ge n_1;
        $$

    - we write $f(n)=\Theta\big(g(n)\big)$ if there exist $c_1,c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c_1 \: g(n) \le f(n) \le c_2 \: g(n),\qquad \forall n \ge n_1;
        $$

    - we write $f(n)=\Omega\big(g(n)\big)$ if there exist $c \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c \: g(n) \le f(n),\qquad \forall n \ge n_1;
        $$

    - we write $f(n)=\omega\big(g(n)\big)$ if for all $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

        $$
        0 \le c \: g(n) < f(n),\qquad \forall n \ge n_1.
        $$

!!! nota ""

    Limit criterion: given two asymptotically positive functions $f$ and $g$ of a natural variable such that the limit of $\frac{f(n)}{g(n)}$ exists, we have

    \begin{align*}
    &\lim_{n \rr +\infty} \frac{f(n)}{g(n)} =0^+ ~~\Longleftrightarrow~~ f(n)= o\big(g(n)\big),\\
    &\lim_{n \rr +\infty} \frac{f(n)}{g(n)} = \ell \in \R_{> 0} \text{ or } 0^+ ~~\Longleftrightarrow~~ f(n)= \bigO\big(g(n)\big),\\
    &\lim_{n \rr +\infty} \frac{f(n)}{g(n)} = \ell \in \R_{> 0} ~~\Longleftrightarrow~~ f(n)= \Theta\big(g(n)\big),\\
    &\lim_{n \rr +\infty} \frac{f(n)}{g(n)} = \ell \in \R_{>0} \text{ or } +\infty ~~\Longleftrightarrow~~ f(n)= \Omega\big(g(n)\big),\\
    &\lim_{n \rr +\infty} \frac{f(n)}{g(n)} =+\infty ~~\Longleftrightarrow~~ f(n)= \omega\big(g(n)\big).
    \end{align*}

    When the ratio $\frac{f(n)}{g(n)}$ has no limit (for example when it contains $\sin n$ or $\cos n$), these criteria cannot be applied and we use the definitions.

<a id="esercizio-9-1"></a>

!!! esercizio "Exercise 9.1: Asymptotic notation (E1)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto 5\;n^4 - 19\;n^3 + 12\;n^2
    $$

    **Questions**

    1. Prove that:

        1. $5\;n^4 - 19\;n^3 + 12\;n^2 = \bigO(n^4)$;

        2. $5\;n^4 - 19\;n^3 + 12\;n^2 = \bigO(n^6)$;

        3. $5\;n^4 - 19\;n^3 + 12\;n^2 = \Theta(n^4)$;

        4. $5\;n^4 - 19\;n^3 + 12\;n^2 \neq \Theta(n^6)$.

??? soluzione "Solution"

    1. 1. To prove that

            $$
            5\;n^4 - 19\;n^3 + 12\;n^2 = \bigO(n^4)
            $$

            we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 5\;n^4 - 19\;n^3 + 12\;n^2 \le c\;n^4, \qquad \forall n \ge n_1.
            $$

            First, we observe that

            $$
            5\;n^4 - 19\;n^3 + 12\;n^2 = n^2\,(5n^2-19n+12) = n^2\,(5n-4)\,(n-3),
            $$

            hence

            $$
            0 \le 5\;n^4 - 19\;n^3 + 12\;n^2, \qquad \forall n \ge 3
            $$

            (for $n = 2$ the value is $f(2) = -24$ $< 0$). With $n \ge 1$, dividing by $n^4$, the inequality $f(n) \le c\,n^4$ is equivalent to

            $$
            5 - \frac{19}{n} + \frac{12}{n^2} \le c, \qquad \forall n \ge n_1.
            $$

            Since

            $$
            -\frac{19}{n} + \frac{12}{n^2} = \frac{12-19n}{n^2} \le 0, \qquad \forall n \ge 1,
            $$

            we have

            $$
            5 - \frac{19}{n} + \frac{12}{n^2} \le 5, \qquad \forall n \ge 1.
            $$

            By choosing for example $c = 5$ and $n_1 = 3$, we have

            $$
            0 \le 5\;n^4 - 19\;n^3 + 12\;n^2 \le 5\;n^4, \qquad \forall n \ge 3.
            $$

            Since the functions are asymptotically positive, an alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{5\;n^4 - 19\;n^3 + 12\;n^2}{n^4} = \lim_{n \to +\infty} \left(5 - \frac{19}{n} + \frac{12}{n^2}\right) = 5 \in \R_{>0}.
            $$

        2. To prove that

            $$
            5\;n^4 - 19\;n^3 + 12\;n^2 = \bigO(n^6)
            $$

            we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 5\;n^4 - 19\;n^3 + 12\;n^2 \le c\;n^6, \qquad \forall n \ge n_1.
            $$

            From part (a), $0 \le 5\;n^4 - 19\;n^3 + 12\;n^2 \le 5\,n^4$ for all $n \ge 3$. Since $n^4 \le n^6$ for $n \ge 1$, we also have $5\;n^4 - 19\;n^3 + 12\;n^2 \le 5\;n^6$. By choosing for example $c = 5$ and $n_1 = 3$, we have

            $$
            0 \le 5\;n^4 - 19\;n^3 + 12\;n^2 \le 5\;n^6, \qquad \forall n \ge 3.
            $$

            Since the functions are asymptotically positive, an alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{5\;n^4 - 19\;n^3 + 12\;n^2}{n^6} = \lim_{n \to +\infty} \left(\frac{5}{n^2} - \frac{19}{n^3} + \frac{12}{n^4}\right) = 0^+.
            $$

        3. To prove that

            $$
            5\;n^4 - 19\;n^3 + 12\;n^2 = \Theta(n^4)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^4 \le 5\;n^4 - 19\;n^3 + 12\;n^2 \le c_2\;n^4, \qquad \forall n \ge n_1.
            $$

            For the upper bound, by part (a), $5\;n^4 - 19\;n^3 + 12\;n^2 \le 5\;n^4$ for all $n \ge 1$. For the lower bound, we observe that

            $$
            5\;n^4 - 19\;n^3 + 12\;n^2 - n^4 = 4\,n^4 - 19\,n^3 + 12\,n^2 = n^2\,(4n-3)\,(n-4),
            $$

            which is non-negative for $n \ge 4$ (for $n = 3$ it is equal to $-81 < 0$). Hence $n^4 \le 5\;n^4 - 19\;n^3 + 12\;n^2$ for all $n \ge 4$. By choosing for example $c_1 = 1$, $c_2 = 5$ and $n_1 = 4$, we have

            $$
            0 \le n^4 \le 5\;n^4 - 19\;n^3 + 12\;n^2 \le 5\;n^4, \qquad \forall n \ge 4.
            $$

            The limit computed in part (a) gives the same result: it is equal to $5 \in \R_{>0}$.

        4. To prove that

            $$
            5\;n^4 - 19\;n^3 + 12\;n^2 \neq \Theta(n^6)
            $$

            we proceed by contradiction and we suppose that there exist $c_1 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^6 \le 5\;n^4 - 19\;n^3 + 12\;n^2, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^6$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le \frac{5}{n^2} - \frac{19}{n^3} + \frac{12}{n^4}, \qquad \forall n \ge n_1.
            $$

            Passing to the limit as $n \to +\infty$, we obtain $0 < c_1 \le 0$, which is impossible. Therefore

            $$
            5\;n^4 - 19\;n^3 + 12\;n^2 \neq \Theta(n^6).
            $$

            Alternatively, the limit computed in part (b) is equal to $0^+$, so that $f(n) = o(n^6)$ by the limit criterion. Then, with the constant $c = c_1$ in the definition of $o$, we would have $f(n) < c_1\,n^6$ for all sufficiently large $n$, against the lower bound $c_1\,n^6 \le f(n)$.

<a id="esercizio-9-2"></a>

!!! esercizio "Exercise 9.2: Asymptotic notation (E2)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto 3\;n^2 + n^3\,(2 - \sin n)
    $$

    **Questions**

    1. Prove that:

        1. $3\;n^2 + n^3\,(2 - \sin n) = \Theta(n^3)$;

        2. $3\;n^2 + n^3\,(2 - \sin n) \neq o(n^3)$;

        3. $3\;n^2 + n^3\,(2 - \sin n) \neq \omega(n^3)$.

??? soluzione "Solution"

    The ratio

    $$
    \frac{3\;n^2 + n^3\,(2 - \sin n)}{n^3} = \frac{3}{n} + 2 - \sin n, \qquad n \ge 1,
    $$

    does not have a limit as $n \to +\infty$, since it oscillates. Therefore the limit criteria cannot be applied, and we use the definitions. Since $-1 \le \sin n \le 1$, we have $1 \le 2 - \sin n \le 3$, and therefore $1 + \frac{3}{n} \le \frac{3}{n} + 2 - \sin n \le 3 + \frac{3}{n}$. Since $0 < \frac{3}{n} \le 3$ for $n \ge 1$, we obtain

    $$
    1 \le \frac{3}{n} + 2 - \sin n \le 6, \qquad \forall n \ge 1.
    $$

    1. 1. To prove that

            $$
            3\;n^2 + n^3\,(2 - \sin n) = \Theta(n^3)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^3 \le 3\;n^2 + n^3\,(2 - \sin n) \le c_2\;n^3, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^3$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le \frac{3}{n} + 2 - \sin n \le c_2, \qquad \forall n \ge n_1.
            $$

            By the bounds above, by choosing for example $c_1 = \frac{1}{2}$, $c_2 = 6$ and $n_1 = 1$, we have

            $$
            0 \le \frac{1}{2}\;n^3 \le 3\;n^2 + n^3\,(2 - \sin n) \le 6\;n^3, \qquad \forall n \ge 1.
            $$

        2. To prove that

            $$
            3\;n^2 + n^3\,(2 - \sin n) \neq o(n^3)
            $$

            we recall that $o(n^3)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le 3\;n^2 + n^3\,(2 - \sin n) < c\;n^3, \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^3 > 0$, $\frac{3}{n} + 2 - \sin n < c$ for all $n \ge n_1$. Since $\frac{3}{n} + 2 - \sin n \ge 1$ for every $n \ge 1$, for $c = 1$ there is no $n_1$ with this property. Therefore

            $$
            3\;n^2 + n^3\,(2 - \sin n) \neq o(n^3).
            $$

            Equivalently, the ratio is bounded from below by $1$ and cannot converge to $0$.

        3. To prove that

            $$
            3\;n^2 + n^3\,(2 - \sin n) \neq \omega(n^3)
            $$

            we recall that $\omega(n^3)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le c\;n^3 < 3\;n^2 + n^3\,(2 - \sin n), \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^3 > 0$, $c < \frac{3}{n} + 2 - \sin n$ for all $n \ge n_1$. Since $\frac{3}{n} + 2 - \sin n \le 6$ for every $n \ge 1$, for $c = 6$ there is no $n_1$ with this property. Therefore

            $$
            3\;n^2 + n^3\,(2 - \sin n) \neq \omega(n^3).
            $$

            Equivalently, the ratio is bounded from above by $6$ and cannot diverge to $+\infty$.

<a id="esercizio-9-3"></a>

!!! esercizio "Exercise 9.3: Asymptotic notation (E3)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto 3\;n^3 - 7\;n^2 + 2\;n
    $$

    **Questions**

    1. Prove that:

        1. $3\;n^3 - 7\;n^2 + 2\;n = \bigO(n^3)$;

        2. $3\;n^3 - 7\;n^2 + 2\;n = \bigO(n^5)$;

        3. $3\;n^3 - 7\;n^2 + 2\;n = \Theta(n^3)$;

        4. $3\;n^3 - 7\;n^2 + 2\;n \neq \Theta(n^5)$.

??? soluzione "Solution"

    1. 1. To prove that

            $$
            3\;n^3 - 7\;n^2 + 2\;n = \bigO(n^3)
            $$

            we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 3\;n^3 - 7\;n^2 + 2\;n \le c\;n^3, \qquad \forall n \ge n_1.
            $$

            First, we observe that

            $$
            3\;n^3 - 7\;n^2 + 2\;n = n\,(3n^2-7n+2) = n\,(3n-1)\,(n-2),
            $$

            hence

            $$
            0 \le 3\;n^3 - 7\;n^2 + 2\;n, \qquad \forall n \ge 2
            $$

            (for $n = 1$ the value is $f(1) = -2$ $< 0$). With $n \ge 1$, dividing by $n^3$, the inequality $f(n) \le c\,n^3$ is equivalent to

            $$
            3 - \frac{7}{n} + \frac{2}{n^2} \le c, \qquad \forall n \ge n_1.
            $$

            Since

            $$
            -\frac{7}{n} + \frac{2}{n^2} = \frac{2-7n}{n^2} \le 0, \qquad \forall n \ge 1,
            $$

            we have

            $$
            3 - \frac{7}{n} + \frac{2}{n^2} \le 3, \qquad \forall n \ge 1.
            $$

            By choosing for example $c = 3$ and $n_1 = 2$, we have

            $$
            0 \le 3\;n^3 - 7\;n^2 + 2\;n \le 3\;n^3, \qquad \forall n \ge 2.
            $$

            Since the functions are asymptotically positive, an alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{3\;n^3 - 7\;n^2 + 2\;n}{n^3} = \lim_{n \to +\infty} \left(3 - \frac{7}{n} + \frac{2}{n^2}\right) = 3 \in \R_{>0}.
            $$

        2. To prove that

            $$
            3\;n^3 - 7\;n^2 + 2\;n = \bigO(n^5)
            $$

            we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 3\;n^3 - 7\;n^2 + 2\;n \le c\;n^5, \qquad \forall n \ge n_1.
            $$

            From part (a), $0 \le 3\;n^3 - 7\;n^2 + 2\;n \le 3\,n^3$ for all $n \ge 2$. Since $n^3 \le n^5$ for $n \ge 1$, we also have $3\;n^3 - 7\;n^2 + 2\;n \le 3\;n^5$. By choosing for example $c = 3$ and $n_1 = 2$, we have

            $$
            0 \le 3\;n^3 - 7\;n^2 + 2\;n \le 3\;n^5, \qquad \forall n \ge 2.
            $$

            Since the functions are asymptotically positive, an alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{3\;n^3 - 7\;n^2 + 2\;n}{n^5} = \lim_{n \to +\infty} \left(\frac{3}{n^2} - \frac{7}{n^3} + \frac{2}{n^4}\right) = 0^+.
            $$

        3. To prove that

            $$
            3\;n^3 - 7\;n^2 + 2\;n = \Theta(n^3)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^3 \le 3\;n^3 - 7\;n^2 + 2\;n \le c_2\;n^3, \qquad \forall n \ge n_1.
            $$

            For the upper bound, by part (a), $3\;n^3 - 7\;n^2 + 2\;n \le 3\;n^3$ for all $n \ge 1$. For the lower bound, we observe that

            $$
            3\;n^3 - 7\;n^2 + 2\;n - n^3 = 2\,n^3 - 7\,n^2 + 2\,n = n\,(2n^2-7n+2),
            $$

            where the roots of $2n^2-7n+2$ are $\frac{7 \pm \sqrt{33}}{4}$, that is, about $0.31$ and $3.19$; hence $2n^2-7n+2 > 0$ for every integer $n \ge 4$ (for $n=4$ it is equal to $6$, for $n = 3$ it is equal to $-1$). Hence $n^3 \le 3\;n^3 - 7\;n^2 + 2\;n$ for all $n \ge 4$. By choosing for example $c_1 = 1$, $c_2 = 3$ and $n_1 = 4$, we have

            $$
            0 \le n^3 \le 3\;n^3 - 7\;n^2 + 2\;n \le 3\;n^3, \qquad \forall n \ge 4.
            $$

            The limit computed in part (a) gives the same result: it is equal to $3 \in \R_{>0}$.

        4. To prove that

            $$
            3\;n^3 - 7\;n^2 + 2\;n \neq \Theta(n^5)
            $$

            we proceed by contradiction and we suppose that there exist $c_1 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^5 \le 3\;n^3 - 7\;n^2 + 2\;n, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^5$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le \frac{3}{n^2} - \frac{7}{n^3} + \frac{2}{n^4}, \qquad \forall n \ge n_1.
            $$

            Passing to the limit as $n \to +\infty$, we obtain $0 < c_1 \le 0$, which is impossible. Therefore

            $$
            3\;n^3 - 7\;n^2 + 2\;n \neq \Theta(n^5).
            $$

            Alternatively, the limit computed in part (b) is equal to $0^+$, so that $f(n) = o(n^5)$ by the limit criterion. Then, with the constant $c = c_1$ in the definition of $o$, we would have $f(n) < c_1\,n^5$ for all sufficiently large $n$, against the lower bound $c_1\,n^5 \le f(n)$.

<a id="esercizio-9-4"></a>

!!! esercizio "Exercise 9.4: Asymptotic notation (E4)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto n^2\,(3 + \cos n)
    $$

    **Questions**

    1. Prove that:

        1. $n^2\,(3 + \cos n) = \Theta(n^2)$;

        2. $n^2\,(3 + \cos n) \neq o(n^2)$;

        3. $n^2\,(3 + \cos n) \neq \omega(n^2)$.

??? soluzione "Solution"

    The ratio

    $$
    \frac{n^2\,(3 + \cos n)}{n^2} = 3 + \cos n, \qquad n \ge 1,
    $$

    does not have a limit as $n \to +\infty$, since it oscillates. Therefore the limit criteria cannot be applied, and we use the definitions. Since $-1 \le \cos n \le 1$, we have

    $$
    2 \le 3 + \cos n \le 4, \qquad \forall n \ge 1.
    $$

    1. 1. To prove that

            $$
            n^2\,(3 + \cos n) = \Theta(n^2)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^2 \le n^2\,(3 + \cos n) \le c_2\;n^2, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^2$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le 3 + \cos n \le c_2, \qquad \forall n \ge n_1.
            $$

            By the bounds above, by choosing for example $c_1 = 2$, $c_2 = 4$ and $n_1 = 1$, we have

            $$
            0 \le 2\;n^2 \le n^2\,(3 + \cos n) \le 4\;n^2, \qquad \forall n \ge 1.
            $$

        2. To prove that

            $$
            n^2\,(3 + \cos n) \neq o(n^2)
            $$

            we recall that $o(n^2)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le n^2\,(3 + \cos n) < c\;n^2, \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^2 > 0$, $3 + \cos n < c$ for all $n \ge n_1$. Since $3 + \cos n \ge 2$ for every $n \ge 1$, for $c = 2$ there is no $n_1$ with this property. Therefore

            $$
            n^2\,(3 + \cos n) \neq o(n^2).
            $$

            Equivalently, the ratio is bounded from below by $2$ and cannot converge to $0$.

        3. To prove that

            $$
            n^2\,(3 + \cos n) \neq \omega(n^2)
            $$

            we recall that $\omega(n^2)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le c\;n^2 < n^2\,(3 + \cos n), \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^2 > 0$, $c < 3 + \cos n$ for all $n \ge n_1$. Since $3 + \cos n \le 4$ for every $n \ge 1$, for $c = 4$ there is no $n_1$ with this property. Therefore

            $$
            n^2\,(3 + \cos n) \neq \omega(n^2).
            $$

            Equivalently, the ratio is bounded from above by $4$ and cannot diverge to $+\infty$.

<a id="esercizio-9-5"></a>

!!! esercizio "Exercise 9.5: Asymptotic notation (E5)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto 2\;n^5 - 8\;n^4 + 3\;n^3
    $$

    **Questions**

    1. Prove that:

        1. $2\;n^5 - 8\;n^4 + 3\;n^3 = \bigO(n^5)$;

        2. $2\;n^5 - 8\;n^4 + 3\;n^3 = \Theta(n^5)$;

        3. $2\;n^5 - 8\;n^4 + 3\;n^3 \neq \Theta(n^3)$.

??? soluzione "Solution"

    1. 1. To prove that

            $$
            2\;n^5 - 8\;n^4 + 3\;n^3 = \bigO(n^5)
            $$

            we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 2\;n^5 - 8\;n^4 + 3\;n^3 \le c\;n^5, \qquad \forall n \ge n_1.
            $$

            First, we factorize:

            $$
            2\;n^5 - 8\;n^4 + 3\;n^3 = n^3\,(2n^2 - 8n + 3),
            $$

            where the roots of $2n^2-8n+3$ are $2 \pm \frac{\sqrt{10}}{2}$, that is, about $0.42$ and $3.58$. Hence $f(n) \ge 0$ for every integer $n \ge 4$ (for $n = 4$ the factor $2n^2-8n+3$ is equal to $3$; for $n = 3$ we have $f(3) = -81 < 0$). With $n \ge 1$, dividing by $n^5$, the inequality $f(n) \le c\,n^5$ is equivalent to

            $$
            2 - \frac{8}{n} + \frac{3}{n^2} \le c, \qquad \forall n \ge n_1.
            $$

            Since

            $$
            -\frac{8}{n} + \frac{3}{n^2} = \frac{3-8n}{n^2} \le 0, \qquad \forall n \ge 1,
            $$

            we have

            $$
            2 - \frac{8}{n} + \frac{3}{n^2} \le 2, \qquad \forall n \ge 1.
            $$

            By choosing for example $c = 2$ and $n_1 = 4$, we have

            $$
            0 \le 2\;n^5 - 8\;n^4 + 3\;n^3 \le 2\;n^5, \qquad \forall n \ge 4.
            $$

            Since the functions are asymptotically positive, an alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{2\;n^5 - 8\;n^4 + 3\;n^3}{n^5} = \lim_{n \to +\infty} \left(2 - \frac{8}{n} + \frac{3}{n^2}\right) = 2 \in \R_{>0}.
            $$

        2. To prove that

            $$
            2\;n^5 - 8\;n^4 + 3\;n^3 = \Theta(n^5)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^5 \le 2\;n^5 - 8\;n^4 + 3\;n^3 \le c_2\;n^5, \qquad \forall n \ge n_1.
            $$

            For the upper bound, by part (a), $2\;n^5 - 8\;n^4 + 3\;n^3 \le 2\;n^5$ for all $n \ge 1$. For the lower bound, we observe that

            $$
            2\;n^5 - 8\;n^4 + 3\;n^3 - n^5 = n^5 - 8\,n^4 + 3\,n^3 = n^3\,(n^2 - 8n + 3),
            $$

            where the roots of $n^2-8n+3$ are $4 \pm \sqrt{13}$, that is, about $0.39$ and $7.61$. Hence $n^5 \le 2\;n^5 - 8\;n^4 + 3\;n^3$ for every integer $n \ge 8$ (for $n = 8$ the factor $n^2-8n+3$ is equal to $3$, for $n = 7$ it is equal to $-4$). By choosing for example $c_1 = 1$, $c_2 = 2$ and $n_1 = 8$, we have

            $$
            0 \le n^5 \le 2\;n^5 - 8\;n^4 + 3\;n^3 \le 2\;n^5, \qquad \forall n \ge 8.
            $$

            The limit computed in part (a) gives the same result: it is equal to $2 \in \R_{>0}$.

        3. To prove that

            $$
            2\;n^5 - 8\;n^4 + 3\;n^3 \neq \Theta(n^3)
            $$

            we proceed by contradiction and we suppose that there exist $c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 2\;n^5 - 8\;n^4 + 3\;n^3 \le c_2\;n^3, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^3$, this is equivalent to

            $$
            0 \le 2\,n^2 - 8\,n + 3 \le c_2, \qquad \forall n \ge n_1.
            $$

            Since $2\,n^2 - 8\,n + 3 \rr +\infty$ as $n \rr +\infty$, the middle expression cannot remain bounded by the constant $c_2$: this is a contradiction.

            Alternatively, we compute the limit

            $$
            \lim_{n \to +\infty} \frac{2\;n^5 - 8\;n^4 + 3\;n^3}{n^3} = \lim_{n \to +\infty} \left(2\,n^2 - 8\,n + 3\right) = +\infty,
            $$

            so that $f(n) = \omega(n^3)$ by the limit criterion. Then, with the constant $c = c_2$ in the definition of $\omega$, we would have $f(n) > c_2\,n^3$ for all sufficiently large $n$, against the upper bound $f(n) \le c_2\,n^3$. Hence $f(n) \neq \Theta(n^3)$.

<a id="esercizio-9-6"></a>

!!! esercizio "Exercise 9.6: Asymptotic notation (E6)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto n^3\,(4 - \sin n) + 5\;n^2
    $$

    **Questions**

    1. Prove that:

        1. $n^3\,(4 - \sin n) + 5\;n^2 = \Theta(n^3)$;

        2. $n^3\,(4 - \sin n) + 5\;n^2 \neq o(n^3)$;

        3. $n^3\,(4 - \sin n) + 5\;n^2 \neq \omega(n^3)$.

??? soluzione "Solution"

    The ratio

    $$
    \frac{n^3\,(4 - \sin n) + 5\;n^2}{n^3} = 4 - \sin n + \frac{5}{n}, \qquad n \ge 1,
    $$

    does not have a limit as $n \to +\infty$, since it oscillates. Therefore the limit criteria cannot be applied, and we use the definitions. Since $-1 \le \sin n \le 1$, we have $3 \le 4 - \sin n \le 5$. Since $0 < \frac{5}{n} \le 5$ for $n \ge 1$, we obtain

    $$
    3 \le 4 - \sin n + \frac{5}{n} \le 10, \qquad \forall n \ge 1.
    $$

    1. 1. To prove that

            $$
            n^3\,(4 - \sin n) + 5\;n^2 = \Theta(n^3)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^3 \le n^3\,(4 - \sin n) + 5\;n^2 \le c_2\;n^3, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^3$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le 4 - \sin n + \frac{5}{n} \le c_2, \qquad \forall n \ge n_1.
            $$

            By the bounds above, by choosing for example $c_1 = 3$, $c_2 = 10$ and $n_1 = 1$, we have

            $$
            0 \le 3\;n^3 \le n^3\,(4 - \sin n) + 5\;n^2 \le 10\;n^3, \qquad \forall n \ge 1.
            $$

        2. To prove that

            $$
            n^3\,(4 - \sin n) + 5\;n^2 \neq o(n^3)
            $$

            we recall that $o(n^3)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le n^3\,(4 - \sin n) + 5\;n^2 < c\;n^3, \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^3 > 0$, $4 - \sin n + \frac{5}{n} < c$ for all $n \ge n_1$. Since $4 - \sin n + \frac{5}{n} \ge 3$ for every $n \ge 1$, for $c = 3$ there is no $n_1$ with this property. Therefore

            $$
            n^3\,(4 - \sin n) + 5\;n^2 \neq o(n^3).
            $$

            Equivalently, the ratio is bounded from below by $3$ and cannot converge to $0$.

        3. To prove that

            $$
            n^3\,(4 - \sin n) + 5\;n^2 \neq \omega(n^3)
            $$

            we recall that $\omega(n^3)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le c\;n^3 < n^3\,(4 - \sin n) + 5\;n^2, \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^3 > 0$, $c < 4 - \sin n + \frac{5}{n}$ for all $n \ge n_1$. Since $4 - \sin n + \frac{5}{n} \le 10$ for every $n \ge 1$, for $c = 10$ there is no $n_1$ with this property. Therefore

            $$
            n^3\,(4 - \sin n) + 5\;n^2 \neq \omega(n^3).
            $$

            Equivalently, the ratio is bounded from above by $10$ and cannot diverge to $+\infty$.

<a id="esercizio-9-7"></a>

!!! esercizio "Exercise 9.7: Asymptotic notation (E7)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto 4\;n^4 - n^3 - 6\;n^2
    $$

    **Questions**

    1. Prove that:

        1. $4\;n^4 - n^3 - 6\;n^2 = \bigO(n^4)$;

        2. $4\;n^4 - n^3 - 6\;n^2 = \Theta(n^4)$;

        3. $4\;n^4 - n^3 - 6\;n^2 \neq \Theta(n^2)$.

??? soluzione "Solution"

    1. 1. To prove that

            $$
            4\;n^4 - n^3 - 6\;n^2 = \bigO(n^4)
            $$

            we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 4\;n^4 - n^3 - 6\;n^2 \le c\;n^4, \qquad \forall n \ge n_1.
            $$

            First, we factorize:

            $$
            4\;n^4 - n^3 - 6\;n^2 = n^2\,(4n^2 - n - 6),
            $$

            where the roots of $4n^2-n-6$ are $\frac{1 \pm \sqrt{97}}{8}$, that is, about $-1.11$ and $1.36$. Hence $f(n) \ge 0$ for every integer $n \ge 2$ (for $n = 2$ the factor $4n^2-n-6$ is equal to $8$; for $n = 1$ we have $f(1) = -3 < 0$). With $n \ge 1$, dividing by $n^4$, the inequality $f(n) \le c\,n^4$ is equivalent to

            $$
            4 - \frac{1}{n} - \frac{6}{n^2} \le c, \qquad \forall n \ge n_1.
            $$

            Since

            $$
            -\frac{1}{n} - \frac{6}{n^2} = -\frac{n+6}{n^2} \le 0, \qquad \forall n \ge 1,
            $$

            we have

            $$
            4 - \frac{1}{n} - \frac{6}{n^2} \le 4, \qquad \forall n \ge 1.
            $$

            By choosing for example $c = 4$ and $n_1 = 2$, we have

            $$
            0 \le 4\;n^4 - n^3 - 6\;n^2 \le 4\;n^4, \qquad \forall n \ge 2.
            $$

            Since the functions are asymptotically positive, an alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{4\;n^4 - n^3 - 6\;n^2}{n^4} = \lim_{n \to +\infty} \left(4 - \frac{1}{n} - \frac{6}{n^2}\right) = 4 \in \R_{>0}.
            $$

        2. To prove that

            $$
            4\;n^4 - n^3 - 6\;n^2 = \Theta(n^4)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^4 \le 4\;n^4 - n^3 - 6\;n^2 \le c_2\;n^4, \qquad \forall n \ge n_1.
            $$

            For the upper bound, by part (a), $4\;n^4 - n^3 - 6\;n^2 \le 4\;n^4$ for all $n \ge 1$. For the lower bound, we observe that

            $$
            4\;n^4 - n^3 - 6\;n^2 - 3\;n^4 = n^4 - n^3 - 6\,n^2 = n^2\,(n-3)\,(n+2),
            $$

            which is non-negative for every integer $n \ge 3$ (it is equal to $0$ for $n = 3$ and positive for $n \ge 4$). Hence $3\;n^4 \le 4\;n^4 - n^3 - 6\;n^2$ for every $n \ge 3$; we choose $n_1 = 4$, but $n_1 = 3$ would also work. By choosing for example $c_1 = 3$, $c_2 = 4$ and $n_1 = 4$, we have

            $$
            0 \le 3\;n^4 \le 4\;n^4 - n^3 - 6\;n^2 \le 4\;n^4, \qquad \forall n \ge 4.
            $$

            The limit computed in part (a) gives the same result: it is equal to $4 \in \R_{>0}$.

        3. To prove that

            $$
            4\;n^4 - n^3 - 6\;n^2 \neq \Theta(n^2)
            $$

            we proceed by contradiction and we suppose that there exist $c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 4\;n^4 - n^3 - 6\;n^2 \le c_2\;n^2, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^2$, this is equivalent to

            $$
            0 \le 4\,n^2 - n - 6 \le c_2, \qquad \forall n \ge n_1.
            $$

            Since $4\,n^2 - n - 6 \rr +\infty$ as $n \rr +\infty$, the middle expression cannot remain bounded by the constant $c_2$: this is a contradiction.

            Alternatively, we compute the limit

            $$
            \lim_{n \to +\infty} \frac{4\;n^4 - n^3 - 6\;n^2}{n^2} = \lim_{n \to +\infty} \left(4\,n^2 - n - 6\right) = +\infty,
            $$

            so that $f(n) = \omega(n^2)$ by the limit criterion. Then, with the constant $c = c_2$ in the definition of $\omega$, we would have $f(n) > c_2\,n^2$ for all sufficiently large $n$, against the upper bound $f(n) \le c_2\,n^2$. Hence $f(n) \neq \Theta(n^2)$.

<a id="esercizio-9-8"></a>

!!! esercizio "Exercise 9.8: Asymptotic notation (E8)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto n^4\,(1 + \sin^2 n)
    $$

    **Questions**

    1. Prove that:

        1. $n^4\,(1 + \sin^2 n) = \Theta(n^4)$;

        2. $n^4\,(1 + \sin^2 n) \neq o(n^4)$;

        3. $n^4\,(1 + \sin^2 n) \neq \omega(n^4)$.

??? soluzione "Solution"

    The ratio

    $$
    \frac{n^4\,(1 + \sin^2 n)}{n^4} = 1 + \sin^2 n, \qquad n \ge 1,
    $$

    does not have a limit as $n \to +\infty$, since it oscillates. Therefore the limit criteria cannot be applied, and we use the definitions. Since $0 \le \sin^2 n \le 1$, we have

    $$
    1 \le 1 + \sin^2 n \le 2, \qquad \forall n \ge 1.
    $$

    1. 1. To prove that

            $$
            n^4\,(1 + \sin^2 n) = \Theta(n^4)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^4 \le n^4\,(1 + \sin^2 n) \le c_2\;n^4, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^4$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le 1 + \sin^2 n \le c_2, \qquad \forall n \ge n_1.
            $$

            By the bounds above, by choosing for example $c_1 = 1$, $c_2 = 2$ and $n_1 = 1$, we have

            $$
            0 \le 1\;n^4 \le n^4\,(1 + \sin^2 n) \le 2\;n^4, \qquad \forall n \ge 1.
            $$

        2. To prove that

            $$
            n^4\,(1 + \sin^2 n) \neq o(n^4)
            $$

            we recall that $o(n^4)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le n^4\,(1 + \sin^2 n) < c\;n^4, \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^4 > 0$, $1 + \sin^2 n < c$ for all $n \ge n_1$. Since $1 + \sin^2 n \ge 1$ for every $n \ge 1$, for $c = 1$ there is no $n_1$ with this property. Therefore

            $$
            n^4\,(1 + \sin^2 n) \neq o(n^4).
            $$

            Equivalently, the ratio is bounded from below by $1$ and cannot converge to $0$.

        3. To prove that

            $$
            n^4\,(1 + \sin^2 n) \neq \omega(n^4)
            $$

            we recall that $\omega(n^4)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le c\;n^4 < n^4\,(1 + \sin^2 n), \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^4 > 0$, $c < 1 + \sin^2 n$ for all $n \ge n_1$. Since $1 + \sin^2 n \le 2$ for every $n \ge 1$, for $c = 2$ there is no $n_1$ with this property. Therefore

            $$
            n^4\,(1 + \sin^2 n) \neq \omega(n^4).
            $$

            Equivalently, the ratio is bounded from above by $2$ and cannot diverge to $+\infty$.

<a id="esercizio-9-9"></a>

!!! esercizio "Exercise 9.9: Asymptotic notation (E9)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto 6\;n^3 - 11\;n^2 + 4\;n
    $$

    **Questions**

    1. Prove that:

        1. $6\;n^3 - 11\;n^2 + 4\;n = \bigO(n^3)$;

        2. $6\;n^3 - 11\;n^2 + 4\;n = \bigO(n^4)$;

        3. $6\;n^3 - 11\;n^2 + 4\;n = \Theta(n^3)$;

        4. $6\;n^3 - 11\;n^2 + 4\;n \neq \Theta(n^4)$.

??? soluzione "Solution"

    1. 1. To prove that

            $$
            6\;n^3 - 11\;n^2 + 4\;n = \bigO(n^3)
            $$

            we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 6\;n^3 - 11\;n^2 + 4\;n \le c\;n^3, \qquad \forall n \ge n_1.
            $$

            First, we observe that

            $$
            6\;n^3 - 11\;n^2 + 4\;n = n\,(6n^2-11n+4) = n\,(2n-1)\,(3n-4),
            $$

            hence

            $$
            0 \le 6\;n^3 - 11\;n^2 + 4\;n, \qquad \forall n \ge 2
            $$

            (for $n = 1$ the value is $f(1) = -1$ $< 0$). With $n \ge 1$, dividing by $n^3$, the inequality $f(n) \le c\,n^3$ is equivalent to

            $$
            6 - \frac{11}{n} + \frac{4}{n^2} \le c, \qquad \forall n \ge n_1.
            $$

            Since

            $$
            -\frac{11}{n} + \frac{4}{n^2} = \frac{4-11n}{n^2} \le 0, \qquad \forall n \ge 1,
            $$

            we have

            $$
            6 - \frac{11}{n} + \frac{4}{n^2} \le 6, \qquad \forall n \ge 1.
            $$

            By choosing for example $c = 6$ and $n_1 = 2$, we have

            $$
            0 \le 6\;n^3 - 11\;n^2 + 4\;n \le 6\;n^3, \qquad \forall n \ge 2.
            $$

            Since the functions are asymptotically positive, an alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{6\;n^3 - 11\;n^2 + 4\;n}{n^3} = \lim_{n \to +\infty} \left(6 - \frac{11}{n} + \frac{4}{n^2}\right) = 6 \in \R_{>0}.
            $$

        2. To prove that

            $$
            6\;n^3 - 11\;n^2 + 4\;n = \bigO(n^4)
            $$

            we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le 6\;n^3 - 11\;n^2 + 4\;n \le c\;n^4, \qquad \forall n \ge n_1.
            $$

            From part (a), $0 \le 6\;n^3 - 11\;n^2 + 4\;n \le 6\,n^3$ for all $n \ge 2$. Since $n^3 \le n^4$ for $n \ge 1$, we also have $6\;n^3 - 11\;n^2 + 4\;n \le 6\;n^4$. By choosing for example $c = 6$ and $n_1 = 2$, we have

            $$
            0 \le 6\;n^3 - 11\;n^2 + 4\;n \le 6\;n^4, \qquad \forall n \ge 2.
            $$

            Since the functions are asymptotically positive, an alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{6\;n^3 - 11\;n^2 + 4\;n}{n^4} = \lim_{n \to +\infty} \left(\frac{6}{n} - \frac{11}{n^2} + \frac{4}{n^3}\right) = 0^+.
            $$

        3. To prove that

            $$
            6\;n^3 - 11\;n^2 + 4\;n = \Theta(n^3)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^3 \le 6\;n^3 - 11\;n^2 + 4\;n \le c_2\;n^3, \qquad \forall n \ge n_1.
            $$

            For the upper bound, by part (a), $6\;n^3 - 11\;n^2 + 4\;n \le 6\;n^3$ for all $n \ge 1$. For the lower bound, we observe that

            $$
            6\;n^3 - 11\;n^2 + 4\;n - 5\;n^3 = n^3 - 11\,n^2 + 4\,n = n\,(n^2-11n+4),
            $$

            where the roots of $n^2-11n+4$ are $\frac{11 \pm \sqrt{105}}{2}$, that is, about $0.38$ and $10.62$; hence $n^2-11n+4 > 0$ for every integer $n \ge 11$ (for $n=11$ it is equal to $4$, for $n = 10$ it is equal to $-6$). Hence $5\;n^3 \le 6\;n^3 - 11\;n^2 + 4\;n$ for all $n \ge 11$. By choosing for example $c_1 = 5$, $c_2 = 6$ and $n_1 = 11$, we have

            $$
            0 \le 5\;n^3 \le 6\;n^3 - 11\;n^2 + 4\;n \le 6\;n^3, \qquad \forall n \ge 11.
            $$

            The limit computed in part (a) gives the same result: it is equal to $6 \in \R_{>0}$.

        4. To prove that

            $$
            6\;n^3 - 11\;n^2 + 4\;n \neq \Theta(n^4)
            $$

            we proceed by contradiction and we suppose that there exist $c_1 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^4 \le 6\;n^3 - 11\;n^2 + 4\;n, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^4$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le \frac{6}{n} - \frac{11}{n^2} + \frac{4}{n^3}, \qquad \forall n \ge n_1.
            $$

            Passing to the limit as $n \to +\infty$, we obtain $0 < c_1 \le 0$, which is impossible. Therefore

            $$
            6\;n^3 - 11\;n^2 + 4\;n \neq \Theta(n^4).
            $$

            Alternatively, the limit computed in part (b) is equal to $0^+$, so that $f(n) = o(n^4)$ by the limit criterion. Then, with the constant $c = c_1$ in the definition of $o$, we would have $f(n) < c_1\,n^4$ for all sufficiently large $n$, against the lower bound $c_1\,n^4 \le f(n)$.

<a id="esercizio-9-10"></a>

!!! esercizio "Exercise 9.10: Asymptotic notation (E10)"

    Consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto n^2\,(2 + \cos^2 n)
    $$

    **Questions**

    1. Prove that:

        1. $n^2\,(2 + \cos^2 n) = \Theta(n^2)$;

        2. $n^2\,(2 + \cos^2 n) \neq o(n^2)$;

        3. $n^2\,(2 + \cos^2 n) \neq \omega(n^2)$.

??? soluzione "Solution"

    The ratio

    $$
    \frac{n^2\,(2 + \cos^2 n)}{n^2} = 2 + \cos^2 n, \qquad n \ge 1,
    $$

    does not have a limit as $n \to +\infty$, since it oscillates. Therefore the limit criteria cannot be applied, and we use the definitions. Since $0 \le \cos^2 n \le 1$, we have

    $$
    2 \le 2 + \cos^2 n \le 3, \qquad \forall n \ge 1.
    $$

    1. 1. To prove that

            $$
            n^2\,(2 + \cos^2 n) = \Theta(n^2)
            $$

            we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^2 \le n^2\,(2 + \cos^2 n) \le c_2\;n^2, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^2$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le 2 + \cos^2 n \le c_2, \qquad \forall n \ge n_1.
            $$

            By the bounds above, by choosing for example $c_1 = 2$, $c_2 = 3$ and $n_1 = 1$, we have

            $$
            0 \le 2\;n^2 \le n^2\,(2 + \cos^2 n) \le 3\;n^2, \qquad \forall n \ge 1.
            $$

        2. To prove that

            $$
            n^2\,(2 + \cos^2 n) \neq o(n^2)
            $$

            we recall that $o(n^2)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le n^2\,(2 + \cos^2 n) < c\;n^2, \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^2 > 0$, $2 + \cos^2 n < c$ for all $n \ge n_1$. Since $2 + \cos^2 n \ge 2$ for every $n \ge 1$, for $c = 2$ there is no $n_1$ with this property. Therefore

            $$
            n^2\,(2 + \cos^2 n) \neq o(n^2).
            $$

            Equivalently, the ratio is bounded from below by $2$ and cannot converge to $0$.

        3. To prove that

            $$
            n^2\,(2 + \cos^2 n) \neq \omega(n^2)
            $$

            we recall that $\omega(n^2)$ requires that for every $c \in \R_{>0}$ there exists $n_1 \in \N$ such that

            $$
            0 \le c\;n^2 < n^2\,(2 + \cos^2 n), \qquad \forall n \ge n_1,
            $$

            that is, dividing by $n^2 > 0$, $c < 2 + \cos^2 n$ for all $n \ge n_1$. Since $2 + \cos^2 n \le 3$ for every $n \ge 1$, for $c = 3$ there is no $n_1$ with this property. Therefore

            $$
            n^2\,(2 + \cos^2 n) \neq \omega(n^2).
            $$

            Equivalently, the ratio is bounded from above by $3$ and cannot diverge to $+\infty$.

<a id="esercizio-9-11"></a>

!!! esercizio "Exercise 9.11: Asymptotic notation (E11)"

    Given $a \in \R_{>0}$ and $b \in \R$, consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto a\;n + b.
    $$

    **Questions**

    1. Prove, using the definitions, that for all $a \in \R_{>0}$ and $b \in \R$:

        1. $a\;n + b = \bigO(n)$;

        2. $a\;n + b = \bigO(n^2)$;

        3. $a\;n + b = \Theta(n)$;

        4. $a\;n + b \neq \Theta(n^2)$.

??? soluzione "Solution"

    The key remark is the following: if $n \ge \frac{2\,|b|}{a}$, then $|b| \le \frac{a}{2}\,n$, and therefore

    $$
    \frac{1}{2}\,a\,n = a\,n - \frac{a}{2}\,n \le a\,n - |b| \le a\,n + b \le a\,n + |b| \le a\,n + \frac{a}{2}\,n = \frac{3}{2}\,a\,n.
    $$

    To have $n \ge 1$ as well (so that we can divide by $n$), we use the threshold

    $$
    n_1 = \max\left\{1, \left\lceil \frac{2\,|b|}{a} \right\rceil\right\}.
    $$

    1. 1. To prove that $a\;n + b = \bigO(n)$, we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le a\;n + b \le c\;n, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n$, this is equivalent to

            $$
            0 \le a + \frac{b}{n} \le c, \qquad \forall n \ge n_1.
            $$

            By the key remark, $\frac{a}{2} \le a + \frac{b}{n} \le \frac{3}{2}\,a$ for all $n \ge \frac{2|b|}{a}$ (the upper value is reached when $b > 0$ and $n = \frac{2b}{a}$). Thus, by choosing for example $c = \frac{3}{2}\,a > 0$ and $n_1 = \max\left\{1, \left\lceil \frac{2|b|}{a} \right\rceil\right\}$, we have

            $$
            0 \le a\;n + b \le \frac{3}{2}\,a\;n, \qquad \forall n \ge \max\left\{1, \left\lceil \frac{2\,|b|}{a} \right\rceil\right\}.
            $$

        2. To prove that $a\;n + b = \bigO(n^2)$, we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le a\;n + b \le c\;n^2, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^2$, this is equivalent to

            $$
            0 \le \frac{a}{n} + \frac{b}{n^2} \le c, \qquad \forall n \ge n_1.
            $$

            For the left inequality we need $a\,n + b \ge 0$, that is, $n \ge -\frac{b}{a}$; together with $n \ge 1$ this gives the threshold $\max\left\{1, -\frac{b}{a}\right\}$. For the right inequality, for all $n \ge 1$ we have

            $$
            \frac{a}{n} + \frac{b}{n^2} \le \frac{a}{n} + \frac{|b|}{n^2} \le a + |b|.
            $$

            Thus, by choosing for example $c = a + |b| > 0$ and $n_1 = \left\lceil \max\left\{1, -\frac{b}{a}\right\} \right\rceil$, we have

            $$
            0 \le a\;n + b \le (a + |b|)\;n^2, \qquad \forall n \ge \left\lceil \max\left\{1, -\frac{b}{a}\right\} \right\rceil.
            $$

        3. To prove that $a\;n + b = \Theta(n)$, we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n \le a\;n + b \le c_2\;n, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le a + \frac{b}{n} \le c_2, \qquad \forall n \ge n_1.
            $$

            By the key remark, $\frac{a}{2} \le a + \frac{b}{n} \le \frac{3}{2}\,a$ for all $n \ge \frac{2|b|}{a}$ (the lower value is reached when $b < 0$ and $n = \frac{2|b|}{a}$, the upper one when $b > 0$ and $n = \frac{2b}{a}$). Thus, by choosing for example $c_1 = \frac{1}{2}\,a > 0$, $c_2 = \frac{3}{2}\,a > 0$ and $n_1 = \max\left\{1, \left\lceil \frac{2|b|}{a} \right\rceil\right\}$, we have

            $$
            0 \le \frac{1}{2}\,a\;n \le a\;n + b \le \frac{3}{2}\,a\;n, \qquad \forall n \ge \max\left\{1, \left\lceil \frac{2\,|b|}{a} \right\rceil\right\}.
            $$

            An alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{a\;n + b}{n} = a + \lim_{n \to +\infty} \underbrace{\frac{b}{n}}_{\rr 0} = a \in \R_{>0}.
            $$

        4. To prove that $a\;n + b \neq \Theta(n^2)$, we proceed by contradiction and we suppose that there exist $c_1 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^2 \le a\;n + b, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^2$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le \frac{a}{n} + \frac{b}{n^2}, \qquad \forall n \ge n_1.
            $$

            Passing to the limit as $n \to +\infty$, we obtain $0 < c_1 \le 0$, which is impossible: the inequality cannot hold for arbitrarily large $n$, since $c_1$ is a positive constant.

<a id="esercizio-9-12"></a>

!!! esercizio "Exercise 9.12: Asymptotic notation (E12)"

    Given $a \in \R_{>0}$, $b \in \R$ and $c \in \R$, consider the following asymptotically non-negative function of a natural variable:

    $$
    f: \N \rightarrow \R, \qquad f: n \mapsto a\;n^2 + b\;n + c.
    $$

    **Questions**

    1. Prove, using the definitions, that for all $a \in \R_{>0}$, $b \in \R$ and $c \in \R$:

        1. $a\;n^2 + b\;n + c = \Theta(n^2)$;

        2. $a\;n^2 + b\;n + c \neq \Theta(n^3)$.

??? soluzione "Solution"

    1. 1. To prove that $a\;n^2 + b\;n + c = \Theta(n^2)$, we determine $c_1, c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^2 \le a\;n^2 + b\;n + c \le c_2\;n^2, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^2$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le a + \frac{b}{n} + \frac{c}{n^2} \le c_2, \qquad \forall n \ge n_1.
            $$

            We bound the two terms $\frac{b}{n}$ and $\frac{c}{n^2}$ separately.

            - If $n \ge \frac{2\,|b|}{a}$, then $\frac{|b|}{n} \le \frac{a}{2}$, hence $-\frac{a}{2} \le \frac{b}{n} \le \frac{a}{2}$.

            - If $n \ge 2\sqrt{\frac{|c|}{a}}$, then $n^2 \ge \frac{4\,|c|}{a}$ and $\frac{|c|}{n^2} \le \frac{a}{4}$, hence $-\frac{a}{4} \le \frac{c}{n^2} \le \frac{a}{4}$.

            Therefore, for all $n \ge 2\,\max\left\{\frac{|b|}{a}, \sqrt{\frac{|c|}{a}}\right\}$,

            $$
            0 < \underbrace{a - \frac{1}{2}\,a - \frac{1}{4}\,a}_{=\frac{1}{4}\,a} \le a + \frac{b}{n} + \frac{c}{n^2} \le \underbrace{a + \frac{1}{2}\,a + \frac{1}{4}\,a}_{=\frac{7}{4}\,a}.
            $$

            Thus, by choosing for example $c_1 = \frac{1}{4}\,a > 0$, $c_2 = \frac{7}{4}\,a > 0$ and

            $$
            n_1 = \max\left\{1, \left\lceil 2\,\max\left\{\frac{|b|}{a}, \sqrt{\frac{|c|}{a}}\right\} \right\rceil\right\},
            $$

            we have

            $$
            0 \le \frac{1}{4}\,a\;n^2 \le a\;n^2 + b\;n + c \le \frac{7}{4}\,a\;n^2, \qquad \forall n \ge n_1.
            $$

            An alternative way is to compute the limit

            $$
            \lim_{n \to +\infty} \frac{a\;n^2 + b\;n + c}{n^2} = a + \lim_{n \to +\infty} \underbrace{\frac{b}{n}}_{\rr 0} + \lim_{n \to +\infty} \underbrace{\frac{c}{n^2}}_{\rr 0} = a \in \R_{>0}.
            $$

        2. To prove that $a\;n^2 + b\;n + c \neq \Theta(n^3)$, we proceed by contradiction and we suppose that there exist $c_1 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1\;n^3 \le a\;n^2 + b\;n + c, \qquad \forall n \ge n_1.
            $$

            With $n \ge 1$, dividing by $n^3$ and since $c_1 > 0$, this is equivalent to

            $$
            0 < c_1 \le \frac{a}{n} + \frac{b}{n^2} + \frac{c}{n^3}, \qquad \forall n \ge n_1.
            $$

            Passing to the limit as $n \to +\infty$, we obtain $0 < c_1 \le 0$, which is impossible: the inequality cannot hold for arbitrarily large $n$, since $c_1$ is a positive constant.

<a id="esercizio-9-13"></a>

!!! esercizio "Exercise 9.13: Asymptotic notation (E13)"

    Consider four asymptotically positive functions $f$, $g$, $p$ and $q$ of a natural variable and the following implications:

    \begin{equation*}
    \label{eq:n13-prod}
    f(n)=\Theta\big(p(n)\big) \ \text{ and } \ g(n)=\Theta\big(q(n)\big) ~~\Longrightarrow~~ f(n) \cdot g(n) = \Theta\big( p(n) \cdot q(n) \big), \tag{9.1}
    \end{equation*}

    \begin{equation*}
    \label{eq:n13-sum}
    f(n)=\Theta\big(p(n)\big) \ \text{ and } \ g(n)=\Theta\big(q(n)\big) ~~\Longrightarrow~~ f(n) + g(n) = \Theta\big( p(n) + q(n) \big). \tag{9.2}
    \end{equation*}

    **Questions**

    1. Prove that the implication $\eqref{eq:n13-prod}$ is true and write its contraposition.

    2. Prove that the converse of the implication $\eqref{eq:n13-prod}$ is not true, that is,

        $$
        f(n) \cdot g(n) = \Theta\big( p(n) \cdot q(n) \big) ~~\nRightarrow~~ f(n)=\Theta\big(p(n)\big) \ \text{ and } \ g(n)=\Theta\big(q(n)\big).
        $$

    3. Prove that the implication $\eqref{eq:n13-sum}$ is true and write its contraposition.

    4. Prove that the converse of the implication $\eqref{eq:n13-sum}$ is not true, that is,

        $$
        f(n) + g(n) = \Theta\big( p(n) + q(n) \big) ~~\nRightarrow~~ f(n)=\Theta\big(p(n)\big) \ \text{ and } \ g(n)=\Theta\big(q(n)\big).
        $$

??? soluzione "Solution"

    1. If $f(n)=\Theta\big(p(n)\big)$ and $g(n)=\Theta\big(q(n)\big)$, there exist $c_1,c_2 \in \R_{>0}$, $n_0\in \N$ and $c_3,c_4 \in \R_{>0}$, $n_1 \in \N$ such that

        $$
        0 \le c_1 \: p(n) \le f(n) \le c_2 \: p(n),~~ \forall n \ge n_0
        \qquad\text{and}\qquad
        0 \le c_3 \: q(n) \le g(n) \le c_4 \: q(n),~~ \forall n \ge n_1.
        $$

        Since all the terms are non-negative, we can multiply the two chains of inequalities term by term:

        $$
        0 \le \underbrace{c_1 \, c_3}_{>0} \: p(n) \: q(n) \le f(n)\cdot g(n) \le \underbrace{c_2 \, c_4}_{>0} \: p(n) \: q(n),\qquad \forall n \ge \max\{n_0,n_1\},
        $$

        and, as a consequence, $f(n) \cdot g(n) = \Theta\big( p(n) \cdot q(n) \big)$.

        It follows that “$f(n)=\Theta\big(p(n)\big)$ and $g(n)=\Theta\big(q(n)\big)$” is a sufficient condition for “$f(n) \cdot g(n) = \Theta\big( p(n) \cdot q(n) \big)$”, and the latter is a necessary condition for the former. By contraposition of $\eqref{eq:n13-prod}$ we have

        $$
        f(n) \cdot g(n) \neq \Theta\big( p(n) \cdot q(n) \big) ~~\Longrightarrow~~ f(n)\neq\Theta\big(p(n)\big) \ \text{ or } \ g(n)\neq\Theta\big(q(n)\big).
        $$

    2. A counterexample is enough. Let

        $$
        f(n)= n^2 +1,\qquad g(n)= n^2 -1,\qquad p(n)= n,\qquad q(n)= n^3.
        $$

        The four functions are asymptotically positive ($g(n) > 0$ for $n \ge 2$). We have

        $$
        f(n) \cdot g(n) = (n^2 +1) \, (n^2 -1) = n^4 - 1 \qquad\text{and}\qquad p(n) \cdot q(n) = n^4,
        $$

        and $n^4 - 1 = \Theta(n^4)$: by choosing $c_1 = \frac{1}{2}$, $c_2 = 1$ and $n_1 = 2$, we have $0 \le \frac{1}{2}\,n^4 \le n^4 - 1 \le n^4$ for all $n \ge 2$ (the lower bound is equivalent to $n^4 \ge 2$). On the other hand,

        $$
        \lim_{n \to +\infty} \frac{n^2+1}{n} = +\infty \qquad\text{and}\qquad \lim_{n \to +\infty} \frac{n^2-1}{n^3} = 0^+,
        $$

        so that $n^2 + 1 = \omega(n)$ and $n^2 - 1 = o(n^3)$; hence

        $$
        n^2 +1 \neq \Theta(n) \qquad \text{and} \qquad n^2 -1 \neq \Theta(n^3)
        $$

        (a function that is $\omega(n)$ exceeds $c_2\,n$ for every constant $c_2$, and a function that is $o(n^3)$ is smaller than $c_1\,n^3$ for every constant $c_1$, for all sufficiently large $n$).

    3. If $f(n)=\Theta\big(p(n)\big)$ and $g(n)=\Theta\big(q(n)\big)$, there exist $c_1,c_2 \in \R_{>0}$, $n_0\in \N$ and $c_3,c_4 \in \R_{>0}$, $n_1 \in \N$ such that

        $$
        0 \le c_1 \: p(n) \le f(n)\le c_2 \: p(n),~~ \forall n \ge n_0
        \qquad\text{and}\qquad
        0 \le c_3 \: q(n) \le g(n)\le c_4 \: q(n),~~ \forall n \ge n_1.
        $$

        Adding the two chains of inequalities, we obtain

        $$
        0 \le c_1 \: p(n) + c_3 \: q(n) \le f(n) + g(n) \le c_2 \: p(n) + c_4 \: q(n),\qquad \forall n \ge \max\{n_0,n_1\}.
        $$

        Since $p(n) \ge 0$ and $q(n) \ge 0$ for these values of $n$, this implies

        $$
        0 \le \underbrace{\min\{c_1,c_3\}}_{> 0} \big( p(n) + q(n) \big) \le f(n) + g(n) \le \underbrace{\max\{c_2,c_4\}}_{> 0} \big( p(n) + q(n) \big),\qquad \forall n \ge \max\{n_0,n_1\},
        $$

        and, as a consequence, $f(n) + g(n) =\Theta\big( p(n) + q(n) \big)$.

        It follows that “$f(n)=\Theta\big(p(n)\big)$ and $g(n)=\Theta\big(q(n)\big)$” is a sufficient condition for “$f(n) + g(n) = \Theta\big( p(n) + q(n) \big)$”, and the latter is a necessary condition for the former. By contraposition of $\eqref{eq:n13-sum}$ we have

        $$
        f(n) + g(n) \neq \Theta\big( p(n) + q(n) \big) ~~\Longrightarrow~~ f(n)\neq\Theta\big(p(n)\big) \ \text{ or } \ g(n)\neq\Theta\big(q(n)\big).
        $$

    4. A counterexample is enough. Let

        $$
        f(n)= 5\;n^3,\qquad g(n)= 7\;n,\qquad p(n)= n^3,\qquad q(n)= n^2.
        $$

        We have $5\;n^3 + 7\;n = \Theta( n^3 + n^2)$: by choosing $c_1 = \frac{5}{2}$, $c_2 = 7$ and $n_1 = 1$, we have

        $$
        0 \le \frac{5}{2}\,(n^3 + n^2) \le 5\;n^3 + 7\;n \le 7\,(n^3 + n^2), \qquad \forall n \ge 1,
        $$

        since $\frac{5}{2}\,(n^3 + n^2) \le \frac{5}{2} \cdot 2\,n^3 = 5\,n^3$ and $7\,n \le 2\,n^3 + 7\,n^2$ for $n \ge 1$. On the other hand, $5\;n^3 = \Theta(n^3)$ (with $c_1 = c_2 = 5$), but

        $$
        \lim_{n \to +\infty} \frac{7\,n}{n^2} = 0^+,
        $$

        so that $7\;n = o(n^2)$ and therefore $7\;n \neq \Theta(n^2)$.

<a id="esercizio-9-14"></a>

!!! esercizio "Exercise 9.14: Asymptotic notation (E14)"

    Consider two asymptotically non-negative functions $f$ and $g$ of a natural variable and the following equivalences:

    \begin{align*}
    \label{eq:n14-a}
    &f(n)= \Theta\big(g(n)\big) ~~\Longleftrightarrow~~ f(n)= \bigO\big(g(n)\big) \ \text{ and } \ f(n)= \Omega\big(g(n)\big), \tag{9.3}\\[1ex]
    \label{eq:n14-b}
    &f(n)= \bigO\big(g(n)\big) ~~\Longleftrightarrow~~ g(n)= \Omega\big(f(n)\big), \tag{9.4}\\[1ex]
    \label{eq:n14-c}
    &f(n)= o\big(g(n)\big) ~~\Longleftrightarrow~~ g(n)= \omega\big(f(n)\big), \tag{9.5}\\[1ex]
    \label{eq:n14-d}
    &f(n)= \Theta\big(g(n)\big) ~~\Longleftrightarrow~~ g(n)= \Theta\big(f(n)\big). \tag{9.6}
    \end{align*}

    **Questions**

    1. Prove that the equivalence $\eqref{eq:n14-a}$ is true.

    2. Prove that the equivalence $\eqref{eq:n14-b}$ is true.

    3. Prove that the equivalence $\eqref{eq:n14-c}$ is true.

    4. Prove that the equivalence $\eqref{eq:n14-d}$ is true.

??? soluzione "Solution"

    1. If $f(n)= \Theta\big(g(n)\big)$, there exist $c_1,c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c_1 \: g(n) \le f(n)\le c_2 \: g(n),\qquad\forall n \ge n_1,
        $$

        and therefore

        $$
        0 \le f(n)\le c_2 \: g(n), ~~\forall n \ge n_1 ~~\Longrightarrow~~ f(n)= \bigO\big(g(n)\big),
        $$

        $$
        0 \le c_1 \: g(n) \le f(n), ~~\forall n \ge n_1 ~~\Longrightarrow~~ f(n)= \Omega\big(g(n)\big).
        $$

        Conversely, if $f(n)= \Omega\big(g(n)\big)$, there exist $c_1 \in \R_{>0}$ and $n_1 \in \N$ such that $0 \le c_1 \: g(n) \le f(n)$ for all $n \ge n_1$, and if $f(n)= \bigO\big(g(n)\big)$, there exist $c_2 \in \R_{>0}$ and $n_2 \in \N$ such that $0 \le f(n) \le c_2 \: g(n)$ for all $n \ge n_2$. Combining the two inequalities, we have

        $$
        0 \le c_1 \: g(n) \le f(n)\le c_2 \: g(n),\qquad\forall n \ge \max\{n_1, n_2\} ~~\Longrightarrow~~ f(n)= \Theta\big(g(n)\big).
        $$

        It follows that “$f(n) = \Theta\big(g(n)\big)$” is a necessary and sufficient condition for “$f(n)= \bigO\big(g(n)\big)$ and $f(n)= \Omega\big(g(n)\big)$”.

    2. 1. If $f(n)= \bigO\big(g(n)\big)$, there exist $c \in \R_{>0}$ and $n_1 \in \N$ such that $0 \le f(n)\le c \: g(n)$ for all $n \ge n_1$. Dividing by $c > 0$,

            $$
            0 \le \frac{1}{c}\, f(n)\le g(n), \qquad\forall n \ge n_1 ~~\Longrightarrow~~ g(n)= \Omega\big(f(n)\big),
            $$

            with the constant $\frac{1}{c} > 0$.

        2. If $g(n)= \Omega\big(f(n)\big)$, there exist $c \in \R_{>0}$ and $n_1 \in \N$ such that $0 \le c \; f(n)\le g(n)$ for all $n \ge n_1$. Dividing by $c > 0$,

            $$
            0 \le f(n)\le \frac{1}{c} \: g(n), \qquad\forall n \ge n_1 ~~\Longrightarrow~~ f(n)= \bigO\big(g(n)\big).
            $$

        It follows that “$f(n)= \bigO\big(g(n)\big)$” is a necessary and sufficient condition for “$g(n)= \Omega\big(f(n)\big)$”.

    3. 1. Let $f(n)= o\big(g(n)\big)$. To prove that $g(n)= \omega\big(f(n)\big)$, we fix $c \in \R_{>0}$. By the definition of $f(n)= o\big(g(n)\big)$ with the constant $\frac{1}{c} > 0$, there exists $n_1 \in \N$ such that

            $$
            0 \le f(n) < \frac{1}{c}\, g(n),\qquad\forall n \ge n_1 ~~\Longrightarrow~~ 0 \le c\, f(n) < g(n), \qquad\forall n \ge n_1.
            $$

            Since $c$ is arbitrary, $g(n)= \omega\big(f(n)\big)$.

        2. Let $g(n)= \omega\big(f(n)\big)$. To prove that $f(n)= o\big(g(n)\big)$, we fix $c \in \R_{>0}$. By the definition of $g(n)= \omega\big(f(n)\big)$ with the constant $\frac{1}{c} > 0$, there exists $n_1 \in \N$ such that

            $$
            0 \le \frac{1}{c}\, f(n) < g(n),\qquad\forall n \ge n_1 ~~\Longrightarrow~~ 0 \le f(n) < c\, g(n), \qquad\forall n \ge n_1.
            $$

            Since $c$ is arbitrary, $f(n)= o\big(g(n)\big)$.

        It follows that “$f(n)= o\big(g(n)\big)$” is a necessary and sufficient condition for “$g(n)= \omega\big(f(n)\big)$”.

    4. 1. If $f(n)= \Theta\big(g(n)\big)$, there exist $c_1,c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

            $$
            0 \le c_1 \: g(n) \le f(n) \le c_2 \: g(n),\qquad\forall n \ge n_1.
            $$

            Dividing the left inequality by $c_1$ and the right inequality by $c_2$, we obtain

            $$
            0 \le \frac{1}{c_2}\: f(n) \le g(n) \le \frac{1}{c_1}\: f(n),\qquad\forall n \ge n_1.
            $$

            Since $\frac{1}{c_2} > 0$ and $\frac{1}{c_1} > 0$, this proves that $g(n)= \Theta\big(f(n)\big)$.

        2. If $g(n)= \Theta\big(f(n)\big)$, the same argument, with the roles of $f$ and $g$ exchanged, gives $f(n)= \Theta\big(g(n)\big)$.

        It follows that “$f(n)= \Theta\big(g(n)\big)$” is a necessary and sufficient condition for “$g(n)= \Theta\big(f(n)\big)$”.

<a id="esercizio-9-15"></a>

!!! esercizio "Exercise 9.15: Asymptotic notation (E15)"

    Consider three asymptotically non-negative functions $f$, $g$ and $h$ of a natural variable and the following implications (<strong>transitivity</strong>):

    \begin{align*}
    \label{eq:n15-1}
    &f(n)= \Theta\big(g(n)\big) \ \text{ and } \ g(n) = \Theta\big(h(n)\big) ~~\Longrightarrow~~ f(n)= \Theta\big(h(n)\big), \tag{9.7}\\[1ex]
    \label{eq:n15-2}
    &f(n)= \bigO\big(g(n)\big) \ \text{ and } \ g(n) = \bigO\big(h(n)\big) ~~\Longrightarrow~~ f(n)= \bigO\big(h(n)\big), \tag{9.8}\\[1ex]
    \label{eq:n15-3}
    &f(n)= \Omega\big(g(n)\big) \ \text{ and } \ g(n) = \Omega\big(h(n)\big) ~~\Longrightarrow~~ f(n)= \Omega\big(h(n)\big), \tag{9.9}\\[1ex]
    \label{eq:n15-4}
    &f(n)= o\big(g(n)\big) \ \text{ and } \ g(n) = o\big(h(n)\big) ~~\Longrightarrow~~ f(n)= o\big(h(n)\big), \tag{9.10}\\[1ex]
    \label{eq:n15-5}
    &f(n)= \omega\big(g(n)\big) \ \text{ and } \ g(n) = \omega\big(h(n)\big) ~~\Longrightarrow~~ f(n)= \omega\big(h(n)\big). \tag{9.11}
    \end{align*}

    **Questions**

    1. Prove that the implication $\eqref{eq:n15-1}$ is true and write its contraposition.

    2. Prove that the implication $\eqref{eq:n15-2}$ is true and write its contraposition.

    3. Prove that the implication $\eqref{eq:n15-3}$ is true and write its contraposition.

    4. Prove that the implication $\eqref{eq:n15-4}$ is true and write its contraposition.

    5. Prove that the implication $\eqref{eq:n15-5}$ is true and write its contraposition.

??? soluzione "Solution"

    1. If $f(n)=\Theta\big(g(n)\big)$ and $g(n)=\Theta\big(h(n)\big)$, there exist $c_1,c_2 \in \R_{>0}$, $n_0 \in \N$ and $c_3,c_4 \in \R_{>0}$, $n_1 \in \N$ such that

        $$
        0 \le c_1 \: g(n) \le f(n) \le c_2 \: g(n),~~\forall n \ge n_0
        \qquad\text{and}\qquad
        0 \le c_3 \: h(n) \le g(n) \le c_4 \: h(n),~~\forall n \ge n_1.
        $$

        It follows that, for all $n \ge \max\{n_0,n_1\}$,

        $$
        f(n) \ge c_1 \: g(n) \ge c_1 \, c_3 \: h(n)
        \qquad\text{and}\qquad
        f(n) \le c_2 \: g(n) \le c_2 \, c_4 \: h(n),
        $$

        hence

        $$
        0 \le \underbrace{c_1 c_3}_{>0} \: h(n) \le f(n) \le \underbrace{c_2 c_4}_{>0} \: h(n),\qquad\forall n \ge \max\{n_0,n_1\},
        $$

        which proves $f(n)=\Theta\big(h(n)\big)$. By contraposition of $\eqref{eq:n15-1}$:

        $$
        f(n) \neq \Theta\big(h(n)\big) ~~\Longrightarrow~~ f(n)\neq\Theta\big(g(n)\big) \ \text{ or } \ g(n)\neq\Theta\big(h(n)\big).
        $$

    2. If $f(n)=\bigO\big(g(n)\big)$ and $g(n)=\bigO\big(h(n)\big)$, there exist $c_1 \in \R_{>0}$, $n_0 \in \N$ and $c_2 \in \R_{>0}$, $n_1 \in \N$ such that

        $$
        0 \le f(n) \le c_1 \: g(n),~~\forall n \ge n_0
        \qquad\text{and}\qquad
        0 \le g(n) \le c_2 \: h(n),~~\forall n \ge n_1.
        $$

        It follows that

        $$
        0 \le f(n) \le c_1 \: g(n) \le \underbrace{c_1 c_2}_{>0} \: h(n),\qquad\forall n \ge \max\{n_0,n_1\},
        $$

        which proves $f(n)=\bigO\big(h(n)\big)$. By contraposition of $\eqref{eq:n15-2}$:

        $$
        f(n) \neq \bigO\big(h(n)\big) ~~\Longrightarrow~~ f(n)\neq \bigO\big(g(n)\big) \ \text{ or } \ g(n)\neq \bigO\big(h(n)\big).
        $$

    3. If $f(n)=\Omega\big(g(n)\big)$ and $g(n)=\Omega\big(h(n)\big)$, there exist $c_1 \in \R_{>0}$, $n_0 \in \N$ and $c_2 \in \R_{>0}$, $n_1 \in \N$ such that

        $$
        0 \le c_1 \: g(n) \le f(n),~~\forall n \ge n_0
        \qquad\text{and}\qquad
        0 \le c_2 \: h(n) \le g(n),~~\forall n \ge n_1.
        $$

        It follows that

        $$
        0 \le \underbrace{c_1 c_2}_{>0} \: h(n) \le c_1 \: g(n) \le f(n),\qquad\forall n \ge \max\{n_0,n_1\},
        $$

        which proves $f(n)=\Omega\big(h(n)\big)$. By contraposition of $\eqref{eq:n15-3}$:

        $$
        f(n) \neq \Omega\big(h(n)\big) ~~\Longrightarrow~~ f(n)\neq\Omega\big(g(n)\big) \ \text{ or } \ g(n)\neq\Omega\big(h(n)\big).
        $$

    4. Let $f(n)=o\big(g(n)\big)$ and $g(n)=o\big(h(n)\big)$, and let $c \in \R_{>0}$. By the definition of $f(n)=o\big(g(n)\big)$ with the constant $1$, and by the definition of $g(n)=o\big(h(n)\big)$ with the constant $c$, there exist $n_0,n_1 \in \N$ such that

        $$
        0 \le f(n) < g(n),~~\forall n \ge n_0
        \qquad\text{and}\qquad
        0 \le g(n) < c \: h(n),~~\forall n \ge n_1.
        $$

        It follows that

        $$
        0 \le f(n) < g(n) < c \: h(n),\qquad\forall n \ge \max\{n_0,n_1\},
        $$

        that is, $0 \le f(n) < c \: h(n)$. Since $c \in \R_{>0}$ is arbitrary, this proves $f(n)=o\big(h(n)\big)$. By contraposition of $\eqref{eq:n15-4}$:

        $$
        f(n) \neq o\big(h(n)\big) ~~\Longrightarrow~~ f(n)\neq o\big(g(n)\big) \ \text{ or } \ g(n)\neq o\big(h(n)\big).
        $$

    5. Let $f(n)=\omega\big(g(n)\big)$ and $g(n)=\omega\big(h(n)\big)$, and let $c \in \R_{>0}$. By the definition of $f(n)=\omega\big(g(n)\big)$ with the constant $1$, and by the definition of $g(n)=\omega\big(h(n)\big)$ with the constant $c$, there exist $n_0,n_1 \in \N$ such that

        $$
        0 \le g(n) < f(n),~~\forall n \ge n_0
        \qquad\text{and}\qquad
        0 \le c \: h(n) < g(n),~~\forall n \ge n_1.
        $$

        It follows that

        $$
        0 \le c \: h(n) < g(n) < f(n),\qquad\forall n \ge \max\{n_0,n_1\},
        $$

        that is, $0 \le c \: h(n) < f(n)$. Since $c \in \R_{>0}$ is arbitrary, this proves $f(n)=\omega\big(h(n)\big)$. By contraposition of $\eqref{eq:n15-5}$:

        $$
        f(n) \neq \omega\big(h(n)\big) ~~\Longrightarrow~~ f(n)\neq\omega\big(g(n)\big) \ \text{ or } \ g(n)\neq\omega\big(h(n)\big).
        $$

<a id="esercizio-9-16"></a>

!!! esercizio "Exercise 9.16: Asymptotic notation (E16)"

    Consider an asymptotically non-negative function $f$ of a natural variable and the following <strong>reflexivity</strong> properties:

    \begin{align*}
    \label{eq:n16-1}
    &f(n)= \Theta\big(f(n)\big), \tag{9.12}\\[1ex]
    \label{eq:n16-2}
    &f(n)= \bigO\big(f(n)\big), \tag{9.13}\\[1ex]
    \label{eq:n16-3}
    &f(n)= \Omega\big(f(n)\big). \tag{9.14}
    \end{align*}

    **Questions**

    1. Prove that the property $\eqref{eq:n16-1}$ is true.

    2. Prove that the property $\eqref{eq:n16-2}$ is true.

    3. Prove that the property $\eqref{eq:n16-3}$ is true.

??? soluzione "Solution"

    Since $f$ is asymptotically non-negative, there exists $\tilde n \in \N$ such that $f(n) \ge 0$ for all $n \ge \tilde n$. In the three proofs we use $n_1 = \tilde n$.

    1. To prove that $f(n)= \Theta\big(f(n)\big)$, we determine $c_1,c_2 \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c_1 \: f(n) \le f(n) \le c_2 \: f(n), \qquad \forall n \ge n_1.
        $$

        For $n \ge \tilde n$ the inequality $0 \le 1 \cdot f(n) \le f(n) \le 1 \cdot f(n)$ holds trivially. By choosing $c_1 = 1$, $c_2 = 1$ and $n_1 = \tilde n$, we have

        $$
        0 \le f(n) \le f(n) \le f(n), \qquad \forall n \ge \tilde n,
        $$

        which proves $f(n)= \Theta\big(f(n)\big)$.

    2. To prove that $f(n)= \bigO\big(f(n)\big)$, we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le f(n) \le c \: f(n), \qquad \forall n \ge n_1.
        $$

        By choosing $c = 1$ and $n_1 = \tilde n$, we have $0 \le f(n) \le f(n)$ for all $n \ge \tilde n$, which proves $f(n)= \bigO\big(f(n)\big)$.

    3. To prove that $f(n)= \Omega\big(f(n)\big)$, we determine $c \in \R_{>0}$ and $n_1 \in \N$ such that

        $$
        0 \le c \: f(n) \le f(n), \qquad \forall n \ge n_1.
        $$

        By choosing $c = 1$ and $n_1 = \tilde n$, we have $0 \le f(n) \le f(n)$ for all $n \ge \tilde n$, which proves $f(n)= \Omega\big(f(n)\big)$.

    Note that the assumption on $f$ is necessary: if $f(n) < 0$ for infinitely many $n$, the inequality $0 \le f(n)$ required by the three definitions fails for arbitrarily large $n$, and none of the three properties holds.
