---
title: "Exercises · Introduction to C++"
---

# Exercises · Introduction to C++

<div class="info-capitolo" markdown>

**Exercises · Chapter 6** · each solution opens with a click · [:material-book-open-variant: Chapter 6: Introduction to C++](../languages/06-introduction-to-cpp.md) · [:material-file-pdf-box: Exercises, volume 2 (PDF)](../pdf/exercises-2-programming-languages.pdf)

</div>

In the exercises of this chapter the programs are written, compiled and executed with the conventions of the chapter «Introduction to <code>C++</code>», summarized below.

??? codice "Code"

    - The program of an exercise is saved in a file <code>&lt;name&gt;.cpp</code>, compiled and executed with the commands

        ```bash
        g++ -Wall -std=c++17 -o <name> <name>.cpp
        ./<name>
        ```

    - The test instances are fixed-size arrays declared in <code>main</code>, for example <code>int arr1[] = {9, 12, 3, 16, 19, 11, 12};</code>, and are passed to the functions through the pointer to their first element (<code>int \*a</code>) together with their size <code>n</code>.

    - The elements of an array of size $n$ are <code>a[0]</code>, <code>a[1]</code>, …, <code>a[n-1]</code>: the entry $a[i]$ of an instance written as $a = [\dots]$ in the text corresponds to <code>a[i-1]</code> in the code.

    - The results that a function has to give back besides its return value are passed by reference (<code>int&amp; x</code>, <code>double&amp; x</code>).

    - When an array is printed, every value is followed by a space, so the printed lines end with a space.

<a id="esercizio-6-1"></a>

!!! esercizio "Exercise 6.1: Introduction to {\tt C++} (E1)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of finding the maximum value in the array.

    **Questions**

    1. Write a complete <code>C++</code> program that finds the maximum value in an array $a$ of $n$ integer numbers. The program should:

        - Define a function <code>int ArrayMaxValue(int n, int \*a)</code> that implements the algorithm

        - In the <code>main()</code> function, create test arrays and call the function

        - Print the results for each test case

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the complete compilation commands and output for all test cases.

    3. Modify the program to create a new function <code>int ArrayMaxValueWithIndex(int n, int \*a, int&amp; idx)</code> that returns both the maximum value and stores its index in the reference parameter <code>idx</code>. Execute this modified version and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>C++</code> program:</strong>

        ```cpp
        #include <iostream>
        using namespace std;

        // Function to find maximum value in array
        int ArrayMaxValue(int n, int *a) 
        {
            int max = a[0];  // Initialize with first element

            for (int i = 1; i < n; i++) 
            {
                if (a[i] > max) 
                {
                    max = a[i];  // Update maximum
                }
            }

            return max;
        }

        int main() 
        {
            // Test case 1
            int arr1[] = {9, 12, 3, 16, 19, 11, 12};
            int n1 = 7;

            cout << "Test 1 - Array: ";
            for (int i = 0; i < n1; i++) 
            {
                cout << arr1[i] << " ";
            }
            cout << endl;

            int max1 = ArrayMaxValue(n1, arr1);
            cout << "Maximum value: " << max1 << endl;
            cout << endl;

            // Test case 2
            int arr2[] = {5, 2, 8, 1};
            int n2 = 4;

            cout << "Test 2 - Array: ";
            for (int i = 0; i < n2; i++) 
            {
                cout << arr2[i] << " ";
            }
            cout << endl;

            int max2 = ArrayMaxValue(n2, arr2);
            cout << "Maximum value: " << max2 << endl;
            cout << endl;

            // Test case 3
            int arr3[] = {42};
            int n3 = 1;

            cout << "Test 3 - Array: ";
            for (int i = 0; i < n3; i++) 
            {
                cout << arr3[i] << " ";
            }
            cout << endl;

            int max3 = ArrayMaxValue(n3, arr3);
            cout << "Maximum value: " << max3 << endl;

            return 0;
        }
        ```

    2. <strong>Compilation and execution:</strong>

        To compile the program:

        ```bash
        g++ -Wall -std=c++17 -o max_value max_value.cpp
        ```

        To run the program:

        ```bash
        ./max_value
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - Array: 9 12 3 16 19 11 12 
        Maximum value: 19

        Test 2 - Array: 5 2 8 1 
        Maximum value: 8

        Test 3 - Array: 42 
        Maximum value: 42
        ```

    3. <strong>Modified program with index:</strong>

        ```cpp
        #include <iostream>
        using namespace std;

        // Function to find maximum value and its index
        int ArrayMaxValueWithIndex(int n, int *a, int& idx) 
        {
            int max = a[0];
            idx = 0;

            for (int i = 1; i < n; i++) 
            {
                if (a[i] > max) 
                {
                    max = a[i];
                    idx = i;  // Store the index
                }
            }

            return max;
        }

        int main() 
        {
            int arr[] = {9, 12, 3, 16, 19, 11, 12};
            int n = 7;
            int index;

            cout << "Array: ";
            for (int i = 0; i < n; i++) 
            {
                cout << arr[i] << " ";
            }
            cout << endl;

            int max = ArrayMaxValueWithIndex(n, arr, index);

            cout << "Maximum value: " << max << endl;
            cout << "Position (index): " << index << endl;

            return 0;
        }
        ```

        <strong>Output:</strong>

        ```text
        Array: 9 12 3 16 19 11 12 
        Maximum value: 19
        Position (index): 4
        ```

        Note: The maximum value 19 is found at index 4 (the 5th element, since arrays are indexed from $0$ in <code>C++</code>). If the maximum value appears more than once, the function stores the index of its first occurrence, because <code>max</code> and <code>idx</code> are updated only when <code>a[i] &gt; max</code> (strict inequality).

