import jwt from "jsonwebtoken";
import db from "../../db.js"; 

const authenticateToken = async (req, res, next) => { // Added 'async'
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // 1. Verify the token using secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. CHECK THE DATABASE: Ensure this token is in our tokens table
    const tokenExists = await db("tokens").where({ token }).first();

    if (!tokenExists) {
        return res.status(401).json({ error: "Session expired or logged out." });
    }

    // 3. Attach the user info to the request object
    req.user = verified;
    
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

export default authenticateToken;