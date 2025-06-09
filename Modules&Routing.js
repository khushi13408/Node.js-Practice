//1). BUILDING A TINY SERVER :-

const http = require("http");
http.createServer((req,res)=> {
    console.log(req);
    res.write("Welcome to my website ");
    res.end();
}).listen(8000,"127.0.0.1",() => {
    console.log("Listening to port 8000");
});

// How It All Works Together?
// ~Let’s put it all together like a story:

// ~ You borrow the http toolbox to build a web server (const http = require("http")).
// ~ You set up a server and tell it, “When someone visits, follow these instructions” (http.createServer((req, res) => {).
// ~ The instructions are: “Send the text ‘Hello from Node.js!’ to the visitor” (res.write("Hello from Node.js!")) and then say, “I’m done!” (res.end()).
// ~ Finally, you tell the server to open for business on port 3000 (.listen(3000)).
// ~ When you run this code (with node filename.js) and visit http://localhost:3000 in your browser, you’ll see “Hello from Node.js!” on the screen.







//2). WHAT ARE MODULES:-

server.js
const http = require("http"); // Built-in module
const sayHello = require("./greeting"); // Your custom module

http.createServer((req, res) => {
  res.write(sayHello("Student")); // Use the custom module
  res.end();
}).listen(3000);

console.log("Server running at http://localhost:3000");


// What’s happening here:
// ~ const http = require("http"): Grabs the built-in http module to create a server.
// ~ const sayHello = require("./greetings"): Grabs your sayHello function from greetings.js. The ./ means “look in the same folder as this file.”
// ~ When someone visits http://localhost:3000, the server calls sayHello("Student") and sends “Hello, Student! Welcome to Node.js!” to the browser.
// ~ console.log prints a message in your terminal to confirm the server is running.





// 3).DIVING DEEPER INTO MODULES: EXPORTING MUTLIPLE FUNCTIONS :-

// server.js
const http = require("http");
const greetings = require("./greeting"); // Import the greetings module

http.createServer((req, res) => {
  // Check the URL to decide which greeting to show
  if (req.url === "/hello") {
    res.write(greetings.hello("Student"));
  } else if (req.url === "/goodbye") {
    res.write(greetings.goodbye("Student"));
  } else if (req.url === "/welcome") {
    res.write(greetings.welcome("Student"));
  } else if (req.url === "/thankyou") {
    res.write(greetings.thankyou("Student"));
  } else {
    res.write("Visit /hello, /goodbye, or /welcome to see a greeting!");
  }
  res.end();
}).listen(3000);

console.log("Server running at http://localhost:3000");



// What’s happening here:
// ~ const greetings = require("./greetings"): Imports the greetings module, giving access to the object with three functions (hello, goodbye, welcome).
// ~ req.url: Checks the URL the user visited (e.g., /hello or /goodbye). This is part of the req (request) object, which we’ll dive into in a later concept.
// ~ Depending on the URL, the server calls one of the functions from the greetings module (e.g., greetings.hello("Student")) and sends the result to the browser.
// ~ If the URL doesn’t match (e.g., /random), it sends a fallback message.
// ~ res.write sends the greeting, and res.end() finishes the response.

 





//ROUTING IN NODE.JS :-

// server.js file :-

const http = require("http");
const greetings = require("./greetings");

http.createServer((req, res) => {
  if (req.url === "/greeting") {
    // Use the greet function and defaultUser object
    res.write(greetings.greet(greetings.user));
  } else if (req.url === "/version") {
    // Use the version variable
    res.write(`App Version: ${greetings.version}`);
  } else if (req.url === "/user") {
    // Use the user object directly
    res.write(`User: ${greetings.user.name}, Email: ${greetings.user.email}`);
  } else {
    res.write("Visit /greeting, /version, or /user to see something cool!");
  }
  res.end();
}).listen(3000);

console.log("Server running at http://localhost:3000");



// How It All Works Together:-

// -> Let’s tie it together with the lemonade stand story:

// ~ You set up your stand with a recipe book (http) and a box of special ingredients (greetings.js).
// ~ You hire a worker (createServer) who listens for customer orders (req) and serves drinks (res).
// ~ Customers visit specific URLs (like /greeting), and the worker checks the order:
//    - /greeting: Mixes a fancy drink using the greet recipe and customer info (user).
//    - /version: Reads the stand’s version number from the sign.
//    - /user: Shares the customer’s name and email.
//    -  Anything else: Hands out a menu with instructions.
// ~ The worker finishes each order (res.end) and waits at booth 3000 (.listen(3000)).
// ~ You see “Server running at http://localhost:3000” in your terminal, confirming the stand is open.