<a id="esercizio-6-2"></a>

!!! esercizio "Exercise 6.2: Introduction to {\tt C++} (E2)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of finding its minimum value.

    **Questions**

    1. Write a complete <code>C++</code> program that finds the minimum value in an array $a$ of $n$ integer numbers. The program should:

        - Define a function <code>int ArrayMinValue(int n, int \*a)</code> that implements the algorithm

        - In the <code>main()</code> function, create test arrays and call the function

        - Print the results for each test case

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [15, 7, 22, 4]$ with $n=4$

        - Instance 3: $a = [100]$ with $n=1$

        Show the complete compilation commands and output for all test cases.

    3. Modify the program to create a new function <code>void ArrayMaxMin(int n, int \*a, int&amp; max, int&amp; min)</code> that finds both the maximum and minimum values in a single pass through the array. Execute this modified version and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>C++</code> program:</strong>

        ```cpp
        #include <iostream>
        using namespace std;

        // Function to find minimum value in array
        int ArrayMinValue(int n, int *a) 
        {
            int m = a[0];  // Initialize with first element

            for (int i = 1; i < n; i++) 
            {
                if (a[i] < m) 
                {
                    m = a[i];  // Update minimum
                }
            }

            return m;
        }

        int main() 
        {
            // Test case 1
            int arr1[] = {9, 12, 3, 16, 19, 11, 12};
            int n1 = 7;

            cout << "Test 1 - Array: ";
            for (int i = 0; i < n1; i++) 
            {
                cout << arr1[i] << " ";
            }
            cout << endl;

            int min1 = ArrayMinValue(n1, arr1);
            cout << "Minimum value: " << min1 << endl;
            cout << endl;

            // Test case 2
            int arr2[] = {15, 7, 22, 4};
            int n2 = 4;

            cout << "Test 2 - Array: ";
            for (int i = 0; i < n2; i++) 
            {
                cout << arr2[i] << " ";
            }
            cout << endl;

            int min2 = ArrayMinValue(n2, arr2);
            cout << "Minimum value: " << min2 << endl;
            cout << endl;

            // Test case 3
            int arr3[] = {100};
            int n3 = 1;

            cout << "Test 3 - Array: ";
            for (int i = 0; i < n3; i++) 
            {
                cout << arr3[i] << " ";
            }
            cout << endl;

            int min3 = ArrayMinValue(n3, arr3);
            cout << "Minimum value: " << min3 << endl;

            return 0;
        }
        ```

    2. <strong>Compilation and execution:</strong>

        To compile the program:

        ```bash
        g++ -Wall -std=c++17 -o min_value min_value.cpp
        ```

        To run the program:

        ```bash
        ./min_value
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - Array: 9 12 3 16 19 11 12 
        Minimum value: 3

        Test 2 - Array: 15 7 22 4 
        Minimum value: 4

        Test 3 - Array: 100 
        Minimum value: 100
        ```

    3. <strong>Modified program to find both max and min:</strong>

        ```cpp
        #include <iostream>
        using namespace std;

        // Function to find both maximum and minimum values
        void ArrayMaxMin(int n, int *a, int& max, int& min) 
        {
            max = a[0];
            min = a[0];

            for (int i = 1; i < n; i++) 
            {
                if (a[i] > max) 
                {
                    max = a[i];
                }
                if (a[i] < min) 
                {
                    min = a[i];
                }
            }
        }

        int main() 
        {
            int arr[] = {9, 12, 3, 16, 19, 11, 12};
            int n = 7;
            int maximum, minimum;

            cout << "Array: ";
            for (int i = 0; i < n; i++) 
            {
                cout << arr[i] << " ";
            }
            cout << endl;

            ArrayMaxMin(n, arr, maximum, minimum);

            cout << "Maximum value: " << maximum << endl;
            cout << "Minimum value: " << minimum << endl;

            return 0;
        }
        ```

        <strong>Output:</strong>

        ```text
        Array: 9 12 3 16 19 11 12 
        Maximum value: 19
        Minimum value: 3
        ```

        Note: This implementation finds both the maximum and the minimum value in a single pass through the array. The number of comparisons is the same as with two separate functions, $2(n-1)$, but the array is traversed once instead of twice.

