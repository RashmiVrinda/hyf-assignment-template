import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";
import { teas } from "../teas.js"; 

export class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    super(name, type, origin, pricePerGram, organic);
    
    const validGrades = ["A", "B", "C"];
    if (!validGrades.includes(grade)) throw new Error("Invalid grade");
    this.grade = grade;
  } 
  priceFor(grams) {
    const basePrice = super.priceFor(grams);
    const markups = { A: 1.5, B: 1.25, C: 1.1 };
    return basePrice * markups[this.grade];
  }
  describe() {
  const premiumPrice = this.priceFor(100).toFixed(2);
  return `${this.name} [Grade ${this.grade}] (${this.type}) from ${this.origin} - ${premiumPrice} DKK/100g${this.organic ? " [organic]" : ""}`;
}
  static fromTea(tea, grade) {
    return new PremiumTea(tea.name, tea.type, tea.origin, tea.pricePerGram, tea.organic, grade);
  }
}
export class ExpressOrder extends Order {
  constructor(expressFee = 25) {
    super(); // Initialize the basic Order (empty items, status pending)
    this.expressFee = expressFee;
  }

  // Override: Add the fee to the base total
  getTotal() {
    return super.getTotal() + this.expressFee;
  }

  // Override: Add a special line for the express fee
  getSummary() {
    let summary = super.getSummary();
    // We insert the fee line before the final total line
    return summary.replace("Total:", `Express Fee: ${this.expressFee.toFixed(2)} DKK\nTotal:`);
  }
}


// Test PremiumTea:
const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");
console.log(gyokuro.describe());
// "Gyokuro [Grade A] (green) from Japan - 84.00 DKK/100g"
console.log(gyokuro.priceFor(100)); // 84

const upgraded = PremiumTea.fromTea(teas.map(Tea.fromObject)[0], "B");
console.log(upgraded.describe());

// Test ExpressOrder:
const express = new ExpressOrder(25);
express.addItem(new OrderItem(gyokuro, 100));
console.log(express.getSummary());
// Should show items + express fee + total
console.log(express.getTotal()); // 84 + 25 = 109