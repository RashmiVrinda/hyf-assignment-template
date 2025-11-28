//code war 2

function squareDigits(num){
  
const str = num.toString(); //The toString() method of Number values returns a string representing this number value.
let result = "";
for  ( let i=0; i<str.length; i++){
  if (str[i] === " ") continue; // fix "ignore spaces"
  let digit = Number(str[i]); // Convert result back to number
  result += (digit * digit); }// result += adds it to the string
  return Number(result);
}

console.log(squareDigits("1  5"));


