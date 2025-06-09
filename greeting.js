// 2). WHAT ARE MODULES:-

// greetings.js file:-

function sayHello(name) {
  return `Hello, ${name}! Welcome to Node.js!`;
}

module.exports = sayHello;

// What’s happening here:
// ~ We define a function sayHello that takes a name and returns a greeting.
// ~ module.exports = sayHello makes the sayHello function available for other files to use. Think of it as putting your Lego piece in a box for others to borrow.







// 3).DIVING DEEPER INTO MODULES: EXPORTING MUTLIPLE FUNCTIONS :-

// greetings.js file:- 
function sayHello(name) {
  return `Hello, ${name}! Welcome to Node.js!`;
}

function sayGoodbye(name) {
  return `Goodbye, ${name}! Come back soon!`;
}

function sayWelcome(name) {
  return `Welcome, ${name}! Let's learn more!`;
}

function sayThankyou(name) {
  return `Thank you, ${name}! for choosing us !`;
}

// Export all functions as an object
module.exports = {
  hello: sayHello,
  goodbye: sayGoodbye,
  welcome: sayWelcome,
  thankyou: sayThankyou
};

// What’s happening here:
// ~ We define three functions: sayHello, sayGoodbye, and sayWelcome, each returning a different greeting.
// ~ module.exports is set to an object that contains all three functions. Each function is given a key (hello, goodbye, welcome) to identify it.
// ~ Think of this as putting three tools in a toolbox and labeling them: “hello” for sayHello, “goodbye” for sayGoodbye, etc.
// ~ The module.exports line is like handing the entire toolbox to anyone who uses require("./greetings").







//4). ROUTING IN NODE.JS :-

// greetings.js file :-

// A function to generate a greeting
function greetUser(user) {
  return `Hello, ${user.name}! You are ${user.age} years old.`;
}

// An object with user data
const defaultUser = {
  name: "Guest",
  age: 25,
  email: "guest@example.com"
};

// A constant variable
const appVersion = "1.0.0";

// Export an object with a function, an object, and a variable
module.exports = {
  greet: greetUser,
  user: defaultUser,
  version: appVersion
};


// What’s happening here:-

// ~ greetUser: A function that takes a user object and returns a greeting with their name and age.
// ~ defaultUser: An object with properties (name, age, email) representing a default user.
// ~ appVersion: A simple string variable for the app’s version.
// ~ module.exports: Exports all three as an object with keys greet, user, and version. This is like putting a function, a data bundle, and a note in your gift box.