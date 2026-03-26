// Exercise 5: Full Order Flow ⭐⭐
// Combine everything into a complete order processing flow:
const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
import { calculateOrderTotal } from "./exercise3.js";
import { checkOrderStock } from "./exercise4.js";
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
  if (!stockResult.inStock) {
    const shortageNames = stockResult.shortages
      .map((shortage) => shortage.name)
      .join(", ");
    throw new Error(`Items out of stock: ${shortageNames}`);
  }

  // Step 3: Calculate total
  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items);

  // Step 4: Create order summary
  console.log("4. Creating summary...\n");

  return {
    items: items.length,
    total,
    status: "ready",
  };
}

const myOrder = [
  { teaId: 1, grams: 50 },
  { teaId: 5, grams: 100 },
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });
