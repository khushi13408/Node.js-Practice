// server.js
const express = require("express");
const quotes = require("./quotes");

const app = express();

// Middleware to parse JSON POST data
app.use(express.json());

// GET /quote - Random quote
app.get("/quote", (req, res) => {
  res.send(quotes.getQuote());
});

// GET /info - App info
app.get("/info", (req, res) => {
  res.send(`App: ${quotes.info.name}, Version: ${quotes.info.version}`);
});

// GET /quotes - All quotes
app.get("/quotes", (req, res) => {
  res.send(quotes.quotes);
});

// GET /quote/:index - Specific quote by index
app.get("/quote/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= quotes.quotes.length) {
    return res.status(400).send("Error: Invalid quote index.");
  }
  res.send(quotes.quotes[index]);
});

// POST /submit - Add a new quote
app.post("/submit", (req, res) => {
  try {
    const quote = req.body.quote;
    res.send(quotes.add(quote));
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

// Default route for unknown URLs
app.use((req, res) => {
  res.status(404).send("Visit /quote, /info, /quotes, /quote/:index (e.g., /quote/0), or POST to /submit!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});