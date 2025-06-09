// ADVANCE ROUTING IN NODE.JS :-(http based routing)


// server.js
const http = require("http");
const greetings = require("./AdvanceRoutingGreetings");

http.createServer((req, res) => {
  // Extract URL and HTTP method
  const url = req.url;
  const method = req.method;

  try {
    // Route 1: GET /greeting - Show default greeting
    if (method === "GET" && url === "/greeting") {
      res.write(greetings.greet(greetings.user));
    }
    // Route 2: GET /version - Show app version
    else if (method === "GET" && url === "/version") {
      res.write(`App Version: ${greetings.version}`);
    }
    // Route 3: GET /user - Show user details
    else if (method === "GET" && url === "/user") {
      res.write(`User: ${greetings.user.name}, Email: ${greetings.user.email}`);
    }
    // Route 4: GET /greeting/:name - Dynamic greeting with URL parameter
    else if (method === "GET" && url.startsWith("/greeting/")) {
      const name = url.split("/")[2]; // Get the name after /greeting/
      if (name) {
        res.write(greetings.greet({ name, age: "unknown" }));
      } else {
        throw new Error("Please provide a name in the URL (e.g., /greeting/Alice)");
      }
    }

    //Understand the flow of route 4 code:-

    // ~ User visits http://localhost:3000/greeting/Alice:
    //   # method is “GET”, and url is /greeting/Alice.
    //   # url.startsWith("/greeting/") is true, so the block runs.
    //   # url.split("/")[2] gives Alice.
    //   # if (name) is true (since name is “Alice”).
    //   # greetings.greet({ name: "Alice", age: "unknown" }) returns “Hello, Alice! You are unknown years old.”
    //   # res.write sends this to the browser.
    // ~ User visits http://localhost:3000/greeting/:
    //   # url.split("/")[2] gives "" (empty string).
    //   # if (name) is false.
    //   # throw new Error triggers, and the server sends the error message.




    // Route 5: POST /greeting - Simulate handling form data
    else if (method === "POST" && url === "/greeting") {
      let body = "";
      // Collect data sent in the POST request
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const data = JSON.parse(body); // Parse JSON data
          if (data.name) {
            res.write(greetings.greet({ name: data.name, age: data.age || "please provide age" }));
          } else {
            throw new Error("Please send a name in the POST data");
          }
        } catch (error) {
          res.write(`Error: ${error.message}`);
        }
        res.end();
      });
      return; // Exit early since POST handling is async
    }

// Understand the flow of route 5:-

    //~ User sends a POST request to http://localhost:3000/greeting with { "name": "Bob", "age": 30 }:
    //   #  method is “POST”, and url is /greeting.
    //   #  body collects the JSON string.
    //   #  JSON.parse creates { name: "Bob", age: 30 }.
    //   #  data.name exists, so greetings.greet({ name: "Bob", age: 30 }) returns “Hello, Bob! You are 30 years old.”
    //   Browser shows the greeting.
    //~ User sends { "age": 30 } (no name):
    //   # data.name is missing, so an error is thrown and shown: “Error: Please send a name in the POST data.”
    //~ User sends invalid JSON (e.g., "{ bad json }"):
    //   # JSON.parse throws an error, caught and shown as “Error: Unexpected token b in JSON...”.



    // Default route: Handle unknown URLs
    else {
      res.write("Visit /greeting, /version, /user, or /greeting/:name (e.g., /greeting/Alice). Use POST for /greeting!");
    }
    res.end();
  } catch (error) {
    res.write(`Error: ${error.message}`);
    res.end();
  }
}).listen(3000);

console.log("Server running at http://localhost:3000");







// Line-by-Line Explanation of the New Routing:- 

// Key Additions:-

// ~ HTTP Methods: We now check req.method (e.g., “GET” or “POST”) to handle different types of requests.
// ~ Dynamic Route: /greeting/:name (e.g., /greeting/Alice) uses a URL parameter to customize the greeting.
// ~ POST Handling: We handle POST requests to /greeting, simulating a form where users send data (like a name).

// Line-by-Line Breakdown

// 1. const url = req.url; const method = req.method;
//      Stores the URL (e.g., /greeting) and HTTP method (e.g., “GET” or “POST”) for easier use.
//      Analogy: The host writes down the customer’s table name (URL) and how they’re ordering (in-person for GET, delivery for POST).

// 2. try { ... } catch (error) { ... }
//     Wraps the routing logic to catch errors (e.g., invalid URL parameters) and send a friendly message instead of crashing.
//     Analogy: If the host makes a mistake (like forgetting a dish), they apologize instead of closing the restaurant.

//3.  Route 1: if (method === "GET" && url === "/greeting")
//      Matches GET requests to /greeting and sends the default greeting.
//      Analogy: A customer asks for the standard lemonade, and the host serves it using the recipe (greetings.greet).

// 4. Route 2 & 3: /version and /user
//     Same as your original code but now checks for GET explicitly.
//     Analogy: Customers asking for the version or user info get their specific dishes.

//5.  Route 4: else if (method === "GET" && url.startsWith("/greeting/"))
//      Matches URLs like /greeting/Alice or /greeting/Bob.
//      url.split("/")[2]: Splits the URL (e.g., /greeting/Alice → ["", "greeting", "Alice"]) and grabs the name (Alice).
//      If no name is provided (e.g., /greeting/), it throws an error.
//      Analogy: A customer says, “I’m Alice, give me a custom lemonade!” The host makes a drink just for Alice.

// 6. Route 5: else if (method === "POST" && url === "/greeting")
//      Handles POST requests, where users send data (e.g., a form with a name).
//      req.on("data", ...): Collects data sent by the user (like a JSON object { "name": "Alice" }).
//      req.on("end", ...): When all data is received, parses it and sends a greeting.
//      Analogy: A customer sends a delivery order with their name. The host reads the order, makes the drink, and sends it back.
//      Note: POST handling is asynchronous (data arrives in chunks), so we return early to avoid calling res.end() twice.

// 7. Default Route: else { ... }
//      Catches unknown URLs or methods and sends a helpful message.
//      Analogy: If a customer asks for a table that doesn’t exist, the host gives them a menu of valid options.

//8.  res.end() and .listen(3000)
//      Same as before: res.end() finishes the response, and .listen(3000) starts the server on port 3000.