---
title: "Introduction to Java"
---

# Introduction to Java

<div class="info-capitolo" markdown>

**Part 2 · Programming languages · Chapter 8** · [:material-file-pdf-box: Lecture notes, volume 2 (PDF)](../pdf/lecture-notes-2-programming-languages.pdf) · [:material-presentation: Slides](../pdf/slides-08-introduction-to-java.pdf) · [:material-pencil: Exercises: Introduction to Java](../exercises/ex-08-introduction-to-java.md)

</div>

## Introduction

In the chapters «Introduction to <code>C++</code>» and «Introduction to <code>Python</code>» we translated the pseudo-code of our algorithms into a compiled and into an interpreted programming language. In this chapter we introduce a third programming language, <code>Java</code>, which is in between: its programs are compiled into an intermediate code, which is then executed by a virtual machine. Its syntax is very close to the syntax of <code>C++</code>, but every program is organized into <strong>classes</strong>.

The chapter follows the same path as the two previous chapters, so that the three languages can be compared section by section:

- the main characteristics of the language and the structure of a program;

- variables, data types, input and output;

- operators, conditional statements and loops;

- arrays, and the dynamic lists of the class <code>ArrayList</code>;

- methods (the <code>Java</code> name for functions), their parameters and their return values;

- a complete algorithm, the search of the maximum value in an array, written in pseudo-code and in <code>Java</code>;

- the bitwise operators and a summary table that compares <code>Java</code> with <code>C++</code> and <code>Python</code>.

Every fragment of code of the chapter has been compiled with the <code>javac</code> compiler and executed with the <code>java</code> virtual machine (<code>OpenJDK 25</code>): the outputs reported in the examples are the ones printed by the programs.

!!! chiave ""

    In pseudo-code the entries of an array $a[1..n]$ are indexed from $1$ to $n$; in <code>Java</code>, as in <code>C++</code> and <code>Python</code>, the elements of an array of size $n$ are indexed from $0$ to $n-1$. The entry $a[i]$ of the pseudo-code corresponds to the element <code>a[i-1]</code> of the <code>Java</code> code.

## 8.1 Main characteristics of the programming language

The main characteristics of <code>Java</code> are the following.

- <code>Java</code> is a <strong>compiled and interpreted</strong> language: the source code (<code>.java</code> files) is first compiled into <strong>bytecode</strong> (<code>.class</code> files) by the <code>Java</code> compiler <code>javac</code>, and then the bytecode is executed by the <strong>Java Virtual Machine</strong> (JVM). This makes <code>Java</code> programs <strong>platform-independent</strong>: the same bytecode runs on any machine that has a JVM installed (“write once, run anywhere”).

- <code>Java</code> is a <strong>strongly and statically typed</strong> language: every variable must be declared with its data type before use, and its data type cannot change during the execution.

- <code>Java</code> is <strong>object-oriented</strong>: every program is organized into <strong>classes</strong>. The entry point of every <code>Java</code> program is the <code>main</code> method of a class.

- <code>Java</code> supports <strong>methods</strong> (the <code>Java</code> term for functions), enabling a modular and reusable approach to programming.

- As in <code>C++</code>, the block structure of the code is defined by <strong>curly braces</strong> <code>{}</code>, and each instruction must end with the reserved symbol “<code>;</code>”.

- As in <code>C++</code>, a single-line comment starts with the reserved symbol “<code>//</code>”, and multi-line comments are enclosed between the reserved symbols “<code>/\*</code>” and “<code>\*/</code>”.

<a id="box-1-java-excomments"></a>

!!! esempio "Example 8.1: comments in <code>Java</code>"

    This is an example of a single-line comment:

    ```java
    // This is a comment line
    ```

    This is an example of a multi-line comment:

    ```java
    /* This is a
       multi-line comment */
    ```

### 8.1.1 The structure of a program

Before describing the single instructions, we look at the skeleton that every program shares. A <code>Java</code> program is made of one or more classes; the execution starts from the method <code>public static void main(String[] args)</code> of the class that is launched.

<a id="box-2-java-exskeleton"></a>

!!! esempio "Example 8.2: the skeleton of a program"

    ```java
    public class HelloWorld {

        public static void main(String[] args) {
            // The instructions of the program are written here
            System.out.println("Hello, world!");
        }
    }
    ```

    A class declared <code>public</code> must be saved in a file with the same name as the class: here <code>HelloWorld.java</code>. The program is compiled and executed with the commands

    ```text
    javac HelloWorld.java
    java HelloWorld
    ```

    The first command produces the bytecode file <code>HelloWorld.class</code>; the second one executes it (note that the extension is not written). The output is

    ```text
    Hello, world!
    ```

In the following examples we write only the instructions that matter: unless they contain a complete program, the fragments of code are meant to be placed inside the curly braces of <code>main</code>.

!!! chiave ""

    Every <code>Java</code> instruction belongs to a method, and every method belongs to a class. Each instruction ends with “<code>;</code>”.

## 8.2 Variables and data types

The source code operates on <strong>variables</strong>, and every variable has a <strong>data type</strong>.

- The four fundamental data types of <code>Java</code> are:

    1. The data type “<code>int</code>” represents an integer stored with $32$ bits: a whole number from $-2^{31} = -2147483648$ to $2^{31}-1 = 2147483647$. For larger integers the data type <code>long</code> ($64$ bits) is used.

    2. The data type “<code>boolean</code>” represents a Boolean value: <code>true</code> or <code>false</code> (lowercase).

    3. The data type “<code>double</code>” represents a floating-point number with double precision ($64$ bits), as in <code>C++</code>. The data type <code>float</code> has single precision, and its values are written with the suffix <code>f</code> (e.g., <code>3.14f</code>).

    4. The data type “<code>char</code>” represents a single character, enclosed in single quotes (e.g., <code>'A'</code>, <code>'7'</code>).

