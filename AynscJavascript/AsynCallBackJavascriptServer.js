// Topic: Asynchronous JavaScript (with Callbacks)

// What is Asynchronous JavaScript?

// JavaScript (and Node.js) is single-threaded, meaning it can only do one task at a time. But many tasks, 
// like fetching data from a server, reading a file, or waiting for a user’s input, take time. Asynchronous 
// JavaScript lets your program start these tasks and move on to other work while waiting for them to finish,
//  instead of freezing. When the task is done, a callback function runs to handle the result.

// Analogy:-
//  Imagine your lemonade stand. A customer orders a lemonade, but squeezing lemons takes time. 
// Instead of standing idle, you take the order, start squeezing lemons in the background, and serve other
// customers. When the lemons are ready, you finish the order and call the customer back to deliver the drink.
// The “call back” is like a callback function—a function you give to Node.js to run when the task is done.

// Why It Matters:-

// Non-blocking: Your server stays responsive, e.g., handling multiple HTTP requests (like in your Quote App API).
// Real-world Use: Essential for tasks like database queries, file operations, or API calls.
// Connects to Your Lessons: Your http server and Express API used async code (e.g., req.on("data") for POST requests) without you realizing it!
// Key Concepts
// Synchronous Code: Runs line by line, waiting for each task to finish (e.g., a for loop).
// Asynchronous Code: Starts a task, moves on, and runs a callback when the task is done.
// Callbacks: Functions passed to another function to handle the result of an async task.
// Node.js APIs: Many built-in functions (e.g., fs.readFile) use callbacks for async operations.







// server.js file:-

const express = require("express");
const fs = require("fs"); // Core module for file operations

const app = express();
app.use(express.json());

// GET / - Welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the Async Quote API!");
});

// GET /quote - Random quote from file
app.get("/quote", (req, res) => {
  // Read quotes.txt asynchronously
  fs.readFile("quotes_ForAsynchronous_JS.txt", "utf8", (err, data) => {
    if (err) {
      // Handle error (e.g., file not found)
      res.status(500).send("Error reading quotes file.");
      return;
    }
    // Split file content into an array of quotes
    const quotes = data.split("\n").filter(quote => quote.trim() !== "");
// Splits the file content (a string) into an array of quotes, removing empty lines.
// Example: "Quote1\nQuote2\n" becomes ["Quote1", "Quote2"].

    // Pick a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.send(randomQuote);
  });
});

// POST /add-quote - Added a new quote for adding new quotes
app.post("/add-quote", (req, res) => {
  const newQuote = req.body.quote;
  if (!newQuote || typeof newQuote !== "string" || newQuote.trim() === "") {
    return res.status(400).send("Error: Please provide a valid quote.");
  }
  // Append quote to file asynchronously
  fs.appendFile("quotes_ForAsynchronous_JS.txt", `\n${newQuote.trim()}`, "utf8", (err) => {
    if (err) {
      return res.status(500).send("Error saving quote.");
    }
    res.send("Quote added successfully!");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});



// How You Learned Callbacks with fs.readFile and Built an Async API

// Context:-

// In the Asynchronous JavaScript lesson, we introduced how Node.js handles 
// time-consuming tasks (like reading files or processing HTTP requests) without
// freezing your app. You learned to use callbacks with the fs (File System) core 
// module’s fs.readFile method to read data asynchronously and built a simple
// Express.js API to serve that data. This built on your knowledge of Modules,
// Routing, NPM, and Express.js from projects like the Quote App and Coffee Shop API.

// Analogy:-
//  Your lemonade stand (Node.js server) got a new trick: instead of waiting
//  idly while fetching lemons from the back (reading a file), you start the task, 
// serve other customers, and get a “call back” when the lemons are ready.
//  This is async programming with callbacks, and your API delivers the results to customers (clients).