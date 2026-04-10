import { teas } from "../teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";
import { Inventory } from "./exercise3.js";
import { Customer } from "./exercise4.js";

export class TeaShop {
  constructor(teaData) {
    this.catalog = teaData.map(Tea.fromObject);
    this.inventory = new Inventory();
    this.catalog.forEach((tea) => {
      const raw = teaData.find((t) => t.name === tea.name);
      this.inventory.add(tea, raw.stockCount);
    });
    this.customers = [];
  }

  registerCustomer(name, email) {
    const newCustomer = new Customer(name, email);
    this.customers.push(newCustomer);
    return newCustomer;
  }

  createOrder(customer, items) {
    const order = new Order();
    const validatedItems = items.map(({ teaName, grams }) => {
      const tea = this.catalog.find((t) => t.name === teaName);
      if (!tea) throw new Error(`Tea ${teaName} not found.`);
      const stock = this.inventory.getStock(teaName);
      if (stock < grams) {
        throw new Error(`Not enough stock for ${teaName}`);
      }
      return { tea, teaName, grams };
    });
    validatedItems.forEach(({ tea, teaName, grams }) => {
      this.inventory.sell(teaName, grams);
      order.addItem(new OrderItem(tea, grams));
    });

    customer.placeOrder(order);
    return order;
  }

  getReport() {
    const totalOrders = this.customers.reduce(
      (sum, c) => sum + c.orders.length,
      0,
    );
    const totalRevenue = this.customers.reduce(
      (sum, c) => sum + c.totalSpent(),
      0,
    );
    const lowStock = this.inventory.getLowStock(50);
    return `@@ TEA SHOP REPORT @@
Total Customers: ${this.customers.length}
Total Orders: ${totalOrders}
Total Revenue: ${totalRevenue.toFixed(2)} DKK
Low Stock Items: ${lowStock.length}
-********-`;
  }
}
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
