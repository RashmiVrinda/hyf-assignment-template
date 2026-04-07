import { teas } from "../../teas.js";

class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }
}

// Exercise 1

// Create a Tea class with a constructor that accepts name, type, and origin. 
// Create two instances and log them.

// class Tea {
//   constructor(name,type, origin){
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//   }
// }

// const sencha = new Tea("Sencha", "green", "Japan");
// const earlGrey = new Tea("Earl Grey", "black", "India");

// console.log(sencha.name); // "Sencha"
// console.log(sencha.type); // "green"
// console.log(earlGrey.origin); // "India"

// Exercise 2

// Extend your Tea class to also accept pricePerGram and organic (boolean). 
// Create an instance from the first tea in the data array.

// class Tea {
//   constructor(name, type, origin, pricePerGram, organic) {
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//     this.pricePerGram = pricePerGram;
//     this.organic = organic;
//   }
// }
// const firstTea = teas[0];
// const tea = new Tea(
//   firstTea.name,
//   firstTea.type,
//   firstTea.origin,
//   firstTea.pricePerGram,
//   firstTea.organic
// );
// console.log(tea);


// Exercise 3

// Create the Tea instances using .map() and your class:




// const teaInstances = teas.map(
//   (t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic)
// );
// console.log(teaInstances.length); // 20
// console.log(teaInstances[0].name); // "Sencha"


// Exercise 4 ⭐

// Add validation to your constructor. Throw an error if:

// name is empty or missing
// pricePerGram is negative
// type is not one of: "green", "black", "herbal", "oolong", "white"
// Should work:
// class Tea {
//   constructor(name, type, origin, pricePerGram, organic) {

//     if (!name) {
//       throw new Error("Name is required");
//     }

//     if (pricePerGram < 0) {
//       throw new Error("Price must be positive");
//     }
//     const validTypes = ["green", "black", "herbal", "oolong", "white"];
//     if (!validTypes.includes(type)) {
//       throw new Error(`Invalid type: ${type}`);
//     }
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//     this.pricePerGram = pricePerGram;
//     this.organic = organic;
//   }
// }
// try {
//   const noName = new Tea("", "green", "Japan", 0.12, true);
// } catch (err) {
//   console.log(err.message);
// }

// // Should work:
// const valid = new Tea("Sencha", "green", "Japan", 0.12, true);
// // Should throw:
// const noName = new Tea("", "green", "Japan", 0.12, true);
// // Error: "Name is required"
// const badPrice = new Tea("Sencha", "green", "Japan", -1, true);
// // Error: "Price must be positive"
// const badType = new Tea("Sencha", "purple", "Japan", 0.12, true);
// // Error: "Invalid type: purple"

// Exercise 5

// Add a priceFor(grams) method to your Tea class that returns the price for a given weight.

// class Tea {
//   constructor(name, type, origin, pricePerGram, organic) {
//     if (!name) {
//       throw new Error("Name is required");
//     }
//     if (pricePerGram < 0) {
//       throw new Error("Price must be positive");
//     }
//     const validTypes = ["green", "black", "herbal", "oolong", "white"];
//     if (!validTypes.includes(type)) {
//       throw new Error(`Invalid type: ${type}`);
//     }
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//     this.pricePerGram = pricePerGram;
//     this.organic = organic;
//   }

//   priceFor(grams) {
//     return this.pricePerGram * grams;
//   }
// }
// const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
// console.log(sencha.priceFor(100)); // 12
// console.log(sencha.priceFor(50));  // 6

// Exercise 6

// Add a describe() method that returns a formatted string:


// class Tea {
//   constructor(name, type, origin, pricePerGram, organic) {
//     if (!name) {
//       throw new Error("Name is required");
//     }
//     if (pricePerGram < 0) {
//       throw new Error("Price must be positive");
//     }
//     const validTypes = ["green", "black", "herbal", "oolong", "white"];
//     if (!validTypes.includes(type)) {
//       throw new Error(`Invalid type: ${type}`);
//     }
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//     this.pricePerGram = pricePerGram;
//     this.organic = organic;
//   }
//   priceFor(grams) {
//     return this.pricePerGram * grams;
//   }
//   describe() {
//     const pricePer100g = (this.pricePerGram * 100).toFixed(2);
//     return `${this.name} (${this.type}) from ${this.origin} - ${pricePer100g} DKK/100g`;
//   }
// }
// const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
// console.log(sencha.describe());
// // "Sencha (green) from Japan - 12.00 DKK/100g"
// const earlGrey = new Tea("Earl Grey", "black", "India", 0.08, false);
// console.log(earlGrey.describe());
// // "Earl Grey (black) from India - 8.00 DKK/100g"


