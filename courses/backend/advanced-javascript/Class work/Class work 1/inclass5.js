import { teas } from "../../teas.js";

const teaPrice = teas.map(price => price.pricePerGram*100);

console.log(teaPrice);