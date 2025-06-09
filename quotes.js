// quotes.js
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Be the change you wish to see in the world. - Mahatma Gandhi",
    "Stay hungry, stay foolish. - Steve Jobs"
  ];
  
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  function addQuote(quote) {
    if (!quote || typeof quote !== "string" || quote.trim() === "") {
      throw new Error("Please provide a valid quote (non-empty string).");
    }
    quotes.push(quote.trim());
    return "Quote added successfully!";
  }
  
  const appInfo = {
    name: "Quote App",
    version: "1.0.0"
  };
  
  module.exports = {
    getQuote: getRandomQuote,
    quotes: quotes,
    info: appInfo,
    add: addQuote
  };