// Exercise 8 ⭐

// class Tea {
//   constructor(name, type, origin, pricePerGram, organic) {
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//     this.pricePerGram = pricePerGram;
//     this.organic = organic;
//   }
//   priceFor(grams) {
//     return this.pricePerGram * grams;
//   }
// }
// class OrderItem {
//   constructor(tea, grams) {
//     this.tea = tea;
//     this.grams = grams;
//   }
//   lineTotal() {
//     return this.tea.priceFor(this.grams);
//   }
//   describe() {
//     return `${this.grams}g ${this.tea.name} - ${this.lineTotal().toFixed(2)} DKK`;
//   }
// }
// const teaData = [
//   { name: "Sencha", type: "green", origin: "Japan", pricePerGram: 0.12, organic: true },
//   { name: "Earl Grey", type: "black", origin: "India", pricePerGram: 0.08, organic: false },
//   { name: "Dragon Well", type: "green", origin: "China", pricePerGram: 0.25, organic: true },
//   { name: "Chamomile", type: "herbal", origin: "Egypt", pricePerGram: 0.10, organic: true },
//   { name: "Darjeeling", type: "black", origin: "India", pricePerGram: 0.18, organic: false },
//   { name: "Oolong", type: "oolong", origin: "Taiwan", pricePerGram: 0.22, organic: true },
//   { name: "Peppermint", type: "herbal", origin: "USA", pricePerGram: 0.08, organic: true },
//   { name: "Matcha", type: "green", origin: "Japan", pricePerGram: 0.45, organic: true }
// ];
// const teaInstances = teaData.map(
//   (t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic)
// );
// const item = new OrderItem(teaInstances[0], 200);
// console.log(item.describe());
// // "200g Sencha - 24.00 DKK"
// const items = [
//   new OrderItem(teaInstances[0], 100),
//   new OrderItem(teaInstances[1], 200),
//   new OrderItem(teaInstances[7], 50),
// ];
// items.map((item) => item.describe()).forEach((line) => console.log(line));
// // "100g Sencha - 12.00 DKK"
// // "200g Earl Grey - 16.00 DKK"
// // "50g Matcha - 22.50 DKK"

// Exercise 9

// Create an Inventory class that tracks stock for a tea. 
// It should have sell(grams) and restock(grams) methods.
// class Tea {
//   constructor(name, type, origin, price, organic) {
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//     this.price = price;
//     this.organic = organic;
//   }
// }
// class Inventory {
//   constructor(tea, stockCount) {
//     this.tea = tea;
//     this.stockCount = stockCount;
//   }
//   sell = (grams) => {
//     if (grams > this.stockCount) {
//       throw new Error(
//         `Not enough stock for ${this.tea.name} (have ${this.stockCount}, need ${grams})`
//       );
//     }
//     this.stockCount -= grams;
//   }
//   restock = (grams) => {
//     this.stockCount += grams;
//   }
// }
// const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
// const stock = new Inventory(sencha, 150);
// console.log(stock.stockCount); // 150
// stock.sell(50);
// console.log(stock.stockCount); // 100
// stock.restock(200);
// console.log(stock.stockCount); // 300


// Exercise 10 ⭐

// Create an Order class with status transitions. 
// An order starts as "pending" and can move through: pending → confirmed → shipped → delivered.

// class OrderItem  {
//   constructor(tea, grams) {
//     this.tea = tea;
//     this.grams = grams;
//   }
// }
// class Order {
//   constructor() {
//     this.items = [];
//     this.status = "pending";
//   }
//   addItem = (orderItem) => {
//     if (this.status !== "pending") {
//       throw new Error(`Cannot add items to a ${this.status} order`);
//     }
//     this.items.push(orderItem);
//   }
//   confirm = () => {
//     if (this.status === "pending") {
//       this.status = "confirmed";
//     }
//   }
//   ship = () => {
//     if (this.status === "confirmed") {
//       this.status = "shipped";
//     }
//   }
//   deliver = () => {
//     if (this.status === "shipped") {
//       this.status = "delivered";
//     }
//   }
// }


// const order = new Order();
// const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);

