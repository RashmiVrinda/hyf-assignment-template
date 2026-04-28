import express from "express";
import db from './db.js';
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a search engine");
});


app.get("/test-db", async (req, res) => {
  try {
    const tables = await db.raw("SELECT name FROM sqlite_master WHERE type='table';");
    res.json({ message: "Database is connected!", tables });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
});app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
