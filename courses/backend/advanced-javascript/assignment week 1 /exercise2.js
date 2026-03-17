// Exercise 2: Inventory Report ⭐
// Build a function that generates an inventory report:

// function inventoryReport(teas) {
//   return {
//     totalTeas: /* total number of teas */,
//     inStock: /* number of teas where inStock is true */,
//     outOfStock: /* number of teas where inStock is false */,
//     totalInventoryValue: /* sum of (pricePerGram * stockCount) for all teas */,
//     averagePrice: /* average pricePerGram across all teas */
//   };
// }
// console.log(inventoryReport(teas));
// Expected output structure:
// {
//   totalTeas: 20,
//   inStock: 18,
//   outOfStock: 2,
//   totalInventoryValue: 234.55,  // example number
//   averagePrice: 0.21           // example number
// }
import { teas } from "../teas.js";
function inventoryReport(teas) {
  const totalTeas = teas.length;
  const inStock = teas.filter(tea => tea.stockCount>0).length;
  const outOfStock = teas.filter(tea => tea.stockCount === 0 ).length;
  const totalInventoryValue = teas.reduce(
    (sum, tea) => sum + tea.pricePerGram * tea.stockCount,
    0,
  );
  const averagePrice =
    teas.reduce((sum, tea) => sum + tea.pricePerGram, 0) / totalTeas;
  return {
    totalTeas,
    inStock,
    outOfStock,
    totalInventoryValue,
    averagePrice,
  };
}
console.log(inventoryReport(teas));
