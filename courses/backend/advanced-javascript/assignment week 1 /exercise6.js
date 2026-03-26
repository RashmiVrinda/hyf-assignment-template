// Exercise 6: Total Inventory Value 
// Calculate the total value of all tea inventory using reduce:
// const totalValue = teas.reduce((sum, tea) => {
//   // add pricePerGram * stockCount to sum
// }, 0);

// console.log("Total inventory value:", totalValue);
// Hint: reduce builds up a single value by processing each item. The 0 is your starting value.

import { teas } from "../teas.js";
const totalValue = teas.reduce((sum, tea) =>{
return sum+tea.pricePerGram * tea.stockCount;},0);

console.log("Total inventory value:", totalValue);

