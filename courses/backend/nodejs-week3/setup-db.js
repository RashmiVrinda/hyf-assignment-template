import db from "./db.js";

async function setup() {
  console.log("Building tables...");

  // Create snippets table
  await db.schema.dropTableIfExists("snippets");
  await db.schema.createTable("snippets", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("contents").notNullable();
  });

  // Create tags table
  await db.schema.dropTableIfExists("tags");
  await db.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });

  console.log("Success: Database tables created!");
  process.exit();
}

setup();