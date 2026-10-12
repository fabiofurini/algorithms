---
title: "Pseudo-code"
---

# Pseudo-code

<div class="info-capitolo" markdown>

**Part 1 · Basic algorithms · Chapter 2** · [:material-file-pdf-box: Lecture notes, volume 1 (PDF)](../pdf/lecture-notes-1-basic-algorithms.pdf) · [:material-pencil: Exercises: Pseudo-code](../exercises/ex-02-pseudo-code.md)

</div>

## Introduction

In the previous chapter we have seen how the data of an algorithm, the numbers, are represented. In this chapter we fix the language used in these notes to describe the algorithms themselves: the <strong>pseudo-code</strong>. Pseudo-code is precise enough to describe every step of an algorithm without ambiguity, and simple enough to be read without knowing any programming language.

The chapter introduces the elements of pseudo-code one at a time, from the simplest to the most structured:

- variables, declarations and assignments, and the basic operations on them;

- the basic constructs that control the order of execution: conditional statements, loops, and the loop control statements <strong>break</strong> and <strong>continue</strong>;

- arrays with one, two and more indices;

- functions, which give a name to an algorithm, with its input and its output;

- sets.

Each construct is followed by examples, executed step by step on small instances. Executing an algorithm by hand, while keeping track of the values of its variables, is the best way to understand what it does.

## 2.1 Introduction to pseudo-code

<a id="box-1-defAlgorithm"></a>

!!! definizione "Definition 2.1: algorithm"

    An <strong>algorithm</strong> is a finite sequence of unambiguous instructions that, starting from some data given as <strong>input</strong>, produces a result given as <strong>output</strong> in a finite number of steps.

<a id="box-2-defPseudoCode"></a>

!!! definizione "Definition 2.2: pseudo-code"

    <strong>Pseudo-code</strong> is a high-level description of an algorithm that uses a mixture of natural language and programming language-like structures.

- Pseudo-code is not meant to be executed by a computer, but rather to communicate the logic of an algorithm to humans.

- Pseudo-code allows us to focus on the logic and structure of an algorithm without worrying about the syntax of a specific programming language.

- <strong>Convention:</strong> in these notes, all reserved words (keywords) of pseudo-code are written in bold, e.g., <strong>if</strong>, <strong>while</strong>, <strong>for</strong>, <strong>return</strong>, etc.

!!! chiave ""

    <strong>Advantages of pseudo-code:</strong>

    - Language-independent: it can be understood by programmers of different languages

    - Easy to write and modify

    - Focuses on the logic of the algorithm rather than on implementation details

    - Facilitates communication between developers and non-technical stakeholders

    - Useful for planning before actual coding

    <strong>Key principles:</strong>

    - Use clear and descriptive variable names

    - Keep statements simple and concise

    - Use indentation to show structure and nesting

    - Use standard constructs (<strong>if-then-else</strong>, <strong>while</strong>, <strong>for</strong>, etc.)

    - Include comments when necessary to clarify complex operations

!!! chiave ""

    <strong>Recommended practices:</strong>

    - <strong>Indentation:</strong> use consistent indentation to show the block structure

    - <strong>Variables:</strong> use descriptive names in italics or regular text

    - <strong>Comments:</strong> add comments (in natural language) to explain complex steps

    - <strong>Input/Output:</strong> clearly specify the input parameters and the output (return values)

    - <strong>Line numbers:</strong> useful for referencing specific lines

    - <strong>Consistency:</strong> maintain the same notation and style throughout

## 2.2 Variables and assignments

The data of an algorithm are stored in <strong>variables</strong>: named containers whose value can change during the execution. A variable is first created with a declaration and then modified with assignments.

### 2.2.1 Variables

!!! chiave ""

    - Variables must be declared before use

    - The declaration operator is “$:=$”

    - The declaration specifies the variable name and its initial value

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t">variable := initial_value</span></span></div>
    </div>

<a id="box-3-texexpbox1"></a>

