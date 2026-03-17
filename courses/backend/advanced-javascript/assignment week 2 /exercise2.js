// Exercise 2: Order Processing System ⭐
// Create an order processing system with simulated delays.

import { teas } from "../teas.js";

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};
// 1. validateOrder(order, callback) - 200ms delay
const validateOrder = (order, callback) =>
  setTimeout(() => {
    const errors = order.items
      .filter((item) => !teas.some((tea) => tea.id === item.teaId))
      .map((item) => `Tea with id ${item.teaId} does not exist`);

    callback({ valid: !errors.length, errors });
  }, 200);

    validateOrder(order, (result) => {
  console.log("Validation result:", result);});

//2. calculateTotal(order, callback) - 300ms delay
const calculateTotal = (order, callback) =>
  setTimeout(() => {
    const total = order.items.reduce((sum, item) => {
      const tea = teas.find(t => t.id === item.teaId);
      return sum + tea.pricePerGram * item.grams;
    }, 0);

    callback({
      orderId: order.id,
      total: total,
    });
  }, 300);
calculateTotal(order, (result) => {
  console.log("Total result:", result);
});

// 3. checkStock(order, callback) - 400ms delay
const checkStock = (order, callback) =>
  setTimeout(() => {
    const shortages = order.items
      .filter((item) => {
        const tea = teas.find(t => t.id === item.teaId);
        return tea && tea.stockCount < item.grams;
      })
      .map((item) => {
        const tea = teas.find(t => t.id === item.teaId);
        return `${tea.name} only has ${tea.stockCount}g, but ${item.grams}g was ordered`;
      });
    callback({
      orderId: order.id,
      inStock: !shortages.length,
      shortages: shortages,
    });
  }, 400);
    checkStock(order, (result) => {
  console.log("Stock result:", result);
});