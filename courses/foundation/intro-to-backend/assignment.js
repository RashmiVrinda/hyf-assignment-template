//Setting Up the Core Application and Dependencies
import express from "express";
import path from "path";
import {
  getTaskCount,
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "./db/tasks.js";


const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});


//  UPDATED HOME ROUTE with html and CSS-in-JS (Internal Styling)
//JavaScript fetch() to call the /task-count API internally.

//Old routes kept for reference purpose//
// 3-ROUTES
//* Keyword Search (/api/search-database): Filters tasks specifically for "database" related work using SQL LIKE operators.
//* User Directory (/api/users): Provides a clean list of all registered names and emails from the user table.
//* Specific Task Lookup (/api/tasks/:id): A dynamic route that retrieves detailed information for a single task based on its ID.

// // 1. Search Database Tasks
// app.get("/api/search-database", async (req, res) => {
//   const results = await knexInstance("task")
//     .select("title", "created")
//     .where("title", "like", "%database%")
//     .orWhere("description", "like", "%database%");
//   res.json(results);
// });

// 2. Get User Directory (Names and Emails)
// app.get("/api/users", async (req, res) => {
//   const users = await knexInstance("user").select("name", "email");
//   res.json(users);
// });

// 3. Find specific task by ID
// app.get("/api/tasks/:id", async (req, res) => {
//   const task = await knexInstance("task").where({ id: req.params.id }).first();
//   task ? res.json(task) : res.status(404).json({ error: "Not found" });
// });

//---Post Route---

app.post("/api/tasks", async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  await createTask({ title, description });
  res.status(201).json({ message: "Task created" });
});

// ---Get Route---

app.get("/api/tasks", async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
});

//---Put Route---

app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const rowsUpdated = await updateTask(id, updates);

  if (rowsUpdated === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task updated" });
});

//---Delete Route---

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const rowsDeleted = await deleteTask(id);

  if (rowsDeleted === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted" });
});

// HELPER ROUTE
app.get("/task-count", async (req, res) => {
  const result = await getTaskCount();
  res.json(result);
});

app.listen(port, () => console.log(`Server at http://localhost:${port}`));
