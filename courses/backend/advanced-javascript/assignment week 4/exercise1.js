import { teas } from "../teas.js";
const VALID_TEA_TYPES = ["green", "black", "herbal", "oolong", "white"];

export class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name is required");
    }
    if (!VALID_TEA_TYPES.includes(type)) {
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
    const price = (this.pricePerGram * 100).toFixed(2);
    const organicText = this.organic ? " [organic]" : "";
    return `${this.name} (${this.type}) from ${this.origin} - ${price} DKK/100g${organicText}`;
  }

  static fromObject(obj) {
    // Create a Tea from a plain object (like from the data file)
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
    );
  }
}

// Test validation:
try {
  new Tea("", "green", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Name is required"

try {
  new Tea("Test", "purple", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Invalid type: purple"

// Test factory method:
const teaInstances = teas.map(Tea.fromObject);
console.log(teaInstances.length); // 20
console.log(teaInstances[0].describe());
// "Sencha (green) from Japan - 12.00 DKK/100g [organic]"
console.log(teaInstances[1].describe());
// "Earl Grey (black) from India - 8.00 DKK/100g"
