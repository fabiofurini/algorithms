---
title: "Introduction to Python"
---

# Introduction to Python

<div class="info-capitolo" markdown>

**Part 2 · Programming languages · Chapter 7** · [:material-file-pdf-box: Lecture notes, volume 2 (PDF)](../pdf/lecture-notes-2-programming-languages.pdf) · [:material-pencil: Exercises: Introduction to Python](../exercises/ex-07-introduction-to-python.md)

</div>

## Introduction

In the chapter «Introduction to <code>C++</code>» we translated the pseudo-code of our algorithms into a compiled programming language. In this chapter we introduce a second programming language, <code>Python</code>, which is interpreted, has a lighter syntax and is very popular both in teaching and in scientific computing.

The chapter follows the same path as the chapter «Introduction to <code>C++</code>», so that the two languages can be compared section by section:

- the main characteristics of the language and the structure of a program;

- variables, data types, input and output;

- operators, conditional statements and loops;

- lists, which play the role of the arrays of <code>C++</code>;

- functions, their parameters and their return values;

- a complete algorithm, the search of the maximum value in an array, written in pseudo-code and in <code>Python</code>;

- the bitwise operators and a summary table that compares <code>Python</code> with <code>C++</code>.

Every fragment of code of the chapter has been executed with the <code>python3</code> interpreter (<code>Python 3.14</code>): the outputs reported in the examples are the ones printed by the programs.

!!! chiave ""

    In pseudo-code the entries of an array $a[1..n]$ are indexed from $1$ to $n$; in <code>Python</code>, as in <code>C++</code>, the elements of a list of size $n$ are indexed from $0$ to $n-1$. The entry $a[i]$ of the pseudo-code corresponds to the element <code>a[i-1]</code> of the <code>Python</code> code.

## 7.1 Main characteristics of the programming language

The main characteristics of <code>Python</code> are the following.

- <code>Python</code> is an <strong>interpreted</strong> language: programs are executed instruction by instruction by the <code>Python</code> <strong>interpreter</strong>, without a separate compilation step. This makes development and debugging fast and interactive.

- <code>Python</code> uses <strong>dynamic typing</strong>: variables do not need to be declared with a data type. The data type is determined automatically, during the execution, from the assigned value.

- <code>Python</code> supports <strong>functions</strong>, enabling a structured and modular approach to programming. Functions allow code reuse and better organization.

- <strong>Indentation is mandatory</strong> in <code>Python</code>: the block structure of the code (loops, conditional statements, functions) is defined by the level of indentation, not by curly braces. The standard indentation is $4$ spaces.

- In <code>Python</code>, a single-line comment starts with the reserved symbol “<code>#</code>”. There is no dedicated symbol for multi-line comments: a text enclosed between triple quotes <code>"""</code> (or <code>”'</code>) is a string that is not used by the program, and it is commonly used as a multi-line comment. The same string written as the first line of a function is its <strong>documentation string</strong> (<code>docstring</code>).

<a id="box-1-py-excomments"></a>

!!! esempio "Example 7.1: comments in <code>Python</code>"

    This is an example of a single-line comment:

    ```python
    # This is a comment line
    ```

    This is an example of a multi-line comment:

    ```python
    """
    This is a
    multi-line comment
    """
    ```

### 7.1.1 The structure of a program

A <code>Python</code> program is a text file (with extension <code>.py</code>) that is executed by the interpreter from the first line to the last one. Unlike <code>C++</code>, no <code>main</code> function is required: the instructions written at the top level of the file are executed in order.

<a id="box-2-py-exskeleton"></a>

!!! esempio "Example 7.2: the skeleton of a program"

    ```python
    # The instructions of the program are written here
    print("Hello, world!")
    ```

    If the source code is saved in the file <code>hello.py</code>, it is executed with the command

    ```text
    python3 hello.py
    ```

    and the output is

    ```text
    Hello, world!
    ```

In the following examples, unless they contain a complete program, the fragments of code are written at the top level of a file and executed in this way.

- A <strong>block</strong> of instructions (the body of a conditional statement, of a loop or of a function) is introduced by the symbol “<code>:</code>” at the end of the preceding line, and all its instructions are indented by the same number of spaces. The block ends at the first instruction that is indented less.

<a id="box-3-py-exindent"></a>

!!! esempio "Example 7.3: blocks defined by indentation"

    ```python
    x = 7
    if x > 0:
        print("positive")        # Inside the block of the if
        print("still inside")    # Inside the block of the if
    print("outside the block")   # Executed in any case
    ```

    <strong>Output:</strong>

    ```text
    positive
    still inside
    outside the block
    ```

    In <code>C++</code> the same block would be enclosed in curly braces <code>{}</code>; in <code>Python</code> a wrong indentation changes the meaning of the program or produces an <code>IndentationError</code>.

!!! chiave ""

    In <code>Python</code> the instructions do not end with “<code>;</code>”, and the blocks are delimited by the indentation (4 spaces) instead of curly braces.

## 7.2 Variables and data types

The source code operates on <strong>variables</strong>, and every value has a <strong>data type</strong>.

- Information is categorized into different <strong>data types</strong>. The four fundamental data types are:

    1. The data type “<code>int</code>” represents an integer, which is a whole number written without a decimal point. This includes positive and negative whole numbers, as well as zero. Unlike <code>C++</code>, the integers of <code>Python</code> have no maximum value: they can have as many digits as needed.

    2. The data type “<code>bool</code>” represents a Boolean value: <code>True</code> or <code>False</code> (note the capital first letter).

    3. The data type “<code>float</code>” represents a floating-point number, which includes numbers written with a decimal point. A <code>float</code> of <code>Python</code> has the same (double) precision as a <code>double</code> of <code>C++</code>.

    4. The data type “<code>str</code>” represents a string of characters, enclosed in single or double quotes (e.g., <code>'hello'</code>, <code>"world"</code>). There is no separate data type for a single character: a character is a string of length $1$.

