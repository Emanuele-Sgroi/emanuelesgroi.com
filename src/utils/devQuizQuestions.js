/**
 * This File Contains the questions used in Dev Quiz.
 * This file contains question sets for various technical topics, categorized into arrays of objects.
 * Each object in the arrays represents a question and its related details for a specific topic.
 *
 * Each question object has the following structure:
 * - `id`: A unique identifier for the question.
 * - `topic`: The subject or category of the question (e.g., React, JavaScript, Node.js).
 * - `question`: The text of the question being asked.
 * - `language`: (Optional) A string indicating the programming language for the code-related question.
 * - `code`: (Optional) A boolean value indicating if the question involves code.
 * - `options`: An array of possible answers, each with a `text` property and an optional `code` property.
 * - `answer`: The correct answer for the question.
 * - `explanation`: An explanation of why the answer is correct, with optional code.
 *
 * The question sets cover various topics including:
 * - Core Concepts (e.g., Polymorphism in OOP)
 * - React (e.g., useEffect hook)
 * - Next.js (e.g., getServerSideProps)
 * - JavaScript (e.g., Function Hoisting)
 * - Node.js (e.g., fs module)
 * - React Native (e.g., Cross-platform mobile apps)
 * - API (e.g., HTTP status codes)
 *
 */

// CORE CONCEPTS
export const coreConceptsQuestions = [
  // 1
  {
    id: 1,
    topic: "Core Concepts",
    question: "What is encapsulation in Object-Oriented Programming?",
    code: false,
    language: false,
    options: [
      { text: "Wrapping data and methods into a single unit", code: false },
      { text: "Reusing code through inheritance", code: false },
      { text: "Overriding a method in a subclass", code: false },
      { text: "Hiding data in global variables", code: false },
    ],
    answer: "Wrapping data and methods into a single unit",
    explanation: {
      text: "Encapsulation is the concept of binding data and the functions that manipulate it into one unit, typically a class.",
      code: false,
    },
  },
  // 2
  {
    id: 2,
    topic: "Core Concepts",
    question:
      "Which principle of OOP allows objects of different types to be treated through the same interface?",
    code: false,
    language: false,
    options: [
      { text: "Polymorphism", code: false },
      { text: "Encapsulation", code: false },
      { text: "Inheritance", code: false },
      { text: "Abstraction", code: false },
    ],
    answer: "Polymorphism",
    explanation: {
      text: "Polymorphism allows a single interface to represent different types, enabling flexibility and reusability.",
      code: false,
    },
  },
  // 3
  {
    id: 3,
    topic: "Core Concepts",
    question: "Which of the following best describes abstraction in OOP?",
    code: false,
    language: false,
    options: [
      {
        text: "Hiding implementation details and showing only functionality",
        code: false,
      },
      { text: "Reusing code from a parent class", code: false },
      {
        text: "Creating multiple classes with similar properties",
        code: false,
      },
      { text: "Restricting access to certain class members", code: false },
    ],
    answer: "Hiding implementation details and showing only functionality",
    explanation: {
      text: "Abstraction focuses on exposing only the necessary parts of an object, hiding the complex logic behind the scenes.",
      code: false,
    },
  },
  // 4
  {
    id: 4,
    topic: "Core Concepts",
    question:
      "Which keyword is used in many languages to implement inheritance?",
    code: false,
    language: false,
    options: [
      { text: "extends", code: false },
      { text: "inherits", code: false },
      { text: "instanceof", code: false },
      { text: "parent", code: false },
    ],
    answer: "extends",
    explanation: {
      text: "The 'extends' keyword is commonly used to denote that a class is inheriting from another class.",
      code: false,
    },
  },
  // 5
  {
    id: 5,
    topic: "Core Concepts",
    question: "Which of the following is NOT an OOP principle?",
    code: false,
    language: false,
    options: [
      { text: "Encapsulation", code: false },
      { text: "Composition", code: false },
      { text: "Abstraction", code: false },
      { text: "Polymorphism", code: false },
    ],
    answer: "Composition",
    explanation: {
      text: "While composition is a design pattern often used in OOP, it's not considered one of the four fundamental principles (which are: Encapsulation, Abstraction, Inheritance, and Polymorphism).",
      code: false,
    },
  },
  // 6
  {
    id: 6,
    topic: "Core Concepts",
    question:
      "Which SOLID principle states that a class should have only one reason to change?",
    code: false,
    language: false,
    options: [
      { text: "Single Responsibility Principle", code: false },
      { text: "Open/Closed Principle", code: false },
      { text: "Dependency Inversion Principle", code: false },
      { text: "Liskov Substitution Principle", code: false },
    ],
    answer: "Single Responsibility Principle",
    explanation: {
      text: "The Single Responsibility Principle (SRP) says a class should have only one reason to change, meaning it should only have one job or responsibility.",
      code: false,
    },
  },
  // 7
  {
    id: 7,
    topic: "Core Concepts",
    question: "Which of these best represents polymorphism?",
    code: `class Animal {
    speak() {
      return "Generic sound";
    }
  }
  class Dog extends Animal {
    speak() {
      return "Woof";
   }
  }
  class Cat extends Animal {
   speak() {
      return "Meow";
    }
  }
  const animals = [new Dog(), new Cat()];
  animals.map(a => a.speak());`,
    language: "javascript",
    options: [
      { text: `["Generic sound", "Generic sound"]`, code: false },
      { text: `["Woof", "Meow"]`, code: false },
      { text: `["Woof", "Generic sound"]`, code: false },
      { text: `["Meow", "Woof"]`, code: false },
    ],
    answer: `["Woof", "Meow"]`,
    explanation: {
      text: "Each subclass overrides the `speak` method, demonstrating polymorphism by responding differently to the same method call.",
      code: false,
    },
  },
  // 8
  {
    id: 8,
    topic: "Core Concepts",
    question: "What is method overriding in OOP?",
    code: false,
    language: false,
    options: [
      {
        text: "Defining a method in the subclass with the same signature as in the parent class",
        code: false,
      },
      {
        text: "Changing the name of a method in the parent class",
        code: false,
      },
      {
        text: "Creating multiple methods with the same name but different parameters",
        code: false,
      },
      { text: "Hiding implementation details in a class", code: false },
    ],
    answer:
      "Defining a method in the subclass with the same signature as in the parent class",
    explanation: {
      text: "Method overriding occurs when a subclass provides its own implementation of a method that is already defined in its parent class.",
      code: false,
    },
  },
  // 9
  {
    id: 9,
    topic: "Core Concepts",
    question: "Which of the following demonstrates constructor overloading?",
    code: `class Person {
  constructor(name) {
    this.name = name;
  }
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}`,
    language: "javascript",
    options: [
      { text: "It shows constructor overloading", code: false },
      { text: "It will throw an error", code: false },
      { text: "Only the second constructor will be used", code: false },
      { text: "Both constructors will be merged", code: false },
    ],
    answer: "It will throw an error",
    explanation: {
      text: "JavaScript does not support multiple constructors in a class. This code will throw an error.",
      code: false,
    },
  },
  // 10
  {
    id: 10,
    topic: "Core Concepts",
    question:
      "Which concept encourages using objects to contain other objects instead of inheritance?",
    code: false,
    language: false,
    options: [
      { text: "Composition", code: false },
      { text: "Abstraction", code: false },
      { text: "Polymorphism", code: false },
      { text: "Encapsulation", code: false },
    ],
    answer: "Composition",
    explanation: {
      text: "Composition involves constructing complex objects by combining simpler ones. It's often preferred over inheritance to increase flexibility.",
      code: false,
    },
  },
  // 11
  {
    id: 11,
    topic: "Core Concepts",
    question: "In which situation is inheritance preferred over composition?",
    code: false,
    language: false,
    options: [
      {
        text: "When objects share a strict parent-child relationship",
        code: false,
      },
      { text: "When behavior needs to change at runtime", code: false },
      { text: "When avoiding tight coupling", code: false },
      { text: "When promoting code reuse with loose coupling", code: false },
    ],
    answer: "When objects share a strict parent-child relationship",
    explanation: {
      text: "Inheritance is best used when there's a clear 'is-a' relationship, like Dog is an Animal.",
      code: false,
    },
  },
  // 12
  {
    id: 12,
    topic: "Core Concepts",
    question: "What is the Liskov Substitution Principle?",
    code: false,
    language: false,
    options: [
      {
        text: "Subtypes should be replaceable with their base types without altering correctness",
        code: false,
      },
      {
        text: "Every class should be open for extension but closed for modification",
        code: false,
      },
      { text: "A class should have only one reason to change", code: false },
      {
        text: "High-level modules should not depend on low-level modules",
        code: false,
      },
    ],
    answer:
      "Subtypes should be replaceable with their base types without altering correctness",
    explanation: {
      text: "LSP is the 'L' in SOLID and ensures that derived classes can stand in for base classes without breaking the program.",
      code: false,
    },
  },
  // CORE CONCEPTS — DATA STRUCTURES (IDs 13–22)
  {
    id: 13,
    topic: "Core Concepts",
    question:
      "What is the time complexity of accessing an element in an array by index?",
    code: false,
    language: false,
    options: [
      { text: "O(1)", code: false },
      { text: "O(n)", code: false },
      { text: "O(log n)", code: false },
      { text: "O(n^2)", code: false },
    ],
    answer: "O(1)",
    explanation: {
      text: "Accessing an array element by index is a constant-time operation because the memory location is directly calculated.",
    },
  },
  {
    id: 14,
    topic: "Core Concepts",
    question: "Which data structure uses FIFO (First-In, First-Out) ordering?",
    code: false,
    language: false,
    options: [
      { text: "Stack", code: false },
      { text: "Queue", code: false },
      { text: "Linked List", code: false },
      { text: "Set", code: false },
    ],
    answer: "Queue",
    explanation: {
      text: "A queue processes elements in the order they were added, following the FIFO principle.",
    },
  },
  {
    id: 15,
    topic: "Core Concepts",
    question: "What will the following JavaScript code output?",
    language: "javascript",
    code: `const stack = [];
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();
console.log(stack);`,
    options: [
      { text: "[1, 2, 3]", code: false },
      { text: "[1, 2]", code: false },
      { text: "[2, 3]", code: false },
      { text: "[1, 3]", code: false },
    ],
    answer: "[1, 2]",
    explanation: {
      text: "`pop()` removes the last element from the stack, leaving [1, 2].",
    },
  },
  {
    id: 16,
    topic: "Core Concepts",
    question: "Which data structure is typically used to implement recursion?",
    code: false,
    language: false,
    options: [
      { text: "Queue", code: false },
      { text: "Stack", code: false },
      { text: "Heap", code: false },
      { text: "Set", code: false },
    ],
    answer: "Stack",
    explanation: {
      text: "Function calls in recursion are stored in the call stack, which follows LIFO (Last-In, First-Out).",
    },
  },
  {
    id: 17,
    topic: "Core Concepts",
    question: "What is a hash table best used for?",
    code: false,
    language: false,
    options: [
      { text: "Sorting data", code: false },
      { text: "Efficient searching, insertion, and deletion", code: false },
      { text: "Storing data in order", code: false },
      { text: "Recursive computations", code: false },
    ],
    answer: "Efficient searching, insertion, and deletion",
    explanation: {
      text: "Hash tables offer near constant time for these operations with a good hash function.",
    },
  },
  {
    id: 18,
    topic: "Core Concepts",
    question: "Which of the following is a linear data structure?",
    code: false,
    language: false,
    options: [
      { text: "Graph", code: false },
      { text: "Binary Tree", code: false },
      { text: "Linked List", code: false },
      { text: "Hash Table", code: false },
    ],
    answer: "Linked List",
    explanation: {
      text: "A linked list is a linear structure where elements are connected in a sequence.",
    },
  },
  {
    id: 19,
    topic: "Core Concepts",
    question: "What is the main disadvantage of a linked list over an array?",
    code: false,
    language: false,
    options: [
      { text: "More memory usage", code: false },
      { text: "Fixed size", code: false },
      { text: "Slower element insertion", code: false },
      { text: "Random access is possible", code: false },
    ],
    answer: "More memory usage",
    explanation: {
      text: "Each node in a linked list stores a reference to the next node, increasing memory use.",
    },
  },
  {
    id: 20,
    topic: "Core Concepts",
    question: "What is the output of the following code?",
    language: "javascript",
    code: `const map = new Map();
map.set('a', 1);
map.set('b', 2);
console.log(map.get('a'));`,
    options: [
      { text: "undefined", code: false },
      { text: "1", code: false },
      { text: "'a'", code: false },
      { text: "null", code: false },
    ],
    answer: "1",
    explanation: {
      text: "The `.get()` method retrieves the value associated with the key 'a', which is 1.",
    },
  },
  {
    id: 21,
    topic: "Core Concepts",
    question: "Which data structure allows duplicate elements?",
    code: false,
    language: false,
    options: [
      { text: "Set", code: false },
      { text: "Map", code: false },
      { text: "Array", code: false },
      { text: "Tree", code: false },
    ],
    answer: "Array",
    explanation: {
      text: "Unlike sets, arrays can contain duplicate values.",
    },
  },
  {
    id: 22,
    topic: "Core Concepts",
    question:
      "Which traversal method visits nodes in the order: left, root, right?",
    code: false,
    language: false,
    options: [
      { text: "Pre-order", code: false },
      { text: "Post-order", code: false },
      { text: "In-order", code: false },
      { text: "Level-order", code: false },
    ],
    answer: "In-order",
    explanation: {
      text: "In-order traversal of a binary tree visits nodes in the order left → root → right.",
    },
  },

  // CORE CONCEPTS — ALGORITHMS (IDs 23–30)

  {
    id: 23,
    topic: "Core Concepts",
    question: "What is the time complexity of binary search in a sorted array?",
    code: false,
    language: false,
    options: [
      { text: "O(n)", code: false },
      { text: "O(log n)", code: false },
      { text: "O(n log n)", code: false },
      { text: "O(1)", code: false },
    ],
    answer: "O(log n)",
    explanation: {
      text: "Binary search repeatedly divides the array in half, resulting in logarithmic time complexity.",
    },
  },
  {
    id: 24,
    topic: "Core Concepts",
    question:
      "Which algorithm is commonly used for sorting and has an average time complexity of O(n log n)?",
    code: false,
    language: false,
    options: [
      { text: "Bubble Sort", code: false },
      { text: "Selection Sort", code: false },
      { text: "Merge Sort", code: false },
      { text: "Insertion Sort", code: false },
    ],
    answer: "Merge Sort",
    explanation: {
      text: "Merge sort is a divide-and-conquer algorithm with consistent O(n log n) time complexity in all cases.",
    },
  },
  {
    id: 25,
    topic: "Core Concepts",
    question: "What is the worst-case time complexity of quicksort?",
    code: false,
    language: false,
    options: [
      { text: "O(n log n)", code: false },
      { text: "O(n)", code: false },
      { text: "O(n^2)", code: false },
      { text: "O(log n)", code: false },
    ],
    answer: "O(n^2)",
    explanation: {
      text: "Quicksort can degrade to O(n^2) if the pivot selection is poor, e.g., always picking the largest or smallest element.",
    },
  },
  {
    id: 26,
    topic: "Core Concepts",
    question:
      "Which algorithm is used to find the shortest path in a weighted graph with non-negative weights?",
    code: false,
    language: false,
    options: [
      { text: "DFS", code: false },
      { text: "BFS", code: false },
      { text: "Dijkstra's Algorithm", code: false },
      { text: "Prim's Algorithm", code: false },
    ],
    answer: "Dijkstra's Algorithm",
    explanation: {
      text: "Dijkstra's algorithm efficiently finds the shortest path from a source node to all others in a weighted graph.",
    },
  },
  {
    id: 27,
    topic: "Core Concepts",
    question: "Which of the following is an example of a greedy algorithm?",
    code: false,
    language: false,
    options: [
      { text: "Merge Sort", code: false },
      { text: "Binary Search", code: false },
      { text: "Dijkstra's Algorithm", code: false },
      { text: "Depth-First Search", code: false },
    ],
    answer: "Dijkstra's Algorithm",
    explanation: {
      text: "Dijkstra's algorithm is greedy because it always chooses the nearest unvisited node at each step.",
    },
  },
  {
    id: 28,
    topic: "Core Concepts",
    question: "What does the Big O notation describe?",
    code: false,
    language: false,
    options: [
      { text: "Memory usage of an algorithm", code: false },
      { text: "The exact number of steps an algorithm takes", code: false },
      { text: "The execution speed in seconds", code: false },
      { text: "The upper bound of an algorithm's growth rate", code: false },
    ],
    answer: "The upper bound of an algorithm's growth rate",
    explanation: {
      text: "Big O describes the upper limit on the time (or space) an algorithm could take relative to input size.",
    },
  },
  {
    id: 29,
    topic: "Core Concepts",
    question: "What is the base case in a recursive algorithm?",
    code: false,
    language: false,
    options: [
      { text: "The case with the highest input value", code: false },
      { text: "The first case the function tries", code: false },
      { text: "The condition that stops recursion", code: false },
      { text: "The last case before the loop starts again", code: false },
    ],
    answer: "The condition that stops recursion",
    explanation: {
      text: "The base case prevents infinite recursion by defining when the recursive function should stop.",
    },
  },
  {
    id: 30,
    topic: "Core Concepts",
    question: "What is the output of this recursive factorial function?",
    language: "javascript",
    code: `function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(3));`,
    options: [
      { text: "0", code: false },
      { text: "6", code: false },
      { text: "3", code: false },
      { text: "1", code: false },
    ],
    answer: "6",
    explanation: {
      text: "`factorial(3)` evaluates as 3 * 2 * 1, which equals 6.",
    },
  },

  // CORE CONCEPTS — BIG O (IDs 31–36)

  {
    id: 31,
    topic: "Core Concepts",
    question:
      "What is the time complexity of searching for an element in an unsorted array?",
    code: false,
    language: false,
    options: [
      { text: "O(1)", code: false },
      { text: "O(log n)", code: false },
      { text: "O(n)", code: false },
      { text: "O(n log n)", code: false },
    ],
    answer: "O(n)",
    explanation: {
      text: "In the worst case, every element must be checked in an unsorted array, resulting in O(n) time.",
      code: false,
    },
  },
  {
    id: 32,
    topic: "Core Concepts",
    question:
      "Which of the following Big O notations represents the best possible efficiency?",
    code: false,
    language: false,
    options: [
      { text: "O(n)", code: false },
      { text: "O(n log n)", code: false },
      { text: "O(log n)", code: false },
      { text: "O(1)", code: false },
    ],
    answer: "O(1)",
    explanation: {
      text: "O(1) means the operation takes the same time regardless of input size — the most efficient.",
      code: false,
    },
  },
  {
    id: 33,
    topic: "Core Concepts",
    question: "Which algorithm has the worst-case time complexity of O(n²)?",
    code: false,
    language: false,
    options: [
      { text: "Binary Search", code: false },
      { text: "Bubble Sort", code: false },
      { text: "Merge Sort", code: false },
      { text: "Quick Sort", code: false },
    ],
    answer: "Bubble Sort",
    explanation: {
      text: "Bubble sort compares every pair, which in the worst case requires O(n²) operations.",
      code: false,
    },
  },
  {
    id: 34,
    topic: "Core Concepts",
    question: "What does O(n log n) represent in time complexity?",
    code: false,
    language: false,
    options: [
      { text: "A linear search algorithm", code: false },
      { text: "A divide-and-conquer approach", code: false },
      { text: "An exponential algorithm", code: false },
      { text: "A recursive algorithm with linear depth", code: false },
    ],
    answer: "A divide-and-conquer approach",
    explanation: {
      text: "Algorithms like merge sort divide the input and perform linear work per level — resulting in O(n log n).",
      code: false,
    },
  },
  {
    id: 35,
    topic: "Core Concepts",
    question:
      "Which of the following growth rates increases the fastest as n increases?",
    code: false,
    language: false,
    options: [
      { text: "O(log n)", code: false },
      { text: "O(n)", code: false },
      { text: "O(n log n)", code: false },
      { text: "O(2ⁿ)", code: false },
    ],
    answer: "O(2ⁿ)",
    explanation: {
      text: "Exponential growth (O(2ⁿ)) increases rapidly and is typically seen in brute-force or recursive algorithms without pruning.",
      code: false,
    },
  },
  {
    id: 36,
    topic: "Core Concepts",
    question: "What is the time complexity of this loop?",
    language: "javascript",
    code: `for (let i = 1; i < n; i *= 2) {
  console.log(i);
}`,
    options: [
      { text: "O(n)", code: false },
      { text: "O(log n)", code: false },
      { text: "O(n log n)", code: false },
      { text: "O(1)", code: false },
    ],
    answer: "O(log n)",
    explanation: {
      text: "The loop doubles `i` each time, resulting in logarithmic iterations relative to `n`.",
      code: false,
    },
  },

  // CORE CONCEPTS — PROGRAMMING PARADIGMS (IDs 37–41)

  {
    id: 37,
    topic: "Core Concepts",
    question:
      "Which of the following best describes the functional programming paradigm?",
    code: false,
    language: false,
    options: [
      { text: "Programs are built using objects and methods", code: false },
      {
        text: "Programs avoid state and side effects, relying on pure functions",
        code: false,
      },
      { text: "Programs use goto statements for control flow", code: false },
      { text: "Programs are written in machine code", code: false },
    ],
    answer: "Programs avoid state and side effects, relying on pure functions",
    explanation: {
      text: "Functional programming emphasizes pure functions, immutability, and avoiding shared state.",
      code: false,
    },
  },
  {
    id: 38,
    topic: "Core Concepts",
    question:
      "Which programming paradigm focuses on modeling real-world entities?",
    code: false,
    language: false,
    options: [
      { text: "Functional Programming", code: false },
      { text: "Procedural Programming", code: false },
      { text: "Object-Oriented Programming", code: false },
      { text: "Logic Programming", code: false },
    ],
    answer: "Object-Oriented Programming",
    explanation: {
      text: "OOP structures programs around objects, which represent real-world entities with properties and behaviours.",
      code: false,
    },
  },
  {
    id: 39,
    topic: "Core Concepts",
    question:
      "In which paradigm is the program structure typically a sequence of instructions and function calls?",
    code: false,
    language: false,
    options: [
      { text: "Functional", code: false },
      { text: "Object-Oriented", code: false },
      { text: "Procedural", code: false },
      { text: "Declarative", code: false },
    ],
    answer: "Procedural",
    explanation: {
      text: "Procedural programming organizes code into procedures or routines that are executed in sequence.",
      code: false,
    },
  },
  {
    id: 40,
    topic: "Core Concepts",
    question:
      "Which of the following is an example of declarative programming?",
    code: false,
    language: false,
    options: [
      { text: "Writing a for loop to print numbers", code: false },
      { text: "Using SQL to query a database", code: false },
      { text: "Creating a class to represent a user", code: false },
      {
        text: "Defining a recursive function to calculate factorial",
        code: false,
      },
    ],
    answer: "Using SQL to query a database",
    explanation: {
      text: "Declarative programming focuses on describing *what* should be done, not *how* — like in SQL.",
      code: false,
    },
  },
  {
    id: 41,
    topic: "Core Concepts",
    question:
      "Which of these features is *not* typically associated with functional programming?",
    code: false,
    language: false,
    options: [
      { text: "Immutability", code: false },
      { text: "First-class functions", code: false },
      { text: "Stateful operations", code: false },
      { text: "Pure functions", code: false },
    ],
    answer: "Stateful operations",
    explanation: {
      text: "Functional programming discourages mutable state and favors stateless operations.",
      code: false,
    },
  },

  // CORE CONCEPTS — CONCURRENCY & ASYNC (IDs 42–46)

  {
    id: 42,
    topic: "Core Concepts",
    question: "What is the main benefit of asynchronous programming?",
    code: false,
    language: false,
    options: [
      { text: "It simplifies the code structure", code: false },
      { text: "It guarantees faster execution time", code: false },
      {
        text: "It allows programs to handle multiple tasks without blocking",
        code: false,
      },
      { text: "It ensures data integrity in all scenarios", code: false },
    ],
    answer: "It allows programs to handle multiple tasks without blocking",
    explanation: {
      text: "Asynchronous programming improves responsiveness by allowing non-blocking operations, especially in I/O-heavy tasks.",
      code: false,
    },
  },
  {
    id: 43,
    topic: "Core Concepts",
    question: "Which JavaScript feature enables asynchronous programming?",
    code: false,
    language: false,
    options: [
      { text: "setTimeout", code: false },
      { text: "Promises", code: false },
      { text: "Loops", code: false },
      { text: "Hoisting", code: false },
    ],
    answer: "Promises",
    explanation: {
      text: "Promises are a core feature for handling asynchronous operations in JavaScript, along with async/await.",
      code: false,
    },
  },
  {
    id: 44,
    topic: "Core Concepts",
    question: "What does concurrency mean in programming?",
    code: false,
    language: false,
    options: [
      { text: "Running multiple programs on multiple computers", code: false },
      {
        text: "Handling multiple tasks at the same time, possibly interleaved",
        code: false,
      },
      { text: "Executing code line by line", code: false },
      { text: "Using multiple programming languages", code: false },
    ],
    answer: "Handling multiple tasks at the same time, possibly interleaved",
    explanation: {
      text: "Concurrency is about structuring a program to handle multiple operations, often via task switching or threads.",
      code: false,
    },
  },
  {
    id: 45,
    topic: "Core Concepts",
    question: "What is the output of the following async JavaScript code?",
    language: "javascript",
    code: `console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");`,
    options: [
      { text: `"Start" → "Timeout" → "Promise" → "End"`, code: false },
      { text: `"Start" → "Promise" → "End" → "Timeout"`, code: false },
      { text: `"Start" → "End" → "Promise" → "Timeout"`, code: false },
      { text: `"Start" → "End" → "Timeout" → "Promise"`, code: false },
    ],
    answer: `"Start" → "End" → "Promise" → "Timeout"`,
    explanation: {
      text: `The call stack runs synchronously: "Start" and "End" print first. Promises (microtasks) resolve before timeouts (macrotasks), so "Promise" comes before "Timeout".`,
      code: false,
    },
  },
  {
    id: 46,
    topic: "Core Concepts",
    question:
      "Which of the following is a common issue in concurrent programming?",
    code: false,
    language: false,
    options: [
      { text: "Hoisting", code: false },
      { text: "Deadlock", code: false },
      { text: "Garbage collection", code: false },
      { text: "Immutable variables", code: false },
    ],
    answer: "Deadlock",
    explanation: {
      text: "Deadlock occurs when two or more tasks are waiting for each other to release resources, causing the program to freeze.",
      code: false,
    },
  },

  // CORE CONCEPTS — MISCELLANEOUS (IDs 47–50)

  {
    id: 47,
    topic: "Core Concepts",
    question: "What is the difference between a compiler and an interpreter?",
    code: false,
    language: false,
    options: [
      {
        text: "A compiler executes code line by line, an interpreter does not",
        code: false,
      },
      {
        text: "A compiler translates the whole code at once, an interpreter executes it line by line",
        code: false,
      },
      { text: "They are the same thing", code: false },
      { text: "An interpreter is used only in Java", code: false },
    ],
    answer:
      "A compiler translates the whole code at once, an interpreter executes it line by line",
    explanation: {
      text: "Compilers translate entire programs into machine code before execution, while interpreters execute code line-by-line.",
      code: false,
    },
  },
  {
    id: 48,
    topic: "Core Concepts",
    question:
      "Which of the following best defines 'abstraction' in computer science?",
    code: false,
    language: false,
    options: [
      {
        text: "Hiding irrelevant details and showing only the essential features",
        code: false,
      },
      { text: "Breaking code into multiple functions", code: false },
      { text: "Using third-party libraries", code: false },
      { text: "Writing pseudocode before implementation", code: false },
    ],
    answer: "Hiding irrelevant details and showing only the essential features",
    explanation: {
      text: "Abstraction allows developers to work with complex systems more easily by focusing on high-level logic.",
      code: false,
    },
  },
  {
    id: 49,
    topic: "Core Concepts",
    question:
      "Which of these is *not* a common characteristic of good software architecture?",
    code: false,
    language: false,
    options: [
      { text: "Scalability", code: false },
      { text: "Tight coupling", code: false },
      { text: "Maintainability", code: false },
      { text: "Modularity", code: false },
    ],
    answer: "Tight coupling",
    explanation: {
      text: "Tight coupling makes software harder to modify and maintain. Good architecture aims for loose coupling.",
      code: false,
    },
  },
  {
    id: 50,
    topic: "Core Concepts",
    question: "What does 'DRY' stand for in software development?",
    code: false,
    language: false,
    options: [
      { text: "Don't Repeat Yourself", code: false },
      { text: "Don't Render Yourself", code: false },
      { text: "Do Repeat Yourself", code: false },
      { text: "Deploy Reusable YAML", code: false },
    ],
    answer: "Don't Repeat Yourself",
    explanation: {
      text: "DRY is a principle that encourages reducing repetition to make code more maintainable and scalable.",
      code: false,
    },
  },
  // CORE CONCEPTS — BONUS QUESTIONS (IDs 51–52)

  // Very Easy
  {
    id: 51,
    topic: "Core Concepts",
    question: "What does 'bug' mean in programming?",
    code: false,
    language: false,
    options: [
      { text: "A virus in the system", code: false },
      { text: "A mistake or flaw in the code", code: false },
      { text: "An intentional feature", code: false },
      { text: "A security patch", code: false },
    ],
    answer: "A mistake or flaw in the code",
    explanation: {
      text: "A bug is an error, flaw, or fault in a program that causes it to behave unexpectedly or incorrectly.",
      code: false,
    },
  },

  //  Hard
  {
    id: 52,
    topic: "Core Concepts",
    question:
      "What is the difference between concurrency and parallelism, and in which scenario would you use a message-passing architecture instead of shared memory?",
    code: false,
    language: false,
    options: [
      {
        text: "Concurrency runs tasks simultaneously on multiple cores; use message-passing for I/O-heavy operations",
        code: false,
      },
      {
        text: "Concurrency deals with multiple tasks conceptually at once; parallelism runs them literally at once; use message-passing when avoiding race conditions",
        code: false,
      },
      {
        text: "Parallelism and concurrency are synonyms; use shared memory when debugging",
        code: false,
      },
      {
        text: "Concurrency requires hardware threads; message-passing is only used in web apps",
        code: false,
      },
    ],
    answer:
      "Concurrency deals with multiple tasks conceptually at once; parallelism runs them literally at once; use message-passing when avoiding race conditions",
    explanation: {
      text: `Concurrency is about dealing with lots of things at once (structure), while parallelism is about doing lots of things at once (execution). Message-passing architectures like the Actor Model are useful in distributed systems and multi-threaded apps where shared memory could lead to race conditions or deadlocks.`,
      code: false,
    },
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//REACT QUESTIONS

export const reactQuestions = [
  {
    id: 1,
    topic: "React",
    question: "What is the purpose of React's useEffect hook?",
    code: false,
    language: false,
    options: [
      { text: "To manage state in a component", code: false },
      { text: "To handle side effects in a functional component", code: false },
      { text: "To render JSX", code: false },
      { text: "To optimize performance", code: false },
    ],
    answer: "To handle side effects in a functional component",
    explanation: {
      text: "useEffect is used to perform side effects like data fetching, subscriptions, or DOM manipulations.",
      code: false,
    },
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// NEXT JS QUESTIONS

export const nextQuestions = [
  {
    id: 1,
    topic: "Next.js",
    question: "What is getServerSideProps in Next.js?",
    code: false,
    language: false,
    options: [
      { text: "To fetch data at build time", code: false },
      { text: "To handle server-side data fetching at runtime", code: false },
      { text: "To generate dynamic API routes", code: false },
      { text: "To optimize client-side rendering", code: false },
    ],
    answer: "To handle server-side data fetching at runtime",
    explanation: {
      text: "getServerSideProps fetches data on the server for every request, enabling server-side rendering.",
      code: false,
    },
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// JAVASCRIPT QUESTIONS

export const javascriptQuestions = [
  {
    id: 1,
    topic: "JavaScript",
    question: "What will this code output?",
    code: `function foo() {
 return bar();
 function bar() {
 return "Hello!";
 }
}
console.log(foo());`,
    language: "javascript",
    options: [
      {
        text: `"Hello!"`,
        code: false,
      },
      {
        text: `"undefined"`,
        code: false,
      },
      {
        text: `ReferenceError`,
        code: false,
      },
      {
        text: `SyntaxError`,
        code: false,
      },
    ],
    answer: `"Hello!"`,
    explanation: {
      text: "Functions in JavaScript are hoisted, allowing `bar` to be accessible within `foo`.",
      code: false,
    },
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// NODE JS QUESTIONS

export const nodeJsQuestions = [
  {
    id: 1,
    topic: "Node.js",
    question: "Which module in Node.js is used to work with file systems?",
    code: false,
    language: false,
    options: [
      { text: "fs", code: false },
      { text: "path", code: false },
      { text: "http", code: false },
      { text: "os", code: false },
    ],
    answer: "fs",
    explanation: {
      text: "The 'fs' module provides an API for interacting with the file system.",
      code: false,
    },
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// REACT NATIVE QUESTIONS

export const reactNativeQuestions = [
  {
    id: 1,
    topic: "React Native",
    question: "What is the purpose of React Native?",
    code: false,
    language: false,
    options: [
      {
        text: "To build cross-platform mobile apps using JavaScript",
        code: false,
      },
      { text: "To create backend servers", code: false },
      { text: "To optimize web apps for mobile devices", code: false },
      { text: "To manage mobile databases", code: false },
    ],
    answer: "To build cross-platform mobile apps using JavaScript",
    explanation: {
      text: "React Native is used to build native-like mobile applications for iOS and Android using JavaScript and React.",
      code: false,
    },
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// API QUESTIONS

export const apiQuestions = [
  {
    id: 1,
    topic: "API",
    question: "What does the HTTP status code 404 indicate?",
    code: false,
    language: false,
    options: [
      { text: "Server error", code: false },
      { text: "Resource not found", code: false },
      { text: "Successful request", code: false },
      { text: "Unauthorized access", code: false },
    ],
    answer: "Resource not found",
    explanation: {
      text: "The HTTP status code 404 indicates that the requested resource could not be found on the server.",
      code: false,
    },
  },
];
