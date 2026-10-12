---
title: "Exercises · The Master Theorem"
---

# Exercises · The Master Theorem

<div class="info-capitolo" markdown>

**Exercises · Chapter 16** · each solution opens with a click · [:material-book-open-variant: Chapter 16: The Master Theorem](../recursion/16-master-theorem.md) · [:material-file-pdf-box: Exercises, volume 5 (PDF)](../pdf/exercises-5-recursion.pdf)

</div>

In the exercises of this chapter recurrences in standard form $T(n)=a\,T(n/b)+f(n)$, with constants $a\ge 1$, $b>1$ and $f(n)$ asymptotically positive, are solved with the Master Theorem of the chapter «The Master Theorem», following the five-step scheme (identify, compute $n^{\log_b a}$, compare, verify, conclude). The following formulas are used.

!!! nota ""

    The three cases of the Master Theorem:

    - <strong>Case 1</strong>: if $f(n)=O\big(n^{\log_b a-\epsilon}\big)$ for some $\epsilon>0$, then $T(n)=\Theta\big(n^{\log_b a}\big)$.

    - <strong>Case 2</strong>: if $f(n)=\Theta\big(n^{\log_b a}\log^k n\big)$ for some $k\ge 0$, then $T(n)=\Theta\big(n^{\log_b a}\log^{k+1} n\big)$.

    - <strong>Case 3</strong>: if $f(n)=\Omega\big(n^{\log_b a+\epsilon}\big)$ for some $\epsilon>0$ and $a\,f(n/b)\le c\,f(n)$ for some $c<1$ and all large $n$ (regularity condition), then $T(n)=\Theta\big(f(n)\big)$.

!!! nota ""

    Cost of the recursion tree, for $n$ exact power of $b$:

    $$
    T(n)=T(1)\,n^{\log_b a}+\sum_{j=0}^{\log_b n-1}a^j f\left(\frac{n}{b^j}\right),
    \qquad a^{\log_b n}=n^{\log_b a}.
    $$

    Harmonic numbers: $H_L=\sum_{i=1}^{L}\frac{1}{i}$ satisfies $\ln(L+1)\le H_L\le 1+\ln L$; moreover $\sum_{i=1}^{\infty}\frac{1}{i^2}=\frac{\pi^2}{6}$.

<a id="esercizio-16-1"></a>

!!! esercizio "Exercise 16.1: The Master Theorem (E1)"

    Consider the following recurrences ($\log$ denotes $\log_2$):

    - **(a)** $T(n)=9\,T(n/3)+n$;

    - **(b)** $T(n)=2\,T(n/4)+\sqrt{n}$;

    - **(c)** $T(n)=2\,T(n/2)+n^2$;

    - **(d)** $T(n)=4\,T(n/2)+n^2\log n$;

    - **(e)** $T(n)=6\,T(n/3)+n^2\log n$.

    **Questions**

    1. For each recurrence, identify $a$, $b$, $f(n)$ and compute $n^{\log_b a}$.

    2. For each recurrence, determine which case of the Master Theorem applies, verify all its hypotheses ($\epsilon$, $k$, regularity condition) and give the order of growth of $T(n)$.

    3. For recurrence (c), compute $T(n)$ exactly for $n=2^L$ assuming $T(1)=1$, and check the result of the previous question.

