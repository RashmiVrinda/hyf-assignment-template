// Exercise 5

// Use reduce to calculate the total stockCount across all teas.

import { teas } from "./teas.js";

const totalStock = teas.reduce((sum, tea) => {
return sum + tea.stockCount;
}, 0);

console.log(totalStock); // sum of all stockCount values