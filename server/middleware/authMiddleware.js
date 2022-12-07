const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// ==========================================================
// ==========================================================
// User Authorization Functionality
// ==========================================================
// ==========================================================

const protect = asyncHandler(async (req, res, next) => {
  // Creating the token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decoding the token for verification
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new err("Authorization error, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new err("No token, not authorized");
  }
});

module.exports = { protect };
