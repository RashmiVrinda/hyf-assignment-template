import express from "express";
import db from "../../../db.js"; 
import authenticateToken from "../auth.js"; 

const router = express.Router();

/**
 * 1. GET /
 * PUBLIC: Now fetches ALL snippets from the database.
 */
router.get("/", async (req, res) => {
  // REMOVED: .where("user_id", req.user.id) because this is now public
  let query = db.select("*").from("snippets");
  
  const allowedColumns = ["id", "title", "contents"];

  // Sorting Logic
  if (req.query.sort) {
    const orderBy = req.query.sort.toString();
    const direction = (req.query.dir || "asc").toLowerCase();
    const validDirections = ["asc", "desc"];
    
    if (allowedColumns.includes(orderBy) && validDirections.includes(direction)) {
      query = query.orderBy(orderBy, direction);
    } else {
      return res.status(400).json({ error: "Invalid sort column or direction" });
    }
  }
  
  // Search Filter
  if (req.query.search) {
    const searchTerm = req.query.search.toString();
    query = query.where("title", "like", `%${searchTerm}%`);
  }
  
  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 2. GET /random
 * Protected: Still requires a login to get a random one.
 */
router.get("/random", authenticateToken(), async (req, res) => {
  try {
    const snippet = await db("snippets")
      .orderByRaw("RANDOM()")
      .first();

    if (!snippet) {
      return res.status(404).json({ error: "No snippets found" });
    }

    res.status(200).json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 3. POST /
 * Protected: Anyone logged in can create.
 */
router.post("/", authenticateToken(), async (req, res) => {
  const { title, contents } = req.body;
  const userId = req.user.id;

  if (!title || !contents || title.trim() === "" || contents.trim() === "") {
    return res.status(400).json({ error: "Title and contents are required" });
  }

  try {
    const [id] = await db("snippets").insert({ 
        title, 
        contents,
        user_id: userId 
    });
    
    res.status(201).json({ id, title, contents, user_id: userId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create snippet." });
  }
});

/**
 * 4. GET /:id (Public)
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const snippet = await db("snippets").where({ id }).first();
    if (!snippet) return res.status(404).json({ error: "Snippet not found" });
    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 5. PUT /:id
 * Protected: User must own the snippet to edit it.
 */
router.put("/:id", authenticateToken(), async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const userId = req.user.id;

  try {
    const updated = await db("snippets")
      .where({ id, user_id: userId })
      .update({ title, contents });

    if (!updated) {
      return res.status(404).json({ error: "Snippet not found or unauthorized" });
    }
    res.status(200).json({ id, title, contents });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 6. DELETE /:id
 * ADMIN ONLY: Admins can delete ANY snippet.
 */
router.delete("/:id", authenticateToken("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    // REMOVED: .where({ user_id: userId }) because admins can delete anything
    const deletedCount = await db("snippets")
      .where({ id }) 
      .del();

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json({ message: "Snippet deleted successfully by Admin" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete snippet" });
  }
});

export default router;