// order.addItem(new OrderItem('sencha', 100));
// console.log(order.status); // "pending"

// order.confirm();
// console.log(order.status); // "confirmed"

// // order.addItem(new OrderItem(sencha, 50)); // should throw error

// order.ship();
// order.deliver();
// console.log(order.status); // "delivered"

// class Tea {
//   constructor(name, type, origin, pricePerGram, organic) {
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//     this.pricePerGram = pricePerGram;
//     this.organic = organic;
//   }
//   priceFor = (grams) => this.pricePerGram * grams;
// }
// class OrderItem {
//   constructor(tea, grams) {
//     this.tea = tea;
//     this.grams = grams;
//   }
//   getTotal = () => this.tea.priceFor(this.grams);
// }
// class Order {
//   constructor() {
//     this.items = [];
//     this.status = "pending";
//   }
//   addItem = (orderItem) => {
//     if (this.status !== "pending") {
//       throw new Error(`Cannot add items to a ${this.status} order`);
//     }
//     this.items.push(orderItem);
//   }
//   confirm = () => {
//     if (this.status === "pending") {
//       this.status = "confirmed";
//     }
//   }
//   ship = () => {
//     if (this.status === "confirmed") {
//       this.status = "shipped";
//     }
//   }
//   deliver = () => {
//     if (this.status === "shipped") {
//       this.status = "delivered";
//     }
//   }
//   getTotal = () =>
//     this.items.reduce((sum, item) => sum + item.getTotal(), 0);
//   getSummary = () =>
//     `Order (${this.status}) - ${this.items.length} items
// ${this.items
//   .map(
//     (item) =>
//       `- ${item.grams}g ${item.tea.name} - ${item.getTotal().toFixed(2)} DKK`,
//   )
//   .join("\n")}
// Total: ${this.getTotal().toFixed(2)} DKK`;
// }
// const order = new Order();
// order.addItem(
//   new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
// );
// order.addItem(
//   new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
// );
// console.log(order.getTotal()); // 34.5
// console.log(order.getSummary());


//Ex 11

// class Tea {
//   constructor(name, type, origin, pricePerGram, organic) {
//     this.name = name;
//     this.type = type;
//     this.origin = origin;
//     this.pricePerGram = pricePerGram;
//     this.organic = organic;
//   }
//   priceFor = (grams) => this.pricePerGram * grams;
// }
// class OrderItem {
//   constructor(tea, grams) {
//     this.tea = tea;
//     this.grams = grams;
//   }
//   getTotal = () => this.tea.priceFor(this.grams);
// }
// class Order {
//   constructor() {
//     this.items = [];
//     this.status = "pending";
//   }
//   addItem = (orderItem) => {
//     if (this.status !== "pending") {
//       throw new Error(`Cannot add items to a ${this.status} order`);
//     }
//     this.items.push(orderItem);
//   }
//   confirm = () => {
//     if (this.status === "pending") {
//       this.status = "confirmed";
//     }
//   }
//   ship = () => {
//     if (this.status === "confirmed") {
//       this.status = "shipped";
//     }
//   }
//   deliver = () => {
//     if (this.status === "shipped") {
//       this.status = "delivered";
//     }
//   }
//   getTotal = () =>
//     this.items.reduce((sum, item) => sum + item.getTotal(), 0);
//   getSummary = () =>
//     `Order (${this.status}) - ${this.items.length} items
// ${this.items
//   .map(
//     (item) =>
//       `- ${item.grams}g ${item.tea.name} - ${item.getTotal().toFixed(2)} DKK`,
//   )
//   .join("\n")}
// Total: ${this.getTotal().toFixed(2)} DKK`;
// }
// const order = new Order();
// order.addItem(
//   new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
// );
// order.addItem(
//   new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
// );
// console.log(order.getTotal()); // 34.5
// console.log(order.getSummary());


class TeaCatalog {
  constructor(teas) {
 {this.teas = teas
 }
  }

  search(query) {
    // Return teas where name includes query (case-insensitive)
  }

  filterByType(type) {
    // Return teas matching the type
  }
}

const catalog = new TeaCatalog(
  teas.map((t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic)),
);

console.log(catalog.search("earl"));
// [Tea { name: "Earl Grey", ... }]

console.log(catalog.filterByType("green").map((t) => t.name));
// ["Sencha", "Dragon Well", "Matcha", "Genmaicha", "Jasmine Pearl", ...]


 




