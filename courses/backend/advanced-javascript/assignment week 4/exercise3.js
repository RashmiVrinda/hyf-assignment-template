import { teas } from "../teas.js";
import { Tea, Inventory } from "./library.js";

const teaInstances = teas.map(Tea.fromObject);
const inventory = new Inventory();
teaInstances.forEach((tea) => {
  const rawData = teas.find((t) => t.name === tea.name);
  inventory.add(tea, rawData.stockCount);
});

teaInstances.forEach((tea) => {
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha")); // 150

inventory.sell("Sencha", 50);
console.log("After selling 50g:", inventory.getStock("Sencha")); // 100

console.log("Low stock (< 50):");
inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK",
);
