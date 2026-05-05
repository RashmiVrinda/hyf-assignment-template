import express from "express";
import db from "../../../db.js";

const router = express.Router();

// 1. GET /

router.get("/", async (req, res) => {
  let query = db.select("*").from("snippets");
  const allowedColumns = ["id", "title", "contents"];

  if (req.query.sort) //safe version //
  //const orderBy = req.query.sort.toString();//
  //   if (orderBy.length > 0) {
  //     query = query.orderByRaw(orderBy); // Vulnerable!
  //   }
  // }
  {
    const orderBy = req.query.sort.toString();
    const direction = (req.query.dir || "asc").toLowerCase();
    const validDirections = ["asc", "desc"];
    if (
      allowedColumns.includes(orderBy) &&
      validDirections.includes(direction)
    ) {
      query = query.orderBy(orderBy, direction);
    } else {
      return res
        .status(400)
        .json({ error: "Invalid sort column or direction" });
    }
  }
// Part B - Extension 1: Search Filter
if (req.query.search) {
  const searchTerm = req.query.search.toString();
  query = query.where("title", "like", `%${searchTerm}%`);
}
  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Part B - Extension 2: GET /random //
router.get("/random", async (req, res) => {
  try {
 
    const snippet = await db("snippets").orderByRaw("RANDOM()").first();

    if (!snippet) {
      return res.status(404).json({ error: "No snippets found" });
    }

    res.status(200).json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. POST /- Part - C

router.post("/", async (req, res) => {
  const { title, contents } = req.body;

  // Validate: Required fields must be present and non-empty
  if (!title || !contents || title.trim() === "" || contents.trim() === "") {
    return res.status(400).json({ error: "Title and contents are required and cannot be empty" });
  }

  try {
    const [id] = await db("snippets").insert({ title, contents });
    res.status(201).json({ id, title, contents });
  } catch (error) {
    console.error("POST Snippet Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3. GET /:id - PART - C

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate: ID must be a number
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid ID format. ID must be a number." });
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

// 4. PUT /:id -m PART - C

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  // Validate ID//
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // Validate Body//
  if (!title || !contents || title.trim() === "" || contents.trim() === "") {
    return res.status(400).json({ error: "Title and contents are required" });
  }

  try {
    const updated = await db("snippets").where({ id }).update({ title, contents });

    if (!updated) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json({ id, title, contents });
  } catch (error) {
    console.error("PUT Snippet Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 5. DELETE /:id

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db("snippets").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;
