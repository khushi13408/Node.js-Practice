// 1). What is Express.js?
// Express.js is a popular Node.js package (or framework) that makes building web servers easier, faster, and more organized. 
// It’s like a pre-built toolkit for your server, providing simple ways to handle routing, HTTP methods (GET, POST, etc.), and other web tasks. 
// Think of it as upgrading from a basic lemonade stand (using the http module) to a high-tech food truck with an automated order system.

// Analogy for better understanding :-

// Your previous server.js with the http module  was like running a lemonade stand where you manually 
//checked each customer’s order and prepared drinks with basic tools. Express.js is like getting a shiny food truck 
// with a menu board, an order-taking app, and pre-made recipes,so you can serve customers faster and handle more complex 
// orders (like dynamic routes or form submissions) with less code.


// ~ Below is the same routing as it is in Advancerouting.js file but here it is done by using express.js package and here we are using the 
//    same greeting file that is used in advanceRouting.js file i.e. AdvanceroutingGreetings.js file.
// ~ Express.js provides a simple way to handle routing, HTTP methods, and other web tasks so that's why here it looks more easy and sorted.


// server.js
const express = require("express");
const greetings = require("./AdvanceRoutingGreetings");

const app = express();

// Middleware to parse JSON POST data
app.use(express.json());

// Route 1: GET /greeting
app.get("/greeting", (req, res) => {
  res.send(greetings.greet(greetings.user));
});

// Route 2: GET /version
app.get("/version", (req, res) => {
  res.send(`App Version: ${greetings.version}`);
});

// Route 3: GET /user
app.get("/user", (req, res) => {
  res.send(`User: ${greetings.user.name}, Email: ${greetings.user.email}`);
});

//email route
app.get("/email", (req, res) => {
  res.send(`Email: ${greetings.user.email}`);
});

// Route 4: GET /greeting/:name (dynamic route)
app.get("/greeting/:name", (req, res) => {
  const name = req.params.name;
  if (name) {
    res.send(greetings.greet({ name, age: "unknown" }));
  } else {
    res.status(400).send("Error: Please provide a name in the URL (e.g., /greeting/Alice)");
  }
});

// Route 5: POST /greeting
app.post("/greeting", (req, res) => {
  const data = req.body;
  if (data.name) {
    res.send(greetings.greet({ name: data.name, age: data.age || "unknown" }));
  } else {
    res.status(400).send("Error: Please send a name in the POST data");
  }
});

// Default route for unknown URLs
app.use((req, res) => {
  res.status(404).send("Visit /greeting, /version, /user, or /greeting/:name (e.g., /greeting/Alice). Use POST for /greeting!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});