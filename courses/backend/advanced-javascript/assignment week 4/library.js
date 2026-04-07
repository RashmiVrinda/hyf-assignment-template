// library.js

import { teas as teaData } from "../teas.js"; // Rename the import to avoid conflict

export class Tea { // Capital 'T' and singular is the standard for classes
  constructor(name, type, origin, pricePerGram, organic) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name is required");
    }

    const validTypes = ["green", "black", "herbal", "oolong", "white"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    }

    if (typeof pricePerGram !== "number" || pricePerGram <= 0) {
      throw new Error("Price per gram must be a positive number");
    }

    this.name = name;
    this.type = type;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
    this.origin = origin;
  }

  priceFor(grams) {
    return this.pricePerGram * grams;
  }

  describe() {
    const priceDisplay = (this.pricePerGram * 100).toFixed(2);
    const organicSuffix = this.organic ? " [organic]" : "";
    return `${this.name} (${this.type}) from ${this.origin} - ${priceDisplay} DKK/100g${organicSuffix}`;
  }

  static fromObject(obj) {
    return new Tea(obj.name, obj.type, obj.origin, obj.pricePerGram, obj.organic);
  }
}

// Add the OrderItem and Order classes here too so you can export them!

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
  const list = this.items.reduce((acc, item) => acc + `  ${item.describe()}\n`, "");
  
  return `Order (${this.status}) - ${this.items.length} items\n` + 
         list + 
         `Total: ${this.getTotal().toFixed(2)} DKK`;
}
}