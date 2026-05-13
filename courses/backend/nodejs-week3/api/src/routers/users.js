import express from "express";
import bcrypt from "bcrypt";
import db from "../../../db.js";
import jwt from "jsonwebtoken";

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
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email already exists or database error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Look for the user in the database
    const user = await db("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the plain password with the hash
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 4. Generate the JWT token with a 10-minute expiry
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }, // Changed from '1h' to '10m'
    );
//  Save the token to new separate table 
    await db("tokens").insert({
      token: token,
      user_id: user.id
    });

    // 5. Send the success message and the token to the client
    res.json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    // 1. Log the real error to your terminal so YOU can see it
    console.error("LOGIN ERROR:", error);

    // 2. Send a generic message to the user/Postman
    res.status(500).json({ error: "Internal server error" });
  }
});
//AUTH_NOTES: Using JWT for authentication. 
// Tokens are signed with JWT_SECRET and expire in 10m.
// This is just to check our data in the browser
router.get("/all", async (req, res) => {
  try {
    const users = await db("users").select("id", "email", "password");
    res.json(users);
  } catch (error) {
    console.log("--- THE REAL ERROR IS BELOW ---");
    console.error(error);

    res.status(500).json({
      error: "Database error",
      details: error.message,
    });
  }
});


export default router;
