import readline from "readline";

const rl = readline.createInterface({ // create readline interface
    input: process.stdin, // read from stdin
    output: process.stdout, // write to stdout
});

const todos = [];

const showMenu = () => {
    console.log("1. Add a Task");
    console.log("2. View Tasks");
    console.log("3. Exit");

    rl.question("Choose an Option:" ,handleInput);
}

const handleInput = (input) => {
    switch (input) {
        case "1":
            rl.question("Enter a Task:" ,addTask);
            break;
        case "2":
            viewTasks();
           
            break;
        case "3":
           console.log("Good Bye!!");
           rl.close();
            break;
        default:
            console.log("Invalid Option,Please try again.");
            showMenu();
            break;
    }
}

const addTask = (task) => {
    todos.push(task);
    console.log("Task added :", task);
    showMenu();
}

const viewTasks = () => {
    if (todos.length === 0) {
        console.log("No tasks found.");
    } else {
        console.log("Tasks:");
        todos.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
        showMenu();
}
}
 showMenu();