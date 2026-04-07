// library.js

import { teas as teaData } from "../teas.js";

export class Tea {
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
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
    );
  }
}

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
    if (this.items[teaName]) {
      this.items[teaName].stockCount += grams;
    }
  }
  getStock(teaName) {
    return this.items[teaName] ? this.items[teaName].stockCount : 0;
  }
  getLowStock(threshold) {
    return Object.values(this.items).filter(
      (item) => item.stockCount < threshold,
    );
  }
  getTotalValue() {
    return Object.values(this.items).reduce((total, item) => {
      return total + item.tea.pricePerGram * item.stockCount;
    }, 0);
  }
}

export class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
  }
  placeOrder(order) {
    order.status = "confirmed";
    this.orders.push(order);
    return order;
  }
  totalSpent() {
    return this.orders.reduce((sum, order) => sum + order.getTotal(), 0);
  }
  getOrderHistory() {
    let history = `${this.name} (${this.email}) - ${this.orders.length} orders\n\n`;
    this.orders.forEach((order, index) => {
      history += `Order ${index + 1} (${order.status})- ${order.items.length} items\n`;
      order.items.forEach((item) => {
        history += `${item.describe()}\n`;
      });
      history += `Total: ${order.getTotal().toFixed(2)} DKK\n\n`;
    });
    history += `Lifetime total: ${this.totalSpent().toFixed(2)} DKK`;
    return history;
  }
}
