import express from "express";
import db from "../../../db.js"; 
import authenticateToken from "../auth.js"; 

const router = express.Router();

/**
 * 1. GET /
 * Fetches snippets belonging ONLY to the logged-in user.
 * Supports sorting and search filtering.
 */
router.get("/", authenticateToken, async (req, res) => {
  // We start the query by filtering for the logged-in user immediately
  let query = db.select("*").from("snippets").where("user_id", req.user.id);
  
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
    // We use an 'andWhere' group to ensure we don't accidentally search other people's snippets
    query = query.andWhere("title", "like", `%${searchTerm}%`);
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
 * Returns a single random snippet from the user's collection.
 */
router.get("/random", authenticateToken, async (req, res) => {
  try {
    const snippet = await db("snippets")
      .where("user_id", req.user.id)
      .orderByRaw("RANDOM()")
      .first();

    if (!snippet) {
      return res.status(404).json({ error: "No snippets found for this user" });
    }

    res.status(200).json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 3. POST /
 * Part B Requirement: Protected by authenticateToken.
 * Links the new snippet to the logged-in user via user_id.
 */
router.post("/", authenticateToken, async (req, res) => {
  const { title, contents } = req.body;
  const userId = req.user.id; // Extracted from the valid JWT in middleware

  // Validation
  if (!title || !contents || title.trim() === "" || contents.trim() === "") {
    return res.status(400).json({ error: "Title and contents are required" });
  }

  try {
    // We insert the userId so we know who owns this snippet
    const [id] = await db("snippets").insert({ 
        title, 
        contents,
        user_id: userId 
    });
    
    res.status(201).json({ id, title, contents, user_id: userId });
  } catch (error) {
    console.error("POST Snippet Error:", error);
    res.status(500).json({ error: "Failed to create snippet. Ensure database has user_id column." });
  }
});

/**
 * 4. GET /:id
 * Fetches a specific snippet by its ID.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const snippet = await db("snippets").where({ id }).first();

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json(snippet);
  } catch (error) {
    console.error("GET Snippet Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 5. PUT /:id
 * Updates a snippet. Note: For Part B, you might want to add authenticateToken here too!
 */
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const userId = req.user.id; // Get ID from token

  try {
    const updated = await db("snippets")
      .where({ id, user_id: userId }) // Ensure they own it!
      .update({ title, contents });

    if (!updated) {
      return res.status(404).json({ error: "Snippet not found or unauthorized" });
    }

    res.status(200).json({ id, title, contents });
  } catch (error) {
    console.error("PUT Snippet Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 6. DELETE /:id
 * Part B Requirement: Protected by authenticateToken.
 * Only deletes the snippet if it belongs to the logged-in user.
 */
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const deletedCount = await db("snippets")
      .where({ id, user_id: userId }) 
      .del();

    if (deletedCount === 0) {
      // If count is 0, it either doesn't exist OR user doesn't own it
      return res.status(404).json({ error: "Snippet not found or unauthorized" });
    }

    res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("DELETE Snippet Error:", error);
    res.status(500).json({ error: "Failed to delete snippet" });
  }
});

// Part C: The Catch-all Error Handler
router.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.stack);
  res.status(500).json({
    error: "An unexpected server error occurred.",
  });
});

export default router;