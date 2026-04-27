export interface Lesson {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  content: string;
  exampleCode: string;
  tryItCode: string;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn what programming is and why it matters in today's world",
    icon: "💡",
    difficulty: "Beginner",
    content: `
# Welcome to Programming!

Programming is giving instructions to a computer to perform specific tasks. Think of it like writing a recipe - you list each step in order, and the computer follows them exactly.

## Why Learn Programming?

- **Problem Solving**: Programming teaches you to break down complex problems into smaller, manageable pieces
- **Career Opportunities**: Developers are in high demand across all industries
- **Creativity**: Build apps, websites, games, and tools from scratch
- **Automation**: Save time by automating repetitive tasks

## How Computers Follow Instructions

Computers execute code line by line, from top to bottom. Each instruction tells the computer exactly what to do:

1. Do this first
2. Then do this
3. Next, do this
4. And so on...

The key is being precise - computers do exactly what you tell them, not what you *meant* to tell them!
    `,
    exampleCode: `// Your first program!
console.log("Hello, World!");

// This prints a message to the screen
// The computer reads this and outputs: Hello, World!`,
    tryItCode: `// Try it yourself!
// Print a greeting to the console
console.log("Hello, CodeLearn!");`
  },
  {
    id: 2,
    title: "Variables and Data Types",
    description: "Store and manipulate data using variables",
    icon: "📦",
    difficulty: "Beginner",
    content: `
# Variables and Data Types

Variables are like labeled boxes where you can store information. Each box has a name and holds a specific type of data.

## What are Variables?

A variable is a container for storing data values. Think of it as a jar with a label:

\`\`\`
let age = 25;  // The jar is labeled "age" and holds 25
let name = "Alex";  // The jar is labeled "name" and holds "Alex"
\`\`\`

## Common Data Types

### Numbers (Number)
Used for mathematical operations:
\`\`\`
let price = 19.99;
let count = 42;
\`\`\`

### Text (String)
Used for words and messages:
\`\`\`
let greeting = "Hello!";
let username = "coder123";
\`\`\`

### True/False (Boolean)
Used for decisions:
\`\`\`
let isLearning = true;
let isComplete = false;
\`\`\`

## Declaring Variables

In JavaScript, we use keywords to create variables:

- \`let\` - Can be changed later
- \`const\` - Cannot be changed (constant)
- \`var\` - Old way (avoid using)

Example:
\`\`\`
let score = 100;      // Can be updated
const maxScore = 100;  // Stays the same
\`\`\`
    `,
    exampleCode: `// Creating variables
let playerName = "Explorer";
let playerLevel = 1;
let isPlaying = true;
let healthPoints = 100;

// Display them
console.log("Player:", playerName);
console.log("Level:", playerLevel);
console.log("Health:", healthPoints);`,
    tryItCode: `// Create your own variables!
let myName = "Your Name";
let myAge = 25;
let likesCoding = true;

console.log("Name:", myName);
console.log("Age:", myAge);
console.log("Likes coding:", likesCoding);`
  },
  {
    id: 3,
    title: "Conditional Statements",
    description: "Make decisions in your code with if/else statements",
    icon: "🔀",
    difficulty: "Beginner",
    content: `
# Conditional Statements

Conditional statements allow your program to make decisions based on conditions. It's like choosing different paths based on what you encounter!

## The If Statement

\`\`\`
if (condition) {
  // This code runs if the condition is true
}
\`\`\`

Example:
\`\`\`
let age = 18;

if (age >= 18) {
  console.log("You can vote!");
}
\`\`\`

## If-Else Statements

Add an alternative when the condition is false:

\`\`\`
let score = 75;

if (score >= 60) {
  console.log("You passed!");
} else {
  console.log("Try again!");
}
\`\`\`

## Comparison Operators

- \`===\` - Exactly equal to
- \`!==\` - Not equal to
- \`>\` - Greater than
- \`<\` - Less than
- \`>=\` - Greater than or equal
- \`<=\` - Less than or equal

## Multiple Conditions

Use logical operators to combine conditions:

- \`&&\` - AND (both must be true)
- \`||\` - OR (at least one must be true)
- \`!\` - NOT (inverts the condition)

\`\`\`
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("You can drive!");
}
\`\`\`
    `,
    exampleCode: `// Conditional examples
let temperature = 25;

if (temperature > 30) {
  console.log("It's hot! 🔥");
} else if (temperature > 20) {
  console.log("Nice weather! ☀️");
} else if (temperature > 10) {
  console.log("A bit cool! 🍂");
} else {
  console.log("It's cold! ❄️");
}

// Try changing the temperature!
let score = 85;
let passed = score >= 60;
let excellent = score >= 90;

console.log("Passed:", passed);
console.log("Excellent:", excellent);`,
    tryItCode: `// Try it yourself!
let score = 75;

// Write your if-else statement below:
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Keep practicing!");
}`
  },
  {
    id: 4,
    title: "Loops",
    description: "Repeat actions efficiently with loops",
    icon: "🔄",
    difficulty: "Intermediate",
    content: `
# Loops

Loops let you repeat code multiple times without writing it over and over. This is one of the most powerful concepts in programming!

## For Loops

Use when you know how many times to repeat:

\`\`\`
for (let i = 0; i < 5; i++) {
  console.log(i);  // Prints 0, 1, 2, 3, 4
}
\`\`\`

Parts of a for loop:
1. **Start**: \`let i = 0\` - Where to begin
2. **Condition**: \`i < 5\` - When to stop
3. **Update**: i increments - How to move forward

## While Loops

Use when you don't know how many times:

\`\`\`
let count = 0;

while (count < 3) {
  console.log("Counting:", count);
  count++;
}
\`\`\`

## Looping Through Arrays

\`\`\`
let fruits = ["apple", "banana", "orange"];

for (let fruit of fruits) {
  console.log(fruit);
}
\`\`\`

## Common Loop Patterns

### Counting from 1 to 10:
\`\`\`
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
\`\`\`

### Finding the sum:
\`\`\`
let numbers = [1, 2, 3, 4, 5];
let sum = 0;

for (let num of numbers) {
  sum = sum + num;
}
console.log("Total:", sum);  // 15
\`\`\`
    `,
    exampleCode: `// For loop - counting
console.log("Counting to 5:");
for (let i = 1; i <= 5; i++) {
  console.log("Number:", i);
}

// While loop example
console.log("\\nWhile loop:");
let countdown = 3;
while (countdown > 0) {
  console.log("Countdown:", countdown);
  countdown--;
}
console.log("Blast off! 🚀");

// Loop through array
let colors = ["Red", "Green", "Blue"];
console.log("\\nColors:");
for (let color of colors) {
  console.log(color);
}`,
    tryItCode: `// Try a for loop!
console.log("Multiplication table for 2:");
for (let i = 1; i <= 5; i++) {
  let result = 2 * i;
  console.log("2 x " + i + " = " + result);
}`
  },
  {
    id: 5,
    title: "Functions",
    description: "Create reusable blocks of code",
    icon: "⚙️",
    difficulty: "Intermediate",
    content: `
# Functions

Functions are reusable blocks of code that perform a specific task. Instead of writing the same code multiple times, you can wrap it in a function and call it when needed!

## Creating a Function

\`\`\`
function greet() {
  console.log("Hello!");
}
\`\`\`

To use it, call the function:
\`\`\`
greet();  // Outputs: Hello!
\`\`\`

## Functions with Parameters

Pass information into functions:

\`\`\`
function sayHello(name) {
  console.log("Hello, " + name + "!");
}

sayHello("Alex");  // Hello, Alex!
sayHello("Sam");   // Hello, Sam!
\`\`\`

## Functions that Return Values

Use \`return\` to get a result:

\`\`\`
function add(a, b) {
  return a + b;
}

let sum = add(5, 3);  // sum is 8
console.log(add(10, 20)); // 30
\`\`\`

## Arrow Functions

Modern shorthand:

\`\`\`
const multiply = (a, b) => a * b;

console.log(multiply(4, 5));  // 20
\`\`\`

## Why Use Functions?

1. **Reusability**: Write once, use many times
2. **Organization**: Break code into logical pieces
3. **Maintenance**: Fix bugs in one place
4. **Clarity**: Make code easier to read
    `,
    exampleCode: `// Simple function
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));
console.log(greet("CodeLearn"));

// Function with calculation
function calculateArea(width, height) {
  return width * height;
}

console.log("Area of 5x3:", calculateArea(5, 3));
console.log("Area of 10x10:", calculateArea(10, 10));

// Arrow function
const isEven = (num) => num % 2 === 0;

console.log("Is 4 even?", isEven(4));
console.log("Is 7 even?", isEven(7));`,
    tryItCode: `// Try creating functions!
function double(number) {
  return number * 2;
}

console.log("Double of 5:", double(5));
console.log("Double of 10:", double(10));

// Create your own function
function add(a, b) {
  return a + b;
}

console.log("5 + 3 =", add(5, 3));`
  }
];