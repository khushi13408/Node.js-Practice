import https from "https";
import readline from "readline";

const rl = readline.createInterface({ // create readline interface
    input: process.stdin, // read from stdin
    output: process.stdout, // write to stdout
});
 
const apiKey = "025a5a5a276ec40b3b21158b"; 
const url =`https://v6.exchangerate-api.com/v6/025a5a5a276ec40b3b21158b/latest/USD`

https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
        data += chunk;      
    });
    response.on("end", () => {
        const exchangeRates = JSON.parse(data).conversion_rates;
        console.log("Exchange rates:", exchangeRates);
        rl.question("Enter the amount to convert:", (amount) => {
            rl.question("Enter the target currency (e.g., EUR, GBP,INR, etc.):", (currency) => {
               const rate = exchangeRates[currency.toUpperCase()];
               if (rate) {
                   const convertedAmount = amount * rate;
                   console.log(`${amount} USD is equal to ${convertedAmount.toFixed(2)} ${currency}`);
               } else {
                   console.log("Invalid target currency. Please try again.");
               }
               rl.close();
            })
           
        })
    });
})