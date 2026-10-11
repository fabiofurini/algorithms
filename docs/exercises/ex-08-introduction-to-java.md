---
title: "Exercises · Introduction to Java"
---

# Exercises · Introduction to Java

<div class="info-capitolo" markdown>

**Exercises · Chapter 8** · each solution opens with a click · [:material-book-open-variant: Chapter 8](../languages/08-introduction-to-java.md) · [:material-file-pdf-box: Exercises, volume 2 (PDF)](../pdf/exercises-2-programming-languages.pdf)

</div>

In the exercises of this chapter the programs are written, compiled and executed with the conventions of the chapter «Introduction to <code>Java</code>», summarized below.

??? codice "Code"

    - The program of an exercise is a class <code>Main</code>, saved in the file <code>Main.java</code> (each exercise in its own folder), compiled and executed with the commands

        ```text
        javac Main.java
        java Main
        ```

    - The methods are <code>static</code> methods of the class <code>Main</code>. The test instances are arrays written in the code, for example <code>int[] arr1 = {9, 12, 3, 16, 19, 11, 12};</code>, and are passed to the methods without their size: a method obtains the size $n$ of an array <code>a</code> with <code>a.length</code>.

    - The elements of an array of size $n$ are <code>a[0]</code>, <code>a[1]</code>, …, <code>a[n-1]</code>: the entry $a[i]$ of an instance written as $a = [\dots]$ in the text corresponds to <code>a[i-1]</code> in the code, and the indices printed by the programs start from $0$.

    - A method returns at most one value: the results that a method has to give back together are returned in an array (<code>int[]</code> or <code>double[]</code>).

    - When an array is printed with a loop, every value is followed by a space, so the printed lines end with a space.

    - The format <code>%.4f</code> of <code>printf</code> displays a floating-point number with exactly $4$ digits after the decimal point. The outputs are the ones of a computer with English language settings: with Italian settings <code>printf</code> writes the decimal comma (<code>11,7143</code>).

<a id="esercizio-8-1"></a>

