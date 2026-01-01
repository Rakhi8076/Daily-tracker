const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ===== Routes =====
const userRoutes = require("./routes/userRoutes");
const weeklyRoutes = require("./routes/weeklyRoutes");
const progressRoutes = require("./routes/progressRoutes");
const financeRoutes = require("./routes/financeRoutes");   // ✅ NEW ROUTE ADDED

const app = express();

// ===== Middlewares =====
app.use(express.json());
app.use(cors());

// ===== MongoDB Connect =====
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully 🎉"))
  .catch(err => console.log("Mongo Error ❌", err.message));

// ===== API Routes =====
app.use("/api/user", userRoutes);
app.use("/api/weekly", weeklyRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/finance", financeRoutes);   // ✅ CONNECTED

// ===== Default Route =====
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// ===== Server Start =====
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
