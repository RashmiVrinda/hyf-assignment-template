// Exercise 2: Order System
// Build OrderItem and Order classes that work together.

import { teas } from "../teas.js";
import { Tea, OrderItem, Order } from "./library.js";

 


// Test:
const teaInstances = teas.map(Tea.fromObject);
const order = new Order();


order.addItem(new OrderItem(teaInstances[0], 200));  // Sencha
order.addItem(new OrderItem(teaInstances[7], 50)); // Matcha

console.log(order.getSummary());
// Commented out the line below because getSummary() already includes the total.
//console.log("Total:", order.getTotal().toFixed(2), "DKK");