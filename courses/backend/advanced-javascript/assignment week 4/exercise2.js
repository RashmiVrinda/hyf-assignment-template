// Exercise 2: Order System
// Build OrderItem and Order classes that work together.

import { teas } from "../teas.js";
import { Tea } from "./exercise1.js";


 
 export class OrderItem {
  constructor(tea, grams) {
    if (typeof grams !== "number" || grams <= 0) {
      throw new Error("Grams must be a positive number");
    }
    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.priceFor(this.grams);
  }

  describe() {
    return `${this.grams}g ${this.tea.name} - ${this.lineTotal().toFixed(2)} DKK`;
  }
}

export class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    if (this.status === "pending") {
      this.items.push(orderItem);
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.lineTotal(), 0);
  }

  getSummary() {
    const list = this.items.reduce(
      (acc, item) => acc + `  ${item.describe()}\n`,
      "",
    );

    return (
      `Order (${this.status}) - ${this.items.length} items\n` +
      list +
      `Total: ${this.getTotal().toFixed(2)} DKK`
    );
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const order = new Order();


order.addItem(new OrderItem(teaInstances[0], 200));  // Sencha
order.addItem(new OrderItem(teaInstances[7], 50)); // Matcha

console.log(order.getSummary());
// Commented out the line below because getSummary() already includes the total.
//console.log("Total:", order.getTotal().toFixed(2), "DKK");