<a id="esercizio-6-3"></a>

!!! esercizio "Exercise 6.3: Introduction to {\tt C++} (E3)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of computing the sum and average of all its elements.

    **Questions**

    1. Write a complete <code>C++</code> program that computes the sum and average of elements in an array $a$ of $n$ integer numbers. The program should:

        - Define a function <code>int ArraySum(int n, int \*a)</code> that computes the sum of array elements

        - In the <code>main()</code> function, create test arrays and call the function

        - Compute and print both the sum and average for each test case

    2. Execute the program on the following instances:

        - Instance 1: $a = [5, 12, 3, 8]$ with $n=4$

        - Instance 2: $a = [10, 20, 30]$ with $n=3$

        - Instance 3: $a = [7]$ with $n=1$

        Show the complete compilation commands and output for all test cases.

    3. Modify the program to create a new function <code>void ArraySumAndAverage(int n, int \*a, int&amp; sum, double&amp; avg)</code> that computes both the sum and average in one function. Execute this modified version and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>C++</code> program:</strong>

        ```cpp
        #include <iostream>
        #include <iomanip>
        using namespace std;

        // Function to compute sum of array elements
        int ArraySum(int n, int *a) 
        {
            int S = 0;

            for (int i = 0; i < n; i++) 
            {
                S = S + a[i];
            }

            return S;
        }

        int main() 
        {
            // Test case 1
            int arr1[] = {5, 12, 3, 8};
            int n1 = 4;

            cout << "Test 1 - Array: ";
            for (int i = 0; i < n1; i++) 
            {
                cout << arr1[i] << " ";
            }
            cout << endl;

            int sum1 = ArraySum(n1, arr1);
            double avg1 = (double)sum1 / n1;
            cout << "Sum: " << sum1 << endl;
            cout << "Average: " << fixed << setprecision(2) 
                 << avg1 << endl;
            cout << endl;

            // Test case 2
            int arr2[] = {10, 20, 30};
            int n2 = 3;

            cout << "Test 2 - Array: ";
            for (int i = 0; i < n2; i++) 
            {
                cout << arr2[i] << " ";
            }
            cout << endl;

            int sum2 = ArraySum(n2, arr2);
            double avg2 = (double)sum2 / n2;
            cout << "Sum: " << sum2 << endl;
            cout << "Average: " << fixed << setprecision(2) 
                 << avg2 << endl;
            cout << endl;

            // Test case 3
            int arr3[] = {7};
            int n3 = 1;

            cout << "Test 3 - Array: ";
            for (int i = 0; i < n3; i++) 
            {
                cout << arr3[i] << " ";
            }
            cout << endl;

            int sum3 = ArraySum(n3, arr3);
            double avg3 = (double)sum3 / n3;
            cout << "Sum: " << sum3 << endl;
            cout << "Average: " << fixed << setprecision(2) 
                 << avg3 << endl;

            return 0;
        }
        ```

    2. <strong>Compilation and execution:</strong>

        To compile the program:

        ```bash
        g++ -Wall -std=c++17 -o array_sum array_sum.cpp
        ```

        To run the program:

        ```bash
        ./array_sum
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - Array: 5 12 3 8 
        Sum: 28
        Average: 7.00

        Test 2 - Array: 10 20 30 
        Sum: 60
        Average: 20.00

        Test 3 - Array: 7 
        Sum: 7
        Average: 7.00
        ```

    3. <strong>Modified program with combined function:</strong>

        ```cpp
        #include <iostream>
        #include <iomanip>
        using namespace std;

        // Function to compute both sum and average
        void ArraySumAndAverage(int n, int *a, int& sum, double& avg) 
        {
            sum = 0;

            for (int i = 0; i < n; i++) 
            {
                sum = sum + a[i];
            }

            avg = (double)sum / n;
        }

        int main() 
        {
            int arr[] = {5, 12, 3, 8};
            int n = 4;
            int sum;
            double average;

            cout << "Array: ";
            for (int i = 0; i < n; i++) 
            {
                cout << arr[i] << " ";
            }
            cout << endl;

            ArraySumAndAverage(n, arr, sum, average);

            cout << "Sum: " << sum << endl;
            cout << "Average: " << fixed << setprecision(2) 
                 << average << endl;

            return 0;
        }
        ```

        <strong>Output:</strong>

        ```text
        Array: 5 12 3 8 
        Sum: 28
        Average: 7.00
        ```

        Note: The <code>setprecision(2)</code> manipulator is used to format the average with 2 decimal places. The conversion <code>(double)</code> ensures the floating-point division: without it, <code>sum / n</code> would be the integer division. Since the average divides by $n$, the functions require $n \ge 1$.

