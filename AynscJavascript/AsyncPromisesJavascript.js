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
app.get("/quote", (req, res) => {
  fs.readFile("Asynchronous_JS/quotes_ForAsynchronous_JS.txt", "utf8")
    .then(data => {
      // Split file content into an array of quotes
      const quotes = data.split("\n").filter(quote => quote.trim() !== "");
      // Pick a random quote
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      res.send(randomQuote);
    })
    .catch(err => {
      res.status(500).send("Error reading quotes file.");
    });
});

// GET /all-quotes - All quotes
app.get("/all-quotes", (req, res) => {
  fs.readFile("Asynchronous_JS/quotes_ForAsynchronous_JS.txt", "utf8")
    .then(data => {
      const quotes = data.split("\n").filter(quote => quote.trim() !== "");
      res.json(quotes); // Send as JSON array
    })
    .catch(err => res.status(500).send("Error reading quotes file."));
});


// POST /add-quote - Append a new quote to file
app.post("/add-quote", (req, res) => {
  const newQuote = req.body.quote;
  if (!newQuote || typeof newQuote !== "string" || newQuote.trim() === "") {
    return res.status(400).send("Error: Please provide a valid quote.");
  }
  fs.appendFile("quotes_ForAsynchronous_JS.txt", `\n${newQuote.trim()}`, "utf8")
    .then(() => res.send("Quote added successfully!"))
    .catch(err => res.status(500).send("Error saving quote."));
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});