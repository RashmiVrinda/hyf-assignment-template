// Exercise 6

// Calculate the total inventory value: the sum of pricePerGram * stockCount for each tea.
import { teas } from "./teas.js";

const inventoryValue = teas.reduce((sum, tea) => 
sum + tea.pricePerGram * tea.stockCount,0);
console.log(inventoryValue);