- A variable acts as a container that stores a value. Each variable has a unique name.

- Variables are assigned values using the assignment operator “<code>=</code>”. When a new value is assigned, the previous value is overwritten.

- <strong>No declaration is needed</strong> before use: a variable is created the moment a value is assigned to it. The function <code>type()</code> returns the data type of a value.

!!! chiave ""

    Variables are created by assignment; there is no separate declaration step, and the data type is not written in the code.

<a id="box-4-py-exvariables"></a>

!!! esempio "Example 7.4: variable assignments"

    ```python
    age = 25                   # Integer variable
    is_raining = False         # Boolean variable
    small_number = 3.14        # Floating-point variable
    large_number = 123456.789  # Floating-point variable
    character = 'a'            # String variable (single character)
    name = "Alice"             # String variable

    age = 26  # The previous value 25 is overwritten
    print(age, is_raining, small_number, large_number, character, name)
    print(type(age), type(is_raining), type(small_number), type(name))
    ```

    <strong>Output:</strong>

    ```text
    26 False 3.14 123456.789 a Alice
    <class 'int'> <class 'bool'> <class 'float'> <class 'str'>
    ```

    Compare with [Example 7.6](#box-6-py-exprint) below and with the corresponding example of the chapter «Introduction to <code>C++</code>»: the Boolean value is displayed as <code>False</code>, and the number <code>123456.789</code> is displayed with all its digits.

<a id="box-5-py-exdynamic"></a>

!!! esempio "Example 7.5: dynamic typing and large integers"

    ```python
    x = 5
    print(x, type(x))
    x = "five"  # The same name now refers to a string
    print(x, type(x))

    print(2 ** 100)  # An integer with 31 digits
    ```

    <strong>Output:</strong>

    ```text
    5 <class 'int'>
    five <class 'str'>
    1267650600228229401496703205376
    ```

    The operator <code>\*\*</code> is the exponentiation (Section [7.4.1](#sez-py-secarith)). In <code>C++</code> the value $2^{100}$ does not fit in a variable of type <code>int</code>.

## 7.3 Input and output

- The function <code>print()</code> displays output on the screen. Multiple values can be printed in one call by separating them with commas: they are displayed separated by a space, and the line ends with a new line (the same effect as <code>endl</code> in <code>C++</code>).

- The optional parameters <code>sep</code> and <code>end</code> change the separator between the values and the text written at the end: <code>print(x, end=" ")</code> writes a space instead of a new line, so the next <code>print</code> continues on the same line.

- Strings and variable values can be combined using <strong>f-strings</strong> (formatted string literals), prefixed with the letter <code>f</code>. Inside f-strings, variable names (and, more generally, expressions) are placed between curly braces <code>{}</code>.

- Inside the curly braces of an f-string, the format <code>:.kf</code> displays a floating-point number with exactly $k$ digits after the decimal point (the same effect as <code>fixed</code> and <code>setprecision(k)</code> in <code>C++</code>).

<a id="box-6-py-exprint"></a>

!!! esempio "Example 7.6: screen output"

    ```python
    n = 42
    print("The value of the variable is", n)
    print(f"The value of the variable is {n}")  # f-string version
    print(f"n = {n}, doubled = {n * 2}")        # Expression inside {}

    print("a", "b", "c", sep="-")   # Separator "-" instead of a space
    print("No new line", end=" ")   # A space instead of the new line
    print("after end")
    print(f"{10 / 3:.2f}")          # Two digits after the decimal point
    ```

    <strong>Output:</strong>

    ```text
    The value of the variable is 42
    The value of the variable is 42
    n = 42, doubled = 84
    a-b-c
    No new line after end
    3.33
    ```

- The function <code>input()</code> displays a message, waits for the user to type a line of text and returns it. It always returns a <code>str</code>; to obtain a number, the result must be converted with <code>int()</code> or <code>float()</code>.

<a id="box-7-py-exinput"></a>

!!! esempio "Example 7.7: keyboard input"

    ```python
    name = input("Enter your name: ")             # Reads a string
    n = int(input("Enter an integer: "))          # Reads and converts to int
    x = float(input("Enter a real number: "))     # Reads and converts to float
    print(f"Hello {name}, n = {n}, x = {x}")
    ```

    <strong>Example of execution</strong> (the user types <code>Ada</code>, <code>7</code> and <code>2.5</code>):

    ```text
    Enter your name: Ada
    Enter an integer: 7
    Enter a real number: 2.5
    Hello Ada, n = 7, x = 2.5
    ```

## 7.4 Operators

Operators are symbols that perform operations on variables and values. As in <code>C++</code>, they are classified, according to their functionality, into arithmetic, assignment, comparison and logical operators; <code>Python</code> has no increment and decrement operators.

### 7.4.1 Arithmetic operators { #sez-py-secarith }

!!! chiave ""

    <strong>Arithmetic operators</strong>, used to perform basic mathematical operations:

    - <code>+</code> (Addition) $\rightsquigarrow$ Adds two values.

    - <code>-</code> (Subtraction) $\rightsquigarrow$ Subtracts one value from another.

    - <code>\*</code> (Multiplication) $\rightsquigarrow$ Multiplies two values.

    - <code>/</code> (Division) $\rightsquigarrow$ Divides one value by another (always returns a <code>float</code>).

    - <code>//</code> (Integer division) $\rightsquigarrow$ Returns the integer quotient (floor division).

    - <code>%</code> (Modulus) $\rightsquigarrow$ Returns the remainder of a division.

    - <code>\*\*</code> (Exponentiation) $\rightsquigarrow$ Raises a value to a power.

<a id="box-8-py-exarith"></a>

!!! esempio "Example 7.8: arithmetic operators"

    ```python
    a = 10
    b = 3

    print("Addition:", a + b)
    print("Subtraction:", a - b)
    print("Multiplication:", a * b)
    print("Division:", a / b)          # Always a float
    print("Integer division:", a // b)
    print("Modulus:", a % b)
    print("Exponentiation:", a ** b)
    ```

    <strong>Output:</strong>

    ```text
    Addition: 13
    Subtraction: 7
    Multiplication: 30
    Division: 3.3333333333333335
    Integer division: 3
    Modulus: 1
    Exponentiation: 1000
    ```

    The last digit <code>5</code> of the division is not an error of the program: $10/3$ has infinitely many decimal digits, and the <code>float</code> closest to it is displayed.

- The division operator <code>/</code> always returns a <code>float</code> in <code>Python 3</code>, even when dividing two integers. To obtain an integer result, use the integer division operator <code>//</code>. This is the opposite convention with respect to <code>C++</code>, where <code>10 / 3</code> is the integer division.

- The operator <code>//</code> computes $\lfloor a/b \rfloor$, rounding down. For non-negative operands it coincides with the integer division of <code>C++</code>; for a negative quotient it does not, because <code>C++</code> truncates toward zero: in <code>Python</code> <code>-7 // 2</code> is <code>-4</code> and <code>-7 % 2</code> is <code>1</code>, while in <code>C++</code> <code>-7 / 2</code> is <code>-3</code> and <code>-7 % 2</code> is <code>-1</code>. In both languages the identity $a = b \cdot q + r$ holds between quotient $q$ and remainder $r$.

- A value is converted into another data type (<strong>type conversion</strong>) with the functions <code>int()</code>, <code>float()</code> and <code>str()</code>: <code>int(3.9)</code> is <code>3</code> (the decimal part is removed), <code>float(7)</code> is <code>7.0</code>, <code>int("12")</code> is the integer <code>12</code>.

<a id="box-9-py-exdivision"></a>

!!! esempio "Example 7.9: integer and floating-point division"

    ```python
    a = 10
    b = 3

    print(a / b)             # Floating-point division
    print(a // b)            # Integer division
    print(f"{a / b:.2f}")    # Two decimals
    print(-7 // 2, -7 % 2)   # Floor division with a negative quotient
    print(int(-7 / 2))       # Truncation toward zero, as in C++
    print(int(3.9), float(7), int("12") + 1)
    ```

    <strong>Output:</strong>

    ```text
    3.3333333333333335
    3
    3.33
    -4 1
    -3
    3 7.0 13
    ```

### 7.4.2 Assignment operators

!!! chiave ""

    <strong>Assignment operators</strong>, used to assign values to variables:

    - <code>=</code>  (Assignment) $\rightsquigarrow$ Assigns a value to a variable.

    - <code>+=</code> (Addition assignment) $\rightsquigarrow$ Adds a value and assigns the result.

    - <code>-=</code> (Subtraction assignment) $\rightsquigarrow$ Subtracts a value and assigns the result.

    - <code>\*=</code> (Multiplication assignment) $\rightsquigarrow$ Multiplies and assigns the result.

    - <code>/=</code> (Division assignment) $\rightsquigarrow$ Divides and assigns the result (a <code>float</code>).

    - <code>//=</code> (Integer division assignment) $\rightsquigarrow$ Floor-divides and assigns the result.

    - <code>%=</code> (Modulus assignment) $\rightsquigarrow$ Applies the modulus and assigns the result.

    - <code>\*\*=</code> (Exponentiation assignment) $\rightsquigarrow$ Raises to a power and assigns the result.

<a id="box-10-py-exassign"></a>

!!! esempio "Example 7.10: assignment operators"

    ```python
    x = 10  # Assignment
    print("Initial value:", x)

    x += 5   # Equivalent to: x = x + 5
    print("After += 5:", x)

    x -= 3   # Equivalent to: x = x - 3
    print("After -= 3:", x)

    x *= 2   # Equivalent to: x = x * 2
    print("After *= 2:", x)

    x //= 4  # Equivalent to: x = x // 4
    print("After //= 4:", x)

    x %= 4   # Equivalent to: x = x % 4
    print("After %= 4:", x)

    x **= 3  # Equivalent to: x = x ** 3
    print("After **= 3:", x)

    x /= 4   # Equivalent to: x = x / 4 (the result is a float)
    print("After /= 4:", x)
    ```

    <strong>Output:</strong>

    ```text
    Initial value: 10
    After += 5: 15
    After -= 3: 12
    After *= 2: 24
    After //= 4: 6
    After %= 4: 2
    After **= 3: 8
    After /= 4: 2.0
    ```

### 7.4.3 Increment and decrement

- <code>Python</code> has no operators <code>++</code> and <code>- -</code>: a variable is incremented with <code>x += 1</code> and decremented with <code>x -= 1</code>.

- The instruction <code>x++</code> is a syntax error. The expression <code>++x</code> is accepted, but it does not increment <code>x</code>: it applies twice the unary plus, so its value is <code>x</code> itself.

<a id="box-11-py-exincdec"></a>

!!! esempio "Example 7.11: increment and decrement"

    ```python
    x = 5
    x += 1          # Increment
    print("After x += 1:", x)
    x -= 1          # Decrement
    print("After x -= 1:", x)
    print("++x is", ++x, "and x is still", x)  # ++x is not an increment
    ```

    <strong>Output:</strong>

    ```text
    After x += 1: 6
    After x -= 1: 5
    ++x is 5 and x is still 5
    ```

### 7.4.4 Comparison operators

!!! chiave ""

    <strong>Comparison operators</strong>, used to compare values and return a Boolean result:

    - <code>==</code> (Equal to) $\rightsquigarrow$ Checks if two values are equal.

    - <code>!=</code> (Not equal to) $\rightsquigarrow$ Checks if two values are different.

    - <code>&lt;</code>  (Less than) $\rightsquigarrow$ Checks if one value is smaller than another.

    - <code>&gt;</code>  (Greater than) $\rightsquigarrow$ Checks if one value is larger than another.

    - <code>&lt;=</code> (Less than or equal to) $\rightsquigarrow$ Checks if one value is smaller than or equal to another.

    - <code>&gt;=</code> (Greater than or equal to) $\rightsquigarrow$ Checks if one value is larger than or equal to another.

- Comparison operators return a Boolean result: <code>True</code> if the condition is satisfied, <code>False</code> otherwise (displayed as <code>True</code> and <code>False</code>, not as <code>1</code> and <code>0</code> as in <code>C++</code>). These operators are commonly used in <strong>conditional statements</strong> and <strong>loops</strong>.

- Comparisons can be chained: <code>0 &lt; x &lt;= 10</code> means <code>0 &lt; x and x &lt;= 10</code>.

<a id="box-12-py-excompare"></a>

!!! esempio "Example 7.12: comparison operators"

    ```python
    a = 10
    b = 5

    print("a == b:", a == b)  # Equal to
    print("a != b:", a != b)  # Not equal to
    print("a < b:", a < b)    # Less than
    print("a > b:", a > b)    # Greater than
    print("a <= b:", a <= b)  # Less than or equal to
    print("a >= b:", a >= b)  # Greater than or equal to
    print("0 < b <= a:", 0 < b <= a)  # Chained comparison
    ```

    <strong>Output:</strong>

    ```text
    a == b: False
    a != b: True
    a < b: False
    a > b: True
    a <= b: False
    a >= b: True
    0 < b <= a: True
    ```

### 7.4.5 Logical operators

!!! chiave ""

    <strong>Logical operators</strong>, used for logical operations, often in conditional statements:

    - <code>and</code> (Logical AND) $\rightsquigarrow$ Returns <code>True</code> if both conditions are <code>True</code>.

    - <code>or</code>  (Logical OR)  $\rightsquigarrow$ Returns <code>True</code> if at least one condition is <code>True</code>.

    - <code>not</code> (Logical NOT) $\rightsquigarrow$ Reverses the Boolean value.

- The logical operators of <code>Python</code> are words, while in <code>C++</code> they are the symbols <code>&amp;&amp;</code>, <code>||</code> and <code>!</code>.

<a id="box-13-py-exlogic"></a>

!!! esempio "Example 7.13: logical operators"

    ```python
    condition1 = True
    condition2 = False

    print("condition1:", condition1)
    print("condition2:", condition2)

    # Logical AND: True only if both conditions are True
    print("condition1 and condition2:", condition1 and condition2)

    # Logical OR: True if at least one condition is True
    print("condition1 or condition2:", condition1 or condition2)

    # Logical NOT: reverses the Boolean value
    print("not condition1:", not condition1)
    print("not condition2:", not condition2)
    ```

    <strong>Output:</strong>

    ```text
    condition1: True
    condition2: False
    condition1 and condition2: False
    condition1 or condition2: True
    not condition1: False
    not condition2: True
    ```

## 7.5 Conditional statements

The comparison and logical operators produce the conditions that decide which instructions are executed.

- Conditional statements allow executing different blocks of code based on specific conditions.

- The <code>if</code> statement evaluates a condition. If the condition is <code>True</code>, the indented block is executed.

- The optional <code>elif</code> (else if) clause checks an additional condition when the previous ones are <code>False</code>.

- The optional <code>else</code> clause is executed when all preceding conditions are <code>False</code>.

- <strong>No parentheses are needed</strong> around the condition, and <strong>no curly braces</strong> are used: the line of the condition ends with “<code>:</code>” and the block is delimited by indentation.

<a id="box-14-py-exif"></a>

!!! esempio "Example 7.14: conditional statement"

    ```python
    number = 10

    # Check if number is positive
    if number > 0:
        print("The number is positive.")
    else:
        print("The number is non-positive.")
    ```

    <strong>Output:</strong>

    ```text
    The number is positive.
    ```

<a id="box-15-py-exelif"></a>

!!! esempio "Example 7.15: <code>if</code> / <code>elif</code> / <code>else</code>"

    ```python
    score = 85

    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    elif score >= 60:
        grade = "D"
    else:
        grade = "F"

    print(f"Score: {score}, Grade: {grade}")
    ```

    <strong>Output:</strong>

    ```text
    Score: 85, Grade: B
    ```

    The conditions are evaluated from top to bottom, and only the block of the first true condition is executed: <code>score &gt;= 90</code> is false and <code>score &gt;= 80</code> is true, so the grade is <code>"B"</code>. This is the same result as the nested ternary operators of the chapter «Introduction to <code>C++</code>».

### 7.5.1 Conditional expression

- The <strong>conditional expression</strong> is the <code>Python</code> version of the ternary operator <code>?:</code> of <code>C++</code>: it provides a compact way to write simple <code>if-else</code> statements.

- Syntax: <code>value\_if\_true if condition else value\_if\_false</code>

- If the condition is <code>True</code>, the expression evaluates to <code>value\_if\_true</code>; otherwise, it evaluates to <code>value\_if\_false</code>.

<a id="box-16-py-externary"></a>

!!! esempio "Example 7.16: conditional expression"

    ```python
    number = 10

    # Compact conditional expression
    result = "positive" if number > 0 else "non-positive"
    print(f"The number is {result}")

    # Finding the maximum of two numbers
    a, b = 15, 20  # Multiple assignment: a = 15 and b = 20
    maximum = a if a > b else b
    print(f"Maximum: {maximum}")

    # Checking even or odd
    n = 7
    parity = "even" if n % 2 == 0 else "odd"
    print(f"{n} is {parity}")

    # Absolute value
    x = -5
    abs_value = x if x >= 0 else -x
    print(f"Absolute value of {x} is {abs_value}")
    ```

    <strong>Output:</strong>

    ```text
    The number is positive
    Maximum: 20
    7 is odd
    Absolute value of -5 is 5
    ```

    The <code>Python</code> library also provides the functions <code>max(a, b)</code> and <code>abs(x)</code>, which return the same values.

## 7.6 Loops

Conditional statements choose <em>whether</em> a block of code is executed; loops decide <em>how many times</em> it is executed.

- Loops are used to execute a block of code repeatedly. In <code>Python</code>, the two loop constructs are the <code>while</code> loop and the <code>for</code> loop.

### 7.6.1 The <code>while</code> loop

- The <code>while</code> loop executes a block of code as long as the condition evaluates to <code>True</code>. If the condition is <code>False</code> from the beginning, the block is never executed.

<a id="box-17-py-exwhile"></a>

!!! esempio "Example 7.17: <code>while</code> loop"

    ```python
    i = 1              # Initialization

    while i <= 5:      # Condition
        print(f"Number: {i}")
        i += 1         # Increment (there is no ++ operator in Python)
    ```

    <strong>Output:</strong>

    ```text
    Number: 1
    Number: 2
    Number: 3
    Number: 4
    Number: 5
    ```

    As in <code>C++</code>, the condition <code>i &lt;= 5</code> is evaluated six times: five times it is true, and the sixth time (<code>i</code> equal to <code>6</code>) it is false and the loop terminates.

### 7.6.2 The <code>for</code> loop

- The <code>for</code> loop of <code>Python</code> iterates over the elements of an <strong>iterable</strong>, such as a list, a string, or a range of integers: at each iteration the loop variable takes the next element.

- The function <code>range(start, stop, step)</code> generates the sequence of integers from <code>start</code> (included) to <code>stop</code> (excluded), with increment <code>step</code>. If only one argument is given, the sequence starts at $0$; if <code>step</code> is omitted, it is $1$; with a negative <code>step</code> the sequence decreases.

- The pseudo-code loop “<strong>for</strong> $i := 1$ <strong>to</strong> $n$” corresponds to <code>for i in range(1, n + 1)</code>, and the loop over the indices of a list of size $n$ is <code>for i in range(n)</code>, with $i = 0, 1, \dots, n-1$.

<a id="box-18-py-exfor"></a>

!!! esempio "Example 7.18: <code>for</code> loop with <code>range</code>"

    ```python
    for i in range(1, 6):   # i takes the values 1, 2, 3, 4, 5
        print(f"Number: {i}")
    ```

    The output is the same as in the <code>while</code> loop of [Example 7.17](#box-17-py-exwhile). The function <code>list()</code> shows the integers generated by a <code>range</code>:

    ```python
    print(list(range(5)))
    print(list(range(1, 6)))
    print(list(range(0, 10, 3)))
    print(list(range(5, 0, -1)))
    ```

    <strong>Output:</strong>

    ```text
    [0, 1, 2, 3, 4]
    [1, 2, 3, 4, 5]
    [0, 3, 6, 9]
    [5, 4, 3, 2, 1]
    ```

<a id="box-19-py-exforlist"></a>

!!! esempio "Example 7.19: <code>for</code> loop over a list"

    ```python
    a = [3, 7, 2, 9, 5]

    for element in a:
        print(element)
    ```

    <strong>Output:</strong>

    ```text
    3
    7
    2
    9
    5
    ```

    The loop visits the elements directly, without using their indices.

### 7.6.3 The <code>break</code> and <code>continue</code> statements

- The <code>break</code> statement immediately terminates the loop.

- The <code>continue</code> statement skips the rest of the current iteration and moves to the next one.

<a id="box-20-py-exbreak"></a>

!!! esempio "Example 7.20: <code>break</code> and <code>continue</code>"

    ```python
    for i in range(1, 11):
        if i % 2 == 0:
            continue  # Skip the even numbers
        if i > 7:
            break     # Stop the loop at the first odd number greater than 7
        print(i, end=" ")
    print()
    ```

    <strong>Output:</strong>

    ```text
    1 3 5 7
    ```

    As in the <code>C++</code> version, the even values of <code>i</code> are skipped by <code>continue</code>; when <code>i</code> is equal to <code>9</code> the <code>break</code> statement terminates the loop, and the value <code>10</code> is never reached. The final <code>print()</code> writes only the new line.

## 7.7 Lists

Loops become really useful when they visit collections of values. In <code>Python</code> a collection of values is stored in a <strong>list</strong>.

- A <strong>list</strong> is an ordered, mutable collection of elements, that can hold values of any type. Lists are the main sequence data structure in <code>Python</code> and play the role of the arrays of <code>C++</code>.

- Lists are enclosed in square brackets <code>[]</code> and elements are separated by commas. Elements are accessed by their <strong>index</strong>, starting from <code>0</code>: the elements of a list <code>a</code> of size $n$ are <code>a[0]</code>, <code>a[1]</code>, …, <code>a[n-1]</code>. The function <code>len(a)</code> returns the size of the list, and the negative index <code>a[-1]</code> denotes the last element.

- Unlike the arrays of <code>C++</code>, lists are <strong>dynamic</strong>: they can grow or shrink at runtime without manual memory management. The instruction <code>a.append(x)</code> adds the element <code>x</code> at the end of the list.

- The expression <code>[0] \* n</code> creates a list of $n$ zeros. More generally, a <strong>list comprehension</strong> <code>[expression for i in range(n)]</code> creates the list of the $n$ values of the expression for $i = 0, 1, \dots, n-1$; when the loop variable is not used, it is conventionally called <code>\_</code>.

!!! chiave ""

    Lists are created with <code>[]</code> and indexed starting from <code>0</code>. No memory allocation or deallocation is required.

<a id="box-21-py-exlist"></a>

!!! esempio "Example 7.21: creating and accessing a list"

    ```python
    n = 5

    # Create a list of n zeros
    a = [0] * n

    # Assign values
    for i in range(n):
        a[i] = i * 2

    print(a)       # The whole list
    print(a[0])    # First element
    print(a[4])    # Last element, index n-1
    print(len(a))  # Number of elements
    ```

    <strong>Output:</strong>

    ```text
    [0, 2, 4, 6, 8]
    0
    8
    5
    ```

<a id="box-22-py-exlistlit"></a>

!!! esempio "Example 7.22: list literal, modification and growth"

    ```python
    b = [9, 12, 3, 16]   # List of 4 integers

    b[2] = 5             # Assign a new value to the third element
    b.append(20)         # The list grows: now it has 5 elements
    print(b, len(b))
    print(b[-1])         # The last element

    squares = [i * i for i in range(6)]  # List comprehension
    print(squares)
    ```

    <strong>Output:</strong>

    ```text
    [9, 12, 5, 16, 20] 5
    20
    [0, 1, 4, 9, 16, 25]
    ```

    Accessing an index that does not exist, for example <code>b[5]</code>, stops the program with the error <code>IndexError: list index out of range</code> (in <code>C++</code> the same access is not checked).

<a id="box-23-py-exlistiter"></a>

!!! esempio "Example 7.23: list literal and iteration over the indices"

    ```python
    a = [9, 12, 3, 16, 19, 11, 12]
    n = len(a)

    for i in range(n):
        print(f"a[{i}] = {a[i]}")
    ```

    <strong>Output:</strong>

    ```text
    a[0] = 9
    a[1] = 12
    a[2] = 3
    a[3] = 16
    a[4] = 19
    a[5] = 11
    a[6] = 12
    ```

### 7.7.1 Two-dimensional lists

- Two-dimensional data can be represented as a <strong>list of lists</strong>. Each row is itself a list, and elements are accessed with two indices <code>matrix[i][j]</code>, both starting from $0$: for example, if <code>c = [[3, 1, 4], [1, 5, 9]]</code>, then <code>c[1][2]</code> is the element in the second row and third column, equal to $9$.

- A matrix of $m$ rows and $n$ columns filled with zeros is created with the list comprehension <code>[[0] \* n for \_ in range(m)]</code>, which builds $m$ distinct rows.

<a id="box-24-py-exmatrix"></a>

!!! esempio "Example 7.24: two-dimensional list (matrix)"

    ```python
    m = 3   # Number of rows
    n = 2   # Number of columns

    # Create a matrix of zeros
    matrix = [[0] * n for _ in range(m)]

    # Assign values
    for i in range(m):
        for j in range(n):
            matrix[i][j] = i * j

    # Print the matrix
    for i in range(m):
        for j in range(n):
            print(f"matrix[{i}][{j}] = {matrix[i][j]}")
    print(matrix)
    ```

    <strong>Output:</strong>

    ```text
    matrix[0][0] = 0
    matrix[0][1] = 0
    matrix[1][0] = 0
    matrix[1][1] = 1
    matrix[2][0] = 0
    matrix[2][1] = 2
    [[0, 0], [0, 1], [0, 2]]
    ```

- The shorter expression <code>[[0] \* n] \* m</code> is wrong: it repeats $m$ times the <em>same</em> row, so a change to one row appears in all the rows.

<a id="box-25-py-exalias"></a>

!!! esempio "Example 7.25: a common mistake with two-dimensional lists"

    ```python
    wrong = [[0] * 2] * 3                  # Three references to the same row
    wrong[0][0] = 1
    print(wrong)

    right = [[0] * 2 for _ in range(3)]    # Three distinct rows
    right[0][0] = 1
    print(right)
    ```

    <strong>Output:</strong>

    ```text
    [[1, 0], [1, 0], [1, 0]]
    [[1, 0], [0, 0], [0, 0]]
    ```

## 7.8 Functions

As in pseudo-code, an algorithm is written as a function that receives the input and returns the output.

- Functions allow programmers to write modular and reusable code by grouping instructions into a single unit. A function is defined with the keyword <code>def</code>, followed by the function name and the parameter list in parentheses, ending with the symbol “<code>:</code>”.

- A function in <code>Python</code> consists of:

    1. the keyword <code>def</code> followed by the <strong>function name</strong>;

    2. a <strong>parameter list</strong> (optional): specifies the input values, without their data types;

    3. an indented <strong>body</strong>: the block of code executed when the function is called;

    4. a <code>return</code> statement (optional): returns a value to the caller. A function without <code>return</code> returns the special value <code>None</code>.

- A function must be defined before the instruction that calls it is executed: for this reason the functions are written at the beginning of the file.

- The main instructions of a <code>Python</code> program are typically placed at the top level of the file, or inside a block guarded by <code>if \_\_name\_\_ == "\_\_main\_\_":</code>, which ensures that the code runs only when the file is executed directly (and not when it is imported as a module by another file). This block plays the role of the <code>main</code> function of <code>C++</code>.

- <code>Python</code> source code can also be executed online, for example at the following address:<br> [www.mycompiler.io/online-python-compiler](https://www.mycompiler.io/online-python-compiler)

<a id="box-26-py-exfunctions"></a>

!!! esempio "Example 7.26: functions"

    ```python
    # Function definition
    def addition(a, b):
        return a + b  # Returns the sum

    # Function definition
    def multiplication(a, b):
        return a * b  # Returns the product

    if __name__ == "__main__":
        total = addition(5, 10)          # Function call
        print(f"Sum: {total}")

        product = multiplication(5, 10)  # Function call
        print(f"Prod: {product}")
    ```

    <strong>Output:</strong>

    ```text
    Sum: 15
    Prod: 50
    ```

<a id="box-27-py-exsummatrix"></a>

!!! esempio "Example 7.27: function operating on a two-dimensional list"

    ```python
    def sum_matrix(matrix, rows, columns):
        """Return the sum of all elements of a 2D list."""
        total = 0
        for i in range(rows):
            for j in range(columns):
                total += matrix[i][j]
        return total

    if __name__ == "__main__":
        m, n = 3, 2

        # Build the matrix with a nested list comprehension
        matrix = [[i * j for j in range(n)] for i in range(m)]

        result = sum_matrix(matrix, m, n)
        print(f"Sum of matrix elements: {result}")
    ```

    <strong>Output:</strong>

    ```text
    Sum of matrix elements: 3
    ```

    The matrix is <code>[[0, 0], [0, 1], [0, 2]]</code>, as in [Example 7.24](#box-24-py-exmatrix), and the sum of its elements is $0+0+0+1+0+2 = 3$.

### 7.8.1 Parameters and return values

In <code>C++</code> the parameters are passed by value or by reference. In <code>Python</code> every parameter receives the <em>same</em> object as the argument of the caller, and the effect of a function on the caller depends on what the function does with it.

- If the function <strong>assigns a new value</strong> to a parameter (for example <code>x = x + 1</code>), only the local name changes: the variable of the caller is not affected. For numbers, the behaviour is the same as the parameters passed by value in <code>C++</code>.

- If the function <strong>modifies the elements</strong> of a list received as a parameter (for example <code>a[i] = 0</code>), the change is visible to the caller, as for the arrays passed to a function in <code>C++</code>.

- A function can return <strong>several values</strong> at once, separated by commas: they are returned as a <strong>tuple</strong>, and the caller assigns them to several variables with a multiple assignment. In <code>C++</code> the same result requires parameters passed by reference.

<a id="box-28-py-exparams"></a>

!!! esempio "Example 7.28: parameters and multiple return values"

    ```python
    def increment(x):
        x = x + 1           # Changes only the local name x

    def fill_with_zeros(a):
        for i in range(len(a)):
            a[i] = 0        # Modifies the list of the caller

    def divide(n, m):
        return n // m, n % m  # Returns two values (a tuple)

    if __name__ == "__main__":
        k = 5
        increment(k)
        print("After increment:", k)

        b = [4, 7, 1]
        fill_with_zeros(b)
        print("List:", b)

        q, r = divide(17, 5)
        print("Quotient and remainder:", q, r)
        print("Tuple:", divide(17, 5))
    ```

    <strong>Output:</strong>

    ```text
    After increment: 5
    List: [0, 0, 0]
    Quotient and remainder: 3 2
    Tuple: (3, 2)
    ```

## 7.9 A complete algorithm: the maximum value in an array

We now put all the pieces together: a function, a loop, a conditional statement and a list.

!!! chiave ""

    We consider the problem of finding the maximum value in an array $a$ of $n \ge 1$ integer numbers.

- This is the pseudo-code of the algorithm <code>FindMaximum</code> of the chapter «Pseudo-code»: the entries are indexed from $1$ to $n$.

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

- This is the <code>Python</code> implementation. The elements are indexed from $0$ to $n-1$, so the initialization uses <code>a[0]</code> and the loop <code>for i in range(1, len(a))</code> visits the indices $1, \dots, n-1$. The size $n$ is not passed as a parameter, because the function obtains it with <code>len(a)</code>. The variable is called <code>max\_val</code> and not <code>max</code>, so as not to hide the built-in function <code>max()</code>. The function assumes $n \ge 1$, as the pseudo-code does: for an empty list the access to <code>a[0]</code> stops the program with an <code>IndexError</code>.

    ```python
    def array_max_value(a):
        """Return the maximum value in the list a (len(a) >= 1)."""
        max_val = a[0]  # Initialize with the first element

        for i in range(1, len(a)):
            if a[i] > max_val:
                max_val = a[i]  # Update the maximum

        return max_val

    if __name__ == "__main__":
        a = [9, 12, 3, 16, 19, 11, 12]

        max_val = array_max_value(a)
        print(f"Maximum value: {max_val}")
    ```

    <strong>Output:</strong>

    ```text
    Maximum value: 19
    ```

- The test instance can also be generated at random with the module <code>random</code> of the <code>Python</code> library: <code>random.randint(1, 100)</code> returns a random integer between $1$ and $100$ (both included). The instruction <code>random.seed(2026)</code> fixes the starting point of the random generator, so that every execution produces the same list; without it, every execution produces a different list.

<a id="box-29-py-exrandom"></a>

!!! esempio "Example 7.29: a random instance"

    ```python
    import random

    def array_max_value(a):
        max_val = a[0]
        for i in range(1, len(a)):
            if a[i] > max_val:
                max_val = a[i]
        return max_val

    if __name__ == "__main__":
        random.seed(2026)  # Same random list at every execution
        n = 10             # Size of the list
        a = [random.randint(1, 100) for _ in range(n)]

        print(a)
        print(f"Maximum value: {array_max_value(a)}")
    ```

    <strong>Output:</strong>

    ```text
    [16, 41, 65, 66, 83, 14, 29, 77, 80, 72]
    Maximum value: 83
    ```

<a id="box-30-py-extrace"></a>

!!! esempio "Example 7.30: step-by-step execution"

    In each table, the column $i$ is the index of the <code>Python</code> loop and the column $i+1$ is the corresponding index of the pseudo-code. The first row is the initialization <code>max\_val = a[0]</code>.

    <strong>Instance 1:</strong> $a = [9, 12, 3, 16, 19, 11, 12]$, $n=7$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span> (<code>Python</code>)</th>
    <th><span class="arithmatex">&#92;(i+1&#92;)</span> (pseudo-code)</th>
    <th><code>a[i]</code></th>
    <th><code>a[i] &gt; max\_val</code>?</th>
    <th><code>max\_val</code></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(16&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(16&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(11&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(6&#92;)</span></td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td><span class="arithmatex">&#92;(12&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(19&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> <code>max\_val</code> $= 19$

    <strong>Instance 2:</strong> $a = [3, 7, 2, 9, 1]$, $n=5$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span> (<code>Python</code>)</th>
    <th><span class="arithmatex">&#92;(i+1&#92;)</span> (pseudo-code)</th>
    <th><code>a[i]</code></th>
    <th><code>a[i] &gt; max\_val</code>?</th>
    <th><code>max\_val</code></th>
    </tr>
    <tr>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td>–</td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(2&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(7&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(3&#92;)</span></td>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    <td>Yes</td>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">&#92;(4&#92;)</span></td>
    <td><span class="arithmatex">&#92;(5&#92;)</span></td>
    <td><span class="arithmatex">&#92;(1&#92;)</span></td>
    <td>No</td>
    <td><span class="arithmatex">&#92;(9&#92;)</span></td>
    </tr>
    </table></div>

    <strong>Return:</strong> <code>max\_val</code> $= 9$

## 7.10 Bitwise operators

The bitwise operators of the chapter «Introduction to <code>C++</code>» exist in <code>Python</code> with the same symbols and the same meaning: <code>&amp;</code> (AND), <code>|</code> (OR), <code></code> (XOR), <code>~</code> (NOT), <code>&lt; &lt;</code> (left shift) and <code>&gt; &gt;</code> (right shift). The function <code>bin()</code> returns the binary representation of an integer, preceded by the prefix <code>0b</code>.

- Since the integers of <code>Python</code> have no fixed number of bits, the bitwise NOT does not depend on a data type: <code>~x</code> is always equal to $-x-1$. To obtain the $8$-bit result of <code>C++</code>, the result is combined with the mask <code>0xFF</code> (the number $255$, whose binary representation is $11111111$).

<a id="box-31-py-exbitwise"></a>

!!! esempio "Example 7.31: bitwise operators"

    ```python
    a = 12  # Binary: 1100
    b = 10  # Binary: 1010

    print(a & b, a | b, a ^ b)          # AND, OR, XOR
    print(bin(a), bin(b), bin(a & b))   # Binary representations
    print(5 << 2, 20 >> 2, 20 >> 3)     # Shifts
    print(~a, ~a & 0xFF)                # NOT, and its 8-bit version

    n = 15
    print("odd" if n & 1 else "even")   # Least significant bit
    ```

    <strong>Output:</strong>

    ```text
    8 14 6
    0b1100 0b1010 0b1000
    20 5 2
    -13 243
    odd
    ```

    All the values coincide with those of the corresponding examples of the chapter «Introduction to <code>C++</code>».

## 7.11 <code>Python</code> and <code>C++</code> side by side

The following table summarizes the main differences between the two languages met in this chapter.

<div class="tabella" markdown="0"><table>
<tr>
<th></th>
<th><code>C++</code></th>
<th><code>Python</code></th>
</tr>
<tr>
<td>Execution</td>
<td>compiled (<code>g++</code>), then executed</td>
<td>interpreted (<code>python3</code>)</td>
</tr>
<tr>
<td>Data types</td>
<td>declared: <code>int x = 5;</code></td>
<td>not declared: <code>x = 5</code></td>
</tr>
<tr>
<td>End of instruction</td>
<td><code>;</code></td>
<td>end of the line</td>
</tr>
<tr>
<td>Blocks</td>
<td>curly braces <code>{}</code></td>
<td><code>:</code> and indentation</td>
</tr>
<tr>
<td>Comments</td>
<td><code>//</code> and <code>/\* \*/</code></td>
<td><code>#</code> (and <code>""" """</code>)</td>
</tr>
<tr>
<td>Boolean values</td>
<td><code>true</code>, <code>false</code> (printed <code>1</code>, <code>0</code>)</td>
<td><code>True</code>, <code>False</code></td>
</tr>
<tr>
<td><code>10 / 3</code></td>
<td><code>3</code> (integer division)</td>
<td><code>3.3333333333333335</code></td>
</tr>
<tr>
<td>Integer division</td>
<td><code>/</code> between two <code>int</code></td>
<td><code>//</code></td>
</tr>
<tr>
<td>Power</td>
<td>function <code>pow</code></td>
<td>operator <code>\*\*</code></td>
</tr>
<tr>
<td>Increment</td>
<td><code>x++</code>, <code>++x</code></td>
<td><code>x += 1</code></td>
</tr>
<tr>
<td>Logical operators</td>
<td><code>&amp;&amp;</code>, <code>||</code>, <code>!</code></td>
<td><code>and</code>, <code>or</code>, <code>not</code></td>
</tr>
<tr>
<td>Ternary operator</td>
<td><code>c ? x : y</code></td>
<td><code>x if c else y</code></td>
</tr>
<tr>
<td><code>for</code> loop</td>
<td><code>for (int i = 0; i &lt; n; i++)</code></td>
<td><code>for i in range(n):</code></td>
</tr>
<tr>
<td>Collections</td>
<td>arrays, fixed or dynamic size</td>
<td>lists, dynamic</td>
</tr>
<tr>
<td>Size of a collection</td>
<td>stored in a separate variable</td>
<td><code>len(a)</code></td>
</tr>
<tr>
<td>Several results</td>
<td>parameters by reference</td>
<td>return of a tuple</td>
</tr>
<tr>
<td>Entry point</td>
<td>function <code>main</code></td>
<td>top level of the file</td>
</tr>
</table></div>

!!! chiave ""

    <strong>Key points of the chapter</strong>

    - A <code>Python</code> program is executed by the interpreter (<code>python3</code>) from the first line to the last one; the instructions do not end with “<code>;</code>” and the blocks are delimited by “<code>:</code>” and by the indentation.

    - Variables are created by assignment, without declaring their data type; the integers have no maximum value.

    - The operator <code>/</code> always gives a <code>float</code>; the integer division is <code>//</code> and it rounds down, also for negative numbers.

    - Conditional statements (<code>if</code>, <code>elif</code>, <code>else</code>, and the conditional expression) choose which instructions are executed; loops (<code>while</code>, and <code>for</code> over a <code>range</code> or a list) repeat them.

    - The lists of <code>Python</code> are indexed from $0$ to $n-1$, with $n$ = <code>len(a)</code>, while the arrays of the pseudo-code are indexed from $1$ to $n$; lists grow with <code>append</code> and need no memory management.

    - A function modifies the list of the caller when it changes its elements, but not a number it receives; several results are returned together as a tuple.

---

**Exercises on this chapter:** [:material-pencil: Introduction to Python](../exercises/ex-07-introduction-to-python.md)
