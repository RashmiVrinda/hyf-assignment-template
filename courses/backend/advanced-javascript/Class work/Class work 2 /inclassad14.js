// Exercise 14
//Create a function findTeaById(id, callback) that simulates a database lookup with a 500ms delay.

import { teas } from "../../teas.js";
// function findTeaById(id, callback) {
//   setTimeout(() => {
//     const tea = teas.find(tea => tea.id === id);
//     callback(tea);
//   }, 500);
// }
// Test it
// console.log("Looking up tea...");
// findTeaById(3, function (tea) {
//   console.log("Found:", tea.name);
// });
// console.log("Request sent, waiting...");


const findTeaById = (id, callback) => {
  setTimeout(() => {
    const tea = teas.find(tea => tea.id === id);
    callback(tea);
  }, 500);
};
findTeaById(1, function (tea) {
  console.log("Got:", tea.name);
});

findTeaById(1, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(5, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(10, function (tea) {
  console.log("Got:", tea.name);
});
console.log("All requests sent!");