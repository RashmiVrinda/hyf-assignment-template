const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";


export async function calculateOrderTotal(items) {
  const res = await fetch(`${API_BASE}/teas`);
  if (!res.ok) throw new Error("Could not fetch tea list");
  const allTeas = await res.json();
  
  let totalPrice = 0;
  for (const item of items) {
    const matchedTea = allTeas.find((singleTea) => singleTea.id === item.teaId);
    if (!matchedTea) {
      throw new Error(`Tea with ID ${item.teaId} does not exist in our database`);
    }
    totalPrice += matchedTea.pricePerGram * item.grams;
  }
  return totalPrice; 
}


export async function checkOrderStock(items) {
  const shortages = [];
  const inventoryPromises = items.map(async (item) => {
    const res = await fetch(`${API_BASE}/inventory/${item.teaId}`);
    if (!res.ok) throw new Error(`Could not find tea with ID ${item.teaId}`);
    
    const inventoryData = await res.json();
    if (inventoryData.stockCount < item.grams) {
 shortages.push({
  teaId: item.teaId,
  grams: item.grams,
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