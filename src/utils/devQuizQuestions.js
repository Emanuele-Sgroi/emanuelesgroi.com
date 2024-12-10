import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";

// CORE CONCEPTS
export const coreConceptsQuestions = [
  {
    id: 1,
    topic: "Core Concepts",
    question: "What is polymorphism in OOP?",
    language: false,
    code: false,
    options: [
      {
        text: "A method in multiple classes with the same name but different implementations",
        code: false,
      },
      { text: "A way to store multiple objects in one variable", code: false },
      { text: "An inheritance mechanism", code: false },
      { text: "A way to encapsulate data", code: false },
    ],
    answer:
      "A method in multiple classes with the same name but different implementations",
    explanation: {
      text: "Polymorphism allows a single interface to represent different underlying forms (data types).",
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
