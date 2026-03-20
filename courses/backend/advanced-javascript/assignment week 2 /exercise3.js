// Exercise 3: Sequential Processing
// Using the functions from Exercise 2, process an order through all three steps in sequence:
// First validate
// If valid, calculate total
// If total calculated, check stock
// Log final result
// This requires "callback nesting" - calling the next function inside the previous callback.

import {
  order,
  validateOrder,
  calculateTotal,
  checkStock,
} from "./exercise2.js";

function processOrder(order) {
  console.log("Processing order", order.id);

  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");

    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

      checkStock(order, (stock) => {
        if (!stock.inStock) {
          console.log("Stock Issues:", stock.shortages);
        } else {
          console.log("All items in stock");
        }
        console.log("Order processing complete");
      });
    });
  });
}

processOrder(order);