- The data type “<code>String</code>” (with capital <code>S</code>) represents a sequence of characters enclosed in double quotes, and it is the standard way to handle text in <code>Java</code>.

- A variable acts as a container that stores a value of a specific data type for later use.

- Variables are assigned values using the assignment operator “<code>=</code>”. When a new value is assigned, the previous value is overwritten.

- The compiler checks the data types: assigning a value of a wrong type (for example the string <code>"five"</code> to a variable of type <code>int</code>) or using a variable that has not received a value is a <strong>compilation error</strong>, and the program is not produced.

!!! chiave ""

    Variables must be declared with their data type before use, as in <code>C++</code>.

<a id="box-3-java-exvariables"></a>

!!! esempio "Example 8.3: variable declarations and assignments"

    ```java
    int age = 25;              // Integer variable
    boolean isRaining = false; // Boolean variable
    double pi = 3.14159;       // Double-precision floating-point
    float small = 3.14f;       // Single-precision floating-point
    double large = 123456.789; // Double-precision floating-point
    char letter = 'A';         // Character variable
    String name = "Alice";     // String variable

    age = 26; // The previous value 25 is overwritten
    System.out.println(age + " " + isRaining + " " + pi + " " + small);
    System.out.println(large + " " + letter + " " + name);
    ```

    <strong>Output:</strong>

    ```text
    26 false 3.14159 3.14
    123456.789 A Alice
    ```

    Unlike <code>C++</code>, the Boolean value is displayed as <code>false</code> and the number <code>123456.789</code> is displayed with all its digits.

<a id="box-4-java-exoverflow"></a>

!!! esempio "Example 8.4: the limits of the data type <code>int</code>"

    ```java
    int big = Integer.MAX_VALUE;  // The largest int
    System.out.println(big);
    System.out.println(big + 1);  // Overflow: the result does not fit in 32 bits

    long bigger = (long) big + 1; // Computed with 64 bits
    System.out.println(bigger);
    ```

    <strong>Output:</strong>

    ```text
    2147483647
    -2147483648
    2147483648
    ```

    When the result of an operation between <code>int</code> values does not fit in $32$ bits, it “wraps around” to the other end of the interval, without any error message. The integers of <code>Python</code> never overflow.

## 8.3 Input and output

- The object <code>System.out</code> (the standard output, provided by the class <code>System</code>) has the methods that display values on the screen. The most common are:

    - <code>System.out.println()</code>: prints a value followed by a new line;

    - <code>System.out.print()</code>: prints a value without the new line.

- Values and strings are <strong>concatenated</strong> with the <code>+</code> operator inside a print statement: when one of the two operands of <code>+</code> is a <code>String</code>, the other one is converted into text. The expression is evaluated from left to right, so an arithmetic operation inside a concatenation must be enclosed in parentheses.

- The method <code>System.out.printf()</code> prints a formatted text: in the first string, <code>%d</code> is replaced by an integer, <code>%s</code> by a string, <code>%.kf</code> by a floating-point number with exactly $k$ digits after the decimal point, and <code>%n</code> by a new line.

<a id="box-5-java-exprint"></a>

!!! esempio "Example 8.5: screen output"

    ```java
    int n = 42;
    System.out.println("The value of the variable is " + n);
    System.out.println("n = " + n + ", doubled = " + (n * 2));

    System.out.println("n + 1 = " + n + 1);   // Concatenation: "42" then "1"
    System.out.println("n + 1 = " + (n + 1)); // Addition, then concatenation

    System.out.print("No new line ");
    System.out.println("after print");
    System.out.printf("%d divided by %d is %.2f%n", 10, 3, 10.0 / 3);
    ```

    <strong>Output:</strong>

    ```text
    The value of the variable is 42
    n = 42, doubled = 84
    n + 1 = 421
    n + 1 = 43
    No new line after print
    10 divided by 3 is 3.33
    ```

- The decimal separator printed by <code>printf</code> depends on the language settings of the computer: on a computer set to Italian the last line is <code>10 divided by 3 is 3,33</code>, with a comma. The method <code>println</code> always uses the point.

- To read input from the keyboard, the class <code>Scanner</code> of the package <code>java.util</code> is used. It must be imported with the instruction <code>import java.util.Scanner;</code>, written at the beginning of the file, before the class. The methods <code>nextLine()</code>, <code>nextInt()</code> and <code>nextDouble()</code> read a line of text, an integer and a floating-point number.

<a id="box-6-java-exinput"></a>

!!! esempio "Example 8.6: keyboard input with <code>Scanner</code>"

    ```java
    import java.util.Scanner;

    public class InputExample {

        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);

            System.out.print("Enter your name: ");
            String name = sc.nextLine();     // Reads a String

            System.out.print("Enter an integer: ");
            int n = sc.nextInt();            // Reads an int

            System.out.print("Enter a real number: ");
            double x = sc.nextDouble();      // Reads a double

            System.out.println("Hello " + name + ", n = " + n + ", x = " + x);
            sc.close();
        }
    }
    ```

    <strong>Example of execution</strong> (the user types <code>Ada</code>, <code>7</code> and <code>2.5</code>):

    ```text
    Enter your name: Ada
    Enter an integer: 7
    Enter a real number: 2.5
    Hello Ada, n = 7, x = 2.5
    ```

    Like <code>printf</code>, the method <code>nextDouble()</code> follows the language settings: on a computer set to Italian the real number must be typed as <code>2,5</code>.

## 8.4 Operators

Operators are symbols that perform operations on variables and values. The operators of <code>Java</code> are the same as those of <code>C++</code>: arithmetic, assignment, increment and decrement, relational and logical operators.

### 8.4.1 Arithmetic operators

