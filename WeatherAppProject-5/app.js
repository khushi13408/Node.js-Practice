import readline from "readline/promises";

const rl = readline.createInterface({ // create readline interface
    input: process.stdin, // read from stdin
    output: process.stdout, // write to stdout
});

const API_KEY = " 20026216a368844fc0cd74ab8f150045"; 
const BASE_URL = `http://api.openweathermap.org/data/2.5/weather`;


const getweather = async (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
  
try{
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`City not found. Please Check the city name.`);
    }
    const weatherData = await response.json();
   console.log(weatherData);

   console.log(`\nWeather Information :`);
   console.log(`City: ${weatherData.name}`);
   console.log(`Temperature: ${weatherData.main.temp}°C`);
   console.log(`Description: ${weatherData.weather[0].description}`);
   console.log(`Humidity: ${weatherData.main.humidity}%`);
   console.log(`Wind Speed: ${weatherData.wind.speed} m/s\n`);
   
   
} catch (error) {
    console.error( error);
}

};


const city= await rl.question("Enter a city name: ");
await getweather(city);
rl.close();