---
title: "Exercises · Introduction to Python"
---

# Exercises · Introduction to Python

<div class="info-capitolo" markdown>

**Exercises · Chapter 7** · each solution opens with a click · [:material-book-open-variant: Chapter 7: Introduction to Python](../languages/07-introduction-to-python.md) · [:material-file-pdf-box: Exercises, volume 2 (PDF)](../pdf/exercises-2-programming-languages.pdf)

</div>

In the exercises of this chapter the programs are written and executed with the conventions of the chapter «Introduction to <code>Python</code>», summarized below.

??? codice "Code"

    - The program of an exercise is saved in a file <code>&lt;name&gt;.py</code> and executed with the command

        ```text
        python3 <name>.py
        ```

    - The test instances are lists written in the code, for example <code>arr1 = [9, 12, 3, 16, 19, 11, 12]</code>, and are passed to the functions without their size: a function obtains the size $n$ of a list <code>a</code> with <code>len(a)</code>.

    - The elements of a list of size $n$ are <code>a[0]</code>, <code>a[1]</code>, …, <code>a[n-1]</code>: the entry $a[i]$ of an instance written as $a = [\dots]$ in the text corresponds to <code>a[i-1]</code> in the code, and the indices printed by the programs start from $0$.

    - The main instructions are written in the block <code>if \_\_name\_\_ == "\_\_main\_\_":</code>; a list is printed with <code>print</code>, which displays it in square brackets.

    - The results that a function has to give back together are returned as a tuple (<code>return x, y</code>) and received with a multiple assignment (<code>x, y = f(a)</code>).

    - The format <code>:.4f</code> inside an f-string displays a floating-point number with exactly $4$ digits after the decimal point.

<a id="esercizio-7-1"></a>

!!! esercizio "Exercise 7.1: Introduction to {\tt Python} (E1)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of finding the maximum value in the array.

    **Questions**

    1. Write a complete <code>Python</code> program that finds the maximum value in a list $a$ of $n$ integer numbers. The program should:

        - define a function <code>array\_max\_value(a)</code> that implements the algorithm;

        - in the <code>\_\_main\_\_</code> block, create test lists and call the function;

        - print the results for each test case.

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the command that executes the program and its output for all test cases.

    3. Modify the function so that it returns both the maximum value and its index in the list. Execute the modified version on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Python</code> program:</strong>

        ```python
        def array_max_value(a):
            """Find and return the maximum value in list a."""
            max_val = a[0]  # Initialize with the first element

            for i in range(1, len(a)):
                if a[i] > max_val:
                    max_val = a[i]  # Update the maximum

            return max_val

        if __name__ == "__main__":
            # Test case 1
            arr1 = [9, 12, 3, 16, 19, 11, 12]
            print(f"Test 1 - List: {arr1}")
            print(f"Maximum value: {array_max_value(arr1)}")
            print()

            # Test case 2
            arr2 = [5, 2, 8, 1]
            print(f"Test 2 - List: {arr2}")
            print(f"Maximum value: {array_max_value(arr2)}")
            print()

            # Test case 3
            arr3 = [42]
            print(f"Test 3 - List: {arr3}")
            print(f"Maximum value: {array_max_value(arr3)}")
        ```

        For Instance 3 the loop <code>for i in range(1, 1)</code> performs no iteration, and the function returns the only element <code>a[0]</code>.

    2. <strong>Execution.</strong> If the program is saved in the file <code>max\_value.py</code>, it is executed with the command

        ```text
        python3 max_value.py
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - List: [9, 12, 3, 16, 19, 11, 12]
        Maximum value: 19

        Test 2 - List: [5, 2, 8, 1]
        Maximum value: 8

        Test 3 - List: [42]
        Maximum value: 42
        ```

    3. <strong>Modified function returning the maximum value and its index:</strong>

        ```python
        def array_max_value_with_index(a):
            """Return (max_value, index) of the maximum element in list a."""
            max_val = a[0]
            idx = 0

            for i in range(1, len(a)):
                if a[i] > max_val:
                    max_val = a[i]
                    idx = i  # Store the index

            return max_val, idx

        if __name__ == "__main__":
            arr1 = [9, 12, 3, 16, 19, 11, 12]
            max_val, idx = array_max_value_with_index(arr1)
            print(f"Maximum value: {max_val}, at index: {idx}")
        ```

        <strong>Output:</strong>

        ```text
        Maximum value: 19, at index: 4
        ```

        For Instance 1 the function returns the tuple $(19,\ 4)$: the maximum value $19$ is at index $4$ of the list (indices from $0$), that is, in position $5$ of the array $a[1..7]$ of the text. If the maximum value appears more than once, the function returns the index of its first occurrence, because <code>max\_val</code> and <code>idx</code> are updated only when <code>a[i] &gt; max\_val</code> (strict inequality).

