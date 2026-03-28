// Exercise 5: Full Order Flow ⭐⭐
// Combine everything into a complete order processing flow:

import { calculateOrderTotal, checkOrderStock } from "./library.js";
const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function processOrder(items) {
  console.log("Processing order...\n");

  // Step 1: Validate items exist
  console.log("1. Validating items...");
  // Fetch all teas, check all teaIds exist
  const res = await fetch(`${API_BASE}/teas`);
  const allTeas = await res.json();

  for (const item of items) {
    const exists = allTeas.some((tea) => tea.id === item.teaId);

    if (!exists) {
      throw new Error(`Invalid Order : Tea ID ${item.teaId} does not exists`);
    }
  }

  // Step 2: Check stock
  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  //NOTE: Modified logic from assignment
// Instead of failing the entire order when some items are out of stock,
// I filtered out unavailable items and continue processing the rest.
  const availableItems = items.filter((item) => {
    return !stockResult.shortages.some(
      (shortage) => shortage.teaId === item.teaId &&
      shortage.grams === item.grams
    );
  });
  // UPDATED: only fail if NO items are available
if (availableItems.length === 0) {
  throw new Error("No items available in stock");
}

  // Step 3: Calculate total
  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(availableItems);

  // Step 4: Create order summary
  console.log("4. Creating summary...\n");

  
  // Returning only processed item count
// and also including removedItems for better user feedback
  return {
    items: availableItems.length,
    total,
    status: "ready",
    removedItems: stockResult.shortages
  };
}

const myOrder = [
  { teaId: 5, grams: 10 }, // should succeed
  { teaId: 6, grams: 20 }, // should succeed
  { teaId: 1, grams: 50 }, // out of stock
  { teaId: 5, grams: 100 }, // not enough stock 
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);

    // Display items that could not be processed due to insufficient stock
    if (result.removedItems && result.removedItems.length > 0) {
      console.log("\nOut of stock items:");
      result.removedItems.forEach((item) => {
        console.log(
          `- ${item.name} (needed: ${item.needed}g, available: ${item.available}g)`
        );
      });
    }
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });

//output 

// 1. Validating items...
// 2. Checking stock...
// 3. Calculating total...
// 4. Creating summary...

// Order ready!
// Items: 2
// Total: 10.60 DKK

// Out of stock items:
// - Sencha (needed: 50g, available: 0g)
// - Darjeeling (needed: 100g, available: 33g)