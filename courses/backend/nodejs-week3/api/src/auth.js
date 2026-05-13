import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // 1. Get the token from the "Authorization" header
  const authHeader = req.headers["authorization"];
  
  const token = authHeader && authHeader.split(" ")[1];

  // 2. If there is no token, reject the request
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // 3. Verify the token using secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the user info to the request object so routes can use it
    req.user = verified;
    
    // 5. Move to the next function (the actual route)
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

export default authenticateToken;