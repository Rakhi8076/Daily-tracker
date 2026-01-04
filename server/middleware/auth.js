const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // 🔐 Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // 🔑 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Attach user to request
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
