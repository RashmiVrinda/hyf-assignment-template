import db from "./db.js";

async function check() {
  try {
    const columns = await db("snippets").columnInfo();
    console.log("--- Snippets Table Structure ---");
    console.log(Object.keys(columns));
    
    const hasUsers = await db.schema.hasTable("users");
    console.log("\nDoes 'users' table exist?:", hasUsers);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    process.exit();
  }
}

check();