<a id="esercizio-7-2"></a>

!!! esercizio "Exercise 7.2: Introduction to {\tt Python} (E2)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of finding its minimum value.

    **Questions**

    1. Write a complete <code>Python</code> program that finds the minimum value in a list $a$ of $n$ integer numbers. The program should:

        - define a function <code>array\_min\_value(a)</code> that implements the algorithm;

        - in the <code>\_\_main\_\_</code> block, create test lists and call the function;

        - print the results for each test case.

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the command that executes the program and its output for all test cases.

    3. Modify the function so that it returns both the minimum value and its index in the list. Execute the modified version on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Python</code> program:</strong>

        ```python
        def array_min_value(a):
            """Find and return the minimum value in list a."""
            min_val = a[0]  # Initialize with the first element

            for i in range(1, len(a)):
                if a[i] < min_val:
                    min_val = a[i]  # Update the minimum

            return min_val

        if __name__ == "__main__":
            # Test case 1
            arr1 = [9, 12, 3, 16, 19, 11, 12]
            print(f"Test 1 - List: {arr1}")
            print(f"Minimum value: {array_min_value(arr1)}")
            print()

            # Test case 2
            arr2 = [5, 2, 8, 1]
            print(f"Test 2 - List: {arr2}")
            print(f"Minimum value: {array_min_value(arr2)}")
            print()

            # Test case 3
            arr3 = [42]
            print(f"Test 3 - List: {arr3}")
            print(f"Minimum value: {array_min_value(arr3)}")
        ```

        For Instance 3 the loop <code>for i in range(1, 1)</code> performs no iteration, and the function returns the only element <code>a[0]</code>.

    2. <strong>Execution.</strong> If the program is saved in the file <code>min\_value.py</code>, it is executed with the command

        ```text
        python3 min_value.py
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - List: [9, 12, 3, 16, 19, 11, 12]
        Minimum value: 3

        Test 2 - List: [5, 2, 8, 1]
        Minimum value: 1

        Test 3 - List: [42]
        Minimum value: 42
        ```

    3. <strong>Modified function returning the minimum value and its index:</strong>

        ```python
        def array_min_value_with_index(a):
            """Return (min_value, index) of the minimum element in list a."""
            min_val = a[0]
            idx = 0

            for i in range(1, len(a)):
                if a[i] < min_val:
                    min_val = a[i]
                    idx = i  # Store the index

            return min_val, idx

        if __name__ == "__main__":
            arr1 = [9, 12, 3, 16, 19, 11, 12]
            min_val, idx = array_min_value_with_index(arr1)
            print(f"Minimum value: {min_val}, at index: {idx}")
        ```

        <strong>Output:</strong>

        ```text
        Minimum value: 3, at index: 2
        ```

        For Instance 1 the function returns the tuple $(3,\ 2)$: the minimum value $3$ is at index $2$ of the list (indices from $0$), that is, in position $3$ of the array $a[1..7]$ of the text. If the minimum value appears more than once, the function returns the index of its first occurrence, because <code>min\_val</code> and <code>idx</code> are updated only when <code>a[i] &lt; min\_val</code> (strict inequality).

<a id="esercizio-7-3"></a>

