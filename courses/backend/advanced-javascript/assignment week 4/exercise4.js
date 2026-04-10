
import { teas } from "../teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";

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
      history += `Order ${index + 1} (${order.status}) - ${order.items.length} items\n`;
      order.items.forEach((item) => {
        history += `${item.describe()}\n`;
      });
      history += `Total: ${order.getTotal().toFixed(2)} DKK\n\n`;
    });
    history += `Lifetime total: ${this.totalSpent().toFixed(2)} DKK`;
    return history;
  }
}
// Test:
const teaInstances = teas.map(Tea.fromObject);
const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // Sencha
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // Matcha
customer.placeOrder(order2);

console.log(customer.getOrderHistory());

console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");
