// Exercise 2: Tea Details
// Create a function that gets full details for a tea, including its current stock:
const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
async function getTeaDetails(id) {
  try {
    const [teaRes, inventoryRes] = await Promise.all([
      fetch(`${API_BASE}/teas/${id}`),
      fetch(`${API_BASE}/inventory/${id}`),
    ]);
    if (!teaRes.ok || !inventoryRes.ok) {
      throw new Error("Could not find tea or inventory data");
    }
    const tea = await teaRes.json();
    const inventory = await inventoryRes.json();
    return {
      ...tea,
      stock: inventory.stockCount ?? 0,
    };
  } catch (err) {
    console.error("Error fetching tea details:", err.message);
  }
}

// Test it:
getTeaDetails(1).then((tea) => {
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stock} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
});