!!! chiave ""

    <strong>Arithmetic operators</strong>, used to perform basic mathematical operations:

    - <code>+</code> (Addition) $\rightsquigarrow$ Adds two values.

    - <code>-</code> (Subtraction) $\rightsquigarrow$ Subtracts one value from another.

    - <code>\*</code> (Multiplication) $\rightsquigarrow$ Multiplies two values.

    - <code>/</code> (Division) $\rightsquigarrow$ Divides one value by another. Integer division when both operands are integers.

    - <code>%</code> (Modulus) $\rightsquigarrow$ Returns the remainder of a division.

<a id="box-7-java-exarith"></a>

!!! esempio "Example 8.7: arithmetic operators"

    ```java
    int a = 10, b = 3;

    System.out.println("Addition:       " + (a + b));
    System.out.println("Subtraction:    " + (a - b));
    System.out.println("Multiplication: " + (a * b));
    System.out.println("Division:       " + (a / b));  // Integer division
    System.out.println("Modulus:        " + (a % b));  // Remainder of division
    System.out.println("Real division:  " + ((double) a / b));
    ```

    <strong>Output:</strong>

    ```text
    Addition:       13
    Subtraction:    7
    Multiplication: 30
    Division:       3
    Modulus:        1
    Real division:  3.3333333333333335
    ```

- As in <code>C++</code>, the division operator <code>/</code> performs <strong>integer division</strong> when both operands are integers, and the quotient is truncated toward zero: <code>10 / 3</code> is <code>3</code> and <code>-7 / 2</code> is <code>-3</code> (with remainder <code>-7 % 2</code> equal to <code>-1</code>). To obtain a floating-point result, at least one operand must be of type <code>double</code>, for example with the <strong>type conversion</strong> (<strong>cast</strong>) <code>(double) a / b</code>.

- The conversion <code>(int)</code> removes the decimal part of a <code>double</code>: <code>(int) 3.9</code> is <code>3</code>. There is no operator for the power: the method <code>Math.pow(x, y)</code> returns $x^y$ as a <code>double</code>.

<a id="box-8-java-exdivision"></a>

!!! esempio "Example 8.8: integer and floating-point division"

    ```java
    int a = 10, b = 3;

    System.out.println(a / b);             // Integer division
    System.out.println(10.0 / 3);          // Floating-point division
    System.out.println((double) a / b);    // Conversion of a to double
    System.out.printf("%.2f%n", (double) a / b); // Two decimals
    System.out.println(-7 / 2 + " " + -7 % 2);   // Truncation toward zero
    System.out.println((int) 3.9 + " " + Math.pow(2, 10));
    ```

    <strong>Output:</strong>

    ```text
    3
    3.3333333333333335
    3.3333333333333335
    3.33
    -3 -1
    3 1024.0
    ```

### 8.4.2 Assignment operators

!!! chiave ""

    <strong>Assignment operators</strong>, used to assign values to variables:

    - <code>=</code>  (Assignment) $\rightsquigarrow$ Assigns a value to a variable.

    - <code>+=</code> (Addition assignment) $\rightsquigarrow$ Adds a value and assigns the result.

    - <code>-=</code> (Subtraction assignment) $\rightsquigarrow$ Subtracts a value and assigns the result.

    - <code>\*=</code> (Multiplication assignment) $\rightsquigarrow$ Multiplies and assigns the result.

    - <code>/=</code> (Division assignment) $\rightsquigarrow$ Divides and assigns the result.

    - <code>%=</code> (Modulus assignment) $\rightsquigarrow$ Applies the modulus and assigns the result.

<a id="box-9-java-exassign"></a>

!!! esempio "Example 8.9: assignment operators"

    ```java
    int x = 10;  // Assignment
    System.out.println("Initial value: " + x);

    x += 5;  System.out.println("After += 5: " + x); // x = x + 5
    x -= 3;  System.out.println("After -= 3: " + x); // x = x - 3
    x *= 2;  System.out.println("After *= 2: " + x); // x = x * 2
    x /= 4;  System.out.println("After /= 4: " + x); // x = x / 4
    x %= 4;  System.out.println("After %= 4: " + x); // x = x % 4
    ```

    <strong>Output:</strong>

    ```text
    Initial value: 10
    After += 5: 15
    After -= 3: 12
    After *= 2: 24
    After /= 4: 6
    After %= 4: 2
    ```

    Two instructions can be written on the same line, since each of them ends with “<code>;</code>”.

### 8.4.3 Increment and decrement operators

!!! chiave ""

    <strong>Increment and decrement operators</strong>:

    - <code>++</code> (Increment) $\rightsquigarrow$ Increases the value of a variable by 1.

    - <code>- -</code> (Decrement) $\rightsquigarrow$ Decreases the value of a variable by 1.

- As in <code>C++</code>, the pre-increment (<code>++x</code>) increments the value before returning it, and the post-increment (<code>x++</code>) returns the value first, then increments it. The same logic applies to the decrement operator (<code>- -x</code> and <code>x- -</code>).

<a id="box-10-java-exincdec"></a>

!!! esempio "Example 8.10: increment and decrement operators"

    ```java
    int x = 5;
    System.out.println("Initial value: " + x);
    System.out.println("Pre-increment (++x): " + ++x);
    System.out.println("Post-increment (x++): " + x++);
    System.out.println("Value after post-increment: " + x);
    System.out.println("Pre-decrement (--x): " + --x);
    System.out.println("Post-decrement (x--): " + x--);
    System.out.println("Value after post-decrement: " + x);
    ```

    <strong>Output:</strong>

    ```text
    Initial value: 5
    Pre-increment (++x): 6
    Post-increment (x++): 6
    Value after post-increment: 7
    Pre-decrement (--x): 6
    Post-decrement (x--): 6
    Value after post-decrement: 5
    ```

### 8.4.4 Relational operators

