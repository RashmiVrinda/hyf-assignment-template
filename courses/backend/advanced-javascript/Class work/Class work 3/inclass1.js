const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
// Exercise 1

// Fetch all teas from the API and log how many there are.

// fetch(`${API_BASE}/teas`)
//   .then(response => response.json())
//   .then((teas) => { 
//   console.log(`Found ${teas.length} teas`)
// });
// Exercise 2

// Fetch a single tea by ID and log its name and origin.

// fetch(`${API_BASE}/teas/3`)
// .then(response => response.json())
// .then ((teas) => {
//   console.log(`${teas.name}, ${teas.origin}`)
// });
// Exercise 3

// Try fetching a tea that doesn't exist (ID 999). Handle the error with .catch().

// fetch(`${API_BASE}/teas/999`)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((tea) => {
//     console.log(tea.name);
//   })
//   .catch((error) => { console.log(error);
//   });



// // Exercise 4
// // Fetch the inventory endpoint and log which teas are low on stock (less than 50).
// fetch(`${API_BASE}/inventory`)
// .then(res => res.json())
// .then ((teas)=> {
//     const result = teas.filter((tea) => tea.stockCount <50);
//     result.map((tea) => {console.log(`${tea.teaName}Stock: ${tea.stockCount}`);});
// });
// //console.log(teas)})

// Exercise 5
// // Fetch a tea, then fetch its inventory status. Log both pieces of information.
// fetch(`${API_BASE}/teas/1`)
//   .then((response) => response.json())
//   .then((tea) => {
//     console.log("Tea:", tea.name);
//     // Return a new fetch to chain it
//     return fetch(`${API_BASE}/inventory`)
//       .then((response) => response.json())
//       .then((inventory) => {
//         return {tea, inventory };
//       });
//   })
//   .then(({ tea, inventory }) => {
//     // Find this tea's stock in the inventory
//     const item = inventory.find((inv) => inv.teaId === tea.id);

//     // Log the stock count
//     console.log("Stock:", item.stockCount);
//   })
//   .catch((error) => console.error("Error:", error.message));


//   Exercise 6 ⭐

// Fetch all teas, filter to only Japanese teas, 
// then for each one log its name and price. All using .then() chains.

// fetch(`${API_BASE}/teas`)
//   .then((response) => response.json())
//   .then((teas) =>  {console.log("Tea:", teas);});
//  
//    const item = inventory.filter((inv) => inv.origin === Japan);
// console.log(`${tea.name}, ${tea.pricePerGram}`);}
//     // Filter to Japanese teas
//     // Log each one's name and price

//   .catch((error) => console.error(error));




// Exercise 7
// Create a wait(ms) function that returns a Promise which resolves after ms milliseconds.


// function wait(ms) {
//   return new Promise(resolve => {
//     setTimeout(resolve,ms);
//   });
// }
// console.log("Starting...");
// wait(2000).then(() => console.log("2 seconds passed!"));


// Exercise 8 ⭐

// Create a fetchTeaWithTimeout(id, timeoutMs) function. It should:

// Fetch the tea from the API
// Reject if it takes longer than timeoutMs
// Hints:

// Use setTimeout to create a timeout that calls reject
// Use clearTimeout to cancel the timeout if fetch succeeds
// Remember to handle fetch errors too


// function fetchTeaWithTimeout(id, timeoutMs) {
//   return new Promise((resolve, reject) => {
//     const timer = setTimeout(() => {
//       reject(new Error("Request timed out"));
//     }, timeoutMs);
//     fetch(`${API_BASE}/teas/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("HTTP error: " + response.status);
//         }
//         return response.json();
//       })
//       .then((tea) => {
//         clearTimeout(timer); 
//         resolve(tea);
//       })
//       .catch((error) => {
//         clearTimeout(timer); 
//         reject(error);
//       });
//   });
// }
// // Test with a generous timeout (should work)
// fetchTeaWithTimeout(1, 5000)
//   .then((tea) => console.log("Got:", tea.name))
//   .catch((err) => console.log("Failed:", err.message));
// // Test with a tiny timeout (should fail)
// fetchTeaWithTimeout(1, 1)
//   .then((tea) => console.log("Got:", tea.name))
//   .catch((err) => console.log("Failed:", err.message));

// Exercise 9 ⭐

// Convert this callback-based function to return a Promise:

import fs from "fs";

function readJsonFilePromise(path) {
  return new Promise((resolve, reject) => {
    // We call the original callback-based function
    fs.readFile(path, "utf8", (error, data) => {
      // If the file system returns an error, we reject the promise
      if (error) {
        return reject(error);
      }
      try {
        // If successful, we parse the data
        const parsed = JSON.parse(data);
        // And resolve the promise with the result
        resolve(parsed);
      } catch (parseError) {
        // If JSON.parse fails, we reject with the parse error
        reject(parseError);
      }
    });
  });
}
// Test it:
readJsonFilePromise("./test.json")
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error.message));
