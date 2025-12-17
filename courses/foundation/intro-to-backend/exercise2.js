import express from "express";
import knexLibrary from "knex";

const app = express();
const port = 3001;

// This connects to the database stored in the file mentioned below
let dbFile="/Users/rashmi/hyf-assignment-template/courses/foundation/intro-to-backend/database.sqlite3";
const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
});

app.get("/", (req, res) => {
  res.send("Hello from exercise 2!");
});

// Here is an example of the first route, /all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knex.raw("SELECT * FROM users ORDER BY id ASC;");
  res.json(rows);
});

// TODO implement more routes here

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