!!! chiave ""

    <strong>Relational operators</strong>, used to compare values and return a <code>boolean</code> result:

    - <code>==</code> (Equal to) $\rightsquigarrow$ Checks if two values are equal.

    - <code>!=</code> (Not equal to) $\rightsquigarrow$ Checks if two values are different.

    - <code>&lt;</code>  (Less than) $\rightsquigarrow$ Checks if one value is smaller than another.

    - <code>&gt;</code>  (Greater than) $\rightsquigarrow$ Checks if one value is larger than another.

    - <code>&lt;=</code> (Less than or equal to) $\rightsquigarrow$ Checks if one value is smaller than or equal to another.

    - <code>&gt;=</code> (Greater than or equal to) $\rightsquigarrow$ Checks if one value is larger than or equal to another.

- Relational operators return a value of type <code>boolean</code>, displayed as <code>true</code> or <code>false</code> (not as <code>1</code> and <code>0</code> as in <code>C++</code>). These operators are commonly used in <strong>conditional statements</strong> and <strong>loops</strong>.

- The operator <code>==</code> compares the values of the primitive data types (<code>int</code>, <code>double</code>, <code>char</code>, <code>boolean</code>); two <code>String</code> values are compared with the method <code>equals</code>, for example <code>name.equals("Alice")</code>.

<a id="box-11-java-exrel"></a>

!!! esempio "Example 8.11: relational operators"

    ```java
    int a = 10, b = 5;

    System.out.println("a == b: " + (a == b)); // Equal to
    System.out.println("a != b: " + (a != b)); // Not equal to
    System.out.println("a < b: " + (a < b));   // Less than
    System.out.println("a > b: " + (a > b));   // Greater than
    System.out.println("a <= b: " + (a <= b)); // Less than or equal to
    System.out.println("a >= b: " + (a >= b)); // Greater than or equal to
    ```

    <strong>Output:</strong>

    ```text
    a == b: false
    a != b: true
    a < b: false
    a > b: true
    a <= b: false
    a >= b: true
    ```

### 8.4.5 Logical operators

!!! chiave ""

    <strong>Logical operators</strong>, used for logical operations, often in conditional statements:

    - <code>&amp;&amp;</code> (Logical AND) $\rightsquigarrow$ Returns <code>true</code> if both conditions are <code>true</code>.

    - <code>||</code> (Logical OR) $\rightsquigarrow$ Returns <code>true</code> if at least one condition is <code>true</code>.

    - <code>!</code> (Logical NOT) $\rightsquigarrow$ Reverses the Boolean value.

<a id="box-12-java-exlogic"></a>

!!! esempio "Example 8.12: logical operators"

    ```java
    boolean c1 = true, c2 = false;

    System.out.println("c1: " + c1);
    System.out.println("c2: " + c2);
    System.out.println("c1 && c2: " + (c1 && c2)); // True only if both are true
    System.out.println("c1 || c2: " + (c1 || c2)); // True if at least one is true
    System.out.println("!c1: " + (!c1));           // Reverses the value
    System.out.println("!c2: " + (!c2));
    ```

    <strong>Output:</strong>

    ```text
    c1: true
    c2: false
    c1 && c2: false
    c1 || c2: true
    !c1: false
    !c2: true
    ```

## 8.5 Conditional statements

The relational and logical operators produce the conditions that decide which instructions are executed.

- The <code>if</code> statement evaluates a condition inside parentheses <code>()</code>. If the condition is <code>true</code>, the block inside the curly braces <code>{}</code> is executed. The optional <code>else if</code> clause checks additional conditions, and the optional <code>else</code> clause handles all the remaining cases.

- Unlike <code>C++</code>, the condition must be of type <code>boolean</code>: an integer is not accepted as a condition, so <code>if (n % 2)</code> is a compilation error and the test must be written <code>if (n % 2 != 0)</code>.

<a id="box-13-java-exif"></a>

!!! esempio "Example 8.13: conditional statement"

    ```java
    int number = 10;

    // Check if number is positive
    if (number > 0) {
        System.out.println("The number is positive.");
    } else {
        System.out.println("The number is non-positive.");
    }
    ```

    <strong>Output:</strong>

    ```text
    The number is positive.
    ```

<a id="box-14-java-exelseif"></a>

!!! esempio "Example 8.14: <code>if</code> / <code>else if</code> / <code>else</code>"

    ```java
    int score = 85;
    String grade;

    if      (score >= 90) { grade = "A"; }
    else if (score >= 80) { grade = "B"; }
    else if (score >= 70) { grade = "C"; }
    else if (score >= 60) { grade = "D"; }
    else                  { grade = "F"; }

    System.out.println("Score: " + score + ", Grade: " + grade);
    ```

    <strong>Output:</strong>

    ```text
    Score: 85, Grade: B
    ```

    The conditions are evaluated from top to bottom, and only the block of the first true condition is executed. The variable <code>grade</code> is declared without a value: the compiler accepts it because every branch assigns a value to it before it is printed.

### 8.5.1 Ternary operator (conditional operator)

- The <strong>ternary operator</strong> <code>?:</code> is the same as in <code>C++</code>. Syntax: <code>condition ? value\_if\_true : value\_if\_false</code>.

<a id="box-15-java-extern"></a>

!!! esempio "Example 8.15: ternary operator"

    ```java
    int number = 10;

    // condition ? value_if_true : value_if_false
    String result = (number > 0) ? "positive" : "non-positive";
    System.out.println("The number is " + result);

    // Finding the maximum of two numbers
    int a = 15, b = 20;
    int maximum = (a > b) ? a : b;
    System.out.println("Maximum: " + maximum);

    // Checking even or odd
    int n = 7;
    String parity = (n % 2 == 0) ? "even" : "odd";
    System.out.println(n + " is " + parity);

    // Absolute value
    int x = -5;
    int absValue = (x >= 0) ? x : -x;
    System.out.println("Absolute value of " + x + " is " + absValue);
    ```

    <strong>Output:</strong>

    ```text
    The number is positive
    Maximum: 20
    7 is odd
    Absolute value of -5 is 5
    ```

    The class <code>Math</code> also provides the methods <code>Math.max(a, b)</code> and <code>Math.abs(x)</code>, which return the same values.

