// Exercise 4: Teas by Origin ⭐⭐
// Create a function that groups teas by their origin country:
// function teasByOrigin(teas) {
//   // Return object where keys are origins and values are arrays of tea names
// }

// console.log(teasByOrigin(teas));
// Expected output format:
// {
//   Japan: ["Sencha", "Matcha", "Gyokuro", "Genmaicha"],
//   India: ["Earl Grey", "Darjeeling", "Assam"],
//   China: ["Dragon Well", "White Peony", ...],
//   // ...
// }
import { teas } from "./teas.js";
function teasByOrigin(teas) {
  return teas.reduce((result, tea) => {
    if (!result[tea.origin]) {
      result[tea.origin] = [];
    }
    result[tea.origin].push(tea.name);
    return result;
  }, {});
}
console.log(teasByOrigin(teas));