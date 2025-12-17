//Setting Up the Core Application and Dependencies
import express from "express";
import knex from "knex";

const app = express();
const port = 3000;
app.use(express.json());

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename:
      "/Users/rashmi/hyf-assignment-template/courses/foundation/intro-to-backend/tasks.sqlite3",
  },
  useNullAsDefault: true,
});

//  UPDATED HOME ROUTE with html and CSS-in-JS (Internal Styling)
//JavaScript fetch() to call the /task-count API internally.
app.get("/", (req, res) => {
  res.send(`
<html>
      <head>
<title>Task Dashboard</title>
<style>
 body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
 .card { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; }
#count { font-size: 5rem; font-weight: bold; color: #4f46e5; margin: 10px 0; }
 h1 { color: #333; font-size: 1.5rem; }
</style>
</head>
<body>
  <div class="card">
<h1>Total Tasks</h1>
 <div id="count">...</div>
  </div>
 <script>
 fetch('/task-count').then(r => r.json()).then(d => {
 document.getElementById('count').innerText = d.total;
 });
  </script>
</body>
 </html>
  `);
});

// 3-ROUTES
//* Keyword Search (/api/search-database): Filters tasks specifically for "database" related work using SQL LIKE operators.
//* User Directory (/api/users): Provides a clean list of all registered names and emails from the user table.
//* Specific Task Lookup (/api/tasks/:id): A dynamic route that retrieves detailed information for a single task based on its ID.

// 1. Search Database Tasks
app.get("/api/search-database", async (req, res) => {
  const results = await knexInstance("task")
    .select("title", "created")
    .where("title", "like", "%database%")
    .orWhere("description", "like", "%database%");
  res.json(results);
});

// 2. Get User Directory (Names and Emails)
app.get("/api/users", async (req, res) => {
  const users = await knexInstance("user").select("name", "email");
  res.json(users);
});

// 3. Find specific task by ID
app.get("/api/tasks/:id", async (req, res) => {
  const task = await knexInstance("task").where({ id: req.params.id }).first();
  task ? res.json(task) : res.status(404).json({ error: "Not found" });
});

// HELPER ROUTE
app.get("/task-count", async (req, res) => {
  const result = await knexInstance("task").count("id as total").first();
  res.json(result);
});

app.listen(port, () => console.log(`Server at http://localhost:${port}`));
