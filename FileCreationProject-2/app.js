import readline from "readline";
import fs from "fs"; 

const rl = readline.createInterface({ // create readline interface
    input: process.stdin, // read from stdin
    output: process.stdout, // write to stdout
});

const fileCreation = () => {
    rl.question("Enter a File Name:", (fileName) => {
    rl.question("Enter the content for your file:" ,content => {
    fs.writeFile(`${fileName}.txt`, content , (err) => {
        if (err) {
            console.log(`Error writing the file: ${err.message}`);
        }   else {
            console.log(`File  "${fileName}.txt" created successfully!`);
        }
        rl.close();
    })
   
    
   })
})

}

fileCreation();