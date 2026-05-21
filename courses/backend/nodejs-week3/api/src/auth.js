import jwt from "jsonwebtoken";
import db from "../../db.js"; 

// We wrap the middleware in a function to allow passing a requiredRole
const authenticateToken = (requiredRole = null) => {
  return async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // 1. Check if token is missing
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
      // 2. Verify the token using secret key
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      
      // 3. CHECK THE DATABASE: Ensure this token is in our tokens table (for logout/invalidation)
      const tokenExists = await db("tokens").where({ token }).first();
      if (!tokenExists) {
          return res.status(401).json({ error: "Session invalidated. Please log in again." });
      }

      // 4. ROLE-BASED CHECK: If a specific role is required for this route
      if (requiredRole && verified.role !== requiredRole) {
        return res.status(403).json({ error: `Forbidden: Requires ${requiredRole} permissions.` });
      }

      // Attach the user info to the request object
      req.user = verified;
      next();
    } catch (error) {
      // 5. DISTINGUISH ERRORS: Safe error handling
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired. Please log in again." });
      }
      res.status(403).json({ error: "Invalid token." });
    }
  };
};

export default authenticateToken;