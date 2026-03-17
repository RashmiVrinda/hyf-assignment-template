import { teas } from "../../teas.js";


teas.forEach(tea => {
  console.log(`${tea.name} (${tea.pricePerGram*100})`);
});