!!! esempio "Example 2.1: variable declaration"

    Seven variables declared with their initial values: integer, rational, $-\infty$ and logical (<strong>true</strong>/<strong>false</strong>) values are all allowed.

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(n := 5&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(m := 10&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(x := -3/5&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(count := 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(max := -&#92;infty&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(status&#92;)</span> := true</span></span></div>
    </div>

### 2.2.2 Assignment

!!! chiave ""

    - The assignment operator is “$\leftarrow$”

    - It assigns the value of an expression to a previously declared variable: first the expression on the right is evaluated, then its value replaces the old value of the variable

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t">variable <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> expression</span></span></div>
    </div>

<a id="box-4-texexpbox2"></a>

!!! esempio "Example 2.2: assignment"

    With the variables of [Example 2.1](#box-3-texexpbox1):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(n &#92;leftarrow 10&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum &#92;leftarrow n + m&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(count &#92;leftarrow count + 1&#92;)</span></span></span></div>
    </div>

    After the three assignments $n = 10$, $sum = 10 + 10 = 20$ and $count = 1 + 1 = 2$. In the last assignment the same variable appears on both sides: the old value $1$ is used to compute the new value $2$.

<a id="box-5-texexpbox2b"></a>

!!! esempio "Example 2.3: exchanging the values of two variables"

    To exchange the values of two variables $x$ and $y$ we need a third, temporary variable $tmp$: the assignment $x \leftarrow y$ alone would overwrite the old value of $x$.

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(tmp := x&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(x &#92;leftarrow y&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(y &#92;leftarrow tmp&#92;)</span></span></span></div>
    </div>

    <strong>Step-by-step execution</strong> with $x = 3$ and $y = 8$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>statement</th>
    <th><span class="arithmatex">&#92;(x&#92;)</span></th>
    <th><span class="arithmatex">&#92;(y&#92;)</span></th>
    <th><span class="arithmatex">&#92;(tmp&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(8&#92;)</span></td>
    <td>–</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(tmp := x&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(x &#92;leftarrow y&#92;)</span></td>
    <td><span class="arithmatex">&#92;(8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(y &#92;leftarrow tmp&#92;)</span></td>
    <td><span class="arithmatex">&#92;(8&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    </table></div>

## 2.3 Basic operations

Expressions combine variables and values with the following operations.

!!! chiave ""

    <strong>Mathematical operations:</strong>

    - $+, -, \times, /$: basic arithmetic

    - $a \bmod b$: modulo, i.e., the remainder of the integer division of $a$ by $b$

    - $\lfloor x \rfloor$: floor (greatest integer $\le x$)

    - $\lceil x \rceil$: ceiling (smallest integer $\ge x$)

    - $|x|$: absolute value

    - $\max(a, b)$, $\min(a, b)$: maximum and minimum

    <strong>Comparison operators:</strong>

    - $=, \neq$: equal, not equal

    - $<, \le, >, \ge$: less than, less than or equal to, greater than, greater than or equal to

    <strong>Logical operators:</strong>

    - <strong>and</strong>, <strong>or</strong>, <strong>not</strong>: logical operations

    <strong>Input/Output:</strong>

    - <strong>read</strong>(variable): read input from the user

    - <strong>print</strong>(expression): output a value

<a id="box-6-texexpbox2c"></a>

!!! esempio "Example 2.4: evaluating expressions"

    - $17 \bmod 5 = 2$, since $17 = 3 \cdot 5 + 2$; in particular, an integer $i$ is a multiple of $3$ if and only if $i \bmod 3 = 0$.

    - $\lfloor 7/2 \rfloor = \lfloor 3.5 \rfloor = 3$ and $\lceil 7/2 \rceil = \lceil 3.5 \rceil = 4$.

    - $|-3| = 3$, $\max(-3, 2) = 2$ and $\min(-3, 2) = -3$.

    - $(5 > 3)$ <strong>and</strong> $(2 > 4)$ is <strong>false</strong>, while $(5 > 3)$ <strong>or</strong> $(2 > 4)$ is <strong>true</strong>.

## 2.4 Basic constructs

The statements of pseudo-code are executed one after the other, from top to bottom. Two kinds of constructs change this order: <strong>conditional statements</strong>, which execute a block only when a condition holds, and <strong>loops</strong>, which execute a block several times.

### 2.4.1 Conditional statements

#### If-then

!!! chiave ""

    - Executes a block of statements only if a condition is true

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>if</strong> condition <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<a id="box-7-texexpbox3"></a>

!!! esempio "Example 2.5: if-then"

    Checking whether a number $x$ is positive:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(positive&#92;)</span> := false</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(x &gt; 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(positive&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> true</span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>print</strong>(<span class="arithmatex">&#92;(x&#92;)</span> is positive)</span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance 1:</strong> $x = 5$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(x&#92;)</span></th>
    <th><span class="arithmatex">&#92;(x &gt; 0&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(positive&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td>false</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td>Yes</td>
    <td>true</td>
    </tr>
    </table></div>

    <strong>Output:</strong> <code>5 is positive</code>

    <strong>Instance 2:</strong> $x = -3$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(x&#92;)</span></th>
    <th><span class="arithmatex">&#92;(x &gt; 0&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(positive&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td>false</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-3&#92;)</span></td>
    <td>No</td>
    <td>false</td>
    </tr>
    </table></div>

    <strong>Output:</strong> nothing is printed.

#### If-then-else

!!! chiave ""

    - Executes one block if the condition is true, and another block if it is false

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>if</strong> condition <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements when true</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>else</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements when false</span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<a id="box-8-texexpbox4"></a>

!!! esempio "Example 2.6: if-then-else"

    Computing the absolute value of a number $x$:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(result&#92;)</span> := 0</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(x &#92;ge 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(result&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(x&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-t"><strong>else</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(result&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(-x&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance 1:</strong> $x = 7$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(x&#92;)</span></th>
    <th><span class="arithmatex">&#92;(x &#92;ge 0&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(result&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Result:</strong> $result = 7$

    <strong>Instance 2:</strong> $x = -4$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(x&#92;)</span></th>
    <th><span class="arithmatex">&#92;(x &#92;ge 0&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(result&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(-4&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Result:</strong> $result = 4$

### 2.4.2 Loops

#### While loop

!!! chiave ""

    - Repeats a block of statements while a condition is true

    - The condition is checked before each iteration

    - If the condition is initially false, the loop body is never executed

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>while</strong> condition <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<a id="box-9-texexpbox6"></a>

!!! esempio "Example 2.7: while loop"

    Computing the sum of the numbers from $1$ to $n$:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(sum + i&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance:</strong> $n = 5$. Each row shows the value of $i$ when the condition is checked, the outcome of the check, and the values of $sum$ and $i$ at the end of the iteration.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(i &#92;le n&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(sum&#92;)</span></th>
    <th><span class="arithmatex">&#92;(i&#92;)</span> (after)</th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(15&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(15&#92;)</span></td>
    <td>–</td>
    </tr>
    </table></div>

    <strong>Result:</strong> $sum = 15$

In the previous example the number of iterations is known in advance. The while loop is necessary when it is not, as in the next example.

<a id="box-10-texexpbox7b"></a>

!!! esempio "Example 2.8: while loop"

    Computing how many times a number $x$ must be halved before it becomes smaller than or equal to a threshold $\varepsilon > 0$:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(count := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(x &gt; &#92;varepsilon&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(x &#92;leftarrow x / 2&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(count &#92;leftarrow count + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance 1:</strong> $x = 10$, $\varepsilon = 1$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(x&#92;)</span></th>
    <th><span class="arithmatex">&#92;(count&#92;)</span></th>
    <th><span class="arithmatex">&#92;(x &gt; &#92;varepsilon&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(x&#92;)</span> (after)</th>
    <th><span class="arithmatex">&#92;(count&#92;)</span> (after)</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(2.5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2.5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(1.25&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1.25&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(0.625&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(0.625&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td>No <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> exit</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Result:</strong> $count = 4$

    <strong>Instance 2:</strong> $x = 100$, $\varepsilon = 10$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(x&#92;)</span></th>
    <th><span class="arithmatex">&#92;(count&#92;)</span></th>
    <th><span class="arithmatex">&#92;(x &gt; &#92;varepsilon&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(x&#92;)</span> (after)</th>
    <th><span class="arithmatex">&#92;(count&#92;)</span> (after)</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(100&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(50&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(50&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(25&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(25&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(12.5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(12.5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(6.25&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(6.25&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td>No <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> exit</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Result:</strong> $count = 4$

#### For loop

!!! chiave ""

    - Repeats a block of statements for a specified number of times

    - Typically used when the number of iterations is known in advance

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> variable := start_value <strong>to</strong>  end_value <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

The for loop is a compact way of writing a particular while loop: the loop variable is declared with the start value, the condition compares it with the end value, and it is increased by $1$ at the end of each iteration.

!!! chiave ""

    The loop on the left is equivalent to the loop on the right:

    <div class="minipage" style="width:45%" markdown>

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := s&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(e&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:45%" markdown>

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(i := s&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le e&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    In particular, the body is executed $e - s + 1$ times if $s \le e$, and it is never executed if $s > e$.

<a id="box-11-texexpbox7"></a>

!!! esempio "Example 2.9: for loop"

    Computing the sum of the numbers from $1$ to $n$ with a for loop (compare with [Example 2.7](#box-9-texexpbox6)):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(sum + i&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance:</strong> $n = 5$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(i &#92;le n&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(sum&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(15&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(15&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Result:</strong> $sum = 15$

!!! chiave ""

    The for loop can optionally use a <strong>step</strong> value, to increase the loop variable by values other than $1$.

<a id="box-12-texexpbox8"></a>

!!! esempio "Example 2.10: for loop with step"

    Computing the sum of the first $n$ even numbers ($2, 4, \ldots, 2n$):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 2&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(2n&#92;)</span> <strong>step</strong>  <span class="arithmatex">&#92;(2&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum&#92;)</span> <span class="arithmatex">&#92;(&#92;leftarrow&#92;)</span> <span class="arithmatex">&#92;(sum + i&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance:</strong> $n = 4$ (even numbers: $2, 4, 6, 8$)

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(i &#92;le 2n&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(sum&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(8&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(20&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(20&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Result:</strong> $sum = 20$

### 2.4.3 Loop control statements

Sometimes a loop must be interrupted before its natural end, or a single iteration must be skipped. Two statements serve these purposes.

#### Break statement

!!! chiave ""

    - The <strong>break</strong> statement immediately exits the current loop

    - Execution continues with the first statement after the loop

    - Useful when a termination condition is met before the natural completion of the loop

    <div class="minipage" style="width:47%" markdown>

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>while</strong> condition <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> exit_condition <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>break</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:47%" markdown>

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> variable := start_value <strong>to</strong>  end_value <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> exit_condition <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>break</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

<a id="box-13-texexpbox11"></a>

!!! esempio "Example 2.11: break statement"

    Computing the sum of the numbers from $1$ to $n$, stopping as soon as the sum exceeds a threshold $t$.

    <div class="minipage" style="width:47%" markdown>

    With a while loop:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum &#92;leftarrow sum + i&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(sum &gt; t&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>break</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:47%" markdown>

    With a for loop:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum &#92;leftarrow sum + i&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(sum &gt; t&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>break</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <strong>Step-by-step execution (both loops):</strong>

    <strong>Instance:</strong> $n = 6$, $t = 10$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(sum&#92;)</span></th>
    <th><span class="arithmatex">&#92;(sum &gt; t&#92;)</span>?</th>
    </tr>
    <tr>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td>–</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>No</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>No</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td>No</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    <td>No</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(15&#92;)</span></td>
    <td>Yes <span class="arithmatex">&#92;(&#92;Rightarrow&#92;)</span> <strong>break</strong></td>
    </tr>
    </table></div>

    <strong>Result:</strong> $sum = 15$; the iteration with $i = 6$ is never executed.

#### Continue statement

!!! chiave ""

    - The <strong>continue</strong> statement skips the rest of the current iteration

    - Execution proceeds immediately with the next iteration of the loop (in a while loop, with the check of the condition)

    - Useful when certain iterations should be skipped based on a condition

    <div class="minipage" style="width:47%" markdown>

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>while</strong> condition <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> skip_condition <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>continue</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:47%" markdown>

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> variable := start_value <strong>to</strong>  end_value <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> skip_condition <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>continue</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

<a id="box-14-texexpbox12"></a>

!!! esempio "Example 2.12: continue statement"

    Computing the sum of the numbers from $1$ to $n$, skipping the multiples of $3$.

    <div class="minipage" style="width:47%" markdown>

    With a while loop:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(i := 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>while</strong> <span class="arithmatex">&#92;(i &#92;le n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(i &#92;bmod 3 = 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>continue</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum &#92;leftarrow sum + i&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(i &#92;leftarrow i + 1&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    <div class="minipage" style="width:47%" markdown>

    With a for loop:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(sum := 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(i &#92;bmod 3 = 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>continue</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(sum &#92;leftarrow sum + i&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    </div>

    In the while loop the variable $i$ must be increased before <strong>continue</strong>: otherwise the condition $i \bmod 3 = 0$ would remain true forever and the loop would never end. In the for loop the increase is automatic.

    <strong>Step-by-step execution (both loops):</strong>

    <strong>Instance:</strong> $n = 7$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(i &#92;bmod 3 = 0&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(sum&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Result:</strong> $sum = 19 = 1 + 2 + 4 + 5 + 7$

!!! chiave ""

    <strong>Key points on the basic constructs.</strong>

    - <strong>if-then</strong> and <strong>if-then-else</strong> choose which block to execute according to a condition.

    - <strong>while</strong> repeats a block as long as a condition is true, checking it before each iteration; <strong>for</strong> repeats a block for each value of a loop variable from a start value to an end value.

    - <strong>break</strong> exits the loop; <strong>continue</strong> skips to the next iteration.

    - Executing a construct step by step on a small instance, with a table of the values of the variables, shows exactly what it does.

## 2.5 Arrays

Many algorithms work on a collection of values of the same kind, for instance a list of $n$ numbers. Instead of declaring $n$ different variables, we use an array.

!!! chiave ""

    - Arrays are indexed collections of variables and must be declared before use

    - The declaration operator is “new array” followed by the index range

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t">array_name := new array[start..end]</span></span></div>
    </div>

<a id="box-15-texexpbox13"></a>

!!! esempio "Example 2.13: array declaration"

    Creating an array of size $n$, indexed from $1$ to $n$:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(a := &#92;text{new array}&#91;1..n&#93;&#92;)</span></span></span></div>
    </div>

!!! chiave ""

    - The notation $a[i]$ denotes the variable at index $i$

    - Arrays are typically indexed starting from $0$ or $1$: in the pseudo-code of these notes the indices start from $1$, so an array of $n$ elements is $a[1..n]$; in many programming languages, such as C++, the indices start from $0$

    - Each variable in the array must be initialized before access and use

    - To initialize all the elements to the same value, use a <strong>for</strong> loop:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i :=&#92;)</span> start <strong>to</strong>  end <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">array_name<span class="arithmatex">&#92;(&#91;i&#93; &#92;leftarrow&#92;)</span> initial_value</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<a id="box-16-texexpbox14"></a>

!!! esempio "Example 2.14: array assignment"

    Initializing and accessing the variables of an array $a[1..n]$ (with $n \ge 5$):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Initialize all variables in the array to zero</span></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;i&#93; &#92;leftarrow 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Access and modify</span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(x := a&#91;5&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(a&#91;3&#93; &#92;leftarrow 42&#92;)</span></span></span></div>
    </div>

    With $n = 5$ the array is $[0, 0, 0, 0, 0]$ after the loop, $x = 0$, and the array is $[0, 0, 42, 0, 0]$ at the end.

### 2.5.1 Two-dimensional arrays

!!! chiave ""

    - Two-dimensional arrays are indexed collections of variables with two indices and must be declared before use

    - The declaration operator is “new array” followed by the two index ranges

    - Two-dimensional arrays are typically indexed starting from $0$ or $1$ (from $1$ in these notes)

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t">array_name := new array[start<span class="arithmatex">&#92;(&#95;1&#92;)</span>..end<span class="arithmatex">&#92;(&#95;1&#92;)</span>][start<span class="arithmatex">&#92;(&#95;2&#92;)</span>..end<span class="arithmatex">&#92;(&#95;2&#92;)</span>]</span></span></div>
    </div>

<a id="box-17-texexpbox15"></a>

!!! esempio "Example 2.15: two-dimensional array declaration"

    Creating a two-dimensional array of size $m \times n$ (indexed from $1$ to $m$ and from $1$ to $n$):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(b := &#92;text{new array}&#91;1..m&#93;&#91;1..n&#93;&#92;)</span></span></span></div>
    </div>

!!! chiave ""

    - The notation $b[i][j]$ denotes the variable at row $i$ and column $j$

    - Each variable in the array must be initialized before access and use

    - To initialize all the elements to the same value, use nested <strong>for</strong> loops:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i :=&#92;)</span> start<span class="arithmatex">&#92;(&#95;1&#92;)</span> <strong>to</strong>  end<span class="arithmatex">&#92;(&#95;1&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j :=&#92;)</span> start<span class="arithmatex">&#92;(&#95;2&#92;)</span> <strong>to</strong>  end<span class="arithmatex">&#92;(&#95;2&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t">array_name<span class="arithmatex">&#92;(&#91;i&#93;&#91;j&#93; &#92;leftarrow&#92;)</span> initial_value</span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<a id="box-18-texexpbox16"></a>

!!! esempio "Example 2.16: two-dimensional array assignment"

    Initializing and accessing the variables of a two-dimensional array $b[1..m][1..n]$ (with $m \ge 2$ and $n \ge 3$):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Initialize all variables in the two-dimensional array to zero</span></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(m&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(b&#91;i&#93;&#91;j&#93; &#92;leftarrow 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Access and modify</span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(x := b&#91;2&#93;&#91;3&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(b&#91;1&#93;&#91;1&#93; &#92;leftarrow 42&#92;)</span></span></span></div>
    </div>

    The outer loop runs over the rows and, for each row $i$, the inner loop runs over all the columns: the elements are visited in the order $b[1][1], b[1][2], \dots, b[1][n], b[2][1], \dots, b[m][n]$, for a total of $m \cdot n$ assignments.

### 2.5.2 Multi-dimensional arrays

!!! chiave ""

    - Multi-dimensional arrays are indexed collections of variables with multiple indices and must be declared before use

    - The declaration operator is “new array” followed by the index ranges for each dimension

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t">array_name := new array[start<span class="arithmatex">&#92;(&#95;1&#92;)</span>..end<span class="arithmatex">&#92;(&#95;1&#92;)</span>][start<span class="arithmatex">&#92;(&#95;2&#92;)</span>..end<span class="arithmatex">&#92;(&#95;2&#92;)</span>]<span class="arithmatex">&#92;(&#92;cdots&#92;)</span>[start<span class="arithmatex">&#92;(&#95;k&#92;)</span>..end<span class="arithmatex">&#92;(&#95;k&#92;)</span>]</span></span></div>
    </div>

<a id="box-19-texexpbox17"></a>

!!! esempio "Example 2.17: multi-dimensional array declaration"

    Creating a $3$-dimensional array of size $p \times q \times r$ (indexed from $1$ to $p$, from $1$ to $q$, and from $1$ to $r$):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(t := &#92;text{new array}&#91;1..p&#93;&#91;1..q&#93;&#91;1..r&#93;&#92;)</span></span></span></div>
    </div>

!!! chiave ""

    - The notation $t[i_1][i_2]\cdots[i_k]$ denotes the variable at indices $i_1, i_2, \ldots, i_k$

    - Multi-dimensional arrays are typically indexed starting from $0$ or $1$ (from $1$ in these notes)

    - Each variable in the array must be initialized before access and use

    - To initialize all the elements to the same value, use nested <strong>for</strong> loops (one per dimension):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i&#95;1 :=&#92;)</span> start<span class="arithmatex">&#92;(&#95;1&#92;)</span> <strong>to</strong>  end<span class="arithmatex">&#92;(&#95;1&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i&#95;2 :=&#92;)</span> start<span class="arithmatex">&#92;(&#95;2&#92;)</span> <strong>to</strong>  end<span class="arithmatex">&#92;(&#95;2&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(&#92;vdots&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i&#95;k :=&#92;)</span> start<span class="arithmatex">&#92;(&#95;k&#92;)</span> <strong>to</strong>  end<span class="arithmatex">&#92;(&#95;k&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t">array_name<span class="arithmatex">&#92;(&#91;i&#95;1&#93;&#91;i&#95;2&#93;&#92;cdots&#91;i&#95;k&#93; &#92;leftarrow&#92;)</span> initial_value</span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<a id="box-20-texexpbox18"></a>

!!! esempio "Example 2.18: multi-dimensional array assignment"

    Initializing and accessing a $3$-dimensional array $t[1..p][1..q][1..r]$ (with $p \ge 2$, $q \ge 2$ and $r \ge 3$):

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Initialize all variables in the <span class="arithmatex">&#92;(3&#92;)</span>-dimensional array to zero</span></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(p&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(j := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(q&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(k := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(r&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(t&#91;i&#93;&#91;j&#93;&#91;k&#93; &#92;leftarrow 0&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Access and modify</span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(x := t&#91;1&#93;&#91;2&#93;&#91;3&#93;&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(t&#91;2&#93;&#91;1&#93;&#91;3&#93; &#92;leftarrow 42&#92;)</span></span></span></div>
    </div>

## 2.6 Functions

The examples seen so far are fragments of pseudo-code that work on variables assumed to exist. A function turns such a fragment into a complete algorithm, with a name, an input and an output.

!!! chiave ""

    - A <strong>function</strong> is a named, reusable block of code that performs a specific task

    - A function takes <strong>input</strong> data through its <strong>parameters</strong> and produces <strong>output</strong> data

    - The <strong>return</strong> statement terminates the function and specifies its results

    - Functions are typically used to implement <strong>algorithms</strong> or to perform specific computations that can be reused in different parts of a program

    <strong>Syntax:</strong>

    <div class="pseudocodice" markdown="0">
    <div class="pc-io"><span class="pc-kw">Input:</span> <span>description of the input parameters</span></div>
    <div class="pc-io"><span class="pc-kw">Output:</span> <span>description of the output / return value</span></div>
    <div class="pc-sep"></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FunctionName(parameter<span class="arithmatex">&#92;(&#95;1&#92;)</span>, parameter<span class="arithmatex">&#92;(&#95;2&#92;)</span>, …, parameter<span class="arithmatex">&#92;(&#95;k&#92;)</span>)</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t">statements</span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> result</span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

In the rest of these notes every algorithm is written as a function, inside a red box. The input states the <strong>preconditions</strong> on the data (for instance, that an array has at least one element): the function is guaranteed to work only when they hold.

<a id="box-21-texexpbox21"></a>

!!! esempio "Example 2.19: maximum value in an array"

    A function returning the maximum value in an array: the variable $max$ starts from the first element and is updated whenever a larger element is found.

    !!! algoritmo "Algorithm: FindMaximum"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>The maximum value in the array <span class="arithmatex">&#92;(a&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> FindMaximum(a, n)</span></span></div>
        <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(max := a&#91;1&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 2&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; max&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(max &#92;leftarrow a&#91;i&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(max&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    <div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/FindMaximum_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of FindMaximum in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/FindMaximum_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of FindMaximum in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/FindMaximum_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of FindMaximum in Google Colab">Java</a></div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance 1:</strong> $a = [9, 12, 3, 16, 19, 11, 12]$, $n=7$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93; &gt; max&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(max&#92;)</span></th>
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
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(16&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(16&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(11&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> $max = 19$

    <strong>Instance 2:</strong> $a = [3, 7, 2, 9, 1]$, $n=5$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93; &gt; max&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(max&#92;)</span></th>
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
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> $max = 9$

<a id="box-22-texexpbox23"></a>

!!! esempio "Example 2.20: counting the positive elements of an array"

    A function counting the number of positive elements in an array:

    !!! algoritmo "Algorithm: CountPositive"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> integer numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>The number of positive elements in the array <span class="arithmatex">&#92;(a&#92;)</span></span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> CountPositive(a, n)</span></span></div>
        <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(count := 0&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; 0&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(count &#92;leftarrow count + 1&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(count&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    <div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/CountPositive_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of CountPositive in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/CountPositive_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of CountPositive in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/CountPositive_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of CountPositive in Google Colab">Java</a></div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance 1:</strong> $a = [-2, 5, -1, 3, 0]$, $n = 5$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93; &gt; 0&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(count&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(-2&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(-1&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> $count = 2$

    <strong>Instance 2:</strong> $a = [4, -3, 7, 2]$, $n = 4$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93; &gt; 0&#92;)</span>?</th>
    <th><span class="arithmatex">&#92;(count&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(-3&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> $count = 3$

<a id="box-23-texexpbox24"></a>

!!! esempio "Example 2.21: checking whether an array is sorted"

    A function checking whether an array is sorted in non-decreasing order. The <strong>return</strong> statement inside the loop terminates the function as soon as two consecutive elements in the wrong order are found.

    !!! algoritmo "Algorithm: IsSorted"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span> integer numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span><strong>true</strong> if the values in the array <span class="arithmatex">&#92;(a&#92;)</span> are sorted in non-decreasing order and <strong>false</strong> otherwise</span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> IsSorted(a, n)</span></span></div>
        <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n-1&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(a&#91;i&#93; &gt; a&#91;i+1&#93;&#92;)</span> <strong>then</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <strong>false</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <strong>true</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    <div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/IsSorted_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of IsSorted in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/IsSorted_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of IsSorted in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/IsSorted_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of IsSorted in Google Colab">Java</a></div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance 1:</strong> $a = [2, 5, 7, 9]$, $n = 4$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i{+}1&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93; &gt; a&#91;i{+}1&#93;&#92;)</span>?</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td>No</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td>No</td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    <td>No</td>
    </tr>
    </table></div>

    <strong>Return:</strong> <strong>true</strong>

    <strong>Instance 2:</strong> $a = [3, 1, 4, 2]$, $n = 4$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i{+}1&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93; &gt; a&#91;i{+}1&#93;&#92;)</span>?</th>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>Yes</td>
    </tr>
    </table></div>

    <strong>Return:</strong> <strong>false</strong>, after a single comparison.

<a id="box-24-texexpbox27"></a>

!!! esempio "Example 2.22: scalar product of two arrays"

    A function computing the scalar product $\sum_{i=1}^{n} a[i] \cdot b[i]$ of two arrays:

    !!! algoritmo "Algorithm: ScalarProduct"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>Two arrays <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> and <span class="arithmatex">&#92;(b&#91;1..n&#93;&#92;)</span> of size <span class="arithmatex">&#92;(n &#92;ge 1&#92;)</span></span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>The scalar product of the two arrays</span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ScalarProduct(a, b, n)</span></span></div>
        <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(prod := a&#91;1&#93; &#92;cdot b&#91;1&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 2&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(prod &#92;leftarrow prod + a&#91;i&#93; &#92;cdot b&#91;i&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(prod&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    <div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/ScalarProduct_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of ScalarProduct in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/ScalarProduct_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of ScalarProduct in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/ScalarProduct_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of ScalarProduct in Google Colab">Java</a></div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance 1:</strong> $a = [1, 2, 3]$, $b = [4, 5, 6]$, $n = 3$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(b&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;cdot b&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(prod&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(1 &#92;cdot 4 = 4&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(10&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4 + 10 = 14&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(18&#92;)</span></td>
    <td><span class="arithmatex">&#92;(14 + 18 = 32&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> $prod = 32$

    <strong>Instance 2:</strong> $a = [2, 0, -1]$, $b = [3, 4, 5]$, $n = 3$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(b&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(a&#91;i&#93;&#92;cdot b&#91;i&#93;&#92;)</span></th>
    <th><span class="arithmatex">&#92;(prod&#92;)</span></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(2 &#92;cdot 3 = 6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(0&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6 + 0 = 6&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(-1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(-5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6 + (-5) = 1&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> $prod = 1$

<a id="box-25-texexpbox28"></a>

!!! esempio "Example 2.23: reversing an array"

    A function reversing the elements of an array: the element $a[i]$ is exchanged with its symmetric element $a[n-i+1]$, with the temporary variable of [Example 2.3](#box-5-texexpbox2b). Only $\lfloor n/2 \rfloor$ exchanges are needed: with $n$ odd, the middle element stays in place.

    !!! algoritmo "Algorithm: ReverseArray"

        <div class="pseudocodice" markdown="0">
        <div class="pc-io"><span class="pc-kw">Input:</span> <span>An array <span class="arithmatex">&#92;(a&#91;1..n&#93;&#92;)</span> of <span class="arithmatex">&#92;(n&#92;)</span> numbers</span></div>
        <div class="pc-io"><span class="pc-kw">Output:</span> <span>The same array <span class="arithmatex">&#92;(a&#92;)</span> with the elements in reversed order</span></div>
        <div class="pc-sep"></div>
        <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
        <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>function</strong> ReverseArray(a, n)</span></span></div>
        <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i := 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(&#92;lfloor n/2 &#92;rfloor&#92;)</span> <strong>do</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(tmp := a&#91;i&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;i&#93; &#92;leftarrow a&#91;n - i + 1&#93;&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><span class="arithmatex">&#92;(a&#91;n - i + 1&#93; &#92;leftarrow tmp&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
        <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>return</strong> <span class="arithmatex">&#92;(a&#92;)</span></span></span></div>
        <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
        </div>

    <div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Run in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/ReverseArray_python.ipynb" target="_blank" rel="noopener" title="Open the Python notebook of ReverseArray in Google Colab">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/ReverseArray_cpp.ipynb" target="_blank" rel="noopener" title="Open the C++ notebook of ReverseArray in Google Colab">C++</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/algorithms/blob/main/notebooks/ch02_pseudo_code/ReverseArray_java.ipynb" target="_blank" rel="noopener" title="Open the Java notebook of ReverseArray in Google Colab">Java</a></div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance 1:</strong> $a = [1, 2, 3, 4, 5]$, $n = 5$, $\lfloor 5/2 \rfloor = 2$ iterations

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th>exchange</th>
    <th>array <span class="arithmatex">&#92;(a&#92;)</span> (after the exchange)</th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(&#91;1, 2, 3, 4, 5&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(a&#91;1&#93; &#92;leftrightarrow a&#91;5&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;5, 2, 3, 4, 1&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(a&#91;2&#93; &#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;5, 4, 3, 2, 1&#93;&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> $a = [5, 4, 3, 2, 1]$

    <strong>Instance 2:</strong> $a = [10, 20, 30, 40]$, $n = 4$, $\lfloor 4/2 \rfloor = 2$ iterations

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span></th>
    <th>exchange</th>
    <th>array <span class="arithmatex">&#92;(a&#92;)</span> (after the exchange)</th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(&#91;10, 20, 30, 40&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(a&#91;1&#93; &#92;leftrightarrow a&#91;4&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;40, 20, 30, 10&#93;&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(a&#91;2&#93; &#92;leftrightarrow a&#91;3&#93;&#92;)</span></td>
    <td><span class="arithmatex">&#92;(&#91;40, 30, 20, 10&#93;&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> $a = [40, 30, 20, 10]$

## 2.7 Sets

Arrays store values in positions. When only the membership of the values matters, and not their position or their repetitions, we use a set.

!!! chiave ""

    - A <strong>set</strong> is an unordered collection of <em>distinct</em> elements

    - Sets must be declared before use with the <strong>new set</strong> operator; no size needs to be specified; when created, a set is empty

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t">set_name <span class="arithmatex">&#92;(:=&#92;)</span> <strong>new set</strong></span></span></div>
    </div>

    The main operators on sets are:

    - <strong>add</strong>: insert an element into the set (ignored if already present)

        $$
        \textbf{add} \ x \ \textbf{to} \ \text{set\_name}
        $$

    - <strong>remove</strong>: delete an element from the set (ignored if not present)

        $$
        \textbf{remove} \ x \ \textbf{from} \ \text{set\_name}
        $$

    - <strong>in</strong>: membership test, which evaluates to <strong>true</strong> if $x$ belongs to the set

        $$
        x \ \textbf{in} \ \text{set\_name}
        $$

    - <strong>size</strong>: cardinality (number of elements currently in the set)

        $$
        \textbf{size}(\text{set\_name})
        $$

    - <strong>foreach</strong>: loop over the elements of the set; by convention, in these notes the elements are visited in insertion order

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>foreach</strong> <span class="arithmatex">&#92;(x&#92;)</span> <strong>in</strong> set_name <strong>do</strong></span></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"></span><span class="pc-c">// process <span class="arithmatex">&#92;(x&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    - It is possible to loop over the elements of a set in a specific order by specifying a sorting criterion:

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><strong>foreach</strong> <span class="arithmatex">&#92;(x&#92;)</span> <strong>in</strong> set_name <strong>sorted by</strong> criterion <strong>do</strong></span></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"></span><span class="pc-c">// process <span class="arithmatex">&#92;(x&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

<a id="box-26-texexpbox29"></a>

!!! esempio "Example 2.24: set declaration and usage"

    <div class="pseudocodice" markdown="0">
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Declare an empty set</span></span></div>
    <div class="pc-riga"><span class="pc-n">1</span><span class="pc-corpo"><span class="pc-t"><span class="arithmatex">&#92;(s := &#92;textbf{new set}&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Populate the set with the even numbers from 1 to n</span></span></div>
    <div class="pc-riga"><span class="pc-n">2</span><span class="pc-corpo"><span class="pc-t"><strong>for</strong> <span class="arithmatex">&#92;(i:= 1&#92;)</span> <strong>to</strong>  <span class="arithmatex">&#92;(n&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">3</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(i &#92;bmod 2 = 0&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">4</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-l"></span><span class="pc-t"><strong>add</strong> <span class="arithmatex">&#92;(i&#92;)</span> <strong>to</strong> <span class="arithmatex">&#92;(s&#92;)</span></span></span></div>
    <div class="pc-riga"><span class="pc-n">5</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">6</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Membership test</span></span></div>
    <div class="pc-riga"><span class="pc-n">7</span><span class="pc-corpo"><span class="pc-t"><strong>if</strong> <span class="arithmatex">&#92;(4&#92;)</span> <strong>in</strong> <span class="arithmatex">&#92;(s&#92;)</span> <strong>then</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">8</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>print</strong>(4 is in s)</span></span></div>
    <div class="pc-riga"><span class="pc-n">9</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Remove an element</span></span></div>
    <div class="pc-riga"><span class="pc-n">10</span><span class="pc-corpo"><span class="pc-t"><strong>remove</strong> <span class="arithmatex">&#92;(4&#92;)</span> <strong>from</strong> <span class="arithmatex">&#92;(s&#92;)</span></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Iterate and print all remaining elements</span></span></div>
    <div class="pc-riga"><span class="pc-n">11</span><span class="pc-corpo"><span class="pc-t"><strong>foreach</strong> <span class="arithmatex">&#92;(x&#92;)</span> <strong>in</strong> <span class="arithmatex">&#92;(s&#92;)</span> <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">12</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>print</strong>(<span class="arithmatex">&#92;(x&#92;)</span>)</span></span></div>
    <div class="pc-riga"><span class="pc-n">13</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Print the cardinality</span></span></div>
    <div class="pc-riga"><span class="pc-n">14</span><span class="pc-corpo"><span class="pc-t"><strong>print</strong>(<strong>size</strong>(<span class="arithmatex">&#92;(s&#92;)</span>))</span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Print the elements in non-ascending order</span></span></div>
    <div class="pc-riga"><span class="pc-n">15</span><span class="pc-corpo"><span class="pc-t"><strong>foreach</strong> <span class="arithmatex">&#92;(x&#92;)</span> <strong>in</strong> <span class="arithmatex">&#92;(s&#92;)</span> <strong>sorted by</strong> value non-ascending <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">16</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>print</strong>(<span class="arithmatex">&#92;(x&#92;)</span>)</span></span></div>
    <div class="pc-riga"><span class="pc-n">17</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    <div class="pc-riga pc-vuota"><span class="pc-n"></span><span class="pc-corpo"></span></div>
    <div class="pc-riga pc-solo-commento"><span class="pc-n"></span><span class="pc-corpo"><span class="pc-t"></span><span class="pc-c">// Print the elements in non-descending order</span></span></div>
    <div class="pc-riga"><span class="pc-n">18</span><span class="pc-corpo"><span class="pc-t"><strong>foreach</strong> <span class="arithmatex">&#92;(x&#92;)</span> <strong>in</strong> <span class="arithmatex">&#92;(s&#92;)</span> <strong>sorted by</strong> value non-descending <strong>do</strong></span></span></div>
    <div class="pc-riga"><span class="pc-n">19</span><span class="pc-corpo"><span class="pc-l"></span><span class="pc-t"><strong>print</strong>(<span class="arithmatex">&#92;(x&#92;)</span>)</span></span></div>
    <div class="pc-riga"><span class="pc-n">20</span><span class="pc-corpo"><span class="pc-t"><strong>end</strong></span></span></div>
    </div>

    <strong>Step-by-step execution:</strong>

    <strong>Instance:</strong> $n = 8$

    - Step 1: the for loop adds $2, 4, 6, 8$, so $s = \{2, 4, 6, 8\}$.

    - Step 2: $4$ belongs to $s$: the output is <code>4 is in s</code>.

    - Step 3: after the removal, $s = \{2, 6, 8\}$.

    - Step 4: the first <strong>foreach</strong> prints $2, 6, 8$ (insertion order), then the cardinality $3$ is printed.

    - Step 5: the last two loops print $8, 6, 2$ and $2, 6, 8$.

## 2.8 Style conventions

We conclude with a summary of the notation used in these notes, compared with other common choices.

!!! chiave ""

    Different authors may use slightly different conventions:

    - Declaration: $:=$ (used in these notes) or $=$ (some authors use the same symbol for both declaration and assignment)

    - Assignment: $\leftarrow$ (used in these notes) or $=$

    - Array indexing: $a[i]$ (used in these notes) or $a_i$

    - Two-dimensional array indexing: $b[i][j]$ (used in these notes) or $b_{ij}$

    - Comments: // comment, # comment, or (\* comment \*)

    <strong>The important thing is to be consistent and clear!</strong>

!!! chiave ""

    <strong>Key points of the chapter.</strong>

    - Variables are declared with $:=$ and modified with $\leftarrow$.

    - Conditional statements and loops (<strong>if</strong>, <strong>while</strong>, <strong>for</strong>, with <strong>break</strong> and <strong>continue</strong>) control the order of execution.

    - Arrays $a[1..n]$, $b[1..m][1..n]$, … are indexed from $1$ in pseudo-code; sets store distinct elements without positions.

    - An algorithm is written as a <strong>function</strong> with its input (including the preconditions), its output and a <strong>return</strong> statement.

---

**Exercises on this chapter:** [:material-pencil: Pseudo-code](../exercises/ex-02-pseudo-code.md)