??? soluzione "Solution"

    1.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th></th>
        <th><span class="arithmatex">&#92;(a&#92;)</span></th>
        <th><span class="arithmatex">&#92;(b&#92;)</span></th>
        <th><span class="arithmatex">&#92;(f(n)&#92;)</span></th>
        <th><span class="arithmatex">&#92;(n^{&#92;log&#95;b a}&#92;)</span></th>
        </tr>
        <tr>
        <td>(a)</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(n&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n^{&#92;log&#95;3 9}=n^2&#92;)</span></td>
        </tr>
        <tr>
        <td>(b)</td>
        <td>2</td>
        <td>4</td>
        <td><span class="arithmatex">&#92;(&#92;sqrt n&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n^{&#92;log&#95;4 2}=n^{1/2}=&#92;sqrt n&#92;)</span></td>
        </tr>
        <tr>
        <td>(c)</td>
        <td>2</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(n^2&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n^{&#92;log&#95;2 2}=n&#92;)</span></td>
        </tr>
        <tr>
        <td>(d)</td>
        <td>4</td>
        <td>2</td>
        <td><span class="arithmatex">&#92;(n^2&#92;log n&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n^{&#92;log&#95;2 4}=n^2&#92;)</span></td>
        </tr>
        <tr>
        <td>(e)</td>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">&#92;(n^2&#92;log n&#92;)</span></td>
        <td><span class="arithmatex">&#92;(n^{&#92;log&#95;3 6}&#92;approx n^{1.631}&#92;)</span></td>
        </tr>
        </table></div>

    2. We follow the scheme: identify $\to$ compute $n^{\log_b a}$ $\to$ compare $\to$ verify $\to$ conclude.

        - **(a)** $n^2$ is polynomially larger than $f(n)=n$ $\longrightarrow$ <span style="color:#e03131">case 1</span>. Indeed $f(n)=n=O(n^{2-\epsilon})$ with $\epsilon=1$. Hence

            $$
            T(n)=\Theta(n^2).
            $$

        - **(b)** $n^{1/2}$ and $f(n)=\sqrt n$ have the same order $\longrightarrow$ <span style="color:#e03131">case 2</span>: $f(n)=\Theta(n^{1/2}\log^k n)$ with $k=0$. Hence

            $$
            T(n)=\Theta(\sqrt n\,\log n).
            $$

        - **(c)** $n$ is polynomially smaller than $f(n)=n^2$ $\longrightarrow$ <span style="color:#e03131">case 3</span>. $f(n)=n^2=\Omega(n^{1+\epsilon})$ with $\epsilon=1$. Regularity condition:

            $$
            2\,f\left(\frac n2\right)=2\,\frac{n^2}{4}=\frac12\,n^2=c\,f(n)\qquad\text{with } c=\frac12<1,
            $$

            for every $n$. Hence

            $$
            T(n)=\Theta(n^2).
            $$

        - **(d)** $f(n)=n^2\log n$ is larger than $n^2$ only by a factor $\log n$ (not polynomially) and it has the form $n^{\log_b a}\log^k n$ $\longrightarrow$ <span style="color:#e03131">case 2</span> with $k=1$. Hence

            $$
            T(n)=\Theta(n^2\log^2 n).
            $$

        - **(e)** $n^{1.631}$ is polynomially smaller than $f(n)=n^2\log n$ $\longrightarrow$ <span style="color:#e03131">case 3</span>. Since $n^2\log n\ge n^2$ for $n\ge2$, $f(n)=\Omega(n^{\log_3 6+\epsilon})$ with $\epsilon=2-\log_3 6\approx0.369>0$. Regularity condition: for $n\ge3$, since $\log(n/3)\le\log n$,

            $$
            6\,f\left(\frac n3\right)=6\,\frac{n^2}{9}\log\frac n3\le\frac23\,n^2\log n=c\,f(n)\qquad\text{with } c=\frac23<1.
            $$

            Hence

            $$
            T(n)=\Theta(n^2\log n).
            $$

    3. By the recursion tree (Lemma of the cost of the recursion tree), with $n=2^L$, $a=2$, $T(1)=1$:

        $$
        T(n)=2^L\cdot 1+\sum_{j=0}^{L-1}2^j\left(\frac{n}{2^j}\right)^2=n+n^2\sum_{j=0}^{L-1}\left(\frac12\right)^j
        =n+n^2\,\frac{1-(1/2)^L}{1-1/2}=n+2n^2\left(1-\frac1n\right)=2n^2-n .
        $$

        Check with the recurrence: $T(2)=2+4=6=2\cdot4-2$, $T(4)=12+16=28=2\cdot16-4$, $T(8)=56+64=120=2\cdot 64-8$. Since

        $$
        \lim_{n\to\infty}\frac{2n^2-n}{n^2}=2\in\R_{>0},
        $$

        we have $T(n)=\Theta(n^2)$, as found with case 3. Note that the level costs $n^2(1/2)^j$ decrease geometrically: the root dominates.

<a id="esercizio-16-2"></a>

!!! esercizio "Exercise 16.2: The Master Theorem (E2)"

    Consider the following recurrences ($\log$ denotes $\log_2$):

    - **(a)** $T(n)=4\,T(n/2)+n^2/\log n$;

    - **(b)** $T(n)=n\,T(n/2)+n$;

    - **(c)** $T(n)=3\,T(n/3)+n/2$;

    - **(d)** $T(n)=T(n-2)+\log n$;

    - **(e)** $T(n)=64\,T(n/8)-n^2\log n$;

    - **(f)** $T(n)=\sqrt2\,T(n/2)+\log n$.

    **Questions**

    1. For each recurrence, say whether the Master Theorem can be applied. If not, explain precisely which hypothesis fails.

    2. For the recurrences to which the theorem applies, give the order of growth of $T(n)$, following the usual scheme.

    3. For recurrence (a), determine the order of growth of $T(n)$ for $n=2^L$ and $T(1)=1$ using the recursion tree.

??? soluzione "Solution"

    1. - **(a)** <strong>Not applicable.</strong> $a=4$, $b=2$, $n^{\log_2 4}=n^2$, $f(n)=n^2/\log n$. $f(n)$ is smaller than $n^2$ but not polynomially smaller: for every $\epsilon>0$

            $$
            \lim_{n\to\infty}\frac{n^2/\log n}{n^{2-\epsilon}}=\lim_{n\to\infty}\frac{n^\epsilon}{\log n}=+\infty,
            $$

            so case 1 fails; case 2 would need $k=-1<0$; case 3 fails since $f(n)$ is smaller than $n^2$. This is a <strong>gap</strong> between case 1 and case 2.

        - **(b)** <strong>Not applicable.</strong> The number of subproblems $a=n$ is not a constant.

        - **(c)** <strong>Applicable</strong>: $a=3$, $b=3$, $f(n)=n/2$ (see question 2).

        - **(d)** <strong>Not applicable.</strong> The subproblem has size $n-2$, not $n/b$: the recurrence is not in standard form.

        - **(e)** <strong>Not applicable.</strong> $f(n)=-n^2\log n<0$ for every $n\ge2$: $f$ is not asymptotically positive.

        - **(f)** <strong>Applicable</strong>: $a=\sqrt2\ge1$, $b=2$, $f(n)=\log n$ (see question 2). Note that $a$ does not have to be an integer.

    2. - **(c)** $n^{\log_b a}=n^{\log_3 3}=n$. $f(n)=n/2$ has the same order as $n$ $\longrightarrow$ <span style="color:#e03131">case 2</span>: $f(n)=\Theta(n\log^k n)$ with $k=0$ (constant factors do not matter). Hence

            $$
            T(n)=\Theta(n\log n).
            $$

        - **(f)** $n^{\log_b a}=n^{\log_2\sqrt2}=n^{1/2}$. $f(n)=\log n$ is polynomially smaller than $n^{1/2}$ $\longrightarrow$ <span style="color:#e03131">case 1</span>. Indeed, with $\epsilon=\frac14$,

            $$
            \lim_{n\to\infty}\frac{\log n}{n^{1/2-1/4}}=\lim_{n\to\infty}\frac{\log n}{n^{1/4}}=0^+,
            $$

            so $f(n)=O(n^{1/2-\epsilon})$. Hence

            $$
            T(n)=\Theta(\sqrt n).
            $$

        Even if the Master Theorem does not apply to (d), it is easy to solve: $T(n)$ is the sum of about $n/2$ terms $\log n,\log(n-2),\dots$, each at most $\log n$, and the first $n/4$ of them are at least $\log(n/2)$; hence $T(n)=\Theta(n\log n)$.

    3. Recursion tree with $n=2^L$: level $j$ has $4^j$ nodes of size $n/2^j$, and $\log(n/2^j)=L-j$. The cost of level $j$ is

        $$
        4^j\,\frac{(n/2^j)^2}{L-j}=\frac{n^2}{L-j}.
        $$

        The leaves are $4^L=n^2$, each with cost $T(1)=1$. Hence

        $$
        T(n)=n^2+\sum_{j=0}^{L-1}\frac{n^2}{L-j}=n^2+n^2\sum_{i=1}^{L}\frac1i=n^2\,(1+H_L),
        $$

        where $H_L$ is the $L$-th harmonic number. Comparing the sum with the integral of $1/x$,

        $$
        \ln(L+1)=\int_1^{L+1}\frac{dx}{x}\le H_L\le 1+\int_1^{L}\frac{dx}{x}=1+\ln L ,
        $$

        so $H_L=\Theta(\log L)=\Theta(\log\log n)$, and

        $$
        T(n)=\Theta(n^2\log\log n).
        $$

        For example, $T(16)=256\,(1+H_4)=256\left(1+\frac{25}{12}\right)=\frac{2368}{3}\approx 789.33$, which agrees with the recurrence: $T(2)=8$, $T(4)=40$, $T(8)=\frac{544}{3}$, $T(16)=4\cdot\frac{544}{3}+\frac{256}{4}=\frac{2368}{3}$.

<a id="esercizio-16-3"></a>

!!! esercizio "Exercise 16.3: The Master Theorem (E3)"

    Consider the following families of recurrences, depending on a real parameter ($\log$ denotes $\log_2$):

    - **(A)** $T(n)=a\,T(n/4)+n^2$, with $a\ge1$;

    - **(B)** $T(n)=8\,T(n/2)+n^d$, with $d\ge0$;

    - **(C)** $T(n)=4\,T(n/b)+n\log n$, with $b>1$.

    **Questions**

    1. For family (A), determine for which values of $a$ each case of the Master Theorem applies, and give the corresponding order of growth of $T(n)$. Verify the regularity condition when needed.

    2. Same question for family (B), as a function of $d$.

    3. Same question for family (C), as a function of $b$.

    4. In family (A), what is the largest integer $a$ such that $T(n)=O(n^2)$? What happens for $a=17$?

??? soluzione "Solution"

    1. Family (A): $b=4$, $f(n)=n^2$, $n^{\log_b a}=n^{\log_4 a}$. We compare the exponents $\log_4 a$ and $2$; note that $\log_4 a=2\iff a=16$.

        - $a>16$: $\log_4 a>2$ $\longrightarrow$ <span style="color:#e03131">case 1</span>, since $f(n)=n^2=O(n^{\log_4 a-\epsilon})$ with $\epsilon=\log_4 a-2>0$. Hence $T(n)=\Theta(n^{\log_4 a})$.

        - $a=16$: $n^{\log_4 16}=n^2$ $\longrightarrow$ <span style="color:#e03131">case 2</span> with $k=0$. Hence $T(n)=\Theta(n^2\log n)$.

        - $1\le a<16$: $\log_4 a<2$ $\longrightarrow$ <span style="color:#e03131">case 3</span>, with $f(n)=\Omega(n^{\log_4 a+\epsilon})$, $\epsilon=2-\log_4 a>0$. Regularity condition:

            $$
            a\,f\left(\frac n4\right)=a\,\frac{n^2}{16}=\frac{a}{16}\,n^2=c\,f(n)\qquad\text{with } c=\frac{a}{16}<1 .
            $$

            Hence $T(n)=\Theta(n^2)$.

    2. Family (B): $a=8$, $b=2$, $n^{\log_2 8}=n^3$, $f(n)=n^d$.

        - $0\le d<3$: <span style="color:#e03131">case 1</span> with $\epsilon=3-d>0$. Hence $T(n)=\Theta(n^3)$.

        - $d=3$: <span style="color:#e03131">case 2</span> with $k=0$. Hence $T(n)=\Theta(n^3\log n)$.

        - $d>3$: <span style="color:#e03131">case 3</span> with $\epsilon=d-3>0$. Regularity condition:

            $$
            8\left(\frac n2\right)^d=\frac{8}{2^d}\,n^d=2^{3-d}\,n^d=c\,f(n)\qquad\text{with } c=2^{3-d}<1 .
            $$

            Hence $T(n)=\Theta(n^d)$.

    3. Family (C): $a=4$, $f(n)=n\log n$, $n^{\log_b a}=n^{\log_b 4}$. We compare $\log_b 4$ with the exponent $1$ of $n$ in $f(n)$; note that $\log_b 4=1\iff b=4$, and $\log_b 4>1\iff b<4$.

        - $1<b<4$: $p=\log_b 4>1$ $\longrightarrow$ <span style="color:#e03131">case 1</span>. Choose $\epsilon=\frac{p-1}{2}>0$; then $p-\epsilon=1+\frac{p-1}{2}>1$ and

            $$
            \lim_{n\to\infty}\frac{n\log n}{n^{p-\epsilon}}=\lim_{n\to\infty}\frac{\log n}{n^{(p-1)/2}}=0^+,
            $$

            so $f(n)=O(n^{p-\epsilon})$. Hence $T(n)=\Theta(n^{\log_b 4})$.

        - $b=4$: $n^{\log_4 4}=n$ and $f(n)=n\log n=\Theta(n\log^k n)$ with $k=1$ $\longrightarrow$ <span style="color:#e03131">case 2</span>. Hence $T(n)=\Theta(n\log^2 n)$.

        - $b>4$: $p=\log_b 4<1$ $\longrightarrow$ <span style="color:#e03131">case 3</span>: since $n\log n\ge n$ for $n\ge2$, $f(n)=\Omega(n^{p+\epsilon})$ with $\epsilon=1-p>0$. Regularity condition, for $n\ge b$:

            $$
            4\,\frac nb\log\frac nb\le\frac4b\,n\log n=c\,f(n)\qquad\text{with } c=\frac4b<1 .
            $$

            Hence $T(n)=\Theta(n\log n)$.

    4. From question 1, $T(n)=\Theta(n^2)$ for $1\le a<16$, while $T(n)=\Theta(n^2\log n)$ for $a=16$, which is not $O(n^2)$ because $\lim_{n\to\infty}\frac{n^2\log n}{n^2}=+\infty$. Hence the largest integer is $a=15$.

        For $a=17$ we are in case 1: $T(n)=\Theta(n^{\log_4 17})\approx\Theta(n^{2.044})$. A small change in the number of subproblems changes the exponent of the running time.

<a id="esercizio-16-4"></a>

!!! esercizio "Exercise 16.4: The Master Theorem (E4)"

    Consider the following two recursive algorithms. In <code>PairSum</code> the length $n=r-l+1$ of the sub-array is a power of $2$; in <code>TernaryMax</code> it is a power of $3$. The first call is on the whole array $a[1..n]$, i.e., with $l=1$ and $r=n$.

    !!! algoritmo "Algorithm: PairSum"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#92;)</span> of integer numbers and two indices <span class="arithmatex">&#92;(l&#92;le r&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>An integer number <span class="arithmatex">&#92;(s&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> PairSum(a, l, r)</span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(l = r&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(0&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-c"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(m := &#92;lfloor (l+r)/2&#92;rfloor&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-d"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s :=&#92;)</span> PairSum(<span class="arithmatex">&#92;(a, l, m&#92;)</span>) <span class="arithmatex">&#92;(+&#92;)</span> PairSum(<span class="arithmatex">&#92;(a, m+1, r&#92;)</span>)</span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-e"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i := l&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le m&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-g"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j := m+1&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-h"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(j &#92;le r&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-i"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(s &#92;leftarrow s + a&#91;i&#93;&#92;cdot a&#91;j&#93;&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-j"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(j &#92;leftarrow j+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-k"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i+1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfour-l"><span class="pc-n">16</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(s&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">17</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    !!! algoritmo "Algorithm: TernaryMax"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#92;)</span> of integer numbers and two indices <span class="arithmatex">&#92;(l&#92;le r&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>An integer number</span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> TernaryMax(a, l, r)</span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfourt-a"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(l = r&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfourt-b"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(a&#91;l&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfourt-c"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(t := (r-l+1)/3&#92;)</span></span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfourt-d"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(x :=&#92;)</span> TernaryMax(<span class="arithmatex">&#92;(a, l, l+t-1&#92;)</span>)</span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfourt-e"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(y :=&#92;)</span> TernaryMax(<span class="arithmatex">&#92;(a, l+t, l+2t-1&#92;)</span>)</span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfourt-f"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(z :=&#92;)</span> TernaryMax(<span class="arithmatex">&#92;(a, l+2t, r&#92;)</span>)</span></span></div>
        <div class="pc-riga" id="riga-ex-16-master-theorem-exfourt-g"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(&#92;max&#92;{x,y,z&#92;}&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    **Questions**

    1. What do the two algorithms compute?

    2. Write the recurrence for the number of steps $S(n)$ executed by <code>PairSum</code>, counting the executions of each line, and solve it with the Master Theorem. Determine the worst-case running time $T(|I|)$.

    3. Same question for <code>TernaryMax</code>. Then compute $S(n)$ exactly with the recursion tree and verify it for $n=9$.

??? soluzione "Solution"

    1. <code>PairSum</code>$(a,1,n)$ returns the sum of the products of all pairs of distinct entries,

        $$
        \sum_{1\le i<j\le n}a[i]\,a[j]:
        $$

        each pair is either inside the left half, or inside the right half (recursive calls), or has $i$ in the left half and $j$ in the right half (the two nested loops).<br> <code>TernaryMax</code>$(a,1,n)$ returns the maximum value of the array: it splits the array into three parts of equal length, computes the maximum of each part recursively and returns the largest of the three.

    2. Let $n=r-l+1\ge2$ and $h=n/2$ (the length of each half). The number of times each line is executed, <strong>excluding the steps executed inside the recursive calls</strong>, is:

        - <span style="color:#e03131">Line</span> [2](#riga-ex-16-master-theorem-exfour-a) is executed $1$ time

        - <span style="color:#e03131">Line</span> [3](#riga-ex-16-master-theorem-exfour-b) is executed $0$ times

        - <span style="color:#e03131">Line</span> [5](#riga-ex-16-master-theorem-exfour-c) is executed $1$ time

        - <span style="color:#e03131">Line</span> [6](#riga-ex-16-master-theorem-exfour-d) is executed $1$ time (plus the two recursive calls on $h$ entries)

        - <span style="color:#e03131">Line</span> [7](#riga-ex-16-master-theorem-exfour-e) is executed $1$ time

        - <span style="color:#e03131">Line</span> [8](#riga-ex-16-master-theorem-exfour-f) is executed $h+1$ times

        - <span style="color:#e03131">Line</span> [9](#riga-ex-16-master-theorem-exfour-g) is executed $h$ times

        - <span style="color:#e03131">Line</span> [10](#riga-ex-16-master-theorem-exfour-h) is executed $h(h+1)$ times

        - <span style="color:#e03131">Line</span> [11](#riga-ex-16-master-theorem-exfour-i) is executed $h^2$ times

        - <span style="color:#e03131">Line</span> [12](#riga-ex-16-master-theorem-exfour-j) is executed $h^2$ times

        - <span style="color:#e03131">Line</span> [14](#riga-ex-16-master-theorem-exfour-k) is executed $h$ times

        - <span style="color:#e03131">Line</span> [16](#riga-ex-16-master-theorem-exfour-l) is executed $1$ time

        In total $1+1+1+1+(h+1)+h+h(h+1)+h^2+h^2+h+1=3h^2+4h+6$. With $h=n/2$, and since for $n=1$ only lines [2](#riga-ex-16-master-theorem-exfour-a) and [3](#riga-ex-16-master-theorem-exfour-b) are executed,

        $$
        S(n)=\begin{cases}
        2 & \text{if } n=1,\\[1mm]
        2\,S(n/2)+\dfrac34 n^2+2n+6 & \text{if } n\ge 2.
        \end{cases}
        $$

        (For example $S(2)=2\cdot2+\frac34\cdot4+4+6=17$.) We apply the Master Theorem:

        1. $a=2$, $b=2$, $f(n)=\frac34n^2+2n+6$.

        2. $n^{\log_b a}=n^{\log_2 2}=n$.

        3. $f(n)=\Theta(n^2)$ is polynomially larger than $n$ $\longrightarrow$ <span style="color:#e03131">case 3</span>.

        4. $f(n)\ge\frac34 n^2$, hence $f(n)=\Omega(n^{1+\epsilon})$ with $\epsilon=1$. Regularity condition with $c=\frac34$:

            $$
            2\,f\left(\frac n2\right)=\frac38n^2+2n+12\le\frac34\left(\frac34n^2+2n+6\right)=\frac{9}{16}n^2+\frac32n+\frac92
            $$

            $$
            \Longleftrightarrow\quad 0\le\frac{3}{16}n^2-\frac12 n-\frac{15}{2}
            \quad\Longleftrightarrow\quad 3n^2-8n-120\ge0,
            $$

            which holds for every $n\ge8$ (the positive root is $\frac{8+\sqrt{1504}}{6}\approx7.8$).

        5. $S(n)=\Theta(f(n))=\Theta(n^2)$.

        Under the hypothesis that every entry uses a constant number of bits, $|I|=\Theta(n)$, hence $n=\Theta(|I|)$.

        !!! chiave ""

            The worst-case running time of <code>PairSum</code>, as a function of the input size $|I|$, is

            $$
            T(|I|)=\Theta(|I|^2).
            $$

    3. For <code>TernaryMax</code> with $n\ge 3$ (a power of 3), excluding the recursive calls, lines [2](#riga-ex-16-master-theorem-exfourt-a), [5](#riga-ex-16-master-theorem-exfourt-c), [6](#riga-ex-16-master-theorem-exfourt-d), [7](#riga-ex-16-master-theorem-exfourt-e), [8](#riga-ex-16-master-theorem-exfourt-f), [9](#riga-ex-16-master-theorem-exfourt-g) are executed once each and line [3](#riga-ex-16-master-theorem-exfourt-b) is not executed: $6$ steps. For $n=1$, lines [2](#riga-ex-16-master-theorem-exfourt-a) and [3](#riga-ex-16-master-theorem-exfourt-b) are executed: $2$ steps. Each of the three calls is on $t=n/3$ entries. Hence

        $$
        S(n)=\begin{cases}
        2 & \text{if } n=1,\\
        3\,S(n/3)+6 & \text{if } n\ge 3.
        \end{cases}
        $$

        1. $a=3$, $b=3$, $f(n)=6$.

        2. $n^{\log_b a}=n^{\log_3 3}=n$.

        3. $n$ is polynomially larger than $f(n)=6$ $\longrightarrow$ <span style="color:#e03131">case 1</span>.

        4. $f(n)=6=O(n^{1-\epsilon})$ with $\epsilon=1$.

        5. $S(n)=\Theta(n)$.

        !!! chiave ""

            The worst-case running time of <code>TernaryMax</code>, as a function of the input size $|I|$, is

            $$
            T(|I|)=\Theta(|I|).
            $$

        Exact value with the recursion tree, $n=3^L$: level $j$ has $3^j$ internal nodes of cost $6$, and there are $3^L=n$ leaves of cost $2$:

        $$
        S(n)=2n+\sum_{j=0}^{L-1}6\cdot3^j=2n+6\,\frac{3^L-1}{3-1}=2n+3(n-1)=5n-3 .
        $$

        Check for $n=9$: $S(1)=2$, $S(3)=3\cdot2+6=12$, $S(9)=3\cdot12+6=42=5\cdot9-3$. $\checkmark$

<a id="esercizio-16-5"></a>

!!! esercizio "Exercise 16.5: The Master Theorem (E5)"

    A student solves three recurrences as follows ($\log$ denotes $\log_2$, $T(1)=1$):

    - **(a)** $T(n)=2\,T(n/2)+n\log n$. “$f(n)=n\log n$ is larger than $n^{\log_2 2}=n$, so by case 3 $T(n)=\Theta(n\log n)$.”

    - **(b)** $T(n)=2\,T(n/2)+n/\log n$. “$f(n)=n/\log n$ is smaller than $n$, so by case 1 $T(n)=\Theta(n)$.”

    - **(c)** $T(n)=2\,T(n/2)+n/\log^2 n$. “$f(n)=n/\log^2 n$ is smaller than $n$, so by case 1 $T(n)=\Theta(n)$.”

    **Questions**

    1. Find the mistake in each of the three solutions.

    2. Solve (a) correctly with the Master Theorem.

    3. Solve (b) and (c) for $n=2^L$ with the recursion tree. Is the final answer of the student correct for (b)? And for (c)?

    4. Verify your formulas for (b) and (c) computing $T(16)$ directly from the recurrences.

??? soluzione "Solution"

    1. The student compares $f(n)$ with $n^{\log_b a}=n$ but forgets that the comparison must be <strong>polynomial</strong>.

        - **(a)** Case 3 requires $f(n)=\Omega(n^{1+\epsilon})$ for some $\epsilon>0$. But for every $\epsilon>0$

            $$
            \lim_{n\to\infty}\frac{n\log n}{n^{1+\epsilon}}=\lim_{n\to\infty}\frac{\log n}{n^{\epsilon}}=0^+,
            $$

            so $f(n)\neq\Omega(n^{1+\epsilon})$: case 3 does not apply.

        - **(b)** and (c) Case 1 requires $f(n)=O(n^{1-\epsilon})$ for some $\epsilon>0$. But for every $\epsilon>0$

            $$
            \lim_{n\to\infty}\frac{n/\log n}{n^{1-\epsilon}}=\lim_{n\to\infty}\frac{n^{\epsilon}}{\log n}=+\infty,
            \qquad
            \lim_{n\to\infty}\frac{n/\log^2 n}{n^{1-\epsilon}}=\lim_{n\to\infty}\frac{n^{\epsilon}}{\log^2 n}=+\infty,
            $$

            so case 1 does not apply. Case 2 would require $k=-1$ and $k=-2$, respectively, but $k\ge0$. Both recurrences fall in the <strong>gap</strong> between case 1 and case 2: the Master Theorem cannot be used.

    2. (a) $a=2$, $b=2$, $f(n)=n\log n$, $n^{\log_2 2}=n$. $f(n)=\Theta(n\log^k n)$ with $k=1$ $\longrightarrow$ <span style="color:#e03131">case 2</span>:

        $$
        T(n)=\Theta(n\log^2 n).
        $$

    3. For $n=2^L$: level $j$ has $2^j$ nodes of size $n/2^j$, with $\log(n/2^j)=L-j$; there are $2^L=n$ leaves of cost $T(1)=1$.

        - **(b)** Level $j$ costs $2^j\,\dfrac{n/2^j}{L-j}=\dfrac{n}{L-j}$, hence

            $$
            T(n)=n+\sum_{j=0}^{L-1}\frac{n}{L-j}=n+n\sum_{i=1}^{L}\frac1i=n\,(1+H_L).
            $$

            Since $\ln(L+1)\le H_L\le1+\ln L$, $H_L=\Theta(\log L)$ and

            $$
            T(n)=\Theta(n\log\log n).
            $$

            The student's answer $\Theta(n)$ is <strong>wrong</strong>: $\lim_{n\to\infty}\frac{n\log\log n}{n}=+\infty$.

        - **(c)** Level $j$ costs $2^j\,\dfrac{n/2^j}{(L-j)^2}=\dfrac{n}{(L-j)^2}$, hence

            $$
            T(n)=n+n\sum_{i=1}^{L}\frac1{i^2}.
            $$

            The series $\sum_{i\ge1}\frac1{i^2}$ converges (to $\frac{\pi^2}{6}\approx1.645$), so

            $$
            n\le T(n)\le n\left(1+\frac{\pi^2}{6}\right),\qquad\text{i.e.,}\qquad T(n)=\Theta(n).
            $$

            The student's <strong>answer is correct, but the reasoning is wrong</strong>: the Master Theorem does not apply, and the result must be proved with the recursion tree. Here the level costs decrease so fast towards the leaves that the leaves ($n$ of them) dominate.

    4. For $n=16$ ($L=4$):

        - **(b)** $T(2)=2+\frac21=4$, $T(4)=8+\frac42=10$, $T(8)=20+\frac83=\frac{68}{3}$, $T(16)=\frac{136}{3}+\frac{16}{4}=\frac{148}{3}$.<br> Formula: $16\,(1+H_4)=16\left(1+\frac{25}{12}\right)=\frac{148}{3}\approx49.33$. $\checkmark$

        - **(c)** $T(2)=2+\frac21=4$, $T(4)=8+\frac44=9$, $T(8)=18+\frac89=\frac{170}{9}$, $T(16)=\frac{340}{9}+\frac{16}{16}=\frac{349}{9}$.<br> Formula: $16\left(1+1+\frac14+\frac19+\frac1{16}\right)=16\left(2+\frac{61}{144}\right)=\frac{349}{9}\approx38.78$. $\checkmark$

<a id="esercizio-16-6"></a>

!!! esercizio "Exercise 16.6: The Master Theorem (E6)"

    Consider the recurrences, defined for $n$ power of $2$:

    $$
    T_1(n)=3\,T_1(n/2)+n^2,\qquad T_2(n)=4\,T_2(n/2)+n,\qquad T_1(1)=T_2(1)=1 .
    $$

    **Questions**

    1. For $n=8$, draw the table of the recursion tree of $T_1$ (level, number of nodes, size, cost of the level) and verify the lemma, comparing with the value of $T_1(8)$ computed directly from the recurrence.

    2. Same question for $T_2$ and $n=8$.

    3. Using the lemma, find a closed formula for $T_1(n)$ and $T_2(n)$, $n=2^L$.

    4. Solve both recurrences with the Master Theorem and check the result with the closed formulas.

    5. For $T_1$, check numerically, for $n=8$, the bound $f(n)\le g(n)\le\frac{f(n)}{1-c}$ of case 3 of the lemma on the sum $g(n)$.

??? soluzione "Solution"

    1. $T_1$: $a=3$, $b=2$, $f(n)=n^2$, $\log_2 8=3$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>level <span class="arithmatex">&#92;(j&#92;)</span></th>
        <th>nodes <span class="arithmatex">&#92;(3^j&#92;)</span></th>
        <th>size <span class="arithmatex">&#92;(8/2^j&#92;)</span></th>
        <th>cost per node</th>
        <th>cost of the level</th>
        </tr>
        <tr>
        <td>0</td>
        <td>1</td>
        <td>8</td>
        <td>64</td>
        <td>64</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>16</td>
        <td>48</td>
        </tr>
        <tr>
        <td>2</td>
        <td>9</td>
        <td>2</td>
        <td>4</td>
        <td>36</td>
        </tr>
        <tr>
        <td>3 (leaves)</td>
        <td>27</td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(T&#95;1(1)=1&#92;)</span></td>
        <td>27</td>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>total</td>
        <td>175</td>
        </tr>
        </table></div>

        The number of leaves is $3^{3}=27=8^{\log_2 3}$ (indeed $8^{\log_2 3}=(2^3)^{\log_2 3}=(2^{\log_2 3})^3=3^3$). Directly:

        $$
        T_1(2)=3+4=7,\qquad T_1(4)=21+16=37,\qquad T_1(8)=111+64=175. \quad\checkmark
        $$

    2. $T_2$: $a=4$, $b=2$, $f(n)=n$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>level <span class="arithmatex">&#92;(j&#92;)</span></th>
        <th>nodes <span class="arithmatex">&#92;(4^j&#92;)</span></th>
        <th>size <span class="arithmatex">&#92;(8/2^j&#92;)</span></th>
        <th>cost per node</th>
        <th>cost of the level</th>
        </tr>
        <tr>
        <td>0</td>
        <td>1</td>
        <td>8</td>
        <td>8</td>
        <td>8</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>4</td>
        <td>4</td>
        <td>16</td>
        </tr>
        <tr>
        <td>2</td>
        <td>16</td>
        <td>2</td>
        <td>2</td>
        <td>32</td>
        </tr>
        <tr>
        <td>3 (leaves)</td>
        <td><span class="arithmatex">&#92;(64=8^{&#92;log&#95;2 4}&#92;)</span></td>
        <td>1</td>
        <td><span class="arithmatex">&#92;(T&#95;2(1)=1&#92;)</span></td>
        <td>64</td>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>total</td>
        <td>120</td>
        </tr>
        </table></div>

        Directly: $T_2(2)=4+2=6$, $T_2(4)=24+4=28$, $T_2(8)=112+8=120$. $\checkmark$

    3. With $n=2^L$:

        $$
        T_1(n)=n^{\log_2 3}+\sum_{j=0}^{L-1}3^j\frac{n^2}{4^j}=n^{\log_2 3}+n^2\,\frac{1-(3/4)^L}{1-3/4}=n^{\log_2 3}+4n^2-4n^2\,\frac{3^L}{4^L}.
        $$

        Since $4^L=n^2$ and $3^L=n^{\log_2 3}$,

        $$
        T_1(n)=4n^2-3\,n^{\log_2 3}.
        $$

        (Check: $4\cdot64-3\cdot27=256-81=175$.) Similarly

        $$
        T_2(n)=n^{2}+\sum_{j=0}^{L-1}4^j\frac{n}{2^j}=n^2+n\,(2^L-1)=2n^2-n .
        $$

        (Check: $128-8=120$.)

    4. - $T_1$: $n^{\log_2 3}\approx n^{1.585}$ is polynomially smaller than $f(n)=n^2$ $\longrightarrow$ <span style="color:#e03131">case 3</span>, with $\epsilon=2-\log_2 3\approx0.415$. Regularity: $3\left(\frac n2\right)^2=\frac34n^2$, so $c=\frac34<1$. Hence $T_1(n)=\Theta(n^2)$. Closed formula:

            $$
            \lim_{n\to\infty}\frac{4n^2-3n^{\log_2 3}}{n^2}=\lim_{n\to\infty}\left(4-\frac{3}{n^{2-\log_2 3}}\right)=4\in\R_{>0}. \quad\checkmark
            $$

        - $T_2$: $n^{\log_2 4}=n^2$ is polynomially larger than $f(n)=n$ $\longrightarrow$ <span style="color:#e03131">case 1</span>, with $\epsilon=1$. Hence $T_2(n)=\Theta(n^2)$. Closed formula: $\lim_{n\to\infty}\frac{2n^2-n}{n^2}=2\in\R_{>0}$. $\checkmark$

        Both recurrences are $\Theta(n^2)$, but for different reasons: in $T_1$ the cost is dominated by the root (level costs $n^2(3/4)^j$ decrease), in $T_2$ by the leaves (level costs $n\,2^j$ increase).

    5. For $T_1$ and $n=8$: $g(8)=64+48+36=148$, $f(8)=64$, $c=\frac34$:

        $$
        64\le 148\le\frac{64}{1-3/4}=256. \quad\checkmark
        $$