## 8.6 Loops

Conditional statements choose <em>whether</em> a block of code is executed; loops decide <em>how many times</em> it is executed.

- Loops are used to execute a block of code repeatedly while a condition is met. As in <code>C++</code>, the most commonly used loops of <code>Java</code> are the <code>while</code> loop and the <code>for</code> loop.

### 8.6.1 The <code>while</code> loop

- The <code>while</code> loop executes a block of code as long as the condition inside the parentheses <code>()</code> evaluates to <code>true</code>. When the condition is <code>false</code>, the loop terminates.

<a id="box-16-java-exwhile"></a>

!!! esempio "Example 8.16: <code>while</code> loop"

    ```java
    int i = 1; // Initialization

    while (i <= 5) { // Condition
        System.out.println("Number: " + i);
        i++; // Increment
    }
    ```

    <strong>Output:</strong>

    ```text
    Number: 1
    Number: 2
    Number: 3
    Number: 4
    Number: 5
    ```

### 8.6.2 The <code>for</code> loop

- The <code>for</code> loop combines initialization, condition, and increment (or decrement) in one statement, exactly as in <code>C++</code>.

<a id="box-17-java-exfor"></a>

!!! esempio "Example 8.17: <code>for</code> loop"

    ```java
    // Initialization; Condition; Increment
    for (int i = 1; i <= 5; i++) {
        System.out.println("Number: " + i);
    }
    ```

    The output is the same as in the <code>while</code> loop of [Example 8.16](#box-16-java-exwhile).

### 8.6.3 The <code>break</code> and <code>continue</code> statements

- The <code>break</code> statement immediately terminates the loop.

- The <code>continue</code> statement skips the rest of the current iteration and moves to the next one.

<a id="box-18-java-exbreak"></a>

!!! esempio "Example 8.18: <code>break</code> and <code>continue</code>"

    ```java
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue; // Skip the even numbers
        }
        if (i > 7) {
            break; // Stop the loop at the first odd number greater than 7
        }
        System.out.print(i + " ");
    }
    System.out.println();
    ```

    <strong>Output:</strong>

    ```text
    1 3 5 7
    ```

    The output is the same as in the <code>C++</code> and <code>Python</code> versions: the value <code>9</code> triggers the <code>break</code>.

## 8.7 Arrays

Loops become really useful when they visit collections of values. A collection of variables of the same data type is stored in an <strong>array</strong>.

- An <strong>array</strong> in <code>Java</code> is an ordered collection of elements of the same data type, with a size fixed at creation time: the size cannot change afterwards.

- The data type of an array of integers is written <code>int[]</code>. An array is allocated with the <code>new</code> operator, for example <code>new int[n]</code>, where the size <code>n</code> can be decided during the execution, as for the dynamic-size arrays of <code>C++</code>. The elements of a new array are initialized to <code>0</code> (to <code>false</code> for <code>boolean</code>).

- Elements are accessed using their <strong>index</strong> inside square brackets <code>[]</code>, starting from <code>0</code>: the elements of an array of size $n$ are <code>a[0]</code>, <code>a[1]</code>, …, <code>a[n-1]</code>. Every array knows its size: the length of an array <code>a</code> is <code>a.length</code>.

- Unlike <code>C++</code>, the memory of an array must not be freed with <code>delete[]</code>: it is released automatically by the <strong>garbage collector</strong> of the JVM when the array is no longer used.

!!! chiave ""

    Arrays are allocated with <code>new</code> before use (or created with a list of values in curly braces). Indices start at <code>0</code>, the size is fixed and is given by <code>a.length</code>.

<a id="box-19-java-exarray"></a>

!!! esempio "Example 8.19: creating and accessing an array"

    ```java
    int n = 5;

    int[] a = new int[n]; // Allocation of an array of n integers

    for (int i = 0; i < n; i++) {
        a[i] = i * 2; // Example of value assignment
    }

    System.out.println("Length: " + a.length);
    System.out.println("a[0] = " + a[0]); // First element
    System.out.println("a[4] = " + a[4]); // Last element, index n-1
    ```

    <strong>Output:</strong>

    ```text
    Length: 5
    a[0] = 0
    a[4] = 8
    ```

    Accessing an index that does not exist, for example <code>a[5]</code>, stops the program with the error <code>ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5</code> (in <code>C++</code> the same access is not checked).

- An array whose values are known when the program is written can be created by listing its values inside curly braces, as in <code>C++</code>.

- The <strong>enhanced <code>for</code> loop</strong> <code>for (int x : a)</code> visits the elements of the array <code>a</code> directly, without using their indices, like the <code>for</code> loop over a list of <code>Python</code>.

- The method <code>Arrays.toString(a)</code>, of the class <code>Arrays</code> of the package <code>java.util</code>, returns the elements of an array as a text in square brackets.

<a id="box-20-java-exarraylit"></a>

!!! esempio "Example 8.20: array literal and iteration"

    ```java
    import java.util.Arrays;

    int[] a = {9, 12, 3, 16, 19, 11, 12};
    int n = a.length;

    for (int i = 0; i < n; i++) {      // Loop over the indices
        System.out.println("a[" + i + "] = " + a[i]);
    }

    for (int x : a) {                  // Loop over the elements
        System.out.print(x + " ");
    }
    System.out.println();

    System.out.println(Arrays.toString(a));
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
    9 12 3 16 19 11 12
    [9, 12, 3, 16, 19, 11, 12]
    ```

    The <code>import</code> instruction is written at the beginning of the file, before the class.

### 8.7.1 Two-dimensional arrays

- Two-dimensional arrays (matrices) are declared with two pairs of square brackets <code>[][]</code>, and allocated with <code>new int[m][n]</code> ($m$ rows and $n$ columns) in a single instruction. The element in row $i$ and column $j$ is accessed as <code>matrix[i][j]</code>, with both indices starting from $0$; <code>matrix.length</code> is the number of rows and <code>matrix[i].length</code> is the number of columns of row $i$.

- A two-dimensional array can also be created by listing its values row by row: <code>int[][] c = {{3, 1, 4}, {1, 5, 9}};</code> creates an array with $2$ rows and $3$ columns, and <code>c[1][2]</code> is the element in the second row and third column, equal to $9$.

<a id="box-21-java-exmatrix"></a>

!!! esempio "Example 8.21: two-dimensional array (matrix)"

    ```java
    int m = 3; // Number of rows
    int n = 2; // Number of columns

    int[][] matrix = new int[m][n]; // Allocation of an m x n matrix

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            matrix[i][j] = i * j; // Example of value assignment
        }
    }

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            System.out.println("matrix[" + i + "][" + j + "] = " + matrix[i][j]);
        }
    }
    ```

    <strong>Output:</strong>

    ```text
    matrix[0][0] = 0
    matrix[0][1] = 0
    matrix[1][0] = 0
    matrix[1][1] = 1
    matrix[2][0] = 0
    matrix[2][1] = 2
    ```

### 8.7.2 Lists of variable size: <code>ArrayList</code>

- When the number of elements is not known in advance, the class <code>ArrayList</code> of the package <code>java.util</code> provides a list that grows during the execution, like the lists of <code>Python</code>. The data type of a list of integers is <code>ArrayList&lt;Integer&gt;</code>: the elements of an <code>ArrayList</code> are objects, and <code>Integer</code> is the class that corresponds to <code>int</code>.

- The method <code>add(x)</code> appends the element <code>x</code> at the end of the list, <code>get(i)</code> returns the element of index $i$, <code>set(i, x)</code> replaces it, and <code>size()</code> returns the number of elements.

<a id="box-22-java-exarraylist"></a>

!!! esempio "Example 8.22: a list of variable size"

    ```java
    import java.util.ArrayList;

    ArrayList<Integer> list = new ArrayList<>(); // Empty list

    for (int i = 1; i <= 4; i++) {
        list.add(i * i);  // The list grows
    }
    list.set(0, 100);     // Replaces the element of index 0

    System.out.println(list + " has " + list.size() + " elements");
    System.out.println("list.get(2) = " + list.get(2));
    ```

    <strong>Output:</strong>

    ```text
    [100, 4, 9, 16] has 4 elements
    list.get(2) = 9
    ```

## 8.8 Methods (functions)

As in pseudo-code, an algorithm is written as a function that receives the input and returns the output. In <code>Java</code>, functions are called <strong>methods</strong> and must always be defined inside a <strong>class</strong>.

- A method in <code>Java</code> consists of:

    1. an optional <strong>access modifier</strong> (e.g., <code>public</code>, <code>private</code>) and the keyword <code>static</code> when the method belongs to the class rather than to an object of the class (all the methods of this chapter are <code>static</code>);

    2. a <strong>return type</strong>: specifies the type of the returned value (<code>void</code> if nothing is returned);

    3. a <strong>method name</strong>: the unique identifier of the method;

    4. a <strong>parameter list</strong> (optional): specifies the input values, each one with its data type;

    5. a <strong>body</strong>: the block of code executed when the method is called;

    6. a <code>return</code> statement, mandatory if the return type is not <code>void</code>.

- The <strong>entry point</strong> of every <code>Java</code> program is the method <code>public static void main(String[] args)</code>, which plays the role of the <code>main</code> function of <code>C++</code>. The parameter <code>args</code> contains the words written after the name of the class in the command <code>java</code>.

- Unlike <code>C++</code>, a method can be called before the point where it is defined in the class: the order of the methods inside a class does not matter.

- <code>Java</code> source code can also be compiled and executed online, for example at the following address:<br> [www.mycompiler.io/online-java-compiler](https://www.mycompiler.io/online-java-compiler)

<a id="box-23-java-exmethods"></a>

!!! esempio "Example 8.23: methods"

    ```java
    public class Main {

        // Method definition
        static int addition(int a, int b) {
            return a + b; // Returns the sum
        }

        // Method definition
        static int multiplication(int a, int b) {
            return a * b; // Returns the product
        }

        public static void main(String[] args) {
            int sum = addition(5, 10);         // Method call
            System.out.println("Sum: " + sum);

            int prod = multiplication(5, 10);  // Method call
            System.out.println("Prod: " + prod);
        }
    }
    ```

    <strong>Output:</strong>

    ```text
    Sum: 15
    Prod: 50
    ```

<a id="box-24-java-exsummatrix"></a>

!!! esempio "Example 8.24: method operating on a two-dimensional array"

    ```java
    public class Main {

        static int sumMatrix(int[][] matrix, int rows, int cols) {
            int sum = 0;
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    sum += matrix[i][j];
                }
            }
            return sum;
        }

        public static void main(String[] args) {
            int m = 3, n = 2;
            int[][] matrix = new int[m][n];

            for (int i = 0; i < m; i++)
                for (int j = 0; j < n; j++)
                    matrix[i][j] = i * j;

            int total = sumMatrix(matrix, m, n);
            System.out.println("Sum of matrix elements: " + total);
        }
    }
    ```

    <strong>Output:</strong>

    ```text
    Sum of matrix elements: 3
    ```

    The body of a <code>for</code> loop made of a single instruction can be written without curly braces, as in <code>C++</code>.

### 8.8.1 Parameters and return values

- In <code>Java</code> every parameter is passed <strong>by value</strong>: the method receives a copy of the argument. For the primitive data types (<code>int</code>, <code>double</code>, <code>boolean</code>, <code>char</code>) the changes made to the copy do not affect the variable of the caller; there is no passing by reference as with the symbol <code>&amp;</code> of <code>C++</code>.

- A variable of type <code>int[]</code> does not contain the elements, but a <strong>reference</strong> to the array (similar to the pointer of <code>C++</code>). The method receives a copy of the reference, which points to the same array: the changes made to the <em>elements</em> of the array are visible to the caller.

- A method returns at most one value. When a method has to give back several results, it can return them in an array, for example <code>new int[]{q, r}</code>.

<a id="box-25-java-exparams"></a>

!!! esempio "Example 8.25: parameters and multiple results"

    ```java
    public class Main {

        static void increment(int x) {
            x = x + 1; // Modifies only the local copy
        }

        static void fillWithZeros(int[] a) {
            for (int i = 0; i < a.length; i++) {
                a[i] = 0; // Modifies the array of the caller
            }
        }

        static int[] divide(int n, int m) {
            return new int[]{n / m, n % m}; // Two results in an array
        }

        public static void main(String[] args) {
            int k = 5;
            increment(k);
            System.out.println("After increment: " + k);

            int[] b = {4, 7, 1};
            fillWithZeros(b);
            System.out.println("Array: " + b[0] + " " + b[1] + " " + b[2]);

            int[] qr = divide(17, 5);
            System.out.println("Quotient and remainder: " + qr[0] + " " + qr[1]);
        }
    }
    ```

    <strong>Output:</strong>

    ```text
    After increment: 5
    Array: 0 0 0
    Quotient and remainder: 3 2
    ```

## 8.9 A complete algorithm: the maximum value in an array

We now put all the pieces together: a method, a loop, a conditional statement and an array.

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

- This is the <code>Java</code> implementation. The elements are indexed from $0$ to $n-1$, so the initialization uses <code>a[0]</code> and the loop starts from <code>i = 1</code>. The size $n$ is not passed as a parameter, because the method obtains it with <code>a.length</code>. The method assumes $n \ge 1$, as the pseudo-code does: for an empty array the access to <code>a[0]</code> stops the program with an <code>ArrayIndexOutOfBoundsException</code>.

    ```java
    public class Main {

        // Method to find the maximum value in an array
        static int arrayMaxValue(int[] a) {
            int max = a[0]; // Initialize with the first element

            for (int i = 1; i < a.length; i++) {
                if (a[i] > max) {
                    max = a[i]; // Update the maximum
                }
            }

            return max;
        }

        public static void main(String[] args) {
            int[] a = {9, 12, 3, 16, 19, 11, 12};

            int max = arrayMaxValue(a);
            System.out.println("Maximum value: " + max);
        }
    }
    ```

    <strong>Output:</strong>

    ```text
    Maximum value: 19
    ```

- The test instance can also be generated at random with the class <code>Random</code> of the package <code>java.util</code>: if <code>rand</code> is an object of this class, <code>rand.nextInt(100)</code> returns a random integer between $0$ and $99$, so <code>rand.nextInt(100) + 1</code> is between $1$ and $100$. The object created with <code>new Random(2026)</code> starts from the fixed value $2026$ (the <strong>seed</strong>), so that every execution produces the same array; the object created with <code>new Random()</code> produces a different array at every execution.

<a id="box-26-java-exrandom"></a>

!!! esempio "Example 8.26: a random instance"

    ```java
    import java.util.Arrays;
    import java.util.Random;

    public class Main {

        static int arrayMaxValue(int[] a) {
            int max = a[0];
            for (int i = 1; i < a.length; i++) {
                if (a[i] > max) {
                    max = a[i];
                }
            }
            return max;
        }

        public static void main(String[] args) {
            int n = 10;  // Size of the array
            int[] a = new int[n];
            Random rand = new Random(2026); // Same random array at every execution
            for (int i = 0; i < n; i++) {
                a[i] = rand.nextInt(100) + 1; // Random integer between 1 and 100
            }

            System.out.println(Arrays.toString(a));
            System.out.println("Maximum value: " + arrayMaxValue(a));
        }
    }
    ```

    <strong>Output:</strong>

    ```text
    [100, 51, 98, 31, 50, 39, 74, 37, 35, 79]
    Maximum value: 100
    ```

<a id="box-27-java-extrace"></a>

!!! esempio "Example 8.27: step-by-step execution"

    In each table, the column $i$ is the index of the <code>Java</code> loop and the column $i+1$ is the corresponding index of the pseudo-code. The first row is the initialization <code>max = a[0]</code>.

    <strong>Instance 1:</strong> $a = [9, 12, 3, 16, 19, 11, 12]$, $n=7$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span> (<code>Java</code>)</th>
    <th><span class="arithmatex">&#92;(i+1&#92;)</span> (pseudo-code)</th>
    <th><code>a[i]</code></th>
    <th><code>a[i] &gt; max</code>?</th>
    <th><code>max</code></th>
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

    <strong>Return:</strong> <code>max</code> $= 19$

    <strong>Instance 2:</strong> $a = [3, 7, 2, 9, 1]$, $n=5$

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">&#92;(i&#92;)</span> (<code>Java</code>)</th>
    <th><span class="arithmatex">&#92;(i+1&#92;)</span> (pseudo-code)</th>
    <th><code>a[i]</code></th>
    <th><code>a[i] &gt; max</code>?</th>
    <th><code>max</code></th>
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

    <strong>Return:</strong> <code>max</code> $= 9$

## 8.10 Bitwise operators

The bitwise operators of the chapter «Introduction to <code>C++</code>» exist in <code>Java</code> with the same symbols and the same meaning: <code>&amp;</code> (AND), <code>|</code> (OR), <code></code> (XOR), <code>~</code> (NOT), <code>&lt; &lt;</code> (left shift) and <code>&gt; &gt;</code> (right shift). The method <code>Integer.toBinaryString(x)</code> returns the binary representation of an integer.

- A value of type <code>int</code> has $32$ bits, so <code>~12</code> flips $32$ bits and gives <code>-13</code>; the $8$-bit result of <code>C++</code> is obtained with the mask <code>0xFF</code>, as in <code>Python</code>.

- <code>Java</code> has a third shift operator, <code>&gt; &gt; &gt;</code> (unsigned right shift), which always adds zeros on the left, also for negative numbers; for non-negative numbers it coincides with <code>&gt; &gt;</code>.

- Since a condition must be of type <code>boolean</code>, the test of the least significant bit is written <code>(n &amp; 1) == 1</code>, and not <code>(n &amp; 1)</code> as in <code>C++</code>.

<a id="box-28-java-exbitwise"></a>

!!! esempio "Example 8.28: bitwise operators"

    ```java
    int a = 12; // Binary: 1100
    int b = 10; // Binary: 1010

    System.out.println((a & b) + " " + (a | b) + " " + (a ^ b)); // AND, OR, XOR
    System.out.println(Integer.toBinaryString(a & b));           // 1000
    System.out.println((5 << 2) + " " + (20 >> 2) + " " + (20 >> 3)); // Shifts
    System.out.println(~a + " " + (~a & 0xFF));  // NOT, and its 8-bit version
    System.out.println((-8 >> 1) + " " + (-8 >>> 28)); // Signed and unsigned shift

    int n = 15;
    System.out.println(((n & 1) == 1) ? "odd" : "even"); // Least significant bit
    ```

    <strong>Output:</strong>

    ```text
    8 14 6
    1000
    20 5 2
    -13 243
    -4 15
    odd
    ```

    The number $-8$ is stored as $11\dots11000$ ($32$ bits): <code>-8 &gt; &gt; 1</code> keeps the sign and gives $-4$, while <code>-8 &gt; &gt; &gt; 28</code> keeps only the $4$ leftmost bits $1111$, that is $15$.

## 8.11 <code>Java</code>, <code>C++</code> and <code>Python</code> side by side

The following table summarizes the main differences among the three languages of this part of the course.

<div class="tabella" markdown="0"><table>
<tr>
<th></th>
<th><code>C++</code></th>
<th><code>Java</code></th>
<th><code>Python</code></th>
</tr>
<tr>
<td>Execution</td>
<td>compiled (<code>g++</code>)</td>
<td>compiled into bytecode (<code>javac</code>), executed by the JVM (<code>java</code>)</td>
<td>interpreted (<code>python3</code>)</td>
</tr>
<tr>
<td>Data types</td>
<td>declared</td>
<td>declared</td>
<td>not declared</td>
</tr>
<tr>
<td>Blocks</td>
<td><code>{}</code></td>
<td><code>{}</code></td>
<td><code>:</code> and indentation</td>
</tr>
<tr>
<td>End of instruction</td>
<td><code>;</code></td>
<td><code>;</code></td>
<td>end of the line</td>
</tr>
<tr>
<td>Boolean values</td>
<td><code>true</code>, <code>false</code> (printed <code>1</code>, <code>0</code>)</td>
<td><code>true</code>, <code>false</code></td>
<td><code>True</code>, <code>False</code></td>
</tr>
<tr>
<td><code>10 / 3</code></td>
<td><code>3</code></td>
<td><code>3</code></td>
<td><code>3.3333333333333335</code></td>
</tr>
<tr>
<td><code>-7 / 2</code> (integer)</td>
<td><code>-3</code></td>
<td><code>-3</code></td>
<td><code>-7 // 2</code> is <code>-4</code></td>
</tr>
<tr>
<td>Largest integer</td>
<td><span class="arithmatex">&#92;(2^{31}-1&#92;)</span> for <code>int</code></td>
<td><span class="arithmatex">&#92;(2^{31}-1&#92;)</span> for <code>int</code></td>
<td>no limit</td>
</tr>
<tr>
<td>Logical operators</td>
<td><code>&amp;&amp;</code>, <code>||</code>, <code>!</code></td>
<td><code>&amp;&amp;</code>, <code>||</code>, <code>!</code></td>
<td><code>and</code>, <code>or</code>, <code>not</code></td>
</tr>
<tr>
<td>Collections</td>
<td>arrays, freed with <code>delete[]</code></td>
<td>arrays (<code>a.length</code>) and <code>ArrayList</code>, freed automatically</td>
<td>lists (<code>len(a)</code>), freed automatically</td>
</tr>
<tr>
<td>Out-of-range index</td>
<td>not checked</td>
<td>exception</td>
<td>exception</td>
</tr>
<tr>
<td>Several results</td>
<td>parameters by reference</td>
<td>return of an array</td>
<td>return of a tuple</td>
</tr>
<tr>
<td>Entry point</td>
<td>function <code>main</code></td>
<td>method <code>main</code> of a class</td>
<td>top level of the file</td>
</tr>
</table></div>

!!! chiave ""

    <strong>Key points of the chapter</strong>

    - A <code>Java</code> program is made of classes; it is compiled into bytecode with <code>javac</code> and executed by the JVM with <code>java</code>, starting from the method <code>public static void main(String[] args)</code>.

    - Every variable is declared with its data type, which is checked by the compiler; the data type <code>int</code> has $32$ bits, and the division between two integers is the integer division.

    - Conditional statements (<code>if</code>, <code>else if</code>, <code>else</code>, <code>?:</code>) and loops (<code>while</code>, <code>for</code>, and the enhanced <code>for</code>) have the same syntax as in <code>C++</code>, but a condition must be of type <code>boolean</code>.

    - The arrays of <code>Java</code> are allocated with <code>new</code>, know their size <code>a.length</code>, are indexed from $0$ to $n-1$ and are freed automatically; the class <code>ArrayList</code> provides lists of variable size.

    - Parameters are passed by value; a method that receives an array can modify its elements, and several results are returned together in an array.

---

**Exercises on this chapter:** [:material-pencil: Introduction to Java](../exercises/ex-08-introduction-to-java.md)
