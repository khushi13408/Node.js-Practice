import readline from "readline/promises";

const rl = readline.createInterface({ // create readline interface
    input: process.stdin, // read from stdin
    output: process.stdout, // write to stdout
});

const API_KEY = " 20026216a368844fc0cd74ab8f150045"; 
const BASE_URL = `http://api.openweathermap.org/data/2.5/weather`;


const getweather = async (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  
try{
    const weatherData = await fetch(url);
    const weather = await weatherData.json();
    console.log(`The temperature in ${city} is ${weather.main.temp} degrees Celsius.`);
    console.log(`The weather conditions in ${city} are ${weather.weather[0].description}.`);
} catch (error) {
    console.error( error);
}

};


const city= await rl.question("Enter a city name: ");
await getweather(city);
rl.close();