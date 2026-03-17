// Exercise 4 ⭐

// Create a function createGreeter(greeting) that returns a new function. 
// The returned function should take a name and log the greeting with the name.

// const sayHello = createGreeter("Hello");
// const sayHi = createGreeter("Hi");

// sayHello("Alice"); // "Hello, Alice!"
// sayHi("Bob"); // "Hi, Bob!"

const createGreeter = greeting => {
    return(name) => { console.log ( `${greeting}, ${name}!`)};
    
}
const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
sayHello("Alice"); // "Hello, Alice!"
sayHi("Bob"); // "Hi, Bob!"
