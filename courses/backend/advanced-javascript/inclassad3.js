// Exercise 3

// Create an array containing three different functions. Each function should log something different.
//  Loop through the array and call each function.

const functions = [
  function () {
    console.log("First");

  },
  function () {
        console.log ("Second");
  },

 function(){
            console.log ("Third")
        }
];

for (let i = 0; i < functions.length; i++) {
  functions[i](); // call each function
}
