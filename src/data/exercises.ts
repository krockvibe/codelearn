export interface Exercise {
  id: number;
  question: string;
  type: "multiple-choice" | "code";
  options?: string[];
  correctAnswer: string | number;
  hint: string;
  solution: string;
  difficulty: "Beginner" | "Intermediate";
}

export const exercises: Exercise[] = [
  {
    id: 1,
    question: "What does console.log() do?",
    type: "multiple-choice",
    options: [
      "Logs the user into the system",
      "Prints output to the console",
      "Creates a new variable",
      "Deletes a file"
    ],
    correctAnswer: "Prints output to the console",
    hint: "It's used to display information to the user.",
    solution: "console.log() prints the specified message or value to the console/terminal.",
    difficulty: "Beginner"
  },
  {
    id: 2,
    question: "Which keyword is used to declare a variable that cannot be changed?",
    type: "multiple-choice",
    options: ["var", "let", "const", "variable"],
    correctAnswer: "const",
    hint: "Think about the word 'constant' - something that stays the same.",
    solution: "const declares a constant variable that cannot be reassigned.",
    difficulty: "Beginner"
  },
  {
    id: 3,
    question: "What is the result of: 10 + '5'?",
    type: "multiple-choice",
    options: ["15", "105", "NaN", "Error"],
    correctAnswer: "105",
    hint: "When you add a number to a string, JavaScript converts the number to a string.",
    solution: "JavaScript converts 10 to '10' and concatenates: '10' + '5' = '105'",
    difficulty: "Beginner"
  },
  {
    id: 4,
    question: "Which operator checks for exact equality?",
    type: "multiple-choice",
    options: ["==", "===", "=", "!="],
    correctAnswer: "===",
    hint: "It's three equals signs in a row.",
    solution: "=== checks strict equality (both value and type).",
    difficulty: "Beginner"
  },
  {
    id: 5,
    question: "What will this code print? let x = 5; console.log(x++);",
    type: "multiple-choice",
    options: ["5", "6", "4", "Error"],
    correctAnswer: "5",
    hint: "The increment happens after the value is used.",
    solution: "x++ returns the original value (5), then increments to 6.",
    difficulty: "Beginner"
  },
  {
    id: 6,
    question: "What is the correct way to create an array in JavaScript?",
    type: "multiple-choice",
    options: [
      "let items = (1, 2, 3)",
      "let items = [1, 2, 3]",
      "let items = {1, 2, 3}",
      "let items = <1, 2, 3>"
    ],
    correctAnswer: "let items = [1, 2, 3]",
    hint: "Arrays use square brackets to hold multiple values.",
    solution: "Arrays are created using square brackets: let items = [1, 2, 3]",
    difficulty: "Beginner"
  },
  {
    id: 7,
    question: "How do you access the first element of an array?",
    type: "multiple-choice",
    options: [
      "array[0]",
      "array[1]",
      "array.first",
      "array.get(0)"
    ],
    correctAnswer: "array[0]",
    hint: "Arrays are zero-indexed, meaning the first element is at index 0.",
    solution: "JavaScript arrays start at index 0, so array[0] gives the first element.",
    difficulty: "Beginner"
  },
  {
    id: 8,
    question: "What does the following loop do? for (let i = 0; i < 3; i++)",
    type: "multiple-choice",
    options: [
      "Loops 2 times",
      "Loops 3 times",
      "Loops 4 times",
      "Loops forever"
    ],
    correctAnswer: "Loops 3 times",
    hint: "Count: i goes 0, 1, 2 - that's 3 iterations.",
    solution: "It iterates when i is 0, 1, and 2 - three times total.",
    difficulty: "Beginner"
  },
  {
    id: 9,
    question: "What is the output? typeof 42",
    type: "multiple-choice",
    options: ["string", "number", "integer", "decimal"],
    correctAnswer: "number",
    hint: "JavaScript doesn't have separate types for integers and decimals.",
    solution: "All numbers in JavaScript are of type 'number'.",
    difficulty: "Beginner"
  },
  {
    id: 10,
    question: "Which method adds an element to the end of an array?",
    type: "multiple-choice",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
    hint: "Think of pushing something onto a stack.",
    solution: "push() adds an element to the end of an array.",
    difficulty: "Beginner"
  },
  {
    id: 11,
    question: "What does this code return? Math.floor(4.7)",
    type: "multiple-choice",
    options: ["4", "5", "4.7", "Error"],
    correctAnswer: "4",
    hint: "floor means rounding down to the nearest whole number.",
    solution: "Math.floor() rounds down, so 4.7 becomes 4.",
    difficulty: "Intermediate"
  },
  {
    id: 12,
    question: "What is the correct syntax for an arrow function?",
    type: "multiple-choice",
    options: [
      "function = () => {}",
      "const f = () => {}",
      "=> function () {}",
      "() => function {}"
    ],
    correctAnswer: "const f = () => {}",
    hint: "Arrow functions use the => symbol.",
    solution: "Arrow functions use arrow syntax: const name = () => {}",
    difficulty: "Intermediate"
  }
];