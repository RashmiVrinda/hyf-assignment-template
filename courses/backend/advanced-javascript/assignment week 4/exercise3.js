import { teas } from "../teas.js";
import { Tea } from "./exercise1.js";

export class Inventory {
  constructor() {
    this.items = {};
  }

  add(tea, stockCount) {
    this.items[tea.name] = {
      tea,
      stockCount,
    };
  }
  sell(teaName, grams) {
    if (!this.items[teaName]) {
      throw new Error(`Tea "${teaName}" not found in inventory.`);
    }

    if (this.items[teaName].stockCount < grams) {
      throw new Error(`Not enough stock for ${teaName}`);
    }
    this.items[teaName].stockCount -= grams;
  }
  restock(teaName, grams) {
    if (typeof grams !== "number" || Number.isNaN(grams) || grams <= 0) {
      throw new Error("Grams must be a positive number");
    }

    if (this.items[teaName]) {
      this.items[teaName].stockCount += grams;
    } else {
      throw new Error(`Tea "${teaName}" not found in inventory.`);
    }
  }
  getStock(teaName) {
    return this.items[teaName]?.stockCount || 0;
  }
  getLowStock(threshold) {
    return Object.values(this.items).filter(
      (item) => item.stockCount < threshold,
    );
  }
  getTotalValue() {
    return Object.values(this.items).reduce(
      (total, item) => total + item.tea.pricePerGram * item.stockCount,
      0,
    );
  }
}

const teaInstances = teas.map(Tea.fromObject);
const inventory = new Inventory();

teaInstances.forEach((tea) => {
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha")); // 150

inventory.sell("Sencha", 50);
console.log("After selling 50g:", inventory.getStock("Sencha")); // 100

console.log("Low stock (< 50):");
inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK",
);
