// Exercise 9

// Create your own myForEach(array, callback) function that works like the built-in forEach.

import { teas } from "./teas.js";
const myForEach = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
};
myForEach(teas, function (tea) {
  console.log(tea.name);
});
myForEach(teas, (tea) => {
  console.log(tea.name);
});