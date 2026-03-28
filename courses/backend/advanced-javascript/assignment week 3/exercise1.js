
// Exercise 1: Tea Search
// Create a function that searches for teas by name:

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function searchTeas(query) {
  try {
    const res = await fetch(`${API_BASE}/teas`);
    if (!res.ok) throw new Error("Fetch failed");
    const teas = await res.json();

    return teas.filter((tea) =>
      tea.name.toLowerCase().includes(query.toLowerCase()),
    );
  } catch (err) {
    console.error("Error:", err.message);
    return [];
  }
}

searchTeas("pearl").then((teas) => {
  console.log("Search results for 'pearl':");
  teas.forEach((tea) => console.log(`- ${tea.name}`));
});
