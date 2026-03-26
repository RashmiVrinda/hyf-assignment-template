// Exercise 11 ⭐

// Create your own myFilter(array, callback) function that works like the built-in filter.

import { teas } from "../../teas.js";
const myFilter = (array, callback) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};
// Test it
const organic = myFilter(teas, (tea) => tea.organic);
console.log(organic.length);