const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "No token" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id).select("name email");
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    next();

  } catch (err) {
    return res.status(401).json({ message: "Auth failed" });
  }
};
