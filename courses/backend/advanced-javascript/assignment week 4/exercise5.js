import { teas } from "../teas.js";
import { TeaShop } from "./library.js";

// Test:
const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

try {
  const order1 = shop.createOrder(alex, [
    { teaName: "Sencha", grams: 100 },
    { teaName: "Matcha", grams: 50 },
  ]);
  console.log(order1.getSummary());
} catch (error) {
  console.log(`Order 1 failed: ${error.message}`);
}

try {
  const order2 = shop.createOrder(maria, [
    { teaName: "Earl Grey", grams: 200 },
  ]);
  console.log(order2.getSummary());
} catch (error) {
  console.log(`Order 2 failed: ${error.message}`);
}
//I used a try/catch block because the inventory.sell() method throws an error if the order exceeds the available stock.
// Since the Matcha order (50g) is higher than the stock (30g),
//  this block prevents the whole program from crashing and allows the final report to still run.
const report = shop.getReport();
console.log(report);