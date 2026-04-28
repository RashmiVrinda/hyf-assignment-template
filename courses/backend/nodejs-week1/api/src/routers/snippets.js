import express from "express";
import db from "../../../db.js";
const router = express.Router();
// 1. The GET route //.
router.get("/", async (req, res) => {
  const search = req.query.title || req.query.search;

  try {
    let query = db("snippets").select("*");
    if (search) {
      query = query.where(function () {
        this.where("title", "like", `%${search}%`).orWhere(
          "contents",
          "like",
          `%${search}%`,
        );

        if (!isNaN(search)) {
          this.orWhere("id", search);
        }
      });
    }

    const snippets = await query;
    res.status(200).json(snippets);
  } catch (error) {
    console.error(error); // Good to log the error for yourself
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. The POST route //

router.post("/", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).json({ error: "Title and contents are required" });
  }

  try {
    const [id] = await db("snippets").insert({ title, contents });
    res.status(201).json({ id, title, contents });
  } catch (error) {
    res.status(500).json({ error: "Failed to create snippet" });
  }
});

// 3. GET /:id - Get a single snippet by its ID//

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const snippet = await db("snippets").where({ id }).first();
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 4. PUT /:id - Update an existing snippet//

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  try {
    const updated = await db("snippets")
      .where({ id })
      .update({ title, contents });
    if (!updated) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.status(200).json({ id, title, contents });
  } catch (error) {
    res.status(500).json({ error: "Failed to update" });
  }
});

// 5. DELETE /:id - Delete a snippet//
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db("snippets").where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.status(204).send(); // 204 means "No Content" (Success)
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
});
export default router;
