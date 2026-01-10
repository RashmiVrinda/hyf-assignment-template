// Task
// Your goal is to write a function that removes the first and last characters of a string. You're given one parameter, the original string.
// Important: Your function should handle strings of any length ≥ 2 characters. For strings with exactly 2 characters, return an empty string.


function removeChar(str){
return str.slice(1,-1)

};  
console.log(removeChar("hello"));   // "ell"
console.log(removeChar("code"));    // "od"
console.log(removeChar("test"));    // "es"
console.log(removeChar("ab"));  // ""
console.log(removeChar("a"));   // ""
console.log(removeChar(""));    // ""
console.log(removeChar("12345")); // "234"
console.log(removeChar("90"));    // ""
