import express from "express";
import bcrypt from "bcrypt";
import db from "../../../db.js";
import jwt from "jsonwebtoken";
import authenticateToken from "../auth.js";
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
    // 1. Look for the user in the database
    const user = await db("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2. Compare the plain password with the hash
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Generate the JWT token (Now that 'user' is defined and verified)
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role // Crucial for Part C RBAC logic
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // 4. Save the token to the tokens table (for session tracking/logout)
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
    // Log the real error to your terminal for debugging
    console.error("LOGIN ERROR:", error);

    // Send a generic message to the client
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
// NEW: Logout route for Part B
router.post("/logout-token", authenticateToken, async (req, res) => {
  try {
    // 1. Get the token from the header (Bearer <token>)
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // 2. Delete this specific token from the tokens table
    await db("tokens").where({ token }).del();

    res.json({ message: "Logged out successfully. Token destroyed." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Logout failed" });
  }
});

export default router;
