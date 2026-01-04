const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // ✅ bcryptjs is safer for prod
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔴 Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔴 Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔑 Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// ================= PROTECTED ROUTE =================
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});

module.exports = router;
