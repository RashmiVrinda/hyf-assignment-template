

import { teas } from "../../teas.js";

const highCaffeineTeas = teas.filter(tea => tea.caffeineLevel === "high");

console.log(highCaffeineTeas);