// Exercise 3: Low Stock Alert
// Create a function that returns teas with low stock (less than 50 items):

// function lowStockAlert(teas) {
//   // Return array of objects with name and stockCount
//   // sorted by stockCount (lowest first)
// }

// console.log(lowStockAlert(teas));
// Expected output format:
// [
//   { name: "Silver Needle", stockCount: 25 },
//   { name: "Matcha", stockCount: 30 },
//   // ...
// ];

import { teas } from "../teas.js";
function lowStockAlert(teas) {
  return teas
    .filter((tea) => tea.stockCount < 50)
    .map((tea) => ({ name: tea.name, stockCount: tea.stockCount }))
    .sort((a, b) => a.stockCount - b.stockCount);
}

console.log(lowStockAlert(teas));