!!! esercizio "Exercise 7.3: Introduction to {\tt Python} (E3)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of computing the sum and average of all its elements.

    **Questions**

    1. Write a complete <code>Python</code> program that computes the sum and the average of the elements of a list $a$ of $n$ integer numbers. The program should:

        - define a function <code>array\_sum(a)</code> that returns the sum of all elements;

        - define a function <code>array\_average(a)</code> that returns the average of all elements;

        - in the <code>\_\_main\_\_</code> block, create test lists, call both functions, and print the results, with the average rounded to $4$ decimal digits.

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the command that executes the program and its output for all test cases.

    3. Combine the two functions into a single function <code>array\_sum\_and\_average(a)</code> that returns both the sum and the average as a tuple. Execute it on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Python</code> program:</strong>

        ```python
        def array_sum(a):
            """Compute and return the sum of all elements in list a."""
            total = 0
            for x in a:
                total += x
            return total

        def array_average(a):
            """Compute and return the average of all elements in list a."""
            return array_sum(a) / len(a)

        if __name__ == "__main__":
            # Test case 1
            arr1 = [9, 12, 3, 16, 19, 11, 12]
            print(f"Test 1 - List: {arr1}")
            print(f"Sum:     {array_sum(arr1)}")
            print(f"Average: {array_average(arr1):.4f}")
            print()

            # Test case 2
            arr2 = [5, 2, 8, 1]
            print(f"Test 2 - List: {arr2}")
            print(f"Sum:     {array_sum(arr2)}")
            print(f"Average: {array_average(arr2):.4f}")
            print()

            # Test case 3
            arr3 = [42]
            print(f"Test 3 - List: {arr3}")
            print(f"Sum:     {array_sum(arr3)}")
            print(f"Average: {array_average(arr3):.4f}")
        ```

        The loop <code>for x in a</code> visits the elements of the list directly. The operator <code>/</code> always returns a <code>float</code>, so no type conversion is needed (in <code>C++</code> the sum must be converted to <code>double</code> before the division). The function <code>array\_average</code> requires $n \ge 1$: for an empty list the division by <code>len(a)</code> $= 0$ stops the program with a <code>ZeroDivisionError</code>.

    2. <strong>Execution.</strong> If the program is saved in the file <code>array\_sum.py</code>, it is executed with the command

        ```text
        python3 array_sum.py
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - List: [9, 12, 3, 16, 19, 11, 12]
        Sum:     82
        Average: 11.7143

        Test 2 - List: [5, 2, 8, 1]
        Sum:     16
        Average: 4.0000

        Test 3 - List: [42]
        Sum:     42
        Average: 42.0000
        ```

        For Instance 1 the exact average is $82/7 = 11.714285\ldots$, displayed as $11.7143$.

    3. <strong>Combined function:</strong>

        ```python
        def array_sum_and_average(a):
            """Return (sum, average) of list a."""
            total = 0
            for x in a:
                total += x
            avg = total / len(a)
            return total, avg

        if __name__ == "__main__":
            arr1 = [9, 12, 3, 16, 19, 11, 12]
            s, avg = array_sum_and_average(arr1)
            print(f"Sum: {s}, Average: {avg:.4f}")
        ```

        <strong>Output:</strong>

        ```text
        Sum: 82, Average: 11.7143
        ```

        The combined function visits the list only once, while <code>array\_average</code> of the first program calls <code>array\_sum</code> and visits the list a second time.

<a id="esercizio-7-4"></a>

!!! esercizio "Exercise 7.4: Introduction to {\tt Python} (E4)"

    Given an array $a$ of $n$ integer numbers and a value $m$, we consider the problem of determining whether the value $m$ is present or not in the array.

    **Questions**

    1. Write a complete <code>Python</code> program that performs a <strong>linear search</strong> in a list $a$. The program should:

        - define a function <code>linear\_search(a, m)</code> that searches for the value <code>m</code> in the list <code>a</code>;

        - return the index of the first occurrence of <code>m</code> if it is found, or <code>-1</code> if it is not found;

        - in the <code>\_\_main\_\_</code> block, run the test cases and print the results.

    2. Execute the program on the list $a = [9, 12, 3, 16, 19, 11, 12]$ with the following values:

        - $m = 16$ (present in the list)

        - $m = 12$ (present twice: the index of the first occurrence is returned)

        - $m = 7$ (not present in the list)

        Show the command that executes the program and its output for all test cases.

    3. Modify the function so that it returns the <strong>list of all indices</strong> where the value $m$ appears (instead of only the first occurrence). Execute it with $m = 12$ and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Python</code> program:</strong>

        ```python
        def linear_search(a, m):
            """Search for the value m in list a.
            Return the index of the first occurrence, or -1 if not found."""
            for i in range(len(a)):
                if a[i] == m:
                    return i  # Found: return the index
            return -1         # Not found

        def print_result(a, m):
            """Search for m in a and print the result."""
            idx = linear_search(a, m)
            if idx != -1:
                print(f"Value {m} found at index {idx}")
            else:
                print(f"Value {m} not found")

        if __name__ == "__main__":
            a = [9, 12, 3, 16, 19, 11, 12]
            print(f"List: {a}")
            print()

            print_result(a, 16)
            print_result(a, 12)
            print_result(a, 7)
        ```

        The instruction <code>return i</code> terminates the function, and therefore the loop, at the first occurrence of <code>m</code>; the instruction <code>return -1</code> is reached only when the loop has visited the whole list without finding <code>m</code>. The value <code>-1</code> is used because it cannot be an index of the list. The auxiliary function <code>print\_result</code> avoids writing three times the same instructions.

    2. <strong>Execution.</strong> If the program is saved in the file <code>linear\_search.py</code>, it is executed with the command

        ```text
        python3 linear_search.py
        ```

        <strong>Output:</strong>

        ```text
        List: [9, 12, 3, 16, 19, 11, 12]

        Value 16 found at index 3
        Value 12 found at index 1
        Value 7 not found
        ```

        The value $12$ is at the indices $1$ and $6$, and the function returns the first one. In the array $a[1..7]$ of the text, the indices $3$ and $1$ correspond to the positions $4$ and $2$.

    3. <strong>Function returning all the occurrences:</strong>

        ```python
        def linear_search_all(a, m):
            """Return the list of all indices where the value m appears in a.
            Return an empty list if m is not found."""
            indices = []
            for i in range(len(a)):
                if a[i] == m:
                    indices.append(i)
            return indices

        if __name__ == "__main__":
            a = [9, 12, 3, 16, 19, 11, 12]

            m = 12
            result = linear_search_all(a, m)
            if result:  # A non-empty list is true, an empty list is false
                print(f"Value {m} found at indices: {result}")
            else:
                print(f"Value {m} not found")
        ```

        <strong>Output:</strong>

        ```text
        Value 12 found at indices: [1, 6]
        ```

        Unlike <code>linear\_search</code>, this function always visits the whole list, because it cannot stop at the first occurrence. The list <code>indices</code> starts empty and grows with <code>append</code>; when it is used as a condition, an empty list counts as <code>False</code>.

