import https from "https";

const getJokes = () => {
    const url = "https://api.chucknorris.io/jokes/random";

https.get(url,response =>{     
    let data = "";
    response.on("data",(chunk)=>{ 
        data += chunk;   
}); 
response.on("end",()=>{ 
    const joke = JSON.parse(data);
console.log("Joke:",joke.value);
});

    });

};
    getJokes();

    