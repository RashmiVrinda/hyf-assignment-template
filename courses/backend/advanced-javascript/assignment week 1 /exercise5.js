// Exercise 5: Search Function

// Create a search function for the tea shop:

// function searchTeas(teas, query) {
//   // Return teas where the name contains the query (case-insensitive)
//   // Return just the names, sorted alphabetically
// }

// console.log(searchTeas(teas, "earl"));
// // Returns: ["Earl Grey"]

// console.log(searchTeas(teas, "dragon"));
// // Returns: ["Dragon Well"]

// console.log(searchTeas(teas, "ch"));
// // Returns: ["English Breakfast", "Genmaicha", "Lapsang Souchong"]

import { teas } from "../teas.js";

const searchTeas = (teas, query) => {
  return teas
    .filter((tea) =>
      tea.name.toLowerCase().includes(query.toLowerCase()),
    )
    .map((tea) => tea.name)
    .sort();
};
console.log(searchTeas(teas, "earl"));
console.log(searchTeas(teas, "dragon"));
console.log(searchTeas(teas, "ch"));
