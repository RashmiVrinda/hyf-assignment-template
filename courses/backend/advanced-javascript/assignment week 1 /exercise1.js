//Rewrite with array methods

// Example structure for exercise1.js
import { teas } from "../teas.js";


// const result = [];
// for (let i = 0; i < teas.length; i++) {
//   if (teas[i].caffeineLevel !== "none") {
//     result.push(teas[i].name.toUpperCase());
//   }
// }
// console.log(result);

const result = teas
.filter(tea => tea.caffeineLevel !=="none")
 .map(tea => tea.name.toUpperCase());

console.log (result)
