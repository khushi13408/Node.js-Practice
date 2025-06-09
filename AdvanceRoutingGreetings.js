// greetings.js
function greetUser(user) {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
  }
  const defaultUser = {
    name: "Guest",
    age: 25,
    email: "guest@example.com"
  };
  const appVersion = "1.0.0";
  module.exports = {
    greet: greetUser,
    user: defaultUser,
    version: appVersion
  };