// Exercise 8 ⭐

// Use reduce to group tea names by their origin country.

// const groupedByOrigin = teas.reduce(/* ... */);
// console.log(groupedByOrigin);
// // Expected: { Japan: ["Sencha", "Matcha", ...], China: [...], ... }

import { teas } from "./teas.js";
const groupedByOrigin = teas.reduce((groups, tea) => {

  groups[tea.origin]
    ? groups[tea.origin].push(tea.name)
    : groups[tea.origin] = [tea.name];

  return groups;

}, {});

console.log(groupedByOrigin);
