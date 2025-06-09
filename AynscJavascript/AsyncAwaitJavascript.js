

// We’ll update the Async Quote App (from the Promises lesson) to use async/await instead of .then/.catch. The app will:

// Read quotes from quotes_ForAsynchronous_JS.txt using fs.promises.readFile.
// Serve them via an Express API with three endpoints:
// GET /: Welcome message.
// GET /quote: Random quote from the file.
// POST /add-quote: Append a new quote to the file.





// server.js
const express = require("express");
const fs = require("fs").promises; // Use fs.promises for Promise-based API

const app = express();
app.use(express.json()); // Parse JSON for POST requests

// GET / - Welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the Pizza Shop Quote API!");
});

// GET /quote - Random quote from file
app.get("/quote", async (req, res) => {
  try {
    // Read file using await
    const data = await fs.readFile("quotes_ForAsynchronous_JS.txt", "utf8");
    // Split file content into an array of quotes
    const quotes = data.split("\n").filter(quote => quote.trim() !== "");
    // Pick a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.send(randomQuote);
  } catch (err) {
    res.status(500).send("Error reading quotes file.");
  }
});

// POST /add-quote - Append a new quote to file
app.post("/add-quote", async (req, res) => {
  try {
    const newQuote = req.body.quote;
    if (!newQuote || typeof newQuote !== "string" || newQuote.trim() === "") {
      return res.status(400).send("Error: Please provide a valid quote.");
    }
    // Append quote using await
    await fs.appendFile("quotes_ForAsynchronous_JS.txt", `\n${newQuote.trim()}`, "utf8");
    res.send("Quote added successfully!");
  } catch (err) {
    res.status(500).send("Error saving quote.");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});




// Line-by-Line Explanation:-

// 1. const express = require("express");
//      Imports Express, like setting up your pizza shop’s order counter (from your Express lessons).

//2. const fs = require("fs").promises;
//      Imports the Promise-based fs module, like in the Promises lesson. Methods like fs.promises.readFile return Promises, perfect for async/await.

// 3. const app = express(); app.use(express.json());
//      Creates an Express app and parses JSON for POST requests, like your Quote App and Async Quote App.

// 4. app.get("/", ...);
//      A simple GET endpoint, like GET / in your previous APIs.

// 5.  app.get("/quote", async (req, res) => { ... });
//   ->  An async function for GET /quote:
//          async: Marks the function as asynchronous, allowing await and returning a Promise.
//          try { ... }: Runs code that might throw errors (rejected Promises).
//          const data = await fs.readFile("quotes.txt", "utf8");: Waits for the file read to resolve, assigning the result to data.
//          Processes data into a quotes array, picks a random quote, and sends it.
//          catch (err) { ... }: Handles errors (e.g., file not found) with a 500 status.
//          Analogy: You ask the chef for recipes and wait (await) for the pizza (data). If something burns (err), you apologize to the customer.

// 6. app.post("/add-quote", async (req, res) => { ... });
//   -> An async function for POST /add-quote:
//       Validates req.body.quote to ensure it’s a non-empty string.
//       await fs.appendFile("quotes.txt", ...);: Waits for the append operation to complete.
//       Sends a success message or catches errors.
//       Analogy: You wait for the chef to add a new recipe to the book, then confirm the order.

// 7. app.listen(3000, ...);
//     Starts the server, like your previous Express servers.









