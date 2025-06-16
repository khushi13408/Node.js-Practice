//this file shows how to serve html and css file using node.js


import { readFile } from "fs/promises"; 
import {createServer} from "http";
const PORT = 3000;
const server = createServer(async(req, res) => {
   if(req.method === "GET") {
     if(req.url === "/") {
        try{
const data =await readFile("./index.html");
       res.writeHead(200, {"Content-Type": "text/html"});
       res.end(data);
        }catch(error){
       res.writeHead(200, {"Content-Type": "text/html"});
       res.end("404 Page Not Found");
      }
    }else if (req.method === "GET") {
     if(req.url === "/styles.css") {
        try{
const data =await readFile("./styles.css");
       res.writeHead(200, {"Content-Type": "text/css"});
       res.end(data);
        }catch(error){
       res.writeHead(200, {"Content-Type": "text/html"});
       res.end("404 Page Not Found");
      }
    }
   }
if(req.method==="POST" && req.url==="/shorten"){
    const body="";
    req.on("data", (chunk) => {
        body=body+chunk;
    });
    req.on("end", () => {
        const {url,shortCode}=JSON.parse(body);
        if(!url || !shortCode){
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("Please provide both url and shortCode");
            return;
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({url,shortCode}));
    })
}
   }
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));