!!! esercizio "Exercise 8.1: Introduction to {\tt Java} (E1)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of finding the maximum value in the array.

    **Questions**

    1. Write a complete <code>Java</code> program that finds the maximum value in an array $a$ of $n$ integer numbers. The program should:

        - define a static method <code>int arrayMaxValue(int[] a)</code> inside the class <code>Main</code>;

        - in the <code>main</code> method, create test arrays and call the method;

        - print the results for each test case.

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the compilation and execution commands and the output for all test cases.

    3. Modify the method so that it returns both the maximum value and its index. Since a <code>Java</code> method returns only one value, return an array <code>int[]</code> of two elements: <code>{maxValue, maxIndex}</code>. Execute the modified version on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Java</code> program:</strong>

        ```java
        public class Main {

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
                int[] arr1 = {9, 12, 3, 16, 19, 11, 12};
                System.out.print("Test 1 - Array: ");
                for (int x : arr1) System.out.print(x + " ");
                System.out.println();
                System.out.println("Maximum value: " + arrayMaxValue(arr1));
                System.out.println();

                int[] arr2 = {5, 2, 8, 1};
                System.out.print("Test 2 - Array: ");
                for (int x : arr2) System.out.print(x + " ");
                System.out.println();
                System.out.println("Maximum value: " + arrayMaxValue(arr2));
                System.out.println();

                int[] arr3 = {42};
                System.out.print("Test 3 - Array: ");
                for (int x : arr3) System.out.print(x + " ");
                System.out.println();
                System.out.println("Maximum value: " + arrayMaxValue(arr3));
            }
        }
        ```

        The arrays are printed with the enhanced <code>for</code> loop, which visits their elements directly. For Instance 3 the condition <code>1 &lt; a.length</code> is false from the beginning, the loop performs no iteration, and the method returns the only element <code>a[0]</code>.

    2. <strong>Compilation and execution:</strong>

        ```text
        javac Main.java
        java Main
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

    3. <strong>Modified method returning the maximum value and its index:</strong>

        ```java
        public class Main {

            // Returns int[]{maxValue, maxIndex}
            static int[] arrayMaxValueWithIndex(int[] a) {
                int max = a[0];
                int idx = 0;

                for (int i = 1; i < a.length; i++) {
                    if (a[i] > max) {
                        max = a[i];
                        idx = i; // Store the index
                    }
                }
                return new int[]{max, idx};
            }

            public static void main(String[] args) {
                int[] arr1 = {9, 12, 3, 16, 19, 11, 12};
                int[] result = arrayMaxValueWithIndex(arr1);
                System.out.println("Maximum value: " + result[0]
                                 + ", at index: " + result[1]);
            }
        }
        ```

        <strong>Output:</strong>

        ```text
        Maximum value: 19, at index: 4
        ```

        For Instance 1 the method returns the array $\{19,\ 4\}$: the maximum value $19$ is at index $4$ (indices from $0$), that is, in position $5$ of the array $a[1..7]$ of the text. If the maximum value appears more than once, the method returns the index of its first occurrence, because <code>max</code> and <code>idx</code> are updated only when <code>a[i] &gt; max</code> (strict inequality).

<a id="esercizio-8-2"></a>

!!! esercizio "Exercise 8.2: Introduction to {\tt Java} (E2)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of finding its minimum value.

    **Questions**

    1. Write a complete <code>Java</code> program that finds the minimum value in an array $a$ of $n$ integer numbers. The program should:

        - define a static method <code>int arrayMinValue(int[] a)</code> inside the class <code>Main</code>;

        - in the <code>main</code> method, create test arrays and call the method;

        - print the results for each test case.

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the compilation and execution commands and the output for all test cases.

    3. Modify the method so that it returns both the minimum value and its index. Since a <code>Java</code> method returns only one value, return an array <code>int[]</code> of two elements: <code>{minValue, minIndex}</code>. Execute the modified version on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Java</code> program:</strong>

        ```java
        public class Main {

            static int arrayMinValue(int[] a) {
                int min = a[0]; // Initialize with the first element

                for (int i = 1; i < a.length; i++) {
                    if (a[i] < min) {
                        min = a[i]; // Update the minimum
                    }
                }
                return min;
            }

            public static void main(String[] args) {
                int[] arr1 = {9, 12, 3, 16, 19, 11, 12};
                System.out.print("Test 1 - Array: ");
                for (int x : arr1) System.out.print(x + " ");
                System.out.println();
                System.out.println("Minimum value: " + arrayMinValue(arr1));
                System.out.println();

                int[] arr2 = {5, 2, 8, 1};
                System.out.print("Test 2 - Array: ");
                for (int x : arr2) System.out.print(x + " ");
                System.out.println();
                System.out.println("Minimum value: " + arrayMinValue(arr2));
                System.out.println();

                int[] arr3 = {42};
                System.out.print("Test 3 - Array: ");
                for (int x : arr3) System.out.print(x + " ");
                System.out.println();
                System.out.println("Minimum value: " + arrayMinValue(arr3));
            }
        }
        ```

        The arrays are printed with the enhanced <code>for</code> loop, which visits their elements directly. For Instance 3 the condition <code>1 &lt; a.length</code> is false from the beginning, the loop performs no iteration, and the method returns the only element <code>a[0]</code>.

    2. <strong>Compilation and execution:</strong>

        ```text
        javac Main.java
        java Main
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - Array: 9 12 3 16 19 11 12
        Minimum value: 3

        Test 2 - Array: 5 2 8 1
        Minimum value: 1

        Test 3 - Array: 42
        Minimum value: 42
        ```

    3. <strong>Modified method returning the minimum value and its index:</strong>

        ```java
        public class Main {

            // Returns int[]{minValue, minIndex}
            static int[] arrayMinValueWithIndex(int[] a) {
                int min = a[0];
                int idx = 0;

                for (int i = 1; i < a.length; i++) {
                    if (a[i] < min) {
                        min = a[i];
                        idx = i; // Store the index
                    }
                }
                return new int[]{min, idx};
            }

            public static void main(String[] args) {
                int[] arr1 = {9, 12, 3, 16, 19, 11, 12};
                int[] result = arrayMinValueWithIndex(arr1);
                System.out.println("Minimum value: " + result[0]
                                 + ", at index: " + result[1]);
            }
        }
        ```

        <strong>Output:</strong>

        ```text
        Minimum value: 3, at index: 2
        ```

        For Instance 1 the method returns the array $\{3,\ 2\}$: the minimum value $3$ is at index $2$ (indices from $0$), that is, in position $3$ of the array $a[1..7]$ of the text. If the minimum value appears more than once, the method returns the index of its first occurrence, because <code>min</code> and <code>idx</code> are updated only when <code>a[i] &lt; min</code> (strict inequality).

<a id="esercizio-8-3"></a>

!!! esercizio "Exercise 8.3: Introduction to {\tt Java} (E3)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of computing the sum and average of all its elements.

    **Questions**

    1. Write a complete <code>Java</code> program that computes the sum and the average of the elements of an array $a$ of $n$ integer numbers. The program should:

        - define a static method <code>int arraySum(int[] a)</code> that returns the sum;

        - define a static method <code>double arrayAverage(int[] a)</code> that returns the average;

        - in the <code>main</code> method, create test arrays, call both methods, and print the results, with the average rounded to $4$ decimal digits.

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the compilation and execution commands and the output for all test cases.

    3. Write a single method <code>arraySumAndAverage(int[] a)</code> that returns both the sum and the average. Since a <code>Java</code> method returns only one value, return the result as an array <code>double[]</code> of two elements: <code>{sum, average}</code>. Execute it on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Java</code> program:</strong>

        ```java
        public class Main {

            static int arraySum(int[] a) {
                int total = 0;
                for (int i = 0; i < a.length; i++) {
                    total += a[i];
                }
                return total;
            }

            static double arrayAverage(int[] a) {
                return (double) arraySum(a) / a.length;
            }

            static void printTest(int k, int[] a) {
                System.out.print("Test " + k + " - Array: ");
                for (int x : a) System.out.print(x + " ");
                System.out.println();
                System.out.println("Sum:     " + arraySum(a));
                System.out.printf("Average: %.4f%n", arrayAverage(a));
            }

            public static void main(String[] args) {
                int[] arr1 = {9, 12, 3, 16, 19, 11, 12};
                printTest(1, arr1);
                System.out.println();

                int[] arr2 = {5, 2, 8, 1};
                printTest(2, arr2);
                System.out.println();

                int[] arr3 = {42};
                printTest(3, arr3);
            }
        }
        ```

        The conversion <code>(double)</code> is necessary: without it, <code>arraySum(a) / a.length</code> would be the integer division, and for Instance 1 the average would be $82/7 = 11$. The method <code>printTest</code> prints the array and the two results, and avoids writing three times the same instructions.

    2. <strong>Compilation and execution:</strong>

        ```text
        javac Main.java
        java Main
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - Array: 9 12 3 16 19 11 12
        Sum:     82
        Average: 11.7143

        Test 2 - Array: 5 2 8 1
        Sum:     16
        Average: 4.0000

        Test 3 - Array: 42
        Sum:     42
        Average: 42.0000
        ```

        For Instance 1 the exact average is $82/7 = 11.714285\ldots$, displayed as $11.7143$.

    3. <strong>Combined method:</strong>

        ```java
        public class Main {

            // Returns double[]{sum, average}
            static double[] arraySumAndAverage(int[] a) {
                int total = 0;
                for (int x : a) total += x;
                double avg = (double) total / a.length;
                return new double[]{total, avg};
            }

            public static void main(String[] args) {
                int[] arr1 = {9, 12, 3, 16, 19, 11, 12};
                double[] result = arraySumAndAverage(arr1);
                System.out.printf("Sum: %.0f, Average: %.4f%n",
                                  result[0], result[1]);
            }
        }
        ```

        <strong>Output:</strong>

        ```text
        Sum: 82, Average: 11.7143
        ```

        The integer <code>total</code> is converted automatically into a <code>double</code> when it is stored in the array <code>double[]</code>; for this reason it is printed with the format <code>%.0f</code> (no decimal digits) instead of <code>%d</code>, which accepts only integers.

<a id="esercizio-8-4"></a>

!!! esercizio "Exercise 8.4: Introduction to {\tt Java} (E4)"

    Given an array $a$ of $n$ integer numbers and a value $m$, we consider the problem of determining whether the value $m$ is present or not in the array.

    **Questions**

    1. Write a complete <code>Java</code> program that performs a <strong>linear search</strong> in an array $a$. The program should:

        - define a static method <code>int linearSearch(int[] a, int m)</code> that searches for the value <code>m</code> in the array <code>a</code>;

        - return the index of the first occurrence of <code>m</code> if it is found, or <code>-1</code> if it is not found;

        - in the <code>main</code> method, run the test cases and print the results.

    2. Execute the program on the array $a = [9, 12, 3, 16, 19, 11, 12]$ with the following values:

        - $m = 16$ (present in the array)

        - $m = 12$ (present twice: the index of the first occurrence is returned)

        - $m = 7$ (not present in the array)

        Show the compilation and execution commands and the output for all test cases.

    3. Modify the method so that it returns an array <code>int[]</code> containing <strong>all the indices</strong> where the value $m$ appears (instead of only the first occurrence). Use an <code>ArrayList&lt;Integer&gt;</code> inside the method and convert it into an <code>int[]</code> before returning. Execute it with $m = 12$ and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Java</code> program:</strong>

        ```java
        public class Main {

            static int linearSearch(int[] a, int m) {
                for (int i = 0; i < a.length; i++) {
                    if (a[i] == m) {
                        return i; // Found: return the index
                    }
                }
                return -1; // Not found
            }

            static void printResult(int[] a, int m) {
                int idx = linearSearch(a, m);
                if (idx != -1) System.out.println("Value " + m + " found at index " + idx);
                else           System.out.println("Value " + m + " not found");
            }

            public static void main(String[] args) {
                int[] a = {9, 12, 3, 16, 19, 11, 12};
                System.out.print("Array: ");
                for (int x : a) System.out.print(x + " ");
                System.out.println();
                System.out.println();

                printResult(a, 16);
                printResult(a, 12);
                printResult(a, 7);
            }
        }
        ```

        The instruction <code>return i</code> terminates the method, and therefore the loop, at the first occurrence of <code>m</code>; the instruction <code>return -1</code> is reached only when the loop has visited the whole array without finding <code>m</code>. The value <code>-1</code> is used because it cannot be an index of the array.

    2. <strong>Compilation and execution:</strong>

        ```text
        javac Main.java
        java Main
        ```

        <strong>Output:</strong>

        ```text
        Array: 9 12 3 16 19 11 12

        Value 16 found at index 3
        Value 12 found at index 1
        Value 7 not found
        ```

        The value $12$ is at the indices $1$ and $6$, and the method returns the first one. In the array $a[1..7]$ of the text, the indices $3$ and $1$ correspond to the positions $4$ and $2$.

    3. <strong>Method returning all the occurrences:</strong>

        ```java
        import java.util.ArrayList;

        public class Main {

            static int[] linearSearchAll(int[] a, int m) {
                ArrayList<Integer> indices = new ArrayList<>();
                for (int i = 0; i < a.length; i++) {
                    if (a[i] == m) {
                        indices.add(i);
                    }
                }
                // Conversion of the ArrayList<Integer> into an int[]
                int[] result = new int[indices.size()];
                for (int i = 0; i < indices.size(); i++) {
                    result[i] = indices.get(i);
                }
                return result;
            }

            public static void main(String[] args) {
                int[] a = {9, 12, 3, 16, 19, 11, 12};
                int m = 12;
                int[] occurrences = linearSearchAll(a, m);

                if (occurrences.length > 0) {
                    System.out.print("Value " + m + " found at indices: ");
                    for (int idx : occurrences) System.out.print(idx + " ");
                    System.out.println();
                } else {
                    System.out.println("Value " + m + " not found");
                }
            }
        }
        ```

        <strong>Output:</strong>

        ```text
        Value 12 found at indices: 1 6
        ```

        The number of occurrences is not known in advance, so the indices are first collected in an <code>ArrayList</code>, which grows with <code>add</code>; then an array of the right size <code>indices.size()</code> is allocated and filled. Unlike <code>linearSearch</code>, this method always visits the whole array. If <code>m</code> is not present, the method returns an array of length $0$.

<a id="esercizio-8-5"></a>

!!! esercizio "Exercise 8.5: Introduction to {\tt Java} (E5)"

    Given an array $a$ of $n \ge 1$ integer numbers, we consider the problem of computing in a single pass the maximum, minimum, sum and average of all elements in the array.

    **Questions**

    1. Write a complete <code>Java</code> program that computes in a <strong>single pass</strong> the four statistics (maximum, minimum, sum, average) of an array $a$ of $n$ integer numbers. The program should:

        - define a static method <code>arrayStats(int[] a)</code> that computes the four values with a single loop;

        - return the results as an array <code>double[]</code> of four elements: <code>{max, min, sum, average}</code>;

        - in the <code>main</code> method, run the test cases and print the results.

    2. Execute the program on the following instances:

        - Instance 1: $a = [9, 12, 3, 16, 19, 11, 12]$ with $n=7$

        - Instance 2: $a = [5, 2, 8, 1]$ with $n=4$

        - Instance 3: $a = [42]$ with $n=1$

        Show the compilation and execution commands and the output for all test cases.

    3. Modify the method so that it also returns the indices of the maximum and of the minimum element, as an array <code>double[]</code> of six elements: <code>{max, maxIdx, min, minIdx, sum, average}</code>. Execute it on Instance 1 and show the output.

??? soluzione "Solution"

    1. <strong>Complete <code>Java</code> program:</strong>

        ```java
        public class Main {

            // Returns double[]{max, min, sum, average}
            static double[] arrayStats(int[] a) {
                int max = a[0];
                int min = a[0];
                int total = a[0];

                for (int i = 1; i < a.length; i++) {
                    if (a[i] > max) max = a[i];
                    if (a[i] < min) min = a[i];
                    total += a[i];
                }

                double avg = (double) total / a.length;
                return new double[]{max, min, total, avg};
            }

            static void printStats(int k, int[] a) {
                double[] s = arrayStats(a);
                System.out.print("Test " + k + " - Array: ");
                for (int x : a) System.out.print(x + " ");
                System.out.println();
                System.out.println("  Maximum: " + (int) s[0]);
                System.out.println("  Minimum: " + (int) s[1]);
                System.out.println("  Sum:     " + (int) s[2]);
                System.out.printf("  Average: %.4f%n", s[3]);
            }

            public static void main(String[] args) {
                printStats(1, new int[]{9, 12, 3, 16, 19, 11, 12});
                System.out.println();
                printStats(2, new int[]{5, 2, 8, 1});
                System.out.println();
                printStats(3, new int[]{42});
            }
        }
        ```

        The three variables are initialized with the first element, and the loop visits the other $n-1$ elements once. The four results have different data types, so they are all stored as <code>double</code> in the returned array; the integer results are converted back with <code>(int)</code> before printing, so that they are displayed without the decimal part (<code>19</code> instead of <code>19.0</code>). The expression <code>new int[]{…}</code> creates an array directly in the call.

    2. <strong>Compilation and execution:</strong>

        ```text
        javac Main.java
        java Main
        ```

        <strong>Output:</strong>

        ```text
        Test 1 - Array: 9 12 3 16 19 11 12
          Maximum: 19
          Minimum: 3
          Sum:     82
          Average: 11.7143

        Test 2 - Array: 5 2 8 1
          Maximum: 8
          Minimum: 1
          Sum:     16
          Average: 4.0000

        Test 3 - Array: 42
          Maximum: 42
          Minimum: 42
          Sum:     42
          Average: 42.0000
        ```

    3. <strong>Extended method also returning the indices:</strong>

        ```java
        public class Main {

            // Returns double[]{max, maxIdx, min, minIdx, sum, average}
            static double[] arrayStatsWithIndices(int[] a) {
                int max = a[0], maxIdx = 0;
                int min = a[0], minIdx = 0;
                int total = a[0];

                for (int i = 1; i < a.length; i++) {
                    if (a[i] > max) { max = a[i]; maxIdx = i; }
                    if (a[i] < min) { min = a[i]; minIdx = i; }
                    total += a[i];
                }

                double avg = (double) total / a.length;
                return new double[]{max, maxIdx, min, minIdx, total, avg};
            }

            public static void main(String[] args) {
                int[] a = {9, 12, 3, 16, 19, 11, 12};
                double[] r = arrayStatsWithIndices(a);
                System.out.println("Max: " + (int) r[0] + " at index " + (int) r[1]);
                System.out.println("Min: " + (int) r[2] + " at index " + (int) r[3]);
                System.out.println("Sum: " + (int) r[4]);
                System.out.printf("Avg: %.4f%n", r[5]);
            }
        }
        ```

        <strong>Output:</strong>

        ```text
        Max: 19 at index 4
        Min: 3 at index 2
        Sum: 82
        Avg: 11.7143
        ```

        The maximum $19$ is at index $4$ and the minimum $3$ at index $2$ (indices from $0$), that is, in the positions $5$ and $3$ of the array $a[1..7]$ of the text.
