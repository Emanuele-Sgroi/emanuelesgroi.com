// CORE CONCEPTS

export const coreConceptsQuestions = [
  {
    id: 1,
    question: "What is polymorphism in OOP?",
    options: [
      "A method in multiple classes with the same name but different implementations",
      "A way to store multiple objects in one variable",
      "An inheritance mechanism",
      "A way to encapsulate data",
    ],
    answer:
      "A method in multiple classes with the same name but different implementations",
    explanation:
      "Polymorphism allows a single interface to represent different underlying forms (data types).",
  },
  {
    id: 2,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: "O(log n)",
    explanation:
      "Binary search divides the search interval in half with each step, leading to a logarithmic time complexity.",
  },
  {
    id: 3,
    question: "What is a linked list?",
    options: [
      "A list where elements are stored in contiguous memory",
      "A sequence of nodes where each node points to the next",
      "A data structure for LIFO operations",
      "A tree-like hierarchical structure",
    ],
    answer: "A sequence of nodes where each node points to the next",
    explanation:
      "A linked list is a dynamic data structure where each node contains data and a reference to the next node.",
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//REACT QUESTIONS

export const reactQuestions = [
  {
    id: 1,
    question: "What is the purpose of React's useEffect hook?",
    options: [
      "To manage state in a component",
      "To handle side effects in a functional component",
      "To render JSX",
      "To optimize performance",
    ],
    answer: "To handle side effects in a functional component",
    explanation:
      "useEffect is used to perform side effects like data fetching, subscriptions, or DOM manipulations.",
  },
  {
    id: 2,
    question: "What is the virtual DOM in React?",
    options: [
      "A direct copy of the browser DOM",
      "An abstraction of the DOM used to optimize rendering",
      "A database for React components",
      "A debugging tool for React apps",
    ],
    answer: "An abstraction of the DOM used to optimize rendering",
    explanation:
      "The virtual DOM is a lightweight representation of the DOM used to improve React's rendering performance.",
  },
  {
    id: 3,
    question: "What is a React fragment?",
    options: [
      "A small part of a React component",
      "A tool for managing state",
      "A wrapper that allows returning multiple elements without adding extra nodes",
      "A way to fetch data in React",
    ],
    answer:
      "A wrapper that allows returning multiple elements without adding extra nodes",
    explanation:
      "React fragments let you group multiple elements without adding a parent node to the DOM.",
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// NEXT JS QUESTIONS

export const nextQuestions = [
  {
    id: 1,
    question: "What is getServerSideProps in Next.js?",
    options: [
      "To fetch data at build time",
      "To handle server-side data fetching at runtime",
      "To generate dynamic API routes",
      "To optimize client-side rendering",
    ],
    answer: "To handle server-side data fetching at runtime",
    explanation:
      "getServerSideProps fetches data on the server for every request, enabling server-side rendering.",
  },
  {
    id: 2,
    question: "What is the purpose of the _app.js file in Next.js?",
    options: [
      "To define the main layout of the app",
      "To add global styles and behaviors",
      "To configure API routes",
      "To initialize the server",
    ],
    answer: "To add global styles and behaviors",
    explanation:
      "The _app.js file in Next.js is used to customize and control the root component of the application.",
  },
  {
    id: 3,
    question: "What is static site generation (SSG) in Next.js?",
    options: [
      "A method to render pages on the server at runtime",
      "A way to fetch data on the client side",
      "Pre-rendering pages at build time for improved performance",
      "A feature for generating dynamic API routes",
    ],
    answer: "Pre-rendering pages at build time for improved performance",
    explanation:
      "SSG generates static HTML files at build time, making it faster for users while reducing server load.",
  },
];

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// JAVASCRIPT QUESTIONS

export const javascriptQuestions = [
  {
    id: 1,
    question: `What will the following code log?
  
  console.log(typeof null);`,
    options: ['"null"', '"undefined"', '"object"', '"number"'],
    answer: '"object"',
    explanation:
      "The `typeof` operator returns 'object' for `null` due to a historical bug in JavaScript.",
  },
  {
    id: 2,
    question: "What is a closure in JavaScript?",
    options: [
      "A function bundled with its lexical environment",
      "A way to declare variables",
      "A method to define private variables",
      "A callback function",
    ],
    answer: "A function bundled with its lexical environment",
    explanation:
      "A closure allows a function to access variables from its enclosing scope even after that scope has closed.",
  },
  {
    id: 3,
    question: `What is the output of this code?
  
  const a = []; 
  a[3] = 42; 
  console.log(a.length);`,
    options: ["3", "4", "0", "undefined"],
    answer: "4",
    explanation:
      "The length property reflects the highest index + 1, so adding an element at index 3 results in length 4.",
  },
];