<a id="esercizio-7-5"></a>

!!! esercizio "Exercise 7.5: Introduction to {\tt Python} (E5)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of computing in a single pass the maximum, minimum, sum and average of all elements in the array.

    **Questions**

    1. Write a complete <code>Python</code> program that computes in a <strong>single pass</strong> the four statistics (maximum, minimum, sum, average) of a list $a$ of $n$ integer numbers. The program should:

        - define a function <code>array\_stats(a)</code> that computes the four values with a single loop;

        - return the four values as a tuple <code>(max\_val, min\_val, total, avg)</code>;

        - in the <code>\_\_main\_\_</code> block, run the test cases and print the results.

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the command that executes the program and its output for all test cases.

    3. Modify the function so that it also returns the indices of the maximum and of the minimum element. Execute it on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Python</code> program:</strong>

        ```python
        def array_stats(a):
            """Compute max, min, sum, and average in a single pass.
            Return (max_val, min_val, total, avg)."""
            max_val = a[0]
            min_val = a[0]
            total = a[0]

            for i in range(1, len(a)):
                if a[i] > max_val:
                    max_val = a[i]
                if a[i] < min_val:
                    min_val = a[i]
                total += a[i]

            avg = total / len(a)
            return max_val, min_val, total, avg

        def print_stats(k, a):
            """Print the statistics of the test case k."""
            max_v, min_v, s, avg = array_stats(a)
            print(f"Test {k} - List: {a}")
            print(f"  Maximum: {max_v}")
            print(f"  Minimum: {min_v}")
            print(f"  Sum:     {s}")
            print(f"  Average: {avg:.4f}")

        if __name__ == "__main__":
            print_stats(1, [9, 12, 3, 16, 19, 11, 12])
            print()
            print_stats(2, [5, 2, 8, 1])
            print()
            print_stats(3, [42])
        ```

        The three variables are initialized with the first element, and the loop visits the other $n-1$ elements once: at each iteration the current element is compared with the maximum and with the minimum, and it is added to the sum.

    2. <strong>Execution.</strong> If the program is saved in the file <code>array\_stats.py</code>, it is executed with the command

        ```text
        python3 array_stats.py
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - List: [9, 12, 3, 16, 19, 11, 12]
          Maximum: 19
          Minimum: 3
          Sum:     82
          Average: 11.7143

        Test 2 - List: [5, 2, 8, 1]
          Maximum: 8
          Minimum: 1
          Sum:     16
          Average: 4.0000

        Test 3 - List: [42]
          Maximum: 42
          Minimum: 42
          Sum:     42
          Average: 42.0000
        ```

    3. <strong>Extended function also returning the indices:</strong>

        ```python
        def array_stats_with_indices(a):
            """Compute all the statistics, including the positions.
            Return (max_val, max_idx, min_val, min_idx, total, avg)."""
            max_val = a[0]
            max_idx = 0
            min_val = a[0]
            min_idx = 0
            total = a[0]

            for i in range(1, len(a)):
                if a[i] > max_val:
                    max_val = a[i]
                    max_idx = i
                if a[i] < min_val:
                    min_val = a[i]
                    min_idx = i
                total += a[i]

            avg = total / len(a)
            return max_val, max_idx, min_val, min_idx, total, avg

        if __name__ == "__main__":
            a = [9, 12, 3, 16, 19, 11, 12]
            max_v, max_i, min_v, min_i, s, avg = array_stats_with_indices(a)
            print(f"List:    {a}")
            print(f"Max:     {max_v} at index {max_i}")
            print(f"Min:     {min_v} at index {min_i}")
            print(f"Sum:     {s}")
            print(f"Average: {avg:.4f}")
        ```

        <strong>Output:</strong>

        ```text
        List:    [9, 12, 3, 16, 19, 11, 12]
        Max:     19 at index 4
        Min:     3 at index 2
        Sum:     82
        Average: 11.7143
        ```

        The maximum $19$ is at index $4$ and the minimum $3$ at index $2$ (indices from $0$), that is, in the positions $5$ and $3$ of the array $a[1..7]$ of the text.