<a id="esercizio-6-4"></a>

!!! esercizio "Exercise 6.4: Introduction to {\tt C++} (E4)"

    Given an array $a$ of $n$ integer numbers and a value $m$, we consider the problem of determining whether the value $m$ is present or not in the array.

    **Questions**

    1. Write a complete <code>C++</code> program that implements the linear search algorithm for an array $a$ of $n$ integer numbers. The program should:

        - Define a function <code>int LinearSearch(int n, int \*a, int m)</code> that searches for value <code>m</code> in array <code>a</code>

        - Return the index of the element if found, or <code>-1</code> if not found

        - In the <code>main()</code> function, create a test array and search for different values

        - Print the results for each search

    2. Execute the program with the following instance:

        - Array: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Search for: $m=16$ (element present)

        - Search for: $m=25$ (element not present)

        - Search for: $m=9$ (first element)

        - Search for: $m=12$ (duplicate element)

        Show the complete compilation commands and output for all test cases.

    3. Modify the program to create a function <code>int CountOccurrences(int n, int \*a, int m)</code> that counts how many times value <code>m</code> appears in the array. Execute this modified version with value $m=12$ in the test array and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>C++</code> program:</strong>

        ```cpp
        #include <iostream>
        using namespace std;

        // Function to perform linear search
        int LinearSearch(int n, int *a, int m) 
        {
            for (int i = 0; i < n; i++) 
            {
                if (a[i] == m) 
                {
                    return i;  // Found, return index
                }
            }

            return -1;  // Not found
        }

        int main() 
        {
            int arr[] = {9, 12, 3, 16, 19, 11, 12};
            int n = 7;

            cout << "Array: ";
            for (int i = 0; i < n; i++) 
            {
                cout << arr[i] << " ";
            }
            cout << endl << endl;

            // Test 1: Search for 16 (present)
            int m1 = 16;
            int result1 = LinearSearch(n, arr, m1);
            cout << "Search for " << m1 << ": ";
            if (result1 != -1) 
            {
                cout << "Found at index " << result1 << endl;
            } 
            else 
            {
                cout << "Not found" << endl;
            }

            // Test 2: Search for 25 (not present)
            int m2 = 25;
            int result2 = LinearSearch(n, arr, m2);
            cout << "Search for " << m2 << ": ";
            if (result2 != -1) 
            {
                cout << "Found at index " << result2 << endl;
            } 
            else 
            {
                cout << "Not found" << endl;
            }

            // Test 3: Search for 9 (first element)
            int m3 = 9;
            int result3 = LinearSearch(n, arr, m3);
            cout << "Search for " << m3 << ": ";
            if (result3 != -1) 
            {
                cout << "Found at index " << result3 << endl;
            } 
            else 
            {
                cout << "Not found" << endl;
            }

            // Test 4: Search for 12 (duplicate)
            int m4 = 12;
            int result4 = LinearSearch(n, arr, m4);
            cout << "Search for " << m4 << ": ";
            if (result4 != -1) 
            {
                cout << "Found at index " << result4 
                     << " (first occurrence)" << endl;
            } 
            else 
            {
                cout << "Not found" << endl;
            }

            return 0;
        }
        ```

    2. <strong>Compilation and execution:</strong>

        To compile the program:

        ```bash
        g++ -Wall -std=c++17 -o linear_search linear_search.cpp
        ```

        To run the program:

        ```bash
        ./linear_search
        ```

        <strong>Output:</strong>

        ```text
        Array: 9 12 3 16 19 11 12 

        Search for 16: Found at index 3
        Search for 25: Not found
        Search for 9: Found at index 0
        Search for 12: Found at index 1 (first occurrence)
        ```

    3. <strong>Modified program to count occurrences:</strong>

        ```cpp
        #include <iostream>
        using namespace std;

        // Function to count occurrences of value m
        int CountOccurrences(int n, int *a, int m) 
        {
            int count = 0;

            for (int i = 0; i < n; i++) 
            {
                if (a[i] == m) 
                {
                    count++;
                }
            }

            return count;
        }

        int main() 
        {
            int arr[] = {9, 12, 3, 16, 19, 11, 12};
            int n = 7;

            cout << "Array: ";
            for (int i = 0; i < n; i++) 
            {
                cout << arr[i] << " ";
            }
            cout << endl;

            int x = 12;
            int count = CountOccurrences(n, arr, x);

            cout << "Value " << x << " appears " << count 
                 << " times in the array" << endl;

            return 0;
        }
        ```

        <strong>Output:</strong>

        ```text
        Array: 9 12 3 16 19 11 12 
        Value 12 appears 2 times in the array
        ```

        Note: The <code>LinearSearch</code> function returns the index of the first occurrence when duplicates exist. The <code>CountOccurrences</code> function scans the entire array to count all occurrences.

