
import express from "express";
import db from "../../../db.js";

const router = express.Router();

// GET all tags //

router.get("/", async (req, res) => {
  try {
    const tags = await db("tags").select("*");
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new tag//
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  
  try {
    const [id] = await db("tags").insert({ name });
    res.status(201).json({ id, name });
  } catch (error) {
    res.status(500).json({ error: "Failed to create tag" });
  }
});

//// DELETE a tag//
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db("tags").where({ id }).del();
    if (!deleted) return res.status(404).json({ error: "Tag not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tag" });
  }
});

export default router;