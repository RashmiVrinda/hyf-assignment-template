// Exercise 10

// Create your own myMap(array, callback) function that works like the built-in map.
import { teas } from "./teas.js";
const myMap = (array, callback) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  return result;
};
// Test
const names = myMap(teas, (tea) => {
  return tea.name;
});
console.log(names);