<a id="esercizio-6-5"></a>

!!! esercizio "Exercise 6.5: Introduction to {\tt C++} (E5)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of computing in a single pass the maximum, minimum, sum and average of all elements in the array.

    **Questions**

    1. Write a complete <code>C++</code> program that computes all statistics for an array $a$ of $n$ integer numbers in a single pass. The program should:

        - Define a function <code>void ArrayStatistics(int n, int \*a, int&amp; max, int&amp; min, int&amp; sum, double&amp; avg)</code> that computes all four statistics

        - In the <code>main()</code> function, create test arrays and call the function

        - Print all statistics for each test case

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        Show the complete compilation commands and output for all test cases.

    3. Discuss the advantages of computing all statistics in a single pass versus computing them separately with multiple functions.

??? soluzione "Solution"

    1. <strong>Complete <code>C++</code> program:</strong>

        ```cpp
        #include <iostream>
        #include <iomanip>
        using namespace std;

        // Function to compute all statistics in a single pass
        void ArrayStatistics(int n, int *a, int& max, int& min, 
                             int& sum, double& avg) 
        {
            // Initialize with first element
            max = a[0];
            min = a[0];
            sum = a[0];

            // Process remaining elements
            for (int i = 1; i < n; i++) 
            {
                if (a[i] > max) 
                {
                    max = a[i];
                }
                if (a[i] < min) 
                {
                    min = a[i];
                }
                sum = sum + a[i];
            }

            // Compute average
            avg = (double)sum / n;
        }

        int main() 
        {
            // Test case 1
            int arr1[] = {9, 12, 3, 16, 19, 11, 12};
            int n1 = 7;
            int max1, min1, sum1;
            double avg1;

            cout << "Test 1 - Array: ";
            for (int i = 0; i < n1; i++) 
            {
                cout << arr1[i] << " ";
            }
            cout << endl;

            ArrayStatistics(n1, arr1, max1, min1, sum1, avg1);

            cout << "Maximum: " << max1 << endl;
            cout << "Minimum: " << min1 << endl;
            cout << "Sum: " << sum1 << endl;
            cout << "Average: " << fixed << setprecision(2) 
                 << avg1 << endl;
            cout << endl;

            // Test case 2
            int arr2[] = {5, 2, 8, 1};
            int n2 = 4;
            int max2, min2, sum2;
            double avg2;

            cout << "Test 2 - Array: ";
            for (int i = 0; i < n2; i++) 
            {
                cout << arr2[i] << " ";
            }
            cout << endl;

            ArrayStatistics(n2, arr2, max2, min2, sum2, avg2);

            cout << "Maximum: " << max2 << endl;
            cout << "Minimum: " << min2 << endl;
            cout << "Sum: " << sum2 << endl;
            cout << "Average: " << fixed << setprecision(2) 
                 << avg2 << endl;

            return 0;
        }
        ```

    2. <strong>Compilation and execution:</strong>

        To compile the program:

        ```bash
        g++ -Wall -std=c++17 -o array_stats array_stats.cpp
        ```

        To run the program:

        ```bash
        ./array_stats
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - Array: 9 12 3 16 19 11 12 
        Maximum: 19
        Minimum: 3
        Sum: 82
        Average: 11.71

        Test 2 - Array: 5 2 8 1 
        Maximum: 8
        Minimum: 1
        Sum: 16
        Average: 4.00
        ```

    3. <strong>Advantages of single-pass approach:</strong>

        <strong>Advantages:</strong>

        - <strong>Fewer array traversals:</strong> The array is traversed only once instead of once for each statistic

        - <strong>More compact code:</strong> Single function and single loop instead of multiple function calls

        - <strong>Better for streaming data:</strong> Can process data that arrives sequentially or doesn't fit entirely in memory

        - <strong>Reduced overhead:</strong> Only one loop initialization and termination instead of multiple loops

        <strong>Trade-offs:</strong>

        - <strong>Less modular:</strong> Combines multiple operations in one function, which may be harder to maintain

        - <strong>Less flexible:</strong> If only one statistic is needed, the function still computes all of them

        - <strong>Code reusability:</strong> Cannot easily reuse individual statistic computations in other contexts

        <strong>Recommendation:</strong> The single-pass approach is preferable when:

        - All statistics are needed together

        - Working with large arrays where minimizing array accesses is important

        - Processing streaming data or data that cannot fit in memory

        Separate functions are better when:

        - Only specific statistics are needed

        - Code clarity and modularity are higher priorities

        - Individual functions may be reused in different contexts

