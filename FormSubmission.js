const express = require("express");
const EventEmitter = require("events");

const app = express();
app.use(express.urlencoded({ extended: true })); // Parse form data

// Create EventEmitter
const formEvents = new EventEmitter();

// Listen for "formSubmitted" event
formEvents.on("formSubmitted", (name) => {
  console.log(`Form submitted by: ${name}`);
});

// POST /submit - Handle form submission
app.post("/submit", (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).send("Please provide a name.");
  }
  formEvents.emit("formSubmitted", name.trim()); // Trigger event
  res.send("Form submitted successfully!");
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});