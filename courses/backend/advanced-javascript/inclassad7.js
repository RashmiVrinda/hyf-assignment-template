// Exercise 7

// Use reduce to count how many teas of each type exist.

import { teas } from "./teas.js";
const countByType = teas.reduce((counts, tea) => {
  counts[tea.type] = counts[tea.type]
    ? counts[tea.type] + 1
    : 1;
  return counts;
}, {});
console.log(countByType);