<a id="esercizio-6-6"></a>

!!! esercizio "Exercise 6.6: Introduction to {\tt C++} (E6)"

    Given a two-dimensional array $a$ of $m \times n$ integer numbers, we consider the problem of computing the sum of all its elements.

    **Questions**

    1. Write a complete <code>C++</code> program that computes the sum of all elements of a two-dimensional array $a$ of $m \times n$ integers. The program should:

        - Define a function <code>int SumMatrix(int m, int n, int \*\*matrix)</code> that computes the sum

        - In the <code>main()</code> function, allocate test matrices using dynamic memory, initialize them, call the function, and print the results

        - Free all allocated memory after use

    2. Execute the program on the following instances:

        - Instance 1: a $3 \times 4$ matrix with sequential values $a[i][j] = (i-1)\cdot n + j$ for $i \in \{1, 2, 3\}$ and $j \in \{1, 2, 3, 4\}$ (rows and columns numbered from $1$, as in pseudo-code), i.e.,

            $$
            \begin{bmatrix}1&2&3&4\\5&6&7&8\\9&10&11&12\end{bmatrix}
            $$

        - Instance 2: a $2 \times 3$ matrix with values $\begin{bmatrix} 3 & 1 & 4 \\ 1 & 5 & 9 \end{bmatrix}$

        Show the complete compilation commands and output for both test cases.

    3. Modify the program to add a function <code>void RowSums(int m, int n, int \*\*matrix, int \*rowSums)</code> that computes the sum of each row and stores the results in the array <code>rowSums</code>. Execute this modified version on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>C++</code> program:</strong>

        ```cpp
        #include <iostream>
        using namespace std;

        // Function to compute the sum of all elements in a matrix
        int SumMatrix(int m, int n, int **matrix) 
        {
            int sum = 0;
            for (int i = 0; i < m; i++) 
            {
                for (int j = 0; j < n; j++) 
                {
                    sum += matrix[i][j];
                }
            }
            return sum;
        }

        int main() 
        {
            // Test case 1: 3x4 matrix with sequential values
            int m1 = 3, n1 = 4;

            int** mat1 = new int*[m1];
            for (int i = 0; i < m1; i++) 
            {
                mat1[i] = new int[n1];
            }

            int val = 1;
            for (int i = 0; i < m1; i++) 
            {
                for (int j = 0; j < n1; j++) 
                {
                    mat1[i][j] = val++;
                }
            }

            cout << "Test 1 - Matrix " << m1 << "x" << n1 << ":" << endl;
            for (int i = 0; i < m1; i++) 
            {
                for (int j = 0; j < n1; j++) 
                {
                    cout << mat1[i][j] << " ";
                }
                cout << endl;
            }
            cout << "Sum: " << SumMatrix(m1, n1, mat1) << endl << endl;

            for (int i = 0; i < m1; i++) 
            {
                delete[] mat1[i];
            }
            delete[] mat1;

            // Test case 2: 2x3 matrix
            int m2 = 2, n2 = 3;
            int data[2][3] = {{3, 1, 4}, {1, 5, 9}};

            int** mat2 = new int*[m2];
            for (int i = 0; i < m2; i++) 
            {
                mat2[i] = new int[n2];
                for (int j = 0; j < n2; j++) 
                {
                    mat2[i][j] = data[i][j];
                }
            }

            cout << "Test 2 - Matrix " << m2 << "x" << n2 << ":" << endl;
            for (int i = 0; i < m2; i++) 
            {
                for (int j = 0; j < n2; j++) 
                {
                    cout << mat2[i][j] << " ";
                }
                cout << endl;
            }
            cout << "Sum: " << SumMatrix(m2, n2, mat2) << endl;

            for (int i = 0; i < m2; i++) 
            {
                delete[] mat2[i];
            }
            delete[] mat2;

            return 0;
        }
        ```

    2. <strong>Compilation and execution:</strong>

        To compile the program:

        ```bash
        g++ -Wall -std=c++17 -o sum_matrix sum_matrix.cpp
        ```

        To run the program:

        ```bash
        ./sum_matrix
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - Matrix 3x4:
        1 2 3 4 
        5 6 7 8 
        9 10 11 12 
        Sum: 78

        Test 2 - Matrix 2x3:
        3 1 4 
        1 5 9 
        Sum: 23
        ```

    3. <strong>Row sums function:</strong>

        ```cpp
        #include <iostream>
        using namespace std;

        // Function to compute the sum of all elements in a matrix
        int SumMatrix(int m, int n, int **matrix) 
        {
            int sum = 0;
            for (int i = 0; i < m; i++) 
            {
                for (int j = 0; j < n; j++) 
                {
                    sum += matrix[i][j];
                }
            }
            return sum;
        }

        // Function to compute the sum of each row
        void RowSums(int m, int n, int **matrix, int *rowSums) 
        {
            for (int i = 0; i < m; i++) 
            {
                rowSums[i] = 0;
                for (int j = 0; j < n; j++) 
                {
                    rowSums[i] += matrix[i][j];
                }
            }
        }

        int main() 
        {
            // Test case 1: 3x4 matrix with sequential values
            int m1 = 3, n1 = 4;

            int** mat1 = new int*[m1];
            for (int i = 0; i < m1; i++) 
            {
                mat1[i] = new int[n1];
            }

            int val = 1;
            for (int i = 0; i < m1; i++) 
            {
                for (int j = 0; j < n1; j++) 
                {
                    mat1[i][j] = val++;
                }
            }

            cout << "Matrix " << m1 << "x" << n1 << ":" << endl;
            for (int i = 0; i < m1; i++) 
            {
                for (int j = 0; j < n1; j++) 
                {
                    cout << mat1[i][j] << " ";
                }
                cout << endl;
            }
            cout << "Total sum: " << SumMatrix(m1, n1, mat1) << endl << endl;

            int* rowSums = new int[m1];
            RowSums(m1, n1, mat1, rowSums);

            cout << "Row sums:" << endl;
            for (int i = 0; i < m1; i++) 
            {
                cout << "Row " << (i + 1) << ": " << rowSums[i] << endl;
            }

            delete[] rowSums;
            for (int i = 0; i < m1; i++) 
            {
                delete[] mat1[i];
            }
            delete[] mat1;

            return 0;
        }
        ```

        <strong>Output:</strong>

        ```text
        Matrix 3x4:
        1 2 3 4 
        5 6 7 8 
        9 10 11 12 
        Total sum: 78

        Row sums:
        Row 1: 10
        Row 2: 26
        Row 3: 42
        ```
