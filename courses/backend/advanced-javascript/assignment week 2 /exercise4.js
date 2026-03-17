// Exercise 4: Inventory Aggregation from File
// Write a function that:
// Reads this file using a callback
// Uses reduce to calculate net change per tea
// Combines with original tea data to show new stock levels
// Logs a report

import fs from "fs";
import { teas } from "../teas.js";


function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
const updates = JSON.parse(data);
const changes = updates.reduce((acc,item) => {
    acc[item.teaId] = (acc[item.teaId] || 0) + item.change;
    return acc;
}, {});

const reportLines = teas.map((tea) => {
      let change;
      if (changes[tea.id]) {
        change = changes[tea.id];
      } else {
        change = 0;
      }

      const newStock = tea.stockCount + change;

      let sign;
      if (change >= 0) {
        sign = "+";
      } else {
        sign = "";
      }

      let negativeText;
      if (newStock < 0) {
        negativeText = " (NEGATIVE!)";
      } else {
        negativeText = "";
      }

      return `- ${tea.name}: was ${tea.stockCount}, change ${sign}${change}, now ${newStock}${negativeText}`;
    });

    const report = "Inventory Report:\n" + reportLines.join("\n");

    callback(null, report);
  });
}


generateInventoryReport((error, report) => {
  if (error) {  
    console.error("Failed:", error.message);
    return;
  }
  console.log(report);
});