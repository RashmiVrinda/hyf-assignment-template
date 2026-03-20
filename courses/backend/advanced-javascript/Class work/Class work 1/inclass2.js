import { teas } from "./teas.js";

let organicCount = 0;

teas.forEach(tea => {
  if (tea.organic) {
    organicCount++
  }
});

console.log(organicCount);