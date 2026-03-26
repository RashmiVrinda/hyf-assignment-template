// Exercise 3: Order Calculator ⭐
// Create a function that calculates the total for an order:

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

export async function calculateOrderTotal(items) {
  const res = await fetch(`${API_BASE}/teas`);
  if (!res.ok) throw new error("Could not fetch tea list");
  const allTeas = await res.json();
  let totalPrice = 0;
  for (const item of items) {
    const matchedTea = allTeas.find((singleTea) => singleTea.id === item.teaId);

    {
      if (!matchedTea) {
        throw new Error(
          `Tea with ID ${item.teaId} does not exist in out database`,
        );
      }
    }
    const itemCost = matchedTea.pricePerGram * item.grams;
    totalPrice += itemCost;
  }

  return totalPrice;
}
const order = [
  { teaId: 1, grams: 100 },
  { teaId: 3, grams: 50 },
  { teaId: 8, grams: 200 },
];

calculateOrderTotal(order)
  .then((total) => console.log(`Order total: ${total.toFixed(2)} DKK`))
  .catch((err) => console.error("Error:", err.message));
