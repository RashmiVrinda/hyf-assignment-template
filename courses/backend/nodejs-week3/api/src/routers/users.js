import express from "express";
import bcrypt from "bcrypt";
import db from "../../../db.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db("users").insert({
      email: email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email already exists or database error" });
  }
});


// This is just to check our data in the browser
router.get("/all", async (req, res) => {
  try {
    const users = await db("users").select("id", "email", "password");
    res.json(users);
  } catch (error) {
    // Check your terminal (Rashmis-MacBook-Air) for this output!
    console.log("--- THE REAL ERROR IS BELOW ---");
    console.error(error); 
    
    res.status(500).json({ 
      error: "Database error",
      details: error.message 
    });
  }
});
export default router;