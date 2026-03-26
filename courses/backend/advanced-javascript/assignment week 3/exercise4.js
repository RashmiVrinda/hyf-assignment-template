// Exercise 4: Stock Check ⭐
// Create a function that checks if all items in an order are in stock:
const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
export async function checkOrderStock(items) {
  const shortages = [];
  const inventoryPromises = items.map(async (item, index) => {
    const itemNum = index + 1;
    const res = await fetch(`${API_BASE}/inventory/${item.teaId}`);

    const inventoryData = await res.json();
    if (inventoryData.stockCount < item.grams) {
      shortages.push({
        name: inventoryData.teaName,
        needed: item.grams,
        available: inventoryData.stockCount,
      });
    }
  });

  await Promise.all(inventoryPromises);

  return {
    inStock: shortages.length === 0,
    shortages: shortages,
  };
}

const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 }, // might be out of stock
  { teaId: 3, grams: 9999 }, // definitely out of stock
];

checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});

