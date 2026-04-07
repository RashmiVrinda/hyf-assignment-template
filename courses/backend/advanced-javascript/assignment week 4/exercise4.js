import { teas } from "../teas.js";
import { Tea, OrderItem, Order, Customer } from "